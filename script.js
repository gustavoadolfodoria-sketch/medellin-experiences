'use strict';

const header = document.querySelector('#siteHeader');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#mainNav');

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px' });
  revealItems.forEach((item, index) => {
    item.style.setProperty('--delay', `${(index % 4) * 80}ms`);
    observer.observe(item);
  });
}

document.querySelector('#experienceForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const interests = form.getAll('interest');
  const duration = form.get('duration') || 'a few days';
  const party = form.get('party') || 'my travel party';
  const interestText = interests.length ? interests.join(', ') : 'local recommendations and authentic experiences';
  const message = `Hello Medellín Experiences! I'm visiting Medellín for ${duration}. I'm traveling as ${party} and I'm interested in ${interestText}. Can you help me plan my experience?`;
  window.open(`https://wa.me/573226191968?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();

if (!reducedMotion) {
  window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero__image');
    if (window.scrollY < window.innerHeight) heroImage.style.transform = `scale(1.06) translateY(${window.scrollY * 0.06}px)`;
  }, { passive: true });
}
