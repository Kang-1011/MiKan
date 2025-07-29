from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os   

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
rag_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", api_key=GEMINI_API_KEY)
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001", google_api_key=GEMINI_API_KEY)

client = MongoClient(os.getenv("MONGODB_ATLAS_CLUSTER_URI"))

DB_NAME = "mikan_db"
COLLECTION_NAME = "logistic_team_collection"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-1"

MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

retriever = vector_store.as_retriever(
    search_type = "similarity_score_threshold",
    search_kwargs = {
        "k": 8,
        'score_threshold': 0.6
    }
)

file_retriever = vector_store.as_retriever(
    search_type = "similarity_score_threshold",
    search_kwargs = {
        'score_threshold': 0.85
    }
)

rag_system_prompt = (
    "Use the given context to answer the question. "
    "If you don't know the answer, say you don't know. "
    "Context: {context}"
)

rag_prompt = ChatPromptTemplate.from_messages([
    ("system", rag_system_prompt),
    ("human", "{input}")
])

document_chain = create_stuff_documents_chain(rag_llm, rag_prompt)
rag_chain = create_retrieval_chain(retriever, document_chain)
rag_file_chain = create_retrieval_chain(file_retriever, document_chain)