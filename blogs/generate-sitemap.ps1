# Generate sitemap.xml - run from project root (unlockgames.org)
$utf8 = New-Object System.Text.UTF8Encoding $false
$baseUrl = "https://unlockgames.org"
$today = Get-Date -Format "yyyy-MM-dd"

$urls = @(
    @{loc="/"; priority="1.0"; changefreq="daily"},
    @{loc="/index.html"; priority="1.0"; changefreq="daily"},
    @{loc="/index-coupon.html"; priority="0.9"; changefreq="daily"},
    @{loc="/index1018.html"; priority="0.9"; changefreq="weekly"},
    @{loc="/blogs/category-latest.html"; priority="0.8"; changefreq="daily"},
    @{loc="/blogs/category-electronics.html"; priority="0.8"; changefreq="weekly"},
    @{loc="/blogs/category-fashion.html"; priority="0.8"; changefreq="weekly"},
    @{loc="/blogs/category-travel.html"; priority="0.8"; changefreq="weekly"},
    @{loc="/blogs/category-shopping.html"; priority="0.8"; changefreq="weekly"},
    @{loc="/about.html"; priority="0.5"; changefreq="monthly"},
    @{loc="/terms.html"; priority="0.3"; changefreq="monthly"},
    @{loc="/privacy.html"; priority="0.3"; changefreq="monthly"},
    @{loc="/contact.html"; priority="0.2"; changefreq="monthly"}
)

$scriptDir = Split-Path $PSScriptRoot -Parent
if (-not $scriptDir) { $scriptDir = (Get-Location).Path }
$articlesPath = Join-Path $scriptDir "blogs\articles-list.json"
if (Test-Path $articlesPath) {
    $articles = Get-Content $articlesPath -Raw -Encoding UTF8 | ConvertFrom-Json
    foreach ($a in $articles) {
        $urls += @{loc="/blogs/$($a.file)"; priority="0.7"; changefreq="monthly"; lastmod=$a.date}
    }
}

$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

"@
foreach ($u in $urls) {
    $lastmod = if ($u.lastmod) { $u.lastmod } else { $today }
    $xml += "    <url>`n"
    $xml += "        <loc>$baseUrl$($u.loc)</loc>`n"
    $xml += "        <lastmod>$lastmod</lastmod>`n"
    $xml += "        <changefreq>$($u.changefreq)</changefreq>`n"
    $xml += "        <priority>$($u.priority)</priority>`n"
    $xml += "    </url>`n"
}
$xml += "</urlset>"

$outPath = Join-Path (Split-Path $PSScriptRoot -Parent) "sitemap.xml"
[System.IO.File]::WriteAllText($outPath, $xml, $utf8)
Write-Host "Generated sitemap with $($urls.Count) URLs -> $outPath"
