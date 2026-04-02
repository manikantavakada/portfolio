import {
  createContactLinks,
  createProjectCard,
  createSkillBadge,
  createTimelineItem
} from "./components.js";
import { initParallaxGlow, initRevealAnimations } from "./animations.js";

async function loadContent() {
  const response = await fetch("./data/site-content.json");
  if (!response.ok) {
    throw new Error("Unable to load portfolio content.");
  }
  return response.json();
}

function populateContent(content) {
  document.title = `${content.hero.name} | Software Engineer Portfolio`;
  document.querySelector("#hero-name").textContent = content.hero.name;
  document.querySelector("#hero-role").textContent = content.hero.title;
  document.querySelector("#hero-tagline").textContent = content.hero.tagline;
  document.querySelector("#about-summary").textContent = content.about.summary;

  document.querySelector("#experience-timeline").innerHTML = content.experience
    .map((item, index) => createTimelineItem(item, index))
    .join("");

  document.querySelector("#projects-grid").innerHTML = content.projects
    .map((project, index) => createProjectCard(project, index))
    .join("");

  document.querySelector("#skills-grid").innerHTML = content.skills
    .map((skill, index) => createSkillBadge(skill, index))
    .join("");

  document.querySelector("#contact-links").innerHTML = createContactLinks(content.contact);
  document.querySelector("#current-year").textContent = new Date().getFullYear();
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu?.classList.toggle("is-open");
  });

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle?.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
}

function initContactForm(content) {
  const form = document.querySelector("#contact-form");
  const note = document.querySelector("#form-note");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
    note.textContent = "Opening your mail app with the message details pre-filled.";
  });
}

function initPageLoad() {
  window.requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });
}

async function bootstrap() {
  try {
    const content = await loadContent();
    populateContent(content);
    initNavigation();
    initContactForm(content);
    initRevealAnimations();
    initParallaxGlow();
    initPageLoad();
  } catch (error) {
    const root = document.querySelector("main");
    if (root) {
      root.innerHTML = `
        <section class="section">
          <div class="section-inner">
            <article class="glass-panel error-state">
              <p class="eyebrow">Content Error</p>
              <h2>Portfolio data could not be loaded.</h2>
              <p>Please serve this folder through a local or production web server so JSON content can be fetched correctly.</p>
            </article>
          </div>
        </section>
      `;
    }
    console.error(error);
  }
}

bootstrap();
