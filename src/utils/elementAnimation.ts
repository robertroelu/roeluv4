import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

export function elementAnimationWithScroll(element: HTMLElement[]) {
  // Function to determine if the window is under 992px
  function isMobile() {
    return window.innerWidth < 992;
  }

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement: HTMLElement, timeline: GSAPTimeline) {
    const disableScrollTrigger = triggerElement.getAttribute('disable-scroll-trigger') === 'true';

    if (!disableScrollTrigger) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 95%',
        onEnter: () => timeline.play(),
      });
    } else {
      timeline.play();
    }
  }

  element.forEach((el) => {
    // Check for delay attribute and mobile delay removal flag
    const delayAttr = el.getAttribute('animation-delay');
    const removeDelayMobile = el.getAttribute('data-remove-delay-mobile') === 'true';

    let delay = 0;

    // Apply delay logic only if the attribute `data-remove-delay-mobile` is true
    if (removeDelayMobile) {
      if (isMobile()) {
        delay = 0; // Remove delay on mobile
      } else if (delayAttr) {
        delay = parseFloat(delayAttr) / 1000; // Apply delay on larger screens
      }
    } else {
      // If no `data-remove-delay-mobile` or it is false, apply normal delay
      delay = delayAttr ? parseFloat(delayAttr) / 1000 : 0;
    }

    el.style.opacity = '1';

    let tl = gsap.timeline({ paused: true });
    tl.from(el, {
      y: '20%',
      opacity: 0,
      duration: 1,
      ease: 'ease',
      filter: 'blur(10px)',
      delay: delay,
    });

    createScrollTrigger(el, tl);
  });
}

export const elementAnimation = () => {
  const elements = document.querySelectorAll('[el-animation]') as NodeListOf<HTMLElement>;
  if (!elements) return;

  elementAnimationWithScroll([...elements]);
};
