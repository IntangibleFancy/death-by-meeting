# Component Brief: Death by Meetings

Use this file as implementation context.

## Overall experience
Build a single-page interactive data story. The page should guide the user through a narrative about meeting fragmentation. It should feel like a polished product demo, not a generic analytics dashboard.

## Main sections

### 1. Hero
Purpose: Establish the thesis.

Content:
- Title: Death by Meetings
- Subtitle: Why the least busy calendar can still be the least productive
- Short lead-in explaining that total meeting hours hide the real problem: fragmentation.

### 2. The Setup
Purpose: Introduce Alex and Jordan.

UI:
- Two side-by-side profile cards
- Each card includes role, meeting hours, meeting count, and simplified calendar strip
- Do not reveal productivity score yet

Prompt:
- “Who had the more productive day?”
- Buttons: Alex / Jordan

### 3. The Reveal
Purpose: Show the surprising result.

UI:
- Reveal productivity score for both workers
- Highlight that Alex performs better despite more meeting hours
- Show explanatory callout

Key message:
- Jordan’s day has fewer meeting hours, but more fragmentation.

### 4. Why It Happens
Purpose: Explain the mechanism.

UI:
- Three insight cards:
  1. Context switching
  2. Broken focus blocks
  3. Re-entry cost

Use plain English.

### 5. Simulator
Purpose: Let users experiment.

Controls:
- Meeting pattern: clustered / scattered
- Meeting count slider
- Average meeting length slider
- Async replacement percentage slider
- Protected focus block toggle

Outputs:
- Productivity score
- Fragmentation score
- Context switches
- Longest focus block
- Dynamic interpretation

### 6. Takeaway
Purpose: Resolve the story with a practical recommendation.

Final message:
- “Do not just reduce meetings. Design the calendar for focus.”

## Visual direction

- Clean consulting-style layout
- Warm neutral background
- Dark text
- One strong accent color
- Rounded cards
- Subtle shadows
- Smooth reveal animations
- Clear hierarchy

## Implementation notes

- Load fake data from `meeting-fragmentation-data.json`.
- Keep scoring logic in a utility function if possible.
- Use derived state for simulator results.
- Prefer reusable components.
- Make the experience responsive.
- Use accessible labels for all controls.
