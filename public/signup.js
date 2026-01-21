window.SCRIPT_URL = window.SCRIPT_URL || "https://script.google.com/macros/s/AKfycbwQA5MN9UAVT3PfpfqrP6ppdfhXGUZNu0t7iPxqLdJBkqf2mayYoMQThqQf32diwq3V/exec";

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim().toLowerCase();
  const name = document.getElementById('name').value.trim();
  const college = document.getElementById('college').value.trim();
  const department = document.getElementById('department').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const referralId = document.getElementById('referralId')?.value.trim() || '';

  // Validate required fields
  if (!email || !name || !college || !department || !phone) {
    await window.showAlert('Please fill in all required fields');
    return;
  }

  const btn = document.querySelector('button[type=submit]');
  const orig = btn ? btn.textContent : null;
  if (btn) { btn.textContent = 'Creating...'; btn.disabled = true; }

  const payload = new FormData();
  payload.append('action', 'signup');
  payload.append('email', email);
  payload.append('name', name);
  payload.append('college', college);
  payload.append('department', department);
  payload.append('phone', phone);

  try {
    const res = await fetch(SCRIPT_URL, { method: 'POST', body: payload });
    const data = await res.json();
    if (data && data.success && data.user) {
      const user = data.user;
      const profile = {
        name: user.name || name,
        email: (user.email || email).toLowerCase(),
        litid: user.litid || '',
        college: user.college || college,
        department: user.department || department,
        phone: user.phone || phone
      };
      localStorage.setItem('litablaze_profile', JSON.stringify(profile));
      // if server returned registrations mapping include it
      if (data.registrations) localStorage.setItem('litablaze_sheet_regs', JSON.stringify(data.registrations));

      // Handle referral if provided
      if (referralId) {
        try {
          const referralPayload = new FormData();
          referralPayload.append('action', 'submitReferral');
          referralPayload.append('referrerEmail', profile.email);
          referralPayload.append('referrerName', profile.name || '');
          referralPayload.append('referrerLitID', profile.litid || '');
          referralPayload.append('referredLitID', referralId);

          const referralRes = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: referralPayload
          });

          const referralText = await referralRes.text();
          let referralData;
          try {
            referralData = JSON.parse(referralText);
          } catch {
            const match = referralText.match(/\((.*)\)/);
            referralData = match ? JSON.parse(match[1]) : {};
          }

          if (!referralData.success) {
            console.warn('Referral submission failed:', referralData.message || 'Unknown error');
            // Don't block signup if referral fails, just log it
          } else {
            // Mark referral as submitted in localStorage
            localStorage.setItem('litablaze_referral_used', 'true');
          }
        } catch (referralErr) {
          console.error('Referral submission error:', referralErr);
          // Don't block signup if referral fails
        }
      }

      await window.showAlert('Account created. Your LIT ID: ' + profile.litid);
      window.location.href = '/home';
    } else {
      await window.showAlert('Could not create account. Try again later.');
    }
  } catch (err) {
    console.error(err);
    await window.showAlert('Server error');
  } finally {
    if (btn) { btn.disabled = false; if (orig) btn.textContent = orig; }
  }
});

// Prefill email from query parameter if present (editable)
(function prefillEmailFromQuery(){
  try {
    const params = new URLSearchParams(window.location.search || '');
    const e = params.get('email');
    if (e) {
      const el = document.getElementById('email');
      if (el) el.value = decodeURIComponent(e);
    }
  } catch (err) {
    // ignore
  }
})();
