import { useState, useCallback, useEffect } from 'react';

const SETTINGS_KEY = 'president_simulator_settings';

export interface GameSettings {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

const defaultSettings: GameSettings = {
  soundEnabled: true,
  notificationsEnabled: true,
};

const loadSettings = (): GameSettings => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
    return defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const useSettings = () => {
  const [settings, setSettings] = useState<GameSettings>(loadSettings);

  // Save settings whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  const updateSoundEnabled = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, soundEnabled: enabled }));
  }, []);

  const updateNotificationsEnabled = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, notificationsEnabled: enabled }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return {
    settings,
    updateSoundEnabled,
    updateNotificationsEnabled,
    resetSettings,
  };
};
