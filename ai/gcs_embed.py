import os
from langchain_mongodb import MongoDBAtlasVectorSearch
from pymongo import MongoClient
from langchain_google_community import GCSDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from langchain_google_genai._common import GoogleGenerativeAIError
import time
import math

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001", google_api_key=GEMINI_API_KEY)
client = MongoClient(os.getenv("MONGODB_ATLAS_CLUSTER_URI"))
GCP_PROJECT_NAME = "mikan01"
GCS_BUCKET_NAME = "mikan-rag-source"

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

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100,
)

print("Loading documents from Google Cloud Storage...")
loader = GCSDirectoryLoader(
    project_name=GCP_PROJECT_NAME, 
    bucket=GCS_BUCKET_NAME, 
)
docs = loader.load_and_split(text_splitter=text_splitter)
print(f"✅ Loaded {len(docs)} documents from GCS.")

# TENACITY RETRY DECORATOR
@retry(
    retry=retry_if_exception_type(GoogleGenerativeAIError),
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=2, min=15, max=90)
)
def add_batch_with_retry(vector_store, batch, batch_num):
    print(f"Processing batch {batch_num}...")
    return vector_store.add_documents(batch)

# Process in batches with retry
def process_documents_with_tenacity(vector_store, docs, batch_size=5):
    total_batches = math.ceil(len(docs) / batch_size)
    successful_batches = 0
    
    for i in range(0, len(docs), batch_size):
        batch = docs[i:i + batch_size]
        batch_num = i // batch_size + 1
        
        try:
            add_batch_with_retry(vector_store, batch, batch_num)
            successful_batches += 1
            print(f"✅ Batch {batch_num}/{total_batches} completed")
            time.sleep(0.5)  # Small delay between batches
            
        except Exception as e:
            print(f"❌ Batch {batch_num} failed after all retries: {e}")
    
    print(f"Completed {successful_batches}/{total_batches} batches")

# Use the tenacity function
process_documents_with_tenacity(vector_store, docs, batch_size=5)
print("Documents processing completed!")