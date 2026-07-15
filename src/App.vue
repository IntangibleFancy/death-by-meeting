<script setup lang="ts">
import { ref, nextTick } from 'vue';
import HeroSection from './components/HeroSection.vue';
import WorkerComparison from './components/WorkerComparison.vue';
import PredictionReveal from './components/PredictionReveal.vue';
import InsightSection from './components/InsightSection.vue';
import meetingData from './data/meeting-fragmentation-data.json';
import type { ProjectData } from './types/meetingTypes';

const storyData = meetingData as ProjectData;
const prediction = ref<string | null>(null);

async function handlePrediction(profileId: string) {
  prediction.value = profileId;
  await nextTick();
  document.getElementById('reveal')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
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

    <WorkerComparison
      :profiles="storyData.workerProfiles"
      :schedules="storyData.workdaySchedules"
      :prediction="prediction"
      @predict="handlePrediction"
    />

    <PredictionReveal
      v-if="prediction !== null"
      :profiles="storyData.workerProfiles"
      :prediction="prediction"
    />

    <InsightSection v-if="prediction !== null" />
  </div>
</template>