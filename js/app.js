/* ==========================================================
   ResumeForge - App JavaScript
   Day 2: Full Resume Form + Live Preview & Templates
   ========================================================== */

'use strict';

import { AuthService } from './auth.js';

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
  AuthService.init();
  initTabs();
  initSkills();
  initZoomControls();
  initDynamicEntries();
  initTemplateSelector();
  initDownload();
  initSampleDataHandlers();
  initFullscreen();
  initMobileViewSwitcher();

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

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks?.classList.toggle('open');
    hamburger?.classList.toggle('active', Boolean(isOpen));
  });

  navLinks?.querySelectorAll('.nav-link, a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('open') && !navLinks.contains(e.target) && !hamburger?.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('active');
    }
  });
}

// =============================================
//  MOBILE VIEW SWITCHER (FORM VS PREVIEW)
// =============================================
function initMobileViewSwitcher() {
  const workspace = document.getElementById('builder-workspace');
  const toFormBtn = document.getElementById('switch-to-form-btn');
  const toPreviewBtn = document.getElementById('switch-to-preview-btn');
  const floatingBtn = document.getElementById('floating-preview-btn');
  const floatingText = document.getElementById('floating-preview-text');
  const floatingIcon = document.getElementById('floating-preview-icon');

  if (!workspace) return;

  function showMode(mode) {
    if (mode === 'preview') {
      workspace.classList.remove('show-form');
      workspace.classList.add('show-preview');
      toFormBtn?.classList.remove('active');
      toPreviewBtn?.classList.add('active');
      if (floatingText) floatingText.textContent = 'Edit Form';
      if (floatingIcon) floatingIcon.textContent = '✏️';
      window.scrollTo({ top: 90, behavior: 'smooth' });
    } else {
      workspace.classList.remove('show-preview');
      workspace.classList.add('show-form');
      toPreviewBtn?.classList.remove('active');
      toFormBtn?.classList.add('active');
      if (floatingText) floatingText.textContent = 'Preview Resume';
      if (floatingIcon) floatingIcon.textContent = '👁️';
      window.scrollTo({ top: 90, behavior: 'smooth' });
    }
  }

  toFormBtn?.addEventListener('click', () => showMode('form'));
  toPreviewBtn?.addEventListener('click', () => showMode('preview'));
  floatingBtn?.addEventListener('click', () => {
    const isShowingPreview = workspace.classList.contains('show-preview');
    showMode(isShowingPreview ? 'form' : 'preview');
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
  const formCard = document.querySelector('.builder-form-card') || document.body;
  if (formCard && !formCard._hasLiveListeners) {
    formCard._hasLiveListeners = true;
    formCard.addEventListener('input', () => {
      updatePreview();
      updateProgress();
    });
    formCard.addEventListener('change', () => {
      updatePreview();
      updateProgress();
    });
  }

  // Also bind directly to all inputs/textareas to guarantee instant response
  document.querySelectorAll('.form-input').forEach((input) => {
    input.removeEventListener('input', onLiveInput);
    input.addEventListener('input', onLiveInput);
    input.removeEventListener('change', onLiveInput);
    input.addEventListener('change', onLiveInput);
  });
}

function onLiveInput() {
  updatePreview();
  updateProgress();
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
  const dist = distributeResumeContent();
  updateModernTemplate(dist);
  updateMinimalTemplate(dist);
  updateCreativeTemplate(dist);

  const pageBadge = document.getElementById('page-count-badge');
  if (pageBadge) {
    if (dist.isTwoPages) {
      pageBadge.textContent = '📄 2 Pages (A4)';
      pageBadge.classList.add('two-pages');
    } else {
      pageBadge.textContent = '📄 1 Page (A4)';
      pageBadge.classList.remove('two-pages');
    }
  }
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
    cards.forEach((card) => {
      const title = card.querySelector('input[id^="exp-title-"]')?.value.trim() || '';
      const company = card.querySelector('input[id^="exp-company-"]')?.value.trim() || '';
      const location = card.querySelector('input[id^="exp-location-"]')?.value.trim() || '';
      const start = card.querySelector('input[id^="exp-start-"]')?.value.trim() || '';
      const end = card.querySelector('input[id^="exp-end-"]')?.value.trim() || '';
      const desc = card.querySelector('textarea[id^="exp-desc-"]')?.value.trim() || '';
      if (title || company || location || start || end || desc) {
        list.push({ title, company, location, start, end, desc });
      }
    });
  } else {
    for (let i = 0; i < state.experienceCount; i++) {
      const title = val(`exp-title-${i}`);
      const company = val(`exp-company-${i}`);
      const location = val(`exp-location-${i}`);
      const start = val(`exp-start-${i}`);
      const end = val(`exp-end-${i}`);
      const desc = val(`exp-desc-${i}`);
      if (title || company || location || start || end || desc) {
        list.push({ title, company, location, start, end, desc });
      }
    }
  }
  return list;
}

function getEducationData() {
  const cards = document.querySelectorAll('#education-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card) => {
      const degree = card.querySelector('input[id^="edu-degree-"]')?.value.trim() || '';
      const school = card.querySelector('input[id^="edu-school-"]')?.value.trim() || '';
      const year = card.querySelector('input[id^="edu-year-"]')?.value.trim() || '';
      const desc = card.querySelector('input[id^="edu-desc-"]')?.value.trim() || '';
      if (degree || school || year || desc) {
        list.push({ degree, school, year, desc });
      }
    });
  } else {
    for (let i = 0; i < state.educationCount; i++) {
      const degree = val(`edu-degree-${i}`);
      const school = val(`edu-school-${i}`);
      const year = val(`edu-year-${i}`);
      const desc = val(`edu-desc-${i}`);
      if (degree || school || year || desc) {
        list.push({ degree, school, year, desc });
      }
    }
  }
  return list;
}

function getProjectData() {
  const cards = document.querySelectorAll('#projects-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card) => {
      const title = card.querySelector('input[id^="proj-title-"]')?.value.trim() || '';
      const role = card.querySelector('input[id^="proj-role-"]')?.value.trim() || '';
      const link = card.querySelector('input[id^="proj-link-"]')?.value.trim() || '';
      const github = card.querySelector('input[id^="proj-github-"]')?.value.trim() || '';
      const tech = card.querySelector('input[id^="proj-tech-"]')?.value.trim() || '';
      const desc = card.querySelector('textarea[id^="proj-desc-"]')?.value.trim() || '';
      if (title || role || link || github || tech || desc) {
        list.push({ title, role, link, github, tech, desc });
      }
    });
  } else {
    for (let i = 0; i < state.projectsCount; i++) {
      const title = val(`proj-title-${i}`);
      const role = val(`proj-role-${i}`);
      const link = val(`proj-link-${i}`);
      const github = val(`proj-github-${i}`);
      const tech = val(`proj-tech-${i}`);
      const desc = val(`proj-desc-${i}`);
      if (title || role || link || github || tech || desc) {
        list.push({ title, role, link, github, tech, desc });
      }
    }
  }
  return list;
}

function getCertificationData() {
  const cards = document.querySelectorAll('#certifications-entries .entry-card');
  const list = [];
  if (cards.length > 0) {
    cards.forEach((card) => {
      const name = card.querySelector('input[id^="cert-name-"]')?.value.trim() || '';
      const issuer = card.querySelector('input[id^="cert-issuer-"]')?.value.trim() || '';
      const date = card.querySelector('input[id^="cert-date-"]')?.value.trim() || '';
      const id = card.querySelector('input[id^="cert-id-"]')?.value.trim() || '';
      if (name || issuer || date || id) {
        list.push({ name, issuer, date, id });
      }
    });
  } else {
    for (let i = 0; i < state.certificationsCount; i++) {
      const name = val(`cert-name-${i}`);
      const issuer = val(`cert-issuer-${i}`);
      const date = val(`cert-date-${i}`);
      const id = val(`cert-id-${i}`);
      if (name || issuer || date || id) {
        list.push({ name, issuer, date, id });
      }
    }
  }
  return list;
}

// =============================================================
//  A-4 MULTI-PAGE DISTRIBUTION ALGORITHM
//  Distributes sections and entries across Page 1 and Page 2
//  Every page is strictly A-4 size (595px x 842px).
// =============================================================
function distributeResumeContent() {
  const exp = getExperienceData();
  const edu = getEducationData();
  const proj = getProjectData();
  const cert = getCertificationData();
  const summary = val('summary');

  // Page 1 budget in pixels for body content (total 842px minus top/bottom padding & headers)
  const p1Budget = 680;
  let currentUsage = 80; // Header footprint

  if (summary) {
    currentUsage += Math.max(48, Math.ceil(summary.length / 65) * 16 + 28);
  }

  const expP1 = [];
  const expP2 = [];
  exp.forEach((item) => {
    let itemH = 52;
    if (item.desc) itemH += Math.ceil(item.desc.length / 58) * 16;
    if (expP2.length === 0 && currentUsage + itemH <= p1Budget) {
      expP1.push(item);
      currentUsage += itemH;
    } else {
      expP2.push(item);
    }
  });

  const eduP1 = [];
  const eduP2 = [];
  edu.forEach((item) => {
    let itemH = 46;
    if (item.desc) itemH += Math.ceil(item.desc.length / 58) * 16;
    if (expP2.length === 0 && eduP2.length === 0 && currentUsage + itemH <= p1Budget) {
      eduP1.push(item);
      currentUsage += itemH;
    } else {
      eduP2.push(item);
    }
  });

  const projP1 = [];
  const projP2 = [];
  proj.forEach((item) => {
    let itemH = 50;
    if (item.desc) itemH += Math.ceil(item.desc.length / 58) * 16;
    if (expP2.length === 0 && eduP2.length === 0 && projP2.length === 0 && currentUsage + itemH <= p1Budget) {
      projP1.push(item);
      currentUsage += itemH;
    } else {
      projP2.push(item);
    }
  });

  const certP1 = [];
  const certP2 = [];
  cert.forEach((item) => {
    let itemH = 36;
    if (expP2.length === 0 && eduP2.length === 0 && projP2.length === 0 && certP2.length === 0 && currentUsage + itemH <= p1Budget) {
      certP1.push(item);
      currentUsage += itemH;
    } else {
      certP2.push(item);
    }
  });

  const isTwoPages = (expP2.length > 0 || eduP2.length > 0 || projP2.length > 0 || certP2.length > 0);

  return {
    expP1, expP2,
    eduP1, eduP2,
    projP1, projP2,
    certP1, certP2,
    isTwoPages
  };
}

// -------------------------------------------------------------
// 1. MODERN TEMPLATE UPDATER (Multi-Page A-4 Layout)
// -------------------------------------------------------------
function updateModernTemplate(dist) {
  if (!dist) dist = distributeResumeContent();
  const fullName = val('fullName');
  const jobTitle = val('jobTitle');
  const email = val('email');
  const phone = val('phone');
  const location = val('location');
  const linkedIn = val('linkedIn');
  const github = val('github');
  const portfolio = val('portfolio');
  const summary = val('summary');

  // Page 1 Header & Avatar
  const initial = fullName ? fullName.trim().charAt(0).toUpperCase() : '·';
  setText('tpl-m-avatar', initial);
  setText('tpl-m-name', fullName || 'Your Name');
  setText('tpl-m-title', jobTitle || 'Professional Title');
  
  // Summary section
  setSecVisible('tpl-m-summary-sec', Boolean(summary));
  setText('tpl-m-summary', summary);

  // Contacts
  const setContact = (id, text) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (text) {
      el.style.display = '';
      el.textContent = text;
    } else {
      el.style.display = 'none';
      el.textContent = '';
    }
  };

  setContact('tpl-m-email', email);
  setContact('tpl-m-phone', phone);
  setContact('tpl-m-location', location);
  setContact('tpl-m-linkedin', linkedIn);
  setContact('tpl-m-github', github);
  setContact('tpl-m-portfolio', portfolio);

  // Skills
  const skillsEl = document.getElementById('tpl-m-skills');
  if (skillsEl) {
    skillsEl.innerHTML = state.skills.length
      ? state.skills
          .map((s) => `<span class="live-m-skill-pill">${escapeHtml(s)}</span>`)
          .join('')
      : '<span class="live-m-skill-pill" style="opacity:0.6">No skills added</span>';
  }

  // Page 1 Entries
  renderModernEntries('tpl-m-exp-entries-p1', dist.expP1, 'exp');
  setSecVisible('tpl-m-exp-sec-p1', dist.expP1.length > 0);

  renderModernEntries('tpl-m-edu-entries-p1', dist.eduP1, 'edu');
  setSecVisible('tpl-m-edu-sec-p1', dist.eduP1.length > 0);

  renderModernEntries('tpl-m-proj-entries-p1', dist.projP1, 'proj');
  setSecVisible('tpl-m-proj-sec-p1', dist.projP1.length > 0);

  renderModernEntries('tpl-m-cert-entries-p1', dist.certP1, 'cert');
  renderModernEntries('tpl-m-cert-body-entries-p1', dist.certP1, 'cert');
  setSecVisible('tpl-m-cert-section-p1', dist.certP1.length > 0);
  setSecVisible('tpl-m-cert-body-sec-p1', dist.certP1.length > 0);

  // Page 2 & Divider Handling
  const p2 = document.getElementById('tpl-m-page-2');
  const pBreak = document.getElementById('tpl-m-page-break');
  const f1 = document.getElementById('tpl-m-footer-p1');

  if (dist.isTwoPages) {
    if (p2) p2.style.display = 'flex';
    if (pBreak) pBreak.classList.add('active');
    if (f1) f1.innerHTML = 'Page 1 of 2';

    // Page 2 Header & Side Name
    setText('tpl-m-avatar-p2', initial);
    setText('tpl-m-name-side-p2', fullName || 'Your Name');
    setText('tpl-m-name-p2', fullName || 'Your Name');

    // Page 2 Entries
    renderModernEntries('tpl-m-exp-entries-p2', dist.expP2, 'exp');
    setSecVisible('tpl-m-exp-sec-p2', dist.expP2.length > 0);

    renderModernEntries('tpl-m-edu-entries-p2', dist.eduP2, 'edu');
    setSecVisible('tpl-m-edu-sec-p2', dist.eduP2.length > 0);

    renderModernEntries('tpl-m-proj-entries-p2', dist.projP2, 'proj');
    setSecVisible('tpl-m-proj-sec-p2', dist.projP2.length > 0);

    renderModernEntries('tpl-m-cert-entries-p2', dist.certP2, 'cert');
    renderModernEntries('tpl-m-cert-body-entries-p2', dist.certP2, 'cert');
    setSecVisible('tpl-m-cert-section-p2', dist.certP2.length > 0);
    setSecVisible('tpl-m-cert-body-sec-p2', dist.certP2.length > 0);
  } else {
    if (p2) p2.style.display = 'none';
    if (pBreak) pBreak.classList.remove('active');
    if (f1) f1.innerHTML = 'Page 1 of 1';
  }
}

function setSecVisible(id, visible) {
  const el = document.getElementById(id);
  if (el) el.style.display = visible ? '' : 'none';
}

function renderModernEntries(containerId, list, type) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML = '';
    return;
  }
  if (type === 'exp') {
    container.innerHTML = list.map((exp) => {
      const dates = [exp.start, exp.end].filter(Boolean).join(' – ');
      const sub = [exp.company, exp.location].filter(Boolean).join(' · ');
      return `
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${escapeHtml(exp.title || exp.company || 'Experience')}</span>
          ${dates ? `<span class="live-m-entry-date">${escapeHtml(dates)}</span>` : ''}
        </div>
        ${sub ? `<div class="live-m-entry-sub">${escapeHtml(sub)}</div>` : ''}
        ${exp.desc ? `<div class="live-m-entry-desc">${escapeHtml(exp.desc)}</div>` : ''}
      </div>`;
    }).join('');
  } else if (type === 'edu') {
    container.innerHTML = list.map((edu) => `
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${escapeHtml(edu.degree || edu.school || 'Education')}</span>
          ${edu.year ? `<span class="live-m-entry-date">${escapeHtml(edu.year)}</span>` : ''}
        </div>
        ${edu.school ? `<div class="live-m-entry-sub">${escapeHtml(edu.school)}</div>` : ''}
        ${edu.desc ? `<div class="live-m-entry-desc">${escapeHtml(edu.desc)}</div>` : ''}
      </div>`).join('');
  } else if (type === 'proj') {
    container.innerHTML = list.map((p) => {
      const links = [];
      if (p.link) {
        const href = p.link.startsWith('http') ? p.link : `https://${p.link}`;
        links.push(`<a href="${escapeHtml(href)}" target="_blank" style="font-size:0.68rem;color:#0d9488;font-weight:600;">Demo ↗</a>`);
      }
      if (p.github) {
        const href = p.github.startsWith('http') ? p.github : `https://${p.github}`;
        links.push(`<a href="${escapeHtml(href)}" target="_blank" style="font-size:0.68rem;color:#0d9488;font-weight:600;">GitHub ↗</a>`);
      }
      return `
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${escapeHtml(p.title || 'Project')}${p.role ? ` <small style="color:#64748b">(${escapeHtml(p.role)})</small>` : ''}</span>
          ${links.length ? `<div>${links.join(' <span style="color:#94a3b8">·</span> ')}</div>` : ''}
        </div>
        ${p.tech ? `<div class="live-m-entry-sub" style="font-size:0.7rem;color:#475569">Stack: ${escapeHtml(p.tech)}</div>` : ''}
        ${p.desc ? `<div class="live-m-entry-desc">${escapeHtml(p.desc)}</div>` : ''}
      </div>`;
    }).join('');
  } else if (type === 'cert') {
    container.innerHTML = list.map((c) => {
      const sub = [c.issuer, c.id ? `ID: ${c.id}` : ''].filter(Boolean).join(' · ');
      return `
      <div class="live-m-entry">
        <div class="live-m-entry-head">
          <span>${escapeHtml(c.name || 'Certification')}</span>
          ${c.date ? `<span class="live-m-entry-date">${escapeHtml(c.date)}</span>` : ''}
        </div>
        ${sub ? `<div class="live-m-entry-sub">${escapeHtml(sub)}</div>` : ''}
      </div>`;
    }).join('');
  }
}

// -------------------------------------------------------------
// 2. MINIMAL TEMPLATE UPDATER (Multi-Page A-4 Layout)
// -------------------------------------------------------------
function updateMinimalTemplate(dist) {
  if (!dist) dist = distributeResumeContent();
  const fullName = val('fullName');
  const jobTitle = val('jobTitle');
  const email = val('email');
  const phone = val('phone');
  const location = val('location');
  const linkedIn = val('linkedIn');
  const github = val('github');
  const portfolio = val('portfolio');
  const summary = val('summary');

  setText('tpl-mn-name', fullName || 'Your Name');
  setText('tpl-mn-title', jobTitle || 'Professional Title');
  setText('tpl-mn-summary', summary);
  setSecVisible('tpl-mn-summary-sec', Boolean(summary));

  // Contacts
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
    contactsEl.style.display = items.length > 0 ? '' : 'none';
  }

  // Skills on Page 1
  const skillsElP1 = document.getElementById('tpl-mn-skills-p1');
  if (skillsElP1) {
    skillsElP1.innerHTML = state.skills.length
      ? state.skills.map((s) => `<span class="live-mn-skill-item">${escapeHtml(s)}</span>`).join(' <span class="mn-sep">•</span> ')
      : '—';
  }
  setSecVisible('tpl-mn-skills-sec-p1', state.skills.length > 0);

  // Page 1 Entries
  renderMinimalEntries('tpl-mn-exp-entries-p1', dist.expP1, 'exp');
  setSecVisible('tpl-mn-exp-sec-p1', dist.expP1.length > 0);

  renderMinimalEntries('tpl-mn-edu-entries-p1', dist.eduP1, 'edu');
  setSecVisible('tpl-mn-edu-sec-p1', dist.eduP1.length > 0);

  renderMinimalEntries('tpl-mn-proj-entries-p1', dist.projP1, 'proj');
  setSecVisible('tpl-mn-proj-sec-p1', dist.projP1.length > 0);

  renderMinimalEntries('tpl-mn-cert-entries-p1', dist.certP1, 'cert');
  setSecVisible('tpl-mn-cert-sec-p1', dist.certP1.length > 0);

  // Page 2 & Divider Handling
  const p2 = document.getElementById('tpl-mn-page-2');
  const pBreak = document.getElementById('tpl-mn-page-break');
  const f1 = document.getElementById('tpl-mn-footer-p1');

  if (dist.isTwoPages) {
    if (p2) p2.style.display = 'block';
    if (pBreak) pBreak.classList.add('active');
    if (f1) f1.innerHTML = 'Page 1 of 2';

    setText('tpl-mn-name-p2', fullName || 'Your Name');

    renderMinimalEntries('tpl-mn-exp-entries-p2', dist.expP2, 'exp');
    setSecVisible('tpl-mn-exp-sec-p2', dist.expP2.length > 0);

    renderMinimalEntries('tpl-mn-edu-entries-p2', dist.eduP2, 'edu');
    setSecVisible('tpl-mn-edu-sec-p2', dist.eduP2.length > 0);

    renderMinimalEntries('tpl-mn-proj-entries-p2', dist.projP2, 'proj');
    setSecVisible('tpl-mn-proj-sec-p2', dist.projP2.length > 0);

    renderMinimalEntries('tpl-mn-cert-entries-p2', dist.certP2, 'cert');
    setSecVisible('tpl-mn-cert-sec-p2', dist.certP2.length > 0);
  } else {
    if (p2) p2.style.display = 'none';
    if (pBreak) pBreak.classList.remove('active');
    if (f1) f1.innerHTML = 'Page 1 of 1';
  }
}

function renderMinimalEntries(containerId, list, type) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML = '';
    return;
  }
  if (type === 'exp') {
    container.innerHTML = list.map((exp) => {
      const dates = [exp.start, exp.end].filter(Boolean).join(' – ');
      return `
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${escapeHtml(exp.title || exp.company || 'Experience')}</strong>${exp.company ? ` — <span class="live-mn-company">${escapeHtml(exp.company)}</span>` : ''}</div>
          ${dates ? `<span class="live-mn-date">${escapeHtml(dates)}</span>` : ''}
        </div>
        ${exp.location ? `<div class="live-mn-location">${escapeHtml(exp.location)}</div>` : ''}
        ${exp.desc ? `<div class="live-mn-entry-desc">${escapeHtml(exp.desc)}</div>` : ''}
      </div>`;
    }).join('');
  } else if (type === 'edu') {
    container.innerHTML = list.map((edu) => `
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${escapeHtml(edu.degree || edu.school || 'Education')}</strong>${edu.school ? ` — <span class="live-mn-company">${escapeHtml(edu.school)}</span>` : ''}</div>
          ${edu.year ? `<span class="live-mn-date">${escapeHtml(edu.year)}</span>` : ''}
        </div>
        ${edu.desc ? `<div class="live-mn-entry-desc">${escapeHtml(edu.desc)}</div>` : ''}
      </div>`).join('');
  } else if (type === 'proj') {
    container.innerHTML = list.map((p) => {
      const links = [];
      if (p.link) {
        const href = p.link.startsWith('http') ? p.link : `https://${p.link}`;
        links.push(`<a href="${escapeHtml(href)}" target="_blank" style="font-size:0.71rem;color:#0f172a;text-decoration:underline;font-weight:600;">Demo ↗</a>`);
      }
      if (p.github) {
        const href = p.github.startsWith('http') ? p.github : `https://${p.github}`;
        links.push(`<a href="${escapeHtml(href)}" target="_blank" style="font-size:0.71rem;color:#0f172a;text-decoration:underline;font-weight:600;">GitHub ↗</a>`);
      }
      return `
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${escapeHtml(p.title || 'Project')}</strong>${p.role ? ` <span style="font-weight:400;color:#64748b">(${escapeHtml(p.role)})</span>` : ''}</div>
          ${links.length ? `<div>${links.join(' ')}</div>` : ''}
        </div>
        ${p.tech ? `<div class="live-mn-proj-tech">Stack: ${escapeHtml(p.tech)}</div>` : ''}
        ${p.desc ? `<div class="live-mn-entry-desc">${escapeHtml(p.desc)}</div>` : ''}
      </div>`;
    }).join('');
  } else if (type === 'cert') {
    container.innerHTML = list.map((c) => {
      const sub = [c.issuer, c.id ? `ID: ${c.id}` : ''].filter(Boolean).join(' · ');
      return `
      <div class="live-mn-entry">
        <div class="live-mn-entry-head">
          <div><strong>${escapeHtml(c.name || 'Certification')}</strong>${sub ? ` — <span class="live-mn-company">${escapeHtml(sub)}</span>` : ''}</div>
          ${c.date ? `<span class="live-mn-date">${escapeHtml(c.date)}</span>` : ''}
        </div>
      </div>`;
    }).join('');
  }
}

// -------------------------------------------------------------
// 3. CREATIVE TEMPLATE UPDATER (Multi-Page A-4 Layout)
// -------------------------------------------------------------
function updateCreativeTemplate(dist) {
  if (!dist) dist = distributeResumeContent();
  const fullName = val('fullName');
  const jobTitle = val('jobTitle');
  const email = val('email');
  const phone = val('phone');
  const location = val('location');
  const linkedIn = val('linkedIn');
  const github = val('github');
  const portfolio = val('portfolio');
  const summary = val('summary');

  setText('tpl-cr-name', fullName || 'Your Name');
  setText('tpl-cr-title', jobTitle || 'Professional Title');
  setText('tpl-cr-summary', summary);
  setSecVisible('tpl-cr-summary-sec', Boolean(summary));

  // Creative Contacts
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
    crContacts.style.display = items.length > 0 ? '' : 'none';
  }

  // Skills
  const crSkills = document.getElementById('tpl-cr-skills');
  if (crSkills) {
    crSkills.innerHTML = state.skills.length
      ? state.skills.map((s) => `<span class="live-cr-skill-pill">${escapeHtml(s)}</span>`).join('')
      : '—';
  }

  // Page 1 Entries
  renderCreativeEntries('tpl-cr-exp-entries-p1', dist.expP1, 'exp');
  setSecVisible('tpl-cr-exp-sec-p1', dist.expP1.length > 0);

  renderCreativeEntries('tpl-cr-proj-entries-p1', dist.projP1, 'proj');
  setSecVisible('tpl-cr-proj-sec-p1', dist.projP1.length > 0);

  renderCreativeEntries('tpl-cr-edu-entries-p1', dist.eduP1, 'edu');
  setSecVisible('tpl-cr-edu-sec-p1', dist.eduP1.length > 0);

  renderCreativeEntries('tpl-cr-cert-entries-p1', dist.certP1, 'cert');
  setSecVisible('tpl-cr-cert-sec-p1', dist.certP1.length > 0);

  // Page 2 & Divider Handling
  const p2 = document.getElementById('tpl-cr-page-2');
  const pBreak = document.getElementById('tpl-cr-page-break');
  const f1 = document.getElementById('tpl-cr-footer-p1');

  if (dist.isTwoPages) {
    if (p2) p2.style.display = 'block';
    if (pBreak) pBreak.classList.add('active');
    if (f1) f1.innerHTML = 'Page 1 of 2';

    setText('tpl-cr-name-p2', fullName || 'Your Name');

    renderCreativeEntries('tpl-cr-exp-entries-p2', dist.expP2, 'exp');
    setSecVisible('tpl-cr-exp-sec-p2', dist.expP2.length > 0);

    renderCreativeEntries('tpl-cr-proj-entries-p2', dist.projP2, 'proj');
    setSecVisible('tpl-cr-proj-sec-p2', dist.projP2.length > 0);

    renderCreativeEntries('tpl-cr-edu-entries-p2', dist.eduP2, 'edu');
    setSecVisible('tpl-cr-edu-sec-p2', dist.eduP2.length > 0);

    renderCreativeEntries('tpl-cr-cert-entries-p2', dist.certP2, 'cert');
    setSecVisible('tpl-cr-cert-sec-p2', dist.certP2.length > 0);
  } else {
    if (p2) p2.style.display = 'none';
    if (pBreak) pBreak.classList.remove('active');
    if (f1) f1.innerHTML = 'Page 1 of 1';
  }
}

function renderCreativeEntries(containerId, list, type) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML = '';
    return;
  }
  if (type === 'exp') {
    container.innerHTML = list.map((exp) => {
      const dates = [exp.start, exp.end].filter(Boolean).join(' – ');
      const sub = [exp.company, exp.location].filter(Boolean).join(' · ');
      return `
      <div class="live-cr-card">
        <div class="live-cr-card-top">
          <span class="live-cr-card-title">${escapeHtml(exp.title || exp.company || 'Experience')}</span>
          ${dates ? `<span class="live-cr-card-badge">${escapeHtml(dates)}</span>` : ''}
        </div>
        ${sub ? `<div class="live-cr-card-sub">${escapeHtml(sub)}</div>` : ''}
        ${exp.desc ? `<div class="live-cr-card-desc">${escapeHtml(exp.desc)}</div>` : ''}
      </div>`;
    }).join('');
  } else if (type === 'proj') {
    container.innerHTML = list.map((p) => {
      const links = [];
      if (p.link) {
        const href = p.link.startsWith('http') ? p.link : `https://${p.link}`;
        links.push(`<a href="${escapeHtml(href)}" target="_blank" class="live-cr-link">Demo ↗</a>`);
      }
      if (p.github) {
        const href = p.github.startsWith('http') ? p.github : `https://${p.github}`;
        links.push(`<a href="${escapeHtml(href)}" target="_blank" class="live-cr-link">GitHub ↗</a>`);
      }
      return `
      <div class="live-cr-card">
        <div class="live-cr-card-top">
          <span class="live-cr-card-title">${escapeHtml(p.title || 'Project')}${p.role ? ` <small style="font-weight:400;color:#64748b">(${escapeHtml(p.role)})</small>` : ''}</span>
          ${links.length ? `<div>${links.join(' ')}</div>` : ''}
        </div>
        ${p.tech ? `<div class="live-cr-card-sub" style="color:#0284c7;font-size:0.68rem;">Stack: ${escapeHtml(p.tech)}</div>` : ''}
        ${p.desc ? `<div class="live-cr-card-desc">${escapeHtml(p.desc)}</div>` : ''}
      </div>`;
    }).join('');
  } else if (type === 'edu') {
    container.innerHTML = list.map((edu) => `
      <div class="live-cr-side-item live-cr-side-edu">
        <div class="live-cr-side-title">${escapeHtml(edu.degree || edu.school || 'Education')}</div>
        ${edu.school ? `<div class="live-cr-side-sub">${escapeHtml(edu.school)}</div>` : ''}
        ${edu.year ? `<div class="live-cr-side-date">${escapeHtml(edu.year)}</div>` : ''}
        ${edu.desc ? `<div class="live-cr-card-desc" style="font-size:0.68rem;">${escapeHtml(edu.desc)}</div>` : ''}
      </div>`).join('');
  } else if (type === 'cert') {
    container.innerHTML = list.map((c) => {
      const sub = [c.issuer, c.id ? `ID: ${c.id}` : ''].filter(Boolean).join(' · ');
      return `
      <div class="live-cr-side-item live-cr-side-cert">
        <div class="live-cr-side-title">${escapeHtml(c.name || 'Certification')}</div>
        ${sub ? `<div class="live-cr-side-sub">${escapeHtml(sub)}</div>` : ''}
        ${c.date ? `<div class="live-cr-side-date">${escapeHtml(c.date)}</div>` : ''}
      </div>`;
    }).join('');
  }
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
//  ZOOM CONTROLS (RESPONSIVE AUTO-FIT)
// =============================================
function getOptimalZoom() {
  if (window.innerWidth <= 480) {
    const available = window.innerWidth - 32;
    return Math.min(Math.max(parseFloat((available / 615).toFixed(2)), 0.42), 0.72);
  } else if (window.innerWidth <= 768) {
    const available = window.innerWidth - 48;
    return Math.min(Math.max(parseFloat((available / 615).toFixed(2)), 0.65), 0.95);
  }
  return 1.0;
}

function initZoomControls() {
  document.getElementById('zoom-in-btn')?.addEventListener('click', () => setZoom(state.zoom + 0.1));
  document.getElementById('zoom-out-btn')?.addEventListener('click', () => setZoom(state.zoom - 0.1));
  document.getElementById('zoom-level')?.addEventListener('click', () => setZoom(getOptimalZoom()));

  // Auto-fit default zoom on mobile / tablet
  if (window.innerWidth <= 768) {
    setZoom(getOptimalZoom());
  }

  // Handle window resizing or orientation change
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && (state.zoom === 1.0 || state.zoom === 0.5)) {
      setZoom(getOptimalZoom());
    }
  });
}

function setZoom(level) {
  state.zoom = Math.min(Math.max(level, 0.4), 1.6);
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
//  DOWNLOAD / PDF EXPORT
// =============================================
let printState = {
  originalTitle: '',
  wasShowingForm: false,
  originalTransform: '',
};

function prepareForPrint() {
  // 1. Ensure preview is freshly rendered from all form fields
  if (typeof updatePreview === 'function') {
    updatePreview();
  }

  // 2. Set dynamic title so the saved PDF defaults to "Candidate_Name_Resume.pdf"
  printState.originalTitle = document.title;
  const nameInput = document.getElementById('fullName');
  const candidateName = nameInput?.value?.trim() || 'Resume';
  const cleanName = candidateName.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().replace(/\s+/g, '_');
  document.title = cleanName ? `${cleanName}_Resume` : 'Resume';

  // 3. Reset zoom scaling so it prints at exact 1:1 A4 dimensions
  const sheet = document.getElementById('resume-sheet');
  if (sheet) {
    printState.originalTransform = sheet.style.transform;
    sheet.style.transform = 'none';
  }

  // 4. On mobile/tablet or dual-pane, ensure preview card is visible
  const workspace = document.getElementById('builder-workspace');
  if (workspace) {
    printState.wasShowingForm = workspace.classList.contains('show-form');
    workspace.classList.remove('show-form');
    workspace.classList.add('show-preview');
  }

  document.body.classList.add('printing-active');
}

function cleanupAfterPrint() {
  document.body.classList.remove('printing-active');

  // Restore document title
  if (printState.originalTitle) {
    document.title = printState.originalTitle;
  }

  // Restore zoom transform
  const sheet = document.getElementById('resume-sheet');
  if (sheet && printState.originalTransform !== undefined) {
    sheet.style.transform = printState.originalTransform;
  }

  // Restore mobile view mode if it was showing the form
  const workspace = document.getElementById('builder-workspace');
  if (workspace && printState.wasShowingForm) {
    workspace.classList.add('show-form');
    workspace.classList.remove('show-preview');
  }
}

export function downloadResume() {
  prepareForPrint();
  window.print();
  // Fallback cleanup in case afterprint does not fire immediately
  setTimeout(cleanupAfterPrint, 1200);
}

function initDownload() {
  // Global click delegate for all download/export resume buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#download-btn, #export-pdf-btn, #builder-export-btn, [data-action="download-pdf"]');
    if (btn) {
      e.preventDefault();
      downloadResume();
    }
  });

  // Native print triggers (Ctrl+P, browser print menu)
  window.addEventListener('beforeprint', prepareForPrint);
  window.addEventListener('afterprint', cleanupAfterPrint);
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
