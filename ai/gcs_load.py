from langchain_google_community import GCSDirectoryLoader

GCP_PROJECT_NAME = "mikan01"
GCS_BUCKET_NAME = "mikan-rag-source"

# 1. Load documents from the GCS bucket
# This is much more reliable than the Drive loader.
print("Loading documents from Google Cloud Storage...")
loader = GCSDirectoryLoader(
    project_name=GCP_PROJECT_NAME, 
    bucket=GCS_BUCKET_NAME, 
)
docs = loader.load()

print(f"✅ Loaded {len(docs)} documents from GCS.")
print(docs)