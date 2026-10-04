# ADR-0004: Keep Express and refactor the mobile shop application

- **Status:** Accepted
- **Date:** 2026-10-04
- **Decision owner:** Product/Engineering
- **Supersedes:** ADR-0001 and ADR-0002

## Context

The running project is a mobile-shop management system with an Express modular monolith and a React/TypeScript frontend. Existing behavior includes product variants, IMEI stock, customers, role-based administration, checkout, receipts, order history, and reports. The prior NestJS and general-retail documents describe a different product direction and are not the active scope.

## Decision

- Keep Express and preserve the mobile-shop domain and existing HTTP routes, payloads, response envelopes, and legacy prefixes.
- Refactor the backend around feature modules with domain, application, infrastructure, and presentation layers. Select concrete adapters and wire controllers in an explicit composition root.
- Refactor the frontend into feature areas with API adapters, application actions, state, and UI. Pages and components do not call the shared HTTP client directly.
- Add runtime validation at API boundaries and keep the OpenAPI document aligned with those contracts.

## Consequences

- The application remains a single Express deployment and keeps existing clients compatible during the refactor.
- Dependency seams and typed feature APIs make isolated unit tests practical.
- The older NestJS/general-retail planning material remains in history but is marked superseded to avoid conflicting implementation guidance.
