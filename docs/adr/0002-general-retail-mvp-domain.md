# ADR-0002: Use simple Retail Products and Stock Movements for the MVP

- **Status:** Superseded by [ADR-0004](0004-express-mobile-shop-architecture.md)
- **Date:** 2026-09-19
- **Decision owner:** Product/Engineering

## Context

The existing backend models mobile-phone-specific concerns such as variants, IMEI, serial numbers, and stock items. The confirmed MVP target is general retail stores. The MVP must preserve stock correctness but does not yet have evidence that variants, serial numbers, or lot tracking are needed across the first pilot.

## Decision

Model a simple `RetailProduct` with an optional SKU, unit, selling price, optional cost price, active status, and Workspace ownership. Model stock changes as immutable `StockMovement` records:

- `RECEIVE`
- `SALE`
- `CANCEL`
- `ADJUSTMENT`

Do not include product variants, IMEI, serial numbers, suppliers, discounts, credit sales, or partial returns in Phase 1.

## Consequences

Positive:

- The checkout flow is understandable for general shops.
- Stock reconciliation has an explainable ledger.
- The domain does not carry mobile-phone assumptions into a broader product.
- Future variants or lots can be added behind a deliberate domain decision.

Costs and risks:

- A pilot that sells by weight or requires variants may need a scope change.
- Product quantity is whole-number by default; fractional units remain an open pilot decision.
- Barcode scanning is deferred and may later require a catalog identifier decision.
