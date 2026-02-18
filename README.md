# Docodev.AI - Health Tracking Platform

A full-stack MERN health tracking application with user authentication, health records management, and analytics dashboard.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account

### Running the Application

1. **Backend** (Terminal 1):
```bash
cd docodev-health-tracker/backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

2. **Frontend** (Terminal 2):
```bash
cd docodev-health-tracker/frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## ✨ Features

- User Authentication (Register/Login with JWT)
- Add, View, Edit, Delete Health Records
- Track Blood Pressure, Blood Sugar, Weight, Heart Rate
- Analytics Dashboard with Statistics
- Responsive Design
- Protected Routes

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcrypt for password hashing

**Frontend:**
- React.js + Vite
- React Router v6
- Context API
- Axios
- Tailwind CSS

## 📖 Documentation

For detailed setup instructions, API documentation, and deployment guides, see:
- [Main Documentation](docodev-health-tracker/README.md)
- [Quick Start Guide](docodev-health-tracker/QUICK_START.md)

## 🔑 Environment Variables

**Backend** (`.env`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Health Records
- `POST /api/health/add` - Add record
- `GET /api/health/all` - Get all records
- `GET /api/health/:id` - Get single record
- `PUT /api/health/:id` - Update record
- `DELETE /api/health/:id` - Delete record
- `GET /api/health/stats` - Get statistics

## 👨‍💻 Author

Aman Singh

## 📄 License

MIT License
