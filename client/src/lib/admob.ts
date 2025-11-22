// Google AdMob Configuration
// Update these with YOUR values from AdMob console

export const ADMOB_CONFIG = {
  publisherId: "ca-pub-xxxxxxxxxxxxxxxx", // Replace with your Publisher ID
  
  adUnits: {
    bannerTop: "ca-xxxxxxxxxxxxxxxx-1",      // Replace with your banner ad unit
    interstitial: "ca-xxxxxxxxxxxxxxxx-2",   // Replace with your interstitial ad unit
    rewardedVideo: "ca-xxxxxxxxxxxxxxxx-3",  // Replace with your rewarded ad unit
    nativeAd: "ca-xxxxxxxxxxxxxxxx-4",       // Replace with your native ad unit
  },

  // Ad frequency controls (in seconds)
  interstitialFrequency: 180, // Show after 3 generations (3 minutes)
  rewardedFrequency: 300,     // Show rewarded ad every 5 minutes
};

// Load AdMob script
export function loadAdMobScript() {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADMOB_CONFIG.publisherId}`;
  document.head.appendChild(script);

  // Initialize ads
  window.adsbygoogle = window.adsbygoogle || [];
}

// Display ads
export function displayAds() {
  if (window.adsbygoogle) {
    window.adsbygoogle.push({});
  }
}

// Declare global window type for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
