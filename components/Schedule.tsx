import React, { useRef, useState } from 'react';
import { ScheduledStep } from '../types';
import StepItem from './StepItem';
import { formatTime, parseTimeString } from '../utils/time';

interface ScheduleProps {
  steps: ScheduledStep[];
  removeStep: (id: string) => void;
  updateStepDuration: (id: string, newDuration: number) => void;
  toggleStepCompletion: (id: string) => void;
  reorderSteps: (startIndex: number, endIndex: number) => void;
  isEditing: boolean;
  departureTime: string;
}

const Schedule: React.FC<ScheduleProps> = ({
  steps,
  removeStep,
  updateStepDuration,
  toggleStepCompletion,
  reorderSteps,
  isEditing,
  departureTime,
}) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    dragItem.current = index;
    setDragging(true);
    // This helps in making the drag-and-drop visually smoother
    setTimeout(() => {
      e.currentTarget.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      reorderSteps(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
    setDragging(false);
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  if (steps.length === 0) {
    return (
      <div className="text-center py-8 text-brand-gray-500">
        <p>Your schedule is empty.</p>
        <p>Add a step below to get started!</p>
      </div>
    );
  }

  return (
    <section>
      <ul className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.id}
            draggable={isEditing}
            onDragStart={(e) => isEditing && handleDragStart(e, index)}
            onDragEnter={(e) => isEditing && handleDragEnter(e, index)}
            onDragEnd={(e) => isEditing && handleDragEnd(e)}
            onDragOver={(e) => isEditing && handleDragOver(e)}
            className={`transition-all duration-300 ${isEditing ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
          >
            <StepItem
              step={step}
              onRemove={removeStep}
              onUpdateDuration={updateStepDuration}
              onToggleCompletion={toggleStepCompletion}
              isEditing={isEditing}
            />
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-brand-gray-300 bg-brand-gray-100">
          <div className="flex-grow flex items-center gap-3">
            <span className="text-2xl">🏁</span>
            <div className="flex-grow">
              <p className="font-semibold text-brand-gray-800">Departure</p>
              <p className="text-sm text-brand-gray-500">
                {formatTime(parseTimeString(departureTime))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;