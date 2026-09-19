# User Interview Workflow

Use this workflow for every company project, including SaaS, e-commerce, internal tools, and mobile products. Each project has its own user, problem, and workflow. The interview method is shared; findings must not be copied from one project to another without new evidence.

## Purpose

Learn what users do today, where work fails, and what outcome matters before choosing features, UI, or technical design.

## 1. Select one project and one decision

Start each interview cycle with a narrow decision. Examples:

- Retail sales SaaS: decide whether daily sales recording is the first MVP problem.
- E-commerce: decide why customers abandon checkout.
- Internal tool: decide why staff take too long to approve requests.

Record the project, target user, business decision, hypothesis, and evidence already available. Do not mix evidence between projects.

## 2. Prepare

Choose 5–7 users who recently performed the relevant task. Use 3–5 interviews for an early signal, then continue until the same themes repeat. Invite a developer or designer to observe when possible.

Prepare:

- One problem hypothesis, written as an assumption.
- A 30–45 minute session.
- Consent for notes, recording, or screenshots.
- A note template with facts, direct quotes, interpretation, and follow-up questions separated.

## 3. Interview real past behavior

Begin with context. Then ask the user to walk through the latest real example.

1. What role do you have, and what were you trying to finish?
2. Tell me about the last time you did this task.
3. Show or describe each step from the trigger to the result.
4. What tool, document, message, or workaround did you use?
5. Where did you lose time, make an error, wait, or ask for help?
6. What happened when something went wrong or changed?
7. What result mattered most to you?
8. What have you tried before, and why did it not solve the problem?

Avoid asking: “Would you use this feature?” Users often agree politely. Ask about what happened, what they did, and what it cost.

## 4. Capture evidence

For every interview, record:

| Field | Capture |
| --- | --- |
| Project | Product or initiative name |
| User | Role, context, and relevant experience |
| Scenario | Latest real task and trigger |
| Workflow | Steps, tools, decisions, and handoffs |
| Pain | Time, error, risk, cost, or confusion |
| Workaround | What the user does today |
| Quote | Exact words that matter |
| Evidence | Notes, anonymized artifact, observation, or data |
| Interpretation | Analyst conclusion, clearly labelled |
| Follow-up | Unknowns, contradictions, or next question |

## 5. Synthesize after several interviews

Group evidence by repeated workflow, pain, user type, and desired outcome. Count how many users mentioned each theme, but do not prioritize frequency alone. A rare issue may be severe.

For each candidate problem, assess:

- Frequency: How often does it appear?
- Severity: How much time, money, risk, or frustration does it cause?
- Segment fit: Does it affect the target user group?
- Business fit: Does solving it support the product goal?
- Feasibility: Can the team test a small solution soon?

Create a problem statement before a solution statement.

## 6. Turn findings into delivery work

Use this chain:

```text
Interview evidence
  → Problem statement
  → Desired outcome and success metric
  → Requirement and business rules
  → User story and acceptance examples
  → DDD workshop and technical plan
  → UI prototype or product slice
  → Usability test and release measurement
```

Requirements need traceability back to interview evidence. A feature without evidence is an assumption and should be labelled as such.

## 7. Reuse learning across projects

Maintain one research index for the company. Each entry links to the project, segment, interview date, themes, evidence, decision, and open questions.

Reuse a finding only when the new project has the same user type, task, context, and problem. For example, “users do not trust a total without transaction history” may apply to retail and e-commerce reporting, but checkout behavior must be researched with e-commerce customers directly.

## Current use case: retail sales SaaS

**Target user:** Owner of a small shop that records sales on paper.

**Hypothesis:** The owner needs a faster, more trusted way to know daily revenue at closing time.

**First interview:** Observe the mother's fruit shop during a real selling day. Understand how a sale is recorded, how daily revenue is calculated, what errors occur, and what number the owner trusts at closing.

**Next cycle:** Repeat with independent small merchants in the chosen segment. Only then decide whether to build the daily-sales MVP for that segment.

## Interview quality gate

Do not begin solution design until the team can answer:

- Who has the problem?
- What is the latest real workflow?
- What does the problem cost or prevent?
- What outcome matters to the user?
- Which evidence supports the MVP decision?
- Which business rules and exceptions must the product respect?
