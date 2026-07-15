export type MeetingPattern = "clustered" | "scattered";

export interface SimulatorInputs {
  meetingPattern: MeetingPattern;
  meetingCount: number;
  averageMeetingLengthMinutes: number;
  asyncReplacementRate: number;
  protectedFocusBlock: boolean;
}

export interface SimulatorOutputs {
  meetingHours: number;
  contextSwitches: number;
  longestFocusBlockMinutes: number;
  deepWorkBlocks: number;
  fragmentationScore: number;
  productivityScore: number;
  interpretation: string;
}

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));

export function calculateMeetingImpact(inputs: SimulatorInputs): SimulatorOutputs {
  const effectiveMeetingCount = Math.max(
    1,
    Math.round(inputs.meetingCount * (1 - inputs.asyncReplacementRate / 100))
  );

  const meetingHours = Number(((effectiveMeetingCount * inputs.averageMeetingLengthMinutes) / 60).toFixed(1));

  const contextSwitches = inputs.meetingPattern === "scattered"
    ? effectiveMeetingCount * 2 - 1
    : effectiveMeetingCount + 1;

  const longestFocusBlockMinutes = inputs.meetingPattern === "clustered"
    ? inputs.protectedFocusBlock ? 180 : 140
    : inputs.protectedFocusBlock ? 90 : 45;

  const deepWorkBlocks = longestFocusBlockMinutes >= 120
    ? inputs.protectedFocusBlock ? 2 : 1
    : 0;

  const fragmentationScore = clamp(
    inputs.meetingPattern === "scattered"
      ? 35 + contextSwitches * 3 + meetingHours * 4
      : 20 + contextSwitches * 2 + meetingHours * 3
  );

  const productivityScore = Math.round(clamp(
    100
    - meetingHours * 5
    - contextSwitches * 4
    - fragmentationScore * 0.35
    + deepWorkBlocks * 8
    + (inputs.protectedFocusBlock ? 10 : 0)
  ));

  const interpretation = getInterpretation({
    meetingPattern: inputs.meetingPattern,
    productivityScore,
    protectedFocusBlock: inputs.protectedFocusBlock,
    asyncReplacementRate: inputs.asyncReplacementRate
  });

  return {
    meetingHours,
    contextSwitches,
    longestFocusBlockMinutes,
    deepWorkBlocks,
    fragmentationScore: Math.round(fragmentationScore),
    productivityScore,
    interpretation
  };
}

function getInterpretation(args: {
  meetingPattern: MeetingPattern;
  productivityScore: number;
  protectedFocusBlock: boolean;
  asyncReplacementRate: number;
}) {
  if (args.productivityScore >= 80) {
    return "This is a strong focus day. Meetings still exist, but the calendar protects enough uninterrupted time for meaningful work.";
  }

  if (args.meetingPattern === "scattered" && !args.protectedFocusBlock) {
    return "The day is fragmented. Even if total meeting time looks reasonable, the open spaces are too short to support deep work.";
  }

  if (args.meetingPattern === "clustered" && args.asyncReplacementRate > 0) {
    return "Clustering meetings and replacing some status updates with async communication creates more usable focus time.";
  }

  if (args.protectedFocusBlock) {
    return "Protected focus time improves the day, but remaining context switches still create some drag.";
  }

  return "This day is manageable, but productivity depends on whether the open blocks are long enough to use.";
}
