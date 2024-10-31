export const mobileNav = () => {
  const openEl = document.querySelector('[open-mobile-menu]') as HTMLElement;
  if (!openEl) return;

  const navMobileEl = document.querySelector('[mobile-menu-nav]') as HTMLElement;
  if (!navMobileEl) return;

  openEl.addEventListener('click', () => {
    const innerHeight = window.innerHeight;

    navMobileEl.style.height = `${innerHeight}px`;
  });
};
