# 🚀 How to Push FluxTrade to GitHub

## Step 1: Open Terminal
- Press `Command + Space` on Mac
- Type "Terminal" and press Enter

## Step 2: Go to Your Project Folder
Copy and paste this command, then press Enter:
```bash
cd /Users/nabinchapagain/Desktop/FluxTrade
```

## Step 3: Initialize Git
Copy and paste this command:
```bash
git init
```
This creates a new Git repository (like a special folder for tracking changes).

## Step 4: Add All Files
Copy and paste this command:
```bash
git add .
```
The dot (.) means "add everything in this folder."

## Step 5: Make Your First Commit
Copy and paste this command:
```bash
git commit -m "Initial commit: Complete FluxTrade DeFi trading platform"
```
This saves a snapshot of your project.

## Step 6: Rename Branch to Main
Copy and paste this command:
```bash
git branch -M main
```
This renames your branch to "main" (the default name on GitHub).

## Step 7: Connect to GitHub
Copy and paste this command:
```bash
git remote add origin https://github.com/nabin00012/FluxTrade.git
```
This tells Git where to send your code (your GitHub repository).

## Step 8: Push to GitHub
Copy and paste this command:
```bash
git push -u origin main
```
This uploads all your code to GitHub!

## What If You See an Error?

### Error: "remote origin already exists"
Run this first:
```bash
git remote remove origin
```
Then try Step 7 again.

### Error: "repository not found"
Make sure you created the repository on GitHub.com first:
1. Go to https://github.com/nabin00012/FluxTrade
2. If it doesn't exist, create it on GitHub first

### Error: "authentication failed"
You might need to use a Personal Access Token instead of password:
1. Go to GitHub.com → Settings → Developer Settings → Personal Access Tokens
2. Create a new token with "repo" permissions
3. Use that token as your password when pushing

## All Commands Together (Copy Everything)
```bash
cd /Users/nabinchapagain/Desktop/FluxTrade
git init
git add .
git commit -m "Initial commit: Complete FluxTrade DeFi trading platform"
git branch -M main
git remote add origin https://github.com/nabin00012/FluxTrade.git
git push -u origin main
```

## After Pushing Successfully

Your code is now on GitHub! You can:
- Share the link: https://github.com/nabin00012/FluxTrade
- View your code online
- Clone it on other computers
- Collaborate with others

## Future Updates

When you make changes and want to push again:
```bash
git add .
git commit -m "Description of what you changed"
git push
```

That's it! 🎉
