import { useEffect, useRef } from "react";
import { ADMOB_CONFIG } from "@/lib/admob";

interface InterstitialAdProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function InterstitialAd({ onClose, isOpen }: InterstitialAdProps) {
  const adShownRef = useRef(false);

  useEffect(() => {
    if (isOpen && !adShownRef.current && window.adsbygoogle) {
      adShownRef.current = true;
      window.adsbygoogle.push({});

      // Auto-close after 10 seconds
      const timer = setTimeout(() => {
        onClose();
        adShownRef.current = false;
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Advertisement</h3>
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client={ADMOB_CONFIG.publisherId}
          data-ad-slot={ADMOB_CONFIG.adUnits.interstitial}
          data-ad-format="rectangle"
        />
        <button
          onClick={onClose}
          className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90"
        >
          Close Ad
        </button>
      </div>
    </div>
  );
}
