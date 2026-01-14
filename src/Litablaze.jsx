import React, { useState, useEffect, useRef } from 'react';
import './styles.css';


// Original event data with full details (for modal)
const eventData = {
  // FLAGGED EVENTS
  'jam': {
    name: 'JAM',
    category: 'Flagged',
    explanation: 'JAM (Just a Minute) is a basic oratory event, in which participants are given a topic on the spot, and have to talk based off of it for a minute. Both Tamil and English or a mix of both languages are accepted.',
    rules: 'The participant will be given a topic with 1 minute to prepare. They are not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
    Date: 'January 23rd (Day 1)',
    Timing: '[R1] 1:00 pm- 2:30 pm \n[R2] 3:00 pm - 4:30 pm',
    'No. of participants': 'Solo event',
    Venue: 'UTC',
    Contact:'Ashmika  : +91 81221 21344\nC.S.Abhinav : +91 99402 19278'
  },
  'block-and-tackle': {
    name: 'Block and Tackle',
    category: 'Flagged',
    explanation: 'Block and Tackle is a SOLO spoken event, which features a judge who provides the participant with a topic. When the judge says \'Block\', the participant must DEFEND the topic, and when the judge says \'Tackle\', the participant must speak AGAINST the topic.',
    rules: ' The participant will be given a topic with 1 minute to prepare. They are not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
    Date: 'January 24th (Day 2)',
    Timing: '[R1] 10:30 am - 12:00 pm \n[R2] 1:00 pm - 2:30 pm',
    'No. of participants': 'Solo event',
    Venue: 'UTC',
    Contact:'C.S.Abhinav : +91 99402 19278\nShaan : +91 97908 10625',
  },
  'aiyoo-kekadha': {
    name: 'Aiyoo Kekadha',
    category: 'Flagged',
    explanation: 'Aiyoo Kekadha is a SOLO spoken event, which features a judge who provides the participant with a topic or a scenario. The participant gets to go on a full fledged dramatic rant on said topic, for about 2-3 minutes.',
    rules: 'The participant will be given a topic with 1 minute to prepare. They are not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
    Date: 'January 24th (Day 2)',
    Timing: '[R1] 10:30 am - 12:00 pm \n[R2] 1:00 pm - 2:30 pm',
    'No. of participants': 'Solo event',
    Venue: 'UTC',
    Contact:'Ashmika  : +91 81221 21344\nDeekshitha : +91 98840 69051',
  },
  'channel-surfing': {
    name: 'Channel Surfing',
    category: 'Flagged',
    explanation: 'Channel Surfing is a GROUP performance event where participants enact a continuous skit. A host randomly announces different "channels" (such as News, Movie, Reality Show, Advertisement, Sports, Cartoon, etc.). Every time the channel changes, the team must instantly switch their performance style to match the new channel, while continuing the same situation or characters.',
    rules: 'Minimum team size- 3 members. All participants of the team should contribute to the channel. Use of vulgarity in any form is strictly prohibited, and will lead to negative marking.',
    Date: 'January 23rd (Day 1)',
    Timing: '[R1] 1:00 pm- 2:30 pm \n[R2] 3:00 pm - 4:30 pm',
    'No. of participants': 'Teams of 3-7',
    Venue: 'New Auditorium',
    Contact:'Harini : +91 63820 60103\nNiharika  : +91 96776 56309',
  },

  // UNFLAGGED EVENTS
  'tamil-movie-auction': {
    name: 'Tamil Movie Auction',
    category: 'Unflagged',
    explanation: 'Tamil movie actors are auctioned off, with completely custom rules. Teams are formed and they are the "Producers" and they start with a fixed amount of money to make the next Blockbuster. The auctioneer presents different actors and the Producers have to invest carefully. Once they get their casting, the theme/genre of the films will be revealed and they have around 30 mins to come up with a storyline and plot and title for the movie. They will be graded based on how well they\'ve used each actor. And the Blockbuster is declared in the end.',
    rules: 'Teams of 2-4 are allowed. Use of vulgarity is prohibited and will lead to negative marking. The storyline should not be of an already existing movie. Will be conducted in two batches.',
    Date: 'January 24th (Day 2)',
    Timing: '[B1] 10:30 am - 12:00 pm \n[B2] 1:00 pm - 2:30 pm',
    'No. of participants': 'Teams of 2-4',
    Venue: 'New Auditorium',
    Contact:'Niharika  : +91 96776 56309\nPraveena : +91 75388 97559',
  },
  'quiz': {
    name: 'Quiz',
    category: 'Unflagged',
    explanation: 'A fun-filled quiz competition for participants that blends knowledge with entertainment.',
    rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Malpractice of any form, will lead to immediate disqualification.',
    Date: 'January 24th (Day 2)',
    Timing: '[R1] 10:30 am - 12:00 pm \n[R2] 1:00 pm - 2:30 pm',
    'No. of participants': 'Teams of max. 3',
    Venue: 'UTC',
    Contact:'Harini : +91 63820 60103',
  },
  'spell-bee': {
    name: 'Spell Bee',
    category: 'Unflagged',
    explanation: 'Solo event where words will be given to the participants at random, and they\'ve to spell it right entirely. The person who gets the most correct words wins.',
    rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Malpractice of any form, will lead to immediate disqualification.',
    Date: 'January 23rd (Day 1)',
    Timing: '1:00 pm - 4:00 pm',
    'No. of participants': 'Solo event',
    Venue: 'UTC',
    Contact:'Shaan : +91 97908 10625\nDeekshitha : +91 98840 69051',
  },
  'genre-swap': {
    name: 'Genre Swap',
    category: 'Unflagged',
    explanation: 'Solo written event, where participants rewrite a given story or prompt by introducing an unexpected yet convincing twist. The twist must reshape the narrative while retaining the original essence of the story.',
    rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Use of vulgarity is prohibited and will lead to negative marking.',
    Date: 'January 23rd (Day 1)',
    Timing: '1:00 pm - 4:00 pm',
    'No. of participants': 'Solo event',
    Venue: 'UTC',
  },
  'chaotic-canvas': {
    name: 'Chaotic Canvas',
    category: 'Unflagged',
    explanation: 'A collaborative art event where participants contribute to a shared canvas, creating a chaotic yet cohesive masterpiece.',
    rules: 'Participants are strictly not allowed to surf the web or access any data online during the event. Malpractice of any form, will lead to immediate disqualification.',
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
    Date: 'January 23rd and January 24th(both days)',
    Timing: '10:30am to 4pm',
    Venue: 'ACT Quadrangle',
  },
  'traditional-board-games': {
    name: 'Traditional Board Games',
    category: 'Carnival',
    explanation: 'Rediscover classic games like Pallanguzhi, Dhayakattai, Aadu Puli Aatam, Chakram Uruttu, and Paramapadham. Simple, nostalgic, and fun for everyone.',
    Date: 'January 23rd and January 24th(both days)',
    Timing: '10:30am to 4pm',
    Venue: 'ACT Quadrangle',
  },
  'face-painting': {
    name: 'Face Painting',
    category: 'Carnival',
    explanation: 'Bringing colors to life with fun, creativity, and a splash of imagination. Choose vibrant designs and transform your look in this lively carnival experience.',
    Date: 'January 23rd and January 24th(both days)',
    Timing: '10:30am to 4pm',
    Venue: 'ACT Quadrangle',
  },
  'stalls': {
    name: 'Stalls',
    category: 'Carnival',
    explanation: 'A lively collection of colourful stalls featuring activities, food, games, and exciting sales. Explore, snack, shop, and enjoy the carnival vibe all in one place.',
    Date: 'January 23rd and January 24th(both days)',
    Timing: '10:30am to 4pm',
    Venue: 'ACT Quadrangle',
  },
  'book-exchange': {
    name: 'Book Exchange',
    category: 'Carnival',
    explanation: 'A fun and engaging book exchange event where stories are shared, swapped, and rediscovered. Bring a book, take a book, and leave with a new story.',
    Date: 'January 23rd and January 24th(both days)',
    Timing: '10:30am to 4pm',
    Venue: 'ACT Quadrangle',
  },
};

// SEPARATE DATA ARRAY FOR CARD DISPLAY (short descriptions from HTML)
const eventCardsData = {
  // FLAGGED EVENTS - Short descriptions for cards
  flagged: [
    {
      key: 'jam',
      name: 'JAM',
      shortDesc: 'Think fast and speak faster! Get a surprise topic and keep talking for a full minute with confidence, humor, and flow.',
    },
    {
      key: 'block-and-tackle',
      name: 'Block and Tackle',
      shortDesc: 'Defend it. Attack it. Repeat. Switch opinions instantly as the judge commands and show off your wit and spontaneity.',
    },
    {
      key: 'aiyoo-kekadha',
      name: 'Aiyoo Kekadha (Tamil / Tanglish)',
      shortDesc: 'Ever had something you really wanted to rant about? This is your moment. Dramatic, loud, and hilariously relatable.',
    },
    {
      key: 'channel-surfing',
      name: 'Channel Surfing',
      shortDesc: 'One story, many channels! Perform a skit while flipping through TV genres on the spot. Teamwork and chaos guaranteed.',
    },
  ],
  
  // UNFLAGGED EVENTS - Short descriptions for cards
  unflagged: [
    {
      key: 'tamil-movie-auction',
      name: 'Tamil Movie Auction',
      shortDesc: 'Bid for Tamil movie stars, build your dream cast, and create the next blockbuster. Creativity, strategy, and cinema madness collide!',
    },
    {
      key: 'quiz',
      name: 'Quiz',
      shortDesc: 'Put your knowledge to the test with fast-paced questions and fair play. Think smart, answer right, and aim for the top.',
    },
    {
      key: 'spell-bee',
      name: 'Spell Bee',
      shortDesc: 'Spell it right or spell trouble! A solo challenge to test your vocabulary and focus.',
    },
    {
      key: 'genre-swap',
      name: 'Genre Swap',
      shortDesc: 'Rewrite a story with a shocking yet clever twist. Surprise us while keeping the soul of the original intact.',
    },
    {
      key: 'chaotic-canvas',
      name: 'Chaotic Canvas',
      shortDesc: 'A collaborative art event where participants contribute to a shared canvas, creating a chaotic yet cohesive masterpiece.',
    },
  ],
  
  // CARNIVAL EVENTS - Short descriptions for cards
  carnival: [
    {
      key: 'board-games',
      name: 'Board Games',
      shortDesc: 'Drop in anytime and play crowd favourites like Carrom, Song Association, UNO, and Lemon on the Spoon. No rules stress, no winners, just chill games and good company.',
    },
    {
      key: 'traditional-board-games',
      name: 'Traditional Board Games',
      shortDesc: 'Rediscover classic games like Pallanguzhi, Dhayakattai, Aadu Puli Aatam, Chakram Uruttu, and Paramapadham. Simple, nostalgic, and fun for everyone.',
    },
    {
      key: 'face-painting',
      name: 'Face Painting',
      shortDesc: 'Bringing colors to life with fun, creativity, and a splash of imagination. Choose vibrant designs and transform your look in this lively carnival experience.',
    },
    {
      key: 'stalls',
      name: 'Stalls',
      shortDesc: 'A lively collection of colourful stalls featuring activities, food, games, and exciting sales. Explore, snack, shop, and enjoy the carnival vibe all in one place.',
    },
    {
      key: 'book-exchange',
      name: 'Book Exchange',
      shortDesc: 'A fun and engaging book exchange event where stories are shared, swapped, and rediscovered. Bring a book, take a book, and leave with a new story.',
    },
  ],
};

const Litablaze = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalUpsideMode, setModalUpsideMode] = useState(false);
  const [flaggedOpen, setFlaggedOpen] = useState(false);
  const [unflaggedOpen, setUnflaggedOpen] = useState(true);
  const [navbarUpsideTheme, setNavbarUpsideTheme] = useState(false);
  const [profile, setProfile] = useState(null);
  const [sheetRegistrations, setSheetRegistrations] = useState({});
  const [localRegistrations, setLocalRegistrations] = useState({});
  const [registeredEventKeys, setRegisteredEventKeys] = useState({});
  const [registeringEventKey, setRegisteringEventKey] = useState(null);
  const [hawkinsBgLoaded, setHawkinsBgLoaded] = useState(false);
  const hawkinsRef = useRef(null);
  const [upsideBgLoaded, setUpsideBgLoaded] = useState(false);
const upsideBgRef = useRef(null);


  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhHFITHPKnvJOknTeL4XxfQk2xvZIfx3hUehtXrSV-EXZe9TPFVfZ2yp884nmay84n/exec";
  const upsideDownSectionRef = useRef(null);

  // Initialize profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('litablaze_profile');
    const savedSheetRegs = localStorage.getItem('litablaze_sheet_regs');
    const savedLocalRegs = localStorage.getItem('litablaze_local_regs');
    const cachedKeys = localStorage.getItem("litablaze_registered_keys");
if (cachedKeys) {
  setRegisteredEventKeys(JSON.parse(cachedKeys));
}

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedSheetRegs) {
      setSheetRegistrations(JSON.parse(savedSheetRegs));
    }
    if (savedLocalRegs) {
      setLocalRegistrations(JSON.parse(savedLocalRegs));
    }
  }, []);
  useEffect(() => {
  if (!upsideBgRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setUpsideBgLoaded(true);
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );

  observer.observe(upsideBgRef.current);

  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!hawkinsRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setHawkinsBgLoaded(true);
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(hawkinsRef.current);

  return () => observer.disconnect();
}, []);

  const lastTheme = useRef(null);

useEffect(() => {
  if (!upsideDownSectionRef.current) return;

  const observer = new IntersectionObserver(entries => {
    const isVisible = entries[0].isIntersecting;
    if (lastTheme.current !== isVisible) {
      lastTheme.current = isVisible;
      setNavbarUpsideTheme(isVisible);
    }
  }, { threshold: 0.35 });

  observer.observe(upsideDownSectionRef.current);
  return () => observer.disconnect();
}, []);


  // Close menu on link click
  useEffect(() => {
    const handleLinkClick = () => {
      setMenuOpen(false);
    };

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalOpen]);

  // Fetch registrations on mount
  useEffect(() => {
    if (profile?.email) {
      fetchRegistrationsForProfile();
    }
  }, [profile]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('menu-open', !menuOpen);
  };

  const toggleCategory = (category) => {
    if (category === 'flagged') {
      setFlaggedOpen(!flaggedOpen);
    } else if (category === 'unflagged') {
      setUnflaggedOpen(!unflaggedOpen);
    }
  };

  const openModal = (eventKey, upsideMode = false) => {
    const data = eventData[eventKey];
    if (!data) return;

    setModalData(data);
    setModalUpsideMode(upsideMode);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    document.body.style.overflow = 'auto';
  };

  const findEventKeyByTitle = (title) => {
    const norm = s => String(s || '').replace(/\(.*\)/, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    const t = norm(title);
    
    for (const k of Object.keys(eventData)) {
      const name = eventData[k]?.name || '';
      if (name === title) return k;
      if (norm(name) === t) return k;
      if (norm(k) === t) return k;
    }
    return null;
  };




const registerForEvent = async (eventKey) => {
  if (!profile?.email) {
    alert("Please login to register for events");
    window.location.href = "/login";
    return;
  }

  if (isEventRegistered(eventKey)) return;

  setRegisteringEventKey(eventKey); // 🔄 START loading

  const eventName = eventData[eventKey]?.name || eventKey;

  const payload = new FormData();
  payload.append("action", "register");
  payload.append("event", eventName);
  payload.append("email", profile.email);
  payload.append("name", profile.name || "");
  payload.append("college", profile.college || "");
  payload.append("department", profile.department || "");
  payload.append("phone", profile.phone || "");

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: payload,
    });

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error("SERVER RESPONSE:", text);
      alert("Registration failed. Try again.");
      return;
    }

    if (data.success) {
      setRegisteredEventKeys((prev) => {
        const updated = { ...prev, [eventKey]: true };
        localStorage.setItem(
          "litablaze_registered_keys",
          JSON.stringify(updated)
        );
        return updated;
      });
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("Network error. Try again.");
  } finally {
    setRegisteringEventKey(null); // ✅ STOP loading
  }
};



const fetchRegistrationsForProfile = async () => {
  if (!profile?.email) return;

  try {
    const res = await fetch(
      `${SCRIPT_URL}?email=${encodeURIComponent(profile.email)}`
    );
    const text = await res.text();

    let data;
    if (text.trim().startsWith("{")) {
      data = JSON.parse(text);
    } else {
      const match = text.match(/\((.*)\)/);
      data = match ? JSON.parse(match[1]) : {};
    }

    // SAME as Profile.jsx
    let regs = data.registrations || [];
    if (!Array.isArray(regs)) {
      regs = Object.keys(regs).map((k) => ({
        event: k,
      }));
    }

    // Convert event names → event keys
    const keyMap = {};
    regs.forEach((r) => {
      const key = findEventKeyByTitle(r.event);
      if (key) keyMap[key] = true;
    });

    setRegisteredEventKeys(keyMap);
    localStorage.setItem(
      "litablaze_registered_keys",
      JSON.stringify(keyMap)
    );
  } catch (err) {
    console.error("REGISTRATION FETCH ERROR:", err);
  }
};



  const extractRegistrationsByEmail = (raw, email) => {
    if (!raw) return {};
    
    const regs = {};
    const lowerEmail = (email || '').toLowerCase();

    const processRow = (row) => {
      if (!row) return;
      
      if (Array.isArray(row)) {
        const [event, litid, rowEmail] = row.map(v => (v || '').toString().trim());
        if (rowEmail && lowerEmail && rowEmail.toLowerCase().includes(lowerEmail)) {
          if (event && litid) {
            regs[event] = litid;
          }
        }
        return;
      }

      if (typeof row === 'object') {
        const keys = Object.keys(row);
        const lowerKeys = keys.map(k => k.toLowerCase());

        const emailKey = keys[lowerKeys.findIndex(k => /email|e-mail/.test(k))];
        const eventKey = keys[lowerKeys.findIndex(k => /event|eventname|event_name|event title|eventtitle/.test(k))];
        const idKey = keys[lowerKeys.findIndex(k => /lit|id|litid|registration|registrationid|registration_id/.test(k))];

        const rowEmail = emailKey ? String(row[emailKey]).trim().toLowerCase() : null;
        const eventName = eventKey ? String(row[eventKey]).trim() : null;
        const litid = idKey ? String(row[idKey]).trim() : null;

        if (rowEmail && lowerEmail && rowEmail.includes(lowerEmail) && eventName && litid) {
          regs[eventName] = litid;
        }
      }
    };

    if (Array.isArray(raw)) {
      raw.forEach(processRow);
    } else if (typeof raw === 'object') {
      Object.values(raw).forEach(value => {
        if (Array.isArray(value)) {
          value.forEach(processRow);
        } else {
          processRow(value);
        }
      });
    }

    return regs;
  };

  const goToProfile = () => {
    if (!profile) {
      window.location.href = '/login';
    } else {
      window.location.href = '/profile';
    }
  };

  const logout = () => {
    localStorage.removeItem('litablaze_profile');
    localStorage.removeItem('litablaze_sheet_regs');
    localStorage.removeItem('litablaze_local_regs');
    setProfile(null);
    window.location.href = '/login';
  };

  const handleCardClick = (eventKey, eventCategory) => {
    const isCarnival = eventCategory?.toLowerCase() === 'carnival';
    openModal(eventKey, isCarnival);
  };
  const isEventRegistered = (eventKey) => {
  return !!registeredEventKeys[eventKey];
};
  const handleRegisterClick = (e, eventKey, eventCategory) => {
    e.stopPropagation();
    if (isEventRegistered(eventKey)) return;
    if (eventCategory === 'Carnival') return; // No registration for carnival events
    registerForEvent(eventKey);
  };

  const ModalContent = () => {
    if (!modalData) return null;

    const renderSection = (title, content) => {
      if (!content || String(content).trim() === '') return null;
      return (
        <div className="detail-section">
          <h3 className="detail-title">{title}</h3>
          <p className="detail-text">{content}</p>
        </div>
      );
    };

    return (
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={closeModal}>&times;</span>
        
        <div className="modal-header">
          <h2 className="modal-title flicker">Event Details</h2>
          <p className="modal-event-name">
            Event : <span id="eventName">{modalData.name}</span>
          </p>
        </div>

        <div className="modal-body">
          <div className="event-details">
            {renderSection('Event Explanation', modalData.explanation)}
            {renderSection('Rules', modalData.rules)}
            {renderSection('Date', modalData.Date)}
            {renderSection('Timing', modalData.Timing)}
            {renderSection('Venue', modalData.Venue)}
            {renderSection('Team Size', modalData['No. of participants'])}
            {renderSection('Contact', modalData.Contact)}
          </div>
        </div>
      </div>
    );
  };

  const EventCard = ({ cardData }) => {
    const eventKey = cardData.key;
    const fullEventData = eventData[eventKey];
    const isRegistered = isEventRegistered(eventKey);
    const eventCategory = fullEventData?.category;
    const isCarnival = eventCategory === 'Carnival';
    
    return (
      <div 
        className="event-card" 
        onClick={() => handleCardClick(eventKey, eventCategory)}
      >
        <h3 className="event-title">{cardData.name}</h3>
        <p className="event-desc">{cardData.shortDesc}</p>
        {!isCarnival && (
          <button
  className={`register-btn ${
    isRegistered
      ? "registered"
      : registeringEventKey === eventKey
      ? "registering"
      : ""
  }`}
  onClick={(e) => handleRegisterClick(e, eventKey, eventCategory)}
  disabled={isRegistered || registeringEventKey === eventKey}
>
  {isRegistered
    ? "Registered"
    : registeringEventKey === eventKey
    ? "Registering..."
    : "Register"}
</button>

        )}
      </div>
    );
  };

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <nav className={`navbar ${navbarUpsideTheme ? 'upside-theme' : ''}`}>
        <div className="logo">LITABLAZE</div>
        
        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link">HOME</a></li>
          <li><a href="#hawkins" className="nav-link">HAWKINS</a></li>
          <li><a href="#upsideSection1" className="nav-link">UPSIDE DOWN</a></li>
          <li><a href="https://litable-au-website-swart.vercel.app/" className="nav-link">LITCLUB</a></li>
          <li><a href="javascript:void(0)" className="nav-link" onClick={goToProfile}>PROFILE</a></li>
          {profile && (
            <li><a href="javascript:void(0)" className="nav-link logout-btn" onClick={logout}>LOGOUT</a></li>
          )}
        </ul>
      </nav>

      {/* Home Section */}
      <section className="section" id="home">
        <main className="hero">
          <div className="title-wrapper">
            <img src="assets/litablaze.webp" loading="lazy" decoding="async"className="title-image" alt="Litablaze" />
          </div>

          <p className="subtitle">
            A Literary Signal From the Upside Down
          </p>

          <div className="card-container">
            <a href="#hawkins" className="card">
              <h2>ENTER HAWKINS</h2>
              <p>(FLAGGED AND UNFLAGGED)</p>
            </a>

            <a href="#upsideSection1" className="card">
              <h2>ENTER UPSIDE DOWN</h2>
              <p>(CARNIVAL ZONE)</p>
            </a>
          </div>
        </main>
      </section>

      {/* Hawkins Section */}
      <section
  className="section hawkins"
  id="hawkins"
  ref={hawkinsRef}
  style={
    hawkinsBgLoaded
      ? {
          backgroundImage: "url('/assets/hawkins.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {}
  }
>
        <h1>WELCOME TO HAWKINS</h1>

        <div className="events-section">
          <div 
            className={`event-category fixed ${flaggedOpen ? 'open' : ''}`}
            onClick={() => toggleCategory('flagged')}
            role="button"
            aria-expanded={flaggedOpen}
          >
            <h2>FLAGGED EVENTS</h2>
            <span className="chevron">▾</span>
          </div>

          <div className={`event-list flagged-grid ${flaggedOpen ? 'active' : ''}`} id="flagged">
            {flaggedOpen && eventCardsData.flagged.map((cardData) => (
              <EventCard key={cardData.key} cardData={cardData} />
            ))}
          </div>

          <div 
            className={`event-category fixed ${unflaggedOpen ? 'open' : ''}`}
            onClick={() => toggleCategory('unflagged')}
            role="button"
            aria-expanded={unflaggedOpen}
          >
            <h2>UNFLAGGED EVENTS</h2>
            <span className="chevron">▾</span>
          </div>

          <div className={`event-list flagged-grid ${unflaggedOpen ? 'active' : ''}`} id="unflagged">
            {unflaggedOpen && eventCardsData.unflagged.map((cardData) => (
              <EventCard key={cardData.key} cardData={cardData} />
            ))}
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section className="section portal">
        <img src="assets/portal.webp" className="portal-image" alt="Portal" />
      </section>

      {/* Upside Down Section */}
      <section
  className="section upside-down"
  id="upsideSection1"
  ref={(node) => {
    upsideDownSectionRef.current = node; // existing navbar observer
    upsideBgRef.current = node;           // lazy bg observer
  }}
  style={
    upsideBgLoaded
      ? {
          backgroundImage: "url('/assets/upside-down.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {}
  }
>

        <h1 className="upside-content">UPSIDE DOWN</h1>

        <div className="events-section upside-content">
          <div className="event-category fixed">
            <h2>CARNIVAL ZONE</h2>
            <h3>Date : January 23rd and January 24th</h3>
            <h3>Timing : 10:30am to 4pm</h3>
            <h3>Venue : ACT Quadrangle</h3>
          </div>

          <div className="event-list fixed-visible">
            {eventCardsData.carnival.map((cardData) => (
              <EventCard key={cardData.key} cardData={cardData} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer">
        <p>© 2026 LITCLUB – Literary Society of Anna University. All rights reserved.</p>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div 
          className={`modal ${modalUpsideMode ? 'upside' : ''} active`}
          onClick={closeModal}
        >
          <ModalContent />
        </div>
      )}
    </div>
  );
};

export default Litablaze;