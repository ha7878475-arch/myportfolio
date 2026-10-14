const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('open');
    }

    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

if (navToggle && navMenu) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const subject = `Portfolio inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${String(formData.get('project-type') || 'Not specified')}`,
      `Budget: ${String(formData.get('budget') || 'Not specified')}`,
      '',
      'Project details:',
      String(formData.get('details') || ''),
    ].join('\n');

    formStatus.textContent = 'Your email app should open with your message ready to send.';
    window.location.href = `mailto:ma6571571@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
