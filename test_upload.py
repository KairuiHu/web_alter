# Upload and query video file
import requests
import json
import time
import os

api_key = os.getenv("SYNVO_API_KEY")

path = "YOUR_PATH_TO_VIDEO_FILE (e.g., ../Andrew_lecture.mp4)"

# Upload file
with open(path, "rb") as f:
    response = requests.post(
        "https://api.synvo.ai/file/upload",
        files={"file": f},
        data={"path": "/", "build_memory": "true"},
        headers={"X-API-Key": api_key}
    )
file_id = response.json()["file_id"]

# Wait for processing
while True:
    status_response = requests.get(
        f"https://api.synvo.ai/file/status/{file_id}",
        headers={"X-API-Key": api_key}
    )
    if status_response.json()["status"] == "COMPLETED":
        break
    time.sleep(5)

# Query
payload = {
    "messages": [{
        "role": "user",
        "content": [
            {"type": "text", "text": "What is the answer to the in-video quiz in Andrew's lecture?"},
        ]
    }]
}

response = requests.post(
    "https://api.synvo.ai/ai/query",
    data={
        "payload": json.dumps(payload),
        "model": "synvo",
        "force_search": "true"
    },
    headers={"X-API-Key": api_key}
)

result = response.json()

# Print top 3 facts
k = 3
facts = result["content"][0]["facts"][:k]
for i, fact in enumerate(facts, 1):
    print(f"\n--- Fact {i} ---")
    print(f"Chunk: {fact['chunk']}...")
    print(f"Reference: {fact['reference']}")