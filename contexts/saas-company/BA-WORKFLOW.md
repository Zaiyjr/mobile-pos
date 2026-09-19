# Business Analyst workflow

Status: Operating workflow for the Business OS initiative. This establishes how the team will work; it does not claim that a customer has approved the current portal hypotheses.

## 1. Understand the business need

**Purpose:** Establish the business problem or opportunity before discussing a feature.

**Participants:** Customer sponsor, affected users, BD, PM and BA.

**Output:** Problem statement, desired measurable outcome, scope, exclusions, stakeholders, constraints and initial success metric.

For the current simulation, the Customer Portal is a candidate response to customers being unable to track service work or invoices. Validate that problem with a real target segment; do not treat the portal as committed scope.

**Exit:** The sponsor confirms the problem being investigated and the outcome that would make the effort worthwhile.

## 2. Requirement elicitation

**Purpose:** Learn the current workflow and the required future outcome from evidence.

**Methods:** Interviews, observation, workshops, support-ticket review, document review and data review where available.

**Capture:** actor, trigger, normal steps, exceptions, business rule, data involved, current workaround, pain/cost, source, confidence and follow-up question.

Use past-behaviour questions: ask the participant to describe the most recent case rather than asking whether they would use a proposed screen.

**Exit:** The BA can describe the end-to-end workflow, its major exceptions and the evidence supporting each candidate requirement.

## 3. Analyse and prioritise

**Purpose:** Turn raw observations into a small, testable scope.

Classify every item as functional, non-functional, integration, commercial/operating requirement, assumption, constraint or open question. Prioritise together with stakeholders using expected customer and business outcome, urgency, risk, dependency, effort and evidence strength.

The team must state why an item is in the MVP. A request with no validated problem remains in discovery, not in the sprint backlog.

**Exit:** A ranked MVP hypothesis, explicit exclusions and a list of unresolved risks with owners.

## 4. Document requirements

**Purpose:** Create a shared and testable source of truth.

Maintain a BRD/PRD-level summary for the initiative and user stories or use cases for delivery. Each delivery-ready item includes:

- Business outcome and source evidence.
- Actor and preconditions.
- Business rules, permissions and data constraints.
- Acceptance examples: Given [business state], when [actor action], then [observable result].
- Exception, denied-action and duplicate/retry examples where relevant.
- Priority, owner, dependencies and open questions.

**Exit:** PM, BA, Tech Lead and QA agree the item is understandable enough to refine.

## 5. Solution design with Product and Engineering

**Purpose:** Check that a solution can meet the business need without inventing rules.

Run a DDD workshop before UI and system architecture design. Domain experts, BA, PM, Tech Lead and QA clarify ubiquitous language, domain events, business rules, ownership and candidate bounded contexts. For the Customer Portal, terms such as Service Work, Invoice, Support Request, Customer, Workspace and Subscription must be validated with real scenarios before boundaries are decided.

Design then produces process flows, UI flows and architecture alternatives based on the agreed model. Engineering identifies feasibility risks, integrations and investigation tasks; QA defines verification evidence.

**Exit:** The proposed solution traces to validated requirements, and the team has no unowned high-risk ambiguity.

## 6. Validate and obtain sign-off

**Purpose:** Confirm the intended outcome and scope before development commitment.

Review the problem, workflow, rules, MVP scope, acceptance examples, non-functional constraints and known exclusions with the appropriate customer sponsor and internal decision makers. Record approval, requested changes, approver and date.

For enterprise opportunities, validate the buying journey and governance criteria too: access control, tenant separation, audit evidence, security review, legal/procurement and integrations. Never promise a capability that has not been verified.

**Exit:** The initiative is approved for delivery or explicitly returned to discovery.

## 7. Support delivery and User Acceptance Testing

**Purpose:** Keep business intent intact through implementation.

During each sprint, BA answers rule questions, logs decisions and updates requirements when validated learning changes scope. QA tests acceptance examples and negative cases. User Acceptance Testing uses representative users and real business scenarios, with sensitive data removed or controlled.

**Exit:** UAT evidence shows the agreed workflow and acceptance criteria pass, or defects and gaps are recorded and prioritised.

## 8. Rollout, support and outcome review

**Purpose:** Measure whether the release delivered the business outcome.

Plan pilot users, training, support route, rollout criteria, rollback/contingency, communication and post-release measurement. Compare the agreed baseline with observed behaviour and outcome at the review date. Send feedback, support requests and adoption data back to discovery and roadmap prioritisation.

**Exit:** The team decides to expand, improve, pause or stop based on evidence.

## Workflow controls

| Gate | Required evidence |
| --- | --- |
| Discovery-ready | Problem, target segment, sponsor and research questions are known. |
| Refinement-ready | Workflow evidence, rules, priority and open questions are recorded. |
| Design-ready | DDD terminology and key rules are clear; high-risk unknowns have owners. |
| Sprint-ready | Outcome, acceptance criteria, owner, priority, estimate and dependencies are known. |
| Release-ready | QA and UAT evidence pass; Product accepts outcome; Tech Lead accepts production risk. |
| Outcome-reviewed | Adoption, customer feedback and success metric are reviewed. |

The workflow is iterative: discovery, documentation, validation and delivery learning may repeat whenever new customer evidence changes an assumption.
