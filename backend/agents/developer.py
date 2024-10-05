from .base_agent import BaseAgent
import os

class Developer(BaseAgent):
    def __init__(self, name):
        super().__init__(name, "Developer")

    async def process_message(self, message):
        prompt = f"As a developer, respond to the following message: {message}"
        return await self.generate_response(prompt)

    async def perform_task(self, task):
        prompt = f"As a developer, perform the following task: {task}"
        return await self.generate_response(prompt)

    async def write_code(self, file_path, task):
        prompt = f"Write code for the following task: {task}. Provide only the code, no explanations."
        code = await self.generate_response(prompt)
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w') as f:
            f.write(code)
        
        return f"Code written to {file_path}"

    async def review_code(self, file_path):
        with open(file_path, 'r') as f:
            code = f.read()
        
        prompt = f"Review the following code and provide feedback:\n\n{code}"
        return await self.generate_response(prompt)