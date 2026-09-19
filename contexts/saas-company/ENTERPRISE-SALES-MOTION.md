# Enterprise sales motion — Business OS

Status: Discovery and readiness plan. This is not evidence that the product is enterprise-ready or that a customer has approved any requirement.

## Sales motion

Business OS begins with founder-led, consultative discovery. Sales does not start with a portal demonstration. The first call seeks evidence of a costly operational problem; the product and delivery team then use the result to decide whether a pilot is suitable.

```text
Target segment → Problem discovery → Qualification → Pilot proposal
      ↑                                                ↓
Product, domain and delivery learning ← Pilot review ← Buying process
```

The feedback loop from every prospect and pilot returns to Product, BA and the Core Platform Squad through the discovery plan. A deal does not create an automatic roadmap commitment.

## Target-account discovery

Begin with a narrow, named segment rather than all SMBs. Record the segment, its common workflow, trigger event, problem cost, alternatives and reason that this account is a credible early adopter. The existing Customer Portal scenario is a hypothesis: customers may need self-service visibility for service work, invoices and support requests. Validate the problem before presenting that solution.

Use this opening:

> We are learning how teams currently manage [service-work status, invoices or support]. We are early and have not assumed the solution. Could you walk us through the most recent case, including where it became difficult or risky?

Ask for observed past behaviour, documents and current workarounds. Do not ask whether a prospect would use a proposed feature as the primary evidence.

## Qualification record

For each opportunity, capture a MEDDIC-style record. Unknown is a valid value; it must not be inferred.

| Area | Evidence to capture | Owner |
| --- | --- | --- |
| Metrics | Current time, cost, error rate or revenue impact; desired outcome | BD + customer sponsor |
| Economic buyer | Person with budget authority and the outcome they fund | BD |
| Decision criteria | Functional needs, governance, security, integration, pricing and support criteria | BA + buyer team |
| Decision process | Evaluation stages, approvers, procurement, legal, security and target decision date | BD |
| Identified pain | Recent example, affected roles, business risk and workaround | PM/BA |
| Champion | Internal advocate, their incentive and ability to mobilize stakeholders | BD |
| Competition/alternatives | Current tools, manual process, internal build or no change | BD + PM |

Progress only when the problem, sponsor and next mutual action are clear. A qualified pilot needs a named success metric, sample users, timeframe, implementation responsibilities, data constraints and a review meeting.

## Buying journey and governance discovery

Map each customer’s actual buying journey: end users, operational owner, champion, economic buyer, IT/security reviewer, procurement/legal reviewer and contract signatory. Determine which roles are relevant for that account; do not assume an enterprise procurement process for every SMB.

For a customer that requires organizational governance, send these questions to the discovery and DDD workshops:

- What must an administrator control, approve or audit?
- Which users can view, create, alter or export which customer data?
- Is SSO required? Which identity provider and role-provisioning workflow are required?
- What evidence is required for tenant separation, authentication, authorization, encryption, retention, backup and incident response?
- What invoicing, tax, contract, data-processing and support terms must be satisfied?
- Which external systems must exchange data, and who owns each integration?

These are requirement questions. They do not authorize an SSO, SOC 2 or integration commitment.

## Current readiness assessment

| Area | Evidence in this repository | Status and action |
| --- | --- | --- |
| Commercial concepts | Lead, Customer, Workspace and Subscription are defined in `CONTEXT.md` | Foundation only; validate pricing, agreement and pilot terms per segment |
| User roles | Existing backend documents role CRUD and JWT login | Foundation only; verify authorization policy, tenant boundaries and audit evidence |
| Customer portal | Operating model describes work status, invoice viewing and support intake | Hypothesis; validate customer problem and workflow before a demo or build commitment |
| Tenant isolation | Workspace is defined as isolated | Need a testable technical and operational control definition |
| SSO and provisioning | No implementation evidence found | Discover customer need and prioritise only for qualified opportunities |
| Audit, compliance and security review | No repository evidence found | Assess against each buyer’s criteria; do not represent as available |
| Procurement/legal readiness | No repository evidence found | Discover process, contract and data requirements account by account |

## Product and DDD handoff

BD records evidence in the opportunity record. BA translates validated behaviour into requirements and acceptance examples. The domain workshop then decides the business language, rules and ownership.

Candidate topics for the Customer Portal workshop are **Service Work**, **Invoice**, **Support Request**, **Customer**, **Workspace** and **Subscription**. These are not yet confirmed bounded contexts. Test terms and rules using concrete examples: who may change a work status, what happens to a disputed invoice, who can access a support request, and how a user is prevented from seeing another Workspace’s information.

Each confirmed enterprise need becomes one of: a product rule, non-functional requirement, integration requirement, contract/operating requirement, or a decision to exclude that account from the current segment. Product and Tech Lead assess impact before it enters the roadmap.

## Pilot gate and success review

Before a pilot, agree in writing on:

- Customer problem and the exact workflow in scope.
- Participating Workspace, user roles and data permitted for the pilot.
- Success metric, baseline, target and review date.
- Security, support, integration and legal constraints that must be met before access.
- Customer sponsor, product owner, escalation route and decision at the end: expand, revise or stop.

At the review, compare observed use, customer outcome, support load, security/governance issues and commercial next step. Feed the result into roadmap prioritization rather than measuring the pilot only by whether it closed.
