// Clothing Boutique JS - Vogue Lavender

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initBookingForm();
  initNewsletterForm();
});

// 1. Auto-cycling Hero Banner Slider
function initHeroSlider() {
  const slides = document.querySelectorAll('.boutique-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  let currentSlide = 0;
  let slideInterval = null;

  if (slides.length <= 1) return;

  function showSlide(index) {
    // Remove active
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Set current
    currentSlide = (index + slides.length) % slides.length;
    
    // Add active
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startInterval() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  // Click dots directly
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      showSlide(idx);
      startInterval();
    });
  });

  startInterval();
}

// 2. Booking Form submit routing
function initBookingForm() {
  const form = document.getElementById('boutique-booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('b-name').value;
      const email = document.getElementById('b-email').value;
      const style = document.getElementById('b-style').value;
      const msg = document.getElementById('b-msg').value;

      // Dispatches to localStorage trace logs
      logMockupInquiry('Clothing Boutique Mockup', name, email, `Appointment - ${style}`, msg);

      form.reset();
    });
  }
}

// 3. Newsletter Form submit routing
function initNewsletterForm() {
  const form = document.getElementById('boutique-news-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input').value;
      
      alert(`[Newsletter Subscribed]\n\nThank you! "${email}" has been added to Vogue Lavender's list.\n(Simulated action - no real email was sent)`);
      form.reset();
    });
  }
}
