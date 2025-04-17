// tools/GramPositiveRoadmap/Roadmap.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Positive.css";

type Step = {
  id: string;
  question: string;
  options: {
    answer: string;
    nextStep: string | null; // null means we've reached a conclusion
    result?: string; // Only for final steps
  }[];
  explanation?: string;
};

const roadmapData: Step[] = [
  {
    id: "start",
    question:
      "Gram stain shows Gram-positive organisms. Is the organism catalase positive?",
    options: [
      {
        answer: "Yes",
        nextStep: "catalase-positive",
      },
      {
        answer: "No",
        nextStep: "catalase-negative",
      },
    ],
    explanation:
      "Catalase test differentiates between staphylococci (positive) and streptococci/enterococci (negative).",
  },
  {
    id: "catalase-positive",
    question: "Catalase positive. Is the organism coagulase positive?",
    options: [
      {
        answer: "Yes",
        nextStep: null,
        result: "Staphylococcus aureus (coagulase positive)",
      },
      {
        answer: "No",
        nextStep: "coag-neg-staph",
        result:
          "Coagulase-negative staphylococci (e.g., S. epidermidis, S. saprophyticus)",
      },
    ],
  },
  {
    id: "coag-neg-staph",
    question:
      "For coagulase-negative staphylococci, is the organism novobiocin sensitive?",
    options: [
      {
        answer: "Yes",
        nextStep: null,
        result: "Staphylococcus epidermidis (novobiocin sensitive)",
      },
      {
        answer: "No",
        nextStep: null,
        result: "Staphylococcus saprophyticus (novobiocin resistant)",
      },
    ],
  },
  {
    id: "catalase-negative",
    question: "Catalase negative. Does the organism show beta-hemolysis?",
    options: [
      {
        answer: "Yes",
        nextStep: "beta-hemolytic",
      },
      {
        answer: "No (alpha or gamma)",
        nextStep: "non-beta-hemolytic",
      },
    ],
  },
  // Add more steps here following the same pattern
  // This is just a basic structure - you'll want to expand this significantly
];

export default function GramPositiveRoadmap() {
  const [currentStepId, setCurrentStepId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  const currentStep =
    roadmapData.find((step) => step.id === currentStepId) || roadmapData[0];

  const handleOptionSelect = (nextStep: string | null) => {
    if (nextStep) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(nextStep);
    } else {
      // Reached a conclusion
      setHistory([...history, currentStepId]);
      setCurrentStepId("conclusion");
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1];
      setCurrentStepId(previousStep);
      setHistory(history.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentStepId("start");
    setHistory([]);
  };

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <h2>Gram Positive Identification Roadmap</h2>
        <p>Follow the dichotomous key to identify your organism</p>
      </div>

      <div className="roadmap-card">
        {currentStepId === "conclusion" ? (
          <div className="conclusion">
            <h3>Likely Organism:</h3>
            <p className="result-text">
              {currentStep.options.find((opt) => opt.nextStep === null)?.result}
            </p>
            <button className="reset-btn" onClick={handleReset}>
              Start Over
            </button>
          </div>
        ) : (
          <>
            <div className="step-question">
              <h3>{currentStep.question}</h3>
              {currentStep.explanation && (
                <p className="explanation">{currentStep.explanation}</p>
              )}
            </div>

            <div className="step-options">
              {currentStep.options.map((option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleOptionSelect(option.nextStep)}
                >
                  {option.answer}
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
