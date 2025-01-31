# Full-Stack Chat Message System - README

---

## Overview

This project is a full-stack chat message system with the following features:
- Users can send messages.
- Users can view all messages.
- Users can search messages using full-text and partial search functionality powered by Elasticsearch.

---

## Tech Stack
- **Frontend**: React (with TypeScript, Material UI for styling)
- **Backend**: Node.js, Express (with TypeScript)
- **Database**: PostgreSQL
- **Search Engine**: Elasticsearch
- **Others**: Axios, React Toastify, Lodash

---

## Features
1. **Send Messages**: Users can input their name and message.
2. **View Messages**: Displays a list of all messages with timestamps.
3. **Search Messages**: Users can search messages, including partial matches (e.g., "tes" matches "test message").
4. **Error Handling**: Toast notifications for errors and success messages.

---

## Prerequisites
- Node.js (v16+ recommended)
- npm or Yarn
- PostgreSQL (v13+)
- Elasticsearch (v8.0+)

---

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/sunnyDev93/chat-message-system.git
cd chat-message-system
```

---

### 2. Setup Elasticsearch Locally
1. **Download Elasticsearch**:
   - [Download Elasticsearch](https://www.elastic.co/downloads/elasticsearch) for your operating system.

2. **Install Elasticsearch**:
   - Extract the downloaded file.
   - Navigate to the Elasticsearch folder in your terminal.

3. **Start Elasticsearch**:
   ```bash
   ./bin/elasticsearch
   ```
   For Windows:
   ```cmd
   bin\elasticsearch.bat
   ```

4. **Verify Elasticsearch is Running**:
   - Open your browser and go to `http://localhost:9200`.
   - You should see a JSON response indicating Elasticsearch is running.

5. **Optional: Set Up a Custom Elasticsearch Configuration**:
   - Modify the `config/elasticsearch.yml` file for custom settings (e.g., cluster name, network settings).
   - For running elasticsearch locally, recommend to update config like below.
        ```bash
        xpack.security.enabled: false
        ```
---

### 3. Backend Setup
1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Environment Variables**:
   Create a `.env` file in the `backend` directory and add:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=chat_db
   DB_USER=your_postgres_user
   DB_PASS=your_postgres_password
   ELASTICSEARCH_URL=http://localhost:9200
   ```

4. **Run Migrations and Seed the Database**:
   - Set up the PostgreSQL database schema:
     ```bash
     npm run migrate
     ```

5. **Start the Backend**:
   ```bash
   npm run dev
   ```

---

### 4. Frontend Setup
1. **Navigate to the Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `frontend` directory and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the Frontend**:
   ```bash
   npm run dev
   ```

5. **Access the Application**:
   Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## Backend APIs
| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/api/messages`   | Add a new message                       |
| GET    | `/api/messages`   | Get all messages                        |
| GET    | `/api/search`     | Search messages (supports partial match)|

---

## Key Backend Files
- **`config/setupElastic.ts`**: Sets up the Elasticsearch index and mapping.
- **`services/MessageService.ts`**: Handles message-related logic, including search.
- **`routes/messageRoutes.ts`**: Contains API routes for messages.

---

## Frontend Features
- **Form to Send Messages**: Users can enter their name and message.
- **Search Bar with Debouncing**: Type and search for messages with real-time feedback.
- **Toast Notifications**: Display error and success messages.

---

## Elasticsearch Configuration
The `setupElastic` script automatically creates an index `messages` with the following mapping:
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "integer" },
      "senderName": { "type": "text" },
      "message": { "type": "text" },
      "timestamp": { "type": "date" }
    }
  }
}
```

Partial match search is implemented using the `wildcard` query:
```typescript
query: {
  wildcard: {
    message: {
      value: `*${query}*`,
      case_insensitive: true,
    },
  },
}
```

---

## Common Commands

### Start Elasticsearch
```bash
./bin/elasticsearch
```

### Start Backend
```bash
npm run dev
```

### Start Frontend
```bash
npm run dev
```

---

## Testing the Application
1. **Send a Message**:
   - Enter a name and message in the form.
   - Click "Send."

2. **View All Messages**:
   - All messages appear in the message list.

3. **Search Messages**:
   - Type a term into the search bar.
   - Messages matching the search term (even partially) are displayed.

4. **Clear Search**:
   - Delete the search term.
   - All messages are displayed again.

---

## Project Structure
```
chat-message-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── setupElastic.ts
│   │   ├── routes/
│   │   │   └── messageRoutes.ts
│   │   ├── services/
│   │   │   └── messageService.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   ├── lists/
│   │   │   └── search/
│   │   ├── api/
│   │   ├── utils/
│   └── package.json
└── README.md
```

---

## Future Improvements
1. Implement pagination for the message list.
2. Add user authentication.
3. Improve Elasticsearch query performance with custom analyzers.
