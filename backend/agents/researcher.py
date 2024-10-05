from .base_agent import BaseAgent

class Researcher(BaseAgent):
    def __init__(self, name):
        super().__init__(name, "Researcher")

    async def process_message(self, message):
        prompt = f"As a researcher, respond to the following message: {message}"
        return await self.generate_response(prompt)

    async def perform_task(self, task):
        prompt = f"As a researcher, perform the following task: {task}"
        return await self.generate_response(prompt)

    async def research_bug(self, bug_description):
        prompt = f"Research the following bug and provide possible solutions:\n\n{bug_description}"
        return await self.generate_response(prompt)

    async def find_solutions(self, problem):
        prompt = f"Find solutions for the following problem:\n\n{problem}"
        return await self.generate_response(prompt)

    async def analyze_code(self, code):
        prompt = f"Analyze the following code and provide insights:\n\n{code}"
        return await self.generate_response(prompt)

    async def suggest_improvements(self, code):
        prompt = f"Suggest improvements for the following code:\n\n{code}"
        return await self.generate_response(prompt)