import { Zap, Music, Disc, Radio } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trendingStyles = [
  {
    name: "Memphis Phonk",
    icon: Radio,
    description: "Classic underground phonk with lo-fi vocals, chopped samples, and dark Memphis rap vibes",
    characteristics: ["Cowbell heavy", "Lo-fi texture", "Chopped vocals", "Dark atmosphere"],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Drift Phonk",
    icon: Zap,
    description: "High-energy phonk perfect for drift edits, featuring aggressive 808s and hard-hitting drums",
    characteristics: ["Fast tempo", "Aggressive 808s", "Clean production", "High energy"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Brazilian Phonk",
    icon: Music,
    description: "Fusion of phonk with Brazilian funk, creating unique rhythms and infectious grooves",
    characteristics: ["Funky rhythms", "Vocal samples", "Dance energy", "Cultural fusion"],
    color: "from-green-500/20 to-yellow-500/20",
  },
  {
    name: "Cowbell Phonk",
    icon: Disc,
    description: "Signature phonk sound dominated by iconic cowbell patterns and deep basslines",
    characteristics: ["Cowbell focus", "Deep bass", "Minimalist", "Hypnotic"],
    color: "from-orange-500/20 to-red-500/20",
  },
];

export default function TrendingStyles() {
  const scrollToGenerator = (style: string) => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const styleSelect = document.querySelector('[data-testid="select-phonk-style"]') as HTMLElement;
      styleSelect?.click();
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trendingStyles.map((style, index) => {
        const Icon = style.icon;
        return (
          <Card 
            key={style.name} 
            className="overflow-visible hover-elevate transition-all"
            data-testid={`card-style-${style.name.toLowerCase().replace(' ', '-')}`}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${style.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-bold text-lg mb-2">{style.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {style.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {style.characteristics.map((char) => (
                  <Badge key={char} variant="outline" className="text-xs">
                    {char}
                  </Badge>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => scrollToGenerator(style.name)}
                data-testid={`button-try-${style.name.toLowerCase().replace(' ', '-')}`}
              >
                Try This Style
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
