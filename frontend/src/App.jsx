import { useMemo, useState } from "react";
import "./App.css";
import { Login, Signup } from "./pages.jsx";
import { checkBackend } from "./api";
import fundImage from "./assets/fund.jpg";

const stageDetails = {
  Mild: {
    intro:
      "Mild diabetic retinopathy may involve early changes in the small blood vessels of the retina.",
    means:
      "Small retinal blood vessels can begin showing early abnormalities, although vision may not yet be noticeably affected.",
    changes: [
      "Small microaneurysms",
      "Early retinal vessel changes",
      "Limited retinal abnormalities",
    ],
    followUp:
      "Routine review by an eye care professional is recommended to monitor for progression.",
  },

  Moderate: {
    intro:
      "Moderate diabetic retinopathy generally involves more noticeable changes in the retinal blood vessels.",
    means:
      "As the condition progresses, blood vessels supporting the retina may become increasingly affected.",
    changes: [
      "Increased microaneurysms",
      "Retinal haemorrhages",
      "Early venous changes",
    ],
    followUp:
      "A qualified eye care professional should review the findings and determine whether further examination is required.",
  },

  Severe: {
    intro:
      "Severe diabetic retinopathy involves more extensive changes across the retinal blood vessels.",
    means:
      "A larger portion of the retinal circulation may be affected, increasing the risk of progression.",
    changes: [
      "Widespread retinal haemorrhages",
      "Significant vessel abnormalities",
      "Areas of reduced retinal blood supply",
    ],
    followUp:
      "Closer evaluation and follow-up by an eye care professional is recommended.",
  },

  Proliferative: {
    intro:
      "Proliferative diabetic retinopathy is an advanced stage involving abnormal blood vessel growth.",
    means:
      "New and fragile blood vessels may begin forming because of reduced blood supply to the retina.",
    changes: [
      "Growth of abnormal blood vessels",
      "Increased risk of retinal bleeding",
      "More extensive retinal changes",
    ],
    followUp:
      "Prompt evaluation by an eye care professional is recommended.",
  },
};

function App() {
  const [page, setPage] = useState("home");
  const [screeningStep, setScreeningStep] = useState(1);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [history, setHistory] = useState({
    diabetes: "",
    duration: "",
  });

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const testBackend = async () => {
    try {
      const data = await checkBackend();
      console.log("Backend response:", data);
      alert("Backend connected successfully!");
    } catch (error) {
      console.error("Backend connection failed:", error);
      alert("Backend connection failed!");
    }
  };

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  function resetScreening() {
    setPatient({
      name: "",
      age: "",
      gender: "",
    });

    setHistory({
      diabetes: "",
      duration: "",
    });

    setImage(null);
    setResult(null);
    setScreeningStep(1);
    setPage("screening");
  }

  function patientComplete() {
    return (
      patient.name.trim() !== "" &&
      patient.age !== "" &&
      patient.gender !== ""
    );
  }

  function historyComplete() {
    if (history.diabetes === "") {
      return false;
    }

    if (history.diabetes === "Yes" && history.duration.trim() === "") {
      return false;
    }

    return true;
  }

  function handleProgressClick(step) {
    if (step === 1) {
      setScreeningStep(1);
      return;
    }

    if (step === 2) {
      if (!patientComplete()) {
        alert("Please complete the patient details first.");
        return;
      }

      setScreeningStep(2);
      return;
    }

    if (step === 3) {
      if (!patientComplete()) {
        alert("Please complete the patient details first.");
        return;
      }

      if (!historyComplete()) {
        alert("Please complete the medical history first.");
        return;
      }

      setScreeningStep(3);
      return;
    }

    if (step === 4) {
      if (!result) {
        alert("Please complete the screening first.");
        return;
      }

      setPage("result");
    }
  }

  /* LOGIN */

  if (page === "login") {
    return (
      <Login
        goHome={() => setPage("home")}
        goToSignup={() => setPage("signup")}
        goToScreening={resetScreening}
      />
    );
  }

  /* SIGNUP */

  if (page === "signup") {
    return (
      <Signup
        goHome={() => setPage("home")}
        goToLogin={() => setPage("login")}
        goToScreening={resetScreening}
      />
    );
  }

  /* STAGE INFORMATION */

  if (page === "stage") {
    const stageName = result?.stage || "Moderate";
    const info = stageDetails[stageName] || stageDetails.Moderate;

    return (
      <main className="screening-page">
        <div className="screening-wrapper">
          <nav className="screening-nav">
            <button
              className="screening-logo"
              onClick={() => setPage("home")}
            >
              RETO
            </button>

            <button
              className="exit-screening"
              onClick={() => setPage("result")}
            >
              ← Back to result
            </button>
          </nav>

          <section className="stage-page">
            <p className="screening-eyebrow">DIABETIC RETINOPATHY</p>

            <h1>{stageName} stage.</h1>

            <p className="stage-intro">{info.intro}</p>

            <div className="stage-info-card">
              <div className="stage-section">
                <p className="result-label">WHAT THIS MEANS</p>
                <p>{info.means}</p>
              </div>

              <div className="stage-section">
                <p className="result-label">COMMON RETINAL CHANGES</p>

                <ul className="stage-changes-list">
                  {info.changes.map((change, index) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </div>

              <div className="stage-section">
                <p className="result-label">FOLLOW-UP</p>
                <p>{info.followUp}</p>
              </div>

              <div className="stage-warning">
                This information is provided for screening support and does
                not replace professional medical advice or clinical
                examination.
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /* RESULT */

  if (page === "result") {
    return (
      <main className="screening-page">
        <div className="screening-wrapper">
          <nav className="screening-nav">
            <button
              className="screening-logo"
              onClick={() => setPage("home")}
            >
              RETO
            </button>

            <button
              className="exit-screening"
              onClick={() => setPage("home")}
            >
              Exit screening
            </button>
          </nav>

          <section className="result-page">
            <p className="screening-eyebrow">SCREENING RESULT</p>

            <h1>Screening summary.</h1>

            <p className="screening-intro">
              Review the prediction generated from the uploaded retinal
              image.
            </p>

            <div className="result-card">
              <div className="result-top-grid">
                <div>
                  <p className="result-label">INDICATED STAGE</p>

                  <h2>{result?.stage}</h2>

                  <p className="result-description">
                    The current demonstration uses a temporary screening
                    result. Connect your trained model or API here.
                  </p>
                </div>

                <div className="confidence-box">
                  <p>MODEL CONFIDENCE</p>

                  <strong>{result?.confidence}%</strong>
                </div>
              </div>

              <div className="important-note">
                <strong>Important:</strong> The confidence score represents
                the CNN/ML model's confidence in its prediction. It is not a
                measure of how certain the patient has diabetic retinopathy.
              </div>

              <div className="result-image-section">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded retinal image"
                  />
                ) : (
                  <div className="no-result-image">
                    No image available
                  </div>
                )}
              </div>

              <div className="result-note">
                <strong>Medical disclaimer:</strong> This screening result
                does not replace examination, diagnosis, or treatment by a
                qualified eye care professional.
              </div>

              <div className="result-actions">
                <button
                  className="secondary-action"
                  onClick={() => setPage("stage")}
                >
                  Learn about this stage
                </button>

                <button
                  className="new-screening-btn"
                  onClick={resetScreening}
                >
                  Start another screening
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  /* SCREENING */

  if (page === "screening") {
    function handleImageUpload(event) {
      const file = event.target.files?.[0];

      if (!file) return;

      setImage(file);
    }

    function runScreening() {
      if (!image) {
        alert("Please upload a fundus image first.");
        return;
      }

      setResult({
        detected: true,
        confidence: 87,
        stage: "Moderate",
      });

      setPage("result");
    }

    return (
      <main className="screening-page">
        <div className="screening-wrapper">
          <nav className="screening-nav">
            <button
              className="screening-logo"
              onClick={() => setPage("home")}
            >
              RETO
            </button>

            <button
              className="exit-screening"
              onClick={() => setPage("home")}
            >
              Exit
            </button>
          </nav>

          <div className="progress-bar">
            <button
              className={`progress-step ${
                screeningStep === 1
                  ? "active"
                  : screeningStep > 1
                  ? "completed"
                  : ""
              }`}
              onClick={() => handleProgressClick(1)}
            >
              <span>01</span>
              <b>Patient</b>
            </button>

            <div className="progress-line" />

            <button
              className={`progress-step ${
                screeningStep === 2
                  ? "active"
                  : screeningStep > 2
                  ? "completed"
                  : ""
              }`}
              onClick={() => handleProgressClick(2)}
            >
              <span>02</span>
              <b>History</b>
            </button>

            <div className="progress-line" />

            <button
              className={`progress-step ${
                screeningStep === 3 ? "active" : ""
              }`}
              onClick={() => handleProgressClick(3)}
            >
              <span>03</span>
              <b>Image</b>
            </button>

            <div className="progress-line" />

            <button
              className="progress-step"
              onClick={() => handleProgressClick(4)}
            >
              <span>04</span>
              <b>Result</b>
            </button>
          </div>

          <section className="screening-content">

            {/* STEP 1 */}

            {screeningStep === 1 && (
              <div className="step-panel">
                <div className="screening-heading">
                  <p className="screening-eyebrow">STEP 01</p>

                  <h1>Patient details.</h1>

                  <p className="screening-intro">
                    Enter the basic information required for this retinal
                    screening.
                  </p>
                </div>

                <form
                  className="screening-form"
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (!patientComplete()) {
                      alert("Please complete all patient details.");
                      return;
                    }

                    setScreeningStep(2);
                  }}
                >
                  <div className="form-group">
                    <label>Patient name</label>

                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={patient.name}
                      onChange={(e) =>
                        setPatient({
                          ...patient,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Age</label>

                      <input
                        type="number"
                        min="1"
                        max="120"
                        placeholder="Enter age"
                        value={patient.age}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
                            age: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label>Gender</label>

                      <select
                        value={patient.gender}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option value="">Select</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="screening-actions right">
                    <button
                      className="continue-btn"
                      type="submit"
                    >
                      Continue
                      <span>→</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2 */}

            {screeningStep === 2 && (
              <div className="step-panel">
                <div className="screening-heading">
                  <p className="screening-eyebrow">STEP 02</p>

                  <h1>Diabetes history.</h1>

                  <p className="screening-intro">
                    Tell us whether the patient has diabetes and, if so,
                    approximately how long they have had it.
                  </p>
                </div>

                <form
                  className="screening-form"
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (!historyComplete()) {
                      alert(
                        history.diabetes === "Yes"
                          ? "Please enter the duration of diabetes."
                          : "Please answer the diabetes question."
                      );
                      return;
                    }

                    setScreeningStep(3);
                  }}
                >
                  <div className="form-group">
                    <label>Does the patient have diabetes?</label>

                    <select
                      value={history.diabetes}
                      onChange={(e) =>
                        setHistory({
                          ...history,
                          diabetes: e.target.value,
                          duration:
                            e.target.value === "No"
                              ? ""
                              : history.duration,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {history.diabetes === "Yes" && (
                    <div className="form-group">
                      <label>Duration of diabetes</label>

                      <input
                        type="text"
                        placeholder="e.g. 8 years"
                        value={history.duration}
                        onChange={(e) =>
                          setHistory({
                            ...history,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="screening-actions">
                    <button
                      type="button"
                      className="back-step"
                      onClick={() => setScreeningStep(1)}
                    >
                      ← Back
                    </button>

                    <button
                      className="continue-btn"
                      type="submit"
                    >
                      Continue
                      <span>→</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3 */}

            {screeningStep === 3 && (
              <div className="image-step">
                <div className="image-step-info">
                  <div className="screening-heading">
                    <p className="screening-eyebrow">STEP 03</p>

                    <h1>Upload image.</h1>

                    <p className="screening-intro">
                      Upload a retinal fundus image for screening.
                    </p>
                  </div>

                  <div className="screening-medical-warning">
                    <strong>Medical disclaimer</strong>
                    <p>
                      This screening is intended to support early
                      identification and does not replace professional
                      medical examination or diagnosis.
                    </p>
                  </div>

                  <div className="model-confidence-warning">
                    <strong>About the confidence score</strong>
                    <p>
                      The confidence score reflects how confident the
                      CNN/ML model is in its prediction. It is not the
                      probability or certainty that the patient has
                      diabetic retinopathy.
                    </p>
                  </div>
                </div>

                <div className="image-upload-side">
                  <label className="upload-area">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {previewUrl ? (
                      <div className="uploaded-preview">
                        <img
                          src={previewUrl}
                          alt="Uploaded fundus"
                        />

                        <div className="uploaded-preview-info">
                          <strong>Image selected</strong>
                          <span>Click to replace</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="upload-icon">↑</div>

                        <strong>Upload fundus image</strong>

                        <span>JPG, JPEG or PNG</span>
                      </>
                    )}
                  </label>

                  <div className="screening-actions">
                    <button
                      type="button"
                      className="back-step"
                      onClick={() => setScreeningStep(2)}
                    >
                      ← Back
                    </button>

                    <button
                      className="run-screening-btn"
                      type="button"
                      onClick={runScreening}
                    >
                      Run screening
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    );
  }

  /* HOME */

  return (
    <main className="home-page">
      <div className="page">

        <nav className="home-nav">
          <button
            className="logo"
            onClick={() => setPage("home")}
          >
            RETO
          </button>

          <button
            className="login-btn"
            onClick={() => setPage("login")}
          >
            Log in
          </button>
        </nav>

        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-eyebrow">RETINAL SCREENING</p>

            <h1>
              Diabetic retinopathy
              <span>screening, made clearer.</span>
            </h1>

            <p className="hero-description">
              RETO analyses a retinal fundus image using an AI-assisted
              screening model to identify patterns associated with
              diabetic retinopathy and present the prediction clearly.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={resetScreening}
              >
                Start screening
                <span>→</span>
              </button>

              <button
                className="secondary-action"
                type="button"
                onClick={testBackend}
              >
                Test backend
              </button>
            </div>

            <p className="hero-note">
              Screening support only. Results do not replace professional
              medical assessment.
            </p>
          </div>

          <div className="retina-card">
            <div className="retina-card-label">
              FUNDUS IMAGE
            </div>

            <div className="retina-photo-frame">
              <img
                src={fundImage}
                alt="Retinal fundus image"
                className="retina-photo"
              />
            </div>

            <div className="retina-card-footer">
              <span>RETINAL SCREENING</span>
              <span>RETO</span>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-intro">
            <p className="section-eyebrow">WHAT RETO DOES</p>

            <h2>
              From image to
              <span>screening result.</span>
            </h2>

            <p>
              RETO combines retinal image analysis with relevant patient
              information to support early screening for diabetic
              retinopathy.
            </p>
          </div>

          <div className="features-list">

            <article className="feature-row">
              <div className="feature-number">01</div>

              <div>
                <h3>Fundus image analysis</h3>

                <p>
                  A retinal fundus image is provided to the model for
                  analysis of patterns associated with diabetic
                  retinopathy.
                </p>
              </div>

              <div className="feature-mark">+</div>
            </article>

            <article className="feature-row">
              <div className="feature-number">02</div>

              <div>
                <h3>Five-stage classification</h3>

                <p>
                  The model is designed to classify retinal images across
                  the stages of diabetic retinopathy.
                </p>
              </div>

              <div className="feature-mark">+</div>
            </article>

            <article className="feature-row">
              <div className="feature-number">03</div>

              <div>
                <h3>Visual explanation</h3>

                <p>
                  Grad-CAM can highlight regions of the retinal image that
                  contributed to the model's prediction.
                </p>
              </div>

              <div className="feature-mark">+</div>
            </article>

            <article className="feature-row">
              <div className="feature-number">04</div>

              <div>
                <h3>Prediction confidence</h3>

                <p>
                  The result includes the model's confidence score to
                  provide additional context when reviewing the prediction.
                </p>
              </div>

              <div className="feature-mark">+</div>
            </article>

          </div>
        </section>

        <footer className="home-footer">
          <div>
            <strong>RETO</strong>
            <span>Retinal screening support</span>
          </div>

          <p>
            AI-assisted screening does not replace professional medical
            assessment.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;