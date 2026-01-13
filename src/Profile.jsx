import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxhHFITHPKnvJOknTeL4XxfQk2xvZIfx3hUehtXrSV-EXZe9TPFVfZ2yp884nmay84n/exec";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("litablaze_profile") || "null"
    );

    if (!stored || !stored.email) {
      navigate("/login");
      return;
    }

    fetchProfile(stored.email);
  }, [navigate]);

  /* ================= FETCH PROFILE (JSON + JSONP) ================= */
  async function fetchProfile(email) {
    try {
      const res = await fetch(
        `${SCRIPT_URL}?email=${encodeURIComponent(email)}`
      );
      const text = await res.text();

      let data;
      if (text.trim().startsWith("{")) {
        data = JSON.parse(text);
      } else {
        const match = text.match(/\((.*)\)/);
        data = match ? JSON.parse(match[1]) : {};
      }

      console.log("PROFILE RESPONSE:", data);

      setUser(data.user || {});

      let regs = data.registrations || [];
      if (!Array.isArray(regs)) {
        regs = Object.keys(regs).map((k) => ({
          event: k,
          ...regs[k],
        }));
      }

      setRegistrations(regs);
    } catch (err) {
      console.error("PROFILE LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  /* ================= LOGOUT ================= */
  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  if (loading) {
    return (
      <div style={{ color: "#fca5a5", fontFamily: "Times New Roman" }}>
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* ================= STYLES (MATCH profile.html) ================= */}
      <style>{`
        body {
          margin: 0;
          min-height: 100vh;
          background: radial-gradient(circle at top, #1a0000, #000);
          color: #fca5a5;
          font-family: "Times New Roman", serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-card {
          width: 90%;
          max-width: 720px;
          background: rgba(0,0,0,0.75);
          border: 2px solid #dc2626;
          border-radius: 18px;
          padding: 32px;
          box-shadow: 0 0 30px rgba(220,38,38,0.7);
        }

        h1 {
          text-align: center;
          color: #dc2626;
          letter-spacing: 3px;
          margin-bottom: 20px;
        }

        .user-info p {
          margin: 6px 0;
          font-size: 15px;
        }

        .registrations-title {
          margin-top: 30px;
          letter-spacing: 2px;
          color: #f87171;
        }

        .registration {
          margin-top: 12px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(220,38,38,0.6);
          padding: 14px 18px;
          border-radius: 14px;
        }

        .registration strong {
          color: #dc2626;
        }

        .no-registrations {
          text-align: center;
          margin-top: 20px;
          opacity: 0.7;
        }

        .actions {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .btn {
          padding: 10px 26px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          letter-spacing: 2px;
          font-weight: bold;
        }

        .btn-home {
          background: #dc2626;
          color: black;
        }

        .btn-logout {
          background: transparent;
          color: #fca5a5;
          border: 1px solid rgba(220,38,38,0.6);
        }
      `}</style>

      {/* ================= UI ================= */}
      <div className="profile-card">
        <h1>MY PROFILE</h1>

        <div className="user-info">
          <p><strong>Name:</strong> {user.name || ""}</p>
          <p><strong>Email:</strong> {user.email || ""}</p>
          <p><strong>LIT ID:</strong> {user.litid || ""}</p>
          <p><strong>College:</strong> {user.college || ""}</p>
          <p><strong>Department:</strong> {user.department || ""}</p>
          <p><strong>Phone:</strong> {user.phone || ""}</p>
        </div>

        <h3 className="registrations-title">REGISTERED EVENTS</h3>

        {registrations.length === 0 ? (
          <p className="no-registrations">No events registered yet</p>
        ) : (
          registrations.map((r, i) => (
            <div className="registration" key={i}>
              <strong>{r.event}</strong>
              {r.timestamp && <><br />Registered at: {r.timestamp}</>}
            </div>
          ))
        )}

        <div className="actions">
          <button className="btn btn-home" onClick={() => navigate("/home")}>
            HOME
          </button>
          <button className="btn btn-logout" onClick={logout}>
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}
