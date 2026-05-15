'use strict';

/* ============================================================
   contact.js — Form validation + FormSubmit email support
   Real email: arifsohag2500@gmail.com (via formsubmit.co)
   ============================================================ */

(function () {

  const FIELDS = ['name', 'phone', 'email', 'message'];

  const validators = {
    name:    v => !v.trim() ? 'Full name is required.' : v.trim().length < 3 ? 'Minimum 3 characters.' : '',
    phone:   v => !v.trim() ? 'Phone is required.' : !/^[\d\s+()-]{7,20}$/.test(v.trim()) ? 'Enter a valid phone number.' : '',
    email:   v => !v.trim() ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Enter a valid email.' : '',
    message: v => !v.trim() ? 'Message is required.' : v.trim().length < 20 ? 'Message must be at least 20 characters.' : ''
  };

  function validateField(name) {
    const input = document.getElementById('cf-' + name);
    const errEl = document.getElementById('err-' + name);
    const row   = input ? input.closest('.form-row') : null;
    if (!input || !errEl || !row) return true;

    const error = validators[name] ? validators[name](input.value) : '';
    row.classList.toggle('has-error', !!error);
    errEl.textContent = error;
    return !error;
  }

  function validateAll() {
    return FIELDS.map(f => validateField(f)).every(Boolean);
  }

  function showToast(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast' + (type === 'error' ? ' error' : '');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  function handleSubmit(e) {
    if (!validateAll()) {
      e.preventDefault();
      showToast('Please fix the errors above.', 'error');
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Allow FormSubmit POST to proceed naturally after short delay
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }, 2000);
    }

    // FormSubmit will handle the actual POST and redirect/send email
    // No e.preventDefault() here — let the form submit naturally
  }

  function init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    FIELDS.forEach(name => {
      const input = document.getElementById('cf-' + name);
      if (!input) return;
      input.addEventListener('blur', () => validateField(name));
      input.addEventListener('input', () => {
        const row = input.closest('.form-row');
        if (row && row.classList.contains('has-error')) validateField(name);
      });
    });

    form.addEventListener('submit', handleSubmit);
  }

  document.addEventListener('DOMContentLoaded', init);

  window.TMContact = { validateField, validateAll, showToast };

})();
