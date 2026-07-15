<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  supportingCopy: string;
  thesis: string;
  callout: string;
}>();
</script>

<template>
  <section class="relative overflow-hidden px-6 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-24 lg:pt-10">
    <div class="mx-auto max-w-6xl">
      <div class="flex items-center justify-between gap-4">
        <span class="story-chip">Interactive data story</span>
      </div>

      <div class="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)] lg:items-end">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-accent">This is not a productivity dashboard</p>
          <h1 class="mt-5 max-w-4xl font-display text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
            {{ title }}
          </h1>
          <p class="mt-6 max-w-3xl text-xl font-semibold leading-8 text-ink/85 sm:text-2xl">
            {{ subtitle }}
          </p>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
            {{ supportingCopy }}
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <span class="story-chip">Two fictional workdays</span>
            <span class="story-chip">One surprising result</span>
            <span class="story-chip">Interactive simulator</span>
          </div>
        </div>

        <aside class="rounded-[2rem] border border-ink/10 bg-white/80 p-6 shadow-card backdrop-blur-sm">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-ember">Core thesis</p>
          <p class="mt-4 font-display text-3xl leading-tight text-ink">
            The least busy calendar can still be the least productive.
          </p>
          <p class="mt-4 text-base leading-7 text-ink/72">
            {{ thesis }}
          </p>

          <div class="mt-6 rounded-[1.5rem] bg-ink px-5 py-4 text-white">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Why this matters</p>
            <p class="mt-3 text-lg leading-7">
              {{ callout }}
            </p>
          </div>
        </aside>
      </div>

      <div class="mt-12 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.24em] text-ink/55">
        <span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/80 text-lg text-accent motion-safe:animate-bounce">↓</span>
        <p>Scroll to compare the calendars</p>
      </div>
    </div>
  </section>
</template>