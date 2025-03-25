# Book Review Platform

A full-stack web application that allows users to browse books, write reviews, and rate their favorite reads.

## Live Demo

- **Frontend**: [https://book-review-platform-5o9y.onrender.com](https://book-review-platform-5o9y.onrender.com)
- **Backend**: [https://book-review-ple7.onrender.com](https://book-review-ple7.onrender.com)
- **Repository**: [GitHub](https://github.com/novneetsingh/book-review-platform)

## Features

- ✅ User authentication (signup, login, logout)
- ✅ Browse books with cover images and details
- ✅ Search books by title, author, or genre
- ✅ Filter books by genre
- ✅ Write and read book reviews
- ✅ Rate books on a 5-star scale
- ✅ Responsive design for all screen sizes
- ✅ User profiles

## Tech Stack

### Frontend

- **React.js** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API requests
- **React Hook Form** for form handling
- **React Hot Toast** for notifications

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **Cookie-parser** for handling cookies
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB**
- **Git**

### Installation

1. Clone the repository:

```bash
git clone https://github.com/novneetsingh/book-review-platform.git
cd book-review-platform
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd server
npm install
```

4. Create `.env` files:

Frontend (`.env`):

```
VITE_BACKEND_URL=http://localhost:5000
```

Backend (`server/.env`):

```
PORT=3000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

5. Start the development servers:

For concurrent frontend and backend:

```bash
npm start
```

Or separately:

```bash
# Frontend
npm run dev

# Backend
cd server
npm start
```

## API Endpoints

### Authentication

- `POST /user/signup` - Register new user
- `POST /user/login` - User login
- `POST /user/logout` - User logout

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `GET /books/search` - Search books
- `POST /books` - Create new book (Admin only via Postman)

### Reviews

- `GET /reviews/:bookId` - Get reviews for a book
- `POST /reviews/:bookId` - Create a review

### User Profile

- `GET /user` - Get user details
- `PUT /user` - Update user profile

## Project Structure

```
book-review-platform/
├── server/          # Backend code
│   ├── config/      # Database configuration
│   ├── controllers/ # Route controllers
│   ├── middlewares/ # Custom middlewares
│   ├── models/      # MongoDB schemas
│   └── routes/      # API routes
├── src/             # Frontend code
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── redux-toolkit/ # Redux state management
│   └── utils/       # Utility functions
```
