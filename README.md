# Inventory Management System - REST API

A Spring Boot REST API for managing inventory items with full CRUD operations.

## Features

- **Create** new inventory items
- **Read** all items or by ID
- **Update** existing items
- **Delete** items
- Search by name or filter by category
- Input validation
- Global exception handling
- H2 in-memory database

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Lombok
- Maven

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Running the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### Build the Project

```bash
mvn clean install
```

## API Endpoints

### Base URL
`http://localhost:8080/api/inventory`

### Available Endpoints

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
