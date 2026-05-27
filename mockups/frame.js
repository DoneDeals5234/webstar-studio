// WebStar Studio Mockup Preview Frame Handler

document.addEventListener('DOMContentLoaded', () => {
  // Get mockup metadata from document title or custom attribute
  const mockupName = document.body.getAttribute('data-mockup-name') || document.title || 'Client Mockup';
  
  // 1. Create Frame Element
  const frame = document.createElement('div');
  frame.id = 'webstar-demo-frame';
  frame.innerHTML = `
    <div class="demo-frame-logo">WebStar <span>Studio</span><div class="logo-dot"></div></div>
    <div class="demo-frame-title">${mockupName} Demo</div>
    <div class="demo-frame-controls">
      <button class="demo-device-btn active" id="btn-desktop-view">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        Desktop
      </button>
      <button class="demo-device-btn" id="btn-mobile-view">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
        Mobile
      </button>
    </div>
    <a href="../../index.html#portfolio" class="demo-frame-exit">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      Exit Demo
    </a>
  `;

  // 2. Set body properties
  document.body.classList.add('demo-view');

  // 3. Wrap existing content in wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'mockup-content-wrapper';
  
  // Move all child nodes of body into the wrapper
  while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
  }

  // 4. Append frame and wrapper back to body
  document.body.appendChild(frame);
  document.body.appendChild(wrapper);

  // 5. Add Event Listeners for Device Switchers
  const btnDesktop = document.getElementById('btn-desktop-view');
  const btnMobile = document.getElementById('btn-mobile-view');

  if (btnDesktop && btnMobile) {
    btnDesktop.addEventListener('click', () => {
      btnMobile.classList.remove('active');
      btnDesktop.classList.add('active');
      document.body.classList.remove('mobile-mode');
    });

    btnMobile.addEventListener('click', () => {
      btnDesktop.classList.remove('active');
      btnMobile.classList.add('active');
      document.body.classList.add('mobile-mode');
    });
  }
});

// Global Helper to Log Inquiries from mockups back to local storage dashboard
function logMockupInquiry(source, name, email, subject, message) {
  const inquiries = JSON.parse(localStorage.getItem('webstar_inquiries')) || [];
  const timestamp = new Date().toISOString();
  
  // Create WhatsApp message payload (Twilio Format)
  const phone = localStorage.getItem('webstar_phone_target') || '+917508990616';
  const whatsappPayload = {
    account_sid: "AC_TWILIO_ACCOUNT_SID_PLACEHOLDER",
    messaging_service_sid: "MG9f7aea280b3fce01ad84f88e20b171f2",
    from: "whatsapp:+14155238886",
    to: `whatsapp:${phone}`,
    body: `*New Lead from ${source}!*\nName: ${name}\nEmail: ${email}\nRequested: ${subject}\nMsg: "${message}"\nTime: ${timestamp}`,
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
  
  // Display a mockup alert that mimics a WhatsApp webhook response
  alert(`[Demo Automation Notification]\n\nYour inquiry details have been saved!\n\nSimulated WhatsApp Payload sent to owner's phone (${phone}):\n"New Lead from ${source}: ${name} wants ${subject}"\n\nCheck the WebStar Client Admin Dashboard to inspect JSON trace logs!`);
}
