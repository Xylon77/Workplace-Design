import { useReducer, useContext } from 'react';
import { NotificationContext } from './createNotificationContext';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [
        { id: Date.now(), isRead: false, ...action.payload },
        ...state
      ];
    case 'MARK_READ':
      return state.map(n => n.id === action.id ? { ...n, isRead: true } : n);
    case 'CLEAR_ALL':
      return [];
    default:
      return state;
  }
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export function NotificationProvider({ children }) {
  const [notifications, dispatch] = useReducer(notificationReducer, []);

  const addNotification = (title, message) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { title, message } });
  };

  return (
    <NotificationContext.Provider value={{ notifications, dispatch, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

