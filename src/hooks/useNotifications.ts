import { useCallback, useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

const NOTIFICATION_KEY = 'president_simulator_notification';
const REMINDER_HOURS = 15;

export const useNotifications = () => {
  const requestPermission = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return false;
    
    try {
      const permission = await LocalNotifications.requestPermissions();
      return permission.display === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, []);

  const scheduleReminder = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      // Cancel any existing notifications first
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
      
      // Schedule notification for 15 hours from now
      const triggerTime = new Date();
      triggerTime.setHours(triggerTime.getHours() + REMINDER_HOURS);
      
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'محاكي الرئيس 🏛️',
            body: 'بلادك تنتظرك! عد لإدارة شؤون الدولة',
            schedule: { at: triggerTime },
            sound: 'default',
            smallIcon: 'ic_stat_icon',
            largeIcon: 'ic_launcher',
            actionTypeId: '',
            extra: null,
          },
        ],
      });
      
      // Save last notification time
      localStorage.setItem(NOTIFICATION_KEY, new Date().toISOString());
      console.log('Reminder scheduled for:', triggerTime);
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  }, []);

  const cancelReminder = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  }, []);

  // Initialize notifications on mount
  useEffect(() => {
    const initNotifications = async () => {
      if (Capacitor.isNativePlatform()) {
        await requestPermission();
        await scheduleReminder();
      }
    };
    
    initNotifications();
  }, [requestPermission, scheduleReminder]);

  return {
    requestPermission,
    scheduleReminder,
    cancelReminder,
  };
};
