# Customer discovery and DDD delivery plan

Status: Prepared for discovery; no customer interviews or team commitments recorded.

## Starting evidence

- The operating model describes Nova Stack and Business OS as a company simulation.
- Its Customer Portal scenario proposes work-status visibility, invoice visibility, and support requests. These are hypotheses, not customer-approved requirements.
- The existing Mobile POS context is a separate product. Reuse or integration requires a specific requirement.
- The user requests BD, BA, PM and developer planning before UI and architecture design, using Domain-Driven Design (DDD).

## Responsibilities and sequence

| Stage | Lead and collaborators | Reviewable output | Exit evidence |
| --- | --- | --- | --- |
| Opportunity discovery | BD with founder and PM | Target segment, problem, buyer, current alternatives, commercial constraints | Named prospect or explicitly labelled simulation; reason to investigate |
| Customer discovery | PM and BA with domain expert and developer observer | Interview notes, current workflow, evidence register | Specific recent examples, exceptions and measurable pain |
| Requirements synthesis | BA and PM with customer representative | Scope, business rules, requirements and acceptance examples | Customer corrections captured; assumptions and conflicts visible |
| Domain workshop | Domain expert, BA, PM, Tech Lead, QA | Shared glossary, events, rules, proposed bounded contexts | Terminology and ownership reviewed against real scenarios |
| Delivery refinement | PM, developers and QA | MVP slices, dependencies, risks, estimates and validation plan | Team supplies feasibility and capacity; customer outcomes trace to stories |
| UI and architecture | Designer and Tech Lead with domain expert | Workflow designs and architectural alternatives | Requirements and initial domain model sufficiently understood |

These roles describe the planned workshop participants, not meetings already held. Discovery continues as implementation reveals new information.

## BD opportunity record

Record organization/segment, source, contact role, affected users, economic buyer, decision process, problem evidence, current workaround, urgency, budget range if disclosed, buying constraints and next agreed action. Do not infer budget or willingness to pay from enthusiasm.

Enterprise procurement questions apply only if the customer has such a buying process. Enterprise sales is one part of business development, not a complete substitute for market and partnership discovery.

## Customer interview guide

1. Tell us about the last time you needed to track service work or an invoice. What happened from start to finish?
2. Who performed each step, and who approved or corrected it?
3. What tools, messages or documents did you use? Can you describe a concrete example with sensitive details removed?
4. Where did work stall or need repeating? How often, and what time or cost did that create?
5. What exceptions occur: cancellation, disputed invoice, reassignment, missing information or duplicate requests?
6. Which information may each role see or change, and where do organization boundaries matter?
7. What alternatives have you tried, and why did you keep or abandon them?
8. What observable outcome would make a pilot successful? Who can confirm it and decide on purchasing?

Capture date, participant role, exact statement versus analyst interpretation, supporting artifact, uncertainty and follow-up. Ask permission before recording. Never create fictional customer quotations as evidence.

## Requirement register

| ID | Candidate requirement | Evidence/status | Questions before acceptance |
| --- | --- | --- | --- |
| H-01 | Customer can see service-work progress | Operating-model hypothesis only | What is service work? Which statuses and visibility rules apply? |
| H-02 | Customer can view invoices | Operating-model hypothesis only | Who issues them? Which lifecycle, currencies and dispute rules apply? |
| H-03 | Customer can submit support requests | Operating-model hypothesis only | Who routes requests? What response expectations and escalation rules apply? |

For each validated requirement, record: actor, business outcome, source and date, normal flow, exceptional flow, rule IDs, priority and reason, acceptance examples, dependencies, owner and customer validation status.

Capture non-functional needs with measurable targets and evidence: tenant isolation, permissions, audit history, response times and expected load, availability, recovery, retention, language, accessibility, migration and external integrations. All target values remain TBD until discussed.

Acceptance format: Given [business state and actor], when [action], then [observable outcome]. Include a denied action, duplicate action and failure/retry case where relevant.

## DDD workshop agenda

1. Walk through actual customer scenarios and their exceptions.
2. Capture domain events in past tense, the commands that cause them, actors, policies and unanswered questions.
3. Refine the existing CONTEXT.md glossary with the domain expert. Clarify Customer versus Lead, Product versus customer engagement, and service work versus internal Work Item.
4. Propose bounded contexts according to business language and rule ownership. Treat service operations, invoicing and support as candidates only; the portal itself is a user access surface, not automatically a bounded context.
5. Identify entities, value objects, aggregates and invariants using concrete business rules. Record which changes must succeed together and which can complete later.
6. Discuss context relationships, external systems, ownership and translations between terms.
7. Test candidate boundaries with cancellation, disputes, reassignment and cross-customer access scenarios.

DDD does not require microservices, event sourcing or CQRS. Choose deployment structure and consistency mechanisms later from confirmed rules, scale, team capacity and operational constraints. Keep glossary definitions separate from implementation decisions; record significant architectural trade-offs in ADRs when decisions are made.

## Developer planning workshop

- PM presents the problem, evidence, proposed MVP outcome and explicit exclusions.
- BA walks through rules and acceptance examples; the domain expert resolves ambiguities.
- Developers identify unknowns, integration dependencies and short investigation tasks before estimating.
- QA adds negative and boundary cases plus how each outcome will be verified.
- The team splits work into end-to-end business slices and supplies estimates and capacity. No delivery dates are committed in this draft.
- Link evidence → requirement → domain rule → story → acceptance test.

Ready for design means: target customer and problem are explicit; primary workflow and important exceptions are understood; MVP scope and measurable success criteria are agreed; terminology and boundary hypotheses are documented; major feasibility questions have owners. Record unresolved questions rather than treating them as accepted facts.

## Discovery summary

- Problem framing: Customer Portal scenario is provisional; confirm first project and target customer.
- Research insights: None collected yet.
- Personas/JTBD: Not validated.
- Opportunities: Work visibility, invoice visibility and support intake are candidates from the simulation.
- Solution hypotheses: Not selected.
- Experiments run: None.
- Decision: Pending customer evidence and team refinement.
- Next step: Identify the first customer/project, then run the interview and domain workshop.
