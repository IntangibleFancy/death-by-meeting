<script setup lang="ts">
import { ref } from 'vue';
import type { WorkerProfile, WorkdaySchedule } from '../types/meetingTypes';
import CalendarTimeline from './CalendarTimeline.vue';

const props = defineProps<{
  profiles: WorkerProfile[];
  schedules: WorkdaySchedule[];
  prediction: string | null;
}>();

const emit = defineEmits<{
  predict: [profileId: string];
}>();

function choose(profileId: string) {
  if (props.prediction !== null) return;
  emit('predict', profileId);
}

function getSchedule(profileId: string): WorkdaySchedule {
  return props.schedules.find(s => s.profileId === profileId)!;
}

function patternLabel(pattern: string): string {
  return pattern === 'clustered' ? 'Clustered' : 'Scattered';
}

function predictedProfile() {
  return props.profiles.find(p => p.id === props.prediction);
}
</script>

<template>
  <section id="comparison" class="mx-auto max-w-6xl px-6 pb-8 pt-4 sm:px-8 lg:px-12">

    <!-- Section header -->
    <div class="mb-10 max-w-xl">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-accent">The comparison</p>
      <h2 class="mt-4 font-display text-4xl text-ink sm:text-5xl">Two calendars, one workday</h2>
      <p class="mt-4 text-lg leading-8 text-ink/70">
        Meet Alex and Jordan. Same company, same kind of work. Very different days.
      </p>
    </div>

    <!-- Worker cards -->
    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="profile in profiles"
        :key="profile.id"
        :class="[
          'rounded-[2rem] border bg-white p-6 shadow-card transition-all duration-300 sm:p-8',
          prediction === profile.id
            ? 'border-accent ring-2 ring-accent/20'
            : prediction !== null
            ? 'border-ink/10 opacity-50'
            : 'border-ink/10'
        ]"
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-display text-4xl text-ink">{{ profile.name }}</h3>
            <p class="mt-1 text-sm font-medium text-ink/55">{{ profile.role }}</p>
          </div>
          <span
            :class="[
              'rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em]',
              profile.calendarPattern === 'clustered'
                ? 'bg-accent/10 text-accent'
                : 'bg-ember/10 text-ember'
            ]"
          >
            {{ patternLabel(profile.calendarPattern) }}
          </span>
        </div>

        <!-- Stats — no productivity score shown -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <div class="rounded-2xl bg-canvas px-4 py-3.5">
            <p class="font-display text-3xl text-ink">{{ profile.meetingHours }}h</p>
            <p class="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Meeting hours</p>
          </div>
          <div class="rounded-2xl bg-canvas px-4 py-3.5">
            <p class="font-display text-3xl text-ink">{{ profile.meetingCount }}</p>
            <p class="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">Meetings</p>
          </div>
        </div>

        <!-- Timeline -->
        <div class="mt-7">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">Today's schedule</p>
          <CalendarTimeline :schedule="getSchedule(profile.id)" />
        </div>

        <!-- Summary -->
        <p class="mt-6 text-sm leading-7 text-ink/65">{{ profile.summary }}</p>
      </article>
    </div>

    <!-- Prediction prompt -->
    <div class="mt-8 rounded-[2rem] border border-ink/10 bg-white/80 p-8 text-center shadow-card backdrop-blur-sm">

      <!-- Before prediction -->
      <template v-if="prediction === null">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-ink/45">Before the reveal</p>
        <h3 class="mt-4 font-display text-3xl text-ink sm:text-4xl">
          Who had the more productive day?
        </h3>
        <p class="mx-auto mt-3 max-w-md text-base leading-7 text-ink/60">
          Based on what you see — not what you feel — make your prediction. The answer might surprise you.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            v-for="profile in profiles"
            :key="profile.id"
            @click="choose(profile.id)"
            class="w-full rounded-2xl bg-ink px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-accent hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-auto sm:min-w-[14rem] cursor-pointer"
          >
            {{ profile.name }}
          </button>
        </div>
      </template>

      <!-- After prediction -->
      <template v-else>
        <span class="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
          </svg>
          Prediction locked in
        </span>
        <h3 class="mt-5 font-display text-3xl text-ink">
          You chose
          <span class="text-accent">{{ predictedProfile()?.name }}</span>
        </h3>
        <p class="mx-auto mt-3 max-w-md text-base leading-7 text-ink/60">
          The data is ready. Keep reading to see whether your intuition was right — the reveal shows what meeting hours alone will never tell you.
        </p>
        <div class="mt-7 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white text-base text-accent">↓</span>
          <span>The reveal is next</span>
        </div>
      </template>

    </div>
  </section>
</template>
