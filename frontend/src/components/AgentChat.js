import React, { useState } from 'react';

function AgentChat({ projectId }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('project_owner');
  const [error, setError] = useState(null);

  const agents = ['project_owner', 'developer', 'tester', 'researcher'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setError(null);
    setChatHistory(prev => [...prev, { sender: 'User', content: message, agent: selectedAgent }]);

    try {
      const response = await fetch(`http://localhost:8000/projects/${projectId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message, agent: selectedAgent }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { sender: 'AI', content: data.response, agent: selectedAgent }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    }

    setMessage('');
  };

  const handleInterAgentCommunication = async () => {
    setError(null);
    const fromAgent = selectedAgent;
    const toAgent = agents.find(agent => agent !== selectedAgent);

    try {
      const response = await fetch(`http://localhost:8000/projects/${projectId}/inter_agent_communication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from_agent: fromAgent, to_agent: toAgent, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to communicate between agents');
      }

      const data = await response.json();
      setChatHistory(prev => [
        ...prev,
        { sender: 'User', content: `${fromAgent} to ${toAgent}: ${message}`, agent: fromAgent },
        { sender: 'AI', content: data.response, agent: toAgent }
      ]);
    } catch (error) {
      console.error('Error in inter-agent communication:', error);
      setError('Failed to communicate between agents. Please try again.');
    }

    setMessage('');
  };

  return (
    <div>
      <h2>Chat with Agents</h2>
      <div>
        <label htmlFor="agent-select">Select Agent: </label>
        <select
          id="agent-select"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          {agents.map(agent => (
            <option key={agent} value={agent}>{agent}</option>
          ))}
        </select>
      </div>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
        {chatHistory.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender} ({msg.agent}):</strong> {msg.content}
          </div>
        ))}
      </div>
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '70%', marginRight: '10px' }}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={handleInterAgentCommunication}>Inter-Agent Communication</button>
      </form>
    </div>
  );
}

export default AgentChat;