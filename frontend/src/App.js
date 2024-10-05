import React, { useState } from 'react';
import ProjectSelector from './components/ProjectSelector';
import AgentChat from './components/AgentChat';
import ProjectStatus from './components/ProjectStatus';
import CodeEditor from './components/CodeEditor';
import TestManager from './components/TestManager';
import LandingPage from './components/LandingPage';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleStartProject = () => {
    setShowLandingPage(false);
  };

  if (showLandingPage) {
    return <LandingPage onStartProject={handleStartProject} />;
  }

  return (
    <div className="App">
      <h1>AI Coder</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <ProjectSelector onSelectProject={setSelectedProject} />
          {selectedProject && <ProjectStatus project={selectedProject} />}
        </div>
        <div style={{ flex: 2 }}>
          {selectedProject && (
            <>
              <AgentChat projectId={selectedProject.id} />
              <CodeEditor projectId={selectedProject.id} />
              <TestManager projectId={selectedProject.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;