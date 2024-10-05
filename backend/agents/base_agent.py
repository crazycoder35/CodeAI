from abc import ABC, abstractmethod
from utils.ollama import OllamaClient

class BaseAgent(ABC):
    def __init__(self, name, role):
        self.name = name
        self.role = role
        self.ollama_client = OllamaClient()

    @abstractmethod
    async def process_message(self, message):
        pass

    async def generate_response(self, prompt):
        response = await self.ollama_client.generate("llama2", prompt)
        return response['response']

    @abstractmethod
    async def perform_task(self, task):
        pass