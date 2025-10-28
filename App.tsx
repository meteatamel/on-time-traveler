import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Step, ScheduledStep } from './types';
import { INITIAL_STEPS_CONFIG, DEFAULT_STEP_PRESETS } from './constants';
import { parseTimeString, subtractMinutes, formatTime } from './utils/time';
import Schedule from './components/Schedule';
import AddStepForm from './components/AddStepForm';
import ActionButtons from './components/ActionButtons';

const App: React.FC = () => {
  const [steps, setSteps] = useLocalStorage<Step[]>('on-time-traveler-steps', INITIAL_STEPS_CONFIG);
  const [departureTime, setDepartureTime] = useState('12:00');
  const [scheduledSteps, setScheduledSteps] = useState<ScheduledStep[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const departureDate = parseTimeString(departureTime);
    let currentTime = departureDate;

    const newScheduledSteps = [...steps].reverse().map(step => {
      const endTime = new Date(currentTime);
      const startTime = subtractMinutes(currentTime, step.duration);
      currentTime = startTime;
      return { ...step, startTime, endTime };
    }).reverse();

    setScheduledSteps(newScheduledSteps);
  }, [steps, departureTime]);

  const addStep = useCallback((title: string, duration: number) => {
    const preset = DEFAULT_STEP_PRESETS.find(p => p.title === title);
    const newStep: Step = {
      id: `${Date.now()}`,
      title,
      duration,
      emoji: preset?.emoji || '📋',
      isCompleted: false,
    };
    setSteps(prevSteps => [...prevSteps, newStep]);
  }, [setSteps]);

  const removeStep = useCallback((id: string) => {
    setSteps(prevSteps => prevSteps.filter(step => step.id !== id));
  }, [setSteps]);

  const updateStepDuration = useCallback((id: string, newDuration: number) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === id ? { ...step, duration: Math.max(0, newDuration) } : step
      )
    );
  }, [setSteps]);

  const toggleStepCompletion = useCallback((id: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === id ? { ...step, isCompleted: !step.isCompleted } : step
      )
    );
  }, [setSteps]);

  const reorderSteps = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(steps);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setSteps(result);
  }, [steps, setSteps]);

  if (!isClient) {
    return null; // Avoid rendering on the server or before hydration
  }

  return (
    <div className="min-h-screen font-sans text-brand-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-gray-900">On-Time Traveler</h1>
          <p className="text-lg text-brand-gray-600 mt-2 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Be on time stress free
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-brand-gray-100 rounded-lg">
            <label htmlFor="departureTime" className="text-lg font-medium text-brand-gray-700">
              <span role="img" aria-label="flight, train, bus">✈️ 🚆 🚌</span> What time is your flight/train/bus?
            </label>
            <input
              id="departureTime"
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="px-4 py-2 border border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue text-xl bg-white"
            />
          </div>
          
          <section>
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-2xl font-semibold text-brand-gray-800">Your Schedule</h2>
               <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue ${isEditing ? 'bg-brand-blue text-white hover:bg-blue-700' : 'border border-brand-blue text-brand-blue hover:bg-blue-50'}`}
               >
                 {isEditing ? 'Done' : 'Customize'}
               </button>
            </div>
            <Schedule
              steps={scheduledSteps}
              removeStep={removeStep}
              updateStepDuration={updateStepDuration}
              toggleStepCompletion={toggleStepCompletion}
              reorderSteps={reorderSteps}
              isEditing={isEditing}
              departureTime={departureTime}
            />
          </section>
          
          {isEditing && <AddStepForm onAddStep={addStep} />}

          <ActionButtons scheduledSteps={scheduledSteps} departureTime={departureTime} />
        </main>
        
        <footer className="text-center mt-8 text-brand-gray-500">
          <p>Made with ❤️ to make travel less stressful.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;