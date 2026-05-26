export const servicesData = [
  {
    id: 1,
    title: "24h Mājaslapa",
    description: "Pilnvērtīga mājaslapa 24 stundu laikā. Dizains, izstrāde, hosting, SEO-ready struktūra.",
    priceRange: "€300–800",
    timeline: "24 stundas",
    icon: "Zap",
  },
  {
    id: 2,
    title: "AI Aģenti & Automatizācija",
    description: "Custom Claude/OpenAI aģenti jūsu biznesa procesiem. Supabase + Make.com integrācija. 50–80% laika ietaupījums.",
    priceRange: "€2,000–6,000",
    timeline: "2–3 nedēļas",
    icon: "Brain",
  },
  {
    id: 3,
    title: "Lead Generation sistēmas",
    description: "Landing page + database + CRM integrācija + lead scoring. Jūs saņemat qualified leads, ne tikai traffic.",
    priceRange: "€2,500–8,000",
    timeline: "4–6 nedēļas",
    icon: "TrendingUp",
  },
  {
    id: 4,
    title: "SEO Optimizācija",
    description: "Technical audit, on-page optimizācija, content stratēģija. 20–50% organiskā trafika pieaugums 6 mēnešos.",
    priceRange: "€200–500/mēn",
    timeline: "Pavisam mēneši",
    icon: "Search",
  },
  {
    id: 5,
    title: "Google Ads pārvaldīšana",
    description: "Pilna Google Ads pārvaldīšana. Keyword research, A/B landing page testi, ROI izsekošana. Mērķis: 2–4x ROAS.",
    priceRange: "€1,500–3,500/mēn",
    timeline: "Pavisam mēneši",
    icon: "Target",
  },
];

export const caseStudiesData = [
  {
    id: 1,
    name: "Sovereign Solar",
    industry: "Enerģētika / Lead Gen",
    situation: "Solāro uzņēmumu leads bija izkaisīti, bez centralizēta kanāla.",
    solution: "Uzbūvējām lead-gen salīdzināšanas platformu. Privatpersonas salīdzina solāro sistēmu piedāvājumus, solāras firmas saņem qualified leads.",
    techStack: ["Vite", "React", "Supabase", "Base44"],
    results: ["Commission-based partner modelis", "50+ partneru outreach aktīvs", "Lead capture sistēma gatava scale-ošanai"],
    status: "Live",
    statusLabel: "Scaling",
  },
  {
    id: 2,
    name: "ProMeistars",
    industry: "Marketplace / AI",
    situation: "Latvijas meistari bija bez centralizētas platformas, klienti nevarēja atrast speciālistus.",
    solution: "Marketplace platforma ar AI-powered onboarding. Meistars atbild uz jautājumiem → AI ģenerē profilu → publicējas lapa.",
    techStack: ["Next.js", "Supabase", "Claude API", "PostgreSQL"],
    results: ["AI onboarding workflow pabeigts", "Sprint 5 — pilot group aktīva", "Mērķis: Bolt visiem Latvijas meistariem"],
    status: "Sprint 5",
    statusLabel: "Development",
  },
  {
    id: 3,
    name: "Rankly (24h Service)",
    industry: "Web Aģentūra",
    situation: "Mazie uzņēmumi vajadzēja mājaslapas, bet process bija lēns un dārgs.",
    solution: "24-stundu website delivery service. Klients sniedz info, mēs dizainējam, izstrādājam un laižam live tajā pašā dienā.",
    techStack: ["Vite", "React", "TypeScript", "Vercel", "Supabase"],
    results: ["15+ realizēti projekti", "Auto servisi, zobārstniecība, restorāni", "Monthly retainer modelis — €50–150/mēn"],
    status: "Live",
    statusLabel: "Active",
  },
];

export const aboutData = {
  heading: "Par mums",
  intro: "Rankly dibināts ar vienu mērķi — digitālie risinājumi, kas strādā, nevis tikai izskatās. Specializējamies backend sistēmās, AI automatizācijā un lead generation platformās. Katrs projekts ir veidots ar konkrētu biznesa rezultātu prātā: ROI, konversijas, un mērogojamība.",
  trustSignals: [
    { value: "10+", label: "Realizēti projekti" },
    { value: "3", label: "Aktīvas platformas" },
    { value: "24h", label: "Website delivery" },
  ],
  skills: ["Supabase", "React / Next.js", "Claude API", "Make.com", "Lead Gen Systems", "AI Automation", "Vercel", "PostgreSQL"],
};
