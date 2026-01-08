
# SibLore Software Solutions

A professional service booking platform with contract signing, payment processing, and client onboarding.

## Features

- **Complete Booking Flow**: 5-step onboarding process
- **Digital Contract Signing**: Sign contracts electronically with signature pad
- **Payment Options**: M-Pesa and Card/Google Pay integration
- **Client Onboarding**: Structured welcome and project setup
- **Invoice Generation**: Automated invoice creation with payment schedules
- **Admin Dashboard**: Manage services, bookings, and contracts
- **JWT Authentication**: Secure admin access

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Signature Canvas for digital signatures
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

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
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start the server:
```bash
npm run dev
```

The API will run on `http://localhost:5000`

## Project Structure

```
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   ├── BookingModal.tsx
│   ├── ContractDocument.tsx
│   ├── PaymentSelector.tsx
│   ├── MpesaPayment.tsx
│   ├── CardPayment.tsx
│   ├── BookingSteps.tsx
│   ├── AdminSidebar.tsx
│   ├── AdminServiceManager.tsx
│   └── AdminBookingsTable.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── BookingFlow.tsx
│   ├── AdminLogin.tsx
│   └── AdminDashboard.tsx
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   └── Contract.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── services.js
│   │   ├── bookings.js
│   │   └── contracts.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
└── data/
    └── services.ts
```

## Booking Flow Steps

1. **Contract**: Review and digitally sign the service agreement
2. **Payment**: Choose payment method (M-Pesa or Card) and pay 30% deposit
3. **Onboarding**: Receive welcome materials and project setup information
4. **Invoice**: View detailed payment breakdown and schedule
5. **Complete**: Project kickoff confirmation

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin)
- `PUT /api/bookings/:id` - Update booking status (admin)

### Contracts
- `POST /api/contracts` - Create signed contract
- `GET /api/contracts` - Get all contracts (admin)
- `GET /api/contracts/:id` - Get contract by ID
- `PUT /api/contracts/:id` - Update contract status (admin)

## Color Palette

- Primary Blue: #0EA5E9
- Primary Cyan: #38BDF8
- Dark Background: #020617
- Card Background: #030712
- Border Color: #0F172A
- Success Green: #22C55E

## License

MIT
