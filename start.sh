#!/bin/bash

# Start the backend
echo "Starting the backend..."
cd backend
source venv/bin/activate
uvicorn main:app --reload &

# Start the frontend
echo "Starting the frontend..."
cd ../frontend
npm start

# This will keep the script running
wait