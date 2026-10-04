# Mobile Shop POS Context — Superseded Planning Note

> This file contains earlier general-retail planning language. The current mobile-shop product scope and Express architecture are recorded in [ADR-0004](../../docs/adr/0004-express-mobile-shop-architecture.md).

This context describes the general-retail MVP. It is separate from the Company's delivery language, where `Product` means a SaaS offering.

| Term | Meaning |
| --- | --- |
| Workspace | One customer's isolated SaaS environment for one shop and one branch in Phase 1. |
| Shop | The physical or online retail operation represented by a Workspace. |
| Retail Product | A sellable item in a Shop's catalog. It is not the Company's SaaS Product. |
| SKU | An optional Workspace-scoped identifier for a Retail Product. |
| Stock | The available quantity of a Retail Product at a Shop. |
| Stock Movement | An immutable record explaining a stock change: receive, sale, cancellation, or adjustment. |
| Sale | A completed retail transaction that records money received by a Shop. A Sale is not an Invoice. |
| Sale Item | A Retail Product, quantity, and price snapshot belonging to a Sale. |
| Payment | The recorded method and amount used to settle a Sale. QR payment is manually confirmed in the MVP. |
| Daily Revenue | The total of paid Sales during a Shop's business date in its configured timezone. |
| Cancellation | A state transition of a Sale to `CANCELLED`; it is not deletion. |
| Audit Log | An append-only record of a sensitive action, its actor, target, time, and reason or change metadata. |
| Owner/Admin | The Workspace authority who manages products, stock, users, reports, and cancellations. |
| Cashier | A User who records Sales and confirms payment methods. |

## Core invariants

- A Workspace-owned record belongs to exactly one Workspace.
- A Sale is either `PAID` or `CANCELLED` in Phase 1.
- A canceled Sale is retained for history and audit purposes.
- A Sale cannot reduce available Stock below zero.
- A cancellation restores the Stock effect of its Sale exactly once.
- A Sale Item retains the price that applied at the time of sale.
- `OWNER/ADMIN` is required for stock adjustment and Sale cancellation.
- Product-facing language uses `Workspace`; `tenantId` is an infrastructure/database term.
