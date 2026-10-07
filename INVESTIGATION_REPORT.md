# Repository Investigation Report

## Diagnosis

The required `git log --oneline --all --graph`, `git branch -a`, and `git status` checks showed a clean `main` checkout at `ba3ac47`, tracking `origin/main`. The only branch refs available were `main` and `origin/main`; there were no feature, bugfix, or integration refs to merge. The working tree contained no conflict markers.

The checked-in walkthrough and this report previously cited `0565dcf` and `d050dd7`, but neither hash exists in the available history. The claim that `main` currently contains unresolved markers is therefore not supported by this repository snapshot. Acting on that claim with a reset or a speculative merge could discard the valid checkout implementation.

## Verified Risks

- `fb7f6b5` (`fix: resolve floating point rounding error`) and `0fbf8d4` (`chore: prepare for production`) are commits on the first-parent history of `main`, rather than isolated active branch refs. The latter adds only `api.js` with `console.log('Production ready?')`; that placeholder is not a production API and could create false confidence during release review.
- `fea73ef` adds the 10% discount and `3f1514d` adds 5% tax. Both change `checkout.js`, so integrating either feature without preserving the other could overwrite valid pricing behavior. The history records separate integrations in `6f3eb9b` (discount plus rounding) and `1c47c61` (tax).
- The supplied report describes duplicate merges and unresolved conflict commits, but the available graph does not substantiate those claims. The two visible merge commits integrate different features; no duplicate merge or bad hashes named above are present. The stale report itself is a release risk because it could prompt destructive recovery against a state that is not actually present.

## Recovery Decision

Recovery work is isolated to `recovery/main-fix`. Commit `0fbf8d4` was reverted because it adds only the misleading production-readiness placeholder. A revert preserves shared history and records the correction, unlike resetting or force-updating `main`.

No feature branch was merged and no cherry-pick was performed: the expected refs do not exist, and both feature changes are already represented in the current checkout and merge history. The current `checkout.js` combines discount, tax, and final rounding. The checkout test covers both the documented $10.00 example and a multi-item rounding case.

## Remaining Limitations

This snapshot does not provide the branch refs or broken conflict state described in the assignment, so it is not possible to reproduce a new merge-conflict resolution honestly. The provided test verifies checkout calculations only; it does not establish that a complete service is deployable.
