const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxhHFITHPKnvJOknTeL4XxfQk2xvZIfx3hUehtXrSV-EXZe9TPFVfZ2yp884nmay84n/exec";

let currentLevel = 0
window.registeredEvents = new Set();

const eventData = {
    // FLAGGED EVENTS
    'jam': {
        name: 'JAM',
        category: 'Flagged',
        explanation: 'JAM (Just a Minute) is a basic oratory event, in which participants are given a topic on the spot, and have to talk based off of it for a minute. Both Tamil and English or a mix of both languages are accepted.',
        rules: 'The participant will be given a topic with 1 minute to prepare. They are not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
        Date: 'January 23rd (Day 1)',
        Timing: '[R1] 1:00 pm- 2:30 pm \n[R2] 3:00 pm - 4:30 pm',
        'No. of participants':'Solo event',
        Venue:'UTC',

    },
    'block-and-tackle': {
        name: 'Block and Tackle',
        category: 'Flagged',
        explanation: 'Block and Tackle is a SOLO spoken event, which features a judge who provides the participant with a topic. When the judge says \‘Block\’, the participant must DEFEND the topic, and when the judge says \‘Tackle\’, the participant must speak AGAINST the topic.',
        rules: ' The participant will be given a topic with 1 minute to prepare. They are not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
        Date: 'January 24th (Day 2)',
        Timing: '[R1] 10:30 am - 12:00 pm \n[R2] 1:00 pm - 2:30 pm',
        'No. of participants':'Solo event',
        Venue:'UTC',
    },
    'aiyoo-kekadha': {
        name: 'Aiyoo Kekadha',
        category: 'Flagged',
        explanation: 'Aiyoo Kekadha is a SOLO spoken event, which features a judge who provides the participant with a topic or a scenario. The participant gets to go on a full fledged dramatic rant on said topic, for about 2-3 minutes.',
        Rules: 'The participant will be given a topic with 1 minute to prepare. They are not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
        Date: 'January 24th (Day 2)',
        Timing: '[R1] 10:30 am - 12:00 pm \n[R2] 1:00 pm - 2:30 pm',
        'No. of participants': 'Solo event',
        Venue: 'UTC',

    },
    'channel-surfing': {
        name: 'Channel Surfing',
        category: 'Flagged',
        explanation: 'Channel Surfing is a GROUP performance event where participants enact a continuous skit. A host randomly announces different “channels” (such as News, Movie, Reality Show, Advertisement, Sports, Cartoon, etc.). Every time the channel changes, the team must instantly switch their performance style to match the new channel, while continuing the same situation or characters.',
        Rules : 'Minimum team size- 3 members. All participants of the team should contribute to the channel. Use of vulgarity in any form is strictly prohibited, and will lead to negative marking.',
        Date: 'January 23rd (Day 1)',
        Timing: '[R1] 1:00 pm- 2:30 pm \n[R2] 3:00 pm - 4:30 pm',
        'No. of participants': 'Teams of 3-7',
        Venue: 'New Auditorium',
    },

    // UNFLAGGED EVENTS
    'tamil-movie-auction': {
        name: 'Tamil Movie Auction',
        category: 'Unflagged',
        explanation: 'Tamil movie actors are auctioned off, with completely custom rules. Teams are formed and they are the “Producers” and they start with a fixed amount of money to make the next Blockbuster. The auctioneer presents different actors and the Producers have to invest carefully. Once they get their casting, the theme/genre of the films will be revealed and they have around 30 mins to come up with a storyline and plot and title for the movie. They will be graded based on how well they’ve used each actor. And the Blockbuster is declared in the end.',
        Rules: 'Teams of 2-4 are allowed. Use of vulgarity is prohibited and will lead to negative marking. The storyline should not be of an already existing movie. Will be conducted in two batches.',
        Date: 'January 24th (Day 2)',
        Timing: '[B1] 10:30 am - 12:00 pm \n[B2] 1:00 pm - 2:30 pm',
        'No. of participants': 'Teams of 2-4',
        Venue: 'New Auditorium',
    },
    'quiz': {
        name: 'Quiz',
        category: 'Unflagged',
        explanation : 'A fun-filled quiz competition for participants that blends knowledge with entertainment. ',
        Rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Malpractice of any form, will lead to immediate disqualification.',
        Date: 'January 24th (Day 2)',
        Timing: '[R1] 10:30 am - 12:00 pm \n[R2] 1:00 pm - 2:30 pm',
        'No. of participants': 'Teams of max. 3',
        Venue: 'UTC',
    },
    'spell-bee': {
        name: 'Spell Bee',
        category: 'Unflagged',
        explanation: 'Solo event where words will be given to the participants at random, and they’ve to spell it right entirely. The person who gets the most correct words wins.',
        Rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Malpractice of any form, will lead to immediate disqualification.',
        Date: 'January 23rd (Day 1)',
        Timing: '1:00 pm - 4:00 pm',
        'No. of participants': 'Solo event',
        Venue: 'UTC',
    },
    'genre-swap': {
        name: 'Genre Swap',
        category: 'Unflagged',
        explanation: 'Solo written event, where participants rewrite a given story or prompt by introducing an unexpected yet convincing twist. The twist must reshape the narrative while retaining the original essence of the story.',
        Rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
        Date: 'January 23rd (Day 1)',
        Timing: '1:00 pm - 4:00 pm',
        'No. of participants': 'Solo event',
        Venue: 'UTC',
    },
    'chaotic-canvas': {
        name: 'Chaotic Canvas',
        category: 'Unflagged',
        explanation: 'A collaborative art event where participants contribute to a shared canvas, creating a chaotic yet cohesive masterpiece.',
        Rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Malpractice of any form, will lead to immediate disqualification.',
        Date: 'January 23rd (Day 1)',
        Timing: '1:00 pm - 4:00 pm',
        'No. of participants': '',
        Venue: 'UTC',
    },

    // CARNIVAL EVENTS
    'board-games': {
        name: 'Board Games',
        category: 'Carnival',
        explanation: 'Drop in anytime and play crowd favourites like Carrom, Song Association, UNO, and Lemon on the Spoon. No rules stress, no winners, just chill games and good company.',
        Date : 'January 23rd and January 24th(both days)',
        Timing : '10:30am to 4pm',
        Venue : 'ACT Quadrangle',
    },
    'traditional-board-games': {
        name: 'Traditional Board Games',
        category: 'Carnival',
        explanation: 'Rediscover classic games like Pallanguzhi, Dhayakattai, Aadu Puli Aatam, Chakram Uruttu, and Paramapadham. Simple, nostalgic, and fun for everyone.',
        Date : 'January 23rd and January 24th(both days)',
        Timing : '10:30am to 4pm',
        Venue : 'ACT Quadrangle',
    },
    'face-painting': {
        name: 'Face Painting',
        category: 'Carnival',
        explanation: 'Bringing colors to life with fun, creativity, and a splash of imagination. Choose vibrant designs and transform your look in this lively carnival experience.',
        Date : 'January 23rd and January 24th(both days)',
        Timing : '10:30am to 4pm',
        Venue : 'ACT Quadrangle',
    },
    'stalls': {
        name: 'Stalls',
        category: 'Carnival',
        explanation: 'A lively collection of colourful stalls featuring activities, food, games, and exciting sales. Explore, snack, shop, and enjoy the carnival vibe all in one place.',
        Date : 'January 23rd and January 24th(both days)',
        Timing : '10:30am to 4pm',
        Venue : 'ACT Quadrangle',
    },
    'book-exchange':{
      name: 'Book Exchange',
      category: 'Carnival',
      explanation: 'A fun and engaging book exchange event where stories are shared, swapped, and rediscovered. Bring a book, take a book, and leave with a new story.',
      Date : 'January 23rd and January 24th(both days)',
      Timing : '10:30am to 4pm',
      Venue : 'ACT Quadrangle',
    },
};

function goToLevel(level) {
  currentLevel = level;
  document.getElementById("container").style.transform =
    `translateY(-${level * 100}vh)`;
}
const modal = document.getElementById('registrationModal');
const closeBtn = document.querySelector('.close-btn');
const eventCards = document.querySelectorAll('.event-card');
const backBtn = document.querySelector('.back-btn');
const registrationForm = document.getElementById('registrationForm');

// Helper: safely set textContent only if element exists (prevents null errors)
function setTextIfExists(id, value) {
  try {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  } catch (e) {
    // ignore
  }
}

// Open modal when clicking on event card
// Helper: find eventData key by card title (tolerant match)
function findEventKeyByTitle(title) {
  const norm = s => String(s || '').replace(/\(.*\)/, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const t = norm(title);
  for (const k of Object.keys(eventData)) {
    const name = eventData[k] && eventData[k].name ? eventData[k].name : '';
    if (name === title) return k;
    if (norm(name) === t) return k;
    if (norm(k) === t) return k;
  }
  return null;
}

// Attach handlers to cards/buttons after DOM is ready (done in DOMContentLoaded)

// Close modal when clicking X button
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Back to Homepage button
if (backBtn) {
    backBtn.addEventListener('click', () => {
        closeModal();
        // Scroll to home section
        document.getElementById('home').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Close modal function
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// ============= FORM SUBMISSION =============
const registrationSuccess = document.getElementById("registrationSuccess");
// If the registration form is present as a FORM element we keep the submit
// handler for backward compatibility. If it's been removed (placeholder
// div used), skip attaching the handler to avoid runtime errors.
if (registrationForm && registrationForm.tagName === 'FORM') {
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = document.getElementById("registrationForm");
    const submitBtn = form.querySelector("button[type=submit]");
    const origSubmitText = submitBtn ? submitBtn.textContent : null;
    if (submitBtn) {
      submitBtn.textContent = "Submitting...";
      submitBtn.disabled = true;
    }
    const payload = new FormData();
    payload.append("event", document.getElementById("selectedEvent").value);
    payload.append("name", document.getElementById("name").value.trim());
    payload.append("college", document.getElementById("college").value.trim());
    payload.append("department", document.getElementById("department").value.trim());
    payload.append("email", document.getElementById("email").value.trim());
    payload.append("phone", document.getElementById("phone").value.trim());

    try {
      payload.append('action', 'register');
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxhHFITHPKnvJOknTeL4XxfQk2xvZIfx3hUehtXrSV-EXZe9TPFVfZ2yp884nmay84n/exec",
        {
          method: "POST",
          body: payload
        }
      );

      const result = await response.json();

      if (result.success) {
        setTextIfExists("litidValue", result.litid);
        if (registrationForm) registrationForm.style.display = "none";
        if (registrationSuccess) registrationSuccess.style.display = "block";

        const email = document.getElementById("email").value;

        // 🔁 RE-FETCH FROM GOOGLE SHEETS
        try {
          const data = await fetchFromGoogleScript(email);
          const regs = extractRegistrationsByEmail(data, email);
          const normalized = Object.keys(regs).length ? regs : normalizeRegistrations(data);
          localStorage.setItem("litablaze_sheet_regs", JSON.stringify(normalized));
          updateEventButtons();
        } catch (err) {
          console.error("Refresh failed", err);
        }
      } else {
        await window.showAlert("Registration failed");
      }

    } catch (err) {
      console.error(err);
      await window.showAlert("Server error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (origSubmitText) submitBtn.textContent = origSubmitText;
      }
    }
  });
}



function toggleCategory(id, headerEl) {
      const list = document.getElementById(id);
      if (!list) return;

      const isOpen = list.classList.contains("active");

      // Close all lists
      document.querySelectorAll(".event-list").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".event-category").forEach(h => h.classList.remove("open"));

  // Toggle only clicked one
  if (!isOpen) {
    list.classList.add("active");
    headerEl.classList.add("open");
  }
}

  // Optional: keyboard support so header toggles when pressing Enter/Space
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('event-category')) {
      e.preventDefault();
      const id = document.activeElement.getAttribute('aria-controls') || document.activeElement.dataset.target;
      toggleCategory(id, document.activeElement);
    }
  });

  // Make event-category focusable for keyboard users
  document.querySelectorAll('.event-category').forEach(h => {
    h.tabIndex = 0;
  });
 function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
  document.body.classList.toggle("menu-open");
}


document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.querySelector(".nav-links");
    const burger = document.querySelector(".hamburger");

    menu.classList.remove("active");
    burger.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

 /* ================= MODAL LOGIC ================= */
function openRegister(eventKey) {
  const data = eventData[eventKey];
  if (!data) return;

  const modal = document.getElementById("registrationModal");
  modal.classList.remove("upside"); // RED MODE

  fillModal(data);
}

function openUpsideRegister(eventKey) {
  const data = eventData[eventKey];
  if (!data) return;

  const modal = document.getElementById("registrationModal");
  modal.classList.add("upside"); // BLUE MODE

  fillModal(data);
}
function setSectionVisibility(textId, value) {
  const el = document.getElementById(textId);
  if (!el) return;

  const section = el.closest(".detail-section");
  if (!section) return;

  if (value && String(value).trim() !== "") {
    el.textContent = value;
    section.style.display = "block";
  } else {
    el.textContent = "";
    section.style.display = "none";
  }
}

function fillModal(data) {
  // Event name
  setTextIfExists("eventName", data.name);

  const selEl = document.getElementById("selectedEvent");
  if (selEl) selEl.value = data.name;

  // DETAILS — show only if present
  setSectionVisibility("eventExplanation", data.explanation);
  setSectionVisibility("eventRules", data.rules || data.Rules);
  setSectionVisibility("eventCriteria", data.criteria || "");
  setSectionVisibility("eventDate", data.Date || "");
  setSectionVisibility("eventTiming", data.Timing || "");
  setSectionVisibility("eventVenue", data.Venue || "");
  setSectionVisibility(
    "eventTeamSize",
    data["No. of participants"] || ""
  );

  // Prefill name/email from profile (optional UX)
  try {
    const profile = JSON.parse(localStorage.getItem("litablaze_profile") || "null");
    if (profile) {
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      if (nameInput && profile.name) nameInput.value = profile.name;
      if (emailInput && profile.email) emailInput.value = profile.email;
    }
  } catch (e) {}

  // Open modal
  const modal = document.getElementById("registrationModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}


function closeRegister() {
  const modal = document.getElementById("registrationModal");

  modal.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    modal.classList.remove("upside");

    // reset view
    const regFormEl = document.getElementById("registrationForm");
    if (regFormEl) regFormEl.style.display = "block";
    const regSuccessEl = document.getElementById("registrationSuccess");
    if (regSuccessEl) regSuccessEl.style.display = "none";
    if (regFormEl && typeof regFormEl.reset === 'function') regFormEl.reset();
  }, 350);
}




/* ESC KEY CLOSE */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRegister();
});


/* ================= UPSIDE NAVBAR THEME ================= */

const navbar = document.querySelector(".navbar");
const upsideSection = document.querySelector("#upside");

if (navbar && upsideSection) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        navbar.classList.toggle("upside-theme", entry.isIntersecting);
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(upsideSection);
}

// Register the signed-in user for an event without opening a form.
async function registerForEvent(eventKey) {
  const profile = JSON.parse(localStorage.getItem('litablaze_profile') || 'null');
  if (!profile || !profile.email) {
    window.location.href = 'login.html';
    return;
  }

  const eventName = eventData[eventKey] && eventData[eventKey].name ? eventData[eventKey].name : eventKey;

  // find the button for UX
  const card = Array.from(document.querySelectorAll('.event-card')).find(c => {
    const t = c.querySelector('.event-title');
    return t && t.textContent && t.textContent.trim() === eventName;
  });
  const btn = card ? card.querySelector('.register-btn') : null;
  const origText = btn ? btn.textContent : null;
  if (btn) { btn.textContent = 'Registering...'; btn.disabled = true; }

  const payload = new FormData();
  payload.append('action', 'register');
  payload.append('event', eventName);
  payload.append('email', (profile.email || '').toString());
  payload.append('name', profile.name || '');
  payload.append('college', profile.college || '');
  payload.append('department', profile.department || '');
  payload.append('phone', profile.phone || '');

  try {
    const res = await fetch(SCRIPT_URL, { method: 'POST', body: payload });
    const data = await res.json();
    if (data && data.success) {
      // store local registration with timestamp
      const local = getLocalRegistrations();
      local[eventName] = { litid: profile.litid || (data.litid || ''), timestamp: (new Date()).toISOString() };
      localStorage.setItem('litablaze_local_regs', JSON.stringify(local));

      // Refresh server registrations via doGet to keep sheet copy authoritative
      try {
        const fresh = await fetchFromGoogleScript(profile.email);
        const extracted = extractRegistrationsByEmail(fresh, profile.email);
localStorage.setItem(
  'litablaze_sheet_regs',
  JSON.stringify(extracted)
);

        // update stored profile with authoritative server user if provided
        if (fresh && fresh.user) {
          const stored = JSON.parse(localStorage.getItem('litablaze_profile') || 'null') || {};
          stored.litid = stored.litid || fresh.user.litid || '';
          stored.name = stored.name || fresh.user.name || '';
          stored.college = stored.college || fresh.user.college || '';
          stored.department = stored.department || fresh.user.department || '';
          stored.phone = stored.phone || fresh.user.phone || '';
          localStorage.setItem('litablaze_profile', JSON.stringify(stored));
        }
      } catch (e) {
        // fallback: keep local sheet mapping
        const regs = getSheetRegistrations();
        regs[eventName] = profile.litid || (data.litid || '');
        localStorage.setItem('litablaze_sheet_regs', JSON.stringify(regs));
      }

      updateEventButtons();
      if (btn) btn.textContent = 'Registered';
    } else {
      console.error('Register failed', data);
      await window.showAlert('Registration failed. Try again.');
      if (btn) { btn.disabled = false; if (origText) btn.textContent = origText; }
    }
  } catch (err) {
    console.error(err);
    await window.showAlert('Server error');
    if (btn) { btn.disabled = false; if (origText) btn.textContent = origText; }
  }
}


function goToProfile() {
  const profile = localStorage.getItem("litablaze_profile");

  if (!profile) {
    window.location.href = "login.html";
  } else {
    window.location.href = "profile.html";
  }
}
function logout() {
  localStorage.removeItem('litablaze_profile');
  localStorage.removeItem('litablaze_sheet_regs');
  window.location.href = 'login.html';
}
// Normalize various shapes returned from the Google Script into a
// { "Event Name": "LITID" } mapping that the UI expects.
function normalizeRegistrations(raw) {
  if (!raw) return {};

  // Already an object mapping
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw;
  }

  // Array of entries -> try to convert
  if (Array.isArray(raw)) {
    const map = {};

    raw.forEach(item => {
      if (!item) return;

      // If item is [event, litid] style
      if (Array.isArray(item) && item.length >= 2) {
        const name = String(item[0]).trim();
        const id = String(item[1]).trim();
        if (name) map[name] = id;
        return;
      }

      // If item is object, attempt common key names
      if (typeof item === 'object') {
        const keys = Object.keys(item).map(k => k.toLowerCase());

        // common variations
        const eventKey = keys.find(k => /event|eventname|event_name|event title|eventtitle/.test(k));
        const idKey = keys.find(k => /lit|id|litid|registration|registrationid|registration_id/.test(k));

        const name = eventKey ? String(item[eventKey]).trim() : null;
        const id = idKey ? String(item[idKey]).trim() : null;

        if (name && id) {
          map[name] = id;
          return;
        }

        // fallback: try first two string-y fields
        const stringFields = Object.values(item).filter(v => typeof v === 'string' && v.trim());
        if (stringFields.length >= 2) {
          map[String(stringFields[0]).trim()] = String(stringFields[1]).trim();
        }
      }
    });

    return map;
  }

  // Unknown shape -> empty
  return {};
}

// Attempt to pull event registrations out of many possible response shapes.
// Returns a simple mapping: { "Event Name": "LITID" }
function extractRegistrationsByEmail(raw, email) {
  if (!raw) return {};

  const regs = {};
  const lowerEmail = (email || '').toLowerCase();

  function processRow(row) {
    if (!row) return;
    // If row is an array, try to interpret first 3 columns as [event, litid, email]
    if (Array.isArray(row)) {
      const [a, b, c] = row.map(v => (v || '').toString().trim());
      if (c && lowerEmail && c.toLowerCase().includes(lowerEmail)) {
        if (a && b) regs[a] = b;
      }
      return;
    }

    if (typeof row === 'object') {
      const keys = Object.keys(row);
      const lowerKeys = keys.map(k => k.toLowerCase());

      // find likely fields
      const emailKey = keys[lowerKeys.findIndex(k => /email|e-mail/.test(k))];
      const eventKey = keys[lowerKeys.findIndex(k => /event|eventname|event_name|event title|eventtitle/.test(k))];
      const idKey = keys[lowerKeys.findIndex(k => /lit|id|litid|registration|registrationid|registration_id/.test(k))];

      const rowEmail = emailKey ? String(row[emailKey]).trim().toLowerCase() : null;
      const eventName = eventKey ? String(row[eventKey]).trim() : null;
      const litid = idKey ? String(row[idKey]).trim() : null;

      if (rowEmail && lowerEmail && rowEmail.includes(lowerEmail) && eventName && litid) {
        regs[eventName] = litid;
        return;
      }

      // fallback: if object contains both an event-like and id-like string values and email appears anywhere
      const allValues = Object.values(row).map(v => (v || '').toString());
      const anyEmailMatch = allValues.some(v => lowerEmail && v.toLowerCase().includes(lowerEmail));
      if (anyEmailMatch) {
        const ev = allValues.find(v => /[A-Za-z0-9\s\-()]{3,}/.test(v) && !/@/.test(v));
        const id = allValues.find(v => /LIT|LIT\d|[A-Z0-9\-]{4,}/.test(v));
        if (ev && id) regs[ev.trim()] = id.trim();
      }
    }
  }

  // If raw is an object with sheet names -> flatten
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    for (const k in raw) {
      const v = raw[k];
      if (Array.isArray(v)) {
        v.forEach(processRow);
      } else if (typeof v === 'object') {
        // maybe it's a single row or mapping
        processRow(v);
      }
    }
    // also try direct object form
    if (Object.keys(raw).length && Object.values(raw).every(v => typeof v === 'string')) {
      // maybe mapping event->litid where keys are events
      for (const [k, val] of Object.entries(raw)) {
        regs[k] = String(val);
      }
    }
  }

  // If it's an array of rows
  if (Array.isArray(raw)) {
    raw.forEach(processRow);
  }

  return regs;
}

async function fetchRegistrationsForProfile() {
  const profile = JSON.parse(localStorage.getItem('litablaze_profile') || 'null');
  if (!profile || !profile.email) return;

  try {
    const raw = await fetchFromGoogleScript(profile.email);
    // prefer extracting rows by matching email if possible
    const regs = extractRegistrationsByEmail(raw, profile.email);
    const normalized = Object.keys(regs).length ? regs : normalizeRegistrations(raw);
    localStorage.setItem('litablaze_sheet_regs', JSON.stringify(normalized));
  } catch (err) {
    console.warn('Could not fetch registrations for profile:', err);
  }
}

// Try to fetch JSON from the Google Script endpoint; if blocked by CORS or fails,
// attempt JSONP by injecting a <script> tag with a callback parameter.
function fetchFromGoogleScript(email) {
  const url = `${SCRIPT_URL}?email=${encodeURIComponent(email)}`;

  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('non-200');
      const data = await res.json();
      return resolve(data);
    } catch (err) {
      // Fetch failed (likely CORS). Try JSONP fallback.
      const cbName = `gs_cb_${Date.now()}_${Math.floor(Math.random()*1000)}`;
      (window)[cbName] = (data) => {
        try {
          resolve(data);
        } finally {
          delete (window)[cbName];
        }
      };

      const script = document.createElement('script');
      script.src = `${url}&callback=${cbName}`;
      script.onerror = (e) => {
        delete (window)[cbName];
        reject(new Error('JSONP failed'));
      };

      // Timeout in 8s
      const t = setTimeout(() => {
        if ((window)[cbName]) {
          delete (window)[cbName];
          reject(new Error('JSONP timeout'));
        }
      }, 8000);

      script.onload = () => clearTimeout(t);
      document.head.appendChild(script);
    }
  });
}

// On DOM ready: ensure profile button visibility and refresh registrations
document.addEventListener('DOMContentLoaded', async () => {
  const profileBtn = document.querySelector('.profile-btn');
  const logoutBtn = document.querySelector('.logout-btn');
  const logged = !!localStorage.getItem('litablaze_profile');
  if (profileBtn) profileBtn.style.display = logged ? '' : 'none';
  if (logoutBtn) logoutBtn.style.display = logged ? '' : 'none';

  // Save original inline onclicks so we can restore 'Register' behaviour
  document.querySelectorAll('.register-btn').forEach(b => {
    try {
      const attr = b.getAttribute('onclick');
      if (attr) b.dataset.origOnclick = attr;
    } catch (e) {}
  });

  // Attach card and button handlers
  document.querySelectorAll('.event-card').forEach(card => {
    const titleEl = card.querySelector('.event-title');
    const btn = card.querySelector('.register-btn');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const key = findEventKeyByTitle(title);

    if (card && key) {
      card.addEventListener('click', (e) => {
        if (e.target && e.target.closest && e.target.closest('button')) return;
        try {
          const cat = eventData[key]?.category?.toLowerCase();
          if (cat === 'carnival' || cat === 'upside') {
            openUpsideRegister(key);
          } else {
            openRegister(key);
          }
        } catch {
          openRegister(key);
        }
      });
    }

    if (btn) {
      try { btn.removeAttribute('onclick'); } catch (e) {}

      if (btn.dataset._listenerAttached !== '1') {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();

          // ✅ FIX: single source of truth (NO string matching)
          const merged = getMergedRegistrations();
          if (key && merged[key]) return;

          if (key) {
            registerForEvent(key);
          } else if (btn.dataset.origOnclick) {
            try { (new Function(btn.dataset.origOnclick))(); } catch (e) {}
          }
        });

        btn.dataset._listenerAttached = '1';
      }
    }
  });

  await fetchRegistrationsForProfile();
  requestAnimationFrame(() => updateEventButtons());
});

function viewRegistration(eventName, litid) {

  // Find matching event from eventData
  const event = Object.values(eventData).find(
    e => e.name === eventName
  );

  // Fill modal content safely
  setTextIfExists("eventName", eventName);
  setTextIfExists("eventExplanation", event ? event.explanation : "");
  setTextIfExists("eventRules", event ? event.rules : "");
  setTextIfExists("eventCriteria", event ? event.criteria : "");

  // Hide form, show success block
  const regFormEl = document.getElementById("registrationForm");
  if (regFormEl) regFormEl.style.display = "none";
  setTextIfExists("litidValue", litid);
  const regSuccessEl = document.getElementById("registrationSuccess");
  if (regSuccessEl) regSuccessEl.style.display = "block";

  // Open modal
  const regModal = document.getElementById("registrationModal");
  if (regModal) {
    regModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}




function getSheetRegistrations() {
  return JSON.parse(localStorage.getItem("litablaze_sheet_regs")) || {};
}

function getLocalRegistrations() {
  return JSON.parse(localStorage.getItem('litablaze_local_regs') || '{}');
}

// Merge server-side sheet registrations and local (immediate) registrations.
function getMergedRegistrations() {
  const server = JSON.parse(localStorage.getItem("litablaze_sheet_regs") || "{}");
  const local = JSON.parse(localStorage.getItem("litablaze_local_regs") || "{}");

  const merged = {};

  // server registrations
  Object.entries(server).forEach(([eventName, litid]) => {
    const key = findEventKeyByTitle(eventName);
    if (key && litid) merged[key] = String(litid).trim();
  });

  // local registrations override
  Object.entries(local).forEach(([eventName, obj]) => {
    const key = findEventKeyByTitle(eventName);
    if (key && obj && obj.litid) merged[key] = String(obj.litid).trim();
  });

  return merged; // { jam: "LIT26-XXX", quiz: "LIT26-XXX" }
}
function updateEventButtons() {
  const regs = getMergedRegistrations();
  const profile = JSON.parse(localStorage.getItem('litablaze_profile') || 'null');
  const userLit = profile && profile.litid ? String(profile.litid).trim() : null;

  document.querySelectorAll(".event-card").forEach(card => {
    const titleEl = card.querySelector(".event-title");
    if (!titleEl) return;

    const eventTitle = titleEl.textContent.trim();
    const eventKey = findEventKeyByTitle(eventTitle);

    const btn = card.querySelector(".register-btn");
    if (!btn) return;

    const regVal = eventKey ? regs[eventKey] : null;

    let regLit = null;
    if (regVal) {
      if (typeof regVal === "string") regLit = regVal.trim();
      else if (typeof regVal === "object" && regVal.litid) {
        regLit = String(regVal.litid).trim();
      }
    }

    if (eventKey && userLit && regLit && userLit === regLit) {
      // ✅ DEFINITELY REGISTERED
      btn.textContent = "Registered";
      btn.disabled = true;
      btn.onclick = null;
      try { btn.removeAttribute("onclick"); } catch (e) {}
      return;
    }

    // ❌ NOT REGISTERED
    btn.textContent = "Register";
    btn.disabled = false;

    // restore original inline onclick if available
    if (btn.dataset.origOnclick) {
      try {
        btn.setAttribute("onclick", btn.dataset.origOnclick);
        btn.onclick = null;
      } catch (e) {}
    } else if (eventKey) {
      btn.onclick = () => registerForEvent(eventKey);
    } else {
      btn.onclick = null;
    }

    btn.classList.remove("registered");
  });
}
// updateEventButtons already called in the DOMContentLoaded async handler above


const animatedSections = document.querySelectorAll(
  '.portal, .hawkins, .upside-down'
);

const perfObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle(
      'pause-animations',
      !entry.isIntersecting
    );
  });
}, { threshold: 0.15 });


animatedSections.forEach(sec => perfObserver.observe(sec));
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const upsideDownSection = document.querySelector(".upside-down");

  if (!navbar || !upsideDownSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navbar.classList.add("upside-theme");
        } else {
          navbar.classList.remove("upside-theme");
        }
      });
    },
    {
      root: null,
      threshold: 0.35
    }
  );

  observer.observe(upsideDownSection);
});
function goToProfile() {
  const profile = localStorage.getItem("litablaze_profile");

  if (!profile) {
    window.location.href = "/login.html";
  } else {
    window.location.href = "/profile.html";
  }
}
function logout() {
  localStorage.removeItem("litablaze_profile");
  localStorage.removeItem("litablaze_sheet_regs");
  window.location.href = "/login.html";
}
