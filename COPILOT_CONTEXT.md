# COPILOT_CONTEXT.md
# GitHub Copilot Context: The Productivity Paradox

You are helping build an interactive data story for an AI upskill course assignment called P302 — Interactive Data Story.

## Product Intent

This is not a dashboard. It is a story-driven web experience that helps users understand a surprising pattern in invented data.

## Story Thesis

People often assume fewer meeting hours means a more productive day. The story shows that this assumption can be wrong. A day with fewer total meeting hours can be less productive if meetings are scattered and prevent deep work.

## Build Goal

Create a polished Vue single-page web app that walks users through:

1. A familiar assumption
2. A comparison between two fictional workers
3. A prediction moment
4. A surprising reveal
5. An explanation of meeting fragmentation
6. An interactive simulator
7. A memorable takeaway

## Tech Stack

Use:

- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- Local JSON data
- Vue Composition API
- Vue Single File Components

Optional:

- VueUse
- Chart.js or Apache ECharts
- Lightweight custom visualizations

Avoid:

- React
- Next.js
- Vuex
- Pinia unless truly necessary
- Backend APIs
- Authentication
- Database persistence
- Overly complex state management

## Vue Development Guidelines

Prefer:

- `<script setup lang="ts">`
- `ref()` for local reactive state
- `computed()` for derived values
- `watch()` only when side effects are necessary
- Props and emits for simple component communication
- Composables for reusable logic

Avoid:

- Options API
- Excessive prop drilling
- Global state unless needed
- Mixing business logic into presentational components

## Preferred Vue Architecture

Primary components:

- `HeroSection.vue`
- `WorkerComparison.vue`
- `CalendarTimeline.vue`
- `PredictionReveal.vue`
- `InsightCard.vue`
- `ProductivitySimulator.vue`
- `ScoreMeter.vue`
- `TakeawaySection.vue`

Business logic:

- `useProductivityScoring.ts`
- `useNarrativeGenerator.ts`

Types:

- `meetingTypes.ts`

Data:

- `meeting-fragmentation-data.json`

## Data Rules

Use local fake JSON data. Do not fetch from an API.

The dataset is intentionally simplified. Do not try to make it scientifically rigorous. It only needs to support the story.

## UX Principles

- Story first, charts second
- Plain language over jargon
- Progressive disclosure
- Strong visual hierarchy
- Minimal but meaningful interaction
- Demo-ready polish
- Human-readable explanations

## Avoid

- Generic dashboard layout
- Too many charts at once
- Complex data science explanations
- Real employee data
- Overbuilding configuration screens
- Making users interpret raw metrics without narrative help

## Scoring Model

Use a transparent simplified model. The score does not need to be scientifically validated. It only needs to support the story.

Example:

```ts
const productivityScore = clamp(
  100
  - meetingHours * 5
  - contextSwitches * 4
  - fragmentationScore * 0.35
  + deepWorkBlocks * 8
  + (protectedFocusBlock ? 10 : 0),
  0,
  100
);
```

## UX Writing Style

Use phrases like:

- “The day looked lighter, but felt heavier.”
- “Meeting hours tell you how full the calendar is. Fragmentation tells you how usable the day is.”
- “A 45-minute gap often becomes email cleanup, not deep work.”
- “The goal is not zero meetings. The goal is intentional meetings.”

## Definition of Done

The app is done when someone can understand the core point in under one minute and can interact with the simulator to see how calendar design affects productivity.

## Recommended First Prompt

```text
Read PRD.md, BUILD_PLAN.md, STORY_GUIDELINES.md, COPILOT_CONTEXT.md, and the dataset. Build this as a Vue 3 + Vite + TypeScript single-page interactive data story. Follow the build plan phase by phase. Prioritize storytelling over dashboard design. Use local JSON data only. Start by scaffolding the app structure and implementing the hero, comparison, prediction, reveal, simulator, and takeaway sections.
```

## Recommended Refinement Prompt

```text
Review the current implementation against STORY_GUIDELINES.md. Identify any places where the app feels too much like a dashboard and revise the experience to make the narrative clearer, more progressive, and more emotionally compelling. Add plain-language explanations where metrics currently stand alone.
```
