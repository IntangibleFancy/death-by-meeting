<script setup lang="ts">
defineProps<{
  number: string;
  title: string;
  body: string;
  callout: string;
  revealed: boolean;
  delay: number;
}>();
</script>

<template>
  <article
    :class="[
      'flex flex-col rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card transition-all duration-700 sm:p-8',
      revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    ]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <!-- Number + icon row -->
    <div class="flex items-start justify-between gap-4">
      <span class="font-display text-5xl leading-none text-ink/12 select-none">{{ number }}</span>
      <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <slot name="icon" />
      </div>
    </div>

    <!-- Content -->
    <div class="mt-6 flex flex-1 flex-col">
      <h3 class="font-display text-2xl leading-tight text-ink">{{ title }}</h3>
      <p class="mt-4 flex-1 text-base leading-7 text-ink/65">{{ body }}</p>

      <!-- Callout -->
      <div class="mt-6 rounded-2xl bg-canvas px-5 py-4">
        <p class="text-sm font-semibold italic leading-6 text-ink/80">
          "{{ callout }}"
        </p>
      </div>
    </div>
  </article>
</template>
