import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger);

export function elementAnimation(element: HTMLElement[]) {
  // Link timelines to scroll position
  function createScrollTrigger(triggerElement: HTMLElement, timeline: GSAPTimeline) {
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 95%',
      onEnter: () => timeline.play(),
    });
  }

  element.forEach((el) => {
    el.style.opacity = '1';
    new SplitType(el, {
      types: 'lines,words',
      tagName: 'span',
      wordClass: 'header-word',
    });

    const words = el.querySelectorAll('.header-word');

    let tl = gsap.timeline({ paused: true });
    tl.from(words, {
      y: '20%',
      opacity: 0,
      duration: 1,
      ease: 'ease',
      stagger: 0.1,
      filter: 'blur(10px)',
      delay: 0.3,
    });
    createScrollTrigger(el, tl);
  });
}

export const headingAnimation = () => {
  const titleEl = document.querySelectorAll('[header-animation]') as NodeListOf<HTMLElement>;
  if (!titleEl) return;

  elementAnimation([...titleEl]);
};
