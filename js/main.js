/* =============================================
   PORTES Y MUDANZAS MANUEL — main.js
   Vanilla JS, no dependencies
   ============================================= */

const WA_NUMBER = '34698836211';

/* ---- NAVBAR SCROLL ---- */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- SCROLL REVEAL ---- */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.closest('.services-grid')
          ? [...entry.target.parentElement.children].indexOf(entry.target) * 100
          : 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ---- ANIMATED COUNTER ---- */
(function () {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ---- FAQ ACCORDION ---- */
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ---- TESTIMONIALS CAROUSEL ---- */
(function () {
  const carousel = document.getElementById('testimonios-carousel');
  const dots = document.querySelectorAll('.dot');
  if (!carousel || !dots.length) return;

  let currentIndex = 0;
  const cards = carousel.querySelectorAll('.testimonial-card');

  const scrollToCard = (index) => {
    const card = cards[index];
    if (!card) return;
    carousel.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' });
    dots.forEach(d => d.classList.remove('active'));
    dots[index]?.classList.add('active');
    currentIndex = index;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => scrollToCard(parseInt(dot.dataset.index, 10)));
  });

  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0 && currentIndex < cards.length - 1) scrollToCard(currentIndex + 1);
    if (diff < 0 && currentIndex > 0) scrollToCard(currentIndex - 1);
  });

  const syncDots = () => {
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - carousel.getBoundingClientRect().left);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    if (closest !== currentIndex) {
      dots.forEach(d => d.classList.remove('active'));
      dots[closest]?.classList.add('active');
      currentIndex = closest;
    }
  };

  carousel.addEventListener('scroll', syncDots, { passive: true });
})();

/* ---- QUOTE FORM → WHATSAPP ---- */
(function () {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const dateInput = document.getElementById('fecha');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  const showError = (id, msg) => {
    const el = document.getElementById('error-' + id);
    const input = document.getElementById(id);
    if (el) el.textContent = msg;
    if (input) input.classList.toggle('error', !!msg);
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const tipo = document.getElementById('tipo')?.value.trim() || '';
    const origen = document.getElementById('origen')?.value.trim() || '';
    const destino = document.getElementById('destino')?.value.trim() || '';
    const fecha = document.getElementById('fecha')?.value || '';
    const descripcion = document.getElementById('descripcion')?.value.trim() || '';
    const nombre = document.getElementById('nombre')?.value.trim() || '';

    showError('tipo', '');
    showError('origen', '');

    if (!tipo) { showError('tipo', 'Por favor selecciona el tipo de servicio'); valid = false; }
    if (!origen) { showError('origen', 'Por favor indica la ciudad de origen'); valid = false; }

    if (!valid) {
      const firstError = form.querySelector('.error');
      firstError?.focus();
      return;
    }

    let msg = `Hola Manuel, me gustaría pedir un presupuesto.\n\n`;
    msg += `🔹 Servicio: ${tipo}\n`;
    msg += `📍 Origen: ${origen}\n`;
    if (destino) msg += `📍 Destino: ${destino}\n`;
    if (fecha) {
      const d = new Date(fecha + 'T00:00:00');
      const formatted = d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      msg += `📅 Fecha aproximada: ${formatted}\n`;
    }
    if (descripcion) msg += `📝 Detalles: ${descripcion}\n`;
    if (nombre) msg += `\nMi nombre es ${nombre}.`;
    msg += `\n\nQuedo a la espera, gracias.`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();

/* ---- SMOOTH SCROLL ANCHOR ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
