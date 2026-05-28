/* zipKnowd Website — Shared interactions */

(function () {
  // Mobile nav toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .step, .story-block, .value-card, .category-chip').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Add visible class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .feature-card.visible,
    .step.visible,
    .story-block.visible,
    .value-card.visible,
    .category-chip.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Business tier selection (business page only)
  document.querySelectorAll('.tier-card[data-tier]').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.tier-card[data-tier]').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      validateBusinessForm();
    });
  });

  function validateBusinessForm() {
    const name = document.getElementById('businessName')?.value.trim();
    const addr = document.getElementById('businessAddress')?.value.trim();
    const zip = document.getElementById('zip')?.value.trim();
    const hasTier = document.querySelector('.tier-card.selected') !== null;
    const btn = document.getElementById('checkoutBtn');
    if (btn) {
      btn.disabled = !(name && addr && zip?.length === 5 && hasTier);
    }
  }

  ['businessName', 'businessAddress', 'zip'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', validateBusinessForm);
  });

  // Checkout button handler (business page only)
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', async () => {
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = 'Loading…';
      try {
        alert('In production, this redirects to Stripe Checkout. For the pilot, business owners verify inside the Zip Knowd app under Profile > Verify your business.');
      } catch (err) {
        alert('Something went wrong. Please try again.');
      } finally {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Continue to Checkout';
        validateBusinessForm();
      }
    });
  }

  // Contact form handler (contact page only)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        btn.textContent = 'Message sent!';
        btn.style.background = 'linear-gradient(135deg, #1F8A4C, #4CC97A)';
        contactForm.reset();
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2500);
      }, 1200);
    });
  }
})();
