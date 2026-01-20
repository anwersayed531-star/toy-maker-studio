import { motion } from 'framer-motion';
import { Settings, Volume2, VolumeX, Bell, BellOff, Trash2, Globe, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/hooks/useLanguage';
import { useSettings } from '@/hooks/useSettings';
import { useGameSave } from '@/hooks/useGameSave';
import { useState } from 'react';
import { LanguageCode } from '@/i18n/translations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SettingsScreenProps {
  onClose: () => void;
  onSoundToggle: (enabled: boolean) => void;
  onNotificationToggle: (enabled: boolean) => void;
}

export const SettingsScreen = ({ onClose, onSoundToggle, onNotificationToggle }: SettingsScreenProps) => {
  const { t, currentLanguage, changeLanguage, languageNames, availableLanguages, isRTL } = useLanguage();
  const { settings, updateSoundEnabled, updateNotificationsEnabled } = useSettings();
  const { deleteSave, resetStats } = useGameSave();
  const [showLanguages, setShowLanguages] = useState(false);
  const [dataDeleted, setDataDeleted] = useState(false);

  const handleSoundToggle = (enabled: boolean) => {
    updateSoundEnabled(enabled);
    onSoundToggle(enabled);
  };

  const handleNotificationToggle = (enabled: boolean) => {
    updateNotificationsEnabled(enabled);
    onNotificationToggle(enabled);
  };

  const handleDeleteData = () => {
    deleteSave();
    resetStats();
    localStorage.removeItem('president_simulator_autosave');
    setDataDeleted(true);
    setTimeout(() => setDataDeleted(false), 2000);
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    changeLanguage(lang);
    setShowLanguages(false);
  };

  if (showLanguages) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-background flex flex-col"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => setShowLanguages(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold text-primary">{t('selectLanguage')}</h2>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4">
            {availableLanguages.map((lang) => (
              <Button
                key={lang}
                variant={currentLanguage === lang ? 'default' : 'outline'}
                className="justify-start gap-2 h-12"
                onClick={() => handleLanguageChange(lang)}
              >
                {currentLanguage === lang && <Check className="h-4 w-4" />}
                <span>{languageNames[lang]}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Settings className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-primary">{t('settingsTitle')}</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-md mx-auto">
          {/* Sound Settings */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? (
                  <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">{t('soundSettings')}</p>
                  <p className="text-sm text-muted-foreground">
                    {settings.soundEnabled ? t('soundEnabled') : t('soundDisabled')}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={handleSoundToggle}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {settings.notificationsEnabled ? (
                  <Bell className="h-5 w-5 text-primary" />
                ) : (
                  <BellOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">{t('notificationSettings')}</p>
                  <p className="text-sm text-muted-foreground">
                    {settings.notificationsEnabled ? t('notificationsEnabled') : t('notificationsDisabled')}
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.notificationsEnabled}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-2"
              onClick={() => setShowLanguages(true)}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div className="text-start">
                  <p className="font-medium">{t('languageSettings')}</p>
                  <p className="text-sm text-muted-foreground">{languageNames[currentLanguage]}</p>
                </div>
              </div>
              <ArrowLeft className={`h-5 w-5 text-muted-foreground ${isRTL ? '' : 'rotate-180'}`} />
            </Button>
          </div>

          {/* Data Management */}
          <div className="bg-card rounded-lg p-4 border border-border">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              {t('dataManagement')}
            </h3>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  {t('deleteSavedData')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('deleteDataConfirm')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('deleteDataWarning')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteData}>
                    {t('confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {dataDeleted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-500 mt-2 text-center"
              >
                ✓ {t('dataDeleted')}
              </motion.p>
            )}
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};
