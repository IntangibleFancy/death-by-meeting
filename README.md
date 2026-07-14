# Death by Meetings — Starter Context Pack

This folder contains starter context assets for building an interactive data story with GitHub Copilot or another agentic IDE.

## Files

- `death-by-meetings-prd.md` — product requirements and narrative direction
- `meeting-fragmentation-data.json` — fake reference dataset
- `component-brief.md` — recommended component structure and UI behavior
- `copilot-context.md` — concise context file to paste into Copilot or include in the repo
- `scoring.ts` — optional TypeScript utility for the simulator logic

## Suggested first prompt for GitHub Copilot

```text
Using the files in this repo as context, build a polished React single-page interactive data story called “Death by Meetings.” Start with the PRD and fake JSON data. Implement the story sections, prediction/reveal interaction, calendar comparison, and simulator. Use clean reusable components, accessible controls, and a modern consulting-style visual design.
```

## Suggested second prompt

```text
Refine the experience so it feels more like a guided data story than a dashboard. Add progressive disclosure, stronger narrative copy, and subtle animations between sections. Make the simulator outputs feel explanatory, not just numeric.
```
