
import React, { useState } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();

    const lines = text.split("\n").filter((l) => l.trim() !== "");
    const parsed = [];
    for (let i = 0; i < lines.length; i += 5) {
      parsed.push({
        question: lines[i] || "",
        options: [
          lines[i + 1] || "",
          lines[i + 2] || "",
          lines[i + 3] || "",
          lines[i + 4] || "",
        ],
        correct: 0,
      });
    }
    setQuestions(parsed);
  };

  const handleSelect = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>PDF to Mock Test Converter</h2>
      <input type="file" accept="application/pdf" onChange={handlePDFUpload} />

      <div style={{ marginTop: 20 }}>
        {questions.map((q, qi) => (
          <div key={qi} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
            <p><b>Q{qi + 1}. {q.question}</b></p>
            {q.options.map((opt, oi) => (
              <div key={oi}>
                <label>
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    onChange={() => handleSelect(qi, oi)}
                    disabled={submitted}
                  />
                  <span style={{
                    color: submitted && oi === q.correct ? "green" :
                           submitted && answers[qi] === oi ? "red" : "black",
                    fontWeight: submitted && oi === q.correct ? "bold" : "normal"
                  }}>
                    {opt}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      {questions.length > 0 && !submitted && (
        <button onClick={handleSubmit}>Submit Test</button>
      )}

      {submitted && <p><b>Test Submitted!</b></p>}
    </div>
  );
}
