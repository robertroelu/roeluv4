import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

export function elementAnimationWithScroll(element: HTMLElement[]) {
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement: HTMLElement, timeline: GSAPTimeline) {
    // Check if the element has the 'disable-scroll-trigger' attribute
    const disableScrollTrigger = triggerElement.getAttribute('disable-scroll-trigger') === 'true';

    if (!disableScrollTrigger) {
      // Play the timeline when scrolled into view
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top 95%',
        onEnter: () => timeline.play(),
      });
    } else {
      // If disabled, play the animation immediately (or handle as needed)
      timeline.play();
    }
  }

  element.forEach((el) => {
    const delayAttr = el.getAttribute('animation-delay');
    const delay = delayAttr ? parseFloat(delayAttr) / 1000 : 0;

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
