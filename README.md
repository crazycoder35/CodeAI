# AI Coder

AI Coder is an advanced system that uses multiple AI agents to assist in software development projects. It integrates with Ollama for natural language processing and provides a web-based interface for user interaction.

## Features

- Multiple AI agents with predefined roles (Project Owner, Developer, Tester, Researcher)
- Project management and agent communication
- Web-based UI for user interaction
- Integration with Ollama for NLP tasks
- AI-driven code writing, reviewing, and testing
- Bug research and analysis
- Inter-agent communication

## AI Agents

AI Coder utilizes four specialized AI agents to assist in various aspects of software development:

1. **Project Owner**: Manages high-level project coordination and decision-making.
2. **Developer**: Writes and reviews code, implements features, and refactors existing code.
3. **Tester**: Creates test cases, runs tests, and reports on test results.
4. **Researcher**: Investigates bugs, researches solutions, and suggests improvements.

These agents work together to provide a comprehensive software development assistance system.

## Prerequisites

Before setting up AI Coder, ensure you have the following installed on your system:

- Python 3.7 or higher
- Node.js 12 or higher
- npm (usually comes with Node.js)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/crazycoder35/CodeAI.git
   cd ai-coder
   ```

2. Install and set up Ollama:
   - Follow the instructions at [Ollama's official website](https://ollama.ai/) to install Ollama on your system.
   - Make sure Ollama is running and accessible at `http://localhost:11434`.

3. Configure the application:
   - Copy the `.env.example` file to `.env` and adjust the settings as needed.

## Running the Application

You can use the provided scripts to start both the frontend and backend concurrently:

- On Unix-based systems (Linux, macOS):
  ```
  ./start.sh
  ```

- On Windows:
  ```
  start.bat
  ```

The start scripts will:
1. Check for required dependencies (Python and Node.js).
2. Set up a virtual environment for the backend (if not already created).
3. Install backend dependencies.
4. Start the backend server.
5. Install frontend dependencies.
6. Start the frontend development server.

After running the start script, you should see messages indicating that both the backend and frontend are starting. The application will be accessible at:

- Backend: http://localhost:8000
- Frontend: http://localhost:3000

Alternatively, you can start the frontend and backend manually in separate terminal windows:

Terminal 1 (Backend):
```
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On Unix-based systems
pip install -r ..\requirements.txt
uvicorn main:app --reload
```

Terminal 2 (Frontend):
```
cd frontend
npm install
npm start
```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. You'll be greeted with a landing page. Click "Start a New Project" to begin.
3. Create a new project or select an existing one.
4. Use the chat interface to communicate with different AI agents:
   - Project Owner: For high-level project management and coordination
   - Developer: For writing and reviewing code
   - Tester: For creating test cases and running tests
   - Researcher: For researching bugs and suggesting improvements
5. Use the Code Editor to write and review code.
6. Use the Test Manager to create test cases and run tests.
7. Explore inter-agent communication for complex tasks.

## Configuration

You can customize the AI Coder behavior by modifying the `.env` file. Available options include:

- `OLLAMA_BASE_URL`: The base URL for the Ollama API
- `OLLAMA_MODEL`: The Ollama model to use for generation
- `PROJECT_ROOT`: The root directory for storing project files
- `API_HOST`: The host for the backend API server
- `API_PORT`: The port for the backend API server
- `LOG_LEVEL`: The logging level (e.g., INFO, DEBUG, WARNING)

## Project Structure

- `backend/`: Contains the FastAPI backend server and AI agent implementations
- `frontend/`: Contains the React frontend application
- `requirements.txt`: Python dependencies for the backend
- `.env.example`: Example configuration file
- `start.sh`: Shell script to start both frontend and backend (Unix-based systems)
- `start.bat`: Batch file to start both frontend and backend (Windows)
- `LICENSE`: MIT License file
- `CONTRIBUTING.md`: Guidelines for contributing to the project

## Troubleshooting

- If you encounter issues with Ollama, ensure that the Ollama service is running and accessible at the specified URL in your `.env` file.
- For frontend issues, check the browser console for any error messages.
- If the backend fails to start, verify that all required dependencies are installed and that there are no conflicts in the `requirements.txt` file.
- Ensure that the `PROJECT_ROOT` path in the `.env` file is set correctly and that the application has write permissions to this directory.
- If the start scripts fail:
  - Ensure Python and Node.js are correctly installed and accessible from the command line.
  - Try running the frontend and backend manually in separate terminal windows as described in the "Running the Application" section.
  - Check the console output for any error messages that might indicate the cause of the failure.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This project uses AI-generated content. While efforts are made to ensure accuracy and quality, the generated content should be reviewed and validated by human experts before use in production environments.
