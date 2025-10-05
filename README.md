# Inventory Management System

A Spring Boot web application with REST API and modern UI for managing inventory items with full CRUD operations.

## Features

- **GitHub OAuth Authentication** - Secure login using your GitHub account
- **Web UI** - Modern, responsive interface for managing inventory
- **Create** new inventory items
- **Read** all items or by ID
- **Update** existing items
- **Delete** items
- **Search** by name and filter by category
- Input validation (frontend & backend)
- Global exception handling
- H2 in-memory database

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Security with OAuth2
- Spring Data JPA
- H2 Database
- Lombok
- Maven
- Thymeleaf

**Frontend:**
- HTML5
- CSS3 (Responsive Design)
- JavaScript (ES6+)

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- GitHub account for OAuth authentication

### GitHub OAuth Setup

**Before running the application**, you need to set up GitHub OAuth:

1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set the callback URL to: `http://localhost:8080/login/oauth2/code/github`
3. Get your Client ID and Client Secret
4. Set environment variables:

**Linux/Mac:**
```bash
export GITHUB_CLIENT_ID=your-client-id
export GITHUB_CLIENT_SECRET=your-client-secret
```

**Windows (PowerShell):**
```powershell
$env:GITHUB_CLIENT_ID="your-client-id"
$env:GITHUB_CLIENT_SECRET="your-client-secret"
```

📖 **Detailed setup instructions**: See [GITHUB_OAUTH_SETUP.md](GITHUB_OAUTH_SETUP.md)

### Running the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

**Access Points:**
- **Web Application**: http://localhost:8080
- **Login Page**: http://localhost:8080/login (Click "Sign in with GitHub")
- **REST API**: http://localhost:8080/api/inventory
- **H2 Console**: http://localhost:8080/h2-console

### Build the Project

```bash
mvn clean install
```

## Authentication

The application uses **GitHub OAuth 2.0** for authentication. All pages except `/login` require authentication.

### Login Process

1. Visit http://localhost:8080
2. Click **"Sign in with GitHub"**
3. Authorize the application on GitHub
4. You'll be redirected to the inventory management system

### First-time Setup

See [GITHUB_OAUTH_SETUP.md](GITHUB_OAUTH_SETUP.md) for detailed instructions on setting up GitHub OAuth.

## API Endpoints

### Base URL
`http://localhost:8080/api/inventory`

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |

### Inventory Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all inventory items |
| GET | `/api/inventory/{id}` | Get item by ID |
| GET | `/api/inventory/category/{category}` | Get items by category |
| GET | `/api/inventory/search?name={name}` | Search items by name |
| POST | `/api/inventory` | Create new item |
| PUT | `/api/inventory/{id}` | Update existing item |
| DELETE | `/api/inventory/{id}` | Delete item |

### Sample Request Body (POST/PUT)

```json
{
  "name": "Laptop",
  "description": "Dell XPS 15 laptop",
  "quantity": 10,
  "price": 1299.99,
  "category": "Electronics"
}
```

### Sample Response

```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Dell XPS 15 laptop",
  "quantity": 10,
  "price": 1299.99,
  "category": "Electronics",
  "createdAt": "2025-10-04T20:33:00",
  "updatedAt": "2025-10-04T20:33:00"
}
```

## Testing with cURL

### Create an Item
```bash
curl -X POST http://localhost:8080/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "Dell XPS 15",
    "quantity": 10,
    "price": 1299.99,
    "category": "Electronics"
  }'
```

### Get All Items
```bash
curl http://localhost:8080/api/inventory
```

### Get Item by ID
```bash
curl http://localhost:8080/api/inventory/1
```

### Update Item
```bash
curl -X PUT http://localhost:8080/api/inventory/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "Dell XPS 15 - Updated",
    "quantity": 15,
    "price": 1199.99,
    "category": "Electronics"
  }'
```

### Delete Item
```bash
curl -X DELETE http://localhost:8080/api/inventory/1
```

## H2 Database Console

Access the H2 console at: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:inventorydb`
- Username: `sa`
- Password: (leave empty)

## Project Structure

```
src/main/java/com/inventory/management/
├── controller/          # REST controllers
├── dto/                 # Data Transfer Objects
├── exception/           # Exception handling
├── model/              # JPA entities
├── repository/         # Data repositories
└── service/            # Business logic
```

## Validation Rules

- **name**: Required, 2-100 characters
- **description**: Optional, max 500 characters
- **quantity**: Required, minimum 0
- **price**: Required, greater than 0, max 8 digits + 2 decimals
- **category**: Required, 2-50 characters
