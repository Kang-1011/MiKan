
import os
from dotenv import load_dotenv

# LangChain components
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import AIMessage

# --- Environment and Model Setup ---

# Load environment variables from a .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file. Please create a .env file and add your key.")

# Initialize the Gemini LLM
# Using "gemini-1.5-flash" as it's a fast and capable model.
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GEMINI_API_KEY)

# --- LangChain Prompt Template ---

# Define the prompt template that will be sent to the LLM
prompt_template = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful AI assistant within the Mikan app.  
Answer the user's question based ONLY on the provided "Page Context".
Do not use any external knowledge or information you were not given.
Your tone should be friendly and professional, like a human assistant.


Do not use any external knowledge. If a user asks a question that cannot be answered using the provided context 
(e.g., about current events, other meetings not in the context, or general knowledge), then you MUST respond with:
"I apologize, but I can't answer questions outside of the provided meeting content. My role is to act as your meeting assistant. 
You could try asking about specific action items, deadlines, or decisions mentioned on the current page."


<context>
{context}
</context>
"""),
    ("human", "{query}"),
])

# Create the LangChain chain by piping the prompt to the LLM
chain = prompt_template | llm

# --- Core AI Function ---

def get_ai_response(context: str, query: str) -> str:
    """
    Invokes the LangChain chain with the provided context and query.

    Args:
        context: The JSON string context from the frontend page.
        query: The user's question.

    Returns:
        A string containing the AI's generated answer.
    """
    try:
        # Invoke the chain with the context and query
        ai_response: AIMessage = chain.invoke({
            "context": context,
            "query": query
        })
        # Return the content of the AI's message
        return ai_response.content
    except Exception as e:
        # Propagate the exception to be handled by the API endpoint
        print(f"An error occurred in get_ai_response: {e}")
        raise