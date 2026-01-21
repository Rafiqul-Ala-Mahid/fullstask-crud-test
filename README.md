# Student CRUD Application

A full-stack student management application built with React, Node.js, Express, and MongoDB.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (Build tool)
- TailwindCSS (Styling)
- shadcn/ui (UI Components)
- React Query (Data fetching)
- React Router (Routing)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Helmet (Security)
- CORS

## Project Structure

```
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── types/           # TypeScript types
│   └── ...
├── backend/                 # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── server.js            # Entry point
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Rafiqul-Ala-Mahid/fullstask-crud-test.git
cd fullstask-crud-test
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:8000`

### 3. Setup Frontend

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit the `.env.local` file:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a single student |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/health` | Health check |

### Request/Response Format

**Create/Update Student:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "grade": "Grade 10",
  "enrollmentDate": "2024-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "grade": "Grade 10",
    "enrollmentDate": "2024-01-15",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Deployment

Both frontend and backend are deployed on Vercel.

### Deploy Backend

1. Go to [Vercel](https://vercel.com)
2. Import the repository
3. Set **Root Directory** to `backend`
4. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend Vercel URL)

### Deploy Frontend

1. Import the same repository again
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `VITE_API_URL` (your backend Vercel URL + `/api`)

## Features

- Create, Read, Update, Delete students
- Search students by name, email, or grade
- Statistics dashboard
- Responsive design
- Form validation
- Toast notifications
- Loading states
- Error handling

## License

MIT
