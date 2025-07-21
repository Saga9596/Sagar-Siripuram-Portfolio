import { useEffect } from 'react';

export function useBackgroundSwap() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bg = entry.target.getAttribute('data-bg');
            if (bg) {
              document.documentElement.style.setProperty(
                '--bg-image',
                `url('${bg}')`
              );
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll<HTMLElement>('section[data-bg]')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
