<script setup lang="ts">
import { ref, onMounted } from 'vue';
import InsightCard from './InsightCard.vue';

const sectionRef = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.08 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

const insights = [
  {
    number: '01',
    title: 'Every meeting is two interruptions',
    body: 'Starting a meeting requires leaving whatever you were doing. Ending a meeting requires mentally re-entering it. The cost is not just the 30 minutes on the calendar — it is the ramp-down before and the ramp-up after.',
    callout: 'A back-to-back day looks efficient. It rarely is.',
    delay: 100
  },
  {
    number: '02',
    title: 'A 30-minute opening disappears',
    body: 'Deep work needs time to warm up. A gap between meetings often fills with email, Slack, and reorientation before anything meaningful can start. By the time you are focused, the next meeting has begun.',
    callout: 'A 45-minute gap often becomes email cleanup, not deep work.',
    delay: 250
  },
  {
    number: '03',
    title: 'Free time and usable time are different',
    body: 'A day can have hours of open time and still feel exhausting. When that time is scattered across 30- and 45-minute windows, almost none of it converts into meaningful work. Fragmentation does not show up in your calendar view — but you feel it by 4pm.',
    callout: 'The calendar had open space. Almost none of it was long enough to use.',
    delay: 400
  }
];
</script>

<template>
  <section ref="sectionRef" id="insights" class="mx-auto max-w-6xl px-6 pb-16 pt-4 sm:px-8 lg:px-12">

    <!-- Section header -->
    <div
      :class="['mb-10 max-w-xl transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      style="transition-delay: 0ms"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-accent">The mechanism</p>
      <h2 class="mt-4 font-display text-4xl text-ink sm:text-5xl">Why fragmentation costs so much</h2>
      <p class="mt-4 text-lg leading-8 text-ink/70">
        The reveal showed what happened. Here is why it happens — three patterns that turn a manageable calendar into a draining one.
      </p>
    </div>

    <!-- Cards -->
    <div class="grid gap-6 md:grid-cols-3">

      <!-- Card 01: Context Switching -->
      <InsightCard v-bind="insights[0]" :revealed="visible">
        <template #icon>
          <!-- Cycle arrows -->
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </template>
      </InsightCard>

      <!-- Card 02: Broken Focus Blocks -->
      <InsightCard v-bind="insights[1]" :revealed="visible">
        <template #icon>
          <!-- Bar with a break -->
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
            <rect x="2" y="9" width="7" height="6" rx="1.5" />
            <rect x="15" y="9" width="7" height="6" rx="1.5" />
            <line x1="9" y1="12" x2="10.5" y2="12" stroke-dasharray="1.5 1.5" />
            <line x1="13.5" y1="12" x2="15" y2="12" stroke-dasharray="1.5 1.5" />
          </svg>
        </template>
      </InsightCard>

      <!-- Card 03: Fragmentation -->
      <InsightCard v-bind="insights[2]" :revealed="visible">
        <template #icon>
          <!-- Scattered dots -->
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="4"  cy="4"  r="2" />
            <circle cx="12" cy="4"  r="2" />
            <circle cx="20" cy="4"  r="2" />
            <circle cx="4"  cy="12" r="2" opacity="0.3" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="20" cy="12" r="2" opacity="0.3" />
            <circle cx="4"  cy="20" r="2" />
            <circle cx="12" cy="20" r="2" opacity="0.3" />
            <circle cx="20" cy="20" r="2" />
          </svg>
        </template>
      </InsightCard>

    </div>

    <!-- Bridge callout toward simulator -->
    <div
      :class="[
        'mt-8 flex flex-col items-start gap-5 rounded-xl border border-ink/10 bg-white/70 p-7 backdrop-blur-sm transition-all duration-700 sm:flex-row sm:items-center sm:justify-between',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      ]"
      style="transition-delay: 560ms"
    >
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-ink/40">The key question</p>
        <p class="mt-2 font-display text-xl text-ink sm:text-2xl">
          What happens when you redesign the calendar?
        </p>
      </div>
      <div class="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-ink/45 flex-shrink-0">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-white text-base text-accent">↓</span>
        <span>The simulator is next</span>
      </div>
    </div>

  </section>
</template>
