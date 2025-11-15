# Pehenava Backend API Documentation

Base URL: `http://localhost:3000`

## Table of Contents
- [Authentication Endpoints](#authentication-endpoints)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Refresh Token](#refresh-token)
  - [Logout User](#logout-user)
  - [Get Current User](#get-current-user)
- [Post Endpoints](#post-endpoints)
  - [Create Post](#create-post)
  - [Give Feedback (Placeholder)](#give-feedback-placeholder)
  - [View Post (Placeholder)](#view-post-placeholder)
- [User Endpoints](#user-endpoints)
  - [Create User (Legacy)](#create-user-legacy)
  - [Get All Users](#get-all-users)
- [Error Responses](#error-responses)
- [Status Codes](#status-codes)

---

## Authentication Endpoints

### Register User

Register a new user account and receive JWT tokens.

**Endpoint:** `POST /api/auth/register`

**Access:** Public

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "Name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "Influencer"
}
```

**Field Requirements:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | String | Yes | Min 2 characters |
| email | String | Yes | Valid email format |
| password | String | Yes | Min 8 characters, must contain uppercase, lowercase, and number |
| role | String | Yes | Must be one of: `Influencer`, `Recommender`, `Explorer` |

**Success Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "673d4eb555065106...",
    "Name": "John Doe",
    "email": "john@example.com",
    "role": "Influencer",
    "createdAt": "2025-11-15T09:58:13.362Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    },
    {
      "field": "password",
      "message": "Password must contain at least one number"
    }
  ]
}
```

**409 Conflict - User Already Exists:**
```json
{
  "message": "User already exists"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "Influencer"
  }'
```

---

### Login User

Authenticate existing user and receive JWT tokens.

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Field Requirements:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | String | Yes | Valid email format |
| password | String | Yes | Required |

**Success Response (200 OK):**
```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "673d4eb555065106...",
    "Name": "John Doe",
    "email": "john@example.com",
    "role": "Influencer",
    "createdAt": "2025-11-15T09:58:13.362Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Validation Failed:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

**401 Unauthorized - Invalid Credentials:**
```json
{
  "message": "Invalid email or password"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

---

### Refresh Token

Get a new access token using a valid refresh token.

**Endpoint:** `POST /api/auth/refresh`

**Access:** Public

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200 OK):**
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "message": "Refresh token is required"
}
```

**401 Unauthorized - Invalid Token:**
```json
{
  "message": "Invalid or expired refresh token"
}
```

**401 Unauthorized - Token Not Found:**
```json
{
  "message": "Refresh token not found"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

---

### Logout User

Invalidate a refresh token (user logout).

**Endpoint:** `POST /api/auth/logout`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "message": "Refresh token is required"
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**401 Unauthorized - Invalid Token:**
```json
{
  "message": "Not authorized, token failed"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

---

### Get Current User

Get the currently authenticated user's information.

**Endpoint:** `GET /api/auth/me`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Success Response (200 OK):**
```json
{
  "user": {
    "_id": "673d4eb555065106...",
    "Name": "John Doe",
    "email": "john@example.com",
    "role": "Influencer",
    "createdAt": "2025-11-15T09:58:13.362Z"
  }
}
```

**Error Responses:**

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**401 Unauthorized - Invalid Token:**
```json
{
  "message": "Not authorized, token failed"
}
```

**401 Unauthorized - Token Expired:**
```json
{
  "message": "Token expired"
}
```

**404 Not Found:**
```json
{
  "message": "User not found"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Post Endpoints

### Create Post

Create a new fashion post with optional photo upload.

**Endpoint:** `POST /api/posts`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Unique name for the post |
| description | String | Yes | Description of the post |
| photo | File | No | Image file (jpeg, jpg, png, gif, webp) max 5MB |

**Success Response (201 Created):**
```json
{
  "message": "Post created successfully",
  "post": {
    "postId": "673f5ac123456789abc",
    "name": "Summer Fashion 2024",
    "description": "Latest summer fashion trends featuring...",
    "photo": "uploads/posts/1731667893362-673d4eb555065106.jpg",
    "creator": {
      "userId": "673d4eb555065106e56ec4d",
      "Name": "John Doe",
      "email": "john@example.com",
      "role": "Influencer"
    },
    "likesCount": 0,
    "dislikesCount": 0,
    "createdAt": "2025-11-15T10:58:13.362Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Missing Fields:**
```json
{
  "message": "Name and description are required"
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**409 Conflict - Duplicate Name:**
```json
{
  "message": "Post with this name already exists"
}
```

**Error - Invalid File Type:**
```json
{
  "message": "Only image files are allowed (jpeg, jpg, png, gif, webp)"
}
```

**Example cURL (without photo):**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer eyJhbGc..." \
  -F "name=Summer Fashion 2024" \
  -F "description=Latest trends for summer"
```

**Example cURL (with photo):**
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer eyJhbGc..." \
  -F "name=Summer Fashion 2024" \
  -F "description=Latest trends for summer" \
  -F "photo=@/path/to/image.jpg"
```

---

### Give Feedback (Placeholder)

**⚠️ COMING SOON:** This endpoint is currently a placeholder and will be implemented in a future update.

Give thumbs up or thumbs down feedback on a post.

**Endpoint:** `POST /api/posts/feedback`

**Access:** Private (Requires Authentication)

**Planned Request Body:**
```json
{
  "postName": "Summer Fashion 2024",
  "description": "Optional feedback description",
  "like": true
}
```

**Field Requirements:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| postName | String | Yes | Name of the post to give feedback on |
| description | String | No | Optional feedback description |
| like | Boolean | Yes | true = 👍 thumbs up, false = 👎 thumbs down |

**Planned Response:**
```json
{
  "feedbackId": "673f6bc234567890def",
  "postId": "673f5ac123456789abc",
  "postName": "Summer Fashion 2024",
  "message": "Feedback submitted successfully"
}
```

**Current Response (501 Not Implemented):**
```json
{
  "message": "Feedback feature coming soon",
  "note": "This endpoint will allow users to give thumbs up/down on posts",
  "expectedRequest": {
    "postName": "string",
    "description": "string",
    "like": "boolean (true=👍, false=👎)"
  },
  "expectedResponse": {
    "feedbackId": "string",
    "postId": "string",
    "postName": "string",
    "message": "string"
  }
}
```

---

### View Post (Placeholder)

**⚠️ COMING SOON:** This endpoint is currently a placeholder and will be implemented in a future update.

View a post with all its feedback and recommendations.

**Endpoint:** `GET /api/posts/view`

**Access:** Private (Requires Authentication)

**Planned Request Body:**
```json
{
  "postName": "Summer Fashion 2024"
}
```

**Planned Response:**
```json
{
  "postId": "673f5ac123456789abc",
  "postName": "Summer Fashion 2024",
  "description": "Latest summer fashion trends...",
  "photo": "uploads/posts/1731667893362-673d4eb.jpg",
  "creator": {
    "userId": "673d4eb555065106e56ec4d",
    "Name": "John Doe",
    "role": "Influencer"
  },
  "feedbacks": [
    {
      "feedbackId": "673f6bc234567890def",
      "userId": "673d5ab123456789xyz",
      "userName": "Jane Smith",
      "like": true,
      "createdAt": "2025-11-15T11:15:30.000Z"
    }
  ],
  "likesCount": 5,
  "dislikesCount": 2,
  "recommendations": []
}
```

**Current Response (501 Not Implemented):**
```json
{
  "message": "View post feature coming soon",
  "note": "This endpoint will show post details with all feedback and recommendations",
  "expectedRequest": {
    "postName": "string"
  },
  "expectedResponse": {
    "postId": "string",
    "postName": "string",
    "description": "string",
    "photo": "string",
    "creator": "object",
    "feedbacks": "array",
    "likesCount": "number",
    "dislikesCount": "number",
    "recommendations": "array (to be defined)"
  }
}
```

---

## User Endpoints

### Create User (Legacy)

**⚠️ DEPRECATED:** Use `/api/auth/register` instead. This endpoint is kept for backward compatibility.

Create a new user without authentication (no JWT tokens returned).

**Endpoint:** `POST /api/users`

**Access:** Public

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "Name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass456",
  "role": "Recommender"
}
```

**Success Response (201 Created):**
```json
{
  "message": "User created",
  "userId": "673d4eb555065106...",
  "user": {
    "Name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Recommender",
    "createdAt": "2025-11-15T10:30:45.123Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Missing Fields:**
```json
{
  "message": "Name, email , tag, and password are required"
}
```

**400 Bad Request - Invalid Role:**
```json
{
  "message": "Invalid roles . Allowed Roles: Influencer,Recommender,Explorer"
}
```

**409 Conflict:**
```json
{
  "message": "User already exists"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Jane Smith",
    "email": "jane@example.com",
    "password": "SecurePass456",
    "role": "Recommender"
  }'
```

---

### Get All Users

Retrieve all users from the database (passwords excluded).

**Endpoint:** `GET /api/users`

**Access:** Public

**Request Headers:**
```
None required
```

**Success Response (200 OK):**
```json
[
  {
    "_id": "673d4eb555065106...",
    "Name": "John Doe",
    "email": "john@example.com",
    "role": "Influencer",
    "createdAt": "2025-11-15T09:58:13.362Z",
    "__v": 0
  },
  {
    "_id": "673d5ab123456789...",
    "Name": "Jane Smith",
    "email": "jane@example.com",
    "role": "Recommender",
    "createdAt": "2025-11-15T10:30:45.123Z",
    "__v": 0
  }
]
```

**Error Responses:**

**500 Internal Server Error:**
```json
{
  "message": "Error message details"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/users
```

---

## Error Responses

### Common Error Response Format

All error responses follow this structure:

```json
{
  "message": "Error description"
}
```

For validation errors:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "fieldName",
      "message": "Error description"
    }
  ]
}
```

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation failed |
| 401 | Unauthorized - Authentication required or failed |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server error occurred |

---

## Authentication Flow

### 1. Register or Login
```
POST /api/auth/register  OR  POST /api/auth/login
↓
Receive: { accessToken, refreshToken, user }
```

### 2. Access Protected Routes
```
Use accessToken in Authorization header:
Authorization: Bearer <accessToken>
```

### 3. When Access Token Expires
```
POST /api/auth/refresh
Body: { "refreshToken": "<refreshToken>" }
↓
Receive: { accessToken }
```

### 4. Logout
```
POST /api/auth/logout
Headers: Authorization: Bearer <accessToken>
Body: { "refreshToken": "<refreshToken>" }
```

---

## Token Information

### Access Token
- **Lifespan:** 1 hour
- **Usage:** Include in Authorization header for protected routes
- **Format:** `Bearer <token>`
- **Storage:** Store in memory or localStorage (frontend)

### Refresh Token
- **Lifespan:** 7 days
- **Usage:** Request new access token when current expires
- **Storage:** Store securely (httpOnly cookie recommended for web apps)
- **Invalidation:** Removed from database on logout

---

## User Roles

The system supports three user roles:

| Role | Description |
|------|-------------|
| `Influencer` | User who influences fashion trends |
| `Recommender` | User who recommends fashion items |
| `Explorer` | User who explores fashion options |

---

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)

**Example Valid Passwords:**
- `SecurePass123`
- `MyPassword1`
- `Fashion2024`

**Example Invalid Passwords:**
- `short1` (too short)
- `nouppercase123` (no uppercase)
- `NOLOWERCASE123` (no lowercase)
- `NoNumbers` (no numbers)

---

## Example Authentication Workflow

### Complete Authentication Example

```bash
# 1. Register new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "AlicePass123",
    "role": "Explorer"
  }'

# Response:
# {
#   "accessToken": "eyJhbGc...",
#   "refreshToken": "eyJhbGc...",
#   "user": { ... }
# }

# 2. Access protected route with access token
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer eyJhbGc..."

# 3. When access token expires, refresh it
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGc..."
  }'

# 4. Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "refreshToken": "eyJhbGc..."
  }'
```

---

## Security Notes

1. **Always use HTTPS in production** to encrypt tokens in transit
2. **Never expose JWT secrets** - keep them in environment variables
3. **Passwords are hashed** using bcrypt with 10 salt rounds
4. **Tokens are validated** on every protected route request
5. **Refresh tokens are stored** in the database and can be invalidated
6. **Security headers** are set using Helmet middleware
7. **CORS** is enabled for cross-origin requests

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider:
- Limiting login attempts (e.g., 5 attempts per 15 minutes)
- Limiting registration attempts
- General API rate limiting

---

## Support

For issues or questions, please contact the development team or check the project repository.

**Last Updated:** 2025-11-15
