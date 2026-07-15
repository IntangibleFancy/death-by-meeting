# PRD: Death by Meetings — Interactive Data Story

## 1. Product Summary

**Project name:** Death by Meetings  
**Industry:** Professional Services / Knowledge Work / Consulting Operations  
**Audience:** Knowledge workers, consultants, delivery leads, people managers, and operations leaders  
**Format:** Interactive web-based data story  

### One-line concept
People think too many meeting hours are the problem, but the hidden productivity killer is **meeting fragmentation**: frequent context switching, poorly spaced meetings, and the loss of meaningful focus blocks.

### Core point of view
The most damaging workday is not always the one with the most meeting hours. It is often the one where meetings are scattered across the day in a way that prevents deep work.

The experience should help users walk away understanding:

> A calendar can look “less busy” by total meeting hours and still be more harmful to productivity if it destroys focus time.

---

## 2. Problem Statement

Knowledge workers often evaluate workload by looking at the total number of meeting hours in a day or week. That metric is easy to understand, but it hides an important reality: a calendar with fewer meeting hours can still create more cognitive load if those meetings are fragmented across the day.

This data story illustrates how context switching, meeting spacing, meeting count, and uninterrupted focus blocks combine to shape a person’s actual ability to do meaningful work.

---

## 3. Narrative Arc

The product should feel like a short interactive story, not a dashboard.

### Act 1 — The Assumption
Show two workers with different calendars.

- **Alex:** 6 hours of meetings, but meetings are clustered into two blocks.
- **Jordan:** 4 hours of meetings, but meetings are scattered across the whole day.

Prompt the user:

> Who had the more productive day?

Most users will assume Jordan did, because Jordan had fewer meeting hours.

### Act 2 — The Reveal
Reveal that Jordan had worse productivity despite fewer meeting hours.

Why?

Jordan’s meetings caused more context switches, fewer deep work blocks, and more time lost to task re-entry.

### Act 3 — The Explanation
Explain the difference between:

- Meeting load
- Meeting fragmentation
- Context switching
- Focus block availability
- Recovery time between meetings

Use simple visual language. Avoid making the experience feel academic.

### Act 4 — The Simulation
Let the user adjust meeting patterns and immediately see the effect on productivity.

Possible controls:

- Meeting count
- Average meeting length
- Whether meetings are clustered or scattered
- Number of attendees
- Focus block protection
- Async replacement rate

### Act 5 — The Takeaway
End with a clear recommendation:

> If you want better productivity, do not only reduce meeting hours. Protect uninterrupted focus blocks and cluster necessary meetings.

---

## 4. Primary User Goals

As a user, I want to:

1. Quickly understand why meeting fragmentation matters.
2. Compare two workday patterns side by side.
3. Interact with variables that affect productivity.
4. See a plain-language explanation of what changed and why.
5. Leave with a memorable takeaway I can apply to my own calendar.

---

## 5. Key Product Requirements

### 5.1 Story-first layout
The experience must follow a guided story structure. It should not open with a dense dashboard.

Recommended structure:

1. Hero / thesis
2. Calendar comparison
3. User prediction moment
4. Reveal of productivity impact
5. Interactive simulator
6. Takeaway / recommendation

### 5.2 Comparison view
Include two fictional worker profiles.

Each profile should show:

- Name
- Role
- Total meeting hours
- Number of meetings
- Number of context switches
- Longest focus block
- Deep work blocks
- Fragmentation score
- Estimated productivity score

### 5.3 Interactive simulator
The simulator should let users manipulate variables and see downstream effects.

Minimum controls:

- Meeting pattern: clustered vs scattered
- Number of meetings
- Average meeting length
- Protected focus block: on/off
- Async replacement percentage

Recommended outputs:

- Productivity score
- Fragmentation score
- Focus time available
- Context switching cost
- Plain-language interpretation

### 5.4 Narrative callouts
Use callouts to explain insights in human language.

Examples:

- “Four meeting hours can feel heavier than six if they are scattered throughout the day.”
- “The longest uninterrupted focus block is often a better signal than total meeting hours.”
- “The goal is not zero meetings. The goal is intentional meetings.”

### 5.5 Visual treatment
The UI should feel like a polished consulting artifact: clear, calm, modern, and presentation-ready.

Recommended style:

- Clean white or warm neutral background
- Subtle accent color for insight moments
- Cards with rounded corners
- Timeline/calendar-like visuals
- Simple charts, not overly technical dashboards
- Animated reveals where helpful

---

## 6. Data Model

Use invented data. Accuracy is less important than storytelling clarity.

### Core entities

#### WorkerProfile
Represents a fictional worker/persona.

Fields:

- `id`
- `name`
- `role`
- `summary`
- `meetingHours`
- `meetingCount`
- `contextSwitches`
- `longestFocusBlockMinutes`
- `deepWorkBlocks`
- `fragmentationScore`
- `productivityScore`
- `calendarPattern`
- `insight`

#### WorkdaySchedule
Represents events on a single workday.

Fields:

- `profileId`
- `dayStart`
- `dayEnd`
- `events`

Each event:

- `id`
- `type`: meeting | focus | admin | lunch | break
- `label`
- `start`
- `end`
- `energyImpact`

#### SimulationScenario
Represents adjustable variables in the simulator.

Fields:

- `id`
- `name`
- `meetingPattern`
- `meetingCount`
- `averageMeetingLengthMinutes`
- `asyncReplacementRate`
- `protectedFocusBlock`
- `outputs`

---

## 7. Suggested Productivity Formula

Use a simple transparent formula. It does not need to be scientifically rigorous.

```text
baseScore = 100
meetingLoadPenalty = meetingHours * 5
contextSwitchPenalty = contextSwitches * 4
fragmentationPenalty = fragmentationScore * 0.35
focusBonus = deepWorkBlocks * 8
protectedFocusBonus = protectedFocusBlock ? 10 : 0
productivityScore = clamp(baseScore - meetingLoadPenalty - contextSwitchPenalty - fragmentationPenalty + focusBonus + protectedFocusBonus, 0, 100)
```

### Interpretation rules

- 80–100: Strong focus day
- 65–79: Manageable but interrupted
- 45–64: Fragmented day
- 0–44: High-friction day

---

## 8. Interaction Requirements

### Required interactions

1. **Prediction toggle**  
   User chooses which worker they think had the more productive day.

2. **Reveal interaction**  
   After prediction, show the hidden productivity metrics.

3. **Scenario controls**  
   User adjusts meeting pattern variables.

4. **Dynamic explanation**  
   The insight text updates based on selected scenario.

### Optional interactions

- Animated calendar blocks
- Slider for async replacement rate
- Toggle for protected focus block
- Before/after comparison
- “What changed?” explanation panel

---

## 9. Success Criteria

The project is successful if a reviewer can understand the main point within one minute:

> Meeting hours alone do not explain productivity. Fragmentation and focus-block quality matter more than most people realize.

A strong implementation should:

- Feel like a guided story, not a dashboard
- Include realistic but simplified fake data
- Let users interact meaningfully with the narrative
- Make the surprising insight obvious
- End with a practical recommendation

---

## 10. MVP Scope

### Must have

- Landing thesis section
- Two-person calendar comparison
- Prediction/reveal interaction
- Fake dataset loaded from JSON
- Interactive simulator with at least three controls
- Dynamic insight text
- Final takeaway section

### Should have

- Smooth section transitions
- Basic responsive design
- Bar or score visualization
- Calendar block visualization
- Simple animations

### Could have

- AI narrator panel
- Downloadable calendar recommendation
- Additional personas
- Team-level view
- Meeting hygiene recommendations

---

## 11. Recommended Tech Approach

Suggested stack:


- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- VueUse (optional)
- Chart.js or Apache ECharts
- Local JSON data

The project should use Vue Single File Components (SFCs) and the Composition API.


Recommended file structure:

```text
/src
├── assets
├── components
│   ├── HeroSection.vue
│   ├── WorkerComparison.vue
│   ├── CalendarTimeline.vue
│   ├── PredictionReveal.vue
│   ├── InsightCard.vue
│   ├── ProductivitySimulator.vue
│   ├── TakeawaySection.vue
│
├── composables
│   └── useProductivityScoring.ts
│
├── data
│   └── meeting-fragmentation-data.json
│
├── App.vue
└── main.ts
```

---

## 12. Tone and UX Writing

The language should be plainspoken and memorable.

Avoid:

- “Utilization optimization”
- “Synchronous collaboration inefficiencies”
- “Temporal productivity degradation”

Use:

- “The day looked lighter, but felt heavier.”
- “The problem was not the meetings. It was the gaps between them.”
- “Focus time works best when it is protected, not sprinkled between calls.”

---

## 13. Demo Script

1. “This story starts with a familiar assumption: fewer meeting hours equals a better workday.”
2. “Here are two consultants. Alex has six hours of meetings. Jordan has only four.”
3. “Which day would you rather have?”
4. “Most people pick Jordan. But the hidden data tells a different story.”
5. “Jordan’s meetings are scattered, creating more context switches and almost no usable focus blocks.”
6. “Now we can test what happens when we cluster meetings or protect focus time.”
7. “The takeaway is simple: don’t just reduce meetings. Design the calendar for focus.”
