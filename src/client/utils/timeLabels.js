import { format, subMinutes, differenceInMinutes } from 'date-fns';

// Function to generate time labels based on selected time range
export const generateTimeLabels = (timeRange) => {
  const now = new Date();
  const labels = [];
  const interval = getIntervalForTimeRange(timeRange); // Function to determine interval based on timeRange

  for (let i = 0; i <= timeRange; i += interval) {
    labels.push(format(subMinutes(now, i), 'yyyy-MM-dd HH:mm'));
  }

  return labels.reverse(); // Ensures the labels are in chronological order
};

// Function to determine interval based on selected time range
const getIntervalForTimeRange = (timeRange) => {
  if (timeRange <= 60) return 10; // 10-minute intervals for 1 hour
  if (timeRange <= 360) return 30; // 30-minute intervals for 6 hours
  if (timeRange <= 720) return 60; // 1-hour intervals for 12 hours
  if (timeRange <= 1440) return 120; // 2-hour intervals for 1 day
  if (timeRange <= 2880) return 240; // 4-hour intervals for 2 days
  if (timeRange <= 5760) return 480; // 8-hour intervals for 4 days
  if (timeRange <= 10080) return 720; // 12-hour intervals for 7 days
  if (timeRange <= 20160) return 1440; // 1-day intervals for 14 days
  return 2880; // 2-day intervals for 30 days
};
