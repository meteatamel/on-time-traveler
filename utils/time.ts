
export const parseTimeString = (timeString: string): Date => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const formatTime = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return "Invalid Time";
  }
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const subtractMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() - minutes * 60000);
};

export const toGoogleCalendarString = (date: Date): string => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, '');
};
