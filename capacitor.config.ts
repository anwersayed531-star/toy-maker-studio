import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c15fdff59b2e41af888afcd86585091d',
  appName: 'محاكي الرئيس',
  webDir: 'dist',
  server: {
    url: 'https://c15fdff5-9b2e-41af-888a-fcd86585091d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    minWebViewVersion: 51,
    backgroundColor: '#1a1a2e'
  }
};

export default config;
