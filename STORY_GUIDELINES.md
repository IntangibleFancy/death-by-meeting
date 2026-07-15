# STORY_GUIDELINES.md
# Story Guidelines: The Productivity Paradox

## Most Important Principle

This project is not a dashboard.

This project is a story.

If a design decision makes the experience feel more analytical but less narrative, choose the narrative option.

---

## The Audience

The audience is knowledge workers.

Examples:

- Consultants
- Product managers
- Designers
- Engineers
- Team leads
- Executives

The audience is not looking for detailed analytics.

The audience is looking for understanding.

---

## The Core Insight

The main idea is:

> A calendar can look less busy and still be less productive.

The supporting idea is:

> Meeting hours tell you how full the calendar is. Fragmentation tells you how usable the day is.

Everything in the app should support this insight.

---

## The User Journey

The story should follow a simple progression.

### Step 1: Recognition

The user recognizes the problem.

> I spend a lot of time in meetings.

### Step 2: Prediction

The user makes an assumption.

> Surely the person with fewer meetings is more productive.

### Step 3: Surprise

The user learns something unexpected.

> The person with fewer meetings did worse.

### Step 4: Understanding

The user understands why.

> Fragmentation destroyed their focus.

### Step 5: Experimentation

The user tests the concept.

> What happens if I reorganize the calendar?

### Step 6: Action

The user leaves with a simple lesson.

> I should protect focus blocks, not just reduce meeting hours.

---

## Story Over Data

Whenever there is tension between storytelling and data complexity, choose storytelling.

### Good

> Jordan's calendar looks lighter but feels heavier.

### Bad

> Jordan experienced a 42% increase in switching overhead.

### Good

> A 45-minute gap often becomes email cleanup, not deep work.

### Bad

> Sub-hour intervals have low productive conversion probability.

---

## Progressive Disclosure

Do not show everything immediately.

Reveal information gradually.

Recommended order:

1. Show calendars.
2. Ask for prediction.
3. Reveal outcome.
4. Explain outcome.
5. Let users experiment.
6. End with a practical recommendation.

The user should never feel overwhelmed.

---

## Every Section Must Answer One Question

Before building a section, ask:

> What is the user supposed to realize here?

Examples:

### Hero

Realization:

> This is about productivity, not just meetings.

### Comparison

Realization:

> Alex appears busier.

### Prediction

Realization:

> I have an assumption about which calendar is better.

### Reveal

Realization:

> My assumption may be wrong.

### Explanation

Realization:

> Fragmentation makes time less usable.

### Simulator

Realization:

> Small calendar-design changes can create major differences.

### Takeaway

Realization:

> I can apply this tomorrow.

---

## Plain Language Rules

Use language that sounds human.

### Preferred language

- Focus time
- Deep work
- Meeting overload
- Context switching
- Interrupted workflow
- Scattered calendar
- Usable time
- Protected focus

### Avoid

- Operational efficiency
- Synchronous collaboration optimization
- Productivity optimization framework
- Cognitive throughput
- Temporal fragmentation metrics
- Workforce utilization analysis

---

## Chart and Visualization Rules

Every visualization must answer a question.

If a chart is decorative, remove it.

If a chart requires explanation, simplify it.

If the chart does not advance the story, remove it.

Maximum number of charts visible at one time:

> 2

### Prefer

- Calendar visualizations
- Before/after comparisons
- Simple score indicators
- Minimal bar comparisons
- Short annotations

### Avoid

- Complex dashboards
- Multi-series line charts
- Dense BI styling
- Too many metrics at once
- Visualizations that require a legend to understand

---

## Interaction Rules

Interactions should reinforce learning.

### Good interactions

- Prediction selection
- Reveal moment
- Toggle between clustered and scattered meetings
- Before/after comparison
- Scenario simulation

### Bad interactions

- Unnecessary filtering
- Complex configuration panels
- Hidden menus
- Overly technical controls
- Interactions that do not change the story

---

## Emotional Design

The ideal emotional progression:

Curiosity  
↓  
Confidence  
↓  
Surprise  
↓  
Understanding  
↓  
Action

The reveal should create a moment where the user thinks:

> Oh. I did not expect that.

---

## AI Narrator Behavior

If the application includes generated or dynamic narrative, always explain significance.

Do not simply restate numbers.

### Good

> Even though meeting time stayed constant, clustering meetings created a two-hour focus block.

### Bad

> Meeting count decreased from eight to six.

### Good

> The calendar has free time, but most of it is too short to be useful.

### Bad

> Longest focus block is 45 minutes.

---

## Copy Principles

Use short sentences.

Use memorable phrases.

Avoid corporate jargon.

Make every piece of text help the user move through the story.

Preferred phrases:

- The day looked lighter, but felt heavier.
- The problem was not the meetings. It was the gaps between them.
- Focus time works best when it is protected, not sprinkled between calls.
- The goal is not zero meetings. The goal is intentional meetings.
- Fewer meetings do not automatically mean better work.

---

## Final Test

Before shipping, ask:

> Can someone explain the core insight after viewing the experience for less than one minute?

If not, the story is not clear enough.

Simplify further.
