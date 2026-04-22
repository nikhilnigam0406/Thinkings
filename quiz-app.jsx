import { useState, useEffect, useRef, useCallback } from "react";

const QUESTIONS = [
  {
    question: "Which is used to find and fix bugs in the Java programs?",
    options: ["JVM", "JDB", "JDK", "JRE"],
    answer: "JDB",
  },
  {
    question: "Type IV JDBC driver is a driver?",
    options: ["which communicates through Java sockets", "Object", "long", "void"],
    answer: "which communicates through Java sockets",
  },
  {
    question: "Which package contains the Random class?",
    options: ["java.util package", "java.lang package", "java.awt package", "java.io package"],
    answer: "java.util package",
  },
  {
    question: "An interface with no fields or methods is known as?",
    options: ["Runnable Interface", "Abstract Interface", "Marker Interface", "CharSequence Interface"],
    answer: "Marker Interface",
  },
  {
    question: "In which memory a String is stored, when we create a string using new operator?",
    options: ["Stack", "String memory", "Random storage space", "Heap memory"],
    answer: "Heap memory",
  },
  {
    question: "Which of the following is a marker interface?",
    options: ["Runnable interface", "Remote interface", "Readable interface", "Result interface"],
    answer: "Remote interface",
  },
  {
    question: "Which keyword is used for accessing the features of a package?",
    options: ["import", "package", "extends", "export"],
    answer: "import",
  },
  {
    question: "In java, jar stands for?",
    options: ["Java Archive Runner", "Java Archive", "Java Application Resource", "Java Application Runner"],
    answer: "Java Archive",
  },
  {
    question: "Which of the following is a mutable class in java?",
    options: ["java.lang.StringBuilder", "java.lang.Short", "java.lang.Byte", "java.lang.String"],
    answer: "java.lang.StringBuilder",
  },
  {
    question: "Which of the following option leads to the portability and security of Java?",
    options: [
      "Bytecode is executed by JVM",
      "The applet makes the Java code secure and portable",
      "Use of exception handling",
      "Dynamic binding between objects",
    ],
    answer: "Bytecode is executed by JVM",
  },
];

const RULES = [
  "You are trained to be a programmer and not a story teller — answer point to point.",
  "Do not unnecessarily smile at the person sitting next to you, they may also not know the answer.",
  "You may have lot of options in life but here all the questions are compulsory.",
  "Crying is allowed but please do so quietly.",
  "Only a fool asks and a wise answers. Be wise, not otherwise.",
  "Do not get nervous if your friend is answering more questions — maybe they're doing Jai Mata Di.",
  "Brace yourself, this paper is not for the faint hearted.",
  "May you know more than what Jon Snow knows. Good Luck!",
];

const TIMER_MAX = 15;

// --- Floating particles background ---
function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${8 + (i % 5) * 6}px`,
            height: `${8 + (i % 5) * 6}px`,
            borderRadius: "50%",
            background: `rgba(${i % 2 === 0 ? "139,92,246" : "99,102,241"},${0.08 + (i % 4) * 0.05})`,
            left: `${(i * 37 + 5) % 100}%`,
            top: `${(i * 53 + 10) % 100}%`,
            animation: `floatParticle ${6 + (i % 5) * 2}s ease-in-out ${i * 0.4}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatParticle {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-30px) scale(1.15); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.85); }
          70% { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes timerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scoreReveal {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          60% { transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>
    </div>
  );
}

// ---- LOGIN ----
function Login({ onNext }) {
  const [name, setName] = useState("");
  const [shake, setShake] = useState(false);

  function handleSubmit() {
    if (!name.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onNext(name.trim());
  }

  return (
    <div style={styles.page}>
      <Particles />
      <div style={{ ...styles.card, animation: "popIn 0.6s cubic-bezier(.34,1.56,.64,1) both", maxWidth: 460 }}>
        <div style={styles.logoRing}>
          <span style={{ fontSize: 36 }}>🧠</span>
        </div>
        <h1 style={styles.brand}>Thinkings</h1>
        <p style={styles.tagline}>Test your Java knowledge</p>

        <label style={styles.label}>Your Name</label>
        <input
          style={{
            ...styles.input,
            ...(shake ? { animation: "timerPulse 0.1s 5", border: "2px solid #f87171" } : {}),
          }}
          placeholder="Enter your name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />

        <button style={styles.btnPrimary} onClick={handleSubmit}>
          View Rules →
        </button>
      </div>
    </div>
  );
}

// ---- RULES ----
function Rules({ name, onStart, onBack }) {
  return (
    <div style={styles.page}>
      <Particles />
      <div style={{ ...styles.card, animation: "fadeSlideIn 0.5s ease both", maxWidth: 640 }}>
        <h2 style={{ ...styles.brand, fontSize: 26, marginBottom: 4 }}>Welcome, {name}! 👋</h2>
        <p style={{ ...styles.tagline, marginBottom: 24 }}>Read the rules before you begin</p>

        <div style={styles.rulesList}>
          {RULES.map((r, i) => (
            <div key={i} style={{ ...styles.ruleItem, animationDelay: `${i * 0.06}s` }}>
              <span style={styles.ruleNum}>{i + 1}</span>
              <span style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{r}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button style={styles.btnSecondary} onClick={onBack}>← Back</button>
          <button style={{ ...styles.btnPrimary, flex: 1 }} onClick={onStart}>Start Quiz 🚀</button>
        </div>
      </div>
    </div>
  );
}

// ---- QUIZ ----
function Quiz({ name, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(10).fill(null));
  const [timer, setTimer] = useState(TIMER_MAX);
  const [lifelineUsed, setLifelineUsed] = useState(false);
  const [hiddenOpts, setHiddenOpts] = useState([]);
  const [timeUp, setTimeUp] = useState(false);
  const timerRef = useRef(null);

  const q = QUESTIONS[current];

  const advance = useCallback(
    (ans, idx) => {
      clearInterval(timerRef.current);
      const updated = [...userAnswers];
      updated[idx] = ans;
      if (idx === 9) {
        const sc = updated.reduce(
          (acc, a, i) => acc + (a === QUESTIONS[i].answer ? 10 : 0),
          0
        );
        onFinish(sc, updated);
      } else {
        setUserAnswers(updated);
        setCurrent(idx + 1);
        setSelected(null);
        setHiddenOpts([]);
        setTimeUp(false);
        setTimer(TIMER_MAX);
      }
    },
    [userAnswers, onFinish]
  );

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimeUp(true);
          setTimeout(() => advance(null, current), 900);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  function handleNext() {
    advance(selected, current);
  }

  function handleLifeline() {
    if (lifelineUsed) return;
    setLifelineUsed(true);
    const wrong = q.options
      .filter((o) => o !== q.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    setHiddenOpts(wrong);
    if (selected && wrong.includes(selected)) setSelected(null);
  }

  const isLast = current === 9;
  const pct = ((current) / 10) * 100;
  const timerColor = timer > 8 ? "#34d399" : timer > 4 ? "#fbbf24" : "#f87171";

  return (
    <div style={styles.page}>
      <Particles />
      <div style={{ ...styles.card, animation: "fadeSlideIn 0.4s ease both", maxWidth: 700 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: "#94a3b8", fontSize: 13, fontFamily: "DM Sans, sans-serif" }}>
            Question {current + 1} of 10
          </span>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: timerColor,
              fontFamily: "Syne, sans-serif",
              animation: timer <= 5 ? "timerPulse 0.6s infinite" : "none",
              minWidth: 60,
              textAlign: "right",
            }}
          >
            {timeUp ? "⏰ Time's up!" : `⏱ ${timer}s`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${pct}%` }} />
        </div>

        {/* Question */}
        <div style={styles.questionBox}>
          <span style={styles.qNum}>{current + 1}.</span>
          <span style={{ color: "#f1f5f9", fontSize: 17, fontFamily: "DM Sans, sans-serif", lineHeight: 1.6 }}>
            {q.question}
          </span>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {q.options.map((opt, i) => {
            const hidden = hiddenOpts.includes(opt);
            const isSelected = selected === opt;
            return (
              <button
                key={i}
                disabled={hidden}
                onClick={() => !hidden && setSelected(opt)}
                style={{
                  ...styles.optionBtn,
                  ...(hidden ? styles.optionHidden : {}),
                  ...(isSelected ? styles.optionSelected : {}),
                  animationDelay: `${i * 0.07}s`,
                }}
              >
                <span style={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                <span style={{ flex: 1, textAlign: "left" }}>{opt}</span>
                {isSelected && <span>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            style={{ ...styles.btnLifeline, ...(lifelineUsed ? styles.btnDisabled : {}) }}
            onClick={handleLifeline}
            disabled={lifelineUsed}
          >
            {lifelineUsed ? "50-50 Used" : "🪄 50-50 Lifeline"}
          </button>
          <button
            style={{ ...styles.btnPrimary, flex: 1 }}
            onClick={handleNext}
          >
            {isLast ? "Submit 🎯" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- SCORE ----
function Score({ name, score, answers, onPlayAgain }) {
  const pct = Math.round((score / 100) * 100);
  const grade =
    score >= 90 ? { label: "Java Genius 🏆", color: "#f59e0b" }
    : score >= 70 ? { label: "Strong Coder 💪", color: "#34d399" }
    : score >= 50 ? { label: "Getting There 📚", color: "#60a5fa" }
    : { label: "Keep Practicing 🔁", color: "#f87171" };

  return (
    <div style={styles.page}>
      <Particles />
      <div style={{ ...styles.card, animation: "popIn 0.7s cubic-bezier(.34,1.56,.64,1) both", maxWidth: 560, textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 8, animation: "scoreReveal 0.8s ease both" }}>
          {score >= 70 ? "🎉" : score >= 40 ? "👏" : "😅"}
        </div>
        <h2 style={{ ...styles.brand, fontSize: 22, marginBottom: 4 }}>Thank you, {name}!</h2>
        <p style={{ color: "#94a3b8", fontFamily: "DM Sans, sans-serif", marginBottom: 24 }}>
          Here's how you performed on <strong style={{ color: "#a78bfa" }}>Thinkings</strong>
        </p>

        {/* Score ring */}
        <div style={styles.scoreRing}>
          <span style={styles.scoreBig}>{score}</span>
          <span style={styles.scoreMax}>/100</span>
        </div>

        <div style={{ ...styles.gradeBadge, background: grade.color + "22", color: grade.color }}>
          {grade.label}
        </div>

        {/* Answer review */}
        <div style={{ marginTop: 24, textAlign: "left" }}>
          {QUESTIONS.map((q, i) => {
            const ua = answers[i];
            const correct = ua === q.answer;
            return (
              <div key={i} style={{ ...styles.reviewRow, borderColor: correct ? "#34d39933" : "#f8717133" }}>
                <span style={{ color: correct ? "#34d399" : "#f87171", fontSize: 16 }}>{correct ? "✓" : "✗"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#cbd5e1", fontSize: 12, marginBottom: 2 }}>{q.question}</div>
                  {!correct && ua && (
                    <div style={{ color: "#f87171", fontSize: 11 }}>Your answer: {ua}</div>
                  )}
                  {!correct && (
                    <div style={{ color: "#34d399", fontSize: 11 }}>Correct: {q.answer}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button style={{ ...styles.btnPrimary, marginTop: 24, width: "100%" }} onClick={onPlayAgain}>
          🔁 Play Again
        </button>
      </div>
    </div>
  );
}

// ---- MAIN APP ----
export default function App() {
  const [screen, setScreen] = useState("login");
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  function handleLogin(n) { setName(n); setScreen("rules"); }
  function handleStart() { setScreen("quiz"); }
  function handleBack() { setScreen("login"); }
  function handleFinish(sc, ans) { setScore(sc); setAnswers(ans); setScreen("score"); }
  function handlePlayAgain() { setScreen("login"); setName(""); }

  return (
    <div style={{ fontFamily: "Syne, sans-serif", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090f; }
        button { cursor: pointer; border: none; outline: none; }
        input { outline: none; }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes floatParticle {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-30px) scale(1.15); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.85); }
          70% { transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes timerPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes scoreReveal {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          60% { transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes optionReveal {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {screen === "login" && <Login onNext={handleLogin} />}
      {screen === "rules" && <Rules name={name} onStart={handleStart} onBack={handleBack} />}
      {screen === "quiz" && <Quiz key={name} name={name} onFinish={handleFinish} />}
      {screen === "score" && <Score name={name} score={score} answers={answers} onPlayAgain={handlePlayAgain} />}
    </div>
  );
}

// ---- STYLES ----
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at 20% 30%, #1e1040 0%, #09090f 60%, #0c0a1a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    position: "relative",
  },
  card: {
    background: "rgba(15,12,35,0.85)",
    border: "1px solid rgba(139,92,246,0.18)",
    borderRadius: 20,
    padding: "36px 36px",
    width: "100%",
    backdropFilter: "blur(16px)",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
    position: "relative",
    zIndex: 1,
  },
  logoRing: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 0 30px rgba(124,58,237,0.5)",
  },
  brand: {
    fontFamily: "Syne, sans-serif",
    fontWeight: 800,
    fontSize: 34,
    background: "linear-gradient(135deg, #a78bfa, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
    letterSpacing: "-0.5px",
    marginBottom: 8,
  },
  tagline: {
    color: "#64748b",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 28,
  },
  label: {
    display: "block",
    color: "#94a3b8",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1.5px solid rgba(139,92,246,0.25)",
    borderRadius: 12,
    padding: "13px 16px",
    color: "#f1f5f9",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 16,
    marginBottom: 20,
    transition: "border-color 0.2s",
  },
  btnPrimary: {
    width: "100%",
    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
    color: "#fff",
    fontFamily: "Syne, sans-serif",
    fontWeight: 700,
    fontSize: 15,
    padding: "13px 24px",
    borderRadius: 12,
    transition: "opacity 0.2s, transform 0.15s",
    boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
    letterSpacing: "0.02em",
  },
  btnSecondary: {
    background: "rgba(255,255,255,0.06)",
    color: "#94a3b8",
    fontFamily: "Syne, sans-serif",
    fontWeight: 600,
    fontSize: 14,
    padding: "13px 20px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "background 0.2s",
  },
  btnLifeline: {
    background: "rgba(251,191,36,0.12)",
    color: "#fbbf24",
    fontFamily: "Syne, sans-serif",
    fontWeight: 700,
    fontSize: 13,
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid rgba(251,191,36,0.25)",
    transition: "opacity 0.2s",
  },
  btnDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  rulesList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  ruleItem: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    animation: "fadeSlideIn 0.4s ease both",
  },
  ruleNum: {
    minWidth: 26,
    height: 26,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed44, #4f46e544)",
    border: "1px solid rgba(139,92,246,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a78bfa",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "Syne, sans-serif",
  },
  progressTrack: {
    height: 4,
    background: "rgba(255,255,255,0.07)",
    borderRadius: 99,
    marginBottom: 22,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #7c3aed, #818cf8)",
    borderRadius: 99,
    transition: "width 0.5s ease",
  },
  questionBox: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  qNum: {
    color: "#a78bfa",
    fontFamily: "Syne, sans-serif",
    fontWeight: 800,
    fontSize: 20,
    minWidth: 30,
  },
  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.035)",
    border: "1.5px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding: "13px 16px",
    color: "#cbd5e1",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 0.18s",
    animation: "optionReveal 0.35s ease both",
    textAlign: "left",
    width: "100%",
  },
  optionSelected: {
    background: "rgba(124,58,237,0.18)",
    border: "1.5px solid rgba(139,92,246,0.6)",
    color: "#a78bfa",
  },
  optionHidden: {
    opacity: 0.2,
    pointerEvents: "none",
    textDecoration: "line-through",
  },
  optionLetter: {
    minWidth: 28,
    height: 28,
    borderRadius: 8,
    background: "rgba(139,92,246,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#818cf8",
    fontSize: 12,
    fontWeight: 800,
    fontFamily: "Syne, sans-serif",
  },
  scoreRing: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "conic-gradient(#7c3aed 0%, #818cf8 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    boxShadow: "0 0 50px rgba(124,58,237,0.4)",
    animation: "scoreReveal 0.8s ease both",
  },
  scoreBig: {
    fontFamily: "Syne, sans-serif",
    fontWeight: 800,
    fontSize: 42,
    color: "#fff",
    lineHeight: 1,
  },
  scoreMax: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    fontFamily: "DM Sans, sans-serif",
  },
  gradeBadge: {
    display: "inline-block",
    padding: "6px 18px",
    borderRadius: 99,
    fontFamily: "Syne, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: "0.03em",
    margin: "0 auto",
  },
  reviewRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: "10px 0",
    borderBottom: "1px solid",
  },
};
