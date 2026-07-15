export type EventType = 'meeting' | 'focus' | 'admin' | 'lunch' | 'break';
export type CalendarPattern = 'clustered' | 'scattered';

export interface WorkerProfile {
  id: string;
  name: string;
  role: string;
  summary: string;
  meetingHours: number;
  meetingCount: number;
  contextSwitches: number;
  longestFocusBlockMinutes: number;
  deepWorkBlocks: number;
  fragmentationScore: number;
  productivityScore: number;
  calendarPattern: CalendarPattern;
  insight: string;
}

export interface WorkdayEvent {
  id: string;
  type: EventType;
  label: string;
  start: string;
  end: string;
  energyImpact: number;
}

export interface WorkdaySchedule {
  profileId: string;
  dayStart: string;
  dayEnd: string;
  events: WorkdayEvent[];
}

export interface SimulationScenario {
  id: string;
  name: string;
  meetingPattern: CalendarPattern;
  meetingCount: number;
  averageMeetingLengthMinutes: number;
  asyncReplacementRate: number;
  protectedFocusBlock: boolean;
  outputs: {
    meetingHours: number;
    contextSwitches: number;
    longestFocusBlockMinutes: number;
    deepWorkBlocks: number;
    fragmentationScore: number;
    productivityScore: number;
    interpretation: string;
  };
}
