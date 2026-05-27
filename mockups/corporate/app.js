// Corporate Professional JS - Apex Lavender

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
  initBookingForm();
});

// 1. Animated Stats Counter (counts when scrolled into view)
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  
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
        const duration = 1800; // ms
        const increment = countTo / (duration / 16); // ~60fps
        
        const updateCount = () => {
          current += increment;
          if (current < countTo) {
            target.textContent = Math.floor(current) + (countTo === 10 ? '+' : countTo === 250 ? '+' : '+');
            requestAnimationFrame(updateCount);
          } else {
            target.textContent = countTo + '+';
          }
        };
        
        updateCount();
        observer.unobserve(target);
      }
    });
  }, options);

  stats.forEach(stat => observer.observe(stat));
}

// 2. Consultation Booking Form submit
function initBookingForm() {
  const form = document.getElementById('corporate-booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('c-name').value;
      const email = document.getElementById('c-email').value;
      const scope = document.getElementById('c-scope').value;
      const msg = document.getElementById('c-msg').value;

      // Send telemetry back to global dashboard
      logMockupInquiry(
        'Corporate Agency Mockup', 
        name, 
        email, 
        `Consultation Request - ${scope}`, 
        msg
      );

      form.reset();
    });
  }
}
