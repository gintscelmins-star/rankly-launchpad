export const PROFILE_SIZES = {
  profile_master: { w: 800, h: 800 },
  fb_cover: { w: 1640, h: 624 },
  ig_highlight_master: { w: 1080, h: 1080 },
} as const;

export const PROFILE_VARIANTS = [
  {
    id: "profile-a",
    name: "Wordmark minimāls",
    bg: "#0A0A0A",
    circle: { show: true, color: "#CC0000", strokeWidth: 6, style: "full" as const, offset: 8 },
    content: {
      type: "wordmark" as const,
      text: "RANKLY",
      fontSize: 120,
      color: "#E8E8E8",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: "0.05em",
    },
  },
  {
    id: "profile-b",
    name: "Wordmark + akcents",
    bg: "#0A0A0A",
    circle: { show: true, color: "#CC0000", strokeWidth: 6, style: "full" as const, offset: 8 },
    content: {
      type: "wordmark-accent" as const,
      text: "RANKLY",
      fontSize: 110,
      color: "#E8E8E8",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: "0.05em",
      accentLine: { color: "#C8FF00", height: 3, width: 120, marginTop: 12 },
    },
  },
  {
    id: "profile-c",
    name: "R monogram",
    bg: "#0A0A0A",
    circle: { show: true, color: "#CC0000", strokeWidth: 6, style: "full" as const, offset: 8 },
    content: {
      type: "monogram" as const,
      text: "R",
      fontSize: 320,
      color: "#E8E8E8",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
  },
] as const;

export type ProfileVariant = (typeof PROFILE_VARIANTS)[number];

export const FB_COVER_VARIANTS = [
  {
    id: "cover-a",
    name: "Teksts + aplis",
    layout: "split" as const,
  },
  {
    id: "cover-b",
    name: "Minimāls + līnija",
    layout: "centered" as const,
  },
  {
    id: "cover-c",
    name: "Le Cercle Rouge",
    layout: "cercle" as const,
  },
];

export const IG_HIGHLIGHTS = [
  {
    id: "hl-demo",
    name: "DEMO",
    category: "demo",
    bg: "#0A0A0A",
    icon: {
      text: "24h",
      fontSize: 200,
      color: "#E8E8E8",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 700,
    },
    label: {
      text: "DEMO",
      fontSize: 80,
      color: "#C8FF00",
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.15em",
    },
    circle: { show: true, color: "#CC0000", strokeWidth: 10, style: "partial" as const },
  },
  {
    id: "hl-sistema",
    name: "SISTĒMA",
    category: "sistema",
    bg: "#0A0A0A",
    icon: {
      text: "→",
      fontSize: 280,
      color: "#C8FF00",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 400,
    },
    label: {
      text: "SISTĒMA",
      fontSize: 64,
      color: "#E8E8E8",
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.1em",
    },
    circle: { show: true, color: "#CC0000", strokeWidth: 10, style: "partial" as const },
  },
  {
    id: "hl-ai",
    name: "AI",
    category: "ai",
    bg: "#0A0A0A",
    icon: {
      text: "AI",
      fontSize: 280,
      color: "#E8E8E8",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 700,
    },
    label: {
      text: "AI",
      fontSize: 80,
      color: "#CC0000",
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.2em",
    },
    circle: { show: true, color: "#CC0000", strokeWidth: 10, style: "full" as const },
  },
  {
    id: "hl-cena",
    name: "CENA",
    category: "cena",
    bg: "#0A0A0A",
    icon: {
      text: "€50",
      fontSize: 180,
      color: "#C8FF00",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      fontWeight: 700,
    },
    label: {
      text: "CENA",
      fontSize: 72,
      color: "#6B6B6B",
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.15em",
    },
    circle: { show: true, color: "#CC0000", strokeWidth: 10, style: "partial" as const },
  },
  {
    id: "hl-nelasit",
    name: "NELASĪT",
    category: "nelasit",
    bg: "#0A0A0A",
    icon: {
      text: "—",
      fontSize: 320,
      color: "#2D2D2D",
      fontFamily: "'Courier New', monospace",
      fontWeight: 400,
    },
    label: {
      text: "nelasīt",
      fontSize: 64,
      color: "#4A4A4A",
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.1em",
    },
    circle: { show: false, color: "", strokeWidth: 0, style: "full" as const },
  },
];

export type HighlightItem = (typeof IG_HIGHLIGHTS)[number];
