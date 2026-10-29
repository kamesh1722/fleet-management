# Fleet Vehicle Management System - Backend API

Production-ready Node.js & Express.js REST API service connected to MongoDB via Mongoose.

## Architecture & Directory Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection initialization
│   ├── models/
│   │   ├── Vehicle.js            # Fleet vehicle schema & indexing
│   │   ├── Maintenance.js        # Service scheduling & maintenance records
│   │   ├── Insurance.js          # Insurance policies & expiration tracking
│   │   ├── FuelExpense.js        # Fuel logs & operational cost tracking
│   │   └── Alert.js              # Health, compliance & scheduled alerts
│   ├── controllers/
│   │   ├── dashboardController.js# Real-time summaries, telemetry, analytics
│   │   ├── vehicleController.js  # Vehicle CRUD & registry operations
│   │   ├── maintenanceController.js # Service ticket workflow
│   │   ├── insuranceController.js# Policy lifecycle management
│   │   └── alertController.js    # Operational alerts & resolution
│   ├── routes/
│   │   ├── dashboardRoutes.js    # /api/dashboard/*
│   │   ├── vehicleRoutes.js      # /api/vehicles/*
│   │   ├── maintenanceRoutes.js  # /api/maintenance/*
│   │   ├── insuranceRoutes.js    # /api/insurance/*
│   │   └── alertRoutes.js        # /api/alerts/*
│   ├── middleware/
│   │   └── errorHandler.js       # Global 404 & centralized error handler
│   ├── scripts/
│   │   └── seedData.js           # Database seeder with realistic fleet documents
│   └── server.js                 # Express bootstrap & middleware configuration
├── .env.example
├── .env
└── package.json
```

## REST API Endpoints

### 1. Dashboard Overview
- `GET /api/dashboard/summary` - Aggregate metrics (Total, Active, Available, Maintenance, Utilization Rate, Expiring Insurance, Urgent Services, Avg Health).
- `GET /api/dashboard/recent-activity` - Real-time active vehicle telemetry and status stream.
- `GET /api/dashboard/reminders` - Upcoming maintenance due dates and 30-day insurance expiration warnings.
- `GET /api/dashboard/analytics` - Operational cost trends, fuel spend vs maintenance, and fleet distribution.

### 2. Vehicle Management
- `GET /api/vehicles` - List all vehicles with query filters (`status`, `type`, `search`, pagination).
- `GET /api/vehicles/:id` - Detailed vehicle profile with maintenance history & insurance.
- `POST /api/vehicles` - Register a new vehicle to the fleet.
- `PUT /api/vehicles/:id` - Update vehicle specifications or assignment.
- `DELETE /api/vehicles/:id` - Decommission vehicle.

### 3. Maintenance & Service Scheduling
- `GET /api/maintenance` - List scheduled, in-progress, or completed maintenance tickets.
- `POST /api/maintenance` - Schedule a new service inspection.
- `PATCH /api/maintenance/:id/status` - Update ticket status (Scheduled -> In Progress -> Completed).

### 4. Insurance Management
- `GET /api/insurance` - Retrieve insurance coverage records and renewal alerts.
- `POST /api/insurance` - Log a new vehicle policy.

### 5. Alerts & Reminders
- `GET /api/alerts` - Query active system alerts and diagnostic codes.
- `PATCH /api/alerts/:id/read` - Mark alert as acknowledged.
- `PATCH /api/alerts/:id/resolve` - Resolve active alert.

## Setup & Running Backend
```bash
# Install dependencies
npm install

# Seed MongoDB with realistic fleet data
npm run seed

# Run in development mode (hot reloading)
npm run dev

# Run in production mode
npm start
```
