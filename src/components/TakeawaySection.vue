<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
    { threshold: 0.06 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

const recommendations = [
  {
    action: 'Cluster meetings',
    headline: 'Group collaboration into defined windows',
    body: 'Two back-to-back hours of meetings creates less cognitive disruption than four separate 30-minute meetings spread across the day. Once meetings are grouped, the time outside them becomes genuinely usable.',
    delay: 120
  },
  {
    action: 'Protect focus blocks',
    headline: 'Block uninterrupted time before someone else does',
    body: 'Calendar time that is not protected gets filled. A recurring 90-minute focus block — treated like a meeting and held consistently — is often the highest-leverage calendar change available.',
    delay: 260
  },
  {
    action: 'Go async on status',
    headline: 'Replace status meetings with written updates',
    body: 'Not every meeting needs to be a meeting. Status syncs, progress updates, and one-way information sharing often work better as a short written update that people can read on their own schedule.',
    delay: 400
  },
  {
    action: 'Reduce context switching',
    headline: 'Batch similar work alongside similar meetings',
    body: 'Context switching applies to work, not just meetings. Grouping similar tasks — reviews, writing, calls — preserves the mental momentum that constant switching destroys.',
    delay: 540
  }
];
</script>

<template>
  <section ref="sectionRef" id="takeaway" class="mx-auto max-w-6xl px-6 pb-24 pt-4 sm:px-8 lg:px-12">

    <!-- Section header ─────────────────────────────────────────────────────── -->
    <div
      :class="['mb-12 max-w-3xl transition-all duration-700', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6']"
      style="transition-delay: 0ms"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-accent">The takeaway</p>
      <h2 class="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
        The goal is not fewer meetings.
        <span class="text-accent">The goal is intentionally designed focus.</span>
      </h2>
      <p class="mt-5 text-lg leading-8 text-ink/70">
        You have seen the data, made the prediction, and run the experiment.
        Here is what you can actually do with it — starting tomorrow.
      </p>
    </div>

    <!-- Recommendations grid ──────────────────────────────────────────────── -->
    <div class="grid gap-5 sm:grid-cols-2">
      <article
        v-for="(rec, i) in recommendations"
        :key="rec.action"
        :class="[
          'rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card transition-all duration-700 sm:p-8',
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        ]"
        :style="{ transitionDelay: `${rec.delay}ms` }"
      >
        <div class="flex items-start gap-4">
          <!-- Step number -->
          <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-accent">{{ rec.action }}</p>
            <h3 class="mt-2 font-display text-xl leading-snug text-ink">{{ rec.headline }}</h3>
            <p class="mt-3 text-sm leading-7 text-ink/65">{{ rec.body }}</p>
          </div>
        </div>
      </article>
    </div>

    <!-- Closing conclusion card ────────────────────────────────────────────── -->
    <div
      :class="[
        'mt-8 overflow-hidden rounded-[2rem] bg-ink shadow-card transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      ]"
      style="transition-delay: 680ms"
    >
      <div class="p-8 sm:p-12">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-white/40">The core insight</p>
        <p class="mt-5 font-display text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
          Meeting hours tell you how full the calendar is.
          Fragmentation tells you how usable the day is.
        </p>
        <p class="mt-6 max-w-2xl text-base leading-8 text-white/70">
          The insight is not to eliminate meetings. It is to stop letting them decide the shape of your day.
          Cluster them. Protect time around them. Replace the ones that should have been emails.
        </p>
        <p class="mt-5 font-display text-xl text-white/90 sm:text-2xl">
          Design the calendar for focus. Everything else follows.
        </p>
      </div>

      <!-- Bottom strip -->
      <div class="border-t border-white/10 px-8 py-5 sm:px-12">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">The Productivity Paradox</p>
          <p class="text-xs font-medium text-white/30">P302 — Interactive Data Story</p>
        </div>
      </div>
    </div>

  </section>
</template>
