const FOCUSABLE = "button:not([disabled])";

export function initLightbox(projects) {
  const overlay = document.querySelector("#lightbox");
  const grid = document.querySelector("#projects-grid");
  if (!overlay || !grid) return;

  const image = overlay.querySelector(".lightbox-image");
  const caption = overlay.querySelector(".lightbox-caption");
  const counter = overlay.querySelector(".lightbox-counter");
  const titleEl = overlay.querySelector(".lightbox-project");
  const prevButton = overlay.querySelector(".lightbox-prev");
  const nextButton = overlay.querySelector(".lightbox-next");
  const closeButton = overlay.querySelector(".lightbox-close");

  let shots = [];
  let projectTitle = "";
  let current = 0;
  let lastTrigger = null;

  const render = () => {
    const shot = shots[current];
    if (!shot) return;
    image.src = shot.src;
    image.alt = shot.alt || `${projectTitle} application screen`;
    caption.textContent = shot.alt || "";
    titleEl.textContent = projectTitle;
    counter.textContent = `${current + 1} / ${shots.length}`;
    const single = shots.length < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;
  };

  const step = (delta) => {
    if (shots.length < 2) return;
    current = (current + delta + shots.length) % shots.length;
    render();
  };

  const open = (projectIndex, shotIndex, trigger) => {
    const project = projects[projectIndex];
    if (!project || !(project.screenshots || []).length) return;
    shots = project.screenshots;
    projectTitle = project.title;
    current = shotIndex;
    lastTrigger = trigger;
    render();
    overlay.hidden = false;
    document.body.classList.add("lightbox-open");
    window.requestAnimationFrame(() => overlay.classList.add("is-open"));
    closeButton.focus();
  };

  const close = () => {
    overlay.classList.remove("is-open");
    overlay.hidden = true;
    document.body.classList.remove("lightbox-open");
    image.removeAttribute("src");
    lastTrigger?.focus();
    lastTrigger = null;
  };

  grid.addEventListener("click", (event) => {
    const trigger = event.target.closest(".project-shot");
    if (!trigger) return;
    const gallery = trigger.closest(".project-gallery");
    if (!gallery) return;
    open(Number(gallery.dataset.gallery), Number(trigger.dataset.shot), trigger);
  });

  prevButton.addEventListener("click", () => step(-1));
  nextButton.addEventListener("click", () => step(1));
  closeButton.addEventListener("click", close);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.classList.contains("lightbox-stage")) {
      close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;
    if (event.key === "Escape") {
      close();
    } else if (event.key === "ArrowRight") {
      step(1);
    } else if (event.key === "ArrowLeft") {
      step(-1);
    } else if (event.key === "Tab") {
      const items = [...overlay.querySelectorAll(FOCUSABLE)].filter((el) => !el.hidden);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  let touchStartX = null;
  overlay.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );
  overlay.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;
      const delta = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
    },
    { passive: true }
  );
}
