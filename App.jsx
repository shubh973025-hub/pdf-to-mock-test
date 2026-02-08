
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
        question: lines[i],
        options: [lines[i + 1], lines[i + 2], lines[i + 3], lines[i + 4]],
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">PDF to Mock Test Converter</h1>

      <input type="file" accept="application/pdf" onChange={handlePDFUpload} />

      <div className="mt-6">
        {questions.map((q, qi) => (
          <div key={qi} className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="font-semibold">Q{qi + 1}. {q.question}</p>
            {q.options.map((opt, oi) => (
              <div key={oi} className="mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    onChange={() => handleSelect(qi, oi)}
                    disabled={submitted}
                  />
                  <span
                    className={
                      submitted && oi === q.correct
                        ? "text-green-600 font-semibold"
                        : submitted && answers[qi] === oi
                        ? "text-red-600"
                        : ""
                    }
                  >
                    {opt}
                  </span>
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      {questions.length > 0 && !submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Submit Test
        </button>
      )}

      {submitted && (
        <p className="mt-4 text-lg font-bold text-green-700">Test Submitted!</p>
      )}
    </div>
  );
}
