import { Step, StepPreset } from './types';

export const DEFAULT_STEP_PRESETS: StepPreset[] = [
  { title: 'Wake up', emoji: '⏰', defaultDuration: 30 },
  { title: 'Shower & get ready', emoji: '🚿', defaultDuration: 60 },
  { title: 'Breakfast', emoji: '🥐', defaultDuration: 30 },
  { title: 'Pack last minute items', emoji: '🧳', defaultDuration: 15 },
  { title: 'Travel to airport/station', emoji: '🚗', defaultDuration: 90 },
  { title: 'Lunch/Dinner', emoji: '🍔', defaultDuration: 45 },
  { title: 'Double-check documents', emoji: '📄', defaultDuration: 10 },
];

export const INITIAL_STEPS_CONFIG: Step[] = [
  { id: '1', title: 'Wake up', emoji: '⏰', duration: 30, isCompleted: false },
  { id: '2', title: 'Shower & get ready', emoji: '🚿', duration: 60, isCompleted: false },
  { id: '3', title: 'Travel to airport/station', emoji: '🚗', duration: 90, isCompleted: false },
  { 
    id: 'airport-buffer', 
    title: 'Time at Airport/Station', 
    description: 'Buffer for check-in, security, and getting to the gate.',
    emoji: '🛄', 
    duration: 120, 
    isCompleted: false 
  },
];