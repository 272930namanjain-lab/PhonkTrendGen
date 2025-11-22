import { useEffect, useRef, useState } from "react";
import { ADMOB_CONFIG } from "@/lib/admob";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface RewardedAdProps {
  onReward: () => void;
}

export default function RewardedAd({ onReward }: RewardedAdProps) {
  const [showDialog, setShowDialog] = useState(false);
  const adShownRef = useRef(false);

  useEffect(() => {
    if (showDialog && !adShownRef.current && window.adsbygoogle) {
      adShownRef.current = true;
      window.adsbygoogle.push({});
    }
  }, [showDialog]);

  const handleReward = () => {
    onReward();
    setShowDialog(false);
    adShownRef.current = false;
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowDialog(true)}
      >
        <Gift className="w-4 h-4 mr-2" />
        Watch Ad for Free Generations
      </Button>

      {showDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Watch Ad to Get Free Generations</h3>
            <p className="text-muted-foreground mb-4">
              Watch this short ad and get 5 free track generations!
            </p>

            <ins
              className="adsbygoogle"
              style={{ display: "block", textAlign: "center", marginBottom: "1rem" }}
              data-ad-client={ADMOB_CONFIG.publisherId}
              data-ad-slot={ADMOB_CONFIG.adUnits.rewardedVideo}
              data-ad-format="rectangle"
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowDialog(false);
                  adShownRef.current = false;
                }}
              >
                Skip
              </Button>
              <Button
                className="flex-1"
                onClick={handleReward}
              >
                I Watched the Ad
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
