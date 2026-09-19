# Retail sales recording — discovery brief

Status: Early problem discovery for a multi-merchant SaaS. The founder's observation of the mother's fruit shop is the first research case; it does not define the product's only customer or limit its market.

## Problem statement

Small merchants who record sales on paper cannot quickly and reliably see their daily revenue. They must total handwritten notes manually, which makes it difficult to know how the shop performed today and to review past days.

The initial target is many small shops that want a simple, low-cost way to record sales and see daily revenue. Fruit shops are one candidate segment and the mother's shop is the first discovery case. Interview other merchants before deciding whether the first market is fruit shops specifically or a broader group with the same workflow. The product's proposed free starting tier is a commercial hypothesis intended to reduce adoption risk; it needs validation alongside the operating cost and upgrade path.

## Evidence and assumptions

| Type | Statement | Status |
| --- | --- | --- |
| Evidence | The founder reports that the mother's fruit shop uses traditional paper records. | Confirm directly with the shop owner and observe one real business day. This is one research case, not the whole market. |
| Evidence | Paper records do not give an immediate, clear daily-revenue view. | Confirm the exact current process, calculation time and error cases. |
| Assumption | This problem is shared by many small merchants. | Interview merchants in the selected segment and compare their workflows before treating it as a segment-wide need. |
| Assumption | A free starting tier will attract adoption. | Test willingness to try, ongoing usage, support cost and possible paid value. |
| Assumption | A mobile-first simple sales record is the best first solution. | Compare with a daily-total-only flow and the current paper workflow. |

## First discovery interview

Interview the first shop owner while looking at a recent paper record, then repeat with other merchants in the selected segment. Ask about a completed day, not an imagined app.

1. Please show me how you record a sale today, from the first customer to closing time.
2. At the end of yesterday, how did you calculate revenue? How long did it take and who did it?
3. What information do you write for each sale: amount, product, quantity, payment method, customer, credit, or something else?
4. What happens when a sale is cancelled, a customer pays later, a price changes, or a note is missed?
5. Which number do you need to know before going home, and how accurate must it be?
6. Do you use a phone while selling? When would entering a sale be inconvenient?
7. What would make you stop using a new system after the first week?
8. If a free tool worked well, what value would justify paying later, if any?

Capture exact customer words, photographs or copies of records only with permission, and distinguish observations from interpretations.

## Candidate MVP outcome

**Outcome hypothesis:** A merchant can record the money received for a sale quickly enough during normal work and see a trusted total for the current business day without manually adding paper notes.

**Candidate MVP workflow:**

```text
Open today's shop day → record sale amount → confirm saved sale → see current daily revenue → close/review day
```

The workflow intentionally excludes inventory, suppliers, staff payroll, full accounting, invoicing, advanced analytics and multi-shop management until interviews prove they are necessary to the first outcome.

## Candidate acceptance examples

- Given an open shop day, when a merchant records a sale amount, then daily revenue increases by that amount and the saved sale is visible.
- Given a merchant entered the wrong sale, when the merchant corrects or voids it, then daily revenue reflects the approved correction and the original record remains traceable if the shop requires it.
- Given no sale is recorded, when the merchant views the day, then the system clearly shows zero recorded revenue rather than implying actual zero revenue.
- Given a merchant opens a past day, when the merchant views its summary, then the system shows the total from recorded sales for that day using the shop's agreed business-day rule.

These are hypotheses for discussion, not approved requirements.

## DDD starting point

Use the following as vocabulary to test with merchants:

| Candidate concept | Question to resolve |
| --- | --- |
| Merchant | Does one person operate the shop, or do several people record sales? |
| Shop | Does the merchant need one shop only or more than one location? |
| Business Day | Is the day midnight-to-midnight or defined by opening and closing time? |
| Sale | Is it an individual transaction, a line on paper, or a total entered later? |
| Sale Correction | Can an error be changed, voided or deleted? Who is allowed to do it? |
| Daily Revenue | Does it mean gross money received, cash only, or money after refunds/credit? |

Do not choose aggregates, bounded contexts, database structure or architecture until these rules are confirmed. A likely initial domain focus is sales recording and daily revenue; it is not yet a complete POS or accounting system.

## Success measurement

Establish a baseline during discovery, then measure:

- Time to record a typical sale.
- Number of shop days with at least one recorded sale.
- Time needed to know daily revenue at closing.
- Difference between recorded total and the merchant's trusted cash/other-payment total, where comparison is appropriate.
- Merchant's reported confidence in the daily total after one and four weeks.

## Next decision

Run the first interview and observation at the fruit shop, then test the same problem with additional independent merchants. After the evidence is compared, decide whether to prototype the candidate MVP for a defined initial segment, revise the problem statement, or investigate a different workflow.
