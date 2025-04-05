import React from 'react';
import './ToolBox.css';

interface ToolBoxProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ToolBox: React.FC<ToolBoxProps> = ({ title, icon, children, onClose }) => {
  return (
    <div className="tool-box">
      <div className="tool-box-header">
        <h2>
          <span className="tool-icon">{icon}</span>
          {title}
        </h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="tool-box-content">
        {children}
      </div>
    </div>
  );
};

export default ToolBox;