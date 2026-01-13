import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const uiScript = document.createElement("script");
    uiScript.src = "/ui.js";
    uiScript.async = true;
    document.body.appendChild(uiScript);

    const signupScript = document.createElement("script");
    signupScript.src = "/signup.js";
    signupScript.async = true;
    document.body.appendChild(signupScript);

    return () => {
      document.body.removeChild(uiScript);
      document.body.removeChild(signupScript);
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
        }
      `}</style>

      <div className="login-box signup-box">
        <div className="login-title">LITABLAZE</div>
        <div className="login-subtitle">SIGN UP</div>

        <form id="signupForm">
          <input id="email" name="email" placeholder="Email" />
          <input id="name" name="name" placeholder="Full Name" />
          <input id="college" name="college" placeholder="College" />
          <input id="department" name="department" placeholder="Department" />
          <input id="phone" name="phone" placeholder="Phone" />

          <button type="submit" className="login-btn">
            CREATE ACCOUNT
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
    </>
  );
}
