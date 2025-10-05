# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

**Run the application:**
```bash
mvn spring-boot:run
```
Application starts at `http://localhost:8080`

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

This is a Spring Boot 3.2.0 REST API following a layered architecture pattern:

**Layer Flow:** Controller → Service → Repository → Database

- **Controllers** (`controller/`) - REST endpoints at `/api/inventory`, handle HTTP requests/responses
- **Services** (`service/`) - Business logic and transaction management
- **Repositories** (`repository/`) - JPA data access using Spring Data JPA
- **Models** (`model/`) - JPA entities mapped to database tables
- **DTOs** (`dto/`) - Request/Response objects for API contract
- **Exception Handlers** (`exception/`) - Global exception handling via `@RestControllerAdvice`

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

## API Validation Rules

When modifying DTOs or validation logic:
- **name**: 2-100 characters, required
- **description**: max 500 characters, optional
- **quantity**: ≥ 0, required
- **price**: > 0, max 8 integer + 2 decimal digits, required
- **category**: 2-50 characters, required
