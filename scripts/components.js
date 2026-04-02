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

  const screenshots = (project.screenshots || []).length
    ? `
      <div class="project-gallery">
        ${project.screenshots
          .map(
            (shot) => `
              <figure class="project-shot">
                <img
                  src="${escapeHtml(shot.src)}"
                  alt="${escapeHtml(shot.alt || `${project.title} application screen`)}"
                  loading="lazy"
                />
              </figure>
            `
          )
          .join("")}
      </div>
    `
    : "";

  const visualNote = !(project.screenshots || []).length && project.visualNote
    ? `
      <div class="project-visual-note">
        <span class="visual-note-label">Visual Access</span>
        <p>${escapeHtml(project.visualNote)}</p>
      </div>
    `
    : "";

  const links = (project.links || [])
    .map(
      (link) =>
        `<a href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
    )
    .join("");

  return `
    <article class="project-card glass-panel reveal" data-delay="${index * 90}">
      <div class="project-card-header">
        <div>
          <p class="project-category">${escapeHtml(project.category)}</p>
          <h3>${escapeHtml(project.title)}</h3>
        </div>
        <span class="project-index">0${index + 1}</span>
      </div>
      ${screenshots}
      ${visualNote}
      <p class="project-description">${escapeHtml(project.description)}</p>
      <div class="project-features">
        <p class="project-subtitle">Key Features</p>
        <ul>${featureList}</ul>
      </div>
      <div class="project-impact">
        <p class="project-subtitle">Impact</p>
        <p>${escapeHtml(project.impact)}</p>
      </div>
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
        <span>Email</span>
        <strong>${escapeHtml(contact.email)}</strong>
      </a>
      <a class="contact-link" href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noreferrer">
        <span>LinkedIn</span>
        <strong>${escapeHtml(contact.linkedin)}</strong>
      </a>
      <a class="contact-link" href="${escapeHtml(contact.github)}" target="_blank" rel="noreferrer">
        <span>GitHub</span>
        <strong>${escapeHtml(contact.github)}</strong>
      </a>
      <a class="contact-link" href="tel:${escapeHtml(contact.phone.replace(/\s+/g, ""))}">
        <span>Phone</span>
        <strong>${escapeHtml(contact.phone)}</strong>
      </a>
    </div>
  `;
}
