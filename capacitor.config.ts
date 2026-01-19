import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c15fdff59b2e41af888afcd86585091d',
  appName: 'محاكي الرئيس',
  webDir: 'dist',
  // تم إزالة server.url للعمل بدون إنترنت (Offline Mode)
  android: {
    minWebViewVersion: 51,
    backgroundColor: '#1a1a2e'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0a0a1a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#d4af37',
      sound: 'default',
    },
  },
};

export default config;
