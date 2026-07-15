export interface NarrativeInputs {
  productivityScore: number;
  fragmentationScore: number;
  contextSwitches: number;
  longestFocusBlockMinutes: number;
  deepWorkBlocks: number;
  meetingPattern: 'clustered' | 'scattered';
  protectedFocusBlock: boolean;
}

export function useNarrativeGenerator() {
  function generateNarrative(inputs: NarrativeInputs): string {
    const {
      productivityScore,
      fragmentationScore,
      contextSwitches,
      longestFocusBlockMinutes,
      deepWorkBlocks,
      meetingPattern,
      protectedFocusBlock
    } = inputs;

    // ── Strong days ───────────────────────────────────────────────────────────

    if (productivityScore >= 80 && deepWorkBlocks >= 2) {
      return 'This is a genuinely strong focus day. Two or more deep work blocks means the calendar is designed around the work, not the other way around. Collaboration still exists — it just does not define the shape of the day.';
    }

    if (productivityScore >= 80) {
      return 'This calendar protects real focus time. Meetings still happen, but they are contained in a way that leaves meaningful stretches for the work that matters most.';
    }

    // ── High-friction days ────────────────────────────────────────────────────

    if (productivityScore < 45 && contextSwitches >= 14) {
      return 'This day is exhausting by design. Constant switching between meeting mode and work mode means the brain never fully settles into either. Each context switch costs more recovery time than the gaps between meetings recover.';
    }

    if (productivityScore < 45) {
      return 'This is a high-friction day. The total meeting load might look manageable, but the way meetings land across the calendar makes sustained, meaningful work nearly impossible.';
    }

    // ── Fragmented — the core story ───────────────────────────────────────────

    if (fragmentationScore >= 70 && longestFocusBlockMinutes < 60) {
      return 'The calendar has open space, but very little of it is long enough to support meaningful work. The longest uninterrupted window is under an hour — enough to catch up on email, not enough to create anything.';
    }

    if (fragmentationScore >= 70) {
      return 'The calendar looks lighter than it feels. Meetings are scattered in a way that keeps resurfacing, chopping the day into small windows that disappear before they can be used.';
    }

    // ── Scattered with some protection ───────────────────────────────────────

    if (meetingPattern === 'scattered' && protectedFocusBlock) {
      return 'Protected focus time improves the day, but the scattered meetings around it still create a pattern of frequent re-entry. Clustering those meetings would compound the improvement significantly.';
    }

    if (meetingPattern === 'scattered' && contextSwitches >= 10) {
      return 'Scattered meetings make the day feel like a constant series of interruptions. There is technically free time between them, but most of it is spent mentally re-entering whatever was left behind.';
    }

    // ── Clustered days ────────────────────────────────────────────────────────

    if (meetingPattern === 'clustered' && longestFocusBlockMinutes >= 120) {
      return 'Clustering meetings made the difference. Grouping collaboration into defined windows created real space on the other side — the kind of uninterrupted stretch where meaningful work actually happens.';
    }

    if (meetingPattern === 'clustered' && longestFocusBlockMinutes < 90) {
      return 'Clustering meetings is the right structural move. The focus windows created are still on the short side — a protected block or fewer meetings would extend them into territory where deep work becomes possible.';
    }

    if (meetingPattern === 'clustered') {
      return 'Clustering meetings makes the day more usable. The open time on either side of the meeting block is long enough to support more than just catch-up.';
    }

    // ── Default ───────────────────────────────────────────────────────────────

    return 'This calendar is workable. Whether it feels productive depends on whether the open blocks are long enough to support the work that matters most — and whether the day is designed to protect them.';
  }

  return { generateNarrative };
}
