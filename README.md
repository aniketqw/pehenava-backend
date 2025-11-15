# Pehenava Backend

A Node.js/Express backend application with MongoDB integration for the Pehenava project.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Running Without Docker (Local Setup)](#running-without-docker-local-setup)
- [Running With Docker](#running-with-docker)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Prerequisites

### For Local Setup (Without Docker)
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally OR MongoDB Atlas account
- npm (comes with Node.js)

### For Docker Setup
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for easier setup)

## Running Without Docker (Local Setup)

When running without Docker, **all dependencies will be installed locally** on your machine.

### Step 1: Install Dependencies

```bash
npm install
```

This will install all the required packages locally:
- express
- mongoose
- dotenv

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables to your `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/pehenava
```

**Note:**
- If using MongoDB locally, make sure MongoDB is running on your machine
- If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string:
  ```
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pehenava?retryWrites=true&w=majority
  ```

### Step 3: Start MongoDB (if using local MongoDB)

```bash
# On macOS (using Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### Step 4: Run the Application

```bash
npm start
# or
node src/app.js
```

The server will start on `http://localhost:3000`

You should see:
```
MongoDB connected
Server running on port 3000
```

## Running With Docker

When running with Docker, **all dependencies are containerized** - nothing is installed on your local machine except Docker itself.

### Option 1: Using Docker Only

#### Step 1: Create Environment File

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/pehenava
```

#### Step 2: Build the Docker Image

```bash
docker build -t pehenava-backend .
```

#### Step 3: Run MongoDB Container

```bash
docker run -d \
  --name pehenava-mongo \
  -p 27017:27017 \
  mongo:latest
```

#### Step 4: Run the Application Container

```bash
docker run -d \
  --name pehenava-backend \
  --link pehenava-mongo:mongo \
  -p 3000:3000 \
  --env-file .env \
  pehenava-backend
```

### Option 2: Using Docker Compose (Recommended)

Docker Compose will manage both the application and MongoDB containers together.

#### Step 1: Create Environment File

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/pehenava
```

#### Step 2: Start All Services

```bash
docker-compose up -d
```

To view logs:
```bash
docker-compose logs -f
```

To stop all services:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```

### Accessing the Application

Once running, access the application at:
- API: `http://localhost:3000`
- MongoDB (if needed): `mongodb://localhost:27017`

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Port number for the server | 3000 | No |
| `MONGO_URI` | MongoDB connection string | - | Yes |

### Example `.env` file

```env
# Server Configuration
PORT=3000

# Database Configuration
# For local MongoDB
MONGO_URI=mongodb://localhost:27017/pehenava

# For MongoDB Atlas
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pehenava?retryWrites=true&w=majority

# For Docker (using docker-compose)
# MONGO_URI=mongodb://mongo:27017/pehenava
```

## API Endpoints

### Default Route
- **GET** `/` - Health check endpoint
  ```
  Response: "Pehenava Backend is Running"
  ```

### User Routes
All user routes are prefixed with `/api`

- **POST** `/api/users` - Create a new user
- **GET** `/api/users` - Get all users
- (Add more endpoints as they are implemented)

### Example Request

```bash
# Health check
curl http://localhost:3000/

# Create a user (example)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

## Project Structure

```
pehenava-backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── controllers/
│   │   └── user.controller.js  # User business logic
│   ├── models/
│   │   └── user.model.js       # User schema/model
│   ├── routes/
│   │   └── user.routes.js      # User API routes
│   └── app.js                  # Application entry point
├── .env                        # Environment variables (create this)
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker Compose configuration
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## Development

### Adding New Dependencies

When running **without Docker**:
```bash
npm install <package-name>
```

When running **with Docker**, after adding to package.json:
```bash
docker-compose down
docker-compose build
docker-compose up -d
```

### Viewing Logs

**Without Docker:**
- Logs appear directly in your terminal

**With Docker:**
```bash
docker-compose logs -f app
```

## Troubleshooting

### MongoDB Connection Issues

1. **Local Setup**: Ensure MongoDB is running
   ```bash
   # Check if MongoDB is running
   # macOS
   brew services list

   # Linux
   sudo systemctl status mongod
   ```

2. **Docker Setup**: Ensure MongoDB container is running
   ```bash
   docker ps | grep mongo
   ```

3. Check your `MONGO_URI` in the `.env` file is correct

### Port Already in Use

If port 3000 is already in use, change the `PORT` variable in your `.env` file:
```env
PORT=3001
```

### Docker Issues

1. Remove all containers and volumes:
   ```bash
   docker-compose down -v
   docker system prune -a
   ```

2. Rebuild from scratch:
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

## License

ISC

## Author

[Your Name]
