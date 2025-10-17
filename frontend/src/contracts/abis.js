// Contract ABIs will be imported here after compilation
// Copy the ABIs from contracts/artifacts after running: npm run compile

export const EXCHANGE_ABI = [
  "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut) external returns (uint256)",
  "function addLiquidity(address token1, address token2, uint256 amount1, uint256 amount2) external",
  "function getQuote(address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256)",
  "function tradingFee() external view returns (uint256)",
  "event Swap(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut, uint256 fee)",
];

export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
];
