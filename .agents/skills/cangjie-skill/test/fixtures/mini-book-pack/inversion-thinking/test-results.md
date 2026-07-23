# test-results

pass_rate: 83%
bait_fail: true
mode: rule-engine-smoke

- should-trigger-01: PASS (would_trigger=true)
- should-trigger-02: PASS (would_trigger=true)
- should-trigger-03: PASS (would_trigger=true)
- should-not-trigger-01: PASS (would_trigger=false)
- should-not-trigger-02: FAIL (would_trigger=true)
- edge-01: PASS (would_trigger=false)
