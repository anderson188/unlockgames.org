# Generate category list pages with pagination
$utf8 = New-Object System.Text.UTF8Encoding $false

$categoryMap = @{
    "electronics" = @("samsung","acer","amazon","bestbuy","ebay","newegg","govee")
    "fashion" = @("adidas","nike","shein","bloomingdales","olive-young","sephora","nordstrom","macys","farfetch","perriconemd","proactiv","quip")
    "travel" = @("hotels","expedia","marriott","avis","tripadvisor","alamo","flightcentre","ihg","priceline","orbitz","disney")
    "shopping" = @("walmart","target","homedepot","vistaprint","hsn","kohls","petsmart","chewy","woot","royalcanin")
}

$categoryNames = @{
    "electronics" = "Electronics & Tech"
    "fashion" = "Fashion & Beauty"
    "travel" = "Travel"
    "shopping" = "Shopping & Retail"
}

$articles = Get-Content "articles-list.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$perPage = 15

$navHtml = @'
    <nav class="blog-nav">
        <div class="container">
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../index-coupon.html">Coupons</a></li>
                <li><a href="../index1018.html">Games</a></li>
                <li><a href="../about.html">About</a></li>
                <li><a href="../terms.html">Terms</a></li>
                <li><a href="../privacy.html">Privacy</a></li>
                <li><a href="../contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>
'@

foreach ($catSlug in $categoryMap.Keys) {
    $brands = $categoryMap[$catSlug]
    $catArticles = $articles | Where-Object { $brands -contains $_.brand.slug } | Sort-Object { $_.date } -Descending
    $total = $catArticles.Count
    $totalPages = [Math]::Ceiling($total / $perPage)
    if ($totalPages -lt 1) { $totalPages = 1 }

    for ($p = 1; $p -le $totalPages; $p++) {
        $start = ($p - 1) * $perPage
        $pageArticles = $catArticles[$start..([Math]::Min($start + $perPage - 1, $total - 1))]
        $suffix = if ($p -eq 1) { "" } else { "-$p" }
        $filename = "category-$catSlug$suffix.html"
        $catName = $categoryNames[$catSlug]

        $listHtml = ""
        foreach ($a in $pageArticles) {
            $listHtml += "<li><a href=`"$($a.file)`">$($a.title)</a><span class=`"date`">$($a.date)</span></li>`n"
        }

        $prevLink = ""
        $nextLink = ""
        if ($p -gt 1) {
            $prevFile = if ($p -eq 2) { "category-$catSlug.html" } else { "category-$catSlug-$($p-1).html" }
            $prevLink = "<a href=`"$prevFile`" class=`"pagination-prev`">&laquo; Previous</a>"
        }
        if ($p -lt $totalPages) {
            $nextFile = "category-$catSlug-$($p+1).html"
            $nextLink = "<a href=`"$nextFile`" class=`"pagination-next`">Next &raquo;</a>"
        }
        $pageInfo = "Page $p of $totalPages"
        $paginationHtml = "<div class=`"pagination`">$prevLink <span class=`"pagination-info`">$pageInfo</span> $nextLink</div>"

        $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$catName - unLockGames</title>
    <meta name="description" content="Browse all $catName articles. Buying guides, tips, and recommendations.">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/$filename">
</head>
<body>
    <header class="blog-header">
        <div class="container">
            <a href="../index.html" class="blog-logo">unLockGames</a>
            <input type="text" class="blog-search" placeholder="Search...">
        </div>
    </header>
    $navHtml

    <main class="article-content" style="max-width:800px;margin:2rem auto;padding:0 20px;">
        <a href="../index.html" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#22d3ee;">&larr; Back to Home</a>
        <h1>$catName</h1>
        <p style="color:#94a3b8;margin-bottom:1.5rem;">$total articles</p>
        <ul class="category-article-list">
$listHtml
        </ul>
        $paginationHtml
    </main>

    <footer class="blog-footer">
        <div class="container">
            <p class="footer-bottom">&copy; 2025 unLockGames. <a href="../privacy.html">Privacy</a> | <a href="../terms.html">Terms</a></p>
        </div>
    </footer>
</body>
</html>
"@
        [System.IO.File]::WriteAllText("$PWD\$filename", $content, $utf8)
        Write-Host "Created $filename"
    }
}

# Latest articles (all, sorted by date)
$latestArticles = $articles | Sort-Object { $_.date } -Descending
$total = $latestArticles.Count
$totalPages = [Math]::Ceiling($total / $perPage)
if ($totalPages -lt 1) { $totalPages = 1 }

for ($p = 1; $p -le $totalPages; $p++) {
    $start = ($p - 1) * $perPage
    $pageArticles = $latestArticles[$start..([Math]::Min($start + $perPage - 1, $total - 1))]
    $suffix = if ($p -eq 1) { "" } else { "-$p" }
    $filename = "category-latest$suffix.html"

    $listHtml = ""
    foreach ($a in $pageArticles) {
        $listHtml += "<li><a href=`"$($a.file)`">$($a.title)</a><span class=`"date`">$($a.date)</span></li>`n"
    }

    $prevLink = ""
    $nextLink = ""
    if ($p -gt 1) {
        $prevFile = if ($p -eq 2) { "category-latest.html" } else { "category-latest-$($p-1).html" }
        $prevLink = "<a href=`"$prevFile`" class=`"pagination-prev`">&laquo; Previous</a>"
    }
    if ($p -lt $totalPages) {
        $nextFile = "category-latest-$($p+1).html"
        $nextLink = "<a href=`"$nextFile`" class=`"pagination-next`">Next &raquo;</a>"
    }
    $pageInfo = "Page $p of $totalPages"
    $paginationHtml = "<div class=`"pagination`">$prevLink <span class=`"pagination-info`">$pageInfo</span> $nextLink</div>"

    $content = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Latest Articles - unLockGames</title>
    <meta name="description" content="Browse all latest articles. Buying guides, tips, and recommendations.">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/$filename">
</head>
<body>
    <header class="blog-header">
        <div class="container">
            <a href="../index.html" class="blog-logo">unLockGames</a>
            <input type="text" class="blog-search" placeholder="Search...">
        </div>
    </header>
    $navHtml

    <main class="article-content" style="max-width:800px;margin:2rem auto;padding:0 20px;">
        <a href="../index.html" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#22d3ee;">&larr; Back to Home</a>
        <h1>Latest Articles</h1>
        <p style="color:#94a3b8;margin-bottom:1.5rem;">$total articles</p>
        <ul class="category-article-list">
$listHtml
        </ul>
        $paginationHtml
    </main>

    <footer class="blog-footer">
        <div class="container">
            <p class="footer-bottom">&copy; 2025 unLockGames. <a href="../privacy.html">Privacy</a> | <a href="../terms.html">Terms</a></p>
        </div>
    </footer>
</body>
</html>
"@
    [System.IO.File]::WriteAllText("$PWD\$filename", $content, $utf8)
    Write-Host "Created $filename"
}

Write-Host "`nCategory pages generated."
