# User Management System

A modern and responsive User Management System built using the MERN Stack.  
This application allows admins to manage users with authentication, authorization, and CRUD operations.

---

# Project Overview

This project is a full-stack User Management Dashboard developed for assessment purposes using the MERN Stack.

The application includes:

- Admin Authentication
- JWT-based Login System
- User CRUD Operations
- Responsive Dashboard UI
- Protected APIs
- MongoDB Database Integration

The frontend is built with React.js and Tailwind CSS, while the backend uses Node.js, Express.js, and MongoDB.

---

# Features Implemented

## Authentication
- Admin Signup
- Admin Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt.js

## User Management
- Add User
- Edit User
- Delete User
- Fetch All Users
- Search-ready UI structure
- User Roles
- User Status Management

## Dashboard
- Responsive Sidebar
- Dashboard Cards
- User Statistics
- Modern Admin UI

## Security
- Protected APIs using JWT Middleware
- Password Encryption
- Environment Variables

---

# Technologies Used

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React Icons
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- dotenv
- cors

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# Database Schema

## Admin Schema

{
  email: String,
  password: String
}

## User Schema
{
  fullName: String,
  email: String,
  role: String,
  status: String,
  location: String,
  phone: String,
  createdby : String ##most important part which sends admin id and allowed only those user user which is logged in.
}

API Endpoints
Signup Admin
POST /api/auth/signup

Login Admin
POST /api/auth/login

User Endpoints
ADD user
POST /api/users/signup
get user
GET /api/users/getuser
update user
PUT /api/users/:id
deleteuser
DELETE /api/users/:id

Backend Setup
cd backend
npm install
npm start

Backend Variables
PORT=****
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY

Frontend Setup
cd frontend
npm install
npm run dev

Frontend env variable
VITE_API_URL=YOUR_BACKEND_URL/api

Development Approach and Planning
The project was developed using a modular and scalable approach.
Planning Steps
Designed backend architecture
Created MongoDB schemas
Implemented authentication system
Built protected APIs
Developed frontend UI
Connected frontend with backend APIs
Added deployment configuration
Toast Implementation

The focus was on:
clean UI
reusable components
simple architecture
easy scalability
assessment-friendly implementation

Assumptions and Design Decisions
Only authenticated admins can manage users
JWT is used for authentication
MongoDB Atlas is used as cloud database
Tailwind CSS was chosen for faster UI development
Separate frontend and backend deployment used
Minimal and clean dashboard design preferred over complex UI
Simple role system implemented:
Admin
Editor
Viewer
Vercel is used for fast frontend deployment and check web anlytics smoothly
Render is used for fast backend deployment and also advantage of free tier for small project
