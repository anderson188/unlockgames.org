// Game card click handler
document.addEventListener('DOMContentLoaded', () => {
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

// Initial SEO setup
updateMetaTags(
  'UnlockGames - Play Free Online Games',
  'Play the best free online games at UnlockGames. Enjoy a wide variety of fun and exciting games including Sprunki Phase 8, Squid Challenge, Tsunami Race and more!'
);
