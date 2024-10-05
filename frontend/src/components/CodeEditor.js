import React, { useState } from 'react';

function CodeEditor({ projectId }) {
  const [code, setCode] = useState('');
  const [filePath, setFilePath] = useState('');
  const [task, setTask] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  const handleWriteCode = async () => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/projects/${projectId}/write_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_path: filePath, task }),
      });
      if (!res.ok) {
        throw new Error('Failed to write code');
      }
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error writing code:', error);
      setError('Failed to write code. Please try again.');
    }
  };

  const handleReviewCode = async () => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/projects/${projectId}/review_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_path: filePath }),
      });
      if (!res.ok) {
        throw new Error('Failed to review code');
      }
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error reviewing code:', error);
      setError('Failed to review code. Please try again.');
    }
  };

  return (
    <div className="code-editor">
      <h2>Code Editor</h2>
      <div>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          placeholder="File path"
          className="input-field"
        />
      </div>
      <div>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Describe the task"
          rows={4}
          className="textarea-field"
        />
      </div>
      <div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here"
          rows={10}
          className="textarea-field"
        />
      </div>
      <div>
        <button onClick={handleWriteCode} className="button">Write Code</button>
        <button onClick={handleReviewCode} className="button">Review Code</button>
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

export default CodeEditor;