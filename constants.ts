import { Step, StepPreset } from './types';

export const DEFAULT_STEP_PRESETS: StepPreset[] = [
  { title: 'Wake up', emoji: '⏰', defaultDuration: 30 },
  { title: 'Shower & get ready', emoji: '🚿', defaultDuration: 60 },
  { title: 'Breakfast', emoji: '🥐', defaultDuration: 30 },
  { title: 'Pack last minute items', emoji: '🧳', defaultDuration: 15 },
  { title: 'Travel to airport/station', emoji: '🚗', defaultDuration: 90 },
  { title: 'Arrive and check-in', emoji: '🛄', defaultDuration: 30 },
  { title: 'Security check', emoji: '🛂', defaultDuration: 45 },
  { title: 'Find gate & relax', emoji: '🧘', defaultDuration: 45 },
  { title: 'Lunch/Dinner', emoji: '🍔', defaultDuration: 45 },
  { title: 'Double-check documents', emoji: '📄', defaultDuration: 10 },
];

export const INITIAL_STEPS_CONFIG: Step[] = [
  { id: '1', title: 'Wake up', emoji: '⏰', duration: 30, isCompleted: false },
  { id: '2', title: 'Shower & get ready', emoji: '🚿', duration: 60, isCompleted: false },
  { id: '3', title: 'Travel to airport/station', emoji: '🚗', duration: 90, isCompleted: false },
  { id: '4', title: 'Arrive and check-in', emoji: '🛄', duration: 30, isCompleted: false },
  { id: '5', title: 'Security check', emoji: '🛂', duration: 45, isCompleted: false },
  { id: '6', title: 'Find gate & relax', emoji: '🧘', duration: 45, isCompleted: false },
];