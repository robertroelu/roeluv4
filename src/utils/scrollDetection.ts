export const scrollDetection = () => {
  const navEl = document.querySelector('[data-nav="navbar"]') as HTMLElement;
  const navLogo = document.querySelector('[data-nav="navLogo"]') as HTMLElement;
  const navLink = document.querySelectorAll('[data-nav="navLink"]') as NodeListOf<HTMLElement>;
  const navButt = document.querySelector('[data-button="navButt"]') as HTMLElement;
  const navUnder = document.querySelectorAll('[data-nav="navUnder"]') as NodeListOf<HTMLElement>;
  const navBurger = document.querySelector('[data-nav="navBurger"]') as HTMLElement;

  const sections = document.querySelectorAll('[scroll-detection]') as NodeListOf<HTMLElement>;

  let activeSection: HTMLElement | null = null; // Premenná na sledovanie aktívnej sekcie

  const handleScroll = () => {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      // Ak vrch sekcie dosiahne vrch obrazovky (scrollujeme nadol) alebo vstúpime zo spodnej časti obrazovky (scrollujeme hore)
      if (rect.top <= 50 && rect.bottom > 60 && activeSection !== section) {
        navEl.style.backgroundColor = '#0B0B0D4D';
        navLogo.style.color = '#FEFEFE';
        navLink.forEach((el) => {
          el.style.color = '#FEFEFE';
        });

        navUnder.forEach((el) => {
          el.style.backgroundColor = '#FEFEFE';
        });
        navButt.setAttribute('button-mode', 'green');
        navBurger.style.color = '#FEFEFE';
        activeSection = section; // Nastavíme aktuálnu sekciu ako aktívnu
      }

      // Ak opustíš sekciu (buď vrchom alebo spodkom obrazovky)
      if ((rect.top > 70 || rect.bottom <= 50) && activeSection === section) {
        navEl.style.backgroundColor = '#FFFFFF4D';
        navLogo.style.color = '#0B0B0D';
        navLink.forEach((el) => {
          el.style.color = '#0B0B0D';
        });

        navUnder.forEach((el) => {
          el.style.backgroundColor = '#0B0B0D';
        });
        navButt.removeAttribute('button-mode');
        navBurger.style.color = '#0B0B0D';
        activeSection = null; // Zresetujeme aktívnu sekciu
      }
    });
  };

  // Pripojíme listener na udalosť scroll
  window.addEventListener('scroll', handleScroll);

  // Spustíme kontrolu hneď po načítaní stránky
  window.addEventListener('load', handleScroll);
};
