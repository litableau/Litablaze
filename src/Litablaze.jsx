import { useEffect } from "react";
import "./styles.css";
useEffect(() => {
  const script = document.createElement("script");
  script.src = "/script.js";
  script.defer = true;
  document.body.appendChild(script);
}, []);

export default function Litablaze() {
  useEffect(() => {
    // Load legacy scripts AFTER mount
    const ui = document.createElement("script");
    ui.src = "/ui.js";
    ui.defer = true;

    const script = document.createElement("script");
    script.src = "/script.js";
    script.defer = true;

    document.body.appendChild(ui);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(ui);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="page-wrapper">

      {/* ================= HOME ================= */}
      <section className="section" id="home">

        <nav className="navbar">
          <div className="logo">LITABLAZE</div>

          <div className="hamburger" onClick={() => window.toggleMenu()}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className="nav-links">
            <li><a href="#home" className="nav-link">HOME</a></li>
            <li><a href="#hawkins" className="nav-link">HAWKINS</a></li>
            <li><a href="#upsideSection1" className="nav-link">UPSIDE DOWN</a></li>
            <li>
              <a
                href="https://litable-au-website-swart.vercel.app/"
                className="nav-link"
              >
                LITCLUB
              </a>
            </li>
            <li>
              <a
                href="#"
                className="nav-link"
                onClick={() => window.goToProfile()}
              >
                PROFILE
              </a>
            </li>
            <li>
              <a
                href="#"
                className="nav-link logout-btn"
                onClick={() => window.logout()}
              >
                LOGOUT
              </a>
            </li>
          </ul>
        </nav>

        <main className="hero">
          <div className="title-wrapper">
            <img
              src="/assets/litablaze.png"
              className="title-image"
              alt="Litablaze"
            />
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

      {/* ================= HAWKINS ================= */}
      <section className="section hawkins" id="hawkins">
        <h1>WELCOME TO HAWKINS</h1>

        <div className="events-section">
          <div
            className="event-category fixed"
            onClick={(e) => window.toggleCategory("flagged", e.currentTarget)}
          >
            <h2>FLAGGED EVENTS</h2>
          </div>

          <div className="event-list flagged-grid" id="flagged">
            {[
              ["JAM", "jam"],
              ["Block and Tackle", "block-and-tackle"],
              ["Aiyoo Kekadha (Tamil / Tanglish)", "aiyoo-kekadha"],
              ["Channel Surfing", "channel-surfing"],
            ].map(([title, key]) => (
              <div className="event-card" key={key}>
                <h3 className="event-title">{title}</h3>
                <button
                  className="register-btn"
                  onClick={() => window.openRegister(key)}
                >
                  Register
                </button>
              </div>
            ))}
          </div>

          <div
            className="event-category fixed"
            onClick={(e) => window.toggleCategory("unflagged", e.currentTarget)}
          >
            <h2>UNFLAGGED EVENTS</h2>
          </div>

          <div className="event-list fixed-visible" id="unflagged">
            {[
              ["Tamil Movie Auction", "tamil-movie-auction"],
              ["Quiz", "quiz"],
              ["Spell Bee", "spell-bee"],
              ["Genre Swap", "genre-swap"],
              ["Chaotic Canvas", "chaotic-canvas"],
            ].map(([title, key]) => (
              <div className="event-card" key={key}>
                <h3 className="event-title">{title}</h3>
                <button
                  className="register-btn"
                  onClick={() => window.openRegister(key)}
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <section className="footer">
        <p>
          © 2026 LITCLUB – Literary Society of Anna University. All rights reserved.
        </p>
      </section>
    </div>
  );
}
