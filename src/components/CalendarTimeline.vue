<script setup lang="ts">
import { computed } from 'vue';
import type { WorkdaySchedule, EventType } from '../types/meetingTypes';

const props = defineProps<{
  schedule: WorkdaySchedule;
}>();

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

const dayStartMin = computed(() => timeToMinutes(props.schedule.dayStart));
const totalMin = computed(() => timeToMinutes(props.schedule.dayEnd) - dayStartMin.value);

const positionedEvents = computed(() =>
  props.schedule.events.map(event => ({
    id: event.id,
    label: event.label,
    type: event.type as EventType,
    left: `${((timeToMinutes(event.start) - dayStartMin.value) / totalMin.value) * 100}%`,
    width: `${((timeToMinutes(event.end) - timeToMinutes(event.start)) / totalMin.value) * 100}%`,
    durationMin: timeToMinutes(event.end) - timeToMinutes(event.start)
  }))
);

// Show hour labels at 9am, 11am, 1pm, 3pm, 5pm for clean spacing
const hourMarkers = computed(() =>
  [9, 11, 13, 15, 17].map(h => ({
    pos: ((h * 60 - dayStartMin.value) / totalMin.value) * 100,
    label: h < 12 ? `${h}am` : h === 12 ? '12pm' : `${h - 12}pm`
  }))
);

const colorClass: Record<EventType, string> = {
  meeting: 'bg-ember',
  focus: 'bg-accent',
  admin: 'bg-ink/20',
  lunch: 'bg-mist border-x border-ink/10',
  break: 'bg-mist'
};
</script>

<template>
  <div class="select-none">
    <!-- Timeline bar -->
    <div class="relative h-10 w-full overflow-hidden rounded-xl bg-mist/80">
      <div
        v-for="event in positionedEvents"
        :key="event.id"
        :title="`${event.label} (${event.durationMin} min)`"
        :class="['absolute top-1 bottom-1 rounded-lg', colorClass[event.type]]"
        :style="{ left: event.left, width: event.width }"
      />
    </div>

    <!-- Hour labels -->
    <div class="relative mt-1.5 h-4">
      <span
        v-for="(marker, i) in hourMarkers"
        :key="marker.label"
        :class="[
          'absolute text-[10px] font-medium text-ink/40',
          i === 0 ? '' : i === hourMarkers.length - 1 ? '-translate-x-full' : '-translate-x-1/2'
        ]"
        :style="{ left: `${marker.pos}%` }"
      >
        {{ marker.label }}
      </span>
    </div>

    <!-- Legend -->
    <div class="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
      <span class="flex items-center gap-1.5 text-xs text-ink/55">
        <span class="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-ember" />
        Meeting
      </span>
      <span class="flex items-center gap-1.5 text-xs text-ink/55">
        <span class="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
        Focus
      </span>
      <span class="flex items-center gap-1.5 text-xs text-ink/55">
        <span class="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-ink/20" />
        Admin / Lunch
      </span>
    </div>
  </div>
</template>
