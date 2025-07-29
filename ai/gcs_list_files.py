from google.cloud import storage

GCP_PROJECT_NAME = "mikan01"
GCS_BUCKET_NAME = "mikan-rag-source"
GCS_PREFIX = "" # Optional: set a prefix if you want to list files in a specific "folder"

def list_gcs_files(project_name: str, bucket_name: str, prefix: str = "") -> list[str]:
    """Lists all files (objects) in a GCS bucket with an optional prefix."""
    client = storage.Client(project=project_name)
    bucket = client.get_bucket(bucket_name)

    file_names = []
    blobs = bucket.list_blobs(prefix=prefix)
    for blob in blobs:
        # GCS "directories" are often represented by objects ending with a '/'
        # You can choose to skip these if you only want actual files.
        if blob.name.endswith("/"):
            continue
        file_names.append(blob.name)
    return file_names

# Example usage:
file_paths = list_gcs_files(GCP_PROJECT_NAME, GCS_BUCKET_NAME, GCS_PREFIX)
print(f"✅ Found {len(file_paths)} files in GCS bucket '{GCS_BUCKET_NAME}':")
for path in file_paths:
    print(path)