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

  /* ================= FETCH PROFILE ================= */
  async function fetchProfile(email) {
    try {
      const res = await fetch(`${SCRIPT_URL}?email=${encodeURIComponent(email)}`);
      const text = await res.text();

      let data;
      if (text.trim().startsWith("{")) {
        data = JSON.parse(text);
      } else {
        // JSONP fallback
        const match = text.match(/\((.*)\)/);
        data = match ? JSON.parse(match[1]) : {};
      }

      console.log("PROFILE RESPONSE:", data);

      setUser(data.user || {});

      let regs = data.registrations || [];
      if (!Array.isArray(regs)) {
        regs = Object.keys(regs).map(k => ({
          event: k,
          ...regs[k]
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

  if (loading) return null;

  return (
    <>
      {/* ================= STYLES ================= */}
      <style>{`
        * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Times New Roman", serif;
    }

    body {
      height: 100vh;
      background: radial-gradient(circle at center, #2b0b0b, #000000);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .login-box {
      width: 90%;
      max-width: 380px;
      padding: 32px 28px;
      background: rgba(0, 0, 0, 0.75);
      border: 1px solid rgba(220, 38, 38, 0.7);
      border-radius: 18px;

      box-shadow:
        0 0 35px rgba(220, 38, 38, 0.7),
        inset 0 0 40px rgba(0, 0, 0, 0.8);
    }

    .login-title {
      text-align: center;
      font-size: 24px;
      letter-spacing: 4px;
      color: #dc2626;
      margin-bottom: 10px;
      text-shadow:
        0 0 12px rgba(220,38,38,0.9),
        0 0 28px rgba(127,29,29,0.6);
    }

    .login-subtitle {
      text-align: center;
      font-size: 12px;
      letter-spacing: 2px;
      color: #fca5a5;
      margin-bottom: 26px;
    }

    .form-group {
      margin-bottom: 18px;
    }

    .form-group label {
      display: block;
      font-size: 12px;
      letter-spacing: 2px;
      margin-bottom: 6px;
      color: #f87171;
    }

    .form-group input {
      width: 100%;
      padding: 12px 14px;
      background: rgba(0,0,0,0.7);
      border: 1px solid rgba(220,38,38,0.6);
      border-radius: 999px;
      color: white;
      font-size: 14px;
      outline: none;
    }

    .form-group input:focus {
      border-color: #dc2626;
      box-shadow: 0 0 12px rgba(220,38,38,0.7);
    }

    .login-btn {
      width: 100%;
      margin-top: 14px;
      padding: 12px;
      border-radius: 999px;
      border: none;
      background: #dc2626;
      color: black;
      font-weight: bold;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .login-btn:hover {
      background: #ff4d4d;
      box-shadow:
        0 0 25px rgba(220,38,38,0.9);
    }

    .note {
      margin-top: 16px;
      font-size: 11px;
      letter-spacing: 1.5px;
      color: #fca5a5;
      text-align: center;
      opacity: 0.85;
    }

    ::selection {
      background: rgba(220,38,38,0.6);
      color: black;
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
