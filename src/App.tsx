import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faMicroscope, faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Analytics from './Analytics';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      // State is automatically handled by useLocation
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToolChange = (tool: string | null) => {
    if (!tool) {
      navigate('/');
    } else {
      navigate(tool.toLowerCase().replace(/\s+/g, '-'));
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // UPDATED: Get active tool from URL - now includes Guides and Search
  const activeTool = location.pathname.includes('biochemical-calculator')
    ? 'Biochemical Calculator'
    : location.pathname.includes('gram-positive-roadmap')
      ? 'Gram Positive Roadmap'
      : location.pathname.includes('gram-negative-roadmap')
        ? 'Gram Negative Roadmap'
        : location.pathname.includes('obligate-anaerobe-roadmap')
          ? 'Obligate Anaerobe Roadmap'
        : location.pathname.includes('guides')
          ? 'Guides'
        : location.pathname.includes('search')
          ? 'Search'
          : null;

  return (
    <div className="app-container">
      <Analytics />
      <nav className="app-nav">
        <div className="nav-brand" onClick={() => handleToolChange(null)}>
          <FontAwesomeIcon icon={faMicroscope} />
          {!isMobile && <span>Learn Microbes</span>}
        </div>

        {/* UPDATED: Navigation links */}
        <div className="nav-links">
          <button
            className={!activeTool ? 'active' : ''}
            onClick={() => handleToolChange(null)}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button
            className={activeTool === 'Guides' ? 'active' : ''}
            onClick={() => navigate('/guides')}
          >
            <FontAwesomeIcon icon={faBook} /> Guides
          </button>
          <button
            className={activeTool === 'Search' ? 'active' : ''}
            onClick={() => navigate('/search')}
          >
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
        </div>
      </nav>

      <main className="app-main">
        {!activeTool ? (
          <div className="home-page">
            <h2>Welcome to Learn Microbes</h2>
            <p>Select a tool to get started:</p>

            <div className="tool-cards">
              <button
                className="tool-card calculator"
                onClick={() => handleToolChange('Biochemical Calculator')}
              >
                <span className="tool-icon">🧪</span>
                <h3>Enterics Biochemical Calculator</h3>
                <p>Identify Enteric organisms based on 24 biochemical tests</p>
              </button>

              <button
                className="tool-card gram-positive"
                onClick={() => handleToolChange('Gram Positive Roadmap')}
              >
                <span className="tool-icon">🟣</span>
                <h3>Gram Positive Roadmap</h3>
                <p>Interactive flowchart for Staph, Strep, and Bacillus identification with clinical pearls</p>
              </button>

              <button
                className="tool-card gram-negative"
                onClick={() => handleToolChange('Gram Negative Roadmap')}
              >
                <span className="tool-icon">🔴</span>
                <h3>Gram Negative Roadmap</h3>
                <p>Decision tree for enteric bacteria, Pseudomonas, and fastidious organisms</p>
              </button>

            <button
            className="tool-card anaerobe"
            onClick={() => handleToolChange('Obligate Anaerobe Roadmap')}
              >
            <span className="tool-icon">🔵</span>
            <h3>Obligate Anaerobe Roadmap</h3>
            <p>Identification guide for strict anaerobic bacteria using morphology, oxygen tolerance, and key biochemical tests</p>
            </button>
            </div>
          </div>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-about">
              <h3>About This Project</h3>
              <p>This free tool was created by a microbiology lab technologist to help students and professionals with bacterial identification. It's based on standard biochemical test patterns used in clinical laboratories.</p>
            </div>

            <div className="footer-socials">
              <h3>Connect With Me</h3>
              <div className="social-icons">
                <a href="https://instagram.com/franzescuzar" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575016503288" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i> Facebook
                </a>
                <a href="mailto:learnmicrobes@outlook.com?subject=Question%20About%20LearnMicrobes" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-envelope"></i> Email Us
                </a>
              </div>
            </div>

            <div className="footer-roadmap">
              <h3>What's Coming Next</h3>
              <ul>
                <li>✓ Current: Enterobacteriaceae ID</li>
                <li>✓ Current: Enterics ID Quiz Mode</li>
                <li>✓ Current: Gram-positive ID Tool</li>
                <li>✓ Current: Gram-negative ID Tool</li>
                <li>→ Future: Mobile App Version</li>
              </ul>
            </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; 2025 LearnMicrobes.com | Made for educational purposes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
