import Macy from 'macy';

export const grid = () => {
  const macyEl = document.querySelector('[macyjs]') as HTMLElement;
  if (!macyEl) return;

  //Created element
  // Create the padding element
  const padding: string =
    '<div style="display: block; padding-top: 5rem; width: 100%; height: auto;"></div>';

  // Get portfolio items
  const portfolioItem = document.querySelectorAll<HTMLElement>('[macy-item]');
  if (!portfolioItem) return;

  // Check window width and insert the padding if needed
  if (window.innerWidth > 991) {
    if (portfolioItem.length > 0) {
      portfolioItem[1]?.insertAdjacentHTML('beforebegin', padding);
    }
  }

  var macy = Macy({
    container: macyEl,
    trueOrder: false,
    waitForImages: false,
    margin: {
      x: 48,
      y: 96,
    },
    columns: 2,
    breakAt: {
      991: 1,
    },
  });
};
