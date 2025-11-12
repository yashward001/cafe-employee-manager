# Cafe Employee Manager

A full-stack web application for managing cafe employees and their assignments. This system allows cafe owners to create, update, and manage employees across multiple cafe locations with comprehensive tracking of work history and assignments.

## Live Demo

- **Frontend**: [https://cafe-employee-manager.netlify.app](https://cafe-employee-manager.netlify.app)
- **Backend API**: [https://cafe-employee-manager.onrender.com](https://cafe-employee-manager.onrender.com)

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

## Features

### Employee Management
- Create new employees with unique employee codes
- Update employee information (name, email, phone, gender, start date)
- Assign employees to specific cafe locations
- Delete employee records
- Filter employees by cafe location
- Track days worked since start date

### Cafe Management
- Create and manage multiple cafe locations
- Update cafe details (name, description, location, logo)
- Delete cafe records (cascades to unassign employees)
- Filter cafes by location
- View employee count per cafe

### Data Validation
- Email validation for employee records
- Phone number validation (8-digit format)
- Unique employee code enforcement (UIX + 7 alphanumeric)
- Required field validation
- UUID-based relationships

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide icons
- **Notifications**: React Hot Toast
- **Deployment**: Netlify

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL 16
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Containerization**: Docker
- **Deployment**: Render (Docker-based)

### Development Tools
- **TypeScript Compiler**: tsc
- **Code Execution**: tsx (TypeScript execution)
- **Linting**: ESLint
- **Package Manager**: npm
- **Version Control**: Git

## System Architecture

```
┌─────────────────┐
│   React SPA     │
│  (TypeScript)   │
│   Tailwind CSS  │
└────────┬────────┘
         │ HTTPS/REST
         │
┌────────▼────────┐
│  Express API    │
│  (TypeScript)   │
│    + Helmet     │
│     + CORS      │
└────────┬────────┘
         │ Prisma ORM
         │
┌────────▼────────┐
│   PostgreSQL    │
│   Database      │
└─────────────────┘
```

### Key Design Patterns
- **Repository Pattern**: Prisma ORM abstracts database operations
- **Service Layer**: Business logic separated from route handlers
- **DTO Pattern**: Type-safe data transfer with Zod validation
- **REST API**: Standard HTTP methods and status codes
- **SPA Architecture**: Client-side routing with React Router

## Project Structure

```
cafe-employee-manager/
├── cafe-employee-api/           # Backend API
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Database seeding
│   ├── src/
│   │   ├── api/
│   │   │   ├── controllers/     # Request handlers
│   │   │   ├── middlewares/     # Error handling, validation
│   │   │   └── routes/          # API route definitions
│   │   ├── application/
│   │   │   └── commands/        # Business logic layer
│   │   ├── domain/
│   │   │   └── repositories/    # Data access layer
│   │   └── utils/
│   │       └── validators.ts    # Zod schemas
│   ├── Dockerfile               # Production Docker image
│   ├── docker-compose.test.yml  # Local testing setup
│   ├── start.sh                 # Container startup script
│   └── package.json
│
├── cafe-employee-frontend/      # Frontend React App
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── CafeForm.tsx
│   │   │   └── EmployeeForm.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── CafesPage.tsx
│   │   │   └── EmployeesPage.tsx
│   │   ├── router/              # Route configuration
│   │   ├── services/            # API service layer
│   │   │   ├── api.ts
│   │   │   ├── cafeService.ts
│   │   │   └── employeeService.ts
│   │   ├── types/               # TypeScript interfaces
│   │   └── App.tsx
│   ├── netlify.toml             # Netlify configuration
│   └── package.json
│
└── DEPLOYMENT_GUIDE.md          # Deployment instructions
```

## Prerequisites

### Required Software
- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **PostgreSQL**: v16.x or higher
- **Docker** (optional): v24.x or higher
- **Docker Compose** (optional): v2.x or higher

### Development Environment
- Git for version control
- A code editor (VS Code recommended)
- Terminal/Command line access

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yashward001/cafe-employee-manager.git
cd cafe-employee-manager
```

### 2. Backend Setup

```bash
cd cafe-employee-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Configure .env with your local PostgreSQL credentials
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cafeapp?schema=public"
# PORT=8080

# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

The API will be available at `http://localhost:8080`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd cafe-employee-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Verify Setup

- Navigate to `http://localhost:5173` in your browser
- You should see the homepage with navigation to Cafes and Employees
- Sample data should be visible (2 cafes, 3 employees)

## Docker Setup

For a containerized local environment that mirrors production:

### 1. Start Docker Services

```bash
cd cafe-employee-api

# Build and start containers
docker-compose -f docker-compose.test.yml up --build

# The API will be available at http://localhost:8080
# PostgreSQL will be available on port 5432
```

### 2. Start Frontend

```bash
cd cafe-employee-frontend
npm run dev
```

### 3. Stop Docker Services

```bash
docker-compose -f docker-compose.test.yml down
```

## API Documentation

### Base URL
- **Local**: `http://localhost:8080/api`
- **Production**: `https://cafe-employee-manager.onrender.com/api`

### Cafe Endpoints

#### Get All Cafes
```http
GET /api/cafes?location={location}
```

**Query Parameters:**
- `location` (optional): Filter cafes by location

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "name": "Cafe Mocha",
    "description": "Cozy corner cafe",
    "logo": "https://example.com/logo.png",
    "location": "Orchard",
    "employees": 5
  }
]
```

#### Create Cafe
```http
POST /api/cafes
```

**Request Body:**
```json
{
  "name": "New Cafe",
  "description": "Description",
  "location": "Location",
  "logo": "https://example.com/logo.png"
}
```

**Response:** `201 Created`

#### Update Cafe
```http
PUT /api/cafes/:id
```

**Request Body:** Same as Create Cafe

**Response:** `200 OK`

#### Delete Cafe
```http
DELETE /api/cafes/:id
```

**Response:** `200 OK`

### Employee Endpoints

#### Get All Employees
```http
GET /api/employees?cafe={cafeName}
```

**Query Parameters:**
- `cafe` (optional): Filter employees by cafe name

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "empCode": "UIX123456",
    "name": "John Doe",
    "email_address": "john@example.com",
    "phone_number": "91234567",
    "days_worked": 30,
    "cafe": "Cafe Mocha"
  }
]
```

#### Create Employee
```http
POST /api/employees
```

**Request Body:**
```json
{
  "empCode": "UIX123456",
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "91234567",
  "gender": "M",
  "startDate": "2024-01-01T00:00:00Z",
  "cafeId": "uuid-or-null"
}
```

**Response:** `201 Created`

#### Update Employee
```http
PUT /api/employees/:id
```

**Request Body:** Same as Create Employee (except empCode)

**Response:** `200 OK`

#### Delete Employee
```http
DELETE /api/employees/:id
```

**Response:** `200 OK`

## Database Schema

### Cafe Table
```prisma
model Cafe {
  id          String     @id @default(uuid())
  name        String
  description String
  logo        String?
  location    String
  employees   Employee[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

### Employee Table
```prisma
model Employee {
  id          String    @id @default(uuid())
  empCode     String    @unique
  name        String
  email       String
  phoneNumber String
  gender      String
  startDate   DateTime?
  cafe        Cafe?     @relation(fields: [cafeId], references: [id], onDelete: SetNull)
  cafeId      String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### Relationships
- One Cafe can have many Employees (One-to-Many)
- One Employee belongs to zero or one Cafe
- When a Cafe is deleted, associated Employees have their `cafeId` set to `null`

## Deployment

### Production Architecture

```
GitHub Repository
    │
    ├─→ Netlify (Frontend)
    │   - Automatic deployments from main branch
    │   - Environment: VITE_API_URL
    │
    └─→ Render (Backend + Database)
        - Docker-based deployment
        - PostgreSQL managed database
        - Environment: DATABASE_URL, PORT
```

### Backend Deployment (Render)

1. **Create PostgreSQL Database**
   - Service: PostgreSQL
   - Plan: Free tier
   - Note the Internal Database URL

2. **Deploy API**
   - Service: Web Service
   - Environment: Docker
   - Root Directory: `cafe-employee-api`
   - Docker Build Context: `cafe-employee-api`
   - Dockerfile: `Dockerfile`
   - Environment Variables:
     - `DATABASE_URL`: Internal Database URL from step 1
     - `PORT`: 8080

### Frontend Deployment (Netlify)

1. **Connect Repository**
   - New Site from Git
   - Select: GitHub repository

2. **Build Settings**
   - Base directory: `cafe-employee-frontend`
   - Build command: `npm run build`
   - Publish directory: `cafe-employee-frontend/dist`

3. **Environment Variables**
   - `VITE_API_URL`: Your Render backend URL

### Automated Deployments

- **Frontend**: Automatically redeploys on push to main branch
- **Backend**: Automatically redeploys on push to main branch
- Both platforms support manual deploy triggers

## Environment Variables

### Backend (.env)

```bash
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
PORT=8080
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:8080/api
```

**Note**: For production, set `VITE_API_URL` in Netlify dashboard to point to your Render backend.

## Development Workflow

### Making Changes

1. Create a feature branch
2. Make your changes
3. Test locally
4. Commit and push
5. Create pull request
6. After merge, automatic deployment triggers

### Testing

```bash
# Backend
cd cafe-employee-api
npm run dev

# Frontend
cd cafe-employee-frontend
npm run dev
```

### Building for Production

```bash
# Backend
cd cafe-employee-api
npm run build

# Frontend
cd cafe-employee-frontend
npm run build
```

## Troubleshooting

### Common Issues

**Database Connection Errors**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**CORS Errors**
- Verify frontend URL is in backend CORS configuration
- Check environment variables

**Build Failures**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version matches requirements
- Verify all environment variables are set

**Docker Issues**
- Ensure Docker Desktop is running
- Try: `docker-compose down -v` to remove volumes
- Rebuild: `docker-compose up --build`

## Contributing

This is a submission project for GIC. For any questions or issues, please contact the repository owner.

## License

This project is submitted as part of a technical assessment.

## Author

Yashwardhan
- GitHub: [@yashward001](https://github.com/yashward001)

## Acknowledgments

- Built as a technical assessment project
- Demonstrates full-stack development capabilities
- Implements modern web development best practices