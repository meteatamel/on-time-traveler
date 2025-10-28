import React from 'react';
import { ScheduledStep } from '../types';
import { formatTime } from '../utils/time';

interface StepItemProps {
  step: ScheduledStep;
  onRemove: (id: string) => void;
  onUpdateDuration: (id: string, duration: number) => void;
  onToggleCompletion: (id: string) => void;
  isEditing: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ step, onRemove, onUpdateDuration, onToggleCompletion, isEditing }) => {
  const isLocked = step.id === 'airport-buffer';

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${step.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-brand-gray-200'}`}>
      <div className="relative h-6 w-6 flex-shrink-0">
        <input
          type="checkbox"
          checked={step.isCompleted}
          onChange={() => onToggleCompletion(step.id)}
          className="appearance-none h-6 w-6 rounded border border-gray-300 bg-white checked:bg-brand-blue checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue cursor-pointer"
        />
        {step.isCompleted && (
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="flex-grow flex items-center gap-3">
        <span className="text-2xl">{step.emoji}</span>
        <div className={`flex-grow ${step.isCompleted ? 'line-through text-brand-gray-400' : ''}`}>
          <p className="font-semibold text-brand-gray-800">{step.title}</p>
          {step.description && <p className="text-xs text-brand-gray-500 italic">{step.description}</p>}
          <p className="text-sm text-brand-gray-500">
            {formatTime(step.startTime)} - {formatTime(step.endTime)}
          </p>
        </div>
      </div>
      {isEditing && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={step.duration}
            onChange={(e) => onUpdateDuration(step.id, parseInt(e.target.value) || 0)}
            className="w-16 text-center border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white"
            min="0"
            aria-label="Duration in minutes"
          />
          <span className="text-sm text-brand-gray-500">min</span>
        </div>
      )}
      {isEditing && !isLocked && (
        <button
          onClick={() => onRemove(step.id)}
          className="text-brand-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
          aria-label="Remove step"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default StepItem;