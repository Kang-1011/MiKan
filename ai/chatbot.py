# main.py

import os
import numpy as np
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

# LangChain and other necessary components
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity

# --- DATA MODELS (for API request and response) ---

class QueryRequest(BaseModel):
    """Defines the structure of a request to our endpoint."""
    query: str
    top_k: int = 3 # Default to retrieving top 3 documents

class DocumentResponse(BaseModel):
    """Defines the structure for a single retrieved document in the response."""
    page_content: str
    similarity_score: float

class QueryResponse(BaseModel):
    """Defines the structure of the response from our endpoint."""
    answer: str
    retrieved_documents: List[DocumentResponse]


# --- GLOBAL OBJECTS & LIFESPAN MANAGEMENT ---

# Dictionary to hold our models and pre-computed data
# This will be populated at startup by the lifespan manager
ml_data = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handles application startup and shutdown events.
    Loads models and pre-computes embeddings only once.
    """
    print("--- Application starting up... ---")
    load_dotenv()
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in .env file.")

    # 1. Load LLM and Embeddings model
    print("Loading LLM and Embeddings model...")
    ml_data["llm"] = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GEMINI_API_KEY)
    ml_data["embeddings"] = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GEMINI_API_KEY)

    # 2. Load, split, and embed the document
    print("Loading and processing document...")
    loader = TextLoader("./transcript.txt", encoding="utf-8")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20)
    docs = text_splitter.split_documents(documents)
    
    # Store the text chunks and their embeddings
    ml_data["texts"] = [doc.page_content for doc in docs]
    print(f"Document split into {len(ml_data['texts'])} chunks.")
    print("Pre-computing embeddings for all text chunks...")
    ml_data["text_embeddings"] = ml_data["embeddings"].embed_documents(ml_data["texts"])
    print("Embeddings created and stored successfully.")

    # 3. Create the prompt template and chain
    messages = ChatPromptTemplate.from_messages([
        ("system", """You are a helpful meeting assistant. 
         Answer the user's question based on the provided context only with friendly reply like a human assistant. 
         If the user question is irrelevant to the context, return: "I apologize, but I can't answer questions outside of the provided meeting transcript. My role is to act as your meeting assistant.

         You could try asking about specific action items, project deadlines, or decisions mentioned in the notes. How can I help you with the meeting summary
        <context>
        {context}
        </context>
        Question: {query}"""),
        ("human", "{query}"),
    ])
    ml_data["chain"] = messages | ml_data["llm"]
    
    print("--- Application startup complete. ---")
    
    yield
    
    # --- Code below this yield runs on shutdown ---
    print("--- Application shutting down... ---")
    ml_data.clear()


# --- API SETUP ---

app = FastAPI(
    title="RAG API with FastAPI",
    description="An API for querying a document using vector similarity search.",
    version="1.0.0",
    lifespan=lifespan
)
 
# --- CORS MIDDLEWARE BLOCK ---
# This is the crucial part for connecting a frontend
origins = [
    "http://localhost:5173", # The default Vue dev server port
    "http://localhost:3000", # Common port for React/Next.js
    "http://127.0.0.1:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers 
)

@app.post("/query", response_model=QueryResponse, tags=["RAG"])

async def query_rag(request: QueryRequest):
    """
    Accepts a user query, performs retrieval, and returns the answer.
    """
    print(f"Received query: '{request.query}' with top_k={request.top_k}")
    
    try:
        # --- All RAG logic is now inside the endpoint ---

        # 1. Embed the incoming query
        query_embedding = ml_data["embeddings"].embed_query(request.query)
        
        # 2. Perform similarity search
        similarity_scores = cosine_similarity([query_embedding], ml_data["text_embeddings"])[0]
        
        # 3. Find top_k results using numpy
        top_k_indices = np.argsort(similarity_scores)[:-request.top_k-1:-1]
        
        # 4. Retrieve the chunks, create the context, and get their scores
        retrieved_chunks = [ml_data["texts"][i] for i in top_k_indices]
        retrieved_scores = [similarity_scores[i] for i in top_k_indices]
        context = "\n---\n".join(retrieved_chunks)
        
        # 5. Invoke the chain to get the LLM's answer
        ai_response = ml_data["chain"].invoke({
            "context": context,
            "query": request.query
        })
        
        # 6. Format the response
        response_docs = [
            DocumentResponse(page_content=chunk, similarity_score=score)
            for chunk, score in zip(retrieved_chunks, retrieved_scores)
        ]
        
        return QueryResponse(
            answer=ai_response.content,
            retrieved_documents=response_docs
        )
        
    except Exception as e:
        print(f"An error occurred during query processing: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred while processing the request.")