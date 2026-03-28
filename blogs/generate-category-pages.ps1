# Generate category list pages with pagination (magazine-style cards + excerpts)
$utf8 = New-Object System.Text.UTF8Encoding $false

function Escape-Html([string]$s) {
    if ([string]::IsNullOrEmpty($s)) { return "" }
    return ($s -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;' -replace '"', '&quot;')
}

function Get-ArticleExcerpt($a) {
    $ex = $a.metaDesc
    if ([string]::IsNullOrWhiteSpace($ex)) { $ex = $a.title }
    $ex = $ex -replace ' - Honest buying guide and recommendations\. Make informed decisions and save\.', ''
    $ex = $ex.Trim()
    if ($ex.Length -gt 220) {
        $ex = $ex.Substring(0, 217).TrimEnd() + "..."
    }
    return $ex
}

$categoryMap = @{
    "electronics" = @("samsung","acer","amazon","bestbuy","ebay","newegg","govee")
    "fashion"     = @("adidas","nike","shein","bloomingdales","olive-young","sephora","nordstrom","macys","farfetch","perriconemd","proactiv","quip")
    "travel"      = @("hotels","expedia","marriott","avis","tripadvisor","alamo","flightcentre","ihg","priceline","orbitz","disney","travel-editorial")
    "shopping"    = @("walmart","target","homedepot","vistaprint","hsn","kohls","petsmart","chewy","woot","royalcanin")
}

$categoryNames = @{
    "electronics" = "Electronics & Tech"
    "fashion"     = "Fashion & Beauty"
    "travel"      = "Travel"
    "shopping"    = "Shopping & Retail"
}

$categoryIntros = @{
    "travel"      = "Travel is more than a destination label: timing, transfers, and the fine print that actually matters when plans shift. These guides read like trip notes from someone who has done the homework - hotels, packages, rentals, and rewards, without brochure fluff."
    "electronics" = "Hands-on guides for tech and gadgets: what specs matter, what is noise, and how to time a purchase."
    "fashion"     = "Style and beauty picks explained for real routines—not trend headlines that age in a week."
    "shopping"    = "Retail timing, rewards, and store-specific tips so you spend less time guessing at checkout."
}

# Articles not yet in articles-list.json (merge into Travel)
$travelExtraArticles = @(
    [pscustomobject]@{ file = "topic-xcaret.html"; title = "Hotel Xcaret Topic Hub (2026)"; date = "2026-03-21"; metaDesc = "Hotel Xcaret topic hub: booking guide, comparisons, budget, itinerary, transport, and cancellation checklist in one place."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-4.html"; title = "Hotel Xcaret with Kids: Family Planning Checklist for 2026"; date = "2026-03-21"; metaDesc = "Traveling to Hotel Xcaret with kids? Use this practical family checklist for room selection, park pacing, transport, and meal planning."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-5.html"; title = "4-Night Hotel Xcaret Itinerary: Balanced Plan for First-Time Visitors"; date = "2026-03-21"; metaDesc = "A practical 4-night Hotel Xcaret itinerary for first-time visitors: park days, rest pacing, and transfer timing without over-scheduling."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-6.html"; title = "Hotel Xcaret Budget Breakdown: What Impacts Total Trip Cost"; date = "2026-03-21"; metaDesc = "Understand Hotel Xcaret total budget beyond room rate: dates, room category, transport, and activity pacing that affect real trip cost."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-7.html"; title = "Airport Transfer Tips for Hotel Xcaret: What to Confirm Before You Fly"; date = "2026-03-21"; metaDesc = "Hotel Xcaret airport transfer tips: timing, pickup details, and arrival-day planning to avoid common first-day mistakes."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-8.html"; title = "Hotel Xcaret Cancellation Policy: How to Reduce Booking Risk"; date = "2026-03-21"; metaDesc = "How to evaluate Hotel Xcaret cancellation terms before payment. A simple risk checklist for flexible and non-refundable bookings."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-1.html"; title = "Hotel Xcaret Mexico: Is All-Fun Inclusive Worth It in 2026?"; date = "2026-03-21"; metaDesc = "Planning Cancun or Riviera Maya? Learn what Hotel Xcaret Mexico includes, who it fits best, and how to avoid common booking mistakes before you reserve."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-2.html"; title = "Hotel Xcaret Arte vs Hotel Xcaret Mexico: Which One Should You Book?"; date = "2026-03-21"; metaDesc = "Comparing Hotel Xcaret Arte and Hotel Xcaret Mexico? See the practical differences in vibe, guests, dining, and trip style before you reserve."; brand = @{ slug = "xcaret" } }
    [pscustomobject]@{ file = "blog-xcaret-3.html"; title = "5 Booking Mistakes to Avoid Before Reserving Hotel Xcaret"; date = "2026-03-21"; metaDesc = "Avoid expensive planning mistakes before booking Hotel Xcaret. A practical checklist for families and couples traveling to Riviera Maya."; brand = @{ slug = "xcaret" } }
)

$thumbPools = @{
    "electronics" = @(
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=640&h=360&fit=crop"
    )
    "fashion" = @(
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=640&h=360&fit=crop"
    )
    "travel" = @(
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=640&h=360&fit=crop"
    )
    "shopping" = @(
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=640&h=360&fit=crop"
    )
    "default" = @(
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=640&h=360&fit=crop",
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&h=360&fit=crop"
    )
}

$brandPoolKey = @{}
foreach ($k in $categoryMap.Keys) {
    foreach ($b in $categoryMap[$k]) {
        $brandPoolKey[$b] = $k
    }
}
$brandPoolKey["xcaret"] = "travel"
$brandPoolKey["travel-editorial"] = "travel"
$categoryNames["sport-fashion"] = "Sport & Fashion"
$brandPoolKey["sport-fashion"] = "fashion"

function Get-ThumbPoolKey($article, $fallbackCategory) {
    if ($article.brand -and $article.brand.slug) {
        $slug = $article.brand.slug
        if ($brandPoolKey.ContainsKey($slug)) {
            return $brandPoolKey[$slug]
        }
    }
    return $fallbackCategory
}

function Get-DisplayTag($article, $fallbackTag) {
    if ($article.brand -and $article.brand.slug -and $brandPoolKey.ContainsKey($article.brand.slug)) {
        $ck = $brandPoolKey[$article.brand.slug]
        return $categoryNames[$ck]
    }
    return $fallbackTag
}

function Build-MagGridHtml($pageArticles, $poolKey, $tagFallback) {
    $html = ""
    $i = 0
    foreach ($a in $pageArticles) {
        $pk = Get-ThumbPoolKey $a $poolKey
        $pool = $thumbPools[$pk]
        if (-not $pool) { $pool = $thumbPools["default"] }
        $imgUrl = $pool[$i % $pool.Count]
        $i++

        $titleEsc = Escape-Html $a.title
        $excerptEsc = Escape-Html (Get-ArticleExcerpt $a)
        $file = $a.file
        $date = $a.date
        $tagEsc = Escape-Html (Get-DisplayTag $a $tagFallback)

        $html += @"
            <article class="category-mag-card">
                <a href="$file" class="category-mag-thumb-link"><img class="category-mag-thumb" src="$imgUrl" alt="" width="640" height="360" loading="lazy"></a>
                <div class="category-mag-body">
                    <div class="category-mag-meta"><time datetime="$date">$date</time><span class="category-mag-tag">$tagEsc</span></div>
                    <h2 class="category-mag-title"><a href="$file">$titleEsc</a></h2>
                    <p class="category-mag-excerpt">$excerptEsc</p>
                    <a href="$file" class="category-mag-readmore">Read more</a>
                </div>
            </article>
"@
        $html += "`n"
    }
    return $html
}

$articles = Get-Content "articles-list.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$perPage = 15

$navHtml = @'
    <nav class="blog-nav">
        <div class="container">
            <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../index.html#electronics">Electronics & Tech</a></li>
                <li><a href="../index.html#fashion">Fashion & Beauty</a></li>
                <li><a href="../index.html#sport-fashion">Sport & Fashion</a></li>
                <li><a href="../index.html#shopping">Shopping & Retail</a></li>
                <li><a href="../index.html#travel">Travel</a></li>
            </ul>
        </div>
    </nav>
'@

$headerHtml = @'
    <header class="blog-header">
        <div class="container">
            <a href="../index.html" class="blog-logo">unLockGames</a>
            <form action="../search.html" method="get" class="blog-search-form" role="search">
                <input type="text" name="q" class="blog-search" placeholder="Search articles..." autocomplete="off">
                <button type="submit" class="blog-search-btn" aria-label="Search">Search</button>
            </form>
        </div>
    </header>
'@

$footerHtml = @'
    <footer class="blog-footer">
        <div class="container">
            <div class="footer-links">
                <a href="../index.html">Home</a>
                <a href="../index.html#electronics">Electronics</a>
                <a href="../index.html#fashion">Fashion</a>
                <a href="../index.html#sport-fashion">Sport &amp; Fashion</a>
                <a href="../index.html#shopping">Shopping</a>
                <a href="../index.html#travel">Travel</a>
                <a href="../about.html">About Us</a>
                <a href="../privacy.html">Privacy</a>
            </div>
            <p class="footer-bottom"><strong>Disclosure:</strong> We may earn a commission when you shop through our links at no extra cost to you. <a href="../privacy.html">Privacy</a> | <a href="../terms.html">Terms</a></p>
            <p class="footer-bottom">&copy; 2025 unLockGames. All rights reserved.</p>
        </div>
    </footer>
    <script src="../ai-assistant.js"></script>
'@

foreach ($catSlug in $categoryMap.Keys) {
    $brands = $categoryMap[$catSlug]
    $catArticles = [System.Collections.ArrayList]@()
    foreach ($x in ($articles | Where-Object { $brands -contains $_.brand.slug })) {
        [void]$catArticles.Add($x)
    }
    if ($catSlug -eq "travel") {
        foreach ($x in $travelExtraArticles) {
            [void]$catArticles.Add($x)
        }
    }
    $catArticles = $catArticles | Sort-Object { $_.date } -Descending
    $total = $catArticles.Count
    $totalPages = [Math]::Ceiling($total / $perPage)
    if ($totalPages -lt 1) { $totalPages = 1 }

    $catName = $categoryNames[$catSlug]
    $intro = $categoryIntros[$catSlug]
    if (-not $intro) { $intro = "Browse our $catName guides—practical write-ups you can use before you buy." }

    $pageMetaDesc = if ($catSlug -eq "travel") {
        "Travel guides for hotels, packages, rentals, and rewards: planning notes and real trade-offs, not brochure copy."
    } else {
        "Browse all $catName articles on unLockGames. Buying guides, tips, and recommendations."
    }

    for ($p = 1; $p -le $totalPages; $p++) {
        $start = ($p - 1) * $perPage
        $pageArticles = $catArticles[$start..([Math]::Min($start + $perPage - 1, $total - 1))]
        $suffix = if ($p -eq 1) { "" } else { "-$p" }
        $filename = "category-$catSlug$suffix.html"

        $gridHtml = Build-MagGridHtml $pageArticles $catSlug $catName

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
    <meta name="description" content="$pageMetaDesc">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/$filename">
</head>
<body>
$headerHtml
$navHtml

    <main class="article-content category-page-mag" style="margin:2rem auto;padding:0 20px;">
        <a href="../index.html" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#22d3ee;">&larr; Back to Home</a>
        <h1 class="category-hero-title">$catName</h1>
        <p class="category-count-line">$total articles</p>
        <p class="category-intro">$intro</p>
        <div class="category-mag-grid">
$gridHtml
        </div>
        $paginationHtml
    </main>

$footerHtml
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

$latestIntro = "New and updated guides across every category—editorial depth first, with dates so you can see what landed recently."
$latestMeta = "Latest buying guides and tips on unLockGames, sorted by publish date."

for ($p = 1; $p -le $totalPages; $p++) {
    $start = ($p - 1) * $perPage
    $pageArticles = $latestArticles[$start..([Math]::Min($start + $perPage - 1, $total - 1))]
    $suffix = if ($p -eq 1) { "" } else { "-$p" }
    $filename = "category-latest$suffix.html"

    $gridHtml = Build-MagGridHtml $pageArticles "default" "Guides"

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
    <meta name="description" content="$latestMeta">
    <link rel="stylesheet" href="../blog-traditional.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/$filename">
</head>
<body>
$headerHtml
$navHtml

    <main class="article-content category-page-mag" style="margin:2rem auto;padding:0 20px;">
        <a href="../index.html" class="back-link" style="display:inline-block;margin-bottom:1rem;color:#22d3ee;">&larr; Back to Home</a>
        <h1 class="category-hero-title">Latest Articles</h1>
        <p class="category-count-line">$total articles</p>
        <p class="category-intro">$latestIntro</p>
        <div class="category-mag-grid">
$gridHtml
        </div>
        $paginationHtml
    </main>

$footerHtml
</body>
</html>
"@
    [System.IO.File]::WriteAllText("$PWD\$filename", $content, $utf8)
    Write-Host "Created $filename"
}

Write-Host "`nCategory pages generated."
