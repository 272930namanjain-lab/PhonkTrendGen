import { useEffect } from "react";
import { ADMOB_CONFIG } from "@/lib/admob";

interface BannerAdProps {
  position?: "top" | "bottom";
  className?: string;
}

export default function BannerAd({ position = "top", className = "" }: BannerAdProps) {
  useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={ADMOB_CONFIG.publisherId}
        data-ad-slot={ADMOB_CONFIG.adUnits.bannerTop}
        data-ad-format="horizontal"
      />
    </div>
  );
}
