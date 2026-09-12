/* ==========================================================
   ResumeForge - App JavaScript
   Day 2: Full Resume Form + Live Preview & Templates
   ========================================================== */

'use strict';

// =============================================
//  STATE
// =============================================
const state = {
  template: 'modern',
  zoom: 1,
  skills: [
    'React.js',
    'JavaScript (ES6+)',
    'TypeScript',
    'HTML5 & CSS3',
    'Node.js',
    'Tailwind CSS',
    'Git & GitHub',
    'REST APIs',
  ],
  experienceCount: 2,
  educationCount: 1,
  projectsCount: 2,
  certificationsCount: 1,
  currentTab: 'personal',
  tabs: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'all'],
};

// =============================================
//  SAMPLE DATA
// =============================================
const SAMPLE_DATA = {
  fullName: 'Mukesh Ambani',
  jobTitle: 'Managing Director & Chairman',
  email: 'mukesh.ambani@example.com',
  phone: '+91 8103013690',
  location: 'Mumbai',
  linkedIn: 'linkedin.com/in/Mukeshambani',
  github: 'github.com/mukeshambani',
  portfolio: 'mukeshambani.dev',
  summary:
    'Visionary business leader and industrialist with decades of experience driving global scale, digital transformation, and sustainable infrastructure. Pioneer in expanding telecommunications, energy, and retail ecosystems across India and international markets.',
  experiences: [
    {
      title: 'Managing Director & Chairman',
      company: 'Reliance Industries Limited',
      location: 'Mumbai, India',
      start: '2002',
      end: 'Present',
      desc: '• Spearheaded expansion into digital services with Jio, revolutionizing telecommunications for 450M+ users.\n• Accelerated retail growth into India’s largest omnichannel retail network with 18,000+ stores.\n• Driving transition towards renewable energy and green hydrogen technology manufacturing.',
    },
    {
      title: 'Director',
      company: 'Reliance Industries Limited',
      location: 'Mumbai, India',
      start: '1981',
      end: '2002',
      desc: '• Led creation of world-scale petrochemicals and refining complexes at Jamnagar.\n• Engineered vertical integration across textile, polymer, and polyester manufacturing businesses.',
    },
  ],
  educations: [
    {
      degree: 'B.E. in Chemical Engineering',
      school: 'Institute of Chemical Technology (ICT)',
      location: 'Mumbai, India',
      year: '1979',
      desc: 'Distinguished alumnus; recognized for transformative contributions to Indian industry and innovation.',
    },
  ],
  skills: [
    'Executive Leadership',
    'Strategic Vision',
    'Digital Transformation',
    'Global Operations',
    'Telecom Infrastructure',
    'Energy & Petrochemicals',
    'Supply Chain & Retail',
    'Financial Strategy',
    '5G & Cloud Ecosystems',
    'Sustainability & Innovation',
  ],
  projects: [
    {
      title: 'Jio Digital Revolution',
      role: 'Founding Visionary',
      link: 'https://jio.com',
      github: 'https://github.com/mukeshambani/jio-ecosystem',
      tech: '5G Architecture, Cloud Platforms, AI & IoT',
      desc: 'Architected India’s largest nationwide broadband data network, democratizing high-speed internet for 450M+ citizens.',
    },
    {
      title: 'Green Energy Gigacomplex',
      role: 'Lead Strategist',
      link: 'https://ril.com',
      github: 'https://github.com/mukeshambani/green-energy',
      tech: 'Solar PV, Green Hydrogen, Energy Storage',
      desc: 'Developing one of the world’s largest integrated clean energy manufacturing complexes in Jamnagar, Gujarat.',
    },
  ],
  certifications: [
    {
      name: 'Othmer Gold Medal',
      issuer: 'Chemical Heritage Foundation',
      date: '2016',
      id: 'CHF-OGM-2016',
    },
  ],
};

// =============================================
//  INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTheme();
  initTabs();
  initSkills();
  initZoomControls();
  initDynamicEntries();
  initTemplateSelector();
  initDownload();
  initSampleDataHandlers();
  initFullscreen();

  // Populate sample data & form only on builder page
  if (document.getElementById('fullName')) {
    populateFormWithData(SAMPLE_DATA);
    initFormListeners();
    updateProgress();
    updatePreview();

    // Check URL query param for template (e.g. builder.html?template=minimal)
    const urlParams = new URLSearchParams(window.location.search);
    const tplParam = urlParams.get('template');
    if (tplParam && ['modern', 'minimal', 'creative'].includes(tplParam)) {
      selectTemplate(tplParam);
    }
  }
});

// =============================================
//  NAVBAR
// =============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener(
    'scroll',
    () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 40);
    },
    { passive: true }
  );

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  navLinks?.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// =============================================
//  THEME TOGGLE
// =============================================
function initTheme() {
  const saved = localStorage.getItem('rf-theme') || 'light';
  applyTheme(saved);

  document.querySelectorAll('#theme-toggle, .theme-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast(next === 'light' ? '☀️ Light mode active' : '🌙 Dark mode active');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('rf-theme', theme);

  document.querySelectorAll('.theme-icon').forEach((icon) => {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  });

  document.querySelectorAll('#theme-toggle, .theme-toggle-btn').forEach((btn) => {
    const titleText = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    btn.title = titleText;
    btn.setAttribute('aria-label', titleText);
  });
}

// =============================================
//  TABS
// =============================================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const prevBtn = document.getElementById('prev-tab-btn');
  const nextBtn = document.getElementById('next-tab-btn');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  prevBtn?.addEventListener('click', () => {
    const idx = state.tabs.indexOf(state.currentTab);
    if (idx > 0) switchTab(state.tabs[idx - 1]);
  });

  nextBtn?.addEventListener('click', () => {
    const idx = state.tabs.indexOf(state.currentTab);
    if (idx < state.tabs.length - 2) switchTab(state.tabs[idx + 1]);
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  if (tabName === 'all') {
    document.querySelectorAll('.tab-content').forEach((content) => {
      content.classList.add('active');
    });
  } else {
    document.querySelectorAll('.tab-content').forEach((content) => {
      content.classList.toggle('active', content.id === `tab-content-${tabName}`);
    });
  }

  const idx = state.tabs.indexOf(tabName);
  const prevBtn = document.getElementById('prev-tab-btn');
  const nextBtn = document.getElementById('next-tab-btn');
  if (prevBtn) prevBtn.disabled = idx === 0;
  if (nextBtn) nextBtn.disabled = idx === state.tabs.length - 1;
}

// =============================================
//  FORM LISTENERS → LIVE PREVIEW
// =============================================
function initFormListeners() {
  document.querySelectorAll('.form-input').forEach((input) => {
    input.removeEventListener('input', onInputDebounced);
    input.addEventListener('input', onInputDebounced);
  });
}

const onInputDebounced = debounce(() => {
  updatePreview();
  updateProgress();
}, 100);

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// =============================================
//  PROGRESS TRACKER
// =============================================
function updateProgress() {
  const fields = [
    'fullName',
    'jobTitle',
    'email',
    'phone',
    'location',
    'summary',
    'exp-title-0',
    'edu-degree-0',
    'proj-title-0',
    'cert-name-0',
  ];

  let filled = 0;
  fields.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.value.trim().length > 0) filled++;
  });

  if (state.skills.length > 0) filled++;

  const total = fields.length + 1;
  const pct = Math.round((filled / total) * 100);

  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('progress-text');
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${pct}% Complete`;
}

// =============================================
//  LIVE PREVIEW UPDATE
// =============================================
function updatePreview() {
  updateModernTemplate();
  updateMinimalTemplate();
  updateCreativeTemplate();
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// Data Extractors (Synchronized from DOM cards or fallback inputs)
function getExperienceData() {
  const cards = document.querySelectorAll('#experience-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card, idx) => {
      list.push({
        title: card.querySelector('input[id^="exp-title-"]')?.value.trim() || `Position #${idx + 1}`,
        company: card.querySelector('input[id^="exp-company-"]')?.value.trim() || 'Company',
        location: card.querySelector('input[id^="exp-location-"]')?.value.trim() || '',
        start: card.querySelector('input[id^="exp-start-"]')?.value.trim() || 'Start',
        end: card.querySelector('input[id^="exp-end-"]')?.value.trim() || 'Present',
        desc: card.querySelector('textarea[id^="exp-desc-"]')?.value.trim() || '',
      });
    });
  } else {
    for (let i = 0; i < state.experienceCount; i++) {
      list.push({
        title: val(`exp-title-${i}`) || 'Job Title',
        company: val(`exp-company-${i}`) || 'Company',
        location: val(`exp-location-${i}`) || '',
        start: val(`exp-start-${i}`) || 'Start',
        end: val(`exp-end-${i}`) || 'Present',
        desc: val(`exp-desc-${i}`) || '',
      });
    }
  }
  return list;
}

function getEducationData() {
  const cards = document.querySelectorAll('#education-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card, idx) => {
      list.push({
        degree: card.querySelector('input[id^="edu-degree-"]')?.value.trim() || `Degree #${idx + 1}`,
        school: card.querySelector('input[id^="edu-school-"]')?.value.trim() || 'University',
        year: card.querySelector('input[id^="edu-year-"]')?.value.trim() || '',
        desc: card.querySelector('input[id^="edu-desc-"]')?.value.trim() || '',
      });
    });
  } else {
    for (let i = 0; i < state.educationCount; i++) {
      list.push({
        degree: val(`edu-degree-${i}`) || 'Degree',
        school: val(`edu-school-${i}`) || 'University',
        year: val(`edu-year-${i}`) || '',
        desc: val(`edu-desc-${i}`) || '',
      });
    }
  }
  return list;
}

function getProjectData() {
  const cards = document.querySelectorAll('#projects-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card, idx) => {
      list.push({
        title: card.querySelector('input[id^="proj-title-"]')?.value.trim() || `Project #${idx + 1}`,
        role: card.querySelector('input[id^="proj-role-"]')?.value.trim() || '',
        link: card.querySelector('input[id^="proj-link-"]')?.value.trim() || '',
        tech: card.querySelector('input[id^="proj-tech-"]')?.value.trim() || '',
        desc: card.querySelector('textarea[id^="proj-desc-"]')?.value.trim() || '',
      });
    });
  } else {
    for (let i = 0; i < state.projectsCount; i++) {
      list.push({
        title: val(`proj-title-${i}`) || 'Project Title',
        role: val(`proj-role-${i}`) || '',
        link: val(`proj-link-${i}`) || '',
        tech: val(`proj-tech-${i}`) || '',
        desc: val(`proj-desc-${i}`) || '',
      });
    }
  }
  return list;
}

function getCertificationData() {
  const cards = document.querySelectorAll('#certifications-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card, idx) => {
      const name = card.querySelector('input[id^="cert-name-"]')?.value.trim() || `Certification #${idx + 1}`;
      const issuer = card.querySelector('input[id^="cert-issuer-"]')?.value.trim() || '';
      const date = card.querySelector('input[id^="cert-date-"]')?.value.trim() || '';
      list.push({ name, issuer, date });
    });
  } else {
    for (let i = 0; i < state.certificationsCount; i++) {
      const name = val(`cert-name-${i}`);
      const issuer = val(`cert-issuer-${i}`);
      const date = val(`cert-date-${i}`);
      if (name || issuer) {
        list.push({ name: name || 'Certification', issuer, date });
      }
    }
  }
  return list;
}

// -------------------------------------------------------------
// 1. MODERN TEMPLATE UPDATER
// -------------------------------------------------------------
function updateModernTemplate() {
  const fullName = val('fullName') || 'Mukesh Ambani';
  const jobTitle = val('jobTitle') || 'Managing Director & Chairman';
  const email = val('email') || 'mukesh.ambani@example.com';
  const phone = val('phone') || '+91 8103013690';
  const location = val('location') || 'Mumbai';
  const linkedIn = val('linkedIn') || 'linkedin.com/in/Mukeshambani';
  const github = val('github') || 'github.com/mukeshambani';
  const portfolio = val('portfolio') || 'mukeshambani.dev';
  const summary = val('summary') || 'Visionary business leader and industrialist with decades of experience driving global scale, digital transformation, and sustainable infrastructure.';

  // Avatar initial
  setText('tpl-m-avatar', fullName.charAt(0).toUpperCase() || 'M');
  setText('tpl-m-name', fullName);
  setText('tpl-m-title', jobTitle);
  setText('tpl-m-summary', summary);

  // Contacts
  setText('tpl-m-email', email);
  setText('tpl-m-phone', phone);
  setText('tpl-m-location', location);
  setText('tpl-m-linkedin', linkedIn);
  setText('tpl-m-github', github);
  setText('tpl-m-portfolio', portfolio);

  // Skills
  const skillsEl = document.getElementById('tpl-m-skills');
  if (skillsEl) {
    skillsEl.innerHTML = state.skills.length
      ? state.skills
          .map((s) => `<span class="live-m-skill-pill">${escapeHtml(s)}</span>`)
          .join('')
      : '<span class="live-m-skill-pill">Add skills</span>';
  }

  // Experiences
  renderModernExperiences('tpl-m-exp-entries');

  // Education
  renderModernEducations('tpl-m-edu-entries');

  // Projects
  renderModernProjects('tpl-m-proj-entries');

  // Certifications
  renderModernCertifications('tpl-m-cert-entries');
  renderModernCertifications('tpl-m-cert-body-entries');
}

function renderModernExperiences(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getExperienceData();
  container.innerHTML = list.map((exp) => `
    <div class="live-m-entry">
      <div class="live-m-entry-head">
        <span>${escapeHtml(exp.title)}</span>
        <span class="live-m-entry-date">${escapeHtml(exp.start)} – ${escapeHtml(exp.end)}</span>
      </div>
      <div class="live-m-entry-sub">${escapeHtml([exp.company, exp.location].filter(Boolean).join(' · '))}</div>
      ${exp.desc ? `<div class="live-m-entry-desc">${escapeHtml(exp.desc)}</div>` : ''}
    </div>`).join('');
}

function renderModernEducations(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getEducationData();
  container.innerHTML = list.map((edu) => `
    <div class="live-m-entry">
      <div class="live-m-entry-head">
        <span>${escapeHtml(edu.degree)}</span>
        ${edu.year ? `<span class="live-m-entry-date">${escapeHtml(edu.year)}</span>` : ''}
      </div>
      <div class="live-m-entry-sub">${escapeHtml(edu.school)}</div>
      ${edu.desc ? `<div class="live-m-entry-desc">${escapeHtml(edu.desc)}</div>` : ''}
    </div>`).join('');
}

function renderModernProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getProjectData();
  container.innerHTML = list.map((p) => `
    <div class="live-m-entry">
      <div class="live-m-entry-head">
        <span>${escapeHtml(p.title)}${p.role ? ` <small style="color:#64748b">(${escapeHtml(p.role)})</small>` : ''}</span>
        ${p.link ? `<a href="${escapeHtml(p.link)}" target="_blank" style="font-size:0.68rem;color:#0d9488">Link ↗</a>` : ''}
      </div>
      ${p.tech ? `<div class="live-m-entry-sub" style="font-size:0.7rem;color:#475569">Stack: ${escapeHtml(p.tech)}</div>` : ''}
      ${p.desc ? `<div class="live-m-entry-desc">${escapeHtml(p.desc)}</div>` : ''}
    </div>`).join('');
}

function renderModernCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getCertificationData();
  container.innerHTML = list.map((c) => `
    <div class="live-m-entry">
      <div class="live-m-entry-head">
        <span>${escapeHtml(c.name)}</span>
        ${c.date ? `<span class="live-m-entry-date">${escapeHtml(c.date)}</span>` : ''}
      </div>
      ${c.issuer ? `<div class="live-m-entry-sub">${escapeHtml(c.issuer)}</div>` : ''}
    </div>`).join('');
}

// -------------------------------------------------------------
// 2. MINIMAL TEMPLATE UPDATER (ATS-Friendly / Elegant Monochrome)
// -------------------------------------------------------------
function updateMinimalTemplate() {
  const fullName = val('fullName') || 'Mukesh Ambani';
  const jobTitle = val('jobTitle') || 'Managing Director & Chairman';
  const email = val('email') || 'mukesh.ambani@example.com';
  const phone = val('phone') || '+91 8103013690';
  const location = val('location') || 'Mumbai';
  const linkedIn = val('linkedIn') || 'linkedin.com/in/Mukeshambani';
  const github = val('github') || 'github.com/mukeshambani';
  const portfolio = val('portfolio') || 'mukeshambani.dev';
  const summary = val('summary') || 'Visionary business leader and industrialist with decades of experience driving global scale, digital transformation, and sustainable infrastructure.';

  setText('tpl-mn-name', fullName);
  setText('tpl-mn-title', jobTitle);
  setText('tpl-mn-summary', summary);

  // Contacts with clean clickable links & separators
  const contactsEl = document.getElementById('tpl-mn-contacts');
  if (contactsEl) {
    const items = [];
    if (email) items.push(`<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`);
    if (phone) items.push(`<span>${escapeHtml(phone)}</span>`);
    if (location) items.push(`<span>${escapeHtml(location)}</span>`);
    if (portfolio) {
      const href = portfolio.startsWith('http') ? portfolio : `https://${portfolio}`;
      items.push(`<a href="${escapeHtml(href)}" target="_blank">${escapeHtml(portfolio.replace(/^https?:\/\//, ''))}</a>`);
    }
    if (linkedIn) {
      const href = linkedIn.startsWith('http') ? linkedIn : `https://${linkedIn}`;
      items.push(`<a href="${escapeHtml(href)}" target="_blank">${escapeHtml(linkedIn.replace(/^https?:\/\//, ''))}</a>`);
    }
    if (github) {
      const href = github.startsWith('http') ? github : `https://${github}`;
      items.push(`<a href="${escapeHtml(href)}" target="_blank">${escapeHtml(github.replace(/^https?:\/\//, ''))}</a>`);
    }
    contactsEl.innerHTML = items.join(' <span class="mn-sep">•</span> ');
  }

  // Skills
  const skillsEl = document.getElementById('tpl-mn-skills');
  if (skillsEl) {
    skillsEl.innerHTML = state.skills.length
      ? state.skills.map((s) => `<span class="live-mn-skill-item">${escapeHtml(s)}</span>`).join(' <span class="mn-sep">•</span> ')
      : '—';
  }

  renderMinimalExperiences('tpl-mn-exp-entries');
  renderMinimalEducations('tpl-mn-edu-entries');
  renderMinimalProjects('tpl-mn-proj-entries');
  renderMinimalCertifications('tpl-mn-cert-entries');
}

function renderMinimalExperiences(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getExperienceData();
  container.innerHTML = list.map((exp) => `
    <div class="live-mn-entry">
      <div class="live-mn-entry-head">
        <div><strong>${escapeHtml(exp.title)}</strong> — <span class="live-mn-company">${escapeHtml(exp.company)}</span></div>
        <span class="live-mn-date">${escapeHtml(exp.start)} – ${escapeHtml(exp.end)}</span>
      </div>
      ${exp.location ? `<div class="live-mn-location">${escapeHtml(exp.location)}</div>` : ''}
      ${exp.desc ? `<div class="live-mn-entry-desc">${escapeHtml(exp.desc)}</div>` : ''}
    </div>`).join('');
}

function renderMinimalEducations(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getEducationData();
  container.innerHTML = list.map((edu) => `
    <div class="live-mn-entry">
      <div class="live-mn-entry-head">
        <div><strong>${escapeHtml(edu.degree)}</strong> — <span class="live-mn-company">${escapeHtml(edu.school)}</span></div>
        ${edu.year ? `<span class="live-mn-date">${escapeHtml(edu.year)}</span>` : ''}
      </div>
      ${edu.desc ? `<div class="live-mn-entry-desc">${escapeHtml(edu.desc)}</div>` : ''}
    </div>`).join('');
}

function renderMinimalProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getProjectData();
  container.innerHTML = list.map((p) => `
    <div class="live-mn-entry">
      <div class="live-mn-entry-head">
        <div><strong>${escapeHtml(p.title)}</strong>${p.role ? ` <span style="font-weight:400;color:#64748b">(${escapeHtml(p.role)})</span>` : ''}</div>
        ${p.link ? `<a href="${escapeHtml(p.link)}" target="_blank" style="font-size:0.71rem;color:#0f172a;text-decoration:underline;">Demo ↗</a>` : ''}
      </div>
      ${p.tech ? `<div class="live-mn-proj-tech">Stack: ${escapeHtml(p.tech)}</div>` : ''}
      ${p.desc ? `<div class="live-mn-entry-desc">${escapeHtml(p.desc)}</div>` : ''}
    </div>`).join('');
}

function renderMinimalCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getCertificationData();
  container.innerHTML = list.map((c) => `
    <div class="live-mn-entry">
      <div class="live-mn-entry-head">
        <div><strong>${escapeHtml(c.name)}</strong> — <span class="live-mn-company">${escapeHtml(c.issuer)}</span></div>
        ${c.date ? `<span class="live-mn-date">${escapeHtml(c.date)}</span>` : ''}
      </div>
    </div>`).join('');
}

// -------------------------------------------------------------
// 3. CREATIVE TEMPLATE UPDATER (Vibrant Accent / Modern 2-Column Grid)
// -------------------------------------------------------------
function updateCreativeTemplate() {
  const fullName = val('fullName') || 'Mukesh Ambani';
  const jobTitle = val('jobTitle') || 'Managing Director & Chairman';
  const email = val('email') || 'mukesh.ambani@example.com';
  const phone = val('phone') || '+91 8103013690';
  const location = val('location') || 'Mumbai';
  const linkedIn = val('linkedIn') || 'linkedin.com/in/Mukeshambani';
  const github = val('github') || 'github.com/mukeshambani';
  const portfolio = val('portfolio') || 'mukeshambani.dev';
  const summary = val('summary') || 'Visionary business leader and industrialist with decades of experience driving global scale, digital transformation, and sustainable infrastructure.';

  setText('tpl-cr-name', fullName);
  setText('tpl-cr-title', jobTitle);
  setText('tpl-cr-summary', summary);

  // Creative Contacts with neat icons
  const crContacts = document.getElementById('tpl-cr-contacts');
  if (crContacts) {
    const items = [];
    if (email) items.push(`<div>✉ ${escapeHtml(email)}</div>`);
    if (phone) items.push(`<div>✆ ${escapeHtml(phone)}</div>`);
    if (location) items.push(`<div>📍 ${escapeHtml(location)}</div>`);
    if (portfolio) {
      const href = portfolio.startsWith('http') ? portfolio : `https://${portfolio}`;
      items.push(`<div><a href="${escapeHtml(href)}" target="_blank">🌐 ${escapeHtml(portfolio.replace(/^https?:\/\//, ''))}</a></div>`);
    }
    if (linkedIn) {
      const href = linkedIn.startsWith('http') ? linkedIn : `https://${linkedIn}`;
      items.push(`<div><a href="${escapeHtml(href)}" target="_blank">💼 ${escapeHtml(linkedIn.replace(/^https?:\/\//, ''))}</a></div>`);
    }
    if (github) {
      const href = github.startsWith('http') ? github : `https://${github}`;
      items.push(`<div><a href="${escapeHtml(href)}" target="_blank">🐙 ${escapeHtml(github.replace(/^https?:\/\//, ''))}</a></div>`);
    }
    crContacts.innerHTML = items.join('');
  }

  // Creative Skills (Pills)
  const crSkills = document.getElementById('tpl-cr-skills');
  if (crSkills) {
    crSkills.innerHTML = state.skills.length
      ? state.skills.map((s) => `<span class="live-cr-skill-pill">${escapeHtml(s)}</span>`).join('')
      : '—';
  }

  renderCreativeExperiences('tpl-cr-exp-entries');
  renderCreativeProjects('tpl-cr-proj-entries');
  renderCreativeEducations('tpl-cr-edu-entries');
  renderCreativeCertifications('tpl-cr-cert-entries');
}

function renderCreativeExperiences(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getExperienceData();
  container.innerHTML = list.map((exp) => `
    <div class="live-cr-card">
      <div class="live-cr-card-top">
        <span class="live-cr-card-title">${escapeHtml(exp.title)}</span>
        <span class="live-cr-card-badge">${escapeHtml(exp.start)} – ${escapeHtml(exp.end)}</span>
      </div>
      <div class="live-cr-card-sub">${escapeHtml([exp.company, exp.location].filter(Boolean).join(' · '))}</div>
      ${exp.desc ? `<div class="live-cr-card-desc">${escapeHtml(exp.desc)}</div>` : ''}
    </div>`).join('');
}

function renderCreativeProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getProjectData();
  container.innerHTML = list.map((p) => `
    <div class="live-cr-card">
      <div class="live-cr-card-top">
        <span class="live-cr-card-title">${escapeHtml(p.title)}${p.role ? ` <small style="font-weight:400;color:#64748b">(${escapeHtml(p.role)})</small>` : ''}</span>
        ${p.link ? `<a href="${escapeHtml(p.link)}" target="_blank" class="live-cr-link">Demo ↗</a>` : ''}
      </div>
      ${p.tech ? `<div class="live-cr-card-sub" style="color:#0284c7;font-size:0.68rem;">Stack: ${escapeHtml(p.tech)}</div>` : ''}
      ${p.desc ? `<div class="live-cr-card-desc">${escapeHtml(p.desc)}</div>` : ''}
    </div>`).join('');
}

function renderCreativeEducations(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getEducationData();
  container.innerHTML = list.map((edu) => `
    <div class="live-cr-side-item live-cr-side-edu">
      <div class="live-cr-side-title">${escapeHtml(edu.degree)}</div>
      <div class="live-cr-side-sub">${escapeHtml(edu.school)}</div>
      ${edu.year ? `<div class="live-cr-side-date">${escapeHtml(edu.year)}</div>` : ''}
      ${edu.desc ? `<div class="live-cr-card-desc" style="font-size:0.68rem;">${escapeHtml(edu.desc)}</div>` : ''}
    </div>`).join('');
}

function renderCreativeCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const list = getCertificationData();
  container.innerHTML = list.map((c) => `
    <div class="live-cr-side-item live-cr-side-cert">
      <div class="live-cr-side-title">${escapeHtml(c.name)}</div>
      <div class="live-cr-side-sub">${escapeHtml(c.issuer)}</div>
      ${c.date ? `<div class="live-cr-side-date">${escapeHtml(c.date)}</div>` : ''}
    </div>`).join('');
}

// =============================================
//  TEMPLATE SELECTOR
// =============================================
function initTemplateSelector() {
  document.querySelectorAll('.template-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectTemplate(btn.dataset.template);
    });
  });

  document.querySelectorAll('.template-card').forEach((card) => {
    card.addEventListener('click', () => {
      const tpl = card.id.replace('tpl-card-', '');
      if (tpl) {
        selectTemplate(tpl);
        document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function selectTemplate(tplName) {
  state.template = tplName;

  document.querySelectorAll('.template-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.template === tplName);
  });

  document.querySelectorAll('.live-template').forEach((tpl) => {
    tpl.classList.toggle('active', tpl.id === `tpl-${tplName}`);
    tpl.style.display = ''; // Clear inline styles so CSS handles display!
  });

  updatePreview();
  showToast(`✨ ${capitalize(tplName)} template active`);
}

// =============================================
//  SKILLS
// =============================================
function initSkills() {
  const input = document.getElementById('skill-input');
  const addBtn = document.getElementById('add-skill-btn');

  addBtn?.addEventListener('click', () => addSkill(input?.value));
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(input.value);
    }
  });

  document.getElementById('skills-tags')?.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.skill-remove');
    if (removeBtn) {
      removeSkill(removeBtn.dataset.skill);
    }
  });

  document.querySelectorAll('.suggested-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      addSkill(chip.dataset.skill || chip.textContent.trim());
    });
  });

  renderSkills();
}

function addSkill(value) {
  if (!value) return;
  const trimmed = value.trim();
  if (!trimmed) return;

  if (state.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
    showToast('⚠️ Skill already added');
    return;
  }

  state.skills.push(trimmed);
  const input = document.getElementById('skill-input');
  if (input) input.value = '';

  renderSkills();
  updatePreview();
  updateProgress();
}

function removeSkill(skill) {
  state.skills = state.skills.filter((s) => s !== skill);
  renderSkills();
  updatePreview();
  updateProgress();
}

function renderSkills() {
  const container = document.getElementById('skills-tags');
  if (!container) return;
  container.innerHTML = state.skills
    .map(
      (s) => `
      <span class="skill-tag">
        ${escapeHtml(s)}
        <span class="skill-remove" data-skill="${escapeHtml(s)}">&times;</span>
      </span>`
    )
    .join('');
}

// =============================================
//  DYNAMIC ENTRIES
// =============================================
function initDynamicEntries() {
  document.getElementById('add-experience-btn')?.addEventListener('click', () => {
    addEntryCard('experience');
  });

  document.getElementById('add-education-btn')?.addEventListener('click', () => {
    addEntryCard('education');
  });

  document.getElementById('add-project-btn')?.addEventListener('click', () => {
    addEntryCard('projects');
  });

  document.getElementById('add-certification-btn')?.addEventListener('click', () => {
    addEntryCard('certifications');
  });

  // Remove delegations
  ['experience', 'education', 'projects', 'certifications'].forEach((type) => {
    const container = document.getElementById(`${type}-entries`);
    container?.addEventListener('click', (e) => {
      const btn = e.target.closest('.entry-remove-btn');
      if (btn && btn.dataset.type === type) {
        removeEntryCard(type, parseInt(btn.dataset.index, 10));
      }
    });
  });
}

function addEntryCard(type) {
  const idx = state[`${type}Count`];
  state[`${type}Count`]++;

  const container = document.getElementById(`${type}-entries`);
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = `${type}-entry-${idx}`;

  if (type === 'experience') {
    div.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">💼 Experience #${idx + 1}</span>
        <button type="button" class="entry-remove-btn" data-type="experience" data-index="${idx}" title="Remove">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="exp-title-${idx}">Job Title <span class="req">*</span></label>
        <input class="form-input" type="text" id="exp-title-${idx}" placeholder="e.g. Frontend Developer" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="exp-company-${idx}">Company <span class="req">*</span></label>
          <input class="form-input" type="text" id="exp-company-${idx}" placeholder="Company Name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="exp-location-${idx}">Location</label>
          <input class="form-input" type="text" id="exp-location-${idx}" placeholder="City, Country / Remote" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="exp-start-${idx}">Start Date</label>
          <input class="form-input" type="text" id="exp-start-${idx}" placeholder="Jan 2022" />
        </div>
        <div class="form-group">
          <label class="form-label" for="exp-end-${idx}">End Date</label>
          <input class="form-input" type="text" id="exp-end-${idx}" placeholder="Present" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="exp-desc-${idx}">Responsibilities & Achievements</label>
        <textarea class="form-input form-textarea" id="exp-desc-${idx}" rows="3" placeholder="• Spearheaded refactoring of billing service..."></textarea>
      </div>`;
  } else if (type === 'education') {
    div.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">🎓 Education #${idx + 1}</span>
        <button type="button" class="entry-remove-btn" data-type="education" data-index="${idx}" title="Remove">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="edu-degree-${idx}">Degree / Program <span class="req">*</span></label>
        <input class="form-input" type="text" id="edu-degree-${idx}" placeholder="e.g. B.S. in Computer Science" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="edu-school-${idx}">School / University <span class="req">*</span></label>
          <input class="form-input" type="text" id="edu-school-${idx}" placeholder="University Name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="edu-year-${idx}">Duration / Year</label>
          <input class="form-input" type="text" id="edu-year-${idx}" placeholder="2018 – 2022" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="edu-desc-${idx}">Notable Achievements / GPA</label>
        <input class="form-input" type="text" id="edu-desc-${idx}" placeholder="GPA 3.8/4.0, Honors..." />
      </div>`;
  } else if (type === 'projects') {
    div.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">📁 Project #${idx + 1}</span>
        <button type="button" class="entry-remove-btn" data-type="projects" data-index="${idx}" title="Remove">✕</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="proj-title-${idx}">Project Title <span class="req">*</span></label>
          <input class="form-input" type="text" id="proj-title-${idx}" placeholder="e.g. DevPulse" />
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-role-${idx}">Role / Subtitle</label>
          <input class="form-input" type="text" id="proj-role-${idx}" placeholder="e.g. Lead Creator" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="proj-link-${idx}">Demo Link</label>
          <input class="form-input" type="url" id="proj-link-${idx}" placeholder="https://..." />
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-github-${idx}">GitHub Link</label>
          <input class="form-input" type="url" id="proj-github-${idx}" placeholder="https://github.com/..." />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="proj-tech-${idx}">Technologies Used</label>
        <input class="form-input" type="text" id="proj-tech-${idx}" placeholder="React, Node.js, Docker..." />
      </div>
      <div class="form-group">
        <label class="form-label" for="proj-desc-${idx}">Description</label>
        <textarea class="form-input form-textarea" id="proj-desc-${idx}" rows="2" placeholder="Describe the goal and measurable impact..."></textarea>
      </div>`;
  } else if (type === 'certifications') {
    div.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">🏅 Certification #${idx + 1}</span>
        <button type="button" class="entry-remove-btn" data-type="certifications" data-index="${idx}" title="Remove">✕</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="cert-name-${idx}">Certificate Name <span class="req">*</span></label>
          <input class="form-input" type="text" id="cert-name-${idx}" placeholder="e.g. AWS Solutions Architect" />
        </div>
        <div class="form-group">
          <label class="form-label" for="cert-issuer-${idx}">Issuing Organization <span class="req">*</span></label>
          <input class="form-input" type="text" id="cert-issuer-${idx}" placeholder="e.g. Amazon Web Services" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="cert-date-${idx}">Issue & Expiry Date</label>
          <input class="form-input" type="text" id="cert-date-${idx}" placeholder="2023 – 2026" />
        </div>
        <div class="form-group">
          <label class="form-label" for="cert-id-${idx}">Credential ID / URL</label>
          <input class="form-input" type="text" id="cert-id-${idx}" placeholder="Credential ID or link" />
        </div>
      </div>`;
  }

  container?.appendChild(div);
  initFormListeners();
  showToast(`Added ${capitalize(type.slice(0, -1))} #${idx + 1}`);
}

function removeEntryCard(type, idx) {
  const card = document.getElementById(`${type}-entry-${idx}`);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-10px)';
    card.style.transition = 'all 0.2s ease';
    setTimeout(() => {
      card.remove();
      if (state[`${type}Count`] > 1) state[`${type}Count`]--;
      updatePreview();
      updateProgress();
    }, 200);
  }
}

// =============================================
//  ZOOM CONTROLS
// =============================================
function initZoomControls() {
  document.getElementById('zoom-in-btn')?.addEventListener('click', () => setZoom(state.zoom + 0.1));
  document.getElementById('zoom-out-btn')?.addEventListener('click', () => setZoom(state.zoom - 0.1));
}

function setZoom(level) {
  state.zoom = Math.min(Math.max(level, 0.5), 1.4);
  const sheet = document.getElementById('resume-sheet');
  const zoomEl = document.getElementById('zoom-level');
  if (sheet) sheet.style.transform = `scale(${state.zoom})`;
  if (zoomEl) zoomEl.textContent = `${Math.round(state.zoom * 100)}%`;
}

// =============================================
//  SAMPLE DATA & RESET
// =============================================
function initSampleDataHandlers() {
  document.getElementById('load-sample-btn')?.addEventListener('click', () => {
    populateFormWithData(SAMPLE_DATA);
    updatePreview();
    updateProgress();
    showToast('✨ Sample data loaded');
  });

  document.getElementById('clear-form-btn')?.addEventListener('click', () => {
    if (confirm('Clear all form fields?')) {
      document.querySelectorAll('.form-input').forEach((inp) => (inp.value = ''));
      state.skills = [];
      renderSkills();
      updatePreview();
      updateProgress();
      showToast('Form cleared');
    }
  });
}

function populateFormWithData(data) {
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  set('fullName', data.fullName);
  set('jobTitle', data.jobTitle);
  set('email', data.email);
  set('phone', data.phone);
  set('location', data.location);
  set('linkedIn', data.linkedIn);
  set('github', data.github);
  set('portfolio', data.portfolio);
  set('summary', data.summary);

  state.skills = [...data.skills];
  renderSkills();

  // Populate experiences
  data.experiences.forEach((exp, i) => {
    set(`exp-title-${i}`, exp.title);
    set(`exp-company-${i}`, exp.company);
    set(`exp-location-${i}`, exp.location);
    set(`exp-start-${i}`, exp.start);
    set(`exp-end-${i}`, exp.end);
    set(`exp-desc-${i}`, exp.desc);
  });

  // Populate educations
  data.educations.forEach((edu, i) => {
    set(`edu-degree-${i}`, edu.degree);
    set(`edu-school-${i}`, edu.school);
    set(`edu-year-${i}`, edu.year);
    set(`edu-desc-${i}`, edu.desc);
  });

  // Populate projects
  data.projects.forEach((p, i) => {
    set(`proj-title-${i}`, p.title);
    set(`proj-role-${i}`, p.role);
    set(`proj-link-${i}`, p.link);
    set(`proj-github-${i}`, p.github);
    set(`proj-tech-${i}`, p.tech);
    set(`proj-desc-${i}`, p.desc);
  });

  // Populate certifications
  data.certifications.forEach((c, i) => {
    set(`cert-name-${i}`, c.name);
    set(`cert-issuer-${i}`, c.issuer);
    set(`cert-date-${i}`, c.date);
    set(`cert-id-${i}`, c.id);
  });
}

// =============================================
//  DOWNLOAD / PRINT
// =============================================
function initDownload() {
  document.getElementById('download-btn')?.addEventListener('click', () => {
    window.print();
  });
}

// =============================================
//  FULLSCREEN PREVIEW (NAVBAR DISAPPEARS)
// =============================================
function initFullscreen() {
  const btn = document.getElementById('fullscreen-btn');
  const icon = document.getElementById('fullscreen-icon');
  const text = document.getElementById('fullscreen-text');

  function toggleFullscreen() {
    const isActive = document.body.classList.toggle('fullscreen-active');
    if (btn) {
      btn.classList.toggle('btn-primary', isActive);
      btn.classList.toggle('btn-soft', !isActive);
    }
    if (icon) icon.textContent = isActive ? '✕' : '⛶';
    if (text) text.textContent = isActive ? 'Exit Full Screen' : 'Full Screen';
    showToast(isActive ? '⛶ Full Screen active (Navbar hidden, press Esc to exit)' : 'Exited full screen');
  }

  btn?.addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('fullscreen-active')) {
      toggleFullscreen();
    }
  });
}

// =============================================
//  HELPERS
// =============================================
function setText(elId, text) {
  const el = document.getElementById(elId);
  if (el) el.textContent = text;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showToast(message, duration = 2400) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}
