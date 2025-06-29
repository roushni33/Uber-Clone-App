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
        # Captain Registration Endpoint Documentation
    
    ## POST `/captains/register`
    
    ### Description
    
    Registers a new captain in the system. This endpoint validates the input, creates a new captain with vehicle details, hashes the password, and returns an authentication token along with the captain data.
    
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
      "password": "string (min 6 chars, required)",
      "vehicle": {
        "color": "string (min 3 chars, required)",
        "plate": "string (min 3 chars, required)",
        "capacity": 1,
        "vehicleType": "car" // or "moto" or "auto"
      }
    }
    ```
    
    #### Example
    
    ```json
    {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.captain@example.com",
      "password": "securePassword123",
      "vehicle": {
        "color": "Red",
        "plate": "MP 04 XY 6204",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
    ```
    
    ---
    
    ### Responses
    
    - **201 Created**
      - **Description:** Captain registered successfully.
      - **Body:**
        ```json
        {
          "token": "jwt_token_string",
          "captain": {
            "_id": "captain_id",
            "fullname": {
              "firstname": "John",
              "lastname": "Doe"
            },
            "email": "john.captain@example.com",
            "vehicle": {
              "color": "Red",
              "plate": "MP 04 XY 6204",
              "capacity": 4,
              "vehicleType": "car"
            }
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
    
    - All vehicle fields are required and must meet the minimum requirements.
    - The `email` must be unique and valid.
    - The `password` is stored securely (hashed) and not returned in the response.
    - The `vehicleType` must be one of `"car"`,

        # Captain Login Endpoint Documentation
    
    ## POST `/captains/login`
    
    ### Description
    
    Authenticates a captain with email and password. Returns a JWT token and captain data if credentials are valid.
    
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
      "email": "john.captain@example.com",
      "password": "securePassword123"
    }
    ```
    
    ---
    
    ### Responses
    
    - **200 OK**
      - **Description:** Captain logged in successfully.
      - **Body:**
        ```json
        {
          "token": "jwt_token_string",
          "captain": {
            "_id": "captain_id",
            "fullname": {
              "firstname": "John",
              "lastname": "Doe"
            },
            "email": "john.captain@example.com",
            "vehicle": {
              "color": "Red",
              "plate": "MP 04 XY 6204",
              "capacity": 4,
              "vehicleType": "car"
            }
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
    
    # Captain Profile Endpoint Documentation
    
    ## GET `/captains/profile`
    
    ### Description
    
    Returns the authenticated captain's profile information.  
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
      - **Description:** Returns the captain's profile.
      - **Body:**
        ```json
        {
          "_id": "captain_id",
          "fullname": {
            "firstname": "John",
            "lastname": "Doe"
          },
          "email": "john.captain@example.com",
          "vehicle": {
            "color": "Red",
            "plate": "MP 04 XY 6204",
            "capacity": 4,
            "vehicleType": "car"
          }
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
    
    # Captain Logout Endpoint Documentation
    
    ## GET `/captains/logout`
    
    ### Description
    
    Logs out the authenticated captain by clearing the authentication token and blacklisting it.  
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
      - **Description:** Captain logged out successfully.
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

                # Maps API Routes
        
        This backend provides several map-related endpoints using the Google Maps API. All routes require authentication via the `authUser` middleware.
        
        ## Endpoints
        
        ### 1. Get Coordinates
        
        **GET** `/api/maps/get-coordinates`
        
        **Query Parameters:**
        - `address` (string, required, min 3 chars): The address to geocode.
        
        **Response:**
        ```json
        {
          "ltd": 37.7749,
          "lang": -122.4194
        }
        ```
        
        **Errors:**
        - `400`: Validation error or missing address.
        - `404`: No results found for the given address.
        
        ---
        
        ### 2. Get Distance and Time
        
        **GET** `/api/maps/get-distance-time`
        
        **Query Parameters:**
        - `origin` (string, required, min 3 chars): Starting address or location.
        - `destination` (string, required, min 3 chars): Destination address or location.
        
        **Response:**
        ```json
        {
          "distance": {
            "text": "5.6 km",
            "value": 5600
          },
          "duration": {
            "text": "15 mins",
            "value": 900
          }
        }
        ```
        
        **Errors:**
        - `400`: Validation error or missing parameters.
        - `500`: Distance and time not found.
        
        ---
        
        ### 3. Get Autocomplete Suggestions
        
        **GET** `/api/maps/get-suggestions`
        
        **Query Parameters:**
        - `input` (string, required, min 3 chars): Partial address or place name.
        
        **Response:**
        ```json
        [
          "San Francisco, CA, USA",
          "San Francisco International Airport (SFO), San Mateo County, CA, USA"
        ]
        ```
        
        **Errors:**
        - `400`: Validation error or missing input.
        - `500`: No suggestions found.
        
        ---
        
        ## Notes
        
        - All endpoints require a valid Google Maps API key set in the environment variable `GOOGLE_MAPS_API_KEY`.
        - All endpoints require authentication.
        - All responses are in JSON