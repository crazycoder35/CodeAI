from .base_agent import BaseAgent
import os

class Tester(BaseAgent):
    def __init__(self, name):
        super().__init__(name, "Tester")

    async def process_message(self, message):
        prompt = f"As a tester, respond to the following message: {message}"
        return await self.generate_response(prompt)

    async def perform_task(self, task):
        prompt = f"As a tester, perform the following task: {task}"
        return await self.generate_response(prompt)

    async def create_test_cases(self, file_path, requirements):
        prompt = f"Create test cases for the following requirements:\n\n{requirements}\n\nProvide only the test cases, no explanations."
        test_cases = await self.generate_response(prompt)
        
        # Ensure the directory exists
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w') as f:
            f.write(test_cases)
        
        return f"Test cases written to {file_path}"

    async def run_tests(self, code_file, test_file):
        with open(code_file, 'r') as f:
            code = f.read()
        
        with open(test_file, 'r') as f:
            tests = f.read()
        
        prompt = f"Given the following code:\n\n{code}\n\nAnd the following tests:\n\n{tests}\n\nRun the tests and provide the results."
        return await self.generate_response(prompt)

    async def report_results(self, test_results):
        prompt = f"Analyze the following test results and provide a summary report:\n\n{test_results}"
        return await self.generate_response(prompt)