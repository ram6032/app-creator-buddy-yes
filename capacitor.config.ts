import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.22dd3845edc14b7890a2cb0e16679c7e',
  appName: 'app-creator-buddy-yes',
  webDir: 'dist',
  server: {
    url: 'https://22dd3845-edc1-4b78-90a2-cb0e16679c7e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;