(function () {
  var btn = document.getElementById('headerLangBtn');
  var panel = document.getElementById('headerLangPanel');
  if (!btn || !panel) return;

  function closePanel() {
    panel.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('is-open');
  }

  function openPanel() {
    panel.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('is-open');
  }

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (panel.hasAttribute('hidden')) openPanel();
    else closePanel();
  });

  panel.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  document.addEventListener('click', function () {
    closePanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });
})();
