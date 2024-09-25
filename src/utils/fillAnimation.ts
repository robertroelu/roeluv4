import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const fillAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);

  const scrollEl = document.querySelectorAll('[scroll-animation]') as NodeListOf<HTMLElement>;
  if (!scrollEl) return;

  scrollEl.forEach((el) => {
    let typeSplit = new SplitType(el, {
      types: 'lines,words,chars',
      tagName: 'span',
    });

    let tl = gsap.timeline({ paused: true }); // Create a paused timeline

    tl.from(el.querySelectorAll('.word'), {
      opacity: 0.3,
      duration: 0.75,
      ease: 'power4.out',
      stagger: { each: 0.15 },
    });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%', // When the top of the element hits 70% of the viewport
      onEnter: () => tl.play(), // Play the animation once on entering
      once: true, // Ensure it only triggers once
    });
  });
};
