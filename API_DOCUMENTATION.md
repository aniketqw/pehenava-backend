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
  - [Update Post](#update-post)
  - [Get All Posts](#get-all-posts)
  - [Search Posts](#search-posts)
  - [Give Feedback](#give-feedback)
  - [View Post](#view-post)
  - [View Post by Name](#view-post-by-name)
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

### Update Post

Update an existing post's description and/or photo. Only the post creator can update their own posts.

**Endpoint:** `PUT /api/posts/:postId`

**Access:** Private (Requires Authentication - Post Creator Only)

**Request Headers:**
```
Authorization: Bearer <accessToken>
Content-Type: multipart/form-data
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| postId | String | Yes | MongoDB ObjectId of the post to update |

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| description | String | No | Updated description for the post |
| photo | File | No | Updated image file (jpeg, jpg, png, gif, webp) max 5MB |

**Note:** At least one field (description or photo) must be provided for update.

**Success Response (200 OK):**
```json
{
  "message": "Post updated successfully",
  "post": {
    "postId": "673f5ac123456789abc",
    "name": "Summer Fashion 2024",
    "description": "Updated description with more details",
    "photo": "uploads/posts/1731667893362-new-photo.jpg",
    "creator": {
      "userId": "673d4eb555065106e56ec4d",
      "Name": "John Doe",
      "email": "john@example.com",
      "role": "Influencer"
    },
    "likesCount": 5,
    "dislikesCount": 2,
    "createdAt": "2025-11-15T10:58:13.362Z",
    "updatedAt": "2025-11-15T12:30:45.123Z"
  }
}
```

**Error Responses:**

**400 Bad Request - Invalid Post ID Format:**
```json
{
  "message": "Invalid post ID format"
}
```

**400 Bad Request - No Updates Provided:**
```json
{
  "message": "No updates provided. Please provide description and/or photo to update."
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**403 Forbidden - Not Post Creator:**
```json
{
  "message": "Access denied. You can only update your own posts.",
  "postCreator": "673d4eb555065106e56ec4d",
  "currentUser": "673d5fc666176217f67fd5e"
}
```

**404 Not Found:**
```json
{
  "message": "Post not found",
  "postId": "673f5ac123456789abc"
}
```

**Error - Invalid File Type:**
```json
{
  "message": "Only image files are allowed (jpeg, jpg, png, gif, webp)"
}
```

**Example cURL (update description only):**
```bash
curl -X PUT http://localhost:3000/api/posts/673f5ac123456789abc \
  -H "Authorization: Bearer eyJhbGc..." \
  -F "description=Updated description with more details"
```

**Example cURL (update photo only):**
```bash
curl -X PUT http://localhost:3000/api/posts/673f5ac123456789abc \
  -H "Authorization: Bearer eyJhbGc..." \
  -F "photo=@/path/to/new-image.jpg"
```

**Example cURL (update both):**
```bash
curl -X PUT http://localhost:3000/api/posts/673f5ac123456789abc \
  -H "Authorization: Bearer eyJhbGc..." \
  -F "description=Updated description with more details" \
  -F "photo=@/path/to/new-image.jpg"
```

**Use Cases:**
- Update post description to add more details or correct typos
- Replace old photo with a better quality image
- Update both description and photo when refreshing content
- Old photo file is automatically deleted when new photo is uploaded

**Important Notes:**
- **Name cannot be updated** (it's a unique identifier)
- Only the post creator can update their own post
- When updating photo, the old photo file is automatically deleted from server
- At least one field must be provided (description or photo)
- Post's like/dislike counts are preserved during update

---

### Get All Posts

Retrieve all posts with basic information and feedback counts (no detailed feedback). Use this endpoint to display posts in a list or grid view.

**Endpoint:** `GET /api/posts`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Success Response (200 OK):**
```json
{
  "message": "Posts retrieved successfully",
  "count": 3,
  "posts": [
    {
      "postId": "673f5ac123456789abc",
      "name": "Summer Fashion 2024",
      "description": "Latest summer fashion trends featuring...",
      "photo": "uploads/posts/1731667893362-673d4eb555065106.jpg",
      "creator": {
        "userId": "673d4eb555065106e56ec4d",
        "Name": "John Doe",
        "role": "Influencer"
      },
      "likesCount": 15,
      "dislikesCount": 3,
      "createdAt": "2025-11-15T10:58:13.362Z"
    },
    {
      "postId": "673f6bc234567890def",
      "name": "Winter Collection 2025",
      "description": "Cozy winter outfits...",
      "photo": null,
      "creator": {
        "userId": "673d5ab123456789xyz",
        "Name": "Jane Smith",
        "role": "Recommender"
      },
      "likesCount": 8,
      "dislikesCount": 1,
      "createdAt": "2025-11-15T11:30:00.000Z"
    }
  ]
}
```

**Response Fields:**
- `count`: Total number of posts
- `posts`: Array of post objects with:
  - Basic post info (postId, name, description, photo)
  - Creator information (userId, Name, role)
  - Feedback counts ONLY (no detailed feedback)
  - Creation timestamp

**Error Responses:**

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/posts \
  -H "Authorization: Bearer eyJhbGc..."
```

**Use Case:**
- Frontend loads this endpoint on page load
- Displays posts in list/grid view with like/dislike counts
- User can click on a post or search for specific posts
- Then call View Post endpoint for detailed feedback

---

### Search Posts

Search for posts by name (case-insensitive partial matching). Returns postId and name for frontend to fetch detailed view.

**Endpoint:** `GET /api/posts/search`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | String | Yes | Search term for post name (partial match) |

**Example URL:**
```
GET /api/posts/search?name=Summer
GET /api/posts/search?name=fashion
```

**Success Response (200 OK):**
```json
{
  "message": "Search completed",
  "count": 2,
  "results": [
    {
      "postId": "673f5ac123456789abc",
      "name": "Summer Fashion 2024"
    },
    {
      "postId": "673f7cd345678901ghi",
      "name": "Summer Collection 2025"
    }
  ]
}
```

**Response Fields:**
- `count`: Number of matching posts
- `results`: Array with postId and name only
- Returns empty array if no matches found

**Frontend Flow:**
1. User types in search bar → "summer"
2. Call `GET /api/posts/search?name=summer`
3. Get postId from results
4. Call `GET /api/posts/view/:postId` with the postId to show details

**Error Responses:**

**400 Bad Request - Missing Parameter:**
```json
{
  "message": "Search parameter \"name\" is required"
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**Example cURL:**
```bash
curl -X GET "http://localhost:3000/api/posts/search?name=Summer" \
  -H "Authorization: Bearer eyJhbGc..."
```

**Search Features:**
- Case-insensitive matching (Summer = summer = SUMMER)
- Partial matching (searching "sum" matches "Summer Fashion 2024")
- Returns all matching posts, sorted by relevance

---

### Give Feedback

Give thumbs up (👍) or thumbs down (👎) feedback on a post. Users can create new feedback or update existing feedback. Only one feedback per user per post is allowed.

**Endpoint:** `POST /api/posts/feedback`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

**Request Body:**
```json
{
  "postName": "Summer Fashion 2024",
  "like": true,
  "description": "Love this style!"
}
```

**Field Requirements:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| postName | String | Yes | Name of the post to give feedback on (min 1 character) |
| like | Boolean | Yes | true = 👍 thumbs up, false = 👎 thumbs down |
| description | String | No | Optional feedback text (max 500 characters) |

**Success Response - New Feedback (201 Created):**
```json
{
  "message": "Feedback submitted successfully: 👍 Thumbs up",
  "feedback": {
    "feedbackId": "673f6bc234567890def",
    "postId": "673f5ac123456789abc",
    "postName": "Summer Fashion 2024",
    "like": true,
    "description": "Love this style!",
    "createdAt": "2025-11-15T12:30:00.000Z",
    "updatedAt": "2025-11-15T12:30:00.000Z"
  },
  "postStats": {
    "likesCount": 1,
    "dislikesCount": 0
  }
}
```

**Success Response - Updated Feedback (200 OK):**
```json
{
  "message": "Feedback updated from 👍 to 👎",
  "feedback": {
    "feedbackId": "673f6bc234567890def",
    "postId": "673f5ac123456789abc",
    "postName": "Summer Fashion 2024",
    "like": false,
    "description": "Love this style!",
    "createdAt": "2025-11-15T12:30:00.000Z",
    "updatedAt": "2025-11-15T12:35:00.000Z"
  },
  "postStats": {
    "likesCount": 0,
    "dislikesCount": 1
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
      "field": "like",
      "message": "Like must be a boolean value (true or false)"
    }
  ]
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**404 Not Found - Post Doesn't Exist:**
```json
{
  "message": "Post not found",
  "postName": "Non-Existent Post"
}
```

**Example cURL - Create Thumbs Up:**
```bash
curl -X POST http://localhost:3000/api/posts/feedback \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"postName": "Summer Fashion 2024", "like": true, "description": "Love this!"}'
```

**Example cURL - Change to Thumbs Down:**
```bash
curl -X POST http://localhost:3000/api/posts/feedback \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"postName": "Summer Fashion 2024", "like": false}'
```

**Feedback Update Behavior:**
- **New Feedback**: Creates new feedback document, increments likesCount or dislikesCount
- **Same Vote**: Updates description only, counts unchanged
- **Changed Vote (👍→👎 or 👎→👍)**: Updates feedback, decrements old count, increments new count
- **Idempotent**: Sending same feedback multiple times is safe

---

### View Post

View detailed post information with ALL feedback and descriptions. This endpoint shows the complete post details including every user's feedback.

**Endpoint:** `GET /api/posts/view/:postId`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| postId | String | Yes | MongoDB ObjectId of the post (24 hex characters) |

**Example URL:**
```
GET /api/posts/view/673f5ac123456789abc
```

**Success Response (200 OK):**
```json
{
  "postId": "673f5ac123456789abc",
  "postName": "Summer Fashion 2024",
  "description": "Latest summer fashion trends featuring lightweight fabrics and vibrant colors",
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
      "description": "Love this style! Perfect for summer",
      "createdAt": "2025-11-15T12:30:00.000Z"
    },
    {
      "feedbackId": "673f7cd345678901ghi",
      "userId": "673d8ef456789012jkl",
      "userName": "Bob Wilson",
      "like": false,
      "description": "Not my preferred style",
      "createdAt": "2025-11-15T13:45:00.000Z"
    }
  ],
  "likesCount": 15,
  "dislikesCount": 3,
  "recommendations": []
}
```

**Response Fields:**
- `postId`, `postName`, `description`, `photo`: Basic post information
- `creator`: User who created the post (userId, Name, role)
- `feedbacks`: Array of ALL feedback with:
  - `feedbackId`, `userId`, `userName`: Feedback and user info
  - `like`: true (👍) or false (👎)
  - `description`: User's feedback text (may be null/empty)
  - `createdAt`: When feedback was given
- `likesCount`, `dislikesCount`: Total counts
- `recommendations`: Empty array (reserved for future implementation)

**Frontend Access Paths:**

**Path 1 - From Search:**
```
1. User searches → GET /api/posts/search?name=Summer
2. Get postId from search results
3. Call GET /api/posts/view/:postId with the postId
```

**Path 2 - From List:**
```
1. Frontend loads → GET /api/posts (shows all posts)
2. User clicks a post → already has postId
3. Call GET /api/posts/view/:postId
```

**Error Responses:**

**400 Bad Request - Invalid ID Format:**
```json
{
  "message": "Invalid post ID format"
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**404 Not Found - Post Doesn't Exist:**
```json
{
  "message": "Post not found",
  "postId": "673f5ac123456789999"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:3000/api/posts/view/673f5ac123456789abc \
  -H "Authorization: Bearer eyJhbGc..."
```

**Notes:**
- Feedbacks are sorted by creation date (newest first)
- Empty feedback array means no one has given feedback yet
- Recommendations array is empty for now (future feature)
- Photo field is null if post was created without a photo

---

### View Post by Name

View detailed post information with ALL feedback by searching with the exact post name. This is a convenience endpoint that combines search and view in a single request.

**Endpoint:** `GET /api/posts/view/by-name`

**Access:** Private (Requires Authentication)

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | String | Yes | Exact post name (case-insensitive) |

**Example URLs:**
```
GET /api/posts/view/by-name?name=Summer Fashion 2024
GET /api/posts/view/by-name?name=summer fashion 2024
```

**Success Response (200 OK):**
```json
{
  "postId": "673f5ac123456789abc",
  "postName": "Summer Fashion 2024",
  "description": "Latest summer fashion trends featuring lightweight fabrics and vibrant colors",
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
      "description": "Love this style! Perfect for summer",
      "createdAt": "2025-11-15T12:30:00.000Z"
    }
  ],
  "likesCount": 15,
  "dislikesCount": 3,
  "recommendations": []
}
```

**Response Format:**
Identical to the View Post endpoint - returns complete post details with all feedback.

**Error Responses:**

**400 Bad Request - Missing Name:**
```json
{
  "message": "Search parameter \"name\" is required"
}
```

**401 Unauthorized - No Token:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**404 Not Found - Post Doesn't Exist:**
```json
{
  "message": "Post not found",
  "searchedName": "Non-Existent Post"
}
```

**Example cURL:**
```bash
curl -X GET "http://localhost:3000/api/posts/view/by-name?name=Summer%20Fashion%202024" \
  -H "Authorization: Bearer eyJhbGc..."
```

**Use Cases:**
- **Single API call**: Get complete post details by name without first searching for ID
- **Simplified frontend logic**: No need for two-step process (search → view)
- **Faster response**: One round trip instead of two
- **Known post names**: When you know the exact post name (e.g., from URL parameter)

**Comparison with Alternatives:**

**Option 1: View Post by Name (This Endpoint)**
```javascript
// Single API call
GET /api/posts/view/by-name?name=Summer Fashion 2024
// Returns: Complete post with all feedback
```
✅ Simple, fast, one request

**Option 2: Search + View (Two Steps)**
```javascript
// Step 1: Search
GET /api/posts/search?name=Summer Fashion 2024
// Returns: [{ postId: "abc...", name: "Summer Fashion 2024" }]

// Step 2: View
GET /api/posts/view/abc...
// Returns: Complete post with all feedback
```
❌ More complex, two requests, slower

**Important Notes:**
- **Exact match required**: Name must match exactly (case-insensitive)
  - "Summer Fashion 2024" ✓
  - "summer fashion 2024" ✓
  - "Summer" ❌ (partial match not supported)
- **Case-insensitive**: Matching ignores case differences
- **Response format**: Identical to View Post endpoint for consistency
- **URL encoding**: Remember to encode spaces and special characters in the query string

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
