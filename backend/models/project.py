from pydantic import BaseModel
from typing import List, Optional

class Project(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    path: str
    agents: List[str]
    status: str = "In Progress"

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    path: str