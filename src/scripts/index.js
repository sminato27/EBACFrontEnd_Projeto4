// Smooth scroll navigation with header offset
(function () {
  const header = document.querySelector('.header');
  const buttons = document.querySelectorAll('[data-scroll]');

  function getHeaderOffset() {
    if (!header) return 0;
    const styles = window.getComputedStyle(header);
    const isSticky = styles.position === 'sticky' || styles.position === 'fixed';
    return isSticky ? header.getBoundingClientRect().height : 0;
  }

  function smoothScrollTo(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const headerOffset = getHeaderOffset();
    const elementY = window.scrollY + el.getBoundingClientRect().top;
    const y = Math.max(elementY - headerOffset - 8, 0); // small spacing
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Attach to buttons
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const sel = btn.getAttribute('data-scroll');
      if (!sel) return;
      e.preventDefault();
      if (sel === '#inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        smoothScrollTo(sel);
      }
    });
  });

  // If there are hash links, handle on load
  if (location.hash) {
    const id = decodeURIComponent(location.hash);
    // Delay to allow layout to settle
    setTimeout(() => smoothScrollTo(id), 0);
  }
})();
