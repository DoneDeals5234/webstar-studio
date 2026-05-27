// WebStar Studio Dashboard JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  loadInquiries();
  initSeedButton();
  initSettingsForm();
  initCopyPayloadButton();
});

// 1. Sidebar Navigation View Toggle
function initNavigation() {
  const links = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('.view-section');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active states
      links.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active state to clicked
      link.classList.add('active');
      
      const targetId = link.getAttribute('href').replace('#', '');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
}

// 2. Load Inquiries from LocalStorage & Populate Dashboard Metrics
let currentInquiries = [];

function loadInquiries() {
  const inquiriesRaw = localStorage.getItem('webstar_inquiries');
  currentInquiries = inquiriesRaw ? JSON.parse(inquiriesRaw) : [];

  // Update Metrics
  const totalLeads = currentInquiries.length;
  document.getElementById('metric-total-leads').textContent = totalLeads;
  document.getElementById('metric-delivered-hooks').textContent = totalLeads; // Fired webhook for each lead

  // Update Phone Target Display
  const savedPhone = localStorage.getItem('webstar_phone_target') || '+917508990616';
  const displayPhone = document.getElementById('display-target-phone');
  if (displayPhone) displayPhone.textContent = savedPhone;
  const settingsPhoneInput = document.getElementById('settings-phone');
  if (settingsPhoneInput) settingsPhoneInput.value = savedPhone;

  // Render Table
  renderLeadsTable();

  // Render Chart
  renderChartDistribution();

  // Render Webhook Payload page lists
  renderPayloadsPage();
}

function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-body');
  if (!tbody) return;

  if (currentInquiries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; color: #a0aec0; padding: 40px 0;">
          No inquiries captured yet. Feed data using the seed button or submit a form in the mockups!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = '';
  currentInquiries.forEach((item) => {
    const tr = document.createElement('tr');
    
    // Select styling class for the portal tags
    let tagClass = 'tag-main';
    const src = item.source.toLowerCase();
    if (src.includes('boutique')) tagClass = 'tag-boutique';
    else if (src.includes('shoe')) tagClass = 'tag-shoes';
    else if (src.includes('perfume')) tagClass = 'tag-perfume';
    else if (src.includes('corporate')) tagClass = 'tag-corporate';
    else if (src.includes('government') || src.includes('grievance')) tagClass = 'tag-government';

    const dateStr = new Date(item.timestamp).toLocaleString();

    tr.innerHTML = `
      <td><span class="table-tag ${tagClass}">${item.source}</span></td>
      <td style="font-weight:600; color:var(--color-text-main);">${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.email)}</td>
      <td>${escapeHtml(item.subject)}</td>
      <td>${dateStr}</td>
      <td>
        <button class="btn btn-secondary btn-sm btn-view-trace" data-id="${item.id}">
          JSON Trace
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Bind View Trace Actions in Table
  tbody.querySelectorAll('.btn-view-trace').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      switchToPayloadTab(id);
    });
  });
}

function renderChartDistribution() {
  const counts = {
    boutique: 0,
    shoes: 0,
    perfume: 0,
    corporate: 0,
    government: 0
  };

  currentInquiries.forEach(item => {
    const src = item.source.toLowerCase();
    if (src.includes('boutique')) counts.boutique++;
    else if (src.includes('shoe')) counts.shoes++;
    else if (src.includes('perfume')) counts.perfume++;
    else if (src.includes('corporate')) counts.corporate++;
    else if (src.includes('gov') || src.includes('grievance')) counts.government++;
  });

  const total = currentInquiries.length || 1; // Prevent division by zero

  const calcPercentage = (val) => Math.round((val / currentInquiries.length) * 100) || 0;

  const pct = {
    boutique: calcPercentage(counts.boutique),
    shoes: calcPercentage(counts.shoes),
    perfume: calcPercentage(counts.perfume),
    corporate: calcPercentage(counts.corporate),
    government: calcPercentage(counts.government)
  };

  // If no leads, use default placeholder values
  if (currentInquiries.length === 0) {
    pct.boutique = 15;
    pct.shoes = 25;
    pct.perfume = 20;
    pct.corporate = 30;
    pct.government = 10;
  }

  // Update DOM Bars & Values
  updateBar('boutique', pct.boutique);
  updateBar('shoes', pct.shoes);
  updateBar('perfume', pct.perfume);
  updateBar('corporate', pct.corporate);
  updateBar('government', pct.government);
}

function updateBar(key, percentage) {
  const bar = document.getElementById(`chart-${key}`);
  const label = document.getElementById(`val-${key}`);
  if (bar) bar.style.width = `${percentage}%`;
  if (label) label.textContent = `${percentage}%`;
}

// 3. Render Webhook Payload View items
let selectedPayloadId = null;

function renderPayloadsPage() {
  const container = document.getElementById('payload-list-container');
  if (!container) return;

  if (currentInquiries.length === 0) {
    container.innerHTML = `<div class="payload-item-placeholder">No payloads recorded. Submit forms to capture traces.</div>`;
    document.getElementById('code-json-body').textContent = JSON.stringify({ info: "Select an API trace payload on the left to view." }, null, 2);
    return;
  }

  container.innerHTML = '';
  currentInquiries.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `payload-card ${selectedPayloadId === item.id ? 'active' : ''}`;
    if (!selectedPayloadId && index === 0) {
      // Default to first item
      card.classList.add('active');
      showPayloadDetail(item);
    }

    const timeStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    card.innerHTML = `
      <h4>POST /v1/lead-ingestion</h4>
      <p>Source: ${item.source} • ${timeStr}</p>
    `;

    card.addEventListener('click', () => {
      container.querySelectorAll('.payload-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      showPayloadDetail(item);
    });

    container.appendChild(card);
  });
}

function showPayloadDetail(inquiry) {
  selectedPayloadId = inquiry.id;
  const codeBody = document.getElementById('code-json-body');
  if (codeBody) {
    codeBody.textContent = JSON.stringify(inquiry.whatsappPayload, null, 2);
  }
}

function switchToPayloadTab(id) {
  // Find link to tab
  const tabLink = document.querySelector('.sidebar-nav a[href="#logs"]');
  if (tabLink) {
    tabLink.click();
    
    // Find matching payload card and click it
    selectedPayloadId = parseInt(id);
    renderPayloadsPage();
    
    // Scroll element details
    const targetInquiry = currentInquiries.find(item => item.id === selectedPayloadId);
    if (targetInquiry) showPayloadDetail(targetInquiry);
  }
}

// 4. Seeding Demo Mockup Submissions
function initSeedButton() {
  const seedBtn = document.getElementById('btn-seed-data');
  if (seedBtn) {
    seedBtn.addEventListener('click', () => {
      const demoData = [
        {
          id: Date.now() - 50000,
          source: 'Government Grievance Portal',
          name: 'Rajesh Sharma',
          email: 'rajesh.sharma@gov.in',
          subject: 'Pothole Repair Grievance',
          message: 'Sector 5 main road has deep potholes causing traffic hazards. Please resolve.',
          timestamp: new Date(Date.now() - 50000).toISOString()
        },
        {
          id: Date.now() - 120000,
          source: 'Corporate Agency Site',
          name: 'Nisha Mehta Consulting',
          email: 'info@nishamehta.com',
          subject: 'SEO & Marketing Package Integration',
          message: 'Interested in upgrading our website and establishing a monthly SEO setup contract.',
          timestamp: new Date(Date.now() - 120000).toISOString()
        },
        {
          id: Date.now() - 250000,
          source: 'Luxury Perfume Mockup',
          name: 'Elena Rostova',
          email: 'elena@beauty-heritage.com',
          subject: 'Oud Sample Enquire',
          message: 'Would love to receive a tester of the Lavender-Rose Parfum Oud before shop ordering.',
          timestamp: new Date(Date.now() - 250000).toISOString()
        },
        {
          id: Date.now() - 360000,
          source: 'Shoe Store Mockup',
          name: 'Aman Preet',
          email: 'aman.preet@gmail.com',
          subject: 'Sneaker Size Availability',
          message: 'Checking if the lavender air trainers are in stock in size 9.',
          timestamp: new Date(Date.now() - 360000).toISOString()
        },
        {
          id: Date.now() - 500000,
          source: 'Clothing Boutique Mockup',
          name: 'Sophia Patel',
          email: 'sophia.p@vogue.com',
          subject: 'Autumn Collection Appointment',
          message: 'Requesting an exclusive design fitting appointment for next Thursday at 3 PM.',
          timestamp: new Date(Date.now() - 500000).toISOString()
        }
      ];

      // Insert WhatsApp payloads for all seed values
      demoData.forEach(item => {
        item.whatsappPayload = {
          account_sid: "AC_TWILIO_ACCOUNT_SID_PLACEHOLDER",
          messaging_service_sid: "MG9f7aea280b3fce01ad84f88e20b171f2",
          from: "whatsapp:+14155238886",
          to: localStorage.getItem('webstar_phone_target') || "+917508990616",
          body: `*New WebStar Lead!*\nSource: ${item.source}\nName: ${item.name}\nEmail: ${item.email}\nService: ${item.subject}\nMessage: ${item.message}\nSubmitted: ${item.timestamp}`,
          status: "dispatched",
          api_endpoint: "https://api.twilio.com/2010-04-01/Accounts/AC8a64.../Messages.json"
        };
      });

      // Fetch existing and prepend
      const existing = JSON.parse(localStorage.getItem('webstar_inquiries')) || [];
      const combined = [...demoData, ...existing];
      localStorage.setItem('webstar_inquiries', JSON.stringify(combined));

      // Reload
      loadInquiries();
      showToast('Demo Data Seeded', '5 mockup inquiries logged successfully.', 'success');
    });
  }
}

// 5. Settings Form submission
function initSettingsForm() {
  const form = document.getElementById('settings-form');
  const clearBtn = document.getElementById('btn-clear-db');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById('settings-phone').value;
      localStorage.setItem('webstar_phone_target', phoneInput);

      // Re-map recipient on all current inquiries
      const current = JSON.parse(localStorage.getItem('webstar_inquiries')) || [];
      current.forEach(item => {
        if (item.whatsappPayload) {
          item.whatsappPayload.to = `whatsapp:${phoneInput}`;
        }
      });
      localStorage.setItem('webstar_inquiries', JSON.stringify(current));

      loadInquiries();
      showToast('Settings Updated', `Alert phone configured to ${phoneInput}`, 'success');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear the localStorage inquiry database logs?')) {
        localStorage.removeItem('webstar_inquiries');
        loadInquiries();
        showToast('Database Purged', 'Inquiry history cleared.', 'info');
      }
    });
  }
}

// Copy JSON Payload to clipboard
function initCopyPayloadButton() {
  const btn = document.getElementById('btn-copy-payload');
  const codeBody = document.getElementById('code-json-body');

  if (btn && codeBody) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBody.textContent)
        .then(() => {
          showToast('Copied', 'JSON payload copied to clipboard.', 'success');
        })
        .catch(err => {
          showToast('Copy Failed', 'Unable to write to clipboard.', 'info');
        });
    });
  }
}

// Helper: Escape HTML content to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Dashboard Toast Notification system
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <h5>${title}</h5>
    <p>${message}</p>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}
