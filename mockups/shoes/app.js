// Shoe Retailer JS - Step Lavender

const PRODUCTS = [
  { id: 1, name: 'Lavender Air Speed', price: 6500, sizes: [8, 9, 10], color: 'Lavender', desc: 'Breezy lightweight flyknit runners with supportive energy pads.' },
  { id: 2, name: 'Lilac Street Walker', price: 4200, sizes: [7, 8, 9], color: 'Lavender', desc: 'Minimal canvas everyday wear with customized lilac laces.' },
  { id: 3, name: 'Nimbus Cloud Cushions', price: 7800, sizes: [8, 10], color: 'White', desc: 'High-bounce foam platform trainers for soft impact protection.' },
  { id: 4, name: 'Charcoal Peak Hikers', price: 8500, sizes: [9, 10], color: 'Gray', desc: 'Heavy-grip outdoor adventure boots with weather protection layers.' },
  { id: 5, name: 'Minimal Classic Flats', price: 3100, sizes: [7, 8], color: 'White', desc: 'Slip-on low profile loafers styled in classic top-grain leather.' },
  { id: 6, name: 'Urban Lavender Highs', price: 5900, sizes: [7, 9, 10], color: 'Lavender', desc: 'Skateboard heritage high-top style constructed in suede.' }
];

let selectedSize = null;

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(PRODUCTS);
  initFilters();
  initContactForm();
});

// 1. Render Product Cards Dynamically
function renderProducts(productsList) {
  const grid = document.getElementById('shoes-products-grid');
  const countDisplay = document.getElementById('product-count-display');
  if (!grid) return;

  countDisplay.textContent = `Showing ${productsList.length} Products`;

  if (productsList.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #718096; padding: 40px 0;">No shoes match your search selection. Try removing filters!</div>`;
    return;
  }

  grid.innerHTML = '';
  productsList.forEach(shoe => {
    const card = document.createElement('div');
    card.className = 'shoe-card';
    card.innerHTML = `
      <div class="shoe-img-container">
        <!-- Shoe Graphic -->
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 65C30 65 40 45 60 45C75 45 85 55 85 65H15Z" fill="white" stroke="${shoe.color === 'Lavender' ? 'hsl(265, 80%, 65%)' : shoe.color === 'White' ? '#cbd5e0' : '#4a5568'}" stroke-width="4" stroke-linejoin="round"/>
          <line x1="20" y1="65" x2="80" y2="65" stroke="#1a202c" stroke-width="3"/>
          <circle cx="50" cy="55" r="3" fill="#cbd5e0"/>
        </svg>
      </div>
      <div class="shoe-card-info">
        <div>
          <h4>${shoe.name}</h4>
          <p class="shoe-desc">${shoe.desc}</p>
          <p style="font-size:0.75rem; color:#718096; margin-bottom:12px;">Color: ${shoe.color} | Sizes: ${shoe.sizes.join(', ')}</p>
        </div>
        <div class="shoe-card-price-row">
          <span class="shoe-price">₹${shoe.price.toLocaleString()}</span>
          <button class="shoes-btn btn-add-cart" data-name="${shoe.name}">Add to Cart</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Bind Add to Cart Alert clicks
  grid.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      alert(`[Cart Action]\n\n"${name}" has been added to your shopping bag!`);
    });
  });
}

// 2. Search, Filter and Sorting Operations
function initFilters() {
  const searchInput = document.getElementById('shoe-search-input');
  const sortSelect = document.getElementById('sort-shoes-select');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const colorChks = document.querySelectorAll('.color-filter-chk');

  // Unified Filter Trigger function
  function triggerFilter() {
    const query = searchInput.value.toLowerCase().trim();
    
    // Get selected colors
    const activeColors = [];
    colorChks.forEach(chk => {
      if (chk.checked) activeColors.push(chk.value);
    });

    let filtered = PRODUCTS.filter(shoe => {
      // Name Check
      const matchesName = shoe.name.toLowerCase().includes(query);
      
      // Color Check
      const matchesColor = activeColors.length === 0 || activeColors.includes(shoe.color);

      // Size Check
      const matchesSize = !selectedSize || shoe.sizes.includes(selectedSize);

      return matchesName && matchesColor && matchesSize;
    });

    // Sorting
    const sortVal = sortSelect.value;
    if (sortVal === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
  }

  // Bind Inputs
  searchInput.addEventListener('input', triggerFilter);
  sortSelect.addEventListener('change', triggerFilter);
  
  colorChks.forEach(chk => {
    chk.addEventListener('change', triggerFilter);
  });

  // Size Button Actions
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sizeVal = parseInt(btn.getAttribute('data-size'));
      
      if (btn.classList.contains('active')) {
        // Deactivate
        btn.classList.remove('active');
        selectedSize = null;
      } else {
        // Activate
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = sizeVal;
      }

      triggerFilter();
    });
  });
}

// 3. Sidebar Contact Form Handling
function initContactForm() {
  const form = document.getElementById('shoe-sidebar-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('sh-name').value;
      const email = document.getElementById('sh-email').value;
      const msg = document.getElementById('sh-msg').value;

      // Log inquiry back to the WebStar console
      logMockupInquiry('Shoe Store Mockup', name, email, 'Inventory stock request', msg);

      form.reset();
    });
  }
}
