# User Registration Endpoint Documentation

## POST `/users/register`

### Description

Registers a new user in the system. This endpoint validates the input, creates a new user, hashes the password, and returns an authentication token along with the user data.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### Responses

- **201 Created**
  - **Description:** User registered successfully.
  - **Body:**
    ```json
    {
      "token": "jwt_token_string",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description:** Validation failed or missing required fields.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

---

### Notes

- The `lastname` field is optional but must be at least 3 characters if provided.
- The `email` must be unique and valid.
- The `password` is stored securely (hashed) and not returned in the response.

---

# User Login Endpoint Documentation

## POST `/users/login`

### Description

Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

#### Example

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

### Responses

- **200 OK**
  - **Description:** User logged in successfully.
  - **Body:**
    ```json
    {
      "token": "jwt_token_string",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- **400 Bad Request**
  - **Description:** Validation failed or missing required fields.
  - **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field",
          "location": "body"
        }
      ]
    }
    ```

- **401 Unauthorized**
  - **Description:** Invalid email or password.
  - **Body:**
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

### Notes

- Both `email` and `password` are required.
- Returns a JWT token for authenticated requests.

---

# User Profile Endpoint Documentation

## GET `/users/profile`

### Description

Returns the authenticated user's profile information.  
**Requires authentication (JWT token in cookie or Authorization header).**

---

### Request

- **Headers:**  
  - `Cookie: token=jwt_token_string`  
  or  
  - `Authorization: Bearer jwt_token_string`

---

### Responses

- **200 OK**
  - **Description:** Returns the user's profile.
  - **Body:**
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

- **401 Unauthorized**
  - **Description:** No token provided or token invalid.
  - **Body:**
    ```json
    {
      "message": "Not authorized, token failed"
    }
    ```

---

# User Logout Endpoint Documentation

## GET `/users/logout`

### Description

Logs out the authenticated user by clearing the authentication token and blacklisting it.  
**Requires authentication (JWT token in cookie or Authorization header).**

---

### Request

- **Headers:**  
  - `Cookie: token=jwt_token_string`  
  or  
  - `Authorization: Bearer jwt_token_string`

---

### Responses

- **200 OK**
  - **Description:** User logged out successfully.
  - **Body:**
    ```json
    {
      "message": "Logged out"
    }
    ```

- **401 Unauthorized**
  - **Description:** No token provided or token invalid.
  - **Body:**
    ```json
    {
      "message": "Not authorized, token failed"
    }
    ```