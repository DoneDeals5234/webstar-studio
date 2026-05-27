// WebStar Studio | Ultra-Premium Software Agency JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initSplashLoader();
  initScrollProgress();
  initCursorGlow();
  initStickyHeader();
  initStatsCounter();
  initFaqAccordion();
  initHeroParallax();
  initProjectRequestForm();
  initFooterNewsletter();
});

// 1. Fading Splash Loader
function initSplashLoader() {
  const loader = document.getElementById('loader-screen');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 600); // Elegant short delay
    });
    // Fallback if load event already fired
    if (document.readyState === 'complete') {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 600);
    }
  }
}

// 2. Scroll Progress Tracker
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = (window.scrollY / (scrollHeight || 1)) * 100;
      progress.style.width = `${scrollPct}%`;
    });
  }
}

// 3. Ambient Cursor Glow Physics (Lerp Interpolation)
function initCursorGlow() {
  const glow = document.getElementById('custom-cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Easing factor (0.1 = smooth lag delay)
    const easing = 0.1;
    glowX += (mouseX - glowX) * easing;
    glowY += (mouseY - glowY) * easing;

    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }

  animate();
}

// 4. Sticky Header Blur
function initStickyHeader() {
  const header = document.getElementById('navbar');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// 5. Numerical Stat Counters
function initStatsCounter() {
  const stats = document.querySelectorAll('.trust-item h3');
  
  const options = {
    threshold: 0.5,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target'));
        let current = 0;
        const duration = 2000;
        const increment = countTo / (duration / 16);
        
        const updateCount = () => {
          current += increment;
          if (current < countTo) {
            target.textContent = Math.floor(current) + (countTo === 99 ? '%' : '+');
            requestAnimationFrame(updateCount);
          } else {
            target.textContent = countTo + (countTo === 99 ? '%' : '+');
          }
        };
        
        updateCount();
        observer.unobserve(target);
      }
    });
  }, options);

  stats.forEach(stat => observer.observe(stat));
}

// 6. Animated Accordion FAQs
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Collapse all others
        items.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// 7. Mouse Parallax for Hero Mockups
function initHeroParallax() {
  const hero = document.getElementById('home');
  const cards = document.querySelectorAll('.mock-card');

  if (hero && cards.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const moveX = (e.clientX - width / 2) / 50;
      const moveY = (e.clientY - height / 2) / 50;

      cards.forEach((card, index) => {
        // Different speeds for depth
        const speed = (index + 1) * 0.4;
        card.style.transform = `translate3d(${moveX * speed}px, ${moveY * speed}px, 0)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      cards.forEach(card => {
        card.style.transform = 'translate3d(0,0,0)';
      });
    });
  }
}

// Global Logging helper back to local storage
function logInquiry(source, name, email, subject, message) {
  const inquiries = JSON.parse(localStorage.getItem('webstar_inquiries')) || [];
  const timestamp = new Date().toISOString();
  
  const whatsappPayload = {
    account_sid: "AC_TWILIO_ACCOUNT_SID_PLACEHOLDER",
    messaging_service_sid: "MG9f7aea280b3fce01ad84f88e20b171f2",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+917508990616",
    body: `*New WebStar Lead!*\nSource: ${source}\nName: ${name}\nEmail: ${email}\nService: ${subject}\nMessage: ${message}\nSubmitted: ${timestamp}`,
    status: "dispatched",
    api_endpoint: "https://api.twilio.com/2010-04-01/Accounts/AC8a64.../Messages.json"
  };

  const newInquiry = {
    id: Date.now(),
    source,
    name,
    email,
    subject,
    message,
    timestamp,
    whatsappPayload
  };

  inquiries.unshift(newInquiry);
  localStorage.setItem('webstar_inquiries', JSON.stringify(inquiries));
}

// 8. Project Request Form redirecting to WhatsApp
function initProjectRequestForm() {
  const form = document.getElementById('project-request-form');
  const modal = document.getElementById('success-modal');
  const closeBtn = document.getElementById('btn-close-modal');
  
  let formattedUrl = '';

  if (form && modal && closeBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('req-name').value;
      const business = document.getElementById('req-business').value;
      const email = document.getElementById('req-email').value;
      const phone = document.getElementById('req-phone').value;
      const service = document.getElementById('req-service').value;
      const budget = document.getElementById('req-budget').value;
      const desc = document.getElementById('req-desc').value;
      const timeVal = document.getElementById('req-time').value;

      const dateObj = new Date(timeVal);
      const meetingTimeStr = dateObj.toLocaleString();

      // Format WhatsApp Slogan Text
      const textMsg = `Hello WebStar Studio,\nHere are my project details:\nName: ${name}\nBusiness: ${business}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\nProject Details: ${desc}\nMeeting Time: ${meetingTimeStr}`;
      
      formattedUrl = `https://wa.me/917508990616?text=${encodeURIComponent(textMsg)}`;

      // Save Inquiry locally
      logInquiry('Main Project Request Form', name, email, service, `Business: ${business} | Budget: ${budget} | Detail: ${desc}`);

      // Show Popup Modal
      modal.classList.add('active');

      form.reset();
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      if (formattedUrl) {
        window.open(formattedUrl, '_blank');
      }
    });
  }
}

// 9. Footer Newsletter Form
function initFooterNewsletter() {
  const form = document.getElementById('footer-news-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      alert(`[Newsletter Alert]\n\nSuccessfully subscribed "${input.value}" to WebStar Studio technical updates!`);
      input.value = '';
    });
  }
}
