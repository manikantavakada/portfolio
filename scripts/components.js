const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export function createProjectCard(project, index) {
  const featureList = project.features
    .map((feature) => `<li>${escapeHtml(feature)}</li>`)
    .join("");

  const shotCount = (project.screenshots || []).length;
  const layerShots = (project.screenshots || []).slice(0, 3);
  const stack = shotCount
    ? layerShots
        .map((shot, shotIndex) => {
          const alt = escapeHtml(shot.alt || `${project.title} application screen`);
          return `<img class="folder-shot folder-shot-${shotIndex + 1}" src="${escapeHtml(shot.src)}" alt="${alt}" loading="lazy" />`;
        })
        .join("")
    : `<span class="folder-placeholder" aria-hidden="true"><i></i><i></i><i></i></span>`;

  const technology = project.category.includes("Healthcare")
    ? "Mobile · APIs · Workflows"
    : project.category.includes("Logistics") || project.category.includes("Safety")
      ? "Mobile · Live tracking · APIs"
      : "Mobile · Integrations · UX";

  const visualNote = !(project.screenshots || []).length && project.visualNote
    ? `
      <p class="project-access-note">${escapeHtml(project.visualNote)}</p>
    `
    : "";

  const links = (project.links || [])
    .map(
      (link) =>
        `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
    )
    .join("");

  return `
    <article class="project-card project-folder project-theme-${index + 1} reveal" data-delay="${index * 90}">
      <div class="project-gallery" data-gallery="${index}">
        <button type="button" class="project-folder-trigger project-shot" data-shot="0" aria-label="Open ${escapeHtml(project.title)} project gallery">
          <span class="folder-stack" aria-hidden="true">${stack}</span>
          <span class="folder-front">
            <span class="folder-tab"></span>
            <span class="folder-reflection"></span>
            <span class="folder-content">
              <span class="project-category">${escapeHtml(project.category)}</span>
              <strong>${escapeHtml(project.title)}</strong>
              <small>${escapeHtml(project.description)}</small>
              <em>${escapeHtml(technology)}</em>
              <span class="folder-cta">View project <b aria-hidden="true">→</b></span>
            </span>
          </span>
        </button>
      </div>
      ${visualNote}
      <details class="project-details">
        <summary>About this project <span aria-hidden="true">+</span></summary>
        <div class="project-details-body">
          <p class="project-description">${escapeHtml(project.description)}</p>
          <div class="project-features">
            <p class="project-subtitle">Key features</p>
            <ul>${featureList}</ul>
          </div>
          <div class="project-impact">
            <p class="project-subtitle">Outcome</p>
            <p>${escapeHtml(project.impact)}</p>
          </div>
        </div>
      </details>
      ${links ? `<div class="project-links">${links}</div>` : ""}
    </article>
  `;
}

export function createTimelineItem(item, index) {
  const pointList = item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");

  return `
    <article class="timeline-item reveal" data-delay="${index * 110}">
      <div class="timeline-rail">
        <span class="timeline-dot"></span>
      </div>
      <div class="timeline-card glass-panel">
        <div class="timeline-head">
          <div>
            <p class="timeline-company">${escapeHtml(item.company)}</p>
            <h3>${escapeHtml(item.role)}</h3>
          </div>
          <p class="timeline-period">${escapeHtml(item.period)}</p>
        </div>
        <p class="timeline-summary">${escapeHtml(item.summary)}</p>
        <ul class="timeline-points">${pointList}</ul>
      </div>
    </article>
  `;
}

export function createSkillBadge(skill, index) {
  return `
    <div class="skill-badge reveal" data-delay="${index * 70}">
      <span>${escapeHtml(skill)}</span>
    </div>
  `;
}

export function createContactLinks(contact) {
  return `
    <div class="contact-stack">
      <a class="contact-link" href="mailto:${escapeHtml(contact.email)}">
        <span><i data-lucide="mail" aria-hidden="true"></i>Email</span>
        <strong>${escapeHtml(contact.email)}</strong>
      </a>
      <a class="contact-link" href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noreferrer">
        <span><i data-lucide="linkedin" aria-hidden="true"></i>LinkedIn</span>
        <strong>${escapeHtml(contact.linkedin)}</strong>
      </a>
      <a class="contact-link" href="${escapeHtml(contact.github)}" target="_blank" rel="noreferrer">
        <span><i data-lucide="github" aria-hidden="true"></i>GitHub</span>
        <strong>${escapeHtml(contact.github)}</strong>
      </a>
      <a class="contact-link" href="tel:${escapeHtml(contact.phone.replace(/\s+/g, ""))}">
        <span><i data-lucide="phone" aria-hidden="true"></i>Phone</span>
        <strong>${escapeHtml(contact.phone)}</strong>
      </a>
    </div>
  `;
}
