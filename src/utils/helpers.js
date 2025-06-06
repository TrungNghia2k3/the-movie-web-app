export const convertMinutesToHourMinute = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) return `${hours}hr ${mins}min`;
  if (hours > 0) return `${hours}hr`;
  return `${mins}min`;
};
