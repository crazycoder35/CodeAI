from .base_agent import BaseAgent

class ProjectOwner(BaseAgent):
    def __init__(self, name):
        super().__init__(name, "Project Owner")

    async def process_message(self, message):
        prompt = f"As a project owner, respond to the following message: {message}"
        return await self.generate_response(prompt)

    async def perform_task(self, task):
        prompt = f"As a project owner, perform the following task: {task}"
        return await self.generate_response(prompt)

    async def coordinate_agents(self, agents, task):
        prompt = f"As a project owner, coordinate the following agents: {', '.join(agents)} to perform this task: {task}"
        return await self.generate_response(prompt)