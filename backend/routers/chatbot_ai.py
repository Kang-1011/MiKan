import os
import json
import time
from dotenv import load_dotenv
from typing import List, Dict

# LangChain components
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

# --- Environment and Model Setup ---

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file.")

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GEMINI_API_KEY)

# --- LangChain Prompt Templates ---

# 1. ANSWERING TEMPLATE: Focused only on answering.
answer_prompt_template = ChatPromptTemplate.from_messages([
    ("system", """You are a helpful AI assistant Mikan.  
Answer the user's question based ONLY on the provided "Page Context".
Do not use any external knowledge. Your tone should be friendly and professional.
You can include your name Mikan and role when user is hello or hi at you.

Do not use any external knowledge. If a user asks a question that cannot be answered using the provided context 
(e.g., about current events, other meetings not in the context, or general knowledge), then you MUST respond with:
"I apologize, but I can't answer questions outside of the provided meeting content. My role is to act as your meeting assistant.
You could try asking about specific action items, deadlines, or decisions mentioned on the current page."

<context>
{context}
</context>
"""),
    
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{query}"),
])

# 2. CITATION TEMPLATE: Focused only on finding the source line.
citation_prompt_template = ChatPromptTemplate.from_template("""
You are a citation-finding expert. Based on the provided `Answer` and the `Source Context`, find the single, most relevant original transcript line from the `Source Context` that directly supports the `Answer`.

- Respond with ONLY that exact line in full with the following format: [timestamp] [speaker name]: [content].  For example: '00:07:32 Azfar: Rohimi is right. For Dan Savi, two loading bays are assigned, but we need strict time slots. We cannot have any overlap. And the Maylo Falcon S and CYD Nova EV are quite large. So maneuvering them into Center Court will require precise coordination with security. For Shaver Gaming, it is less about the size, but more about the volume of smaller crates and personal equipment. We need a clear path from the loading bay to the main event area without disrupting shoppers. I will map out specific routes and timings this afternoon.
'
- Do not add any explanation or introductory text.
- If no single line is a direct source for the answer, respond with the exact string "N/A".

Source Context:
---
{context}
---

Answer:
---
{answer}
---
""")

# --- LangChain Chains ---
answer_chain = answer_prompt_template | llm | StrOutputParser()
citation_chain = citation_prompt_template | llm | StrOutputParser()

# --- Core AI Functions (Separated) ---

async def stream_answer(context: str, query: str, chat_history: List[Dict]) :
    """Invokes the answer chain and returns only the answer text."""
    try:
        print(f"Received chat history with {len(chat_history)} messages.")
        start_time = time.perf_counter() 
        
        async for chunk in answer_chain.astream({
            "context": context,
            "query": query,
            "chat_history": chat_history,
        }):
            # Yield each chunk of text as it arrives
            yield chunk
        
        end_time = time.perf_counter()
        print(f"Answer generated in {end_time - start_time:.2f} seconds.") 
    except Exception as e:
        print(f"An error occurred in get_answer: {e}")
        raise

def find_citation(context: str, answer: str) -> str:
    """Invokes the citation chain and returns only the source line."""
    try:
        print("Invoking citation chain...")
        start_time_cite = time.perf_counter()

        source_line = citation_chain.invoke({
            "context": context,
            "answer": answer
        })
        
        end_time_cite = time.perf_counter()
        print(f"Citation found in {end_time_cite - start_time_cite:.2f} seconds.")

        if source_line and source_line.strip().upper() != "N/A": 
                print(f"SOUrCE: {source_line.strip() }")
                return source_line.strip()  
        return "" # Return empty string if no valid citation
    except Exception as e:
        print(f"An error occurred in find_citation: {e}")
        raise