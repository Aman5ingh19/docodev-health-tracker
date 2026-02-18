# 🚀 Quick Start Guide - Docodev.AI

Get your Docodev.AI health tracking platform running in 5 minutes!

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Git

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd Docodev.AI

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Setup Environment Variables (2 minutes)

### Backend Setup

1. Create `backend/.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/docodev-ai?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters_long
NODE_ENV=development
```

2. Get MongoDB URI:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string
   - Replace username, password, and database name

### Frontend Setup

1. Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## Step 3: Run the Application (1 minute)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

## Step 4: Test the Application

1. Open browser: http://localhost:5173
2. Click "Register" and create an account
3. Login with your credentials
4. Add a health record
5. View your dashboard with statistics

## 🎉 You're Done!

Your Docodev.AI platform is now running locally!

## Next Steps

- ✅ Customize the UI
- ✅ Add more health metrics
- ✅ Deploy to production (see DEPLOYMENT_GUIDE.md)
- ✅ Add to your resume/portfolio

## Common Issues

**Backend won't start:**
- Check if MongoDB URI is correct
- Ensure port 5000 is not in use

**Frontend can't connect:**
- Verify backend is running
- Check VITE_API_URL in frontend/.env

**MongoDB connection error:**
- Whitelist your IP in MongoDB Atlas
- Check username/password in connection string

## Project Structure

```
Docodev.AI/
├── backend/           # Express API
│   ├── config/       # Database config
│   ├── controllers/  # Business logic
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   └── middleware/   # Auth & error handling
│
└── frontend/         # React + Vite
    ├── src/
    │   ├── components/  # UI components
    │   ├── context/     # Auth context
    │   ├── pages/       # Page components
    │   └── services/    # API calls
    └── public/          # Static assets
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Health Records
- POST `/api/health/add` - Add record
- GET `/api/health/all` - Get all records
- GET `/api/health/:id` - Get single record
- PUT `/api/health/:id` - Update record
- DELETE `/api/health/:id` - Delete record
- GET `/api/health/stats` - Get statistics

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

**Frontend:**
- React 18 + Vite
- React Router v6
- Context API
- Axios
- Tailwind CSS

## Support

Need help? Check:
1. README.md - Full documentation
2. DEPLOYMENT_GUIDE.md - Production deployment
3. GitHub Issues - Report bugs

---

**Happy Coding! 💻**

Built with ❤️ for learning and portfolio projects
