# Transaction API

## Overview
The Transaction API provides a comprehensive set of endpoints for managing and retrieving transaction data. It allows users to fetch transaction history, categorize expenses, download statements, and manage balances through credit transfers. The API ensures secure access with token-based authentication and offers various functionalities to facilitate seamless transaction management.

## Features
- **User Authentication**:
  - Register new user accounts
  - Login to obtain access tokens
  - Logout to invalidate tokens
  - Update user passwords securely

- **Transaction Management**:
  - Fetch transaction history with optional filters
  - Categorize expenses for better organization
  - Download transaction statements for specified date ranges
  - Transfer credits between users, updating their balances

## Installation
To set up the Transaction API locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/transaction-api.git
    cd transaction-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    PORT=3000
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

    The API should now be running at `http://localhost:3000`.

## Usage
### Authentication
All endpoints (except for registration and login) require a valid token. Include the token in the `Authorization` header:

```http
Authorization: Bearer your_token_here
