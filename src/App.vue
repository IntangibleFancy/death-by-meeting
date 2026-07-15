<script setup lang="ts">
import HeroSection from './components/HeroSection.vue';
import meetingData from './data/meeting-fragmentation-data.json';
import type { ProjectData } from './types/meetingTypes';

const storyData = meetingData as ProjectData;
</script>

<template>
  <div class="min-h-screen bg-canvas bg-hero-glow">
    <HeroSection
      :title="storyData.project.title"
      :subtitle="storyData.project.subtitle"
      :supporting-copy="'People often assume fewer meeting hours automatically create more productive days. The data tells a different story.'"
      :thesis="storyData.project.thesis"
      :callout="storyData.storyCallouts[0]"
      :worker-count="storyData.workerProfiles.length"
      :scenario-count="storyData.simulationScenarios.length"
    />

    <main class="mx-auto max-w-6xl px-6 pb-16 sm:px-8 lg:px-12">
      <section
        id="story-setup"
        class="grid gap-4 rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-card backdrop-blur md:grid-cols-3"
      >
        <article class="rounded-[1.5rem] bg-canvas p-5">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Local story data</p>
          <h2 class="mt-3 font-display text-2xl text-ink">Two calendars, one surprising result</h2>
          <p class="mt-3 text-sm leading-6 text-ink/70">
            The app is already reading the local JSON source. The next story beat compares two fictional workers without turning the experience into a dashboard.
          </p>
        </article>

        <article class="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/5">
          <p class="text-4xl font-display text-ink">{{ storyData.workerProfiles.length }}</p>
          <p class="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-ink/55">Fictional workdays loaded</p>
          <p class="mt-3 text-sm leading-6 text-ink/70">
            Alex and Jordan anchor the narrative by showing how a lighter calendar can still create a harder day.
          </p>
        </article>

        <article class="rounded-[1.5rem] bg-white p-5 ring-1 ring-ink/5">
          <p class="text-4xl font-display text-ink">{{ storyData.simulationScenarios.length }}</p>
          <p class="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-ink/55">Scenario examples ready</p>
          <p class="mt-3 text-sm leading-6 text-ink/70">
            The data model already supports later phases, but this build stops at the thesis and introduction layer requested for Phase 2.
          </p>
        </article>
      </section>
    </main>
  </div>
</template>