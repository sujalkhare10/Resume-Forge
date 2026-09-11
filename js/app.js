/* ==========================================================
   ResumeForge - App JavaScript
   Day 1: Basic Setup + Interactive UI + Live Preview
   ========================================================== */

'use strict';

// =============================================
//  STATE
// =============================================
const state = {
  template: 'modern',
  zoom: 1,
  skills: ['Communication', 'Teamwork'],
  experienceCount: 1,
  educationCount: 1,
  currentTab: 'personal',
  tabs: ['personal', 'experience', 'education', 'skills'],
};

// =============================================
//  INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTheme();
  initTabs();
  initFormListeners();
  initTemplateSelector();
  initSkills();
  initZoomControls();
  initDynamicEntries();
  initDownload();
  updateProgress();
  updatePreview();
});

// =============================================
//  NAVBAR
// =============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// =============================================
//  THEME TOGGLE
// =============================================
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('rf-theme') || 'dark';
  applyTheme(saved);

  btn?.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(next === 'light' ? '☀️ Light mode on' : '🌙 Dark mode on');
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('rf-theme', theme);
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// =============================================
//  TABS
// =============================================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const prevBtn = document.getElementById('prev-tab-btn');
  const nextBtn = document.getElementById('next-tab-btn');

  tabBtns.forEach(btn => {
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
    if (idx < state.tabs.length - 1) switchTab(state.tabs[idx + 1]);
  });
}

function switchTab(tabName) {
  state.currentTab = tabName;

  // Update button active states
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  // Show/hide content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-content-${tabName}`);
  });

  // Prev/Next button states
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
  // All inputs trigger preview update + progress
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', debounce(() => {
      updatePreview();
      updateProgress();
    }, 120));
  });
}

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
  const inputs = [
    document.getElementById('fullName'),
    document.getElementById('email'),
    document.getElementById('jobTitle'),
    document.getElementById('phone'),
    document.getElementById('location'),
    document.getElementById('summary'),
    document.getElementById('exp-title-0'),
    document.getElementById('exp-company-0'),
    document.getElementById('edu-degree-0'),
    document.getElementById('edu-school-0'),
  ];

  const filled = inputs.filter(el => el && el.value.trim().length > 0).length;
  const skillBonus = state.skills.length > 2 ? 1 : 0;
  const total = inputs.length + 1;
  const pct = Math.round(((filled + skillBonus) / total) * 100);

  const bar = document.getElementById('progress-bar');
  const text = document.getElementById('progress-text');
  if (bar) bar.style.width = `${pct}%`;
  if (text) text.textContent = `${pct}% complete`;
}

// =============================================
//  LIVE PREVIEW UPDATE
// =============================================
function updatePreview() {
  if (state.template === 'modern') updateModernTemplate();
}

function updateModernTemplate() {
  const g = id => document.getElementById(id);
  const val = (id) => {
    const el = g(id);
    return el ? el.value.trim() : '';
  };

  const fullName = val('fullName') || 'Your Name';
  const jobTitle = val('jobTitle') || 'Job Title';
  const email    = val('email')    || '—';
  const phone    = val('phone')    || '—';
  const location = val('location') || '—';
  const website  = val('website')  || '—';
  const summary  = val('summary')  || 'Your professional summary will appear here.';

  // Avatar initial
  const avatarEl = g('tpl-m-avatar');
  if (avatarEl) avatarEl.textContent = fullName.charAt(0).toUpperCase() || '?';

  setText('tpl-m-name', fullName);
  setText('tpl-m-title', jobTitle);
  setText('tpl-m-email', email);
  setText('tpl-m-phone', phone);
  setText('tpl-m-location', location);
  setText('tpl-m-website', website);
  setText('tpl-m-summary', summary);

  // Skills
  const skillsEl = g('tpl-m-skills');
  if (skillsEl) {
    skillsEl.innerHTML = state.skills.length
      ? state.skills.map(s => `<span class="tpl-m-skill-tag">${escapeHtml(s)}</span>`).join('')
      : '<span class="tpl-m-skill-tag">—</span>';
  }

  // Experience entries
  updateExpPreview();

  // Education entries
  updateEduPreview();
}

function updateExpPreview() {
  const container = document.getElementById('tpl-m-exp-entries');
  if (!container) return;

  let html = '';
  for (let i = 0; i < state.experienceCount; i++) {
    const title   = getVal(`exp-title-${i}`)   || 'Job Title';
    const company = getVal(`exp-company-${i}`) || 'Company';
    const loc     = getVal(`exp-location-${i}`) || '';
    const start   = getVal(`exp-start-${i}`)   || 'Start';
    const end     = getVal(`exp-end-${i}`)     || 'End';
    const desc    = getVal(`exp-desc-${i}`)    || '';

    const companyStr = [company, loc].filter(Boolean).join(' · ');
    const dateStr = `${start} – ${end}`;

    html += `
      <div class="tpl-m-exp-entry">
        <div class="tpl-m-exp-header">
          <strong>${escapeHtml(title)}</strong>
          <span class="tpl-m-exp-date">${escapeHtml(dateStr)}</span>
        </div>
        <div class="tpl-m-exp-company">${escapeHtml(companyStr)}</div>
        ${desc ? `<div class="tpl-m-exp-desc">${escapeHtml(desc)}</div>` : ''}
      </div>`;
  }
  container.innerHTML = html;
}

function updateEduPreview() {
  const container = document.getElementById('tpl-m-edu-entries');
  if (!container) return;

  let html = '';
  for (let i = 0; i < state.educationCount; i++) {
    const degree = getVal(`edu-degree-${i}`) || 'Degree';
    const school = getVal(`edu-school-${i}`) || 'School / University';
    const year   = getVal(`edu-year-${i}`)   || '';
    const desc   = getVal(`edu-desc-${i}`)   || '';

    html += `
      <div class="tpl-m-edu-entry">
        <div class="tpl-m-exp-header">
          <strong>${escapeHtml(degree)}</strong>
          <span class="tpl-m-exp-date">${escapeHtml(year)}</span>
        </div>
        <div class="tpl-m-exp-company">${escapeHtml(school)}</div>
        ${desc ? `<div class="tpl-m-exp-desc" style="font-size:0.68rem; color:#9ca3af">${escapeHtml(desc)}</div>` : ''}
      </div>`;
  }
  container.innerHTML = html;
}

// =============================================
//  TEMPLATE SELECTOR
// =============================================
function initTemplateSelector() {
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => selectTemplate(card.dataset.template));
  });
  document.querySelectorAll('[data-template]').forEach(btn => {
    if (btn.tagName === 'BUTTON') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectTemplate(btn.dataset.template);
      });
    }
  });
}

function selectTemplate(tplName) {
  state.template = tplName;

  // Update card active states
  document.querySelectorAll('.template-card').forEach(card => {
    const isActive = card.dataset.template === tplName;
    card.classList.toggle('active', isActive);
  });

  // Update button labels
  document.querySelectorAll('.template-select-btn button').forEach(btn => {
    const isActive = btn.dataset.template === tplName;
    btn.textContent = isActive ? 'Selected ✓' : 'Use Template';
    btn.className = `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`;
  });

  // Show/hide resume templates in preview
  document.querySelectorAll('.resume-template').forEach(tpl => {
    tpl.style.display = tpl.id === `tpl-${tplName}` ? 'flex' : 'none';
  });

  updatePreview();
  showToast(`✨ ${capitalize(tplName)} template selected`);

  // Scroll to builder
  document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =============================================
//  SKILLS
// =============================================
function initSkills() {
  const input = document.getElementById('skill-input');
  const addBtn = document.getElementById('add-skill-btn');

  addBtn?.addEventListener('click', () => addSkill(input));
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(input); }
  });

  // Remove event delegation
  document.getElementById('skills-tags')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('skill-remove')) {
      const skill = e.target.dataset.skill;
      removeSkill(skill);
    }
  });

  renderSkills();
}

function addSkill(input) {
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;
  if (state.skills.includes(value)) {
    showToast('⚠️ Skill already added');
    return;
  }
  state.skills.push(value);
  input.value = '';
  renderSkills();
  updatePreview();
  updateProgress();
}

function removeSkill(skill) {
  state.skills = state.skills.filter(s => s !== skill);
  renderSkills();
  updatePreview();
}

function renderSkills() {
  const container = document.getElementById('skills-tags');
  if (!container) return;
  container.innerHTML = state.skills
    .map(s => `<span class="skill-tag" data-skill="${escapeHtml(s)}">${escapeHtml(s)} <span class="skill-remove" data-skill="${escapeHtml(s)}">×</span></span>`)
    .join('');
}

// =============================================
//  DYNAMIC ENTRIES (Experience / Education)
// =============================================
function initDynamicEntries() {
  document.getElementById('add-experience-btn')?.addEventListener('click', () => {
    addEntry('experience');
  });
  document.getElementById('add-education-btn')?.addEventListener('click', () => {
    addEntry('education');
  });

  // Remove btn delegation
  document.getElementById('experience-entries')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.entry-remove-btn');
    if (btn && btn.dataset.type === 'experience') removeEntry('experience', parseInt(btn.dataset.index));
  });
  document.getElementById('education-entries')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.entry-remove-btn');
    if (btn && btn.dataset.type === 'education') removeEntry('education', parseInt(btn.dataset.index));
  });
}

function addEntry(type) {
  if (type === 'experience') {
    const idx = state.experienceCount;
    state.experienceCount++;
    const container = document.getElementById('experience-entries');
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.id = `exp-entry-${idx}`;
    card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">Experience #${idx + 1}</span>
        <button class="entry-remove-btn" data-type="experience" data-index="${idx}" title="Remove">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="exp-title-${idx}">Job Title</label>
        <input class="form-input" type="text" id="exp-title-${idx}" placeholder="e.g. Frontend Developer" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="exp-company-${idx}">Company</label>
          <input class="form-input" type="text" id="exp-company-${idx}" placeholder="Company Name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="exp-location-${idx}">Location</label>
          <input class="form-input" type="text" id="exp-location-${idx}" placeholder="City, Country" />
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
        <label class="form-label" for="exp-desc-${idx}">Key Responsibilities</label>
        <textarea class="form-input form-textarea" id="exp-desc-${idx}" rows="3" placeholder="• Led development of..."></textarea>
      </div>`;
    container?.appendChild(card);
    addInputListeners(card);
  }

  if (type === 'education') {
    const idx = state.educationCount;
    state.educationCount++;
    const container = document.getElementById('education-entries');
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.id = `edu-entry-${idx}`;
    card.innerHTML = `
      <div class="entry-card-header">
        <span class="entry-card-title">Education #${idx + 1}</span>
        <button class="entry-remove-btn" data-type="education" data-index="${idx}" title="Remove">✕</button>
      </div>
      <div class="form-group">
        <label class="form-label" for="edu-degree-${idx}">Degree / Qualification</label>
        <input class="form-input" type="text" id="edu-degree-${idx}" placeholder="e.g. B.Sc. Computer Science" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="edu-school-${idx}">School / University</label>
          <input class="form-input" type="text" id="edu-school-${idx}" placeholder="University Name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="edu-year-${idx}">Graduation Year</label>
          <input class="form-input" type="text" id="edu-year-${idx}" placeholder="2024" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="edu-desc-${idx}">Additional Info</label>
        <input class="form-input" type="text" id="edu-desc-${idx}" placeholder="GPA, Honors..." />
      </div>`;
    container?.appendChild(card);
    addInputListeners(card);
  }
}

function removeEntry(type, idx) {
  const card = document.getElementById(`${type === 'experience' ? 'exp' : 'edu'}-entry-${idx}`);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(-10px)';
    card.style.transition = 'all 0.25s ease';
    setTimeout(() => {
      card.remove();
      if (type === 'experience' && state.experienceCount > 1) state.experienceCount--;
      if (type === 'education' && state.educationCount > 1) state.educationCount--;
      updatePreview();
    }, 250);
  }
}

function addInputListeners(container) {
  container.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', debounce(() => {
      updatePreview();
      updateProgress();
    }, 120));
  });
}

// =============================================
//  ZOOM CONTROLS
// =============================================
function initZoomControls() {
  document.getElementById('zoom-in-btn')?.addEventListener('click', () => setZoom(state.zoom + 0.1));
  document.getElementById('zoom-out-btn')?.addEventListener('click', () => setZoom(state.zoom - 0.1));
}

function setZoom(level) {
  state.zoom = Math.min(Math.max(level, 0.4), 1.5);
  const sheet = document.getElementById('resume-sheet');
  const zoomEl = document.getElementById('zoom-level');
  if (sheet) sheet.style.transform = `scale(${state.zoom})`;
  if (zoomEl) zoomEl.textContent = `${Math.round(state.zoom * 100)}%`;
}

// =============================================
//  DOWNLOAD (Print-to-PDF)
// =============================================
function initDownload() {
  document.getElementById('download-btn')?.addEventListener('click', () => {
    // Basic print-to-PDF approach for Day 1
    // (Full implementation will use html2pdf or similar on later days)
    showToast('🖨️ PDF export coming in Day 3!');

    // Temporary: open print dialog focused on resume
    const sheet = document.getElementById('resume-sheet');
    if (!sheet) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${document.getElementById('fullName')?.value || 'My Resume'}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Inter, sans-serif; }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="${window.location.origin}/styles/main.css"/>
      </head>
      <body style="background:#fff">
        ${sheet.outerHTML}
      </body>
      </html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 800);
  });
}

// =============================================
//  HELPERS
// =============================================
function id(selector) { return document.getElementById(selector); }

function setText(elId, text) {
  const el = document.getElementById(elId);
  if (el) el.textContent = text;
}

function getVal(elId) {
  const el = document.getElementById(elId);
  return el ? el.value.trim() : '';
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

function showToast(message, duration = 2800) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}
