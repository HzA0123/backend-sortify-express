# Sortify Backend API

Backend service for the Sortify application - an AI-powered waste classification system.

## 🚀 Features

- 📱 User authentication & profile management
- 🔍 AI-powered waste classification
- 📊 Statistics and progress tracking
- 📚 Educational content
- ☁️ Google Cloud Storage integration
- 🔐 JWT-based security

## 🛠️ Tech Stack

- Node.js & Express.js
- MySQL with Sequelize ORM
- Google Cloud Storage
- JWT Authentication
- Multer for file handling
- CORS enabled
- Docker support

## 📋 Prerequisites

- Node.js v14 or higher
- MySQL 8.0
- Google Cloud account with Storage enabled
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/sortify-backend.git
cd sortify-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

5. Start the server:
```bash
npm run dev  # Development
npm start    # Production
```

## 🔌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### 👤 User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/export` - Export user data

### 🗑️ Waste Management
- `POST /api/sampah/detect` - Upload & classify waste
- `GET /api/sampah/total` - Get total classifications
- `GET /api/sampah/daur-ulang` - Get recycling stats

### 📚 Education
- `GET /api/edukasi` - Get all educational content
- `GET /api/edukasi/:id` - Get specific article

## 🐳 Docker Support

Build and run with Docker:

```bash
docker build -t sortify-backend .
docker run -p 3000:3000 sortify-backend
```

## 🔒 Environment Variables

Required environment variables:
```
PORT=3000
DB_HOSTNAME=your_db_host
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

## 📁 Project Structure

```
sortify-backend/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── migrations/     # Database migrations
├── seeders/       # Database seeders
├── config/        # Configuration files
└── uploads/       # Temporary file storage
```

