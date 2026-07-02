# Screenshot Inventory — Apple Passwords

8 screenshots, iPhone 16 Pro simulator. App identified: **Apple Passwords** (iOS).

| File | Screen | State | Nav chrome | Notes |
| --- | --- | --- | --- | --- |
| shot-01 | Passwords (home) | default | large title, search bar, **+** FAB | 2-col grid of 5 category cards (All, Passkeys, Codes, Security, Deleted), each with colored icon, count `0`, chevron |
| shot-02 | All | empty | back chevron "Passwords", select toggle | keys illustration, "No Saved Passwords" |
| shot-03 | Passkeys | empty | back chevron, select toggle | person+key icon, "No Saved Passkeys", "More About Passkeys" link |
| shot-04 | Codes | empty | back chevron, select toggle | lock+clock icon, "No Saved Verification Codes", link, footer "0 Verification Codes" |
| shot-05 | Security | empty | back chevron, select toggle | gray check circle, "No Security Recommendations", link |
| shot-06 | Recently Deleted | empty | back chevron, select toggle | trash icon, "No Deleted Passwords", 30-day note |
| shot-07 | New Password | default | Cancel / Save header (modal) | sheet from **+**; multicolor keys icon, Website/Username/Password fields, Notes |
| shot-08 | More About Passkeys | default | Done header (modal) | sheet from "More About Passkeys" link; info text |

## Navigation model

**Stack** (back chevrons, no tab bar) rooted at `Passwords`. Five category cards
push detail screens. Two **modal sheets**: New Password (from +) and About
Passkeys (from the link). Confirmed: not a tabs app.

## Coverage note

All five category detail screens were captured in their **empty** state only — no
filled/with-data states were provided, so the clone shows empty states (faithful
to the input). Filled states would need additional screenshots.
