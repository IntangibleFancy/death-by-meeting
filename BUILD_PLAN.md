# BUILD_PLAN.md
# The Productivity Paradox: Death by Meetings
## Vue Build Plan

## Project Goal

Create an interactive data story that helps users understand an unexpected insight:

> The least busy calendar is not always the most productive calendar.

The experience should feel like a guided narrative rather than a dashboard. Build the app in Vue 3 with Vite and TypeScript.

---

## Phase 1: Foundation

### Objective
Create the project structure and establish the visual foundation.

### Tasks

1. Scaffold a Vue 3 project using Vite and TypeScript.
2. Configure Tailwind CSS.
3. Use Vue Single File Components.
4. Use the Composition API and `<script setup>` syntax.
5. Create the recommended folder structure.
6. Import the local JSON dataset.
7. Confirm the app runs with the default dev server.

### Deliverables

- Running Vue application
- Tailwind configured
- JSON data loaded successfully
- Basic app shell complete
- No backend, database, or authentication

---

## Phase 2: Story Introduction

### Objective
Establish the core thesis and create curiosity.

### Component

`HeroSection.vue`

### User Experience

The user should immediately understand:

- This is not a productivity dashboard.
- This is an investigation into why some workdays feel harder than others.
- The story will challenge a common assumption about meetings.

### Content

Headline:

> The Productivity Paradox

Subheadline:

> Why the least busy calendar can still be the least productive

Supporting copy:

> People often assume fewer meeting hours automatically create more productive days. The data tells a different story.

### Deliverables

- Hero section
- Clear visual hierarchy
- Strong thesis statement
- Scroll cue or visual affordance to continue

---

## Phase 3: The Assumption

### Objective
Create a prediction moment before revealing the hidden data.

### Components

- `WorkerComparison.vue`
- `CalendarTimeline.vue`

### User Experience

Introduce two fictional workers:

#### Alex

- 6 hours of meetings
- Meetings clustered together
- One meaningful focus block

#### Jordan

- 4 hours of meetings
- Meetings scattered throughout the day
- No meaningful focus block

Prompt:

> Who had the more productive day?

### Requirements

- Show comparison cards side by side on desktop.
- Stack cards on mobile.
- Show simplified calendar timelines.
- Do not reveal productivity score yet.
- Let the user choose Alex or Jordan.

### Deliverables

- Side-by-side worker comparison
- Simplified calendar visualization
- Prediction interaction

---

## Phase 4: The Reveal

### Objective
Challenge the user's assumptions.

### Component

`PredictionReveal.vue`

### User Experience

After the user makes a prediction, reveal:

- Productivity scores
- Fragmentation scores
- Context switches
- Longest focus block
- Narrative explanation

### Key Message

Meeting volume is not the whole story.

Jordan has fewer meeting hours, but Jordan’s day is more fragmented.

### Deliverables

- Animated reveal
- Comparison metrics
- Narrative callout
- Clear explanation of why Alex’s day is more productive

---

## Phase 5: Explain the Why

### Objective
Help users understand the mechanism behind the reveal.

### Components

- `InsightCard.vue`
- `InsightCards.vue` or a section inside `App.vue`

### Topics

#### Insight 1: Context Switching
Every meeting requires mental setup and mental recovery.

#### Insight 2: Broken Focus Blocks
Work requires uninterrupted time. A 30-minute opening often disappears into email and reorientation.

#### Insight 3: Fragmentation
Small openings in the calendar rarely become meaningful work.

### Deliverables

- Three educational insight cards
- Plain-language explanations
- Simple visual cues or icons
- No dense analytics

---

## Phase 6: Interactive Simulator

### Objective
Transform the user from observer into participant.

### Components

- `ProductivitySimulator.vue`
- `ScoreMeter.vue`

### Controls

#### Meeting Pattern
- Clustered
- Scattered

#### Meeting Count
Slider

#### Average Meeting Length
Slider

#### Async Replacement Rate
Slider

#### Protected Focus Block
Toggle

### Outputs

- Productivity score
- Fragmentation score
- Context switches
- Longest focus block
- Deep work blocks
- Dynamic narrative interpretation

### Technical Notes

- Use reactive state with `ref()`.
- Use `computed()` for simulator output.
- Put scoring logic in `useProductivityScoring.ts`.
- Do not store simulator state globally unless needed.

### Deliverables

- Fully interactive simulator
- Real-time updates
- Narrative-driven explanations
- Accessible form controls

---

## Phase 7: Dynamic Storytelling

### Objective
Translate metrics into human language.

### Component or Composable

`useNarrativeGenerator.ts`

### Examples

Instead of:

> Productivity Score = 52

Show:

> The calendar appears manageable, but meetings are breaking the day into small pieces that are difficult to use effectively.

Instead of:

> Fragmentation Score = 80

Show:

> You have free time on your calendar, but very little of it is long enough to support meaningful work.

### Deliverables

- Human-readable insights
- Dynamic interpretation logic
- Copy that changes based on simulator outputs

---

## Phase 8: Final Recommendation

### Objective
Give the user a memorable takeaway.

### Component

`TakeawaySection.vue`

### Core Message

> The goal is not fewer meetings. The goal is intentionally designed focus.

### Recommendations

- Cluster meetings when possible.
- Protect focus blocks.
- Replace status updates with async communication.
- Reduce unnecessary context switching.

### Deliverables

- Final summary section
- Strong call-to-action
- Story conclusion

---

## Phase 9: Visual Polish

### Objective
Make the project feel presentation-ready.

### Requirements

- Responsive design
- Smooth transitions
- Consistent spacing
- Accessible controls
- Clear hover and focus states
- Animation only where it reinforces the story

### Avoid

- Excessive charts
- Dashboard aesthetics
- Technical jargon
- Overly complex interactions
- Large configuration panels

---

## Recommended Build Order for Copilot Agent

1. Read `PRD.md`, `STORY_GUIDELINES.md`, this file, and `meeting-fragmentation-data.json`.
2. Scaffold the Vue app.
3. Configure Tailwind.
4. Create the component folder structure.
5. Load the JSON data.
6. Build `HeroSection.vue`.
7. Build `CalendarTimeline.vue`.
8. Build `WorkerComparison.vue`.
9. Add prediction state and reveal behavior.
10. Build `PredictionReveal.vue`.
11. Build insight cards.
12. Implement `useProductivityScoring.ts`.
13. Build `ProductivitySimulator.vue`.
14. Add dynamic narrative generation.
15. Add final takeaway section.
16. Polish layout, responsiveness, accessibility, and motion.

---

## Definition of Done

The project is complete when:

- Users understand the core insight in under one minute.
- Users can predict the outcome before the reveal.
- Users are surprised by the reveal.
- Users can experiment with meeting patterns.
- Users leave understanding that fragmentation matters more than total meeting hours.
- The experience feels like a story, not a dashboard.
