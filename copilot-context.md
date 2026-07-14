# GitHub Copilot Context: Death by Meetings

You are helping build an interactive data story for an AI upskill course assignment called P302 — Interactive Data Story.

## Product intent
This is not a dashboard. It is a story-driven web experience that helps users understand a surprising pattern in invented data.

## Story thesis
People often assume fewer meeting hours means a more productive day. The story shows that this assumption can be wrong. A day with fewer total meeting hours can be less productive if meetings are scattered and prevent deep work.

## Build goal
Create a polished single-page web app that walks users through:

1. A familiar assumption
2. A comparison between two fictional workers
3. A prediction moment
4. A surprising reveal
5. An explanation of meeting fragmentation
6. An interactive simulator
7. A memorable takeaway

## Data
Use local fake JSON data. Do not fetch from an API.

## UX principles
- Story first, charts second
- Plain language over jargon
- Progressive disclosure
- Strong visual hierarchy
- Minimal but meaningful interaction
- Demo-ready polish

## Avoid
- Generic dashboard layout
- Too many charts at once
- Complex data science explanations
- Real employee data
- Overbuilding authentication, backend, or persistence

## Preferred component architecture
- `Hero`
- `ProfileComparison`
- `CalendarStrip`
- `PredictionReveal`
- `InsightCard`
- `Simulator`
- `ScoreMeter`
- `Takeaway`

## Scoring model
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

## UX writing style
Use phrases like:

- “The day looked lighter, but felt heavier.”
- “Meeting hours tell you how full the calendar is. Fragmentation tells you how usable the day is.”
- “A 45-minute gap often becomes email cleanup, not deep work.”
- “The goal is not zero meetings. The goal is intentional meetings.”

## Definition of done
The app is done when someone can understand the core point in under one minute and can interact with the simulator to see how calendar design affects productivity.
