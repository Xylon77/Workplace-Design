import { useState, useEffect } from 'react';

export function useActivity() {
  const [activity, setActivity] = useState(() => {
    const saved = localStorage.getItem('dev_activity');
    return saved ? JSON.parse(saved) : { users: [], repos: [], terms: [] };
  });

  const addActivity = (type, item) => {
    setActivity(prev => {
      // Prevent duplicates and limit to last 5 items
      const updatedList = [item, ...prev[type].filter(i => i.id !== item.id)].slice(0, 5);
      return { ...prev, [type]: updatedList };
    });
  };

  useEffect(() => {
    localStorage.setItem('dev_activity', JSON.stringify(activity));
  }, [activity]);

  return { activity, addActivity };
}