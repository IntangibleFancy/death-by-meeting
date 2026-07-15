<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  score: number;
  label?: string;
}>();

// Semi-circle: M 16 100 A 84 84 0 0 1 184 100  →  arc length = π × 84
const ARC = Math.PI * 84;

const dashOffset = computed(() =>
  ARC * (1 - Math.max(0, Math.min(100, props.score)) / 100)
);

const arcColor = computed(() => {
  if (props.score >= 80) return '#1f6f78';
  if (props.score >= 65) return '#2a9d8f';
  if (props.score >= 45) return '#e9a846';
  return '#c7653b';
});

const bandLabel = computed(() => {
  if (props.score >= 80) return 'Strong focus day';
  if (props.score >= 65) return 'Manageable';
  if (props.score >= 45) return 'Fragmented';
  return 'High friction';
});
</script>

<template>
  <div class="flex select-none flex-col items-center">
    <svg viewBox="0 0 200 115" class="w-full max-w-[200px]" aria-hidden="true">
      <!-- Background track -->
      <path
        d="M 16 100 A 84 84 0 0 1 184 100"
        fill="none"
        stroke="#ebe2d7"
        stroke-width="16"
        stroke-linecap="round"
      />
      <!-- Score arc -->
      <path
        d="M 16 100 A 84 84 0 0 1 184 100"
        fill="none"
        :stroke="arcColor"
        stroke-width="16"
        stroke-linecap="round"
        :stroke-dasharray="`${ARC} ${ARC}`"
        :stroke-dashoffset="dashOffset"
        style="transition: stroke-dashoffset 0.7s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s ease"
      />
      <!-- Score number -->
      <text
        x="100"
        y="90"
        text-anchor="middle"
        font-size="46"
        font-weight="600"
        fill="#1d1a17"
        font-family="Fraunces, Georgia, serif"
      >{{ score }}</text>
    </svg>

    <p
      class="mt-0.5 text-xs font-bold uppercase tracking-[0.22em] transition-colors duration-300"
      :style="{ color: arcColor }"
    >
      {{ bandLabel }}
    </p>
    <p v-if="label" class="mt-1 text-[11px] font-medium text-ink/40">{{ label }}</p>
  </div>
</template>
