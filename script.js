// Language switcher and game functionality
document.addEventListener('DOMContentLoaded', () => {
  // Language switcher
  const languageSwitcher = document.querySelector('.language-switcher');
  const dropdown = document.querySelector('.language-dropdown');

  // Toggle dropdown
  languageSwitcher.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!languageSwitcher.contains(e.target)) {
      languageSwitcher.classList.remove('active');
    }
  });

  // Prevent dropdown from closing when clicking inside
  dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Language selection handler
  const languageLinks = document.querySelectorAll('.language-dropdown a');
  languageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Get language code with fallback to 'en'
      const selectedLang = this.getAttribute('data-lang') || 'en';
      
      // Generate new path directly based on selected language
      let newPath = `index-${selectedLang}.html`;
      if (selectedLang === 'en') {
        newPath = 'index.html'; // Default language
      }

      // Update page language without redirect
      fetch(newPath)
        .then(response => response.text())
        .then(html => {
          document.documentElement.innerHTML = html;
          history.replaceState(null, '', newPath);
        })
        .catch(error => console.error('Error loading language:', error));
    });
  });

  // Game card click handler
  const gameCards = document.querySelectorAll('.game-card');
  const gameContainer = document.querySelector('.game-container iframe');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Fullscreen button functionality
  fullscreenBtn.addEventListener('click', () => {
    if (gameContainer.requestFullscreen) {
      gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) { // Firefox
      gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
      gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { // IE/Edge
      gameContainer.msRequestFullscreen();
    }
  });

  gameCards.forEach(card => {
    card.addEventListener('click', () => {
      const gameUrl = card.dataset.src;
      const gameName = card.querySelector('h3').textContent;
      
      // Update game iframe and title
      gameContainer.src = gameUrl;
      document.getElementById('featured-game-title').textContent = `Featured Game: ${gameName}`;
      
      // Scroll to game container
      document.querySelector('.game-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

// SEO optimization - Update meta tags
const updateMetaTags = (title, description) => {
  document.title = title;
  document.querySelector('meta[name="description"]').content = description;
};

// Lazy load images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazyload");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
        });
    }
});

// Game loading progress
function showLoadingProgress(gameIframe) {
    const progressBar = document.createElement('div');
    progressBar.className = 'game-progress';
    gameIframe.parentNode.insertBefore(progressBar, gameIframe);
    
    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    progressBar.appendChild(progress);
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            progressBar.remove();
            return;
        }
        width++;
        progress.style.width = width + '%';
    }, 20);
}
