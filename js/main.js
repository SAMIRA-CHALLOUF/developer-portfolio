/*=============== CUSTOM CURSOR ===============*/
const cursorBig = document.querySelector('.cursor__ball--big');
const cursorSmall = document.querySelector('.cursor__ball--small');

if (cursorBig && cursorSmall) {
  document.addEventListener('mousemove', (e) => {
    cursorBig.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorSmall.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Hide on interactive elements
  document.querySelectorAll('a, button, .work__button, .services__header').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorBig.style.transform += ' scale(2)';
      cursorBig.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursorBig.style.opacity = '1';
    });
  });
}

/*=============== NAV TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}
if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

// Close menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/*=============== HEADER SCROLL ===============*/
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/*=============== SWIPER PROJECTS ===============*/
const projectsSwiper = new Swiper('.projects__swiper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 24,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

/*=============== WORK TABS ===============*/
document.querySelectorAll('.work__button').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;

    // Remove active from all buttons & content
    document.querySelectorAll('.work__button').forEach(b => b.classList.remove('work__button--active'));
    document.querySelectorAll('.work__content').forEach(c => c.classList.remove('work__content--active'));

    // Add active to clicked
    button.classList.add('work__button--active');
    document.getElementById(target).classList.add('work__content--active');
  });
});

/*=============== SERVICES ACCORDION ===============*/
/*=============== SERVICES ACCORDION ===============*/
// Open all cards by default
document.querySelectorAll('.services__card').forEach(card => {
   card.classList.add('services__open')
})


/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('copy-email');
const copyMsg = document.getElementById('copy-message');

if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('anid123@email.com').then(() => {
      copyMsg.classList.add('show');
      setTimeout(() => copyMsg.classList.remove('show'), 2500);
    });
  });
}

/*=============== CURRENT YEAR OF THE FOOTER ===============*/
const yearEl = document.getElementById('footer-year');
if (yearEl) {
  yearEl.textContent = `© ${new Date().getFullYear()}`;
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 800,
    delay: 100,
    reset: false,
  });

  sr.reveal('.home__data', { origin: 'left' });
  sr.reveal('.home__img-wrapper', { delay: 200 });
  sr.reveal('.home__info', { origin: 'right', delay: 150 });
  sr.reveal('.home__social', { origin: 'left', delay: 300 });
  sr.reveal('.home__cv', { origin: 'right', delay: 300 });

  sr.reveal('.about__img-wrapper', { origin: 'left' });
  sr.reveal('.about__data', { origin: 'right', delay: 200 });

  sr.reveal('.projects__card', { interval: 150 });

  sr.reveal('.work__card', { interval: 100 });

  sr.reveal('.services__card', { interval: 150 });

  sr.reveal('.contact__data', { origin: 'left' });
  sr.reveal('.contact__email-display', { origin: 'right', delay: 200 });
}
/* =============== THEME TOGGLE (LIGHT / DARK) =============== */
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Fonction pour appliquer le thème
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Détecter la préférence système
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialisation du thème
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }
}

// Toggle au clic
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Suivre les changements du système si aucun thème n'est sauvegardé
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
// Initialiser au chargement
initTheme();