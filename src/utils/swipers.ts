import 'swiper/css/bundle';

import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';

export const swipers = () => {
  const swiperModules = [Autoplay, EffectFade, Navigation];

  const swipersEl = document.querySelectorAll('[swiper-option]') as NodeListOf<HTMLElement>;
  if (!swipersEl) return;

  swipersEl.forEach((el) => {
    const swiperAttr = el.getAttribute('swiper-option');
    const swiperNext = document.querySelector(
      `[swiper-nav-next=${swiperAttr}]`
    ) as HTMLElement | null;
    const swiperPrev = document.querySelector(
      `[swiper-nav-prev=${swiperAttr}]`
    ) as HTMLElement | null;

    if (swiperAttr === 'testimonial') {
      const testimonialSwiper = new Swiper(el as HTMLElement, {
        modules: swiperModules,
        slidesPerView: 2,
        slidesPerGroup: 2,
        // loop: true,
        rewind: true,
        speed: 0,
        spaceBetween: 24,
        allowTouchMove: false,
        breakpoints: {
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          767: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
      });

      // Opcity to 1 after window is fully load
      window.onload = () => {
        // Code to run when the page has fully loaded
        const firstLoad = document.querySelectorAll(
          '.swiper-slide-active, .swiper-slide-next'
        ) as NodeListOf<HTMLElement>;
        firstLoad.forEach((el) => {
          el.style.opacity = '1';
        });
      };

      // Amimation for slide
      function animation() {
        if (swiperNext?.hasAttribute('data-disabled') && swiperPrev?.hasAttribute('data-disabled'))
          return;

        // Set custom attribute to prevent interaction
        if (swiperNext) swiperNext.setAttribute('data-disabled', '');
        if (swiperPrev) swiperPrev.setAttribute('data-disabled', '');

        const activeSlides = document.querySelectorAll(
          '.swiper-slide-active, .swiper-slide-next'
        ) as NodeListOf<HTMLElement>;

        activeSlides.forEach((slide) => {
          slide.style.opacity = '0'; // Fade out
        });
        setTimeout(() => {
          testimonialSwiper.slideNext();

          let activeSlidesAnimation = document.querySelectorAll(
            '.swiper-slide-active, .swiper-slide-next'
          ) as NodeListOf<HTMLElement>;
          activeSlidesAnimation.forEach((slide) => {
            slide.style.opacity = '1'; // Fade out
          });

          // Remove custom attribute to allow interaction
          if (swiperNext) swiperNext.removeAttribute('data-disabled');
          if (swiperPrev) swiperPrev.removeAttribute('data-disabled');
        }, 400);
      }

      swiperNext?.addEventListener('click', () => {
        animation();
      });

      swiperPrev?.addEventListener('click', () => {
        animation();
      });
    }
  });
};
