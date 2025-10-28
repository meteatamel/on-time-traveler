
import React, { useState } from 'react';
import { ScheduledStep } from '../types';
import { formatTime, toGoogleCalendarString } from '../utils/time';

interface ActionButtonsProps {
  scheduledSteps: ScheduledStep[];
  departureTime: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ scheduledSteps, departureTime }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const generateScheduleText = () => {
    let text = `My Travel Schedule for Departure at ${departureTime}:\n\n`;
    scheduledSteps.forEach(step => {
      text += `${formatTime(step.startTime)} - ${formatTime(step.endTime)}: ${step.emoji} ${step.title} (${step.duration} mins)\n`;
    });
    text += `${departureTime}: ✈️ Flight/Train\n`;
    return text;
  };

  const handleCopyToClipboard = () => {
    const textToCopy = generateScheduleText();
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Travel Schedule',
      text: generateScheduleText(),
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Couldn't share schedule:", err);
      }
    } else {
      alert('Web Share API is not supported in your browser. Try copying the schedule instead.');
    }
  };

  const handleExportToCalendar = () => {
    if (scheduledSteps.length === 0) {
      alert("Your schedule is empty. Add some steps first!");
      return;
    }

    const startTime = scheduledSteps[0].startTime;
    const endTime = scheduledSteps[scheduledSteps.length - 1].endTime;
    
    const calendarUrl = new URL('https://www.google.com/calendar/render');
    calendarUrl.searchParams.append('action', 'TEMPLATE');
    calendarUrl.searchParams.append('text', `Travel Plan for Departure at ${departureTime}`);
    calendarUrl.searchParams.append('dates', `${toGoogleCalendarString(startTime)}/${toGoogleCalendarString(endTime)}`);
    calendarUrl.searchParams.append('details', generateScheduleText());
    
    window.open(calendarUrl.toString(), '_blank');
  };

  return (
    <div className="mt-8 pt-6 border-t border-brand-gray-200 flex items-center justify-center gap-4">
      <button 
        onClick={handleExportToCalendar} 
        className="flex items-center justify-center p-3 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        aria-label="Add to Google Calendar"
        title="Add to Google Calendar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
      </button>
      <button 
        onClick={handleShare} 
        className="flex items-center justify-center p-3 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        aria-label="Share"
        title="Share"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
      </button>
      <button 
        onClick={handleCopyToClipboard} 
        className="flex items-center justify-center p-3 border border-brand-gray-300 rounded-full shadow-sm text-brand-gray-700 bg-white hover:bg-brand-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all"
        aria-label={copyStatus === 'copied' ? 'Copied to clipboard' : 'Copy to clipboard'}
        title={copyStatus === 'copied' ? 'Copied!' : 'Copy'}
      >
        {copyStatus === 'copied' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" /></svg>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;
