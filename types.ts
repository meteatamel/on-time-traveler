
export interface Step {
  id: string;
  title: string;
  emoji: string;
  duration: number; // in minutes
  isCompleted: boolean;
  description?: string;
}

export interface ScheduledStep extends Step {
  startTime: Date;
  endTime: Date;
}

export interface StepPreset {
  title: string;
  emoji: string;
  defaultDuration: number;
}