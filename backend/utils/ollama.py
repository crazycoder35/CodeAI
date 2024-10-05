import aiohttp
from config import config
import logging

logger = logging.getLogger(__name__)

class OllamaClient:
    def __init__(self):
        self.base_url = config.OLLAMA_BASE_URL
        self.model = config.OLLAMA_MODEL

    async def generate(self, prompt):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(f"{self.base_url}/api/generate", json={
                    "model": self.model,
                    "prompt": prompt
                }) as response:
                    if response.status == 200:
                        return await response.json()
                    else:
                        logger.error(f"Ollama API error: {response.status}")
                        return {"error": f"Ollama API returned status code {response.status}"}
            except aiohttp.ClientError as e:
                logger.error(f"Error connecting to Ollama API: {str(e)}")
                return {"error": "Failed to connect to Ollama API"}

# TODO: Add more Ollama API interactions as needed