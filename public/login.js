window.SCRIPT_URL =window.SCRIPT_URL ||"https://script.google.com/macros/s/AKfycbxhHFITHPKnvJOknTeL4XxfQk2xvZIfx3hUehtXrSV-EXZe9TPFVfZ2yp884nmay84n/exec";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  if (!email) {
    await window.showAlert("Please enter your email");
    return;
  }

  const loginForm = document.getElementById('loginForm');
  const loginBtn = loginForm.querySelector('button[type=submit]');
  const origLoginText = loginBtn ? loginBtn.textContent : null;
  if (loginBtn) { loginBtn.textContent = 'Signing in...'; loginBtn.disabled = true; }

  // Try fetch directly; if blocked by CORS, fall back to JSONP.
  async function fetchFromGoogleScript(email) {
    const url = `${SCRIPT_URL}?email=${encodeURIComponent(email)}`;
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      // JSONP fallback
      return new Promise((resolve, reject) => {
        const cbName = `login_cb_${Date.now()}`;
        window[cbName] = (data) => { delete window[cbName]; resolve(data); };
        const s = document.createElement('script');
        s.src = `${url}&callback=${cbName}`;
        s.onerror = () => { delete window[cbName]; reject(new Error('JSONP failed')); };
        document.head.appendChild(s);
      });
    }
  }

  try {
    const raw = await fetchFromGoogleScript(email);

    // Expecting Apps Script to return an object: { user: {...}, registrations: {...} }
    const user = raw && raw.user ? raw.user : null;
    const registrations = raw && raw.registrations ? raw.registrations : {};

    if (!user || !user.email) {
      await window.showAlert('Invalid mail id. Please sign up first.');
      if (loginBtn) { loginBtn.disabled = false; if (origLoginText) loginBtn.textContent = origLoginText; }
      // Redirect to sign up with email prefilled (user can edit)
      try {
  const q = encodeURIComponent(email || "");
  window.location.href = `/signup?email=${q}`;
} catch (e) {
  window.location.href = "/signup";
}

      return;
    }

    // Save profile (include litid and other fields if provided)
    const profile = {
      name: user.name || '',
      email: (user.email || '').toLowerCase(),
      litid: user.litid || '',
      college: user.college || '',
      department: user.department || '',
      phone: user.phone || ''
    };

    localStorage.setItem("litablaze_profile", JSON.stringify(profile));
    localStorage.setItem("litablaze_sheet_regs", JSON.stringify(registrations || {}));
    // Mark that we've loaded authoritative profile this session
    try { sessionStorage.setItem('litablaze_profile_session', '1'); } catch (e) {}

    if (loginBtn) { loginBtn.disabled = false; if (origLoginText) loginBtn.textContent = origLoginText; }
    window.location.href = "/home";
    } catch (err) {
    console.error(err);
    await window.showAlert('Could not verify email. Try again.');
    if (loginBtn) { loginBtn.disabled = false; if (origLoginText) loginBtn.textContent = origLoginText; }
  }
});
