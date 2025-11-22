import { useRef, useState, useEffect } from "react";
import { Play, Pause, Download, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import type { PhonkTrack } from "@shared/schema";

interface AudioPlayerProps {
  track: PhonkTrack;
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [track.id]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleDownload = () => {
    if (track.audioUrl) {
      const link = document.createElement('a');
      link.href = track.audioUrl;
      link.download = `${track.style}-phonk-${track.id}.mp3`;
      link.click();
    }
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
    }
  };

  return (
    <Card className="overflow-visible">
      <CardContent className="p-8">
        {/* Track Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3" data-testid="text-track-title">
            {track.title || `${track.style} Phonk Track`}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" data-testid="badge-track-style">
              {track.style}
            </Badge>
            <Badge variant="outline" className="font-mono" data-testid="badge-track-bpm">
              {track.bpm} BPM
            </Badge>
            <Badge variant="outline" data-testid="badge-track-intensity">
              {track.intensity}
            </Badge>
            <Badge variant="outline" data-testid="badge-track-vocal">
              {track.vocalStyle}
            </Badge>
            {track.mood?.map((m) => (
              <Badge key={m} variant="outline" data-testid={`badge-track-mood-${m.toLowerCase()}`}>
                {m}
              </Badge>
            ))}
          </div>
        </div>

        {/* Waveform Visualization Area */}
        <div className="mb-6 bg-muted/30 rounded-md p-8 border border-border">
          <div className="h-32 flex items-end justify-center gap-1">
            {Array.from({ length: 60 }).map((_, i) => {
              const height = Math.random() * 80 + 20;
              const isActive = duration > 0 && (currentTime / duration) * 60 > i;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-150 ${
                    isActive ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="py-4"
            data-testid="slider-progress"
          />
          <div className="flex justify-between text-sm text-muted-foreground font-mono mt-1">
            <span data-testid="text-current-time">{formatTime(currentTime)}</span>
            <span data-testid="text-duration">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="outline"
            onClick={handleLoop}
            data-testid="button-loop"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            className="h-12 w-12"
            onClick={togglePlay}
            data-testid="button-play-pause"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={toggleMute}
            data-testid="button-mute"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          <div className="flex-1 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(vals) => setVolume(vals[0])}
              className="max-w-[120px]"
              data-testid="slider-volume"
            />
          </div>

          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={!track.audioUrl}
            data-testid="button-download"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={track.audioUrl || undefined}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      </CardContent>
    </Card>
  );
}
