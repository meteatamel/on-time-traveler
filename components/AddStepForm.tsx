
import React, { useState } from 'react';
import { DEFAULT_STEP_PRESETS } from '../constants';

interface AddStepFormProps {
  onAddStep: (title: string, duration: number) => void;
}

const AddStepForm: React.FC<AddStepFormProps> = ({ onAddStep }) => {
  const [selectedPreset, setSelectedPreset] = useState(DEFAULT_STEP_PRESETS[0].title);
  const [customTitle, setCustomTitle] = useState('');
  const [duration, setDuration] = useState(DEFAULT_STEP_PRESETS[0].defaultDuration);
  const [isCustom, setIsCustom] = useState(false);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustom(true);
      setCustomTitle('');
      setDuration(30);
    } else {
      setIsCustom(false);
      setSelectedPreset(value);
      const preset = DEFAULT_STEP_PRESETS.find(p => p.title === value);
      if (preset) {
        setDuration(preset.defaultDuration);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = isCustom ? customTitle : selectedPreset;
    if (title && duration > 0) {
      onAddStep(title, duration);
      // Reset form
      setIsCustom(false);
      setSelectedPreset(DEFAULT_STEP_PRESETS[0].title);
      setDuration(DEFAULT_STEP_PRESETS[0].defaultDuration);
      setCustomTitle('');
    }
  };

  return (
    <section className="mt-6 p-4 bg-brand-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-3 text-brand-gray-800">Add a New Step</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-3">
        <div className="flex-grow w-full">
          <label htmlFor="step-preset" className="block text-sm font-medium text-brand-gray-700">Step</label>
          {isCustom ? (
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Enter custom step name"
              className="mt-1 block w-full border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white"
              required
            />
          ) : (
            <select
              id="step-preset"
              value={selectedPreset}
              onChange={handlePresetChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-brand-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md bg-white"
            >
              {DEFAULT_STEP_PRESETS.map(preset => (
                <option key={preset.title} value={preset.title}>
                  {preset.emoji} {preset.title}
                </option>
              ))}
              <option value="custom">＋ Custom...</option>
            </select>
          )}
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="duration" className="block text-sm font-medium text-brand-gray-700">Duration (min)</label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            className="mt-1 block w-full border-brand-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue bg-white"
            required
            min="1"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-brand-blue text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors"
        >
          Add Step
        </button>
      </form>
    </section>
  );
};

export default AddStepForm;
