# Phase 1 MVP Requirements — General Retail Sales SaaS

**Product:** General Retail Sales SaaS  
**Backend:** `backend-v2` with NestJS + TypeScript  
**Status:** Approved scope for planning; implementation has not started  
**Date:** 2026-09-19  
**Source:** Confirmed design decisions from the product/BA interview in this task

## 1. Purpose

Phase 1 validates one core business outcome for small general stores:

> A shop can record paid sales during the day, keep stock accurate, and let the owner see daily revenue without adding up paper records manually.

The first release is a modular monolith. It supports multiple isolated Workspaces, with one shop and one branch per Workspace. It does not attempt to be a full accounting, procurement, or multi-branch system.

## 2. Evidence, assumptions, and gaps

### Confirmed decisions

- The target segment is general retail stores, not mobile-phone-specific shops.
- The MVP includes both sales recording and stock tracking.
- Each Workspace represents one shop and one branch in Phase 1.
- Supabase Auth remains the authentication provider.
- A new MVP schema is acceptable; legacy backend data does not need to be preserved.
- Payment methods are cash and manually confirmed QR.
- Only `OWNER/ADMIN` can cancel sales or adjust stock.
- A real pilot shop is available, but its operational details and baseline measurements must be captured before release.

### Assumptions to validate with the pilot

- The default currency is Lao kip because the existing UI displays `₭`; confirm with the pilot merchant.
- Product quantities are whole numbers in Phase 1. Fractional units (for example, kilograms) are deferred unless the pilot requires them.
- Barcode scanning is deferred. A SKU may be stored, but hardware or camera scanning is not a Phase 1 dependency.
- Cashiers can create sales and view their immediate receipt. Owner-level access to all sales history is required; cashier access to full history must be confirmed during pilot preparation.
- The business day starts at midnight in the Workspace timezone. The default timezone is `Asia/Vientiane`; each Workspace may store its own timezone.

### Evidence gaps

No interview transcript, workflow observation, baseline sales data, or confirmed commercial commitment is currently stored in the repository. Pilot evidence must distinguish exact merchant statements from analyst interpretation.

## 3. Actors

| Actor | Responsibility | Phase 1 access |
| --- | --- | --- |
| Visitor | Creates a Workspace and the first owner account | Sign up only |
| Owner/Admin | Operates and controls the Workspace | Full Workspace administration |
| Cashier | Records customer sales | Catalog, checkout, receipt; history access subject to pilot confirmation |
| Supabase Auth | Verifies credentials and issues access tokens | External authentication provider |
| System | Applies business rules, transactions, isolation, reporting, and audit history | Non-human actor |

## 4. MVP scope

### In scope

- Workspace self-registration with the first `OWNER/ADMIN` user.
- Supabase Auth login and token verification.
- User profile and role assignment within a Workspace.
- Simple Retail Products: name, optional SKU, unit, selling price, optional cost price, active status.
- Initial stock receipt and later stock receipts.
- Stock adjustments with a reason and audit trail.
- Catalog-based checkout using product and quantity.
- `CASH` and `QR_MANUAL` payment methods.
- Paid Sale creation with immutable Sale Item price snapshots.
- Whole-sale cancellation by `OWNER/ADMIN`, with a required reason and stock restoration.
- Daily revenue summary, paid-sale count, canceled-sale exclusion, and sales history.
- Receipt data for a completed Sale.
- Audit log for sensitive actions.
- Tenant isolation at the application seam, database constraints, and integration-test level; RLS remains a security gate to implement or explicitly defer before external rollout.
- REST API under `/api/v1` with OpenAPI documentation and validated DTOs.

### Out of scope

- Product variants, colors, sizes, IMEI, serial numbers, or lot tracking.
- Multiple branches per Workspace.
- Supplier management or purchase orders.
- Full accounting, tax filing, profit reporting, or financial reconciliation.
- Discounts, promotions, coupons, or price rules.
- Credit sales, partial payments, partial refunds, or partial returns.
- Real payment-gateway verification.
- Barcode hardware or camera integration.
- Offline-first operation.
- Customer loyalty, CRM, or a customer-facing portal.

## 5. Functional requirements

### FR-001 — Workspace onboarding

The system shall allow a visitor to create a Workspace and its first `OWNER/ADMIN` user through Supabase Auth.

Acceptance criteria:

- **Given** a valid email and password that are not already registered, **when** the visitor signs up, **then** the system creates one Workspace, one owner profile, and an active authenticated session or a clear next step.
- **Given** an email already registered, **when** the visitor signs up again, **then** no duplicate Workspace is created and the user receives a safe conflict message.
- **Given** the provisioning step fails after authentication succeeds, **when** the system detects the failure, **then** it does not leave an untracked user without a recovery or retry path.

### FR-002 — Authentication and profile

The system shall use Supabase Auth for credentials and tokens. The application shall load the authenticated profile, role, and Workspace before serving protected data.

Acceptance criteria:

- **Given** an expired, malformed, or missing token, **when** a protected endpoint is called, **then** the system returns `401` and no Workspace data.
- **Given** a valid token without a valid active profile or Workspace, **when** a protected endpoint is called, **then** the system returns `403` and no Workspace data.
- **Given** a valid user, **when** the user logs in, **then** the response contains a stable user identity, role, Workspace identity, and token metadata required by the client.

### FR-003 — Roles and permissions

The system shall support `OWNER/ADMIN` and `CASHIER` roles.

| Capability | OWNER/ADMIN | CASHIER |
| --- | ---: | ---: |
| View catalog | Yes | Yes |
| Create/update/deactivate product | Yes | No |
| Receive stock | Yes | No |
| Adjust stock | Yes, reason required | No |
| Create Sale | Yes | Yes |
| Confirm cash/QR manual payment | Yes | Yes |
| Cancel Sale | Yes, reason required | No |
| View daily summary | Yes | To confirm with pilot |
| Manage users and roles | Yes | No |
| View audit log | Yes | No |

The system shall deny unauthorized actions at the backend even if the frontend hides the control.

### FR-004 — Retail Product catalog

The system shall let `OWNER/ADMIN` create, update, deactivate, and list simple Retail Products belonging to the current Workspace.

Required fields:

- `name`
- `unit`
- `sellingPrice`
- optional `sku`
- optional `costPrice`
- active/inactive status

Rules:

- SKU, when present, must be unique within the Workspace.
- Deactivating a product must not delete historical Sale Items.
- A deactivated product cannot be added to a new Sale.
- A Sale Item stores the product identity, quantity, and price at the time of sale.

### FR-005 — Stock receipt and adjustment

The system shall represent stock changes as Stock Movements rather than silently overwriting a quantity.

Supported movement types:

- `RECEIVE` — adds stock received by the shop.
- `SALE` — subtracts stock as part of a paid Sale.
- `CANCEL` — restores stock when a Sale is canceled.
- `ADJUSTMENT` — controlled correction by `OWNER/ADMIN` with a reason.

Acceptance criteria:

- **Given** a valid positive receipt quantity, **when** an owner receives stock, **then** the available quantity increases and a `RECEIVE` movement is recorded.
- **Given** a stock correction, **when** an owner submits a reason, **then** the adjustment and reason are recorded with actor and timestamp.
- **Given** a cashier attempts an adjustment, **when** the API receives the request, **then** the request is rejected and stock is unchanged.
- **Given** an adjustment would create a negative available quantity, **when** it is submitted, **then** the request is rejected.

### FR-006 — Checkout and Sale creation

The system shall create a Sale from selected active products and quantities.

Acceptance criteria:

- **Given** all products are active and available, **when** a cashier submits a valid cart, **then** the system creates one Sale with Sale Items and immutable unit-price snapshots.
- **Given** any requested quantity exceeds available stock, **when** checkout is submitted, **then** the entire transaction is rejected and no partial Sale or stock movement remains.
- **Given** an invalid product, quantity, or price supplied by the client, **when** checkout is submitted, **then** the server rejects the invalid value and calculates totals from server-owned product prices.
- **Given** two checkout requests race for the last units, **when** both are submitted, **then** at most one succeeds for the unavailable quantity.
- **Given** the client retries the same checkout after a timeout, **when** the retry carries the same idempotency key, **then** the system does not create a duplicate Sale. The exact idempotency mechanism is a Phase 1 technical design task.

### FR-007 — Payment recording

The system shall record a payment method on each completed Sale.

Supported values:

- `CASH`
- `QR_MANUAL`

`QR_MANUAL` means the cashier has confirmed payment outside the system. The MVP shall not claim bank-side verification.

### FR-008 — Sale cancellation

The system shall support whole-Sale cancellation by `OWNER/ADMIN` only.

Acceptance criteria:

- **Given** a `PAID` Sale, **when** an owner submits a non-empty cancellation reason, **then** the Sale becomes `CANCELLED`, stock is restored, and an audit record is written in the same transaction boundary.
- **Given** a `CANCELLED` Sale, **when** cancellation is requested again, **then** the request is rejected or safely returns the existing canceled state without restoring stock twice.
- **Given** a cashier attempts cancellation, **when** the API receives the request, **then** it returns `403` and makes no change.
- The system shall not delete Sales or Sale Items as part of cancellation.

### FR-009 — Daily revenue and sales history

The system shall provide a Workspace-scoped summary based on the Workspace timezone.

Minimum metrics:

- total paid revenue for the selected day
- count of paid Sales
- total quantity sold
- count/value of canceled Sales shown separately or explicitly excluded

Rules:

- Canceled Sales are excluded from paid revenue.
- Revenue is calculated from Sale records, not from client-submitted totals.
- The report must state the effective date range and timezone.

### FR-010 — Receipt and history

The system shall return receipt-ready data after successful checkout and allow an authorized user to retrieve a historical Sale without exposing another Workspace's data.

Receipt minimum fields:

- Workspace/shop display name
- Sale identifier
- date/time with Workspace timezone
- Sale Items, quantities, unit prices, and line totals
- total amount
- payment method
- cashier identity

### FR-011 — Audit log

The system shall record sensitive mutations with actor, Workspace, action, target, timestamp, and relevant reason or change metadata.

Required actions:

- Workspace creation
- role/user changes
- stock receive and adjustment
- Sale cancellation

Audit records are append-only from the application interface. Deletion or editing of audit records is not a Phase 1 operation.

### FR-012 — Tenant isolation

Every Workspace-owned record shall belong to one Workspace. A request shall obtain Workspace context from the authenticated profile and repositories shall require that context.

Acceptance criteria:

- **Given** two Workspaces with similarly named products, **when** either user lists products, **then** only their own Workspace's products are returned.
- **Given** a valid identifier from another Workspace, **when** a user requests, edits, cancels, or deletes it, **then** the system returns not-found or forbidden without revealing existence.
- **Given** a repository is called without Workspace context, **when** the operation starts, **then** it fails safely rather than returning unscoped data.
- `tenantId`/Workspace identity is non-null for every Workspace-owned row in the MVP schema.

## 6. Domain model

| Concept | Definition |
| --- | --- |
| Workspace | One customer's isolated SaaS environment for one shop and one branch in Phase 1. |
| Retail Product | A sellable item in a Workspace catalog. It is distinct from the Company's SaaS Product. |
| Stock Movement | An immutable business record explaining a change to available stock. |
| Sale | A completed retail transaction. A Sale is not an invoice. |
| Sale Item | A product, quantity, and price snapshot belonging to a Sale. |
| Payment | The recorded method and amount used to settle a Sale; QR is manually confirmed in the MVP. |
| Daily Revenue | The total of paid Sales within a Workspace's business date and timezone. |
| Cancellation | A state transition of a Sale to `CANCELLED`; it is not deletion. |
| Audit Log | An append-only record of sensitive actions and their actor/reason. |

The implementation should use these domain terms consistently. `tenantId` may remain an infrastructure/database field, but product-facing language should use `Workspace`.

## 7. API and integration requirements

- Base path: `/api/v1`.
- JSON request/response contracts documented with OpenAPI.
- All request bodies validated before application logic.
- Errors use a stable machine-readable code plus a user-safe message.
- IDs are UUID strings end-to-end.
- Client-provided totals, prices, roles, and Workspace IDs are never authoritative.
- Supabase access tokens are validated before protected operations.
- Checkout and cancellation expose an idempotent/retry-safe contract.
- API contract tests run against the same DTO and response shapes consumed by the frontend.

Initial endpoint groups:

```text
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
GET    /api/v1/me

POST   /api/v1/products
GET    /api/v1/products
PATCH  /api/v1/products/:id
POST   /api/v1/products/:id/deactivate

POST   /api/v1/stock-movements/receive
POST   /api/v1/stock-movements/adjust
GET    /api/v1/stock-movements

POST   /api/v1/sales
GET    /api/v1/sales
GET    /api/v1/sales/:id
POST   /api/v1/sales/:id/cancel

GET    /api/v1/reports/daily-revenue
GET    /api/v1/audit-logs
```

Exact endpoint names may change during API design, but the domain operation and authorization rules must remain stable.

## 8. Non-functional requirements

### Security and privacy

- Deny by default for protected routes.
- Enforce role permissions on the backend.
- Scope every read and write to the authenticated Workspace.
- Do not log passwords, access tokens, or sensitive payment data.
- Use Supabase Auth for password storage and recovery.
- Add rate limiting to authentication endpoints.

### Consistency and reliability

- Checkout must atomically create the Sale, Sale Items, Payment, and `SALE` Stock Movements.
- Cancellation must atomically update the Sale, create `CANCEL` Stock Movements, and write its audit entry.
- Database constraints must protect non-negative stock and Workspace ownership.
- Retry behavior and duplicate request handling must be tested.

### Observability

- Health endpoint that does not leak secrets.
- Structured logs with request ID and Workspace ID where safe.
- Error monitoring for failed checkout, failed cancellation, and provisioning failures.
- Audit records queryable by OWNER/ADMIN.

### Performance and operations

- Response-time, availability, data retention, backup, and recovery targets remain TBD until the pilot's expected volume is known.
- Initial deployment remains a modular monolith; microservices and event sourcing are explicitly out of scope.

## 9. Phase 1 delivery slices

### Slice 0 — Foundation and contract

Output: NestJS project, configuration, database connection, error model, OpenAPI, DTO validation, health check, logging, test harness, and API versioning.

Exit evidence: the service starts in a clean environment, health check passes, an invalid DTO returns a stable error, and a test can run against an isolated test database.

### Slice 1 — Auth and Workspace

Output: Supabase Auth integration, Workspace creation, owner profile, role loading, request Workspace context, and protected route guard.

Exit evidence: two Workspaces can sign in and cannot read each other's protected data.

### Slice 2 — Catalog and stock

Output: Retail Product CRUD, product deactivation, stock receipt, stock adjustment, Stock Movement history, and permission checks.

Exit evidence: stock balances reconcile from movements; unauthorized adjustment is rejected; negative balance is impossible.

### Slice 3 — Checkout and payment

Output: catalog checkout, server-side price calculation, payment method recording, atomic stock decrement, receipt response, and retry safety.

Exit evidence: successful sale, insufficient stock rejection, concurrent last-unit test, duplicate retry test, and Workspace isolation test pass.

### Slice 4 — Cancellation and audit

Output: owner-only full-sale cancellation, required reason, stock restoration, append-only audit log, and safe repeated-cancel behavior.

Exit evidence: cancel restores exactly once; cashier is denied; audit entry contains actor, reason, target, and timestamp.

### Slice 5 — Daily revenue and pilot readiness

Output: daily report, sales history, receipt retrieval, timezone handling, frontend contract integration, deployment configuration, and pilot runbook.

Exit evidence: a pilot user can complete the workflow from login through daily report, and all quality gates pass.

## 10. Quality gate

The Phase 1 release cannot be marked `Released` until all of the following are true:

- Backend build passes.
- Frontend build and lint pass.
- Unit tests cover domain policies and calculations.
- Integration tests cover auth, Workspace isolation, product, stock, checkout, cancellation, and audit.
- API contract tests pass against the frontend-consumed shapes.
- No mock product or mock authentication fallback is enabled in production builds.
- Migration can create a clean MVP database from an empty database.
- A rollback or recovery procedure exists for failed deployment.
- The pilot owner has reviewed the workflow and open assumptions.
- Pilot metrics and a feedback capture method are ready.

## 11. Pilot measurement plan

The following are proposed measurements, not observed facts or guaranteed targets:

| Metric | Definition | Evidence source |
| --- | --- | --- |
| Sales capture rate | Sales recorded in the system divided by observed sales during sampled periods | Observation plus Sale records |
| Daily close effort | Time required for the owner to verify the day's revenue | Timed pilot observation |
| Stock discrepancy rate | Products whose counted quantity differs from the system quantity | Physical count and stock ledger |
| Correction rate | Sales or stock records needing correction divided by total records | Audit log and observation |
| Repeat usage | Number of consecutive business days the pilot uses the system | Sale records and interview |

Targets must be agreed with the pilot merchant after a baseline observation. Do not invent customer quotes or treat simulation data as evidence.

## 12. Traceability

| Business outcome | Requirements | Verification |
| --- | --- | --- |
| Owner sees daily revenue without manual addition | FR-006, FR-007, FR-009, FR-010 | Daily report integration test and pilot observation |
| Stock remains trustworthy after sales and cancellation | FR-005, FR-006, FR-008 | Transaction, concurrency, and reconciliation tests |
| Multiple shops do not see each other's data | FR-001, FR-002, FR-012 | Cross-Workspace integration tests |
| Sensitive changes are explainable | FR-003, FR-005, FR-008, FR-011 | Permission and audit tests |

## 13. Open decisions before implementation

1. Confirm the pilot shop's currency and whether whole-number quantities are sufficient.
2. Confirm whether CASHIER may view all Workspace sales history or only their own receipts.
3. Confirm receipt delivery: browser print only, downloadable file, or both.
4. Agree retention, backup, availability, and recovery targets after estimating pilot volume.
5. Decide whether RLS is required before the first external pilot or whether application scoping plus integration tests is the temporary release gate.
6. Define the exact Supabase provisioning recovery flow when Auth succeeds but Workspace creation fails.

