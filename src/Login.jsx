import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const uiScript = document.createElement("script");
    uiScript.src = "/ui.js";
    uiScript.async = true;
    document.body.appendChild(uiScript);

    const loginScript = document.createElement("script");
    loginScript.src = "/login.js";
    loginScript.async = true;
    document.body.appendChild(loginScript);

    return () => {
      document.body.removeChild(uiScript);
      document.body.removeChild(loginScript);
    };
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Times New Roman", serif; }
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
          box-shadow: 0 0 35px rgba(220, 38, 38, 0.7),
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
        .form-group { margin-bottom: 18px; }
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

      <div className="login-box">
        <div className="login-title">LITABLAZE</div>
        <div className="login-subtitle">SIGN IN</div>

        <form id="loginForm">
          <div className="form-group">
            <label htmlFor="email">EMAIL ID</label>
            <input type="email" id="email" name="email" required />
          </div>

          <button type="submit" className="login-btn">
            SIGN IN
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "none",
              border: "none",
              color: "#fca5a5",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Create an account
          </button>
        </div>

        <div className="note">
          Your details will be used only for event communication
        </div>
      </div>
    </>
  );
}
