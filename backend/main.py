from fastapi import *
from model import *
from database import *
from fastapi.middleware.cors import CORSMiddleware

from routers.users import router as users_router
from routers.projects import router as projects_router
from routers.tasks import router as tasks_router
from routers.attachments import router as attachments_router
from routers.ai_attachments import router as ai_attachments_router
from routers.autostart import router as autostart_router
from routers.drafts import router as drafts_router
from routers.meetings import router as meetings_router
from routers.comments import router as comments_router
from routers.subtasks import router as subtasks_router
from routers.boards import router as boards_router


from fastapi.responses import StreamingResponse # ✨ NEW IMPORT
from pydantic import BaseModel
from typing import List, Dict, Literal 
# Import the two separated AI functions
from chatbot import stream_answer, find_citation

app = FastAPI()
create_tables()
db_dependency = Annotated[Session, Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

security = HTTPBearer()

app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(projects_router, prefix="/projects", tags=["Projects"])
app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
app.include_router(comments_router, prefix="/comments", tags=["Comments"])
app.include_router(subtasks_router, prefix="/subtasks", tags=["Subtasks"])
app.include_router(attachments_router, prefix="/attachments", tags=["Attachments"])
app.include_router(ai_attachments_router, prefix="/ai_attachments", tags=["AI Attachments"])
app.include_router(autostart_router, prefix="/autostart", tags=["Autostart"])
app.include_router(drafts_router, prefix="/drafts", tags=["Drafts"])
app.include_router(meetings_router, prefix="/meetings", tags=["Meetings"])
app.include_router(boards_router, prefix="/boards", tags=["Boards"])

#  --------------------------------------------------------- chatbot ---------------------------------------------------------
# --- Pydantic Models for Request/Response ---


# --- Pydantic Models for Requests/Responses ---

# Model for the streaming request body 
    
class StreamRequest(BaseModel):
    query: str
    context: str
    context_name: str
    messages: List[Dict]

class CitationRequest(BaseModel):
    answer: str
    context: str

class CitationResponse(BaseModel):
    sourceLine: str

# --- API Endpoints ---

@app.post("/stream-answer/")
async def stream_answer_endpoint(request: StreamRequest):
    """
    Receives a POST request with a body and returns a streaming response.
    """
    print(f"Streaming request received for query: '{request.query[:50]}...'")
    # The generator function is now defined directly within the endpoint
    async def event_generator():
        try:
            async for chunk in stream_answer(request.context, request.query, request.messages):
                yield chunk
        except Exception as e:
            print(f"Error in stream_answer event_generator: {e}")
            yield "An error occurred while streaming the response."
            
    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.post("/find-citation/", response_model=CitationResponse)
async def find_citation_endpoint(request: CitationRequest):
    """Receives context and an answer, returns the most relevant source line."""
    print(f"Received citation request for answer: '{request.answer[:50]}...'")
    try:
        source_line = find_citation(context=request.context, answer=request.answer)
        print(f"Returning Citation: {source_line}")
        return {"sourceLine": source_line}
    except Exception as e:
        print(f"An error occurred during find_citation_endpoint: {e}")
        raise HTTPException(status_code=500, detail="Error finding citation from AI model.")