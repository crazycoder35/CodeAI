import React, { useState } from 'react';

function TestManager({ projectId }) {
  const [testFilePath, setTestFilePath] = useState('');
  const [codeFilePath, setCodeFilePath] = useState('');
  const [requirements, setRequirements] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  const handleCreateTestCases = async () => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/projects/${projectId}/create_test_cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_path: testFilePath, requirements }),
      });
      if (!res.ok) {
        throw new Error('Failed to create test cases');
      }
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error creating test cases:', error);
      setError('Failed to create test cases. Please try again.');
    }
  };

  const handleRunTests = async () => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/projects/${projectId}/run_tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code_file: codeFilePath, test_file: testFilePath }),
      });
      if (!res.ok) {
        throw new Error('Failed to run tests');
      }
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error running tests:', error);
      setError('Failed to run tests. Please try again.');
    }
  };

  return (
    <div className="test-manager">
      <h2>Test Manager</h2>
      <div>
        <input
          type="text"
          value={testFilePath}
          onChange={(e) => setTestFilePath(e.target.value)}
          placeholder="Test file path"
          className="input-field"
        />
      </div>
      <div>
        <input
          type="text"
          value={codeFilePath}
          onChange={(e) => setCodeFilePath(e.target.value)}
          placeholder="Code file path"
          className="input-field"
        />
      </div>
      <div>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Enter requirements for test cases"
          rows={4}
          className="textarea-field"
        />
      </div>
      <div>
        <button onClick={handleCreateTestCases} className="button">Create Test Cases</button>
        <button onClick={handleRunTests} className="button">Run Tests</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default TestManager;