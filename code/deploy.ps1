# IronMind - Quick Deployment Script
# Run this script after authenticating with GitHub and Vercel

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "IronMind - Deployment Helper" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is configured
Write-Host "[1/5] Checking Git configuration..." -ForegroundColor Yellow
$gitUser = git config user.name
$gitEmail = git config user.email
if ($gitUser -and $gitEmail) {
    Write-Host "✓ Git configured: $gitUser <$gitEmail>" -ForegroundColor Green
} else {
    Write-Host "✗ Git not fully configured" -ForegroundColor Red
    Write-Host "Run:" -ForegroundColor Yellow
    Write-Host '  git config user.name "Your Name"' -ForegroundColor White
    Write-Host '  git config user.email "your@email.com"' -ForegroundColor White
    exit 1
}

# Check Git status
Write-Host "`n[2/5] Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠ Uncommitted changes detected" -ForegroundColor Yellow
    Write-Host "Commit changes before deploying" -ForegroundColor White
} else {
    Write-Host "✓ Working directory clean" -ForegroundColor Green
}

# Check remote
Write-Host "`n[3/5] Checking GitHub remote..." -ForegroundColor Yellow
$remoteUrl = git remote get-url origin 2>$null
if ($remoteUrl) {
    Write-Host "✓ Remote configured: $remoteUrl" -ForegroundColor Green
} else {
    Write-Host "✗ No remote configured" -ForegroundColor Red
    exit 1
}

# Check if Vercel is installed
Write-Host "`n[4/5] Checking Vercel CLI..." -ForegroundColor Yellow
$vercelPath = Get-Command vercel -ErrorAction SilentlyContinue
if ($vercelPath) {
    $vercelVersion = vercel --version
    Write-Host "✓ Vercel CLI installed: $vercelVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Vercel CLI not found" -ForegroundColor Red
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✓ Vercel CLI installed" -ForegroundColor Green
}

# Check build
Write-Host "`n[5/5] Checking last build..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Write-Host "✓ Build directory exists" -ForegroundColor Green
} else {
    Write-Host "⚠ Build directory not found" -ForegroundColor Yellow
    Write-Host "Running build..." -ForegroundColor White
    npm run build
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Ready for Deployment!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Push to GitHub:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy to Vercel:" -ForegroundColor White
Write-Host "   vercel" -ForegroundColor Gray
Write-Host "   (follow prompts)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Deploy to production:" -ForegroundColor White
Write-Host "   vercel --prod" -ForegroundColor Gray
Write-Host ""
Write-Host "Need help? Read DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor Cyan
