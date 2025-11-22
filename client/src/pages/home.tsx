import { useState, useEffect } from "react";
import { Music2, Zap, History, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MusicGenerator from "@/components/music-generator";
import AudioPlayer from "@/components/audio-player";
import TrackHistory from "@/components/track-history";
import TrendingStyles from "@/components/trending-styles";
import BannerAd from "@/components/admob/banner-ad";
import InterstitialAd from "@/components/admob/interstitial-ad";
import RewardedAd from "@/components/admob/rewarded-ad";
import NativeAd from "@/components/admob/native-ad";
import { loadAdMobScript } from "@/lib/admob";
import heroImage from "@assets/generated_images/phonk_music_hero_background.png";
import type { PhonkTrack } from "@shared/schema";

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<PhonkTrack | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [generationCount, setGenerationCount] = useState(0);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [freeGenerations, setFreeGenerations] = useState(0);

  // Load AdMob on mount
  useEffect(() => {
    loadAdMobScript();
  }, []);

  const handleTrackGenerated = (track: PhonkTrack) => {
    setCurrentTrack(track);
    setRefreshHistory(prev => prev + 1);
    setGenerationCount(prev => prev + 1);
    
    // Show interstitial ad after every 3 generations
    if ((generationCount + 1) % 3 === 0) {
      setShowInterstitial(true);
    }
  };

  const handleTrackSelect = (track: PhonkTrack) => {
    setCurrentTrack(track);
  };

  const handleReward = () => {
    setFreeGenerations(prev => prev + 5);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Badge 
            variant="secondary" 
            className="mb-6 backdrop-blur-lg bg-primary/20 border-primary/30 text-primary-foreground text-sm px-4 py-2"
            data-testid="badge-stats"
          >
            <Zap className="w-4 h-4 mr-2 inline" />
            AI-Powered Music Generation
          </Badge>
          
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight leading-tight">
            PHONKGEN
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium">
            Generate unique trending phonk music automatically. 
            Create Memphis, Drift, Brazilian & Cowbell phonk with AI.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="backdrop-blur-lg bg-primary hover:bg-primary/90 border border-primary-border text-lg px-8 h-12"
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-start-generating"
            >
              <Music2 className="w-5 h-5 mr-2" />
              Start Generating
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="backdrop-blur-lg bg-background/10 border-white/20 text-white hover:bg-white/10 text-lg px-8 h-12"
              onClick={() => document.getElementById('trending')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-explore-styles"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Explore Styles
            </Button>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <BannerAd position="top" className="py-4" />

      {/* Interstitial Ad Modal */}
      <InterstitialAd 
        isOpen={showInterstitial}
        onClose={() => setShowInterstitial(false)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Generator Section */}
        <section id="generator" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-primary" />
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              GENERATE
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <MusicGenerator onTrackGenerated={handleTrackGenerated} />
              
              {/* Rewarded Ad Section */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold mb-2">Need More Generations?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Watch a quick ad to unlock 5 free track generations
                </p>
                <RewardedAd onReward={handleReward} />
                {freeGenerations > 0 && (
                  <p className="text-sm text-primary mt-2 font-semibold">
                    ✓ {freeGenerations} free generations available!
                  </p>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {currentTrack ? (
                <AudioPlayer track={currentTrack} />
              ) : (
                <div className="h-full min-h-[400px] rounded-md border-2 border-dashed border-border flex items-center justify-center p-8">
                  <div className="text-center">
                    <Music2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-semibold mb-2">No Track Generated Yet</p>
                    <p className="text-muted-foreground">
                      Select your phonk style and parameters, then hit generate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Native Ad in Middle */}
        <NativeAd />

        {/* Trending Styles Section */}
        <section id="trending" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-primary" />
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              TRENDING STYLES
            </h2>
          </div>
          <TrendingStyles />
        </section>

        {/* History Section */}
        <section id="history">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-primary" />
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              RECENT GENERATIONS
            </h2>
          </div>
          <TrackHistory 
            key={refreshHistory} 
            onTrackSelect={handleTrackSelect}
          />
        </section>
      </div>

      {/* Bottom Banner Ad */}
      <BannerAd position="bottom" className="py-4 border-t border-border" />

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">
              Powered by AI Music Generation
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">FAQ</a>
              <a href="#" className="hover:text-foreground transition-colors">API Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
