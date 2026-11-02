export function initContactTracking() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('[data-contact]');
    if (!link || typeof window.gtag !== 'function') return;

    window.gtag('event', 'contact_click', {
      contact_method: link.dataset.contact,
      link_text: link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80),
    });
  });
}
