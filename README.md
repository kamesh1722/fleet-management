# ApexFleet - Commercial Fleet Vehicle Management System

A complete full-stack enterprise Fleet Vehicle Management System designed for commercial transport and logistics operations. Built with a modern **React.js + Vite** frontend, **Node.js + Express.js** backend, and **MongoDB + Mongoose** database.

---

## Tech Stack & Architecture

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js (ESM), Express.js, Mongoose, CORS, Morgan, Dotenv.
- **Database**: MongoDB 8.x with indexed schemas and aggregation pipelines.
- **Aesthetic**: Premium Navy Blue (`#0C1831`), Crisp White (`#FFFFFF`), Sky/Light Blue (`#0284C7`), and Slate surfaces.

```
fleet-management-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection handler
│   │   ├── models/
│   │   │   ├── Vehicle.js            # Vehicle registry & specifications
│   │   │   ├── Maintenance.js        # Service tickets & inspection logs
│   │   │   ├── Insurance.js          # Insurance policies & expiration limits
│   │   │   ├── FuelExpense.js        # Fuel purchases & odometer tracking
│   │   │   └── Alert.js              # Diagnostic codes & operational alerts
│   │   ├── controllers/
│   │   │   ├── dashboardController.js# Summary aggregations, reminders, analytics
│   │   │   ├── vehicleController.js  # CRUD operations for vehicles
│   │   │   ├── maintenanceController.js # Service ticket workflow
│   │   │   ├── insuranceController.js# Insurance compliance management
│   │   │   └── alertController.js    # Operational alerts & telemetry triggers
│   │   ├── routes/
│   │   │   ├── dashboardRoutes.js    # /api/dashboard/*
│   │   │   ├── vehicleRoutes.js      # /api/vehicles/*
│   │   │   ├── maintenanceRoutes.js  # /api/maintenance/*
│   │   │   ├── insuranceRoutes.js    # /api/insurance/*
│   │   │   └── alertRoutes.js        # /api/alerts/*
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Centralized error handler
│   │   ├── scripts/
│   │   │   └── seedData.js           # Database seeder with realistic fleet documents
│   │   └── server.js                 # Express server bootstrap
│   ├── .env                          # Backend environment variables
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg               # Automotive fleet vector favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Badge.jsx         # Status & urgency indicators
│   │   │   │   ├── StatCard.jsx      # Dashboard metric summary card
│   │   │   │   ├── Modal.jsx         # Accessible modal container
│   │   │   │   └── LoadingSpinner.jsx# Synchronizing indicator
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx       # Responsive collapsible navy sidebar
│   │   │   │   ├── Topbar.jsx        # Top navigation with live search & alerts
│   │   │   │   └── Layout.jsx        # Main structural layout shell
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardOverview.jsx # Main dashboard overview page
│   │   │   │   ├── SummaryCards.jsx  # Metric cards (Total, Active, Service, Insurance)
│   │   │   │   ├── AnalyticsSection.jsx # 6-month cost trends & health index
│   │   │   │   ├── RecentActivityTable.jsx # Telemetry table with status tabs
│   │   │   │   ├── RemindersCard.jsx # Service due & 30-day insurance reminders
│   │   │   │   ├── AddVehicleModal.jsx # Register vehicle modal form
│   │   │   │   └── VehicleDetailModal.jsx # Vehicle telemetry inspect modal
│   │   │   └── modules/
│   │   │       ├── VehiclesModule.jsx # Full fleet directory view
│   │   │       ├── MaintenanceModule.jsx # Work orders & service scheduling
│   │   │       ├── InsuranceModule.jsx # Policy compliance & limits
│   │   │       └── GenericModulePlaceholder.jsx # Telemetry placeholder
│   │   ├── context/
│   │   │   └── FleetContext.jsx      # Global state & API synchronizer
│   │   ├── services/
│   │   │   └── api.js                # Axios REST API client
│   │   ├── styles/
│   │   │   └── index.css             # Tailwind v4 theme & navy styling
│   │   ├── App.jsx                   # Root application router
│   │   └── main.jsx                  # React DOM mount point
│   ├── .env                          # Frontend environment variables
│   ├── .env.example
│   ├── vite.config.js                # Vite build & /api reverse proxy config
│   ├── package.json
│   └── index.html
│
└── README.md                         # Complete project documentation
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** v18+ (verified on Node v24)
- **MongoDB** running locally or a MongoDB Atlas connection URI

### 2. Backend Setup
```bash
cd backend

# Install backend dependencies
npm install

# Seed MongoDB with realistic commercial fleet data
npm run seed

# Start Express API in development mode
npm run dev
# Server will listen on http://localhost:5000
```

### 3. Frontend Setup
In a second terminal:
```bash
cd frontend

# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
# Frontend will run on http://localhost:5173
```

---

## Real-Time API Endpoints Tested
- `GET /api/health` - API server status
- `GET /api/dashboard/summary` - Aggregated live metrics from MongoDB
- `GET /api/dashboard/recent-activity` - Live active vehicles telemetry stream
- `GET /api/dashboard/reminders` - 30-day service & insurance expiration warnings
- `GET /api/dashboard/analytics` - 6-month operational cost breakdown & health scores
- `POST /api/vehicles` - Add new fleet asset
- `GET /api/vehicles` - Filterable fleet registry
- `GET /api/maintenance` - Scheduled service work orders
- `PATCH /api/maintenance/:id/status` - Update ticket lifecycle
- `GET /api/insurance` - Commercial insurance policy directory
