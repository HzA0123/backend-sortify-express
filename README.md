# Sortify Express Backend

Backend service for the Sortify application built with Express.js.

## Features

- Authentication & Authorization
- User Management
- Waste Management
- Education Content
- Statistics

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend-sortify-express
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory and configure:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

## Project Structure

```
src/
├── controllers/     # Request handlers
│   ├── authController.js
│   ├── edukasiController.js
│   ├── sampahController.js
│   ├── statistikController.js
│   └── userController.js
├── middleware/      # Custom middleware
│   └── authMiddleware.js
├── routers/        # Route definitions
│   ├── authRoutes.js
│   ├── edukasiRoutes.js
│   ├── sampahRoutes.js
│   ├── statistikRoutes.js
│   └── userRoutes.js
└── utils/          # Utility functions
    └── uploadHelper.js
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login

### User Management
- GET /api/users - Get all users
- GET /api/users/:id - Get user by ID
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

### Waste Management
- GET /api/sampah - Get all waste records
- POST /api/sampah - Create new waste record
- GET /api/sampah/:id - Get waste record by ID
- PUT /api/sampah/:id - Update waste record
- DELETE /api/sampah/:id - Delete waste record

### Education Content
- GET /api/edukasi - Get all educational content
- POST /api/edukasi - Create new educational content
- GET /api/edukasi/:id - Get educational content by ID

### Statistics
- GET /api/statistik - Get waste management statistics
- GET /api/statistik/user/:id - Get user statistics

## License

MIT License
