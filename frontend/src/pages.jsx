import { useState } from "react";

export function Login({
  goHome,
  goToSignup,
  goToScreening,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    goToScreening();
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">

        <div className="auth-left">
          <button
            className="auth-logo"
            onClick={goHome}
          >
            RETO
          </button>

          <div className="auth-copy">
            <p className="auth-eyebrow">
              RETINAL SCREENING
            </p>

            <h1>
              Welcome back.
            </h1>

            <p>
              Sign in to continue to your retinal screening
              dashboard.
            </p>
          </div>

          <div className="auth-side-note">
            <span>01</span>
            AI-assisted retinal screening
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="mobile-auth-header">
              <button
                className="auth-logo"
                onClick={goHome}
              >
                RETO
              </button>
            </div>

            <p className="auth-form-eyebrow">
              ACCOUNT
            </p>

            <h2>Log in</h2>

            <p className="auth-form-intro">
              Enter your details to continue.
            </p>

            <form onSubmit={handleLogin}>
              <div className="auth-field">
                <label>Email address</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="auth-field">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                Log in
                <span>→</span>
              </button>
            </form>

            <div className="auth-switch">
              <span>Don't have an account?</span>

              <button onClick={goToSignup}>
                Create account
              </button>
            </div>

            <button
              className="auth-back"
              onClick={goHome}
            >
              ← Back to RETO
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}


export function Signup({
  goHome,
  goToLogin,
  goToScreening,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please complete all fields.");
      return;
    }

    goToScreening();
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">

        <div className="auth-left signup-left">
          <button
            className="auth-logo"
            onClick={goHome}
          >
            RETO
          </button>

          <div className="auth-copy">
            <p className="auth-eyebrow">
              RETINAL SCREENING
            </p>

            <h1>
              Start with RETO.
            </h1>

            <p>
              Create an account to access the retinal
              screening workflow.
            </p>
          </div>

          <div className="auth-side-note">
            <span>02</span>
            Screening support, not diagnosis
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrap">
            <div className="mobile-auth-header">
              <button
                className="auth-logo"
                onClick={goHome}
              >
                RETO
              </button>
            </div>

            <p className="auth-form-eyebrow">
              NEW ACCOUNT
            </p>

            <h2>Create account</h2>

            <p className="auth-form-intro">
              Add your details to get started.
            </p>

            <form onSubmit={handleSignup}>
              <div className="auth-field">
                <label>Full name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div className="auth-field">
                <label>Email address</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <div className="auth-field">
                <label>Password</label>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                Create account
                <span>→</span>
              </button>
            </form>

            <div className="auth-switch">
              <span>Already have an account?</span>

              <button onClick={goToLogin}>
                Log in
              </button>
            </div>

            <button
              className="auth-back"
              onClick={goHome}
            >
              ← Back to RETO
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}


/* =====================================================
   AUTH STYLES
===================================================== */

const authStyles = `
.auth-page {
  min-height: 100vh;
  background: #faf9f7;
  color: #25211f;
}

.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
}

.auth-left {
  position: relative;
  min-height: 100vh;
  padding: 38px 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff0e7;
  border-right: 1px solid #e4ded9;
  overflow: hidden;
}

.auth-left::after {
  content: "";
  position: absolute;
  right: -100px;
  bottom: -100px;
  width: 260px;
  height: 260px;
  border: 55px solid rgba(227, 107, 50, 0.12);
  border-radius: 50%;
}

.auth-logo {
  width: fit-content;
  padding: 0;
  border: 0;
  background: transparent;
  color: #c65320;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.auth-copy {
  position: relative;
  z-index: 1;
  max-width: 430px;
}

.auth-eyebrow,
.auth-form-eyebrow {
  margin: 0 0 17px;
  color: #c65320;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.auth-copy h1 {
  margin: 0 0 18px;
  font-size: clamp(45px, 5vw, 66px);
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.auth-copy p:last-child {
  max-width: 390px;
  margin: 0;
  color: #6d6762;
  font-size: 15px;
  line-height: 1.7;
}

.auth-side-note {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6d6762;
  font-size: 11px;
  font-weight: 600;
}

.auth-side-note span {
  color: #c65320;
  font-weight: 700;
}

.auth-right {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background: #faf9f7;
}

.auth-form-wrap {
  width: min(430px, 100%);
}

.mobile-auth-header {
  display: none;
}

.auth-form-wrap h2 {
  margin: 0 0 10px;
  font-size: 38px;
  font-weight: 600;
  letter-spacing: -0.035em;
}

.auth-form-intro {
  margin: 0 0 34px;
  color: #6d6762;
  font-size: 14px;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.auth-field label {
  font-size: 12px;
  font-weight: 600;
  color: #423d39;
}

.auth-field input {
  width: 100%;
  height: 49px;
  padding: 0 14px;
  border: 1px solid #cec6bf;
  border-radius: 4px;
  background: white;
  color: #25211f;
  outline: none;
  font-size: 14px;
}

.auth-field input:focus {
  border-color: #e36b32;
  box-shadow: 0 0 0 3px rgba(227, 107, 50, 0.1);
}

.auth-field input::placeholder {
  color: #aaa19b;
}

.auth-submit {
  width: 100%;
  min-height: 48px;
  margin-top: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border: 1px solid #c65320;
  border-radius: 4px;
  background: #c65320;
  color: white;
  font-size: 13px;
  font-weight: 600;
}

.auth-submit:hover {
  background: #aa4419;
}

.auth-submit span {
  font-size: 17px;
}

.auth-switch {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 25px;
  font-size: 12px;
  color: #777069;
}

.auth-switch button,
.auth-back {
  border: 0;
  padding: 0;
  background: transparent;
  color: #c65320;
  font-size: 12px;
  font-weight: 600;
}

.auth-back {
  display: block;
  margin: 28px auto 0;
  color: #777069;
}

.auth-back:hover {
  color: #c65320;
}

@media (max-width: 750px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }

  .auth-left {
    display: none;
  }

  .auth-right {
    min-height: 100vh;
    padding: 35px 25px;
    align-items: flex-start;
  }

  .mobile-auth-header {
    display: block;
    margin-bottom: 70px;
  }
}
`;

const styleElement = document.createElement("style");
styleElement.textContent = authStyles;
document.head.appendChild(styleElement);