# The Productivity Paradox: Death by Meetings
## Vue Context Pack

This context pack is designed to help GitHub Copilot Agent, Cursor, Claude Code, Windsurf, or another agentic IDE build a Vue-based interactive data story.

## What this is

An interactive data story for assignment P302: Interactive Data Story.

The story explores a simple but surprising idea:

> The least busy calendar is not always the most productive calendar.

## Files in this pack

### Context markdown

- `PRD.md` — product requirements, narrative arc, audience, MVP scope, technical approach, and success criteria
- `BUILD_PLAN.md` — step-by-step implementation order for the agentic IDE
- `STORY_GUIDELINES.md` — storytelling rules to prevent the app from becoming a generic dashboard
- `COPILOT_CONTEXT.md` — concise technical and product context for GitHub Copilot

### Source starter files

- `src/data/meeting-fragmentation-data.json` — fake dataset for the story
- `src/composables/useProductivityScoring.ts` — scoring composable for simulator logic
- `src/composables/useNarrativeGenerator.ts` — simple narrative helper for human-readable interpretations
- `src/types/meetingTypes.ts` — TypeScript interfaces for the data model

## Suggested repo structure

```text
/
├── PRD.md
├── BUILD_PLAN.md
├── STORY_GUIDELINES.md
├── COPILOT_CONTEXT.md
├── README.md
│
└── src/
    ├── components/
    │   ├── HeroSection.vue
    │   ├── WorkerComparison.vue
    │   ├── CalendarTimeline.vue
    │   ├── PredictionReveal.vue
    │   ├── InsightCard.vue
    │   ├── ProductivitySimulator.vue
    │   ├── ScoreMeter.vue
    │   └── TakeawaySection.vue
    │
    ├── composables/
    │   ├── useProductivityScoring.ts
    │   └── useNarrativeGenerator.ts
    │
    ├── data/
    │   └── meeting-fragmentation-data.json
    │
    ├── types/
    │   └── meetingTypes.ts
    │
    ├── App.vue
    └── main.ts
```

## Suggested first prompt for GitHub Copilot

```text
Read PRD.md, BUILD_PLAN.md, STORY_GUIDELINES.md, COPILOT_CONTEXT.md, and the dataset. Build this as a Vue 3 + Vite + TypeScript single-page interactive data story. Follow the build plan phase by phase. Prioritize storytelling over dashboard design. Use local JSON data only. Start by scaffolding the app structure and implementing the hero, comparison, prediction, reveal, simulator, and takeaway sections.
```

## Suggested refinement prompt

```text
Review the current implementation against STORY_GUIDELINES.md. Identify any places where the app feels too much like a dashboard and revise the experience to make the narrative clearer, more progressive, and more emotionally compelling. Add plain-language explanations where metrics currently stand alone.
```
