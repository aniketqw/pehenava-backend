# Pehenava Backend API Documentation

## Base URLs

**Production:** `https://pehenava-backend.vercel.app`
**Local Development:** `http://localhost:3000`

> **Note:** Use the production URL for deployed applications and the local URL when running the backend on your development machine.

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
- [Cloudinary Image Storage](#cloudinary-image-storage)

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
  "Name": "Alankrit Sinha",
  "email": "alankrit@student.com",
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
    "Name": "Alankrit Sinha",
    "email": "alankrit@student.com",
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
    "email": "alankrit@student.com",
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
  "email": "alankrit@student.com",
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
    "Name": "Alankrit Sinha",
    "email": "alankrit@student.com",
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
    "email": "alankrit@student.com,
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
    "Name": "Alankrit Sinha",
    "email": "alankrit@student.com",
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
    "photo": "https://res.cloudinary.com/dhfdccotv/image/upload/v1732123456/pehenava/posts/1732123456-673d4eb555065106-summer-fashion.jpg",
    "creator": {
      "userId": "673d4eb555065106e56ec4d",
      "Name": "Alankrit Sinha",
      "email": "alankrit@student.com",
      "role": "Influencer"
    },
    "likesCount": 0,
    "dislikesCount": 0,
    "createdAt": "2025-11-15T10:58:13.362Z"
  }
}
```

> **Note:** Images are now stored on Cloudinary CDN and returned as full HTTPS URLs for optimal performance and global delivery.

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
    "photo": "https://res.cloudinary.com/dhfdccotv/image/upload/v1732134567/pehenava/posts/1732134567-673d4eb555065106-new-photo.jpg",
    "creator": {
      "userId": "673d4eb555065106e56ec4d",
      "Name": "John Doe",
      "email": "alankrit@student.com",
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
- Old photo is automatically deleted from Cloudinary when new photo is uploaded

**Important Notes:**
- **Name cannot be updated** (it's a unique identifier)
- Only the post creator can update their own post
- When uploading a new photo, the old photo is automatically deleted from the database
- At least one field must be provided (description or photo)
- Post's like/dislike counts do not change during updates

---

### Get All Posts

Retrieve all posts with complete feedback details for each post. Use this endpoint to display posts in a feed/timeline view with feedback immediately visible.

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
  "count": 2,
  "posts": [
    {
      "postId": "673f5ac123456789abc",
      "name": "Summer Fashion 2024",
      "description": "Latest summer fashion trends featuring...",
      "photo": "https://res.cloudinary.com/dhfdccotv/image/upload/v1732123456/pehenava/posts/1732123456-673d4eb555065106-summer.jpg",
      "creator": {
        "userId": "673d4eb555065106e56ec4d",
        "Name": "Alankrit Sinha",
        "role": "Influencer"
      },
      "feedbacks": [
        {
          "userId": "673d5ab123456789xyz",
          "userName": "Ajay",
          "like": true,
          "description": "Love this style! Perfect for summer",
          "createdAt": "2025-11-15T12:30:00.000Z"
        },
        {
          "userId": "673d8ef456789012jkl",
          "userName": "Siddharth",
          "like": false,
          "description": "Not my preferred style",
          "createdAt": "2025-11-15T13:45:00.000Z"
        }
      ],
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
        "Name": "Ajay",
        "role": "Recommender"
      },
      "feedbacks": [],
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
  - **Complete feedbacks array** with userId, userName, like, description, createdAt
  - Feedback counts (likesCount, dislikesCount)
  - Creation timestamp

**Important Notes:**
- Each post includes its **complete feedback array** (sorted newest first)
- Empty array `[]` returned for posts with no feedback
- Feedback format is consistent with View Post endpoints
- No `feedbackId` included in feedback objects

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

**Use Cases:**
- Display posts in feed/timeline with feedback immediately visible
- No need for separate View Post call to see feedback
- Single request to load all posts with complete data
- Useful for social feed views where users see feedback inline
- Can filter/sort posts by feedback counts on frontend

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

Users can give likes to posts. Users can create new feedback or update existing feedback. Only one feedback per user per post is allowed.

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
| like | Boolean | Yes | true = boolean|
| description | String | No | Optional feedback text (max 500 characters) |

> **Note:** The `description` field is properly persisted to the database and will be visible in all feedback queries (View Post, View Post by Name, etc.).

---

## ⚙️ How This Endpoint Handles Both Creation and Update

This single endpoint intelligently handles **both creating new feedback and updating existing feedback** using an "upsert" pattern:

### **Decision Logic:**

1. **Lookup Check:**
   ```
   Query: Find feedback where postId = <post._id> AND userId = <current user>
   ```

2. **If NO existing feedback found:**
   - **Action:** CREATE new feedback
   - **Response:** `201 Created`
   - **Post Count:** Increment `likesCount` (if like=true) or `dislikesCount` (if like=false)

3. **If existing feedback found:**
   - **Action:** UPDATE existing feedback
   - **Response:** `200 OK`
   - **Post Count Logic:**
     - If `like` value **changed** : Decrement old count, increment new count
     - If `like` value **same**: No count changes, only update description

### **Example Flow:**

```
User Alice on "Summer Fashion 2024":

1st Call: POST { like: true, description: "Love it!" }
   → No existing feedback → CREATE → likesCount: 0→1

2nd Call: POST { like: true, description: "Really love it!" }
   → Existing feedback found → UPDATE description only → likesCount: 1

3rd Call: POST { like: false, description: "Changed my mind" }
   → Existing feedback found → UPDATE like value → likesCount: 1→0, dislikesCount: 0→1
```

---

**Success Response - New Feedback (201 Created):**
```json
{
  "message": "Feedback submitted successfully",
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
  "message": "Feedback updated",
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
  "photo": "https://res.cloudinary.com/dhfdccotv/image/upload/v1732123456/pehenava/posts/1732123456-673d4eb-summer.jpg",
  "creator": {
    "userId": "673d4eb555065106e56ec4d",
    "Name": "Alankrit Sinha",
    "role": "Influencer"
  },
  "feedbacks": [
    {
      "feedbackId": "673f6bc234567890def",
      "userId": "673d5ab123456789xyz",
      "userName": "Ajay",
      "like": true,
      "description": "Love this style! Perfect for summer",
      "createdAt": "2025-11-15T12:30:00.000Z"
    },
    {
      "feedbackId": "673f7cd345678901ghi",
      "userId": "673d8ef456789012jkl",
      "userName": "Siddharth",
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
