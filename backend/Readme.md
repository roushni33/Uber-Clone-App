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
        "email": "john.doe@example.com",
        // other user fields
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