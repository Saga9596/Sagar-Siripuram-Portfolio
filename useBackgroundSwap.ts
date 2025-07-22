// utils/useBackgroundSwap.ts
import { useEffect } from 'react';

export function useBackgroundSwap() {
  useEffect(() => {
    const defaultBg = '/assets/hd/default.jpg';
    const setBg = (url: string) =>
      document.documentElement.style.setProperty('--bg-image', `url(${url})`);

    // 1) Show default on mount
    setBg(defaultBg);

    // 2) Observe only these three sections, in DOM order
    const order = ['about', 'journey', 'contact'];
    const sections = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
      .map((el) => ({
        el,
        bg: el.dataset.bg!,
      }));

    // 3) Swap when any section is ≥50% visible
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.intersectionRatio >= 0.5)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) {
          const bg = (best.target as HTMLElement).dataset.bg!;
          setBg(bg);
        }
      },
      { threshold: [0.5] }
    );
    sections.forEach(({ el }) => observer.observe(el));

    // 4) Reset to default when scrolled back to very top
    const onScroll = () => {
      if (window.scrollY === 0) {
        setBg(defaultBg);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

