# Conflict Recovery Walkthrough

## Initial State

The required history and branch checks showed `main` and `origin/main` at `ba3ac47` with a clean working tree. No `feature/*`, `bugfix/*`, or `integration` branch refs were available. The report's asserted conflict commits (`0565dcf` and `d050dd7`) were absent, and `checkout.js` had no conflict markers.

The history does show the two checkout changes that could collide: `fea73ef` implements a 10% discount, while `3f1514d` implements 5% tax. They are integrated by distinct merge commits, `6f3eb9b` and `1c47c61`. The resulting function applies the discount, then tax, and rounds the final amount to cents. Since that combined implementation is already in the checked-out mainline, creating another merge or resolving fabricated markers would not be a safe recovery.

## Recovery Actions

I created `recovery/main-fix` from the current `main` and reverted `0fbf8d4`, which added only `api.js` with a `Production ready?` console message. Revert was appropriate because the commit is part of shared history; reset would rewrite that history and could invalidate other clones. I did not cherry-pick a feature: the valid discount, tax, and rounding behavior is already present, and no source branch refs exist to select from.

The supplied checkout test passed after the revert. It now also checks a multi-item total that exercises final cent rounding. No feature merge was run because no conflicting feature ref is present in this clone.

## Outcome and Limits

The recovery branch removes the production-readiness placeholder without rewriting `main` and preserves the integrated checkout calculation. The current test confirms two calculation cases, but this repository snapshot has no service startup/build setup, so the test alone cannot certify deployment readiness. The conflict-resolution claims in the original report should not be repeated as facts: the referenced commits and branch refs are unavailable here.
