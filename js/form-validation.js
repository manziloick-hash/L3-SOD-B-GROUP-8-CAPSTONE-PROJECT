// ============================================
//  PÂTISSERIE ROYALE — form-validation.js
//  Contact form validation
// ============================================

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    firstName: { el: document.getElementById('firstName'), err: document.getElementById('firstNameError'), rules: [{ test: v => v.trim().length >= 2, msg: 'First name must be at least 2 characters' }] },
    lastName:  { el: document.getElementById('lastName'),  err: document.getElementById('lastNameError'),  rules: [{ test: v => v.trim().length >= 2, msg: 'Last name must be at least 2 characters' }] },
    email:     { el: document.getElementById('email'),     err: document.getElementById('emailError'),     rules: [{ test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address' }] },
    message:   { el: document.getElementById('message'),   err: document.getElementById('messageError'),   rules: [{ test: v => v.trim().length >= 10, msg: 'Message must be at least 10 characters' }] },
  };

  // ─── VALIDATE SINGLE FIELD ───
  function validateField(key) {
    const { el, err, rules } = fields[key];
    if (!el || !err) return true;
    for (const rule of rules) {
      if (!rule.test(el.value)) {
        err.textContent = rule.msg;
        el.style.borderColor = '#dc2626';
        return false;
      }
    }
    err.textContent = '';
    el.style.borderColor = 'var(--yellow-deep)';
    return true;
  }

  // ─── LIVE VALIDATION ───
  Object.keys(fields).forEach(key => {
    const el = fields[key].el;
    if (el) {
      el.addEventListener('blur',  () => validateField(key));
      el.addEventListener('input', () => {
        if (fields[key].err.textContent) validateField(key);
      });
    }
  });

  // ─── SUBMIT ───
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    if (!allValid) return;

    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      btn.style.display = 'none';
      if (success) success.style.display = 'block';
      form.reset();
      Object.keys(fields).forEach(key => {
        if (fields[key].el) fields[key].el.style.borderColor = '';
      });
    }, 1200);
  });
})();
