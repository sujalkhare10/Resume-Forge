/* ==========================================================
   ResumeForge - Authentication & User State Module
   Handles Login, Sign Up, Demo Login, Modals & Dynamic Nav
   ========================================================== */

'use strict';

const AUTH_STORAGE_KEY = 'rf_auth_user';

export const AuthService = {
  // Get current logged-in user
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Failed to parse auth user from localStorage:', e);
      return null;
    }
  },

  // Set user state
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    window.dispatchEvent(new CustomEvent('rf_auth_changed', { detail: { user } }));
    this.updateNavbarAuth();
  },

  // Check login status
  isLoggedIn() {
    return Boolean(this.getCurrentUser());
  },

  // Log in with email and password
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !email.includes('@')) {
          return reject(new Error('Please enter a valid email address.'));
        }
        if (!password || password.length < 6) {
          return reject(new Error('Password must be at least 6 characters.'));
        }

        // Generate friendly display name from email
        const defaultName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        const user = {
          id: 'usr_' + Math.random().toString(36).substr(2, 9),
          name: defaultName,
          email: email.trim().toLowerCase(),
          initials: defaultName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'RF',
          plan: 'Free Member',
          joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        this.setCurrentUser(user);
        resolve(user);
      }, 500);
    });
  },

  // Sign up new user
  signup(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || name.trim().length < 2) {
          return reject(new Error('Please enter your full name.'));
        }
        if (!email || !email.includes('@')) {
          return reject(new Error('Please enter a valid email address.'));
        }
        if (!password || password.length < 6) {
          return reject(new Error('Password must be at least 6 characters.'));
        }

        const user = {
          id: 'usr_' + Math.random().toString(36).substr(2, 9),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          initials: name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'RF',
          plan: 'Free Member',
          joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        this.setCurrentUser(user);
        resolve(user);
      }, 500);
    });
  },

  // 1-Click Quick Demo Login (Mukesh Ambani or Alex Morgan)
  quickDemoLogin(preset = 'mukesh') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const demoUser = preset === 'mukesh' ? {
          id: 'usr_mukesh_ambani',
          name: 'Mukesh Ambani',
          email: 'mukesh.ambani@example.com',
          initials: 'MA',
          plan: 'Pro Plan',
          joinedAt: 'Jan 2024'
        } : {
          id: 'usr_alex_morgan',
          name: 'Alex Morgan',
          email: 'alex.morgan@resumeforge.io',
          initials: 'AM',
          plan: 'Pro Plan',
          joinedAt: 'Feb 2024'
        };

        this.setCurrentUser(demoUser);
        resolve(demoUser);
      }, 400);
    });
  },

  // Social login mock
  socialLogin(provider) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: 'usr_social_' + Math.random().toString(36).substr(2, 7),
          name: provider === 'google' ? 'Alex Google' : 'Alex GitHub',
          email: provider === 'google' ? 'alex.google@gmail.com' : 'alex@github.user',
          initials: 'AG',
          plan: 'Free Member',
          joinedAt: 'Recent'
        };
        this.setCurrentUser(user);
        resolve(user);
      }, 500);
    });
  },

  // Log out current user
  logout() {
    this.setCurrentUser(null);
    showToastNotification('You have been signed out successfully.');
  },

  // Initialize UI & Listeners
  init() {
    this.ensureAuthModalInDOM();
    this.updateNavbarAuth();
    this.bindGlobalTriggers();

    window.addEventListener('storage', (e) => {
      if (e.key === AUTH_STORAGE_KEY) {
        this.updateNavbarAuth();
      }
    });

    window.addEventListener('rf_auth_changed', () => {
      this.updateNavbarAuth();
    });
  },

  // Dynamically ensure modal HTML exists in DOM
  ensureAuthModalInDOM() {
    if (document.getElementById('auth-modal-overlay')) return;

    const modalHTML = `
      <div class="auth-modal-overlay" id="auth-modal-overlay" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="auth-modal-backdrop" id="auth-modal-backdrop"></div>
        <div class="auth-modal-card">
          <button type="button" class="auth-modal-close" id="auth-modal-close-btn" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="auth-modal-header">
            <div class="auth-brand-badge">
              <span class="auth-brand-icon">⚡</span>
              <span class="auth-brand-name">ResumeForge</span>
            </div>
            <h2 class="auth-modal-title" id="auth-modal-title">Welcome back</h2>
            <p class="auth-modal-subtitle" id="auth-modal-subtitle">Sign in to save your resumes and access all features</p>
          </div>

          <!-- Tabs: Sign In / Create Account -->
          <div class="auth-tab-bar" role="tablist">
            <button type="button" class="auth-tab-btn active" id="auth-tab-login" role="tab" aria-selected="true">
              Sign In
            </button>
            <button type="button" class="auth-tab-btn" id="auth-tab-signup" role="tab" aria-selected="false">
              Create Account
            </button>
          </div>

          <!-- Quick 1-Click Demo Login Banner -->
          <div class="auth-demo-banner">
            <div class="auth-demo-content">
              <span class="auth-demo-sparkle">✨</span>
              <div class="auth-demo-text">
                <strong>Fast Testing?</strong> Instant 1-click login as Demo User.
              </div>
            </div>
            <button type="button" class="btn btn-soft btn-sm auth-demo-btn" id="auth-demo-login-btn">
              ⚡ Quick Demo Login
            </button>
          </div>

          <!-- Error Alert Banner -->
          <div class="auth-alert-error" id="auth-error-alert" style="display: none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span id="auth-error-message">Invalid credentials</span>
          </div>

          <!-- LOGIN FORM -->
          <form class="auth-form" id="auth-login-form">
            <div class="auth-field">
              <label for="auth-login-email" class="auth-label">Email Address</label>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon">✉️</span>
                <input type="email" id="auth-login-email" class="auth-input" placeholder="name@example.com" required autocomplete="username" />
              </div>
            </div>

            <div class="auth-field">
              <div class="auth-field-row">
                <label for="auth-login-password" class="auth-label">Password</label>
                <a href="#" class="auth-forgot-link" id="auth-forgot-password-link">Forgot password?</a>
              </div>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon">🔒</span>
                <input type="password" id="auth-login-password" class="auth-input" placeholder="••••••••" required autocomplete="current-password" />
                <button type="button" class="auth-toggle-pwd" data-target="auth-login-password" aria-label="Toggle password visibility">
                  👁️
                </button>
              </div>
            </div>

            <div class="auth-options-row">
              <label class="auth-checkbox-label">
                <input type="checkbox" id="auth-remember-me" checked />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary auth-submit-btn" id="auth-login-submit-btn">
              <span class="auth-btn-text">Sign In</span>
              <span class="auth-btn-spinner" style="display: none;">⏳ Signing in...</span>
            </button>
          </form>

          <!-- SIGNUP FORM -->
          <form class="auth-form" id="auth-signup-form" style="display: none;">
            <div class="auth-field">
              <label for="auth-signup-name" class="auth-label">Full Name</label>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon">👤</span>
                <input type="text" id="auth-signup-name" class="auth-input" placeholder="e.g. Alex Morgan" required autocomplete="name" />
              </div>
            </div>

            <div class="auth-field">
              <label for="auth-signup-email" class="auth-label">Email Address</label>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon">✉️</span>
                <input type="email" id="auth-signup-email" class="auth-input" placeholder="name@example.com" required autocomplete="email" />
              </div>
            </div>

            <div class="auth-field">
              <label for="auth-signup-password" class="auth-label">Password (6+ chars)</label>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon">🔒</span>
                <input type="password" id="auth-signup-password" class="auth-input" placeholder="Create a strong password" required autocomplete="new-password" />
                <button type="button" class="auth-toggle-pwd" data-target="auth-signup-password" aria-label="Toggle password visibility">
                  👁️
                </button>
              </div>
            </div>

            <div class="auth-options-row">
              <label class="auth-checkbox-label">
                <input type="checkbox" id="auth-agree-terms" required checked />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary auth-submit-btn" id="auth-signup-submit-btn">
              <span class="auth-btn-text">Create Free Account</span>
              <span class="auth-btn-spinner" style="display: none;">⏳ Creating account...</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="auth-divider">
            <span>Or continue with</span>
          </div>

          <!-- Social Login Buttons -->
          <div class="auth-social-buttons">
            <button type="button" class="auth-social-btn" id="auth-google-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            <button type="button" class="auth-social-btn" id="auth-github-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div class="auth-modal-footer">
            <span id="auth-switch-prompt">Don't have an account?</span>
            <button type="button" class="auth-switch-link" id="auth-toggle-mode-btn">Create one now</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.bindModalEvents();
  },

  // Bind events for the modal dialog
  bindModalEvents() {
    const overlay = document.getElementById('auth-modal-overlay');
    const backdrop = document.getElementById('auth-modal-backdrop');
    const closeBtn = document.getElementById('auth-modal-close-btn');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabSignup = document.getElementById('auth-tab-signup');
    const toggleModeBtn = document.getElementById('auth-toggle-mode-btn');
    const demoBtn = document.getElementById('auth-demo-login-btn');
    const googleBtn = document.getElementById('auth-google-btn');
    const githubBtn = document.getElementById('auth-github-btn');
    const loginForm = document.getElementById('auth-login-form');
    const signupForm = document.getElementById('auth-signup-form');
    const forgotPwdLink = document.getElementById('auth-forgot-password-link');

    // Close actions
    closeBtn?.addEventListener('click', () => this.closeModal());
    backdrop?.addEventListener('click', () => this.closeModal());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay?.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Tab switching
    tabLogin?.addEventListener('click', () => this.switchTab('login'));
    tabSignup?.addEventListener('click', () => this.switchTab('signup'));
    toggleModeBtn?.addEventListener('click', () => {
      const isLoginActive = tabLogin?.classList.contains('active');
      this.switchTab(isLoginActive ? 'signup' : 'login');
    });

    // Toggle password visibility buttons
    document.querySelectorAll('.auth-toggle-pwd').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.textContent = isPassword ? '🙈' : '👁️';
          btn.setAttribute('title', isPassword ? 'Hide password' : 'Show password');
        }
      });
    });

    // Forgot password alert
    forgotPwdLink?.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('auth-login-email');
      const email = emailInput?.value.trim();
      if (email && email.includes('@')) {
        showToastNotification(`Password reset instructions sent to ${email}`);
      } else {
        showToastNotification('Enter your email address to receive a password reset link.');
        emailInput?.focus();
      }
    });

    // Demo Login
    demoBtn?.addEventListener('click', async () => {
      try {
        this.clearError();
        demoBtn.disabled = true;
        demoBtn.textContent = '⏳ Logging in...';
        const user = await this.quickDemoLogin('mukesh');
        this.closeModal();
        showToastNotification(`Welcome back, ${user.name}! ⚡`);
      } catch (err) {
        this.showError(err.message);
      } finally {
        demoBtn.disabled = false;
        demoBtn.textContent = '⚡ Quick Demo Login';
      }
    });

    // Social buttons
    googleBtn?.addEventListener('click', async () => {
      try {
        this.clearError();
        googleBtn.disabled = true;
        const user = await this.socialLogin('google');
        this.closeModal();
        showToastNotification(`Signed in with Google as ${user.name}`);
      } finally {
        googleBtn.disabled = false;
      }
    });

    githubBtn?.addEventListener('click', async () => {
      try {
        this.clearError();
        githubBtn.disabled = true;
        const user = await this.socialLogin('github');
        this.closeModal();
        showToastNotification(`Signed in with GitHub as ${user.name}`);
      } finally {
        githubBtn.disabled = false;
      }
    });

    // Login Form Submit
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-login-email')?.value.trim();
      const password = document.getElementById('auth-login-password')?.value;
      const submitBtn = document.getElementById('auth-login-submit-btn');

      this.clearError();
      this.setButtonLoading(submitBtn, true);

      try {
        const user = await this.login(email, password);
        this.closeModal();
        showToastNotification(`Welcome back, ${user.name}!`);
      } catch (err) {
        this.showError(err.message || 'Failed to sign in. Please try again.');
      } finally {
        this.setButtonLoading(submitBtn, false);
      }
    });

    // Signup Form Submit
    signupForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('auth-signup-name')?.value.trim();
      const email = document.getElementById('auth-signup-email')?.value.trim();
      const password = document.getElementById('auth-signup-password')?.value;
      const submitBtn = document.getElementById('auth-signup-submit-btn');

      this.clearError();
      this.setButtonLoading(submitBtn, true);

      try {
        const user = await this.signup(name, email, password);
        this.closeModal();
        showToastNotification(`Account created successfully! Welcome, ${user.name}! 🎉`);
      } catch (err) {
        this.showError(err.message || 'Failed to create account. Please try again.');
      } finally {
        this.setButtonLoading(submitBtn, false);
      }
    });
  },

  // Switch between login and signup view
  switchTab(mode = 'login') {
    const tabLogin = document.getElementById('auth-tab-login');
    const tabSignup = document.getElementById('auth-tab-signup');
    const loginForm = document.getElementById('auth-login-form');
    const signupForm = document.getElementById('auth-signup-form');
    const modalTitle = document.getElementById('auth-modal-title');
    const modalSubtitle = document.getElementById('auth-modal-subtitle');
    const switchPrompt = document.getElementById('auth-switch-prompt');
    const switchBtn = document.getElementById('auth-toggle-mode-btn');

    this.clearError();

    if (mode === 'login') {
      tabLogin?.classList.add('active');
      tabSignup?.classList.remove('active');
      tabLogin?.setAttribute('aria-selected', 'true');
      tabSignup?.setAttribute('aria-selected', 'false');
      if (loginForm) loginForm.style.display = 'block';
      if (signupForm) signupForm.style.display = 'none';
      if (modalTitle) modalTitle.textContent = 'Welcome back';
      if (modalSubtitle) modalSubtitle.textContent = 'Sign in to save your resumes and access all features';
      if (switchPrompt) switchPrompt.textContent = "Don't have an account?";
      if (switchBtn) switchBtn.textContent = 'Create one now';
      document.getElementById('auth-login-email')?.focus();
    } else {
      tabSignup?.classList.add('active');
      tabLogin?.classList.remove('active');
      tabSignup?.setAttribute('aria-selected', 'true');
      tabLogin?.setAttribute('aria-selected', 'false');
      if (loginForm) loginForm.style.display = 'none';
      if (signupForm) signupForm.style.display = 'block';
      if (modalTitle) modalTitle.textContent = 'Create your account';
      if (modalSubtitle) modalSubtitle.textContent = 'Start crafting your job-winning resumes in minutes';
      if (switchPrompt) switchPrompt.textContent = 'Already have an account?';
      if (switchBtn) switchBtn.textContent = 'Sign in';
      document.getElementById('auth-signup-name')?.focus();
    }
  },

  // Open modal
  openModal(tab = 'login') {
    this.ensureAuthModalInDOM();
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('auth-modal-open');
    this.switchTab(tab);
  },

  // Close modal
  closeModal() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('auth-modal-open');
    this.clearError();
  },

  // Show inline error message
  showError(message) {
    const alert = document.getElementById('auth-error-alert');
    const msg = document.getElementById('auth-error-message');
    if (alert && msg) {
      msg.textContent = message;
      alert.style.display = 'flex';
    }
  },

  // Clear inline error
  clearError() {
    const alert = document.getElementById('auth-error-alert');
    if (alert) alert.style.display = 'none';
  },

  // Toggle button loading state
  setButtonLoading(btn, isLoading) {
    if (!btn) return;
    btn.disabled = isLoading;
    const textSpan = btn.querySelector('.auth-btn-text');
    const spinnerSpan = btn.querySelector('.auth-btn-spinner');
    if (textSpan) textSpan.style.display = isLoading ? 'none' : 'inline-block';
    if (spinnerSpan) spinnerSpan.style.display = isLoading ? 'inline-block' : 'none';
  },

  // Bind clicks on any button with data-auth or login id
  bindGlobalTriggers() {
    document.addEventListener('click', (e) => {
      const loginTrigger = e.target.closest('#nav-login-btn, [data-auth="login"], .auth-trigger-login');
      if (loginTrigger) {
        e.preventDefault();
        this.openModal('login');
        return;
      }

      const signupTrigger = e.target.closest('[data-auth="signup"], .auth-trigger-signup');
      if (signupTrigger) {
        e.preventDefault();
        this.openModal('signup');
        return;
      }

      // Close profile dropdown when clicking outside
      const dropdown = document.getElementById('auth-user-dropdown');
      const profileBtn = document.getElementById('auth-profile-btn');
      if (dropdown && dropdown.classList.contains('active')) {
        if (!dropdown.contains(e.target) && !profileBtn?.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      }
    });
  },

  // Dynamically update nav actions container based on login state
  updateNavbarAuth() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    const user = this.getCurrentUser();
    const isBuilderPage = window.location.pathname.includes('builder.html') || window.location.href.includes('builder.html');

    // Retain theme toggle button
    const themeBtn = navActions.querySelector('#theme-toggle');
    const themeHTML = themeBtn ? themeBtn.outerHTML : `
      <button type="button" class="btn btn-soft btn-sm theme-toggle-btn" id="theme-toggle" title="Toggle Theme" aria-label="Toggle Theme">
        <span class="theme-icon">🌙</span>
      </button>
    `;

    if (user) {
      // User is logged in: show sleek user avatar and dropdown
      navActions.innerHTML = `
        ${themeHTML}
        ${isBuilderPage ? `
          <button type="button" class="btn btn-primary btn-sm" id="builder-export-btn">
            Export PDF
          </button>
        ` : `
          <a href="builder.html" class="btn btn-primary btn-sm">Resume Builder</a>
        `}
        <div class="auth-user-menu-wrap" id="auth-user-menu-wrap">
          <button type="button" class="auth-profile-pill" id="auth-profile-btn" aria-expanded="false" aria-label="Open User Menu">
            <span class="auth-avatar-circle">${escapeHtml(user.initials || 'RF')}</span>
            <span class="auth-user-display-name">${escapeHtml(user.name.split(' ')[0])}</span>
            <span class="auth-chevron">▾</span>
          </button>

          <!-- Dropdown Menu -->
          <div class="auth-user-dropdown" id="auth-user-dropdown">
            <div class="auth-dropdown-header">
              <div class="auth-dropdown-avatar">${escapeHtml(user.initials || 'RF')}</div>
              <div class="auth-dropdown-meta">
                <div class="auth-dropdown-name">${escapeHtml(user.name)}</div>
                <div class="auth-dropdown-email">${escapeHtml(user.email)}</div>
                <span class="auth-plan-badge">${escapeHtml(user.plan || 'Free Member')}</span>
              </div>
            </div>

            <div class="auth-dropdown-divider"></div>

            <ul class="auth-dropdown-links">
              <li>
                <a href="${isBuilderPage ? '#builder' : 'builder.html'}" class="auth-dropdown-item">
                  <span class="auth-item-icon">⚡</span>
                  <span>Interactive Builder</span>
                </a>
              </li>
              <li>
                <button type="button" class="auth-dropdown-item" id="auth-my-resumes-btn">
                  <span class="auth-item-icon">📁</span>
                  <span>My Saved Resumes</span>
                </button>
              </li>
              ${isBuilderPage ? `
              <li>
                <button type="button" class="auth-dropdown-item" id="auth-save-cloud-btn">
                  <span class="auth-item-icon">☁️</span>
                  <span>Save Resume to Cloud</span>
                </button>
              </li>
              ` : ''}
            </ul>

            <div class="auth-dropdown-divider"></div>

            <button type="button" class="auth-dropdown-logout-btn" id="auth-logout-btn">
              <span class="auth-item-icon">🚪</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      `;

      // Re-bind theme toggle
      rebindThemeToggle();

      // Bind dropdown toggle
      const profileBtn = document.getElementById('auth-profile-btn');
      const dropdown = document.getElementById('auth-user-dropdown');
      profileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown?.classList.toggle('active');
        profileBtn.setAttribute('aria-expanded', String(isOpen));
      });

      // Bind logout
      document.getElementById('auth-logout-btn')?.addEventListener('click', () => {
        this.logout();
      });

      // My Resumes button
      document.getElementById('auth-my-resumes-btn')?.addEventListener('click', () => {
        showToastNotification(`All resumes saved to local storage for ${user.name}`);
        dropdown?.classList.remove('active');
      });

      // Save to Cloud button
      document.getElementById('auth-save-cloud-btn')?.addEventListener('click', () => {
        showToastNotification(`Resume synced to ${user.name}'s account! ☁️`);
        dropdown?.classList.remove('active');
      });

    } else {
      // User is logged out: show "Log in" and "Get Started"
      if (isBuilderPage) {
        navActions.innerHTML = `
          ${themeHTML}
          <button type="button" class="btn btn-soft btn-sm" id="nav-login-btn">Log in</button>
          <button type="button" class="btn btn-primary btn-sm" id="builder-export-btn">
            Export PDF
          </button>
        `;
      } else {
        navActions.innerHTML = `
          ${themeHTML}
          <button type="button" class="btn btn-soft btn-sm" id="nav-login-btn">Log in</button>
          <a href="builder.html" class="btn btn-primary btn-sm">Get Started</a>
        `;
      }

      // Re-bind theme toggle
      rebindThemeToggle();

      // Bind login button
      document.getElementById('nav-login-btn')?.addEventListener('click', () => {
        this.openModal('login');
      });
    }
  }
};

// Helper to escape HTML characters
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Re-bind theme toggle listener after updating nav HTML
function rebindThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = toggleBtn.querySelector('.theme-icon');
  if (icon) icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  toggleBtn.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('rf-theme', nextTheme);
    if (icon) icon.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  };
}

// Helper to show modern toast notification
function showToastNotification(message, duration = 2800) {
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

export default AuthService;
