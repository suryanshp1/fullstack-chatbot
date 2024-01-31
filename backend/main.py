from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from model.models import Prompt
from dotenv import load_dotenv
import os
import json

load_dotenv()

## Gemini pro for text generation
genai.configure(api_key = os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

# fatapi configs
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/chat-stream/")
async def stream_post(prompt: Prompt):
    async def event_generator():
        response = chat.send_message(getattr(prompt, "prompt"), stream=True, generation_config=genai.types.GenerationConfig(
        top_p = 0.6,
        top_k = 5,
        temperature=1.0, max_output_tokens=1024))

        for message in response:
            data = json.dumps({"data": message.text}).encode("utf-8")
            yield data

    return StreamingResponse(event_generator(), media_type="text/event-stream")