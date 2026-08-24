const _servicesData = [
  {
    id: 1,
    title: "24h Mājaslapa",
    description:
      "Pilnvērtīga mājaslapa 24 stundu laikā. Dizains, izstrāde, hosting, SEO-ready struktūra.",
    priceRange: "€300–800",
    timeline: "24 stundas",
    icon: "Zap",
  },
  {
    id: 2,
    title: "AI Aģenti & Automatizācija",
    description:
      "Custom Claude/OpenAI aģenti jūsu biznesa procesiem. Supabase + Make.com integrācija. 50–80% laika ietaupījums.",
    priceRange: "€2,000–6,000",
    timeline: "2–3 nedēļas",
    icon: "Brain",
  },
  {
    id: 3,
    title: "Lead Generation sistēmas",
    description:
      "Landing page + database + CRM integrācija + lead scoring. Jūs saņemat qualified leads, ne tikai traffic.",
    priceRange: "€2,500–8,000",
    timeline: "4–6 nedēļas",
    icon: "TrendingUp",
  },
  {
    id: 4,
    title: "SEO Optimizācija",
    description:
      "Technical audit, on-page optimizācija, content stratēģija. 20–50% organiskā trafika pieaugums 6 mēnešos.",
    priceRange: "€200–500/mēn",
    timeline: "Pavisam mēneši",
    icon: "Search",
  },
  {
    id: 5,
    title: "Google Ads pārvaldīšana",
    description:
      "Pilna Google Ads pārvaldīšana. Keyword research, A/B landing page testi, ROI izsekošana. Mērķis: 2–4x ROAS.",
    priceRange: "€1,500–3,500/mēn",
    timeline: "Pavisam mēneši",
    icon: "Target",
  },
];

const _caseStudiesData = [
  {
    id: 1,
    name: "Sovereign Solar",
    industry: "Enerģētika / Lead Gen",
    situation: "Solāro uzņēmumu leads bija izkaisīti, bez centralizēta kanāla.",
    solution:
      "Uzbūvējām lead-gen salīdzināšanas platformu. Privatpersonas salīdzina solāro sistēmu piedāvājumus, solāras firmas saņem qualified leads.",
    techStack: ["Vite", "React", "Supabase", "Base44"],
    results: [
      "Commission-based partner modelis",
      "50+ partneru outreach aktīvs",
      "Lead capture sistēma gatava scale-ošanai",
    ],
    status: "Live",
    statusLabel: "Scaling",
  },
  {
    id: 2,
    name: "ProMeistars",
    industry: "Marketplace / AI",
    situation:
      "Latvijas meistari bija bez centralizētas platformas, klienti nevarēja atrast speciālistus.",
    solution:
      "Marketplace platforma ar AI-powered onboarding. Meistars atbild uz jautājumiem → AI ģenerē profilu → publicējas lapa.",
    techStack: ["Next.js", "Supabase", "Claude API", "PostgreSQL"],
    results: [
      "AI onboarding workflow pabeigts",
      "Sprint 5 — pilot group aktīva",
      "Mērķis: Bolt visiem Latvijas meistariem",
    ],
    status: "Sprint 5",
    statusLabel: "Development",
  },
  {
    id: 3,
    name: "Rankly (24h Service)",
    industry: "Web Aģentūra",
    situation: "Mazie uzņēmumi vajadzēja mājaslapas, bet process bija lēns un dārgs.",
    solution:
      "24-stundu website delivery service. Klients sniedz info, mēs dizainējam, izstrādājam un laižam live tajā pašā dienā.",
    techStack: ["Vite", "React", "TypeScript", "Vercel", "Supabase"],
    results: [
      "15+ realizēti projekti",
      "Auto servisi, zobārstniecība, restorāni",
      "Monthly retainer modelis — €50–150/mēn",
    ],
    status: "Live",
    statusLabel: "Active",
  },
];

const _aboutData = {
  heading: "Par mums",
  intro:
    "Rankly dibināts ar vienu mērķi — digitālie risinājumi, kas strādā, nevis tikai izskatās. Specializējamies backend sistēmās, AI automatizācijā un lead generation platformās. Katrs projekts ir veidots ar konkrētu biznesa rezultātu prātā: ROI, konversijas, un mērogojamība.",
  trustSignals: [
    { value: "10+", label: "Realizēti projekti" },
    { value: "3", label: "Aktīvas platformas" },
    { value: "24h", label: "Website delivery" },
  ],
  skills: [
    "Supabase",
    "React / Next.js",
    "Claude API",
    "Make.com",
    "Lead Gen Systems",
    "AI Automation",
    "Vercel",
    "PostgreSQL",
  ],
};

export interface ServiceCard {
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PricingBlock {
  price: string;
  features: string[];
  setup?: string;
  cta: string;
  microcopy: string;
}

export interface AICard {
  title: string;
  blurredContent: string;
}

export interface ContentData {
  hero: {
    headline: string[];
    typewriterWords: string[];
    sublineTemplate: string;
    cta: string;
    microcopy: string;
  };
  website: {
    title: string;
    subtitle: string;
    cards: ServiceCard[];
    steps: ProcessStep[];
    pricing: PricingBlock;
    statement: string;
  };
  leadgen: {
    title: string;
    subtitle: string;
    pillars: ServiceCard[];
    pricing: PricingBlock;
    statement: string;
  };
  ai: {
    warning: string;
    title: string;
    subtitle: string;
    cards: AICard[];
    cta: string;
    microcopy: string;
    statement: string;
  };
  footer: {
    headline: string;
    cta: string;
    microcopy: string;
  };
}

export const content: ContentData = {
  hero: {
    headline: ["Tu vari pelnīt vairāk.", "Šodien.", "Ar vienu lēmumu."],
    typewriterWords: ["Mājaslapa", "Google Ads", "CRM", "AI"],
    sublineTemplate: "_______ strādās Tavā vietā — viss no €50/mēn. Demo 24 stundu laikā.",
    cta: "Gribu redzēt kā →",
    microcopy: "Bez līguma. Bez riska.",
  },
  website: {
    title: "Tava jaunā mājaslapa — klienti to iemīlēs",
    subtitle: "Magnētiska un funkcionāla. No €50/mēn. Gatava 24 stundu laikā.",
    cards: [
      { title: "Biznesa dizains", description: "Izstrādāts tieši Tavu klientu piesaistei" },
      {
        title: "Mobile-first",
        description:
          "70% klientu meklē no telefona. Tava lapa ir ātra un perfekta uz jebkura ekrāna.",
      },
      {
        title: "24h delivery",
        description: "Piesakies šodien — rīt mājaslapa ir live. Ne nedēļas, ne mēneši.",
      },
      {
        title: "SEO-ready",
        description: "Google redz tavu lapu no pirmās dienas. Pamata optimizācija iekļauta.",
      },
      {
        title: "Analytics",
        description:
          "Redzi kas apmeklē tavu lapu, no kurienes nāk un ko dara. Google Analytics setup iekļauts.",
      },
      {
        title: "Hosting + domēns",
        description: "Viss iekļauts €50/mēn. Nav slēpto maksu, nav pārsteigumu.",
      },
    ],
    steps: [
      {
        number: "01",
        title: "PIESAKIES",
        description: "Aizpildi formu. Pastāsti par savu biznesu.",
      },
      {
        number: "02",
        title: "DEMO 24H",
        description: "Mēs izstrādājam tavu lapu.\nTu redzi pirms maksā.",
      },
      {
        number: "03",
        title: "LIVE + KLIENTI",
        description: "Mājaslapa live. Google to redz.\nKlienti sāk zvanīt.",
      },
    ],
    pricing: {
      price: "no €50/mēn",
      features: [
        "Custom mājaslapa",
        "Hosting + domēns",
        "Mobile-friendly",
        "SEO-ready struktūra",
        "Analytics setup",
        "1 mēnesis bezmaksas atbalsts",
      ],
      setup: "Setup: €149 (vienreizējs) vai 6 mēn. līgums → €0 setup",
      cta: "Gribu demo 24h laikā →",
      microcopy: "Maksā tikai ja patīk.",
    },
    statement:
      "Mēs netaisām ego mājaslapas.\n\nKatrs lēmums balstās datos —\ntava auditorija, viņu paradumi, viņu gaume.\n\nPirms koda rakstām — analizējam.\nĀtrums. Funkcionalitāte. Estētika.\nŠajā secībā.",
  },
  leadgen: {
    title: "Mājaslapa ir tikai sākums.",
    subtitle: "Tava sistēma, kas automātiski piesaista klientus.",
    pillars: [
      {
        title: "Google Ads pārvaldīšana",
        description:
          "Mēs izveidojam un optimizējam tavu Google reklāmu. Tu maksā tikai par klikšķiem no taviem klientiem.",
      },
      {
        title: "CRM sistēma",
        description:
          "Katrs pieprasījums automātiski nonāk tavā CRM. Neviens klients nepazūd. Viss ir pārredzams.",
      },
      {
        title: "AI apstrāde",
        description: "Tu iesaisties tikai kad klients ir gatavs pirkt.",
      },
      {
        title: "Admin panelis",
        description:
          "Viss vienā kontroles panelī: leads, Google Ads atskaites, konversijas, ieņēmumi. Bez Excel, bez manuālas saskaitīšanas.",
      },
    ],
    pricing: {
      price: "no €290/mēn",
      features: [
        "Mājaslapa (iekļauta)",
        "Google Ads pārvaldīšana",
        "CRM sistēma",
        "AI auto outreach",
        "Admin panelis",
        "Ikmēneša atskaite",
      ],
      cta: "Gribu uzzināt vairāk →",
      microcopy: "",
    },
    statement:
      "Mājaslapa bez sistēmas ir tikai\nskaista telpa, kurā neviens nenāk.\n\nMēs pievienojam sistēmu —\nCRM, reklāma, automātika.\n\nTu saņem klientus.\nMēs pārvaldām visu pārējo.",
  },
  ai: {
    warning: "BRĪDINĀJUMS: AI risinājumu izmantošana var dot Jums negodīgu priekšrocību biznesā",
    title: "AI risinājumi — jauns peļņas avots",
    subtitle: "Individuāli pielāgoti rīki un automatizācijas.",
    cards: [
      {
        title: "Iegūt vairāk klientu ar AI",
        blurredContent:
          "Automatizēta lead kvalifikācija, AI chatbot kas konvertē apmeklētājus klientos 24/7, personalizēti follow-up e-pasti uz katra klienta uzvedības bāzes. Sistēma strādā kamēr tu guli.",
      },
      {
        title: "Samazināt darbaspēka izmaksas ar AI",
        blurredContent:
          "Automātiski rēķini, AI asistents kas atbild klientiem, dokumentu apstrāde bez cilvēka iesaistes. Vidējais ietaupījums — 12 stundas nedēļā uz 5 darbinieku komandu.",
      },
      {
        title: "Uzzināt konkurentu noslēpumus ar AI",
        blurredContent:
          "Konkurentu cenu monitorings reāllaikā, SEO stratēģiju analīze, klientu atsauksmju izpēte, tirgus tendences pirms tās kļūst publiski zināmas. Informācija, kas nav pieejama bez AI rīkiem.",
      },
      {
        title: "x10 peļņa ar AI",
        blurredContent:
          "Dinamiskas cenas atkarībā no pieprasījuma, upsell automatizācija, klientu LTV optimizācija, ieņēmumu prognozēšana. Sistēma, kas pelna kamēr tu strādā pie nākamā projekta.",
      },
    ],
    cta: "Uzzināt vairāk par saviem AI risinājumiem →",
    microcopy: "Katrs risinājums individuāli pielāgots.",
    statement:
      "Kamēr konkurenti vēl domā par AI —\ntavi procesi jau darbojas automātiski.\n\nMēs neieviesam tehnoloģiju.\nMēs dodam tev priekšrocību,\nkas tirgū nav publiski pieejama.",
  },
  footer: {
    headline: "Viens lēmums. 24 stundas.",
    cta: "Gribu redzēt kā →",
    microcopy: "Bez līguma. Bez riska.",
  },
};
