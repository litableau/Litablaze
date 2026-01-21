import { useEffect,useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx_yTWgQViHMCR99ttniFpf0uUpCq7SsLQqV2Xg7XFGFlMnfC18Sq0SMztKxpaNnMjS/exec";
useEffect(() => {
  // Load ONLY ui.js if it contains pure UI helpers
  if (!window.__UI_LOADED__) {
    const uiScript = document.createElement("script");
    uiScript.src = "/ui.js";
    uiScript.async = true;
    document.body.appendChild(uiScript);
    window.__UI_LOADED__ = true;
  }

  return () => {
    // ❌ Do not remove ui.js
    // Removing causes re-injection and double execution in StrictMode
  };
}, []);


const handleSignup = async (e) => {
  e.preventDefault();
  if (creating) return;

  setCreating(true);

  const form = e.target;
  const payload = new FormData(form);
  payload.append("action", "signup");

  const referralId = form.referralId?.value?.trim();

  try {
    // 1️⃣ SIGNUP
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: payload,
    });

    const data = await res.json();
    if (!data.success || !data.user) {
      throw new Error("Signup failed");
    }

    const user = data.user;

    // Save profile immediately
    localStorage.setItem("litablaze_profile", JSON.stringify(user));

    // 2️⃣ OPTIONAL REFERRAL SUBMISSION
    if (referralId && referralId !== user.litid) {
      try {
        const referralPayload = new FormData();
        referralPayload.append("action", "submitReferral");
        referralPayload.append("referrerEmail", user.email);
        referralPayload.append("referrerName", user.name || "");
        referralPayload.append("referrerLitID", user.litid);
        referralPayload.append("referredLitID", referralId);

        const refRes = await fetch(SCRIPT_URL, {
          method: "POST",
          body: referralPayload,
        });

        const refText = await refRes.text();
        let refData;

        try {
          refData = JSON.parse(refText);
        } catch {
          const match = refText.match(/\((.*)\)/);
          refData = match ? JSON.parse(match[1]) : {};
        }

        // Do NOT block signup if referral fails
        if (!refData.success) {
          console.warn("Referral failed:", refData.message);
        } else {
          localStorage.setItem("litablaze_referral_used", "true");
        }
      } catch (err) {
        console.warn("Referral submission error:", err);
      }
    }

    // 3️⃣ REDIRECT
    navigate("/home");

  } catch (err) {
    alert("Signup failed");
    setCreating(false);
  }
};

  return (
    <>
      {/* INLINE STYLES — UNCHANGED */}
      <style>{`
      .page-center {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

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
        }

        .note {
          margin-top: 16px;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #fca5a5;
          text-align: center;
        }
      `}</style>

      {/* STRUCTURE MUST MATCH ORIGINAL HTML */}
      <div className="page-center">
      <div className="login-box signup-box">
        <div className="login-title">LITABLAZE</div>
        <div className="login-subtitle">SIGN UP</div>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label htmlFor="email">EMAIL ID</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="name">FULL NAME</label>
            <input id="name" name="name" type="text" required />
          </div>

          <div className="form-group">
            <label htmlFor="college">COLLEGE</label>
            <input id="college" name="college" type="text" required />
          </div>

          <div className="form-group">
            <label htmlFor="department">DEPARTMENT</label>
            <input id="department" name="department" type="text" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">PHONE</label>
            <input id="phone" name="phone" type="tel" required />
          </div>

          <div className="form-group">
            <label htmlFor="referralId">REFERRAL ID (OPTIONAL)</label>
            <input id="referralId" name="referralId" type="text" placeholder="Enter referral LitID" />
          </div>

          <button type="submit" className="login-btn" disabled={creating}>
  {creating ? "CREATING..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              color: "#fca5a5",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Already have an account? Sign in
          </button>
        </div>

        <div className="note">
          Your details will be used only for event communication
        </div>
      </div>
      </div>
    </>
  );
}
