import { motion } from 'framer-motion';
import { Settings, Volume2, VolumeX, Bell, BellOff, Trash2, Globe, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/hooks/useLanguage';
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

export interface SettingsScreenProps {
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onClearData: () => void;
}

export const SettingsScreen = ({
  isSoundEnabled,
  onToggleSound,
  notificationsEnabled,
  onToggleNotifications,
  currentLanguage,
  onLanguageChange,
  onClearData,
}: SettingsScreenProps) => {
  const { t, languageNames, availableLanguages, isRTL } = useLanguage();
  const [showLanguages, setShowLanguages] = useState(false);

  const handleLanguageChange = (lang: LanguageCode) => {
    onLanguageChange(lang);
    setShowLanguages(false);
  };

  if (showLanguages) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col max-h-[80vh]"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => setShowLanguages(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-bold text-primary">{t('selectLanguage')}</h2>
        </div>
        
        <ScrollArea className="flex-1 max-h-[60vh]">
          <div className="grid grid-cols-2 gap-2 p-4">
            {availableLanguages.map((lang) => (
              <Button
                key={lang}
                variant={currentLanguage === lang ? 'default' : 'outline'}
                className="justify-start gap-2 h-10 text-sm"
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
      className="flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-primary">{t('settingsTitle')}</h2>
      </div>

      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-4 p-4">
          {/* Sound Settings */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isSoundEnabled ? (
                  <Volume2 className="h-5 w-5 text-primary" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-sm">{t('soundSettings')}</p>
                  <p className="text-xs text-muted-foreground">
                    {isSoundEnabled ? t('soundEnabled') : t('soundDisabled')}
                  </p>
                </div>
              </div>
              <Switch
                checked={isSoundEnabled}
                onCheckedChange={onToggleSound}
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {notificationsEnabled ? (
                  <Bell className="h-5 w-5 text-primary" />
                ) : (
                  <BellOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-sm">{t('notificationSettings')}</p>
                  <p className="text-xs text-muted-foreground">
                    {notificationsEnabled ? t('notificationsEnabled') : t('notificationsDisabled')}
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={onToggleNotifications}
              />
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-1 px-0"
              onClick={() => setShowLanguages(true)}
            >
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div className="text-start">
                  <p className="font-medium text-sm">{t('languageSettings')}</p>
                  <p className="text-xs text-muted-foreground">{languageNames[currentLanguage as LanguageCode]}</p>
                </div>
              </div>
              <ArrowLeft className={`h-5 w-5 text-muted-foreground ${isRTL ? '' : 'rotate-180'}`} />
            </Button>
          </div>

          {/* Data Management */}
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              {t('dataManagement')}
            </h3>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full" size="sm">
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
                  <AlertDialogAction onClick={onClearData}>
                    {t('confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
};
