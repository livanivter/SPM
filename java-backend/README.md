# Java Backend Skeleton

## Stack

- Maven
- Spring Boot
- MyBatis
- MySQL

## Run

```bash
mvn spring-boot:run
```

## Database Collaboration Rule

- Each teammate uses a local MySQL database on their own computer.
- Everyone uses the same `sql/schema.sql`.
- Each teammate creates a personal `application-local.yml` based on `application-local.example.yml`.
- Do not commit local database password files.
- If you need integration testing, use one shared test database later, not during daily feature development.

## Package Layout

```text
com.team.lms
  admin
  reader
  librarian
  common
  config
  exception
  repository
  entity
  mapper
```
