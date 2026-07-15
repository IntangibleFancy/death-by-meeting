<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { WorkerProfile } from '../types/meetingTypes';

const props = defineProps<{
  profiles: WorkerProfile[];
  prediction: string;
}>();

// Animate metrics in after mount so the scroll-to completes first
const revealed = ref(false);
onMounted(() => setTimeout(() => { revealed.value = true; }, 180));

const winner = computed(() =>
  props.profiles.reduce((a, b) => a.productivityScore > b.productivityScore ? a : b)
);

const loser = computed(() =>
  props.profiles.find(p => p.id !== winner.value.id)!
);

const wasCorrect = computed(() => props.prediction === winner.value.id);

const predictedProfile = computed(() =>
  props.profiles.find(p => p.id === props.prediction)!
);

// Winner card first so the better result leads visually
const orderedProfiles = computed<WorkerProfile[]>(() => [winner.value, loser.value]);

function formatFocusBlock(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes}m`;
}

const scoreBands = [
  { range: '80–100', label: 'Strong focus day', colorClass: 'bg-accent' },
  { range: '65–79', label: 'Manageable but interrupted', colorClass: 'bg-accent/50' },
  { range: '45–64', label: 'Fragmented day', colorClass: 'bg-ember/60' },
  { range: '0–44',  label: 'High-friction day', colorClass: 'bg-ember' },
];
</script>

<template>
  <section id="reveal" class="mx-auto max-w-6xl px-6 pb-16 pt-4 sm:px-8 lg:px-12">

    <!-- Outcome header ─────────────────────────────────────────────────────── -->
    <div
      :class="['mb-10 transition-all duration-700', revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      style="transition-delay: 80ms"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-ember">The reveal</p>

      <h2 class="mt-4 font-display text-4xl text-ink sm:text-5xl">
        <template v-if="wasCorrect">You were right.</template>
        <template v-else>Most people choose {{ predictedProfile.name }}.</template>
      </h2>

      <p class="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        <template v-if="wasCorrect">
          {{ winner.name }} had the more productive day — despite having
          {{ Math.round((winner.meetingHours / loser.meetingHours) * 100 - 100) }}% more meeting hours.
          The calendar pattern made all the difference.
        </template>
        <template v-else>
          {{ predictedProfile.name }} had fewer meeting hours, but a harder day.
          A scattered calendar created more context switches and left no block long enough for deep work.
        </template>
      </p>
    </div>

    <!-- Metric cards ─────────────────────────────────────────────────────────── -->
    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="(profile, i) in orderedProfiles"
        :key="profile.id"
        :class="[
          'rounded-xl border p-6 shadow-card transition-all duration-700 sm:p-8',
          profile.id === winner.id
            ? 'border-accent bg-white ring-2 ring-accent/20'
            : 'border-ink/10 bg-white',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
        :style="{ transitionDelay: `${180 + i * 130}ms` }"
      >
        <!-- Header -->
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="font-display text-4xl text-ink">{{ profile.name }}</h3>
            <p class="mt-1 text-sm font-medium text-ink/55">{{ profile.role }}</p>
          </div>
          <span
            v-if="profile.id === winner.id"
            class="flex-shrink-0 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent"
          >
            More productive
          </span>
        </div>

        <!-- Productivity score -->
        <div class="mt-7">
          <p class="text-xs font-bold uppercase tracking-[0.22em] text-ink/45">Productivity score</p>
          <p class="mt-1 font-display text-6xl text-ink">{{ profile.productivityScore }}</p>
          <div class="mt-3 h-2.5 overflow-hidden rounded-full bg-mist">
            <div
              :class="['h-full rounded-full transition-[width] duration-1000 ease-out',
                profile.id === winner.id ? 'bg-accent' : 'bg-ember']"
              :style="{ width: revealed ? `${profile.productivityScore}%` : '0%', transitionDelay: `${420 + i * 130}ms` }"
            />
          </div>
        </div>

        <!-- Secondary metrics -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <div class="rounded bg-canvas p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Fragmentation</p>
            <p :class="['mt-1 font-display text-2xl', profile.fragmentationScore >= 65 ? 'text-ember' : 'text-accent']">
              {{ profile.fragmentationScore }}
            </p>
            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
              <div
                :class="['h-full rounded-full transition-[width] duration-1000 ease-out',
                  profile.fragmentationScore >= 65 ? 'bg-ember' : 'bg-accent']"
                :style="{ width: revealed ? `${profile.fragmentationScore}%` : '0%', transitionDelay: `${580 + i * 130}ms` }"
              />
            </div>
          </div>

          <div class="rounded bg-canvas p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Context switches</p>
            <p :class="['mt-1 font-display text-2xl', profile.contextSwitches >= 12 ? 'text-ember' : 'text-ink']">
              {{ profile.contextSwitches }}
            </p>
          </div>

          <div class="rounded bg-canvas p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Longest focus</p>
            <p :class="['mt-1 font-display text-2xl', profile.longestFocusBlockMinutes >= 90 ? 'text-accent' : 'text-ember']">
              {{ formatFocusBlock(profile.longestFocusBlockMinutes) }}
            </p>
          </div>

          <div class="rounded bg-canvas p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Deep work blocks</p>
            <p :class="['mt-1 font-display text-2xl', profile.deepWorkBlocks > 0 ? 'text-accent' : 'text-ember']">
              {{ profile.deepWorkBlocks }}
            </p>
          </div>
        </div>

        <!-- Worker insight quote -->
        <p class="mt-6 text-sm italic leading-7 text-ink/60">{{ profile.insight }}</p>
      </article>
    </div>

    <!-- Narrative callout ───────────────────────────────────────────────────── -->
    <div
      :class="[
        'mt-8 rounded-xl bg-ink p-8 shadow-card transition-all duration-700',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      ]"
      style="transition-delay: 560ms"
    >
      <p class="text-xs font-bold uppercase tracking-[0.28em] text-white/45">Why this happened</p>
      <p class="mt-4 font-display text-2xl leading-snug text-white sm:text-3xl">
        Meeting hours tell you how full the calendar is.
        Fragmentation tells you how usable the day is.
      </p>
      <p class="mt-5 text-base leading-8 text-white/75">
        {{ winner.name }}'s meetings were clustered into blocks, which preserved one long stretch of
        uninterrupted focus time. {{ loser.name }}'s meetings were scattered across the entire day,
        generating {{ loser.contextSwitches - winner.contextSwitches }} more context switches and
        leaving no window long enough for deep work.
      </p>
      <p class="mt-4 text-base leading-8 text-white/75">
        A 45-minute gap often becomes email cleanup, not deep work.
        The calendar looked lighter — but it felt heavier.
      </p>
    </div>

    <!-- Score bands key ─────────────────────────────────────────────────────── -->
    <div
      :class="[
        'mt-6 rounded-xl border border-ink/10 bg-white/70 p-6 backdrop-blur-sm transition-all duration-700 sm:p-8',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      ]"
      style="transition-delay: 720ms"
    >
      <p class="text-xs font-bold uppercase tracking-[0.28em] text-ink/45">How to read the score</p>
      <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="band in scoreBands" :key="band.range" class="flex items-center gap-3">
          <span :class="['inline-block h-3 w-3 flex-shrink-0 rounded-full', band.colorClass]" />
          <div>
            <p class="text-xs font-bold text-ink">{{ band.range }}</p>
            <p class="text-xs leading-4 text-ink/55">{{ band.label }}</p>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
