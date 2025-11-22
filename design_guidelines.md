# Phonk Music Generator App - Design Guidelines

## Design Approach

**Reference-Based Approach: Music Production + Street Culture Aesthetic**

Primary References:
- **Spotify/SoundCloud**: Audio player interfaces, waveform visualization, track management
- **Beatoven.ai/Suno**: Music generation UI patterns, parameter controls
- **Underground Music Platforms**: Edgy, bold typography and raw aesthetic

Design Principles:
- Bold, unapologetic visual presence reflecting phonk's street culture roots
- High contrast, dramatic hierarchy for immediate visual impact
- Functional clarity within an expressive aesthetic
- Emphasis on the generated music as the centerpiece

---

## Typography

**Font Selection via Google Fonts:**
- **Primary Display**: "Bebas Neue" or "Anton" - Bold, condensed, high-impact headers
- **UI/Body**: "Inter" or "DM Sans" - Clean, highly legible for controls and metadata
- **Accent/Mono**: "JetBrains Mono" - Technical parameters, BPM displays, timestamps

**Hierarchy:**
- App Title/Hero: 4xl-6xl (48-60px), ultra-bold, tight letter-spacing (-0.02em)
- Section Headers: 2xl-3xl (24-30px), bold, uppercase for emphasis
- Track Titles: xl (20px), semibold
- Body/Controls: base-lg (16-18px), medium weight
- Technical Data: sm-base (14-16px), monospace

---

## Layout System

**Spacing Primitives (Tailwind):**
Core spacing units: `2, 4, 6, 8, 12, 16, 20, 24`
- Micro spacing: `p-2, gap-2` (8px) - tight groupings
- Standard spacing: `p-4, gap-4, m-4` (16px) - component padding
- Section spacing: `p-8, gap-8` (32px) - major separations
- Generous spacing: `p-12, p-16` (48-64px) - hero/feature sections

**Grid System:**
- Main container: `max-w-7xl mx-auto px-4 lg:px-8`
- Two-column split: Generator controls (left 40%) | Player/Visualizer (right 60%)
- Mobile: Full-width stacked layout
- History gallery: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## Component Library

### 1. Hero Section
**Layout:** Full-width, height `h-[60vh] to h-[70vh]`
- Large hero background image: Abstract waveform visualization, vinyl records, or urban phonk aesthetic imagery (blurred/dark overlay for contrast)
- Centered content: App title (massive display font), tagline, primary CTA
- Floating "Generate" button with backdrop blur (`backdrop-blur-lg`)
- Quick stats overlay: "1,247 Tracks Generated" badge

### 2. Music Generator Interface
**Primary Control Panel:**
- Prominent "Generate Phonk Track" button (large, eye-catching)
- Parameter grid (2x2 on desktop, stacked mobile):
  - Phonk Style dropdown (Memphis, Drift, Brazilian, Cowbell, House)
  - BPM slider with live numeric display (120-180 range typical)
  - Intensity slider (Chill → Aggressive)
  - Vocal Style toggle (Instrumental / Chopped Vocals)
- Mood/vibe tags as pills/chips (clickable, multi-select)
- "Surprise Me" random generation button (secondary style)

### 3. Audio Player Component
**Integrated Player:**
- Large waveform visualization canvas (full width, ~200-300px height)
- Progress bar integrated into waveform
- Play/Pause (large central button), Skip, Loop, Download controls
- Track metadata display: Generated style tags, timestamp, duration
- Volume control and playback speed adjuster
- Share button with copy link functionality

### 4. Generation History Gallery
**Card Grid Layout:**
- Track cards with:
  - Miniature waveform thumbnail
  - Generation parameters as badges (style, BPM, mood)
  - Timestamp ("Generated 2 mins ago")
  - Quick actions: Play, Download, Delete
- Infinite scroll or "Load More" pagination
- Filter/sort controls: Recent, Most Played, By Style

### 5. Navigation Header
**Sticky header (h-16):**
- Logo/app name (left, bold display font)
- Main nav: Generator | History | Trending Styles | About
- User account/credits indicator (if applicable)
- Mobile: Hamburger menu

### 6. Trending Styles Showcase
**Carousel/Grid Section:**
- Featured phonk style cards highlighting current trends
- Each card: Style name, brief description, example characteristics
- "Try This Style" CTA leading to generator with preset parameters
- 3-4 cards visible on desktop, horizontal scroll on mobile

### 7. Footer
**Compact footer (py-8):**
- API attribution: "Powered by Suno AI"
- Quick links: FAQ, Terms, API Docs
- Social links (if applicable)
- Newsletter signup (optional): "Get notified of new phonk styles"

---

## Images

**Hero Image:**
- **Yes, use a large hero background image**
- Subject: Dark, abstract waveform visualization with purple/pink tones, or urban street aesthetic with vinyl records, or abstract phonk-inspired artwork
- Treatment: Dark gradient overlay (top to bottom) for text readability
- Dimensions: Full viewport width, 60-70vh height
- Blur intensity on overlay: `backdrop-blur-md` for buttons

**Additional Images:**
- Waveform visualizations: Real-time canvas rendering (not static images)
- Trending style cards: Small illustrative icons or abstract patterns representing each phonk subgenre
- Track thumbnails: Auto-generated waveform snapshots
- About/info sections: Optional imagery showing music creation process or phonk culture references

---

## Animations

**Minimal, purposeful animations:**
- Waveform: Reactive pulse to audio playback (essential)
- Button hover: Subtle scale (1.02) and shadow lift
- Track generation: Loading state with pulsing/progress indicator
- Card entrance: Subtle fade-in for history gallery items
- **No** distracting scroll-triggered animations
- **No** excessive transitions on controls

---

## Accessibility

- High contrast maintained throughout (especially for controls on backgrounds)
- All interactive elements minimum 44px touch target
- Keyboard navigation for all controls (Tab flow: Generator params → Play → History)
- ARIA labels for all icon-only buttons
- Focus states clearly visible with outline
- Captions/labels for all form inputs and sliders
- Screen reader announcements for generation status

---

## Key UX Patterns

1. **Progressive Disclosure**: Advanced parameters collapsed by default, "More Options" expander
2. **Instant Feedback**: Generate button shows loading state, progress updates during generation
3. **Contextual Actions**: Hover on history cards reveals full action menu
4. **Empty States**: Friendly illustration when no history exists yet
5. **Error Handling**: Clear messaging if generation fails with "Try Again" action

---

This design creates a bold, functional music generation experience that balances phonk's edgy aesthetic with professional usability.