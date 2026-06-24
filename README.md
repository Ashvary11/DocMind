# DocMind — AI Document Q&A

DocMind is a **Next.js** application that lets users upload documents (**PDF, DOCX, TXT**) and chat with an AI assistant that answers **only from the uploaded document content** using **RAG (Retrieval-Augmented Generation)**.

Link : https://doc-mind-alpha.vercel.app
---

## Features

- Upload documents (PDF / DOCX / TXT)
- Automatic text extraction:
  - PDF via `pdf-parse`
  - DOCX via `mammoth`
  - TXT via filesystem read
- Text chunking, embeddings, and vector storage in **Qdrant**
- Chat that:
  - retrieves relevant chunks from Qdrant
  - generates answers using **Google Gemini**
  - maintains **conversation history** in **MongoDB**
- Rate limiting on chat requests (per user)
- Document management (list, rename, delete)

---

## Tech Stack

- **Frontend / API framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** TailwindCSS + shadcn/ui + sonner (toasts)
- **AI / RAG:** LangChain
  - `ChatGoogle` (Gemini chat)
  - `GoogleGenerativeAIEmbeddings` (embeddings)
- **Vector database:** Qdrant (`@qdrant/js-client-rest`)
- **Primary database:** MongoDB via Mongoose
- **Text processing:** `pdf-parse`, `mammoth`
- **Other:** `react-markdown` for chat message rendering

---

## How it Works (End-to-End)

### 1) Upload document
**Endpoint:** `POST /api/documents`

- Validates file size (10MB max) and allowed types/extensions
- Saves the uploaded file to a temporary uploads directory
- Creates a `Document` record in MongoDB
- Starts the RAG pipeline (`processData`)

### 2) Extract + chunk + embed
Inside `lib/service/document.service.js`:

- Extract text (`lib/rag/1extractText.js`)
- Chunk text (`lib/rag/2chunk.js`)
- Generate embeddings (`lib/rag/3embedding.js`)

### 3) Store vectors in Qdrant
Inside `lib/rag/4storeInDb.js`:

- Creates/initializes Qdrant collection & payload indexes (`lib/db/qudrant.ts`)
- Upserts chunk vectors with payload:
  - `userId`
  - `documentId`
  - `fileName`
  - `chunkIndex`
  - `text` (chunk content)

Document status is updated throughout the pipeline:
- `starting` → `processing` → `ready` (or `failed`)

### 4) Chat with a document
**UI flow:** `app/chat/[id]/page.tsx`

- Initializes a conversation:
  - `POST /api/conversations`
- Loads conversation messages:
  - `GET /api/conversations/[conversationId]/messages`
- Sends user questions:
  - `POST /api/chat`

### 5) Retrieval + Answer generation
Inside `app/api/chat/route.ts` and `lib/service/chat.service.ts`:

- Rate limit per `conversation.userId`
- Save user message to MongoDB
- Retrieve relevant chunks from Qdrant:
  - `lib/rag/5retrive.ts` performs `qdrant.search` filtered by `userId` + `documentId`
- Build a prompt with:
  - retrieved context (chunks)
  - last ~10 messages as conversation history
- Generate structured output from Gemini:
  - `answer: string`
  - `isDataFound: boolean`
- Save the assistant answer to MongoDB

The system prompt instructs the model:
- **Use ONLY provided document context**
- If answer isn’t found in context, respond with `isDataFound: false`

---

## API Reference (Routes)

### Documents
- `POST /api/documents`
  - Upload a file and kick off RAG processing
- `GET /api/documents?userId=...`
  - List documents for a user
- `GET /api/documents/[id]`
  - Fetch a single document
- `PATCH /api/documents/[id]`
  - Update document title
- `DELETE /api/documents/[id]`
  - Deletes from:
    - MongoDB
    - uploaded temp file
    - extracted text file
    - Qdrant vectors filtered by `documentId`

### Conversations
- `POST /api/conversations`
  - Upserts conversation by `{ userId, documentId }`
  - Returns `conversationId`
- `GET /api/conversations/[conversationId]/messages`
  - Returns messages sorted by creation time

### Chat
- `POST /api/chat`
  - Body: `{ conversationId: string, query: string }`
  - Returns: `{ ai_response, isDataFound, sources }`

---

## Data Models (MongoDB)

- **Document** (`models/document.ts`)
  - `userId`, `title`, `fileName`, `filePath`, `textFilePath`, `fileSize`, `status`
- **Conversation** (`models/conversation.ts`)
  - `userId`, `documentId`, `fileName`, `summary`
- **Message** (`models/message.ts`)
  - `conversationId`, `role` (`user` | `assistant`), `content`

---

## Scripts

From `package.json`:

- `npm run dev` — start Next.js dev server
- `npm run build` — build Next.js
- `npm run start` — start Next.js production server
- `npm run lint` — run ESLint

---

## Notes

- Chat is rate-limited using `rate-limiter-flexible` (10 points / 60 seconds in current configuration).
- Temporary files are written to OS temp directories (`os.tmpdir()`), which is compatible with common deployment environments.

---

## Project Metadata

- App title/description: **“DocMind — AI Document Q&A”**
- Primary UI routes:
  - Landing: `/`
  - Dashboard: `/dashboard`
  - Chat: `/chat/[id]`


