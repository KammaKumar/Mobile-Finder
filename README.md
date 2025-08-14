# FindMyPhone Web Application

A comprehensive lost and found phone recovery system with MongoDB backend.

## Features

- **Lost Phone Reporting**: Users can report lost phones with detailed information
- **Found Phone Upload**: Community members can upload found phones with images
- **AI-Powered Matching**: Automatic matching system based on device characteristics
- **Secure Chat System**: Anonymous communication between owners and finders
- **Verification System**: OTP-based ownership verification
- **Reward System**: Optional rewards for finders
- **Real-time Dashboard**: Live updates and notifications

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```
MONGODB_URI=mongodb://localhost:27017/findmyphone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
FRONTEND_URL=http://localhost:5173
```

3. Start MongoDB (if running locally):
```bash
mongod
```

4. Start the backend server:
```bash
npm run server
```

5. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API Health Check: http://localhost:3001/api/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Phones
- `GET /api/phones` - Get all phones with filtering
- `POST /api/phones` - Report lost/found phone
- `GET /api/phones/:id` - Get phone by ID
- `PUT /api/phones/:id` - Update phone
- `DELETE /api/phones/:id` - Delete phone

### Matches
- `GET /api/matches` - Get user's matches
- `GET /api/matches/:id` - Get match details
- `POST /api/matches/:id/verify` - Verify match
- `POST /api/matches/:id/reject` - Reject match

### Chat
- `GET /api/chat` - Get user's chats
- `POST /api/chat/phone/:phoneId` - Create/get chat for phone
- `GET /api/chat/:id` - Get chat messages
- `POST /api/chat/:id/messages` - Send message

## Database Schema

### Users
- Personal information and authentication
- Reputation system
- Verification status

### Phones
- Device details (brand, model, color, IMEI)
- Location information
- Images and description
- Status tracking

### Matches
- AI-powered matching between lost and found phones
- Confidence scoring
- Verification system

### Chats
- Anonymous messaging system
- Message history
- Read status tracking

## Development

### Running in Development Mode

Frontend only:
```bash
npm run dev
```

Backend only:
```bash
npm run server
```

Backend with auto-reload:
```bash
npm run dev:server
```

### Building for Production

```bash
npm run build
```

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- Anonymous chat system
- Secure ownership verification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.