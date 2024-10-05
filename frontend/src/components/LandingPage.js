import React from 'react';

function LandingPage({ onStartProject }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to AI Coder</h1>
      <p>AI Coder is an advanced system that uses multiple AI agents to assist in software development projects.</p>
      <h2>Features:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>Multiple AI agents with predefined roles</li>
        <li>Project management and agent communication</li>
        <li>AI-driven code writing, reviewing, and testing</li>
        <li>Bug research and analysis</li>
      </ul>
      <button onClick={onStartProject} style={{ padding: '10px 20px', fontSize: '18px', marginTop: '20px' }}>
        Start a New Project
      </button>
    </div>
  );
}

export default LandingPage;