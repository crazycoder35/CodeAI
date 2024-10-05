from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import uuid
import os
import logging

from models.project import Project, ProjectCreate
from agents.project_owner import ProjectOwner
from agents.developer import Developer
from agents.tester import Tester
from agents.researcher import Researcher
from config import config

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Setup logging
logging.basicConfig(level=config.LOG_LEVEL)
logger = logging.getLogger(__name__)

# In-memory storage for projects and agents
projects: Dict[str, Project] = {}
agents: Dict[str, Dict[str, BaseAgent]] = {}

@app.get("/")
async def root():
    return {"message": "Welcome to AI Coder API"}

@app.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    project_id = str(uuid.uuid4())
    new_project = Project(
        id=project_id,
        name=project.name,
        description=project.description,
        path=os.path.join(config.PROJECT_ROOT, project.name),
        agents=["project_owner", "developer", "tester", "researcher"]
    )
    projects[project_id] = new_project
    
    # Create agents for the project
    agents[project_id] = {
        "project_owner": ProjectOwner("Project Owner"),
        "developer": Developer("Developer"),
        "tester": Tester("Tester"),
        "researcher": Researcher("Researcher")
    }
    
    # Create project directory
    os.makedirs(new_project.path, exist_ok=True)
    
    logger.info(f"Created new project: {new_project.name}")
    return new_project

@app.get("/projects", response_model=List[Project])
async def get_projects():
    return list(projects.values())

@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    return projects[project_id]

class Message(BaseModel):
    content: str
    agent: str

@app.post("/projects/{project_id}/chat")
async def chat_with_agent(project_id: str, message: Message):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    if message.agent not in agents[project_id]:
        logger.warning(f"Invalid agent specified: {message.agent}")
        raise HTTPException(status_code=400, detail="Invalid agent specified")
    
    agent = agents[project_id][message.agent]
    response = await agent.process_message(message.content)
    return {"response": response}

@app.post("/projects/{project_id}/task")
async def perform_task(project_id: str, message: Message):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    if message.agent not in agents[project_id]:
        logger.warning(f"Invalid agent specified: {message.agent}")
        raise HTTPException(status_code=400, detail="Invalid agent specified")
    
    agent = agents[project_id][message.agent]
    response = await agent.perform_task(message.content)
    return {"response": response}

@app.post("/projects/{project_id}/write_code")
async def write_code(project_id: str, file_path: str, task: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    developer = agents[project_id]["developer"]
    full_path = os.path.join(projects[project_id].path, file_path)
    response = await developer.write_code(full_path, task)
    logger.info(f"Code written to {full_path}")
    return {"response": response}

@app.post("/projects/{project_id}/review_code")
async def review_code(project_id: str, file_path: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    developer = agents[project_id]["developer"]
    full_path = os.path.join(projects[project_id].path, file_path)
    response = await developer.review_code(full_path)
    logger.info(f"Code reviewed: {full_path}")
    return {"response": response}

@app.post("/projects/{project_id}/create_test_cases")
async def create_test_cases(project_id: str, file_path: str, requirements: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    tester = agents[project_id]["tester"]
    full_path = os.path.join(projects[project_id].path, file_path)
    response = await tester.create_test_cases(full_path, requirements)
    logger.info(f"Test cases created: {full_path}")
    return {"response": response}

@app.post("/projects/{project_id}/run_tests")
async def run_tests(project_id: str, code_file: str, test_file: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    tester = agents[project_id]["tester"]
    code_path = os.path.join(projects[project_id].path, code_file)
    test_path = os.path.join(projects[project_id].path, test_file)
    response = await tester.run_tests(code_path, test_path)
    logger.info(f"Tests run for {code_path}")
    return {"response": response}

@app.post("/projects/{project_id}/research_bug")
async def research_bug(project_id: str, bug_description: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    researcher = agents[project_id]["researcher"]
    response = await researcher.research_bug(bug_description)
    logger.info(f"Bug researched for project: {project_id}")
    return {"response": response}

@app.post("/projects/{project_id}/inter_agent_communication")
async def inter_agent_communication(project_id: str, from_agent: str, to_agent: str, message: str):
    if project_id not in projects:
        logger.warning(f"Project not found: {project_id}")
        raise HTTPException(status_code=404, detail="Project not found")
    
    if from_agent not in agents[project_id] or to_agent not in agents[project_id]:
        logger.warning(f"Invalid agent specified: {from_agent} or {to_agent}")
        raise HTTPException(status_code=400, detail="Invalid agent specified")
    
    sender = agents[project_id][from_agent]
    receiver = agents[project_id][to_agent]
    
    # Simulate inter-agent communication
    sender_response = await sender.process_message(f"Send to {to_agent}: {message}")
    receiver_response = await receiver.process_message(f"Received from {from_agent}: {sender_response}")
    
    logger.info(f"Inter-agent communication: {from_agent} -> {to_agent}")
    return {"response": receiver_response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=config.API_HOST, port=config.API_PORT)