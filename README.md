# SibLore Software Solutions

A comprehensive full-stack web application for software services, event management, and booking system with modern UI/UX design.

## Project Overview

SibLore is a professional software solutions platform that provides:
- **Service Management**: Complete CRUD operations for software services
- **Event Management**: Event creation, listing, and ticket booking
- **Product Management**: E-commerce functionality for digital/physical products
- **Booking System**: Multi-step booking flow with payment integration
- **Admin Dashboard**: Comprehensive analytics and management interface
- **User Authentication**: Secure JWT-based authentication system

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.5.4** - Type-safe development
- **Vite 7.3.0** - Fast build tool and dev server
- **React Router 6.26.2** - Client-side routing
- **Framer Motion 11.5.4** - Smooth animations and transitions
- **Lucide React 0.522.0** - Beautiful icon library
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **MongoDB 8.0.3** - NoSQL database with Mongoose ODM
- **JWT 9.0.2** - Authentication tokens
- **Multer 1.4.4** - File upload handling
- **bcryptjs 2.4.3** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

## Project Structure

```
siblore/
├── backend/                    # Node.js/Express API server
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js            # JWT authentication
│   │   └── upload.js          # File upload configuration
│   ├── models/                 # MongoDB data models
│   │   ├── Booking.js          # Booking schema
│   │   ├── Contract.js         # Contract schema
│   │   ├── Event.js           # Event schema
│   │   ├── Product.js          # Product schema
│   │   ├── Service.js         # Service schema
│   │   └── User.js            # User schema
│   ├── routes/                 # API endpoints
│   │   ├── auth.js            # Authentication routes
│   │   ├── bookings.js        # Booking management
│   │   ├── contracts.js        # Contract management
│   │   ├── dashboard.js        # Analytics & stats
│   │   ├── events.js          # Event management
│   │   ├── products.js        # Product management
│   │   └── services.js        # Service management
│   ├── public/                 # Static file serving
│   │   └── uploads/           # User uploaded files
│   ├── server.js               # Main server file
│   └── package.json           # Backend dependencies
├── frontend/                  # React/TypeScript application
│   ├── public/                 # Static assets
│   │   └── uploads/           # Uploaded images
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Admin*          # Admin panel components
│   │   │   ├── BookingModal.tsx # Booking form
│   │   │   ├── Footer.tsx       # Page footer
│   │   │   ├── Navbar.tsx       # Navigation bar
│   │   │   ├── ServiceCard.tsx  # Service display card
│   │   │   └── ...             # Other UI components
│   │   ├── pages/              # Page components
│   │   │   ├── AdminDashboard.tsx # Admin main page
│   │   │   ├── BookingFlow.tsx   # Multi-step booking
│   │   │   ├── ContactPage.tsx   # Contact form
│   │   │   ├── EventDetailPage.tsx # Event details
│   │   │   ├── EventsPage.tsx    # Event listing
│   │   │   ├── HomePage.tsx      # Landing page
│   │   │   └── ...             # Other pages
│   │   ├── services/           # API service layer
│   │   │   └── api.ts          # HTTP client & API calls
│   │   └── ...                 # Other source files
│   └── package.json           # Frontend dependencies
└── README.md                  # This file
```

## Core Features

### Service Management
- **CRUD Operations**: Create, Read, Update, Delete services
- **Image Upload**: File upload with Multer integration
- **Category Management**: Organize services by categories
- **Pricing in KSH**: Kenyan Shillings currency support
- **Active/Inactive Status**: Toggle service availability
- **Dynamic Display**: Services fetched from database

### Event Management
- **Event Creation**: Full event details with images
- **Ticket System**: Quantity management and availability
- **Event Categories**: Concerts, Workshops, Gaming, Arts & Culture
- **Gallery Support**: Multiple event images
- **Rating System**: Event ratings and reviews
- **Organizer Info**: Contact details and organizer profile

### Product Management
- **Product CRUD**: Complete product lifecycle management
- **Image Upload**: Product image handling
- **Inventory Tracking**: Stock management
- **Category System**: Product categorization
- **Pricing Control**: Flexible pricing options

### Booking System
- **Multi-Step Flow**: Contract → Payment → Onboarding → Invoice → Complete
- **Service Selection**: Dynamic service dropdown from database
- **Payment Integration**: M-Pesa and Card payment options
- **Contract Generation**: Digital contract creation
- **Progress Tracking**: Step-by-step booking progress
- **Form Validation**: Comprehensive input validation

### Admin Dashboard
- **Analytics**: Real-time statistics and metrics
- **Revenue Tracking**: Total and monthly revenue calculations
- **User Management**: Client and booking management
- **Content Management**: Services, events, products control
- **Status Management**: Booking approval/rejection system
- **Search & Filter**: Advanced filtering capabilities

### Authentication & Security
- **JWT Authentication**: Secure token-based auth
- **Admin Protection**: Route-level authentication
- **Password Hashing**: bcryptjs for security
- **CORS Configuration**: Cross-origin request handling
- **Input Validation**: Frontend and backend validation

## Database Schema

### Service Model
```javascript
{
  title: String (required),
  description: String,
  price: String (required),
  delivery: String (required),
  features: [String],
  image: String (required),
  category: String,
  isActive: Boolean
}
```

### Event Model
```javascript
{
  title: String (required),
  date: Date (required),
  time: String (required),
  location: String (required),
  price: Number (required),
  image: String (required),
  category: String (required),
  attendees: Number,
  maxAttendees: Number (required),
  description: String (required),
  rating: Number,
  organizer: String (required),
  organizerEmail: String (required),
  organizerPhone: String (required),
  tags: [String],
  gallery: [String],
  isActive: Boolean
}
```

### Booking Model
```javascript
{
  clientName: String (required),
  email: String (required),
  phone: String (required),
  service: String (required),
  date: Date (required),
  status: String (required), // 'Pending' | 'Approved' | 'Rejected'
  notes: String,
  amount: Number (required)
}
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd siblore
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Frontend
   cd frontend
   # Edit .env with your backend URL
   ```

5. **Start the application**
   ```bash
   # Terminal 1: Start backend
   cd backend
   npm run dev
   
   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   ```

### Default Credentials
- **Admin Login**: Any email with password `admin123`
- **Development Token**: Auto-generated for testing

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/check` - Verify authentication

### Services
- `GET /api/services` - Get all services (public)
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Events
- `GET /api/events` - Get all events (public)
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event (admin)
- `DELETE /api/events/:id` - Delete event (admin)
- `GET /api/events/:id` - Get event details (public)

### Products
- `GET /api/products` - Get all products (public)
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `POST /api/bookings` - Create booking (public)
- `PUT /api/bookings/:id/status` - Update booking status (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (admin)

## UI/UX Features

### Design System
- **Dark Theme**: Professional dark color scheme
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion transitions
- **Modern Components**: Card-based layouts
- **Accessibility**: Semantic HTML and ARIA labels

### Interactive Elements
- **Hover Effects**: Interactive feedback
- **Loading States**: Skeleton loaders
- **Empty States**: User-friendly messages
- **Error Handling**: Graceful error displays
- **Form Validation**: Real-time validation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

### Environment Variables
```bash
# Backend .env
MONGODB_URI=mongodb://localhost:27017/siblore
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:5173

# Frontend .env
VITE_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions:
- Email: admin@siblore.com
- Documentation: Check this README file
- Issues: Create GitHub issues

