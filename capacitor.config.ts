import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c15fdff59b2e41af888afcd86585091d',
  appName: 'محاكي الرئيس',
  webDir: 'dist',
  // تم إزالة server.url للعمل بدون إنترنت (Offline Mode)
  android: {
    minWebViewVersion: 51,
    backgroundColor: '#1a1a2e'
  }
};

export default config;
