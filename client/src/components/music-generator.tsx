import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Sparkles, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PHONK_STYLES, INTENSITY_LEVELS, VOCAL_STYLES, MOOD_OPTIONS, type PhonkTrack } from "@shared/schema";

const generatorSchema = z.object({
  style: z.string(),
  bpm: z.number().min(120).max(180),
  intensity: z.string(),
  vocalStyle: z.string(),
  mood: z.array(z.string()),
});

type GeneratorForm = z.infer<typeof generatorSchema>;

interface MusicGeneratorProps {
  onTrackGenerated: (track: PhonkTrack) => void;
}

export default function MusicGenerator({ onTrackGenerated }: MusicGeneratorProps) {
  const { toast } = useToast();
  const [selectedMoods, setSelectedMoods] = useState<string[]>(["Dark"]);

  const form = useForm<GeneratorForm>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      style: "Memphis",
      bpm: 140,
      intensity: "Moderate",
      vocalStyle: "Instrumental",
      mood: ["Dark"],
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: GeneratorForm) => {
      const response = await apiRequest("POST", "/api/generate", data);
      return response as PhonkTrack;
    },
    onSuccess: (track) => {
      toast({
        title: "Track Generated!",
        description: `Your ${track.style} phonk track is ready`,
      });
      onTrackGenerated(track);
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const randomize = () => {
    const randomStyle = PHONK_STYLES[Math.floor(Math.random() * PHONK_STYLES.length)];
    const randomIntensity = INTENSITY_LEVELS[Math.floor(Math.random() * INTENSITY_LEVELS.length)];
    const randomVocal = VOCAL_STYLES[Math.floor(Math.random() * VOCAL_STYLES.length)];
    const randomBpm = Math.floor(Math.random() * (180 - 120) + 120);
    const randomMoodCount = Math.floor(Math.random() * 2) + 1;
    const randomMoods = [...MOOD_OPTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, randomMoodCount);

    form.setValue("style", randomStyle);
    form.setValue("bpm", randomBpm);
    form.setValue("intensity", randomIntensity);
    form.setValue("vocalStyle", randomVocal);
    form.setValue("mood", randomMoods);
    setSelectedMoods(randomMoods);
  };

  const toggleMood = (mood: string) => {
    const newMoods = selectedMoods.includes(mood)
      ? selectedMoods.filter(m => m !== mood)
      : [...selectedMoods, mood];
    setSelectedMoods(newMoods);
    form.setValue("mood", newMoods);
  };

  const onSubmit = (data: GeneratorForm) => {
    generateMutation.mutate(data);
  };

  const bpm = form.watch("bpm");

  return (
    <Card className="overflow-visible">
      <CardHeader className="space-y-0 pb-4">
        <CardTitle className="text-2xl font-bold">Generator Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Phonk Style */}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Phonk Style</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger data-testid="select-phonk-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PHONK_STYLES.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style} Phonk
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* BPM Slider */}
            <FormField
              control={form.control}
              name="bpm"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-base font-semibold">BPM</FormLabel>
                    <Badge variant="secondary" className="font-mono text-sm" data-testid="text-bpm-value">
                      {bpm}
                    </Badge>
                  </div>
                  <FormControl>
                    <Slider
                      min={120}
                      max={180}
                      step={1}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                      data-testid="slider-bpm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Intensity */}
            <FormField
              control={form.control}
              name="intensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Intensity</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger data-testid="select-intensity">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INTENSITY_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Vocal Style */}
            <FormField
              control={form.control}
              name="vocalStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Vocal Style</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger data-testid="select-vocal-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VOCAL_STYLES.map((vocal) => (
                          <SelectItem key={vocal} value={vocal}>
                            {vocal}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Mood Tags */}
            <FormField
              control={form.control}
              name="mood"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Mood & Vibe</FormLabel>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {MOOD_OPTIONS.map((mood) => (
                      <Badge
                        key={mood}
                        variant={selectedMoods.includes(mood) ? "default" : "outline"}
                        className="cursor-pointer hover-elevate active-elevate-2 px-3 py-1.5"
                        onClick={() => toggleMood(mood)}
                        data-testid={`badge-mood-${mood.toLowerCase()}`}
                      >
                        {mood}
                      </Badge>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={generateMutation.isPending || selectedMoods.length === 0}
                data-testid="button-generate"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Phonk
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={randomize}
                disabled={generateMutation.isPending}
                data-testid="button-randomize"
              >
                <Shuffle className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
