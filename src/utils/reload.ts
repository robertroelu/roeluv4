export const reload = () => {
  /* Reload page on change width */
  function reloadPage(before: number, after: number, breakpoint: number): void {
    after = window.innerWidth;
    if (before > breakpoint && after < breakpoint) {
      location.reload();
    }
    if (before < breakpoint && after > breakpoint) {
      location.reload();
    }
  }

  const mobileBreak = 479;
  const landscapeBreak = 767;
  const tabletBreak = 991;

  let before = window.innerWidth;
  window.addEventListener('resize', () => {
    const after = window.innerWidth;
    reloadPage(before, after, tabletBreak);
    reloadPage(before, after, landscapeBreak);
    reloadPage(before, after, mobileBreak);

    // resizeModal();
  });

  //Resize modal function to set up the height of the modal
  //   function resizeModal(): void {
  //     const deviceHeight = window.innerHeight;
  //     const modalContentWrapper = document.querySelector<HTMLElement>('.modal_content-wrapper');
  //     if (modalContentWrapper) {
  //       if (deviceHeight < 830) {
  //         modalContentWrapper.style.height = '90%';
  //       } else {
  //         modalContentWrapper.style.height = 'auto';
  //       }
  //     }
  //   }

  //   resizeModal();
};
