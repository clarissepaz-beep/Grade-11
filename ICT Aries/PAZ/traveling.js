const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      return;
    }

    event.preventDefault();
    lightboxImage.src = item.dataset.image;
    lightboxTitle.textContent = item.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

[lightboxClose, lightbox].forEach((element) => {
  element.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  });
});

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const messageBox = document.getElementById('formMessage');

  if (!name || !email || !message) {
    messageBox.textContent = 'Please complete all fields before submitting.';
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail) {
    messageBox.textContent = 'Please enter a valid email address.';
    return;
  }

  messageBox.textContent = `Thanks, ${name}! Your travel request has been received.`;
  event.target.reset();
});