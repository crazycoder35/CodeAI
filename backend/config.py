import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Ollama settings
    OLLAMA_BASE_URL = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
    OLLAMA_MODEL = os.getenv('OLLAMA_MODEL', 'llama2')

    # Project settings
    PROJECT_ROOT = os.getenv('PROJECT_ROOT', 'c:/Users/huseb/Documents/AIProjects/ai_coder/projects')

    # API settings
    API_HOST = os.getenv('API_HOST', '0.0.0.0')
    API_PORT = int(os.getenv('API_PORT', 8000))

    # Logging settings
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

config = Config()