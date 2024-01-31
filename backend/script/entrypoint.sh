#!/bin/bash

# Start the FastAPI application
uvicorn main:app --host 0.0.0.0 --port 8000


# Build command
# docker build -t ai:dev .

# Docker run command 
# docker run -p 8000:8000 -v ${PWD}:/app --env-file .env -t ai:dev