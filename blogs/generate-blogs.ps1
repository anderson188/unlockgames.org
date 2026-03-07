# Generate remaining brand blog articles
$brands = @(
    @{slug="bloomingdales"; name="Bloomingdale's"; url="https://www.bonusarrive.com/link?ad=11578&c=2586&subid=&sub2id=&url=&tr=unlockgames"; cashback="Up to 3.5%"; category="Luxury Retail"; desc="Over 150 years of luxury retail. Explore designer collections."},
    @{slug="olive-young"; name="Olive Young"; url="https://global.oliveyoung.com/?utm_source=rakuten&utm_medium=affiliate&utm_campaign=3963379&utm_keyword=VrKRnVWwRIk-aTMWnUOGkYQ97Ht0AnBSRw&ranMID=53765&ranEAID=VrKRnVWwRIk&ranSiteID=VrKRnVWwRIk-aTMWnUOGkYQ97Ht0AnBSRw"; cashback="Up to 9%"; category="Beauty"; desc="Korea's #1 K-Beauty destination."},
    @{slug="walmart"; name="Walmart"; url="https://www.walmart.com"; cashback="3%"; category="Retail"; desc="America's largest retailer."},
    @{slug="target"; name="Target"; url="https://www.target.com"; cashback="Up to 4%"; category="Retail"; desc="Expect More. Pay Less."},
    @{slug="bestbuy"; name="Best Buy"; url="https://www.bestbuy.com"; cashback="2%"; category="Electronics"; desc="Your tech destination."},
    @{slug="macys"; name="Macy's"; url="https://www.macys.com"; cashback="Up to 6%"; category="Department Store"; desc="Iconic American department store."},
    @{slug="sephora"; name="Sephora"; url="https://www.sephora.com"; cashback="Up to 8%"; category="Beauty"; desc="The ultimate beauty playground."},
    @{slug="nordstrom"; name="Nordstrom"; url="https://www.nordstrom.com"; cashback="4%"; category="Luxury Retail"; desc="Legendary customer service."},
    @{slug="ebay"; name="eBay"; url="https://www.ebay.com"; cashback="1.5%"; category="Marketplace"; desc="The world's online marketplace."},
    @{slug="homedepot"; name="Home Depot"; url="https://www.homedepot.com"; cashback="3.2%"; category="Home Improvement"; desc="More saving. More doing."},
    @{slug="disney"; name="Disney"; url="https://www.disney.com"; cashback="Up to `$9"; category="Entertainment"; desc="Where dreams come true."},
    @{slug="acer"; name="Acer"; url="https://www.acer.com"; cashback="8%"; category="Electronics"; desc="Gaming laptops and innovation."},
    @{slug="petsmart"; name="PetSmart"; url="https://www.petsmart.com"; cashback="3.2%"; category="Pet Supplies"; desc="Everything for your furry friends."},
    @{slug="chewy"; name="Chewy"; url="https://www.chewy.com"; cashback="3.2%"; category="Pet Supplies"; desc="Pet parents' favorite."},
    @{slug="woot"; name="Woot!"; url="https://www.woot.com"; cashback="Up to 9%"; category="Deals"; desc="One deal a day."},
    @{slug="newegg"; name="Newegg"; url="https://www.newegg.com"; cashback="2%"; category="Electronics"; desc="PC builders' paradise."},
    @{slug="hotels"; name="Hotels.com"; url="https://www.hotels.com"; cashback="Up to 2%"; category="Travel"; desc="Rewards nights worldwide."},
    @{slug="expedia"; name="Expedia"; url="https://www.expedia.com"; cashback="Up to 2.5%"; category="Travel"; desc="Complete trip planning."},
    @{slug="marriott"; name="Marriott"; url="https://www.marriott.com"; cashback="Up to 3.2%"; category="Travel"; desc="Luxury stays worldwide."},
    @{slug="avis"; name="Avis"; url="https://www.avis.com"; cashback="5.6%"; category="Car Rental"; desc="We try harder."},
    @{slug="tripadvisor"; name="TripAdvisor"; url="https://www.tripadvisor.com"; cashback="Up to 7.2%"; category="Travel"; desc="Reviews and bookings."},
    @{slug="vistaprint"; name="Vistaprint"; url="https://www.vistaprint.com"; cashback="Up to 4.5%"; category="Printing"; desc="Professional printing."},
    @{slug="hsn"; name="HSN"; url="https://www.hsn.com"; cashback="Up to 6%"; category="Shopping"; desc="Live shopping network."},
    @{slug="proactiv"; name="Proactiv"; url="https://www.proactiv.com"; cashback="15%"; category="Skincare"; desc="Acne solutions."},
    @{slug="kohls"; name="Kohl's"; url="https://www.kohls.com"; cashback="Up to 5%"; category="Retail"; desc="Kohl's Cash rewards."},
    @{slug="perriconemd"; name="PerriconeMD"; url="https://www.perriconemd.com"; cashback="Up to 8.8%"; category="Skincare"; desc="Science-backed skincare."},
    @{slug="quip"; name="Quip"; url="https://www.getquip.com"; cashback="4.8%"; category="Oral Care"; desc="Smart electric toothbrush."},
    @{slug="royalcanin"; name="Royal Canin"; url="https://www.royalcanin.com"; cashback="11.2%"; category="Pet Food"; desc="Breed-specific nutrition."},
    @{slug="farfetch"; name="Farfetch"; url="https://www.farfetch.com/cn/shopping/women/items.aspx?clickref=1100lBLKnPi7&utm_source=yeahpromos&utm_medium=affiliate&utm_campaign=PHUS&pid=performancehorizon_int&c=PHUS&clickid=1100lBLKnPi7&af_siteid=yeahpromos&af_cost_model=CPA&af_channel=affiliate&is_retargeting=true"; cashback="3.2%"; category="Luxury Fashion"; desc="Luxury from global boutiques."},
    @{slug="govee"; name="Govee"; url="https://yeahpromos.com/index/index/openurl?track=36105df98176b538&url="; cashback="6.2%"; category="Smart Home"; desc="Smart LED lights."},
    @{slug="alamo"; name="Alamo"; url="https://yeahpromos.com/index/index/openurl?track=bca4b6a9eb216d69&url="; cashback="Up to 3.5%"; category="Car Rental"; desc="Low-cost car rental."},
    @{slug="flightcentre"; name="Flight Centre"; url="https://www.flightcentre.com"; cashback="Up to 3%"; category="Travel"; desc="Travel experts."},
    @{slug="ihg"; name="IHG Hotels"; url="https://www.ihg.com"; cashback="1.5%"; category="Travel"; desc="19 brands worldwide."},
    @{slug="priceline"; name="Priceline"; url="https://www.priceline.com"; cashback="1.5%"; category="Travel"; desc="Name your own price."},
    @{slug="orbitz"; name="Orbitz"; url="https://www.orbitz.com"; cashback="Up to 2%"; category="Travel"; desc="Orbucks rewards."}
)

$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE} - unLockGames</title>
    <meta name="description" content="{DESC}. Earn {CASHBACK} cashback when you shop.">
    <link rel="stylesheet" href="../blog-main.css">
    <link rel="canonical" href="https://unlockgames.org/blogs/blog-{SLUG}.html">
</head>
<body>
    <nav class="category-bar">
        <div class="container">
            <a href="../index-blog.html" class="logo">unLock<span>Games</span></a>
            <div class="category-links">
                <a href="../index.html" class="category-link">Coupons / &#20248;&#24800;&#21048;</a>
                <a href="../index1018.html" class="category-link games">Games / &#28216;&#25103;</a>
            </div>
            <nav class="nav-links-blog">
                <a href="../about.html">About Us</a>
                <a href="../terms.html">Terms</a>
                <a href="../privacy.html">Privacy</a>
                <a href="../contact.html">Contact</a>
            </nav>
        </div>
    </nav>

    <section class="article-header">
        <div class="container">
            <a href="../index-blog.html" class="back-link">&larr; Back to Brand Stories</a>
            <h1>{TITLE}</h1>
            <div class="article-meta">{CATEGORY} &middot; {NAME} &middot; March 2025</div>
        </div>
    </section>

    <article class="article-content">
        <h2>About {NAME}</h2>
        <p>{DESC} With a commitment to quality and customer satisfaction, {NAME} has become a trusted destination for shoppers worldwide.</p>

        <h2>Shop & Earn Cashback</h2>
        <p>When you <a href="{URL}" target="_blank" rel="noopener noreferrer nofollow">shop at {NAME}</a> through our link, you'll earn <strong>{CASHBACK} cashback</strong> on your purchase. Same products, same prices - plus rewards in your pocket.</p>

        <div class="article-cta">
            <a href="{URL}" target="_blank" rel="noopener noreferrer nofollow">Shop {NAME} & Get Cashback &rarr;</a>
        </div>

        <p><em>Disclosure: unLockGames earns a commission when you shop through our links at no extra cost to you.</em></p>
    </article>

    <footer class="footer-blog">
        <div class="container">
            <div class="footer-bottom">
                <p>&copy; 2025 unLockGames. <a href="../privacy.html">Privacy</a> &middot; <a href="../terms.html">Terms</a></p>
            </div>
        </div>
    </footer>
</body>
</html>
'@

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
foreach ($b in $brands) {
    $content = $template -replace '\{TITLE\}', $b.name -replace '\{NAME\}', $b.name -replace '\{SLUG\}', $b.slug -replace '\{URL\}', $b.url -replace '\{CASHBACK\}', $b.cashback -replace '\{CATEGORY\}', $b.category -replace '\{DESC\}', $b.desc
    [System.IO.File]::WriteAllText("$PWD\blog-$($b.slug).html", $content, $utf8NoBom)
    Write-Host "Created blog-$($b.slug).html"
}
