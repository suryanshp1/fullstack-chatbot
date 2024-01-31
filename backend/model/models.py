from pydantic import BaseModel

# pydentic model
class Prompt(BaseModel):
    prompt: str