<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductivityScoring } from '../composables/useProductivityScoring';
import type { SimulatorInputs } from '../composables/useProductivityScoring';
import { useNarrativeGenerator } from '../composables/useNarrativeGenerator';
import ScoreMeter from './ScoreMeter.vue';

const { calculateMeetingImpact } = useProductivityScoring();

// Default to scattered/high-fragmentation so improvement is immediately visible
const meetingPattern = ref<'clustered' | 'scattered'>('scattered');
const meetingCount = ref(8);
const avgMeetingLength = ref(30);
const asyncReplacementRate = ref(0);
const protectedFocusBlock = ref(false);

const inputs = computed<SimulatorInputs>(() => ({
  meetingPattern: meetingPattern.value,
  meetingCount: meetingCount.value,
  averageMeetingLengthMinutes: avgMeetingLength.value,
  asyncReplacementRate: asyncReplacementRate.value,
  protectedFocusBlock: protectedFocusBlock.value,
}));

const outputs = computed(() => calculateMeetingImpact(inputs.value));

const { generateNarrative } = useNarrativeGenerator();

const narrative = computed(() => generateNarrative({
  productivityScore: outputs.value.productivityScore,
  fragmentationScore: outputs.value.fragmentationScore,
  contextSwitches: outputs.value.contextSwitches,
  longestFocusBlockMinutes: outputs.value.longestFocusBlockMinutes,
  deepWorkBlocks: outputs.value.deepWorkBlocks,
  meetingPattern: meetingPattern.value,
  protectedFocusBlock: protectedFocusBlock.value,
}));

function formatFocusBlock(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes}m`;
}
</script>

<template>
  <section id="simulator" class="mx-auto max-w-6xl px-6 pb-20 pt-4 sm:px-8 lg:px-12">

    <!-- Header -->
    <div class="mb-10 max-w-xl">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-accent">The simulator</p>
      <h2 class="mt-4 font-display text-4xl text-ink sm:text-5xl">Redesign the calendar</h2>
      <p class="mt-4 text-lg leading-8 text-ink/70">
        Adjust the variables below and watch how calendar design affects productivity in real time.
        The scoring uses the same model from the reveal.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_3fr]">

      <!-- Controls ──────────────────────────────────────────────────────────── -->
      <div class="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card sm:p-8">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-ink/40">Calendar variables</p>

        <!-- 1. Meeting pattern -->
        <fieldset class="mt-7 border-0 p-0">
          <legend class="text-sm font-semibold text-ink">Meeting pattern</legend>
          <p class="mt-1 text-xs leading-5 text-ink/50">How are meetings distributed across the day?</p>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="meetingPattern = 'scattered'"
              :class="[
                'rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ember',
                meetingPattern === 'scattered'
                  ? 'bg-ember text-white shadow-sm'
                  : 'bg-canvas text-ink/65 hover:bg-mist'
              ]"
            >
              Scattered
            </button>
            <button
              type="button"
              @click="meetingPattern = 'clustered'"
              :class="[
                'rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent',
                meetingPattern === 'clustered'
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-canvas text-ink/65 hover:bg-mist'
              ]"
            >
              Clustered
            </button>
          </div>
        </fieldset>

        <!-- 2. Meeting count -->
        <div class="mt-7">
          <div class="flex items-baseline justify-between gap-2">
            <label for="meeting-count" class="text-sm font-semibold text-ink">Meetings per day</label>
            <span class="font-display text-2xl text-ink">{{ meetingCount }}</span>
          </div>
          <input
            id="meeting-count"
            type="range"
            v-model.number="meetingCount"
            min="2"
            max="12"
            step="1"
            class="mt-3 w-full cursor-pointer accent-accent"
          />
          <div class="mt-1 flex justify-between text-[10px] font-medium text-ink/35">
            <span>2</span><span>12</span>
          </div>
        </div>

        <!-- 3. Average meeting length -->
        <div class="mt-7">
          <div class="flex items-baseline justify-between gap-2">
            <label for="avg-length" class="text-sm font-semibold text-ink">Avg meeting length</label>
            <span class="font-display text-2xl text-ink">{{ avgMeetingLength }}m</span>
          </div>
          <input
            id="avg-length"
            type="range"
            v-model.number="avgMeetingLength"
            min="15"
            max="90"
            step="15"
            class="mt-3 w-full cursor-pointer accent-accent"
          />
          <div class="mt-1 flex justify-between text-[10px] font-medium text-ink/35">
            <span>15m</span><span>90m</span>
          </div>
        </div>

        <!-- 4. Async replacement rate -->
        <div class="mt-7">
          <div class="flex items-baseline justify-between gap-2">
            <label for="async-rate" class="text-sm font-semibold text-ink">Async replacement</label>
            <span class="font-display text-2xl text-ink">{{ asyncReplacementRate }}%</span>
          </div>
          <p class="mt-1 text-xs leading-5 text-ink/50">Replace status meetings with written updates</p>
          <input
            id="async-rate"
            type="range"
            v-model.number="asyncReplacementRate"
            min="0"
            max="50"
            step="5"
            class="mt-3 w-full cursor-pointer accent-accent"
          />
          <div class="mt-1 flex justify-between text-[10px] font-medium text-ink/35">
            <span>0%</span><span>50%</span>
          </div>
        </div>

        <!-- 5. Protected focus block toggle -->
        <div class="mt-7 flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold text-ink">Protected focus block</p>
            <p class="mt-1 text-xs leading-5 text-ink/50">Block dedicated uninterrupted time on the calendar</p>
          </div>
          <button
            type="button"
            @click="protectedFocusBlock = !protectedFocusBlock"
            :class="[
              'relative mt-0.5 flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              protectedFocusBlock ? 'bg-accent' : 'bg-ink/20'
            ]"
            :aria-pressed="protectedFocusBlock"
            aria-label="Toggle protected focus block"
          >
            <span
              :class="[
                'absolute h-5 w-5 rounded-full bg-white shadow transition-transform duration-300',
                protectedFocusBlock ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>
      </div>

      <!-- Outputs ───────────────────────────────────────────────────────────── -->
      <div class="flex flex-col gap-6">

        <!-- Score meter + metrics -->
        <div class="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-card sm:p-8">
          <div class="grid gap-6 sm:grid-cols-[auto_1fr]">

            <!-- Score meter -->
            <ScoreMeter :score="outputs.productivityScore" label="Productivity score" />

            <!-- Metric tiles -->
            <div class="grid grid-cols-2 gap-3 self-center">
              <div class="rounded-2xl bg-canvas px-4 py-3.5">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Fragmentation</p>
                <p :class="['mt-1 font-display text-2xl transition-colors duration-300', outputs.fragmentationScore >= 65 ? 'text-ember' : 'text-accent']">
                  {{ outputs.fragmentationScore }}
                </p>
              </div>

              <div class="rounded-2xl bg-canvas px-4 py-3.5">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Context switches</p>
                <p :class="['mt-1 font-display text-2xl transition-colors duration-300', outputs.contextSwitches >= 12 ? 'text-ember' : 'text-ink']">
                  {{ outputs.contextSwitches }}
                </p>
              </div>

              <div class="rounded-2xl bg-canvas px-4 py-3.5">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Longest focus</p>
                <p :class="['mt-1 font-display text-2xl transition-colors duration-300', outputs.longestFocusBlockMinutes >= 90 ? 'text-accent' : 'text-ember']">
                  {{ formatFocusBlock(outputs.longestFocusBlockMinutes) }}
                </p>
              </div>

              <div class="rounded-2xl bg-canvas px-4 py-3.5">
                <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Deep work blocks</p>
                <p :class="['mt-1 font-display text-2xl transition-colors duration-300', outputs.deepWorkBlocks > 0 ? 'text-accent' : 'text-ember']">
                  {{ outputs.deepWorkBlocks }}
                </p>
              </div>
            </div>
          </div>

          <!-- Meeting hours row -->
          <div class="mt-5 rounded-2xl bg-canvas px-5 py-3.5">
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Effective meeting hours</p>
            <p class="mt-1 font-display text-2xl text-ink">{{ outputs.meetingHours }}h</p>
          </div>
        </div>

        <!-- Dynamic narrative -->
        <div class="rounded-[2rem] bg-ink p-7 shadow-card">
          <p class="text-xs font-bold uppercase tracking-[0.28em] text-white/45">Reading this day</p>
          <p class="mt-4 text-base leading-8 text-white/85">
            {{ narrative }}
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
