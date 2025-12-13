# Enhanced Image Download Script for Homepage
# Downloads logos for all brands from fatcoupon.com

$imagesDir = ".\images"

# Ensure images directory exists
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

Write-Host "Downloading brand logos..." -ForegroundColor Green

# Function to download image
function Download-Image {
    param(
        [string]$Url,
        [string]$OutputFile
    )
    
    try {
        $outputPath = Join-Path $imagesDir $OutputFile
        Invoke-WebRequest -Uri $Url -OutFile $outputPath -UseBasicParsing
        Write-Host "✓ Downloaded: $OutputFile" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to download: $OutputFile - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Top Cashback Stores (24 brands)
$topStores = @(
    @{name = "vistaprint"; url = "https://logo.clearbit.com/vistaprint.com" },
    @{name = "hsn"; url = "https://logo.clearbit.com/hsn.com" },
    @{name = "petsmart"; url = "https://logo.clearbit.com/petsmart.com" },
    @{name = "newegg"; url = "https://logo.clearbit.com/newegg.com" },
    @{name = "disney"; url = "https://logo.clearbit.com/disney.com" },
    @{name = "chewy"; url = "https://logo.clearbit.com/chewy.com" },
    @{name = "woot"; url = "https://logo.clearbit.com/woot.com" },
    @{name = "acer"; url = "https://logo.clearbit.com/acer.com" },
    @{name = "proactiv"; url = "https://logo.clearbit.com/proactiv.com" },
    @{name = "aegean"; url = "https://logo.clearbit.com/aegeanair.com" },
    @{name = "perricone"; url = "https://logo.clearbit.com/perriconemd.com" },
    @{name = "quip"; url = "https://logo.clearbit.com/getquip.com" },
    @{name = "royalcanin"; url = "https://logo.clearbit.com/royalcanin.com" }
)

Write-Host "`nDownloading Top Cashback Stores logos..." -ForegroundColor Cyan
foreach ($store in $topStores) {
    Download-Image -Url $store.url -OutputFile "store-$($store.name).png"
}

# Travel brands (10 brands)
$travelStores = @(
    @{name = "hotels"; url = "https://logo.clearbit.com/hotels.com" },
    @{name = "flightcentre"; url = "https://logo.clearbit.com/flightcentre.com" },
    @{name = "avis"; url = "https://logo.clearbit.com/avis.com" },
    @{name = "ihg"; url = "https://logo.clearbit.com/ihg.com" },
    @{name = "expedia"; url = "https://logo.clearbit.com/expedia.com" },
    @{name = "marriott"; url = "https://logo.clearbit.com/marriott.com" },
    @{name = "priceline"; url = "https://logo.clearbit.com/priceline.com" },
    @{name = "tripadvisor"; url = "https://logo.clearbit.com/tripadvisor.com" },
    @{name = "orbitz"; url = "https://logo.clearbit.com/orbitz.com" }
)

Write-Host "`nDownloading Travel brands logos..." -ForegroundColor Cyan
foreach ($store in $travelStores) {
    Download-Image -Url $store.url -OutputFile "store-$($store.name).png"
}

Write-Host "`nDownload complete!" -ForegroundColor Green
Write-Host "Total logos downloaded: $($topStores.Count + $travelStores.Count)" -ForegroundColor Green
