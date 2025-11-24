// =========================
// Small helpers & current year
// =========================
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const mToggle = document.querySelector('.mobile-toggle');
const mNav = document.getElementById('mobile-nav');
mToggle?.addEventListener('click', () => {
  const open = mToggle.getAttribute('aria-expanded') === 'true';
  mToggle.setAttribute('aria-expanded', String(!open));
  if (mNav.hasAttribute('hidden')) mNav.removeAttribute('hidden');
  else mNav.setAttribute('hidden', '');
});

// Smooth scroll links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      if (!mNav.hasAttribute('hidden')) mNav.setAttribute('hidden', '');
      mToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// =========================
// Project modal logic
// =========================
const projects = {
  "infinicalc": {
    title: "InfiniCalc",
    image: "infiniCalc.png",
    desc: "InfiniCalc is a polished, precision-oriented interactive calculator demo. Screenshot only — full demo & code on GitHub."
  },
  "pixel-run": {
    title: "Neon Cube Runner",
    image: "pixel-run.png",
    desc: "A lightweight 3D endless-runner demo that showcases smooth camera and procedural obstacles."
  },
  "skycatch": {
    title: "SkyCatch Rush",
    image: "skycatch-rush.png",
    desc: "Catch falling objects — score-based gameplay with increasing speed and levels."
  },
  "chess": {
    title: "Classic Chess",
    image: "chess.png",
    desc: "Local chess app with multiple AI levels, move history and helpful UI indicators."
  },
  "tilebrain": {
    title: "TileBrain (2048)",
    image: "tilebrain-2048.png",
    desc: "2048 variant with AI modes (expectimax) and smooth animations. Demo & code on GitHub."
  },
  "memory": {
    title: "Memory Flip",
    image: "memory-flip.png",
    desc: "Classic memory matching game with card flip animations and scoring."
  },
  "tic-tac-glow": {
    title: "Tic Tac Glow",
    image: "tic-tac-glow.png",
    desc: "Glow-themed Tic Tac Toe with AI (easy/medium/hard) and neat UI polish."
  }
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-desc');
const modalDemo = document.getElementById('modal-demo');
const modalClose = document.querySelectorAll('.modal-close, #modal-close-btn');

function openProjectModal(key) {
  const p = projects[key];
  if (!p) return;
  modalTitle.textContent = p.title;
  modalImage.src = p.image;
  modalImage.alt = p.title + " screenshot";
  modalDesc.textContent = p.desc;
  // set demo link if the card has a 'Demo / Code' anchor present
  const projectCard = document.querySelector(`.project-card[data-project="${key}"]`);
  if (projectCard) {
    const demoAnchor = projectCard.querySelector('a.btn-sm');
    if (demoAnchor) {
      modalDemo.href = demoAnchor.href || '#';
      modalDemo.target = '_blank';
    } else {
      modalDemo.href = '#';
    }
  }
  modal.setAttribute('aria-hidden', 'false');
  // trap focus (simple)
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// open when a project card (or its inner elements) is clicked or keyboard-activated
document.querySelectorAll('.project-card').forEach(card => {
  const key = card.dataset.project;
  card.addEventListener('click', (e) => {
    // prevent opening modal when clicking direct Demo / Code link
    if (e.target.closest('a')) return;
    openProjectModal(key);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(key);
    }
  });
});

// close modal handlers
modalClose.forEach(btn => btn.addEventListener('click', closeModal));
modal.addEventListener('click', (ev) => {
  if (ev.target === modal) closeModal();
});
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

// =========================
// Accessibility: ensure contact links exist (JS fallback)
// =========================
const linkedinLink = document.getElementById('linkedin-link');
if (linkedinLink) linkedinLink.href = "https://www.linkedin.com/in/arav012g/";
const whatsappLink = document.getElementById('whatsapp-link');
if (whatsappLink) whatsappLink.href = "https://wa.me/919090409003";

// =========================
// Tiny UX: keyboard shortcuts
// =========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'p' || e.key === 'P') document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'});
  if (e.key === 'a' || e.key === 'A') document.querySelector('#about')?.scrollIntoView({behavior:'smooth'});
});
