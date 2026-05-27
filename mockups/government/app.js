// Government Portal JS - GIGW Compliant

const TRANSLATIONS = {
  hin: {
    "skip-main": "मुख्य सामग्री पर जाएं",
    "nav-home": "मुख्य पृष्ठ",
    "nav-notices": "सूचनाएं",
    "nav-services": "नागरिक सेवाएं",
    "nav-grievance": "शिकायत डेस्क",
    "nav-emergency": "आपातकालीन संपर्क",
    "hero-title": "डिजिटल पारदर्शिता के साथ नागरिकों का सशक्तिकरण",
    "hero-desc": "नागरिक प्रमाण पत्र प्राप्त करें, सार्वजनिक शिकायतें दर्ज करें, नवीनतम नोटिस खोजें और विकास योजनाओं की ऑनलाइन समीक्षा करें।",
    "hero-cta": "सेवाओं के लिए आवेदन करें",
    "sec-services": "ऑनलाइन नागरिक सेवाएं",
    "srv-birth-title": "जन्म और मृत्यु प्रमाण पत्र",
    "srv-birth-desc": "महत्वपूर्ण अभिलेखों को पंजीकृत या प्रमाणित प्रतियां डाउनलोड करें।",
    "srv-prop-title": "संपत्ति कर निर्धारण",
    "srv-prop-desc": "नगरपालिका करों की गणना करें, रसीदें देखें और ऑनलाइन भुगतान करें।",
    "srv-water-title": "नया पानी कनेक्शन",
    "srv-water-desc": "नगरपालिका पाइपलाइन कनेक्शन के लिए आवेदन करें और बिलों का भुगतान करें।",
    "sec-notices": "नवीनतम सूचनाएं",
    "not-1": "वार्ड 12 सीवर पाइपलाइन निर्माण के लिए निविदा विवरण।",
    "not-2": "जोन 4 के लिए मसौदा ज़ोनिंग योजना नियम - आपत्तियां आमंत्रित।",
    "not-3": "वित्तीय वर्ष 2026-27 के लिए व्यापार लाइसेंसिंग मंजूरी की संशोधित दरें।",
    "sec-emergency": "आपातकालीन नागरिक हेल्पलाइन",
    "helpline-control": "नियंत्रण कक्ष",
    "helpline-ambulance": "नगरपालिका एम्बुलेंस",
    "helpline-disaster": "आपदा प्रबंधन",
    "sec-grievance": "नागरिक शिकायत निवारण डेस्क",
    "grievance-desc": "नगरपालिका विफलताओं (सड़क मरम्मत, स्वच्छता, स्ट्रीटलाइट्स) के संबंध में सार्वजनिक शिकायतें दर्ज करें। शिकायत दर्ज करने पर विवरण दर्ज किया जाएगा और वार्ड अभियंताओं को सूचित किया जाएगा।",
    "grievance-warn": "⚠️ झूठी शिकायत दर्ज करना नगरपालिका संहिता की धारा 182 के तहत दंडनीय है।",
    "lbl-name": "नागरिक का पूरा नाम",
    "lbl-email": "संपर्क ईमेल आईडी",
    "lbl-type": "शिकायत का प्रकार",
    "opt-road": "सड़क रखरखाव / गड्ढे",
    "opt-waste": "कचरा निपटान / स्वच्छता",
    "opt-lights": "स्ट्रीटलाइट मरम्मत",
    "lbl-details": "शिकायत विवरण",
    "btn-submit": "शिकायत दर्ज करें",
    "foot-desc": "यह नगरपालिका विभाग का आधिकारिक सार्वजनिक पोर्टल है, जिसे वार्ड प्रशासन द्वारा प्रबंधित किया जाता है।",
    "foot-sitemap": "साइटमैप",
    "foot-terms": "उपयोग की शर्तें",
    "foot-contact": "हमसे संपर्क करें",
    "foot-ssl": "एसएसएल सुरक्षित कनेक्शन"
  },
  eng: {
    "skip-main": "Skip to Main Content",
    "nav-home": "Home",
    "nav-notices": "Notices",
    "nav-services": "Citizen Services",
    "nav-grievance": "Grievance Desk",
    "nav-emergency": "Emergency Contacts",
    "hero-title": "Empowering Citizens with Digital Transparency",
    "hero-desc": "Access civic certificates, lodge grievances, search latest municipal notices, and review development plans online.",
    "hero-cta": "Apply for Services",
    "sec-services": "Online Citizen Services",
    "srv-birth-title": "Birth & Death Certificates",
    "srv-birth-desc": "Register or download certified copies of vital records.",
    "srv-prop-title": "Property Tax Assessor",
    "srv-prop-desc": "Calculate municipal dues, view receipts, and make online payments.",
    "srv-water-title": "New Water Connection",
    "srv-water-desc": "Apply for municipal pipeline connections and pay bills.",
    "sec-notices": "Latest Notifications",
    "not-1": "Tender details for Ward 12 sewer pipeline construction.",
    "not-2": "Draft zoning plan regulations for Zone 4 - Inviting objections.",
    "not-3": "Revised rates for trade licensing approvals for financial year 2026-27.",
    "sec-emergency": "Emergency Citizens Helplines",
    "helpline-control": "Control Center",
    "helpline-ambulance": "Municipal Ambulance",
    "helpline-disaster": "Disaster Response",
    "sec-grievance": "Citizen Grievance Redressal Desk",
    "grievance-desc": "Lodge public grievances regarding municipal failures (e.g. road repair, waste management, streetlights). Upon submission, a grievance record is logged in the department database, a receipt is generated, and a direct alert is sent to ward engineers.",
    "grievance-warn": "⚠️ Filing false complaints is punishable under section 182 of the municipal code.",
    "lbl-name": "Citizen Full Name",
    "lbl-email": "Contact Email ID",
    "lbl-type": "Type of Grievance",
    "opt-road": "Road Maintenance / Potholes",
    "opt-waste": "Garbage Disposal / Sanitation",
    "opt-lights": "Streetlight Repair",
    "lbl-details": "Complaint details",
    "btn-submit": "Submit Grievance",
    "foot-desc": "This is the official public portal of the municipal department, hosted and managed by ward administration.",
    "foot-sitemap": "Sitemap",
    "foot-terms": "Terms of Service",
    "foot-contact": "Contact Us",
    "foot-ssl": "SSL Padlock Secure connection"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSelector();
  initContrastToggle();
  initGrievanceForm();
  initSearch();
});

// 1. Language Toggle Mechanism (English/Hindi translations)
function initLanguageSelector() {
  const btnEng = document.getElementById('lang-eng');
  const btnHin = document.getElementById('lang-hin');
  const trnElements = document.querySelectorAll('[data-trn]');
  const mainLogo = document.getElementById('gov-logo-main');
  const subLogo = document.getElementById('gov-logo-sub');
  const searchInput = document.getElementById('gov-search');
  const searchBtn = document.getElementById('btn-search-submit');

  function translate(lang) {
    // Toggle active state on buttons
    if (lang === 'hin') {
      btnEng.classList.remove('active');
      btnHin.classList.add('active');
      
      // Logo text
      mainLogo.textContent = "अपैक्स महानगरपालिका";
      subLogo.textContent = "आधिकारिक नागरिक पोर्टल • भारत सरकार";
      searchInput.placeholder = "सूचनाएं, आवेदन खोजें...";
      searchBtn.textContent = "खोजें";
    } else {
      btnHin.classList.remove('active');
      btnEng.classList.add('active');
      
      mainLogo.textContent = "Apex Municipal Department";
      subLogo.textContent = "Official Citizen Portal • Government of India";
      searchInput.placeholder = "Search notices, applications...";
      searchBtn.textContent = "Search";
    }

    // Translation keys mappings
    trnElements.forEach(el => {
      const key = el.getAttribute('data-trn');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.textContent = TRANSLATIONS[lang][key];
      }
    });
  }

  if (btnEng && btnHin) {
    btnEng.addEventListener('click', () => translate('eng'));
    btnHin.addEventListener('click', () => translate('hin'));
  }
}

// 2. High Contrast Theme Switcher (for GIGW compliance accessibility)
function initContrastToggle() {
  const btn = document.getElementById('btn-contrast-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      
      if (document.body.classList.contains('high-contrast')) {
        btn.textContent = "Normal Theme";
        showAccessibilityNotice('High Contrast Activated. Contrast ratio adjusted to 7:1.');
      } else {
        btn.textContent = "Contrast Theme";
      }
    });
  }
}

// Helper notice overlay for accessibility
function showAccessibilityNotice(msg) {
  const bar = document.createElement('div');
  bar.style.position = 'fixed';
  bar.style.bottom = '20px';
  bar.style.left = '50%';
  bar.style.transform = 'translateX(-50%)';
  bar.style.background = '#1a202c';
  bar.style.color = '#ffff00';
  bar.style.padding = '10px 20px';
  bar.style.fontSize = '0.8rem';
  bar.style.fontWeight = 'bold';
  bar.style.zIndex = '99999';
  bar.style.border = '2px solid #ffff00';
  bar.textContent = msg;
  
  document.body.appendChild(bar);
  setTimeout(() => bar.remove(), 2500);
}

// 3. Citizen Grievance Form submission
function initGrievanceForm() {
  const form = document.getElementById('gov-grievance-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('g-name').value;
      const email = document.getElementById('g-email').value;
      const type = document.getElementById('g-type').value;
      const details = document.getElementById('g-details').value;

      // Log complainant telemetry back to global admin console
      logMockupInquiry(
        'Government Grievances Portal',
        name,
        email,
        `Grievance - ${type}`,
        details
      );

      // Email warning notification simulation
      alert(`[Department Mail Service]\n\nCopy of complaint receipt routed to citizen: "${email}"\nComplainant ID: GOV-GRV-${Date.now().toString().slice(-6)}`);

      form.reset();
    });
  }
}

// 4. Portal Search Submission
function initSearch() {
  const searchBtn = document.getElementById('btn-search-submit');
  const searchInput = document.getElementById('gov-search');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const q = searchInput.value.trim();
      if (q) {
        alert(`[Search Action]\n\nSearching government index files for notices matching: "${q}"...`);
        searchInput.value = '';
      }
    });
  }
}
