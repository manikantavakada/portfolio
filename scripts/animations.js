export function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const delay = entry.target.dataset.delay || "0";
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

export function initParallaxGlow() {
  const hero = document.querySelector(".hero");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (!hero || reduceMotion || coarsePointer) {
    return;
  }

  let rafId = 0;
  let nextX = 0;
  let nextY = 0;

  const updatePointer = () => {
    hero.style.setProperty("--pointer-x", `${nextX}px`);
    hero.style.setProperty("--pointer-y", `${nextY}px`);
    rafId = 0;
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      const { innerWidth, innerHeight } = window;
      nextX = (event.clientX / innerWidth - 0.5) * 16;
      nextY = (event.clientY / innerHeight - 0.5) * 12;

      if (!rafId) {
        rafId = window.requestAnimationFrame(updatePointer);
      }
    },
    { passive: true }
  );
}
