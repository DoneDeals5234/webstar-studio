// Luxury Perfume JS - L'Arôme Violette

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initCarousel();
  initEnquiryForm();
});

// 1. Sticky Navigation Scroll Effect
function initStickyHeader() {
  const header = document.getElementById('perfume-nav');
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

// 2. Best Sellers Carousel Slider
function initCarousel() {
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  if (items.length <= 1) return;

  function showSlide(index) {
    items[currentIndex].classList.remove('active');
    currentIndex = (index + items.length) % items.length;
    items[currentIndex].classList.add('active');
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  }
}

// 3. Request Tester Sample Form Submit
function initEnquiryForm() {
  const form = document.getElementById('perfume-enquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('p-name').value;
      const email = document.getElementById('p-email').value;
      const fragrance = document.getElementById('p-fragrance').value;
      const address = document.getElementById('p-address').value;

      // Log inquiry data back to dashboard
      logMockupInquiry(
        'Luxury Perfume Mockup', 
        name, 
        email, 
        `Sample Tester Request - ${fragrance}`, 
        `Send sample to: ${address}`
      );

      form.reset();
    });
  }
}
