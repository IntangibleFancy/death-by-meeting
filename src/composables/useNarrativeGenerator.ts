export interface NarrativeInputs {
  productivityScore: number;
  fragmentationScore: number;
  contextSwitches: number;
  longestFocusBlockMinutes: number;
  meetingPattern: 'clustered' | 'scattered';
  protectedFocusBlock: boolean;
}

export function useNarrativeGenerator() {
  function generateNarrative(inputs: NarrativeInputs): string {
    if (inputs.productivityScore >= 80) {
      return 'This calendar protects real focus time. Collaboration still happens, but it does not take over the entire day.';
    }

    if (inputs.fragmentationScore >= 70) {
      return 'The calendar has open space, but most of it is too fragmented to use. This is the kind of day that looks manageable and still feels exhausting.';
    }

    if (inputs.longestFocusBlockMinutes < 60) {
      return 'The longest focus window is under an hour, which means most open time is likely spent catching up instead of making meaningful progress.';
    }

    if (inputs.meetingPattern === 'clustered') {
      return 'Clustering meetings makes the day more usable by preserving longer stretches of uninterrupted work time.';
    }

    if (inputs.protectedFocusBlock) {
      return 'Protected focus time helps, but scattered meetings still create re-entry costs throughout the day.';
    }

    return 'This calendar is workable, but its productivity depends on whether the open blocks are long enough to support deep work.';
  }

  return {
    generateNarrative
  };
}
