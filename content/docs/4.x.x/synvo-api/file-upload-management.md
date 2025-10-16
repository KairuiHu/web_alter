---
id: file-upload-management
title: File Upload & Management
slug: /synvo-api/files
---

The Synvo API provides comprehensive file and directory management capabilities. All file operations support various formats including documents, images, videos, and web pages.

## Authentication

All endpoints require authentication via either:
- **Bearer Token**: `Authorization: Bearer <token>`
- **API Key**: `X-API-Key: <api_key>`

## Base URL

```
https://api.synvo.ai
```

## Create Directory

Creates a virtual directory in Azure Blob Storage by uploading a .keep marker file.

**Endpoint:** `POST /file/create_dir`

**Content-Type:** `application/x-www-form-urlencoded`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | string | Yes | Directory path (e.g., "/", "/docs") |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X POST "https://api.synvo.ai/file/create_dir" \
  -H "X-API-Key: ${API-KEY}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "path=/docs"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
url = "https://api.synvo.ai/file/create_dir"
data = {"path": "/docs"}
headers = {"X-API-Key": f"{token}"}

response = requests.post(url, data=data, headers=headers, timeout=30)
response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const params = new URLSearchParams({ path: "/docs" });

const response = await fetch("https://api.synvo.ai/file/create_dir", {
  method: "POST",
  headers: {
    "X-API-Key": `${token}`,
  },
  body: params,
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "message": "Directory created successfully at /docs"
}
```

### Response Codes

- `200` - Directory exists or created
- `400` - Bad request
- `401` - Unauthorized

## List Directory Contents

Lists files and directories at a given path, optionally recursive with version tracking.

**Endpoint:** `GET /file/list`

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | string | "/" | Directory path |
| `recursive` | boolean | true | Include nested items and return tree structure |
| `version` | string | - | Optional file version to check if refresh is needed |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X GET "https://api.synvo.ai/file/list?path=/project&recursive=true" \
  -H "X-API-Key: ${API-KEY}"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
url = "https://api.synvo.ai/file/list"
params = {"path": "/project", "recursive": True}
headers = {"X-API-Key": f"{token}"}

response = requests.get(url, params=params, headers=headers, timeout=30)
response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const params = new URLSearchParams({
  path: "/project",
  recursive: "true"
});

const response = await fetch(`https://api.synvo.ai/file/list?${params}`, {
  method: "GET",
  headers: {
    "X-API-Key": `${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "items": [
    {
      "is_dir": false,
      "name": "document.pdf",
      "path": "/project/document.pdf",
      "file_id": "abc123xyz",
      "size": 1024000,
      "status": "COMPLETED",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "tree": {
    "/project": {
      "document.pdf": {
        "file_id": "abc123xyz",
        "is_dir": false
      }
    }
  },
  "version": "v1.2.3",
  "need_refresh_file": false
}
```

### Response Codes

- `200` - Directory listing
- `400` - Bad request
- `401` - Unauthorized
- `404` - Directory not found

## Upload File

Uploads a file to the specified path, builds memory index if requested, and stores in Azure Blob Storage.

**Endpoint:** `POST /file/upload`

**Content-Type:** `multipart/form-data`

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `file` | binary | Yes | - | File to upload |
| `path` | string | No | "/" | Upload path |
| `build_memory` | boolean | No | true | If true, immediately build memory/index |
| `disable_lazy_metadata` | boolean | No | false | If true, force parsing metadata now |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X POST "https://api.synvo.ai/file/upload" \
  -H "X-API-Key: ${API-KEY}" \
  -F "file=@/path/to/document.pdf" \
  -F "path=/" \
  -F "build_memory=true" \
  -F "disable_lazy_metadata=false"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
url = "https://api.synvo.ai/file/upload"
headers = {"X-API-Key": f"{token}"}

with open("/path/to/document.pdf", "rb") as f:
    files = {"file": f}
    data = {
        "path": "/",
        "build_memory": "true",
        "disable_lazy_metadata": "false"
    }
    response = requests.post(url, files=files, data=data, headers=headers, timeout=60)

response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const formData = new FormData();
formData.append("file", file);
formData.append("path", "/");
formData.append("build_memory", "true");
formData.append("disable_lazy_metadata", "false");

const response = await fetch("https://api.synvo.ai/file/upload", {
  method: "POST",
  headers: {
    "X-API-Key": `${token}`,
  },
  body: formData,
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "filename": "document.pdf",
  "path": "/",
  "renamed": false,
  "file_id": "abc123xyz",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Response Codes

- `200` - Upload accepted
- `400` - Bad request
- `401` - Unauthorized

## Download File

Returns a signed URL for downloading the file from Azure Blob Storage.

**Endpoint:** `GET /file/download`

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | string | Yes | File identifier |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X GET "https://api.synvo.ai/file/download?file_id=abc123xyz" \
  -H "X-API-Key: ${API-KEY}"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
file_id = "abc123xyz"
url = "https://api.synvo.ai/file/download"
params = {"file_id": file_id}
headers = {"X-API-Key": f"{token}"}

response = requests.get(url, params=params, headers=headers, timeout=30)
response.raise_for_status()

# Get the signed URL and download the file
data = response.json()
download_url = data["url"]
file_response = requests.get(download_url, timeout=60)

with open(data["name"], "wb") as f:
    f.write(file_response.content)
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const fileId = "abc123xyz";

const response = await fetch(`https://api.synvo.ai/file/download?file_id=${fileId}`, {
  method: "GET",
  headers: {
    "X-API-Key": `${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

const data = await response.json();
console.log("Download URL:", data.url);

// Open the download URL in a new window
window.open(data.url, "_blank");
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "url": "https://storage.azure.com/signed-url-here",
  "name": "document.pdf",
  "file_type": "application/pdf",
  "file_id": "abc123xyz"
}
```

### Response Codes

- `200` - File download information
- `401` - Unauthorized
- `404` - File not found

## Delete File

Deletes a file or directory and removes it from the vector database.

**Endpoint:** `DELETE /file/delete/{file_id}`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | string | Yes | File identifier |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X DELETE "https://api.synvo.ai/file/delete/abc123xyz" \
  -H "X-API-Key: ${API-KEY}"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
file_id = "abc123xyz"
url = f"https://api.synvo.ai/file/delete/{file_id}"
headers = {"X-API-Key": f"{token}"}

response = requests.delete(url, headers=headers, timeout=30)
response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const fileId = "abc123xyz";

const response = await fetch(`https://api.synvo.ai/file/delete/${fileId}`, {
  method: "DELETE",
  headers: {
    "X-API-Key": `${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "message": "File deleted successfully"
}
```

### Response Codes

- `200` - Deleted
- `401` - Unauthorized
- `404` - File not found

## Move/Rename File

Moves a file or directory to a new location and updates all database references.

**Endpoint:** `POST /file/move`

**Content-Type:** `application/x-www-form-urlencoded`

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `src` | string | Yes | Source path (e.g., "/project/report.pdf") |
| `dest` | string | Yes | Destination path (e.g., "/archive/report.pdf") |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X POST "https://api.synvo.ai/file/move" \
  -H "X-API-Key: ${API-KEY}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "src=/project/report.pdf" \
  --data-urlencode "dest=/archive/report.pdf"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
url = "https://api.synvo.ai/file/move"
data = {
    "src": "/project/report.pdf",
    "dest": "/archive/report.pdf"
}
headers = {"X-API-Key": f"{token}"}

response = requests.post(url, data=data, headers=headers, timeout=30)
response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const params = new URLSearchParams({
  src: "/project/report.pdf",
  dest: "/archive/report.pdf"
});

const response = await fetch("https://api.synvo.ai/file/move", {
  method: "POST",
  headers: {
    "X-API-Key": `${token}`,
  },
  body: params,
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "message": "File moved successfully",
  "file_moves": [
    ["/project/report.pdf", "/archive/report.pdf"]
  ]
}
```

### Response Codes

- `200` - Successfully moved
- `401` - Unauthorized
- `404` - Source not found
- `409` - Destination already exists

## Get File Thumbnail

Returns a thumbnail image for supported file types (images, PDFs, videos).

**Endpoint:** `GET /file/thumbnail`

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `file_id` | string | - | File identifier |
| `max_size` | integer | 200 | Maximum thumbnail size (width or height) |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X GET "https://api.synvo.ai/file/thumbnail?file_id=abc123xyz&max_size=200" \
  -H "X-API-Key: ${API-KEY}" \
  -o thumbnail.jpg
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
file_id = "abc123xyz"
url = "https://api.synvo.ai/file/thumbnail"
params = {"file_id": file_id, "max_size": 200}
headers = {"X-API-Key": f"{token}"}

response = requests.get(url, params=params, headers=headers, timeout=30)
response.raise_for_status()

with open("thumbnail.jpg", "wb") as f:
    f.write(response.content)
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const fileId = "abc123xyz";
const params = new URLSearchParams({
  file_id: fileId,
  max_size: "200"
});

const response = await fetch(`https://api.synvo.ai/file/thumbnail?${params}`, {
  method: "GET",
  headers: {
    "X-API-Key": `${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);

// Display thumbnail in an img element
const img = document.createElement("img");
img.src = imageUrl;
document.body.appendChild(img);
```

  </Tab>
</Tabs>

### Response Codes

- `200` - Thumbnail image (binary data)
- `401` - Unauthorized
- `404` - File not found

## Get File Processing Status

Returns the current processing status of a file (PENDING, COMPLETED, FAILED).

**Endpoint:** `GET /file/status/{file_id}`

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_id` | string | Yes | File identifier |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X GET "https://api.synvo.ai/file/status/abc123xyz" \
  -H "X-API-Key: ${API-KEY}"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
file_id = "abc123xyz"
url = f"https://api.synvo.ai/file/status/{file_id}"
headers = {"X-API-Key": f"{token}"}

response = requests.get(url, headers=headers, timeout=30)
response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const fileId = "abc123xyz";

const response = await fetch(`https://api.synvo.ai/file/status/${fileId}`, {
  method: "GET",
  headers: {
    "X-API-Key": `${token}`,
  },
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "file_id": "abc123xyz",
  "status": "COMPLETED"
}
```

### Status Values

- `PENDING` - File is being processed
- `COMPLETED` - File processing completed successfully
- `FAILED` - File processing failed
- `UNKNOWN` - Status cannot be determined

### Response Codes

- `200` - File status
- `401` - Unauthorized

## Add Webpage

Crawls and indexes a webpage as a document.

**Endpoint:** `POST /webpage/add`

**Content-Type:** `application/x-www-form-urlencoded`

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string | Yes | - | URL of the webpage to add |
| `path` | string | No | "/web" | Path to store the webpage |
| `name` | string | No | "new-web-page" | Display name for the webpage |
| `screenshot` | string | No | "" | Base64 encoded screenshot (optional) |
| `build_memory` | boolean | No | true | Build memory index |
| `disable_lazy_metadata` | boolean | No | true | Force parsing metadata now |

### Example Request

<Tabs items={["cURL", "Python", "JavaScript"]}>
  <Tab value="cURL">

```bash
curl -X POST "https://api.synvo.ai/webpage/add" \
  -H "X-API-Key: ${API-KEY}" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "url=https://example.com/article" \
  --data-urlencode "path=/web" \
  --data-urlencode "name=Example Article" \
  --data-urlencode "build_memory=true"
```

  </Tab>
  <Tab value="Python">

```python
import requests

token = "<BEARER_TOKEN>"
url = "https://api.synvo.ai/webpage/add"
data = {
    "url": "https://example.com/article",
    "path": "/web",
    "name": "Example Article",
    "build_memory": True
}
headers = {"X-API-Key": f"{token}"}

response = requests.post(url, data=data, headers=headers, timeout=60)
response.raise_for_status()
print(response.json())
```

  </Tab>
  <Tab value="JavaScript">

```javascript
const token = "<BEARER_TOKEN>";
const params = new URLSearchParams({
  url: "https://example.com/article",
  path: "/web",
  name: "Example Article",
  build_memory: "true"
});

const response = await fetch("https://api.synvo.ai/webpage/add", {
  method: "POST",
  headers: {
    "X-API-Key": `${token}`,
  },
  body: params,
});

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

console.log(await response.json());
```

  </Tab>
</Tabs>

### Example Response

```json
{
  "filename": "example-article.html",
  "path": "/web",
  "file_id": "web123xyz",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Response Codes

- `200` - Webpage added
- `400` - Bad request
- `401` - Unauthorized


## Error Handling

All endpoints return standard HTTP status codes. Error responses include a JSON object with error details:

```json
{
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `400` - Bad Request: Invalid parameters or malformed request
- `401` - Unauthorized: Missing or invalid authentication
- `404` - Not Found: Resource does not exist
- `409` - Conflict: Resource already exists or operation conflicts
- `500` - Internal Server Error: Server-side error
