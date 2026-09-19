# Phase 1 — SaaS Company Simulation

## Purpose

Simulate a realistic IT and software company that builds, releases, sells, and supports a multi-tenant SaaS product. Phase 1 establishes how the company operates before any customer-facing product UI or new application modules are built.

## Company model

**Company:** Nova Stack (working name)  
**Product:** Business OS — a configurable SaaS platform for small and medium businesses.

| Team | Core roles | Accountable outcome |
| --- | --- | --- |
| Leadership | CEO, COO, Head of Product | Company priorities, budget, outcomes |
| Product | Product Manager, Business Analyst | Validated roadmap and measurable customer value |
| Engineering | Tech Lead, Backend, Frontend, Flutter | Reliable, secure, maintainable product increments |
| Design | Product Designer | Usable workflows and reusable design system |
| Quality | QA Engineer | Verified releases and visible quality risk |
| Customer Success | CSM, Support Agent | Adoption, retention, and resolved support requests |
| Commercial | Sales, Finance | Qualified customers, subscriptions, invoices, collections |

## Product squads

For Phase 1, use one cross-functional **Core Platform Squad**:

- Product Manager owns problem framing, priority, and sprint goal.
- Tech Lead owns technical direction and delivery risk.
- Backend + Frontend + Flutter engineers implement the increment.
- Product Designer validates workflow and accessibility.
- QA Engineer owns test evidence and quality-gate status.
- Customer Success brings customer feedback and validates release communication.

The Squad owns delivery; functional teams retain staffing, standards, and coaching.

## End-to-end workflow

```text
Customer signal / business goal
  → Product discovery
  → Initiative and roadmap decision
  → Backlog refinement
  → Sprint planning
  → Build and peer review
  → QA verification
  → Release approval
  → Deploy and release communication
  → Customer adoption and support feedback
  → Product metrics review
```

### Operating rules

1. A Work Item enters a Sprint only when it is **Ready**: outcome, acceptance criteria, owner, estimate, and dependency are known.
2. Engineering cannot move a Work Item to **In Review** without automated checks and peer review.
3. QA decides whether the Quality Gate passes; Product decides whether the outcome is acceptable; Tech Lead approves production risk.
4. **Done** and **Released** are separate states. A completed item may wait for a scheduled release.
5. Customer Success records support feedback as Support Requests; Product triages them into bugs, discovery items, or customer communications.

## Cadence

| Rhythm | Participants | Output |
| --- | --- | --- |
| Daily, 15 min | Core Platform Squad | Blocker removal and delivery focus |
| Weekly refinement | Product, Design, Engineering, QA | Ready backlog for the next Sprint |
| Biweekly Sprint planning + review | Squad, Leadership, Customer Success | Sprint goal, demo, next priorities |
| Monthly product review | Leadership, Product, Commercial, Customer Success | Metrics, roadmap decisions, customer risk |
| Release review | Product, Tech Lead, QA, Customer Success | Go/no-go decision and communication plan |

## Phase 1 workspaces

The eventual internal SaaS workspace should start with these areas:

1. **Company Dashboard** — objectives, delivery health, customer and revenue signals.
2. **Product & Roadmap** — initiatives, roadmap items, discovery decisions.
3. **Sprint & Delivery** — backlog, board, blockers, quality gates, releases.
4. **People & Teams** — members, roles, squad capacity, workload.
5. **Customer Success** — customers, subscriptions, support requests, adoption notes.
6. **Commercial** — leads, agreements, invoices, collections.

## First simulation scenario

**Goal:** Release the first Business OS Customer Portal.

1. Customer Success reports that customers cannot easily track service work or invoices.
2. Product creates the initiative "Customer self-service" and defines the success metric: 50% of active customers view a work status or invoice within 30 days.
3. The Squad selects three Stories: work status timeline, invoice list, and support request creation.
4. Engineering implements them; QA verifies the customer-role boundary and release criteria.
5. Product, QA, and Tech Lead approve the release; Customer Success notifies pilot customers.
6. The monthly review compares portal adoption, support volume, and payment completion before deciding the next release.

## Phase 1 boundaries

- This is an internal company and delivery simulation, not a replacement for the existing Mobile POS system.
- No real payment, deployment, HR, or customer data is connected in Phase 1.
- Design screens are deferred until the operating model and initial data model are agreed.
