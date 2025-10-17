// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title FluxTradeExchange
 * @dev A decentralized exchange contract for token swapping
 * @notice This is a simplified implementation for educational purposes
 */
contract FluxTradeExchange is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Trading fee in basis points (100 = 1%)
    uint256 public tradingFee = 30; // 0.3%
    uint256 public constant FEE_DENOMINATOR = 10000;

    // Liquidity pools: token1 => token2 => liquidity
    mapping(address => mapping(address => uint256)) public liquidityPools;

    // Events
    event Swap(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 fee
    );

    event LiquidityAdded(
        address indexed provider,
        address indexed token1,
        address indexed token2,
        uint256 amount1,
        uint256 amount2
    );

    event LiquidityRemoved(
        address indexed provider,
        address indexed token1,
        address indexed token2,
        uint256 amount1,
        uint256 amount2
    );

    event FeeUpdated(uint256 oldFee, uint256 newFee);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Swap tokens
     * @param tokenIn Address of input token
     * @param tokenOut Address of output token
     * @param amountIn Amount of input tokens
     * @param minAmountOut Minimum amount of output tokens expected
     */
    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut
    ) external nonReentrant returns (uint256 amountOut) {
        require(tokenIn != address(0) && tokenOut != address(0), "Invalid token address");
        require(amountIn > 0, "Amount must be greater than 0");
        require(tokenIn != tokenOut, "Cannot swap same token");

        // Calculate output amount (simplified pricing - in production, use AMM formula)
        uint256 fee = (amountIn * tradingFee) / FEE_DENOMINATOR;
        uint256 amountInAfterFee = amountIn - fee;
        
        // Simplified 1:1 swap for demo purposes
        // In production, implement proper AMM pricing (Uniswap v2/v3 style)
        amountOut = amountInAfterFee;

        require(amountOut >= minAmountOut, "Slippage tolerance exceeded");

        // Transfer tokens
        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).safeTransfer(msg.sender, amountOut);

        emit Swap(msg.sender, tokenIn, tokenOut, amountIn, amountOut, fee);

        return amountOut;
    }

    /**
     * @dev Add liquidity to a trading pair
     * @param token1 Address of first token
     * @param token2 Address of second token
     * @param amount1 Amount of first token
     * @param amount2 Amount of second token
     */
    function addLiquidity(
        address token1,
        address token2,
        uint256 amount1,
        uint256 amount2
    ) external nonReentrant {
        require(token1 != address(0) && token2 != address(0), "Invalid token address");
        require(amount1 > 0 && amount2 > 0, "Amounts must be greater than 0");

        // Transfer tokens from user
        IERC20(token1).safeTransferFrom(msg.sender, address(this), amount1);
        IERC20(token2).safeTransferFrom(msg.sender, address(this), amount2);

        // Update liquidity pool
        liquidityPools[token1][token2] += amount1;
        liquidityPools[token2][token1] += amount2;

        emit LiquidityAdded(msg.sender, token1, token2, amount1, amount2);
    }

    /**
     * @dev Remove liquidity from a trading pair
     * @param token1 Address of first token
     * @param token2 Address of second token
     * @param amount1 Amount of first token
     * @param amount2 Amount of second token
     */
    function removeLiquidity(
        address token1,
        address token2,
        uint256 amount1,
        uint256 amount2
    ) external nonReentrant onlyOwner {
        require(liquidityPools[token1][token2] >= amount1, "Insufficient liquidity");
        require(liquidityPools[token2][token1] >= amount2, "Insufficient liquidity");

        // Update liquidity pool
        liquidityPools[token1][token2] -= amount1;
        liquidityPools[token2][token1] -= amount2;

        // Transfer tokens to user
        IERC20(token1).safeTransfer(msg.sender, amount1);
        IERC20(token2).safeTransfer(msg.sender, amount2);

        emit LiquidityRemoved(msg.sender, token1, token2, amount1, amount2);
    }

    /**
     * @dev Update trading fee (only owner)
     * @param newFee New fee in basis points
     */
    function updateTradingFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        uint256 oldFee = tradingFee;
        tradingFee = newFee;
        emit FeeUpdated(oldFee, newFee);
    }

    /**
     * @dev Get quote for swap
     * @param tokenIn Address of input token
     * @param amountIn Amount of input tokens
     */
    function getQuote(
        address tokenIn,
        address /* tokenOut */,
        uint256 amountIn
    ) external view returns (uint256 amountOut) {
        require(tokenIn != address(0), "Invalid token address");
        require(amountIn > 0, "Amount must be greater than 0");

        uint256 fee = (amountIn * tradingFee) / FEE_DENOMINATOR;
        amountOut = amountIn - fee;

        return amountOut;
    }

    /**
     * @dev Withdraw collected fees (only owner)
     * @param token Token address
     * @param amount Amount to withdraw
     */
    function withdrawFees(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(msg.sender, amount);
    }
}
