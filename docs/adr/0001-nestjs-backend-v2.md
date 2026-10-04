# ADR-0001: Use NestJS for backend-v2

- **Status:** Superseded by [ADR-0004](0004-express-mobile-shop-architecture.md)
- **Date:** 2026-09-19
- **Decision owner:** Product/Engineering

## Context

The existing backend is a TypeScript Express modular monolith. It builds, but its frontend/backend contracts have drifted, its test command is not implemented, its current domain is overly specific to mobile-phone inventory, and tenant and transaction rules need a clean foundation for the general-retail MVP.

The team needs a backend-v2 that preserves TypeScript alignment with the React frontend while providing stronger conventions for dependency injection, request validation, authorization, module wiring, and testing.

## Decision

Build backend-v2 as a **NestJS + TypeScript modular monolith**. Organize each bounded domain area as a deep module with a small application interface and internal adapters:

```text
presentation → application → domain ← infrastructure
```

The first modules are `auth`, `workspace`, `user`, `catalog`, `inventory`, `sales`, `reports`, and `audit`.

NestJS is a framework choice, not a license to put business rules in controllers. Controllers remain thin; use cases own business behavior; repository and external-provider adapters sit behind seams that can be replaced in tests.

## Alternatives considered

- **Keep Express:** lowest migration cost, but the project would need to establish and enforce all conventions manually while already performing a domain rewrite.
- **Spring Boot:** strong enterprise ecosystem, but introduces a new language/runtime and a larger migration surface without a current requirement for Java or enterprise-scale operations.
- **Go:** efficient and operationally simple, but introduces a new language and requires the team to establish more application conventions for validation, module wiring, and domain workflows.
- **Microservices:** rejected for Phase 1 because one deployable modular monolith gives better locality and simpler transaction boundaries.

## Consequences

Positive:

- Frontend and backend share TypeScript types and habits.
- Module, guard, pipe, provider, and testing conventions are explicit.
- The team can replace adapters without spreading infrastructure knowledge into use cases.
- The application can remain one deployable unit while domains are clarified.

Costs and risks:

- NestJS does not automatically prevent shallow modules or misplaced business logic.
- The team must enforce domain boundaries through review and tests.
- backend-v2 temporarily creates a second backend surface during migration.
