import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Play, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PhonkTrack } from "@shared/schema";

interface TrackHistoryProps {
  onTrackSelect: (track: PhonkTrack) => void;
}

export default function TrackHistory({ onTrackSelect }: TrackHistoryProps) {
  const { data: tracks, isLoading } = useQuery<PhonkTrack[]>({
    queryKey: ['/api/tracks'],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Play className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Tracks Yet</h3>
          <p className="text-muted-foreground">
            Generate your first phonk track to see it here in your history
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <Card 
          key={track.id} 
          className="hover-elevate overflow-visible cursor-pointer transition-all"
          onClick={() => onTrackSelect(track)}
          data-testid={`card-track-${track.id}`}
        >
          <CardContent className="p-6">
            {/* Mini Waveform */}
            <div className="mb-4 h-16 flex items-end justify-center gap-0.5 bg-muted/30 rounded p-2">
              {Array.from({ length: 40 }).map((_, i) => {
                const height = Math.random() * 70 + 30;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-primary/50 rounded-sm"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>

            {/* Track Info */}
            <h4 className="font-semibold mb-2 line-clamp-1" data-testid={`text-track-title-${track.id}`}>
              {track.title || `${track.style} Phonk Track`}
            </h4>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant="secondary" className="text-xs" data-testid={`badge-style-${track.id}`}>
                {track.style}
              </Badge>
              <Badge variant="outline" className="text-xs font-mono" data-testid={`badge-bpm-${track.id}`}>
                {track.bpm}
              </Badge>
              <Badge variant="outline" className="text-xs" data-testid={`badge-intensity-${track.id}`}>
                {track.intensity}
              </Badge>
            </div>

            {/* Timestamp */}
            <p className="text-xs text-muted-foreground mb-4" data-testid={`text-timestamp-${track.id}`}>
              {track.createdAt 
                ? formatDistanceToNow(new Date(track.createdAt), { addSuffix: true })
                : 'Recently generated'
              }
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onTrackSelect(track);
                }}
                data-testid={`button-play-${track.id}`}
              >
                <Play className="w-3 h-3 mr-1.5" />
                Play
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  if (track.audioUrl) {
                    const link = document.createElement('a');
                    link.href = track.audioUrl;
                    link.download = `${track.style}-phonk-${track.id}.mp3`;
                    link.click();
                  }
                }}
                disabled={!track.audioUrl}
                data-testid={`button-download-${track.id}`}
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
