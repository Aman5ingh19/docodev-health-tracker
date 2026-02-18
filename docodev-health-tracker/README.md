# Docodev.AI - AI-Powered Health Tracking Platform

A production-ready MERN stack health tracking application with authentication, CRUD operations, and analytics.

## 🚀 Features

- **User Authentication**: Register, Login, JWT-based auth
- **Health Records CRUD**: Add, View, Edit, Delete daily health logs
- **Analytics Dashboard**: View health statistics and trends
- **Protected Routes**: Secure user data
- **Responsive Design**: Works on all devices

## 📁 Project Structure

```
Docodev.AI/
├── backend/                 # Node.js + Express Backend
│   ├── config/             # Database & environment config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth & error middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── .env.example        # Environment variables template
│   ├── package.json
│   └── server.js           # Entry point
│
├── frontend/               # React + Vite Frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Context API (Auth)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── vite.config.js
│
└── README.md              # This file
```

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB Atlas with Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS enabled

### Frontend
- React.js (Vite)
- React Router v6
- Context API for state management
- Axios for API calls
- Tailwind CSS for styling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

4. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start frontend dev server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Deployment

### MongoDB Atlas Setup
1. Create account at mongodb.com/cloud/atlas
2. Create a new cluster (free tier)
3. Add database user
4. Whitelist IP (0.0.0.0/0 for all)
5. Get connection string

### Backend Deployment (Render)
1. Push code to GitHub
2. Create account on render.com
3. New Web Service → Connect repository
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables (PORT, MONGO_URI, JWT_SECRET)
7. Deploy

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Create account on vercel.com
3. Import repository
4. Framework: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add environment variable: `VITE_API_URL=your_render_backend_url/api`
8. Deploy

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Health Records
- `POST /api/health/add` - Add health record (protected)
- `GET /api/health/all` - Get all user records (protected)
- `GET /api/health/:id` - Get single record (protected)
- `PUT /api/health/:id` - Update record (protected)
- `DELETE /api/health/:id` - Delete record (protected)
- `GET /api/health/stats` - Get health statistics (protected)

## 🐛 Common Errors & Fixes

### Backend Errors

**Error: Cannot connect to MongoDB**
- Check MONGO_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**Error: JWT must be provided**
- Include Authorization header: `Bearer <token>`
- Check if token is expired

**Error: Port already in use**
- Change PORT in .env or kill process: `npx kill-port 5000`

### Frontend Errors

**Error: Network Error / CORS**
- Check VITE_API_URL in .env
- Verify backend CORS configuration
- Ensure backend is running

**Error: Cannot read property of undefined**
- Check if user is logged in
- Verify API response structure

## 📝 Interview Points

- **Authentication**: JWT-based stateless authentication
- **Security**: Password hashing with bcrypt, protected routes
- **Database**: MongoDB with Mongoose ODM
- **API Design**: RESTful API architecture
- **State Management**: Context API for global auth state
- **Deployment**: Production-ready with environment variables

## 👨‍💻 Author

Built by [Your Name] - Add to your resume as a full-stack MERN project

## 📄 License

MIT License - Free to use for learning and portfolio
