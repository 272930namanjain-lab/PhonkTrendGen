import { useEffect } from "react";
import { ADMOB_CONFIG } from "@/lib/admob";

interface NativeAdProps {
  className?: string;
}

export default function NativeAd({ className = "" }: NativeAdProps) {
  useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className={`my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADMOB_CONFIG.publisherId}
        data-ad-slot={ADMOB_CONFIG.adUnits.nativeAd}
        data-ad-format="native"
      />
    </div>
  );
}
