
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Import the core AI function from our other file
from chatbot import get_ai_response

# --- FastAPI App Setup ---

app = FastAPI(
    title="Mikan AI API",
    description="Backend for the Mikan Meeting Assistant with a context-aware chatbot.",
    version="0.3.0"
)

# CORS Middleware to allow communication with your Vue frontend
origins = [
    "http://localhost:5173",  # The default Vite/Vue dev server port
    "http://localhost:3000",  # Common port for React/Next.js
    "http://127.0.0.1:5173",
    "http://localhost:8080",  # Common port for older Vue CLI
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request/Response ---

class ChatRequest(BaseModel):
    query: str
    context: str
    context_name: str

class ChatResponse(BaseModel):
    answer: str

# --- API Endpoint ---

@app.post("/chat-with-context/", response_model=ChatResponse)
async def chat_with_context(request: ChatRequest):
    """
    Receives a user query and context, calls the AI logic from chatbot.py,
    and returns the response.
    """
    print(f"Received chat query for context: {request.context_name}")

    try:
        # Call the imported function to get the AI's response
        answer_text = get_ai_response(context=request.context, query=request.query)

        print(f"Generated Answer: {answer_text}")
        return {"answer": answer_text}

    except Exception as e:
        # Handle any exceptions that occurred in the AI logic
        print(f"An error occurred during LLM invocation: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing your request with the AI model.")
