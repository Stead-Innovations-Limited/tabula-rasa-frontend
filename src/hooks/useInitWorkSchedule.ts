import { useEffect } from 'react';
import { useWorkDaysToggle } from './useAvailabilityDaysToggle';

export const useInitWorkSchedule = () => {
  const { fetchAndSetWorkDays, workDays } = useWorkDaysToggle();

  useEffect(() => {
    if (Object.keys(workDays).length === 0) {
      fetchAndSetWorkDays();
    }
  }, [fetchAndSetWorkDays, workDays]);
};
