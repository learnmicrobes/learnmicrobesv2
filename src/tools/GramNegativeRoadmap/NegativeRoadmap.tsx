import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gramNegativeRoadmap } from './gnrdata';
import ToolBox from '../../components/ToolBox/ToolBox';
import './Negative.css';

const NegativeRoadmap: React.FC = () => {
  const [currentStepId, setCurrentStepId] = useState('start');
  const [history, setHistory] = useState<string[]>(['start']);
  const [currentConclusion, setCurrentConclusion] = useState('');
  const navigate = useNavigate();

  const currentStep = gramNegativeRoadmap.find(step => step.id === currentStepId) || gramNegativeRoadmap[0];

  const handleOptionSelect = (nextStep: string | null, conclusion?: string) => {
    if (nextStep) {
      setHistory([...history, nextStep]);
      setCurrentStepId(nextStep);
      setCurrentConclusion('');
    } else if (conclusion) {
      setCurrentConclusion(conclusion);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentStepId(newHistory[newHistory.length - 1]);
      setCurrentConclusion('');
    }
  };

  const handleReset = () => {
    setCurrentStepId('start');
    setHistory(['start']);
    setCurrentConclusion('');
  };

  const renderOptions = () => {
    return (
      <div className={`options-container ${currentStep.options.length > 2 ? 'grid-layout' : 'binary-layout'}`}>
        {currentStep.options.map((option, index) => (
          <div
            key={index}
            className="option-card"
            onClick={() => handleOptionSelect(option.nextStep, option.conclusion)}
          >
            <h3>{option.text}</h3>
            {option.tests && (
              <p className="option-tests">{option.tests.join(', ')}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ToolBox
      title="Gram Negative Identification"
      icon="🔴" // Red icon for negative
      onClose={() => navigate('/')}
    >
      <div className="roadmap-container">
        {currentConclusion ? (
          <div className="conclusion-panel">
            <h3>Identification Complete</h3>
            <div className="result-text">
              {currentConclusion}
            </div>
            <div className="nav-buttons">
              <button className="nav-btn back-btn" onClick={handleBack}>
                Back
              </button>
              <button className="nav-btn next-btn" onClick={handleReset}>
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="current-question">
              <h3>{currentStep.question}</h3>
            </div>

            {renderOptions()}

            <div className="nav-buttons">
              <button
                className="nav-btn back-btn"
                onClick={handleBack}
                disabled={history.length <= 1}
              >
                Back
              </button>
              <button
                className="nav-btn next-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </ToolBox>
  );
};

export default NegativeRoadmap;
