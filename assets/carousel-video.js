(function () {
  const inner = document.getElementById('carouselInner');
  if (!inner) return;

  const slides = Array.from(inner.querySelectorAll('.carousel-slide--video'));
  const dotsHost = document.getElementById('carouselDots');
  let slideIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  const lastTimes = new WeakMap();

  function getVideo(slide) {
    return slide ? slide.querySelector('video.carousel-video') : null;
  }

  function lockSeeking(video) {
    if (!video || video.dataset.seekLocked) return;
    video.dataset.seekLocked = '1';
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('controlsList', 'nodownload noplaybackrate noremoteplayback');
    video.addEventListener('timeupdate', () => {
      lastTimes.set(video, video.currentTime);
    });
    video.addEventListener('seeking', () => {
      const last = lastTimes.get(video) ?? 0;
      if (Math.abs(video.currentTime - last) > 0.35) {
        video.currentTime = last;
      }
    });
    video.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') e.preventDefault();
    });
  }

  slides.forEach((slide, i) => {
    const video = getVideo(slide);
    if (video) lockSeeking(video);

    const btn = slide.querySelector('.carousel-video-play');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (i !== slideIndex) return;
        togglePlay(slide);
      });
    }

    if (dotsHost) {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', () => showSlide(i));
      dotsHost.appendChild(d);
    }
  });

  function setPlayIcon(slide, playing) {
    const btn = slide.querySelector('.carousel-video-play');
    if (!btn) return;
    btn.classList.toggle('is-paused', !playing);
    btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
  }

  function pauseAll() {
    slides.forEach((slide) => {
      const v = getVideo(slide);
      if (v && !v.paused) v.pause();
      setPlayIcon(slide, false);
    });
  }

  function playSlide(slide) {
    const v = getVideo(slide);
    if (!v) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    setPlayIcon(slide, true);
  }

  function togglePlay(slide) {
    const v = getVideo(slide);
    if (!v) return;
    if (v.paused) playSlide(slide);
    else {
      v.pause();
      setPlayIcon(slide, false);
    }
  }

  function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === slideIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      const v = getVideo(slide);
      if (!active && v) {
        v.pause();
        setPlayIcon(slide, false);
      }
    });
    if (dotsHost) {
      dotsHost.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === slideIndex);
      });
    }
    playSlide(slides[slideIndex]);
  }

  window.carouselPrev = () => showSlide(slideIndex - 1);
  window.carouselNext = () => showSlide(slideIndex + 1);

  inner.addEventListener(
    'touchstart',
    (e) => {
      if (!e.changedTouches[0]) return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true }
  );

  inner.addEventListener(
    'touchend',
    (e) => {
      if (!e.changedTouches[0]) return;
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx > 0) window.carouselPrev();
      else window.carouselNext();
    },
    { passive: true }
  );

  let dragX = 0;
  inner.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    dragX = e.clientX;
    inner.setPointerCapture(e.pointerId);
  });
  inner.addEventListener('pointerup', (e) => {
    if (e.pointerType === 'touch' || !dragX) return;
    const dx = e.clientX - dragX;
    dragX = 0;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) window.carouselPrev();
    else window.carouselNext();
  });

  showSlide(0);
})();
