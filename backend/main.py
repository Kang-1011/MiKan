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
from routers.chatbot import router as chatbot_router  

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
app.include_router(chatbot_router, prefix="/chatbot", tags=["Chatbot"]) 
 

