# Simple Image Creation Script using ImageMagick-style approach
# Creates basic SVG placeholders that can be used directly

$imagesDir = ".\images"

# Ensure images directory exists
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

Write-Host "Creating SVG placeholder images..." -ForegroundColor Green

function Create-SVGPlaceholder {
    param(
        [int]$Width,
        [int]$Height,
        [string]$OutputFile,
        [string]$BackgroundColor = "#667eea",
        [string]$Text = ""
    )
    
    $outputPath = Join-Path $imagesDir $OutputFile
    
    $svg = @"
<svg width="$Width" height="$Height" xmlns="http://www.w3.org/2000/svg">
  <rect width="$Width" height="$Height" fill="$BackgroundColor"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">$Text</text>
</svg>
"@
    
    $svg | Out-File -FilePath $outputPath -Encoding UTF8
    Write-Host "✓ Created: $OutputFile" -ForegroundColor Green
}

# Create hero banner
Create-SVGPlaceholder -Width 1920 -Height 600 -OutputFile "hero-banner.svg" -BackgroundColor "#667eea" -Text "Get Cashback & Deals"

# Create deal images
Create-SVGPlaceholder -Width 400 -Height 300 -OutputFile "deal1.svg" -BackgroundColor "#ec4899" -Text "Special Offer"
Create-SVGPlaceholder -Width 400 -Height 300 -OutputFile "deal2.svg" -BackgroundColor "#f59e0b" -Text "Limited Time"
Create-SVGPlaceholder -Width 400 -Height 300 -OutputFile "deal3.svg" -BackgroundColor "#10b981" -Text "Hot Deal"
Create-SVGPlaceholder -Width 400 -Height 300 -OutputFile "deal4.svg" -BackgroundColor "#6366f1" -Text "Exclusive"
Create-SVGPlaceholder -Width 400 -Height 300 -OutputFile "deal5.svg" -BackgroundColor "#8b5cf6" -Text "Save Big"
Create-SVGPlaceholder -Width 400 -Height 300 -OutputFile "deal6.svg" -BackgroundColor "#ef4444" -Text "Flash Sale"

Write-Host "`nSVG placeholder images created successfully!" -ForegroundColor Cyan
Write-Host "Images saved to: $imagesDir" -ForegroundColor Cyan
Write-Host "`nNote: SVG images work perfectly in browsers and are resolution-independent!" -ForegroundColor Yellow
