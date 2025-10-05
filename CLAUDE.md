# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

**Run the application:**
```bash
mvn spring-boot:run
```
Application starts at `http://localhost:8080`

**Access the web application:**
- Login: `http://localhost:8080/login` (default: admin/admin123)
- Register: `http://localhost:8080/register`
- Web UI: `http://localhost:8080` (requires authentication)
- H2 Console: `http://localhost:8080/h2-console`
- API Base URL: `http://localhost:8080/api/inventory`

**Build:**
```bash
mvn clean install
```

**Run tests:**
```bash
mvn test
```

**Run single test:**
```bash
mvn test -Dtest=ClassName#methodName
```

## Architecture

This is a Spring Boot 3.2.0 web application with Spring Security, REST API, and frontend UI following a layered architecture pattern:

**Layer Flow:** Controller → Service → Repository → Database

- **Controllers** (`controller/`) - REST endpoints at `/api/inventory` and `/api/auth`, handle HTTP requests/responses
- **Services** (`service/`) - Business logic, transaction management, and UserDetailsService for authentication
- **Repositories** (`repository/`) - JPA data access using Spring Data JPA
- **Models** (`model/`) - JPA entities (`InventoryItem`, `User`) mapped to database tables
- **DTOs** (`dto/`) - Request/Response objects for API contract
- **Exception Handlers** (`exception/`) - Global exception handling via `@RestControllerAdvice`
- **Security Config** (`config/SecurityConfig.java`) - Spring Security configuration
- **Frontend** (`src/main/resources/static/`) - HTML/CSS/JavaScript web UI (login, register, inventory management)

**Key Patterns:**
- DTOs separate external API contract from internal domain models
- Request DTOs use Jakarta Bean Validation (`@NotNull`, `@Min`, etc.)
- Response DTOs use static factory method `fromEntity()` for mapping
- Services use `@Transactional` for database operations
- Controllers use constructor injection via Lombok's `@RequiredArgsConstructor`

**Database:**
- H2 in-memory database (`jdbc:h2:mem:inventorydb`)
- Auto-creates schema on startup (`ddl-auto=update`)
- Access H2 Console at `http://localhost:8080/h2-console` (username: `sa`, no password)

**Entity Design:**
- `InventoryItem` has auto-managed timestamps via `@CreationTimestamp` and `@UpdateTimestamp`
- All entities use Lombok annotations (`@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`)

**Security:**
- Spring Security with form-based authentication
- BCrypt password encoding
- Login page: `/login`, Registration page: `/register`
- All endpoints except `/login`, `/register`, `/api/auth/**` require authentication
- Default admin user created on startup (username: `admin`, password: `admin123`)
- CSRF protection enabled (disabled for `/api/**` and `/h2-console/**`)

**Frontend:**
- Static resources served from `src/main/resources/static/`
- JavaScript uses Fetch API to communicate with REST endpoints
- CORS configured in `WebConfig` for same-origin requests
- Pages: `index.html` (main app), `login.html`, `register.html`

## API Validation Rules

When modifying DTOs or validation logic:
- **name**: 2-100 characters, required
- **description**: max 500 characters, optional
- **quantity**: ≥ 0, required
- **price**: > 0, max 8 integer + 2 decimal digits, required
- **category**: 2-50 characters, required
