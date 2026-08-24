import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  Factory,
  Globe2,
  MapPinned,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

type Locale = "en" | "lv" | "de";
type PageKey = "/" | "/operators" | "/property-owners" | "/how-it-works" | "/contact" | "/privacy";

type FooterLink = {
  label: string;
  href: string;
};

type ServiceItem = {
  index: string;
  title: string;
  description: string;
  icon: ReactNode;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

const supportedLocales = ["en", "lv", "de"] as const;
const defaultLocale: Locale = "en";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  lv: "LV",
  de: "DE",
};

const copy = {
  en: {
    nav: {
      home: "Home",
      operators: "For Operators",
      propertyOwners: "For Property Owners",
      howItWorks: "How It Works",
      contact: "Contact",
      privacy: "Privacy",
    },
    header: {
      home: "Rankly home",
      selectLanguage: "Select language",
      discuss: "Discuss your expansion",
    },
    home: {
      eyebrow: "SPECIALISED LEASING",
      heroTitle: "Your gateway to commercial locations in the Baltics.",
      heroBody:
        "Rankly helps businesses find, secure and operate commercial locations for market entry, automated retail, advertising and infrastructure.",
      geography: "ESTONIA · LATVIA · LITHUANIA",
      primaryCta: "Discuss your expansion",
      secondaryCta: "Submit a location",
      networkLabel: "POTENTIAL LOCATION NETWORK",
      networkMetric: "500+",
      networkMetricLabel: "Potential commercial locations",
      networkDisclosure:
        "Potential locations are identified for sourcing and evaluation. Availability is assessed case by case.",
      modelEyebrow: "THE RANKLY MODEL",
      modelTitle: "Commercial space is only valuable when it becomes operational.",
      modelBody:
        "We connect location owners and expansion-focused businesses, then coordinate the commercial and operational steps required to move from an opportunity to a functioning site.",
      whatWeDo: "WHAT WE DO",
      whatWeDoTitle: "From first location to daily operation.",
      operatorsEyebrow: "FOR OPERATORS & BRANDS",
      operatorsTitle: "Launch in the Baltics without building the local process from zero.",
      operatorsBody:
        "Tell us what you want to deploy, where you want to operate and what the location must support. We help identify and coordinate potential sites.",
      propertyEyebrow: "FOR PROPERTY OWNERS",
      propertyTitle: "Make underused commercial space productive.",
      propertyBody:
        "Submit a location for potential vending, advertising, pop-up retail or infrastructure use. Suitability and commercial terms are evaluated individually.",
      networkEyebrow: "THE BALTIC NETWORK",
      networkTitle: "A sourcing network built for market entry.",
      networkBody:
        "Our sourcing network covers multiple commercial environments across Estonia, Latvia and Lithuania. Location suitability, availability and commercial terms are evaluated case by case.",
    },
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      sendInquiry: "Send inquiry",
      propertyName: "Property or company name",
      city: "Country and city",
      propertyType: "Property type",
      submitLocation: "Submit a location",
      required: "Please complete this field.",
      validEmail: "Please enter a valid email address.",
      success:
        "Thank you. This prototype form has recorded your request locally. Connect a CRM or form endpoint before launch.",
      successLocation:
        "Thank you. This prototype form has recorded your location request locally. Connect a CRM or form endpoint before launch.",
    },
    footer: {
      navigation: "Navigation",
      contact: "Contact",
      privacyPolicy: "Privacy Policy",
      brand: "SPECIALISED LEASING",
      legal: "Commercial location sourcing across the Baltics.",
    },
    pages: {
      operators: {
        eyebrow: "FOR OPERATORS",
        title: "Expand your commercial footprint across the Baltics.",
        intro:
          "Rankly helps operators identify potential locations, coordinate commercial discussions and support local implementation.",
        who: "WHO THIS IS FOR",
        whoTitle: "Built for operators and format-led expansion.",
        info: "INFORMATION NEEDED",
        infoTitle: "What Rankly needs from an operator.",
        process: "PROCESS",
        processTitle: "Location sourcing process.",
        after: "AFTER SOURCING",
        afterTitle: "What happens after a suitable location is identified.",
        qual: "QUALIFICATION",
        qualTitle: "Tell us what you want to launch.",
      },
      propertyOwners: {
        eyebrow: "FOR PROPERTY OWNERS",
        title: "Turn underused commercial space into a structured opportunity.",
        intro:
          "Submit a potential location for evaluation by operators seeking commercial space across the Baltics.",
        suitable: "SUITABLE ENVIRONMENTS",
        suitableTitle: "Spaces with practical potential.",
        useful: "WHAT MAKES A LOCATION USEFUL",
        usefulTitle: "Access, visibility and operational fit.",
        evaluation: "EVALUATION",
        evaluationTitle: "How evaluation works.",
        coordination: "COORDINATION",
        coordinationTitle: "What Rankly can coordinate.",
        submit: "LOCATION SUBMISSION",
        submitTitle: "Submit a location for review.",
      },
      howItWorks: {
        eyebrow: "HOW IT WORKS",
        title: "A practical operating process for commercial locations.",
        evalTitle: "WHAT IS EVALUATED",
        evalBody: "The practical checks behind every opportunity.",
        note: "Final suitability and availability depend on the property owner, operator requirements and commercial agreement.",
      },
      contact: {
        eyebrow: "CONTACT",
        title: "Let’s identify the right commercial next step.",
        expand: "EXPAND A CONCEPT",
        expandTitle: "I want to expand a concept.",
        expandBody:
          "Share your target geography, format and operational goals. We will review the next commercial steps.",
        location: "COMMERCIAL LOCATION",
        locationTitle: "I have a commercial location.",
        locationBody:
          "Share the property details, location context and intended use case for evaluation.",
      },
      privacy: {
        eyebrow: "PRIVACY",
        title: "Privacy policy.",
        intro:
          "We process contact and site information for commercial evaluation and coordination. This page is the placeholder version of the final policy and should be replaced before launch.",
      },
    },
  },
  lv: {
    nav: {
      home: "Sākums",
      operators: "Operatoriem",
      propertyOwners: "Īpašniekiem",
      howItWorks: "Kā tas darbojas",
      contact: "Kontakti",
      privacy: "Privātums",
    },
    header: {
      home: "Rankly sākums",
      selectLanguage: "Izvēlieties valodu",
      discuss: "Pārrunāt paplašināšanos",
    },
    home: {
      eyebrow: "SPECIALIZĒTA NOMA",
      heroTitle: "Jūsu vārti uz komerciālām iespējām Baltijā.",
      heroBody:
        "Rankly palīdz uzņēmumiem atrast, nodrošināt un pārvaldīt komerciālas vietas tirgus ienākšanai, automatizētai mazumtirdzniecībai, reklāmai un infrastruktūrai.",
      geography: "IGAUNIJA · LATVIJA · LIETUVA",
      primaryCta: "Pārrunāt paplašināšanos",
      secondaryCta: "Pieteikt lokāciju",
      networkLabel: "POTENCIĀLO LOKĀCIJU TĪKLS",
      networkMetric: "500+",
      networkMetricLabel: "Potenciālās komerciālās lokācijas",
      networkDisclosure:
        "Potenciālās lokācijas tiek identificētas atlasei un izvērtēšanai. Pieejamība tiek noteikta katrā gadījumā atsevišķi.",
      modelEyebrow: "RANKLY MODELIS",
      modelTitle: "Komerctelpa kļūst vērtīga tikai tad, kad tā darbojas.",
      modelBody:
        "Mēs savienojam īpašniekus ar uzņēmumiem, kuri plāno paplašināties, un koordinējam komerc- un operacionālos soļus no iespējas līdz funkcionējošai vietai.",
      whatWeDo: "KO MĒS DARĀM",
      whatWeDoTitle: "No pirmās lokācijas līdz ikdienas darbībai.",
      operatorsEyebrow: "OPERATORIEM UN ZĪMOLIEM",
      operatorsTitle: "Ienesiet savu konceptu Baltijā, neizveidojot vietējo procesu no nulles.",
      operatorsBody:
        "Pastāstiet, ko vēlaties izvietot, kur plānojat darboties un kādas prasības jāatbilst vietai. Mēs palīdzam identificēt un koordinēt potenciālās iespējas.",
      propertyEyebrow: "ĪPAŠNIEKIEM",
      propertyTitle: "Padariet neizmantoto komercvietu produktīvu.",
      propertyBody:
        "Piesniedziet vietu potenciālai tirdzniecībai, reklāmai, pagaidu veikalam vai infrastruktūras izmantošanai. Piemērotība un komerciālie nosacījumi tiek vērtēti individuāli.",
      networkEyebrow: "BALTIJAS TĪKLS",
      networkTitle: "Vietu atlases tīkls tirgus ienākšanai.",
      networkBody:
        "Mūsu vietu atlasē tiek aptvertas dažādas komercvides Igaunijā, Latvijā un Lietuvā. Vietas piemērotība, pieejamība un komerciālie nosacījumi tiek vērtēti individuāli.",
    },
    form: {
      name: "Vārds",
      email: "E-pasts",
      message: "Ziņa",
      sendInquiry: "Nosūtīt pieprasījumu",
      propertyName: "Īpašuma vai uzņēmuma nosaukums",
      city: "Valsts un pilsēta",
      propertyType: "Īpašuma veids",
      submitLocation: "Pieteikt lokāciju",
      required: "Lūdzu, aizpildiet šo lauku.",
      validEmail: "Lūdzu, ievadiet derīgu e-pasta adresi.",
      success:
        "Paldies! Jūsu pieprasījums ir veiksmīgi sagatavots. Pirms palaišanas pieslēdziet CRM vai formas galapunktu, lai saņemtu iesniegumus.",
      successLocation:
        "Paldies! Jūsu lokācijas pieprasījums ir veiksmīgi sagatavots. Pirms palaišanas pieslēdziet CRM vai formas galapunktu, lai saņemtu iesniegumus.",
    },
    footer: {
      navigation: "Navigācija",
      contact: "Kontakti",
      privacyPolicy: "Privātuma politika",
      brand: "SPECIALIZĒTA NOMA",
      legal: "Komerciālo lokāciju atlase Baltijas reģionā.",
    },
    pages: {
      operators: {
        eyebrow: "OPERATORIEM",
        title: "Paplašiniet savu komerciālo klātbūtni Baltijā.",
        intro:
          "Rankly palīdz operatoriem atrast potenciālās lokācijas, koordinēt komerciālās sarunas un atbalstīt vietējo ieviešanu.",
        who: "KAM ŠIS IR DOMĀTS",
        whoTitle: "Piemērots operatoriem un formātu paplašināšanai.",
        info: "NEPIECIEŠAMĀ INFORMĀCIJA",
        infoTitle: "Kādu informāciju Rankly nepieciešams no operatora.",
        process: "PROCESSS",
        processTitle: "Lokāciju atlases process.",
        after: "PĒC ATLASĒŠANAS",
        afterTitle: "Ko dara pēc piemērotas lokācijas identificēšanas.",
        qual: "KVALIFIKĀCIJA",
        qualTitle: "Pastāstiet, ko vēlaties uzsākt.",
      },
      propertyOwners: {
        eyebrow: "ĪPAŠNIEKIEM",
        title: "Pārvērtiet nepietiekami izmantotu komerctelpu strukturētā iespējā.",
        intro:
          "Piesniedziet potenciālo lokāciju izvērtēšanai operatoriem, kuri meklē komerciālas telpas Baltijā.",
        suitable: "PIEMĒROTAS VIDES",
        suitableTitle: "Telpas ar praktisku potenciālu.",
        useful: "KAS PADARA LOKĀCIJU NODERĪGU",
        usefulTitle: "Piekļuve, redzamība un operacionālā piemērotība.",
        evaluation: "VĒRTĒŠANA",
        evaluationTitle: "Kā notiek izvērtēšana.",
        coordination: "KOORDINĀCIJA",
        coordinationTitle: "Ko Rankly var koordinēt.",
        submit: "LOKĀCIJAS PIESNIEGŠANA",
        submitTitle: "Piesniegt lokāciju pārskatīšanai.",
      },
      howItWorks: {
        eyebrow: "KĀ TAS DARBOJAS",
        title: "Praktisks darbības process komerciālajām lokācijām.",
        evalTitle: "KO VĒRTĒ",
        evalBody: "Praktiskie pārbaudījumi aiz katras iespējas.",
        note: "Galīgā piemērotība un pieejamība ir atkarīga no īpašnieka, operatora prasībām un komerciālo noteikumu nosacījumiem.",
      },
      contact: {
        eyebrow: "KONTAKTI",
        title: "Noskaidrosim pareizo nākamo komerciālo soli.",
        expand: "PAPLAŠINĀT KONCEPTU",
        expandTitle: "Es gribu paplašināt konceptu.",
        expandBody:
          "Pastāstiet par mērķa ģeogrāfiju, formātu un operacionālajiem mērķiem. Mēs novērtēsim nākamos komerciālos soļus.",
        location: "KOMERCIĀLA LOKĀCIJA",
        locationTitle: "Man ir komerciāla lokācija.",
        locationBody:
          "Dalieties ar īpašuma informāciju, atrašanās vietu un paredzēto izmantošanas veidu novērtēšanai.",
      },
      privacy: {
        eyebrow: "PRIVĀTUMS",
        title: "Privātuma politika.",
        intro:
          "Mēs apstrādājam kontaktinformāciju un vietnes informāciju komerciālās izvērtēšanas un koordinācijas vajadzībām. Šī ir galīgās politikas vietturēšanas versija un pirms palaišanas jāaizstāj ar pilnu tekstu.",
      },
    },
  },
  de: {
    nav: {
      home: "Startseite",
      operators: "Für Operatoren",
      propertyOwners: "Für Eigentümer",
      howItWorks: "So funktioniert es",
      contact: "Kontakt",
      privacy: "Datenschutz",
    },
    header: {
      home: "Rankly Startseite",
      selectLanguage: "Sprache wählen",
      discuss: "Expansion besprechen",
    },
    home: {
      eyebrow: "SPEZIALISIERTE VERMIETUNG",
      heroTitle: "Ihr Zugang zu gewerblichen Standorten im Baltikum.",
      heroBody:
        "Rankly unterstützt Unternehmen dabei, gewerbliche Standorte für den Markteintritt, den automatisierten Einzelhandel, Werbung und Infrastruktur zu finden, zu sichern und zu betreiben.",
      geography: "ESTLAND · LETTLAND · LITAUEN",
      primaryCta: "Expansion besprechen",
      secondaryCta: "Standort einreichen",
      networkLabel: "POTENZIELLES STANDORTNETZWERK",
      networkMetric: "500+",
      networkMetricLabel: "Potenzielle gewerbliche Standorte",
      networkDisclosure:
        "Potenzielle Standorte werden zur Suche und Bewertung identifiziert. Die Verfügbarkeit wird im Einzelfall geprüft.",
      modelEyebrow: "DAS RANKLY-MODELL",
      modelTitle: "Gewerbeflächen werden erst wertvoll, wenn sie genutzt werden.",
      modelBody:
        "Wir verbinden Eigentümer mit Unternehmen, die expandieren möchten, und koordinieren die kommerziellen und operativen Schritte von der ersten Chance bis zur funktionsfähigen Fläche.",
      whatWeDo: "WAS WIR TUN",
      whatWeDoTitle: "Von der ersten Fläche bis zum täglichen Betrieb.",
      operatorsEyebrow: "FÜR OPERATOREN & MARKEN",
      operatorsTitle: "Starten Sie im Baltikum, ohne den lokalen Prozess von Grund auf neu aufzubauen.",
      operatorsBody:
        "Erzählen Sie uns, was Sie einsetzen möchten, wo Sie tätig werden und welche Anforderungen der Standort erfüllen muss. Wir helfen bei der Identifizierung und Koordination potenzieller Standorte.",
      propertyEyebrow: "FÜR EIGENTÜMER",
      propertyTitle: "Machen Sie ungenutzte Gewerbeflächen produktiv.",
      propertyBody:
        "Reichen Sie einen Standort für potenzielle Vending-, Werbe-, Pop-up- oder Infrastrukturnutzung ein. Eignung und kommerzielle Bedingungen werden individuell bewertet.",
      networkEyebrow: "DAS BALTISCHE NETZWERK",
      networkTitle: "Ein Standortnetzwerk für den Markteintritt.",
      networkBody:
        "Unser Standortnetzwerk deckt verschiedene gewerbliche Umgebungen in Estland, Lettland und Litauen ab. Eignung, Verfügbarkeit und kommerzielle Bedingungen werden im Einzelfall geprüft.",
    },
    form: {
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      sendInquiry: "Anfrage senden",
      propertyName: "Name der Immobilie oder des Unternehmens",
      city: "Land und Stadt",
      propertyType: "Immobilientyp",
      submitLocation: "Standort einreichen",
      required: "Bitte füllen Sie dieses Feld aus.",
      validEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      success:
        "Vielen Dank. Ihre Anfrage wurde erfolgreich vorbereitet. Verbinden Sie vor dem Launch ein CRM oder einen Formular-Endpunkt, um Einsendungen zu empfangen.",
      successLocation:
        "Vielen Dank. Ihre Standortanfrage wurde erfolgreich vorbereitet. Verbinden Sie vor dem Launch ein CRM oder einen Formular-Endpunkt, um Einsendungen zu empfangen.",
    },
    footer: {
      navigation: "Navigation",
      contact: "Kontakt",
      privacyPolicy: "Datenschutzerklärung",
      brand: "SPEZIALISIERTE VERMIETUNG",
      legal: "Gewerbliche Standortsuche im Baltikum.",
    },
    pages: {
      operators: {
        eyebrow: "FÜR OPERATOREN",
        title: "Erweitern Sie Ihre gewerbliche Präsenz im Baltikum.",
        intro:
          "Rankly hilft Operatoren dabei, potenzielle Standorte zu identifizieren, kommerzielle Gespräche zu koordinieren und die lokale Umsetzung zu unterstützen.",
        who: "FÜR WEN IST DAS GEEIGNET",
        whoTitle: "Für Operatoren und formatorientierte Expansion.",
        info: "BENÖTIGTE INFORMATIONEN",
        infoTitle: "Welche Informationen Rankly von einem Operator benötigt.",
        process: "PROZESS",
        processTitle: "Standort-Suchprozess.",
        after: "NACH DER SUCHE",
        afterTitle: "Was passiert, nachdem ein geeigneter Standort identifiziert wurde.",
        qual: "QUALIFIZIERUNG",
        qualTitle: "Erzählen Sie uns, was Sie starten möchten.",
      },
      propertyOwners: {
        eyebrow: "FÜR EIGENTÜMER",
        title: "Machen Sie ungenutzte Gewerbeflächen zu einer strukturierten Chance.",
        intro:
          "Reichen Sie einen potenziellen Standort zur Bewertung durch Betreiber ein, die gewerbliche Räume im Baltikum suchen.",
        suitable: "GEEIGNETE UMGEBUNGEN",
        suitableTitle: "Räume mit praktischem Potenzial.",
        useful: "WAS EINEN STANDORT NUTZBAR MACHT",
        usefulTitle: "Zugang, Sichtbarkeit und betriebliche Eignung.",
        evaluation: "BEWERTUNG",
        evaluationTitle: "Wie die Bewertung funktioniert.",
        coordination: "KOORDINATION",
        coordinationTitle: "Was Rankly koordinieren kann.",
        submit: "STANDORTEINREICHUNG",
        submitTitle: "Standort zur Prüfung einreichen.",
      },
      howItWorks: {
        eyebrow: "SO FUNKTIONIERT ES",
        title: "Ein praktischer Betriebsprozess für gewerbliche Standorte.",
        evalTitle: "WAS BEWERTET WIRD",
        evalBody: "Die praktischen Prüfungen hinter jeder Chance.",
        note: "Endgültige Eignung und Verfügbarkeit hängen von den Anforderungen des Eigentümers, des Betreibers und der kommerziellen Vereinbarung ab.",
      },
      contact: {
        eyebrow: "KONTAKT",
        title: "Lassen Sie uns den richtigen nächsten kommerziellen Schritt finden.",
        expand: "KONZEPT ERWEITERN",
        expandTitle: "Ich möchte ein Konzept erweitern.",
        expandBody:
          "Teilen Sie uns Ihre Zielgeografie, Ihr Format und Ihre operativen Ziele mit. Wir prüfen die nächsten kommerziellen Schritte.",
        location: "GEWERBLICHER STANDORT",
        locationTitle: "Ich habe einen gewerblichen Standort.",
        locationBody:
          "Teilen Sie uns die Details der Immobilie, den Standortkontext und den beabsichtigten Nutzungskontext zur Bewertung mit.",
      },
      privacy: {
        eyebrow: "DATENSCHUTZ",
        title: "Datenschutzerklärung.",
        intro:
          "Wir verarbeiten Kontakt- und Standortinformationen für kommerzielle Bewertung und Koordination. Diese Seite ist die Platzhalter-Version der endgültigen Richtlinie und sollte vor dem Launch ersetzt werden.",
      },
    },
  },
} as const;

const navItems = (locale: Locale): Array<{ label: string; href: PageKey }> => [
  { label: copy[locale].nav.home, href: "/" },
  { label: copy[locale].nav.operators, href: "/operators" },
  { label: copy[locale].nav.propertyOwners, href: "/property-owners" },
  { label: copy[locale].nav.howItWorks, href: "/how-it-works" },
];

function getLocaleFromBrowser(): Locale {
  if (typeof window === "undefined" || typeof navigator === "undefined") return defaultLocale;
  const language = navigator.language.toLowerCase();
  if (language.startsWith("lv")) return "lv";
  if (language.startsWith("de")) return "de";
  return defaultLocale;
}

function normalizeLocale(localeValue?: string): Locale {
  if (localeValue && supportedLocales.includes(localeValue as Locale)) {
    return localeValue as Locale;
  }
  return defaultLocale;
}

function withLocale(path: PageKey, locale: Locale): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

function getRouteFromPath(pathname: string): { locale: Locale; page: PageKey } {
  const normalized = pathname || "/";
  const localeMatch = normalized.match(/^\/((en|lv|de))(\/.*)?$/i);
  if (localeMatch) {
    const locale = normalizeLocale(localeMatch[1].toLowerCase());
    const rest = localeMatch[3] || "/";
    if (rest === "/operators") return { locale, page: "/operators" };
    if (rest === "/property-owners") return { locale, page: "/property-owners" };
    if (rest === "/how-it-works") return { locale, page: "/how-it-works" };
    if (rest === "/contact") return { locale, page: "/contact" };
    if (rest === "/privacy") return { locale, page: "/privacy" };
    return { locale, page: "/" };
  }

  const detected = getLocaleFromBrowser();
  if (normalized === "/operators") return { locale: detected, page: "/operators" };
  if (normalized === "/property-owners") return { locale: detected, page: "/property-owners" };
  if (normalized === "/how-it-works") return { locale: detected, page: "/how-it-works" };
  if (normalized === "/contact") return { locale: detected, page: "/contact" };
  if (normalized === "/privacy") return { locale: detected, page: "/privacy" };
  return { locale: detected, page: "/" };
}

function getInitialPath(): { locale: Locale; page: PageKey } {
  if (typeof window === "undefined") return { locale: defaultLocale, page: "/" };
  return getRouteFromPath(window.location.pathname);
}

const serviceItems: ServiceItem[] = [
  {
    index: "01",
    title: "Location Sourcing",
    description:
      "Identify potential locations based on geography, customer profile, format, access, visibility and operational requirements.",
    icon: <MapPinned size={18} />,
  },
  {
    index: "02",
    title: "Market Entry",
    description:
      "Support businesses evaluating and entering the Baltic market with a local, location-focused partner.",
    icon: <Globe2 size={18} />,
  },
  {
    index: "03",
    title: "Lease Negotiation",
    description:
      "Coordinate commercial discussions and help structure the relevant location agreement.",
    icon: <ShieldCheck size={18} />,
  },
  {
    index: "04",
    title: "Local Operations",
    description:
      "Support installation, access, maintenance coordination, replacement and ongoing local requirements.",
    icon: <Building2 size={18} />,
  },
];

const whyGrid = [
  "Baltic market coverage",
  "Location-focused approach",
  "One coordination point",
  "Flexible commercial formats",
  "Support from sourcing to launch",
  "Case-by-case evaluation",
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Define the requirement",
    description: "Clarify format, geography, operating conditions and location profile.",
  },
  {
    number: "02",
    title: "Source potential locations",
    description: "Map relevant environments across Estonia, Latvia and Lithuania.",
  },
  {
    number: "03",
    title: "Evaluate the opportunity",
    description: "Assess access, fit, visibility, technical conditions and suitability.",
  },
  {
    number: "04",
    title: "Coordinate the agreement",
    description: "Support commercial discussions and the relevant location agreement steps.",
  },
  {
    number: "05",
    title: "Launch and operate",
    description: "Help local implementation, handover and ongoing operational coordination.",
  },
];

const useCases = [
  {
    title: "Automated retail",
    description:
      "Potential locations for unattended retail formats, evaluated according to access, visibility, infrastructure and commercial fit.",
  },
  {
    title: "Vending",
    description:
      "Potential locations for service or convenience formats where customer flow, visibility and operating conditions matter.",
  },
  {
    title: "EV charging",
    description:
      "Potential infrastructure sites assessed for power availability, traffic profile and operational requirements.",
  },
  {
    title: "Advertising",
    description:
      "Potential placements in high-traffic spaces evaluated for customer reach, visibility and environmental fit.",
  },
  {
    title: "Pop-up retail",
    description:
      "Short-term or flexible commercial concepts assessed in relevant public and retail environments.",
  },
  {
    title: "Commercial services",
    description:
      "Potential locations for service-led operations that need practical access, customer footfall and local coordination.",
  },
];

const footerLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "For Operators", href: "/operators" },
  { label: "For Property Owners", href: "/property-owners" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img" aria-label="Rankly brand mark">
        <rect x="3" y="3" width="58" height="58" rx="14" />
        <path
          d="M18 18h15.5c7.2 0 12 4.4 12 11.3 0 6.2-4.2 10.2-9.9 11.2L42 46H31.3l-5.9-9.1H23V46H18V18Zm10.2 14.8h4.5c3.7 0 6-1.8 6-4.9 0-3.2-2.2-4.8-6.2-4.8h-4.3v9.7Z"
          fill="currentColor"
        />
        <circle cx="47" cy="18" r="3.2" fill="#B7F000" />
        <path
          d="M39 19c3.9-.8 6.6-2.7 8.5-5.7"
          stroke="#B7F000"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`wordmark ${compact ? "compact" : ""}`}>
      <BrandMark small={compact} />
      <div>
        <div className="wordmark-name">RANKLY</div>
        {!compact && <div className="wordmark-meta">SPECIALISED LEASING</div>}
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  href,
  full = false,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  full?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}) {
  const className = `primary-button ${full ? "full" : ""}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight size={16} />
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}

function SecondaryButton({
  children,
  href,
  full = false,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  full?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}) {
  const className = `secondary-button ${full ? "full" : ""}`.trim();
  const content = (
    <>
      <span>{children}</span>
      <ChevronRight size={16} />
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {content}
    </button>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-header ${align === "center" ? "center" : "left"}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

function StatusBadge({ children }: { children: ReactNode }) {
  return <span className="status-badge">{children}</span>;
}

function RevealOnScroll({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function MetricStrip() {
  const metrics = [
    { value: "3", label: "Baltic markets" },
    { value: "500+", label: "Potential locations" },
    { value: "4", label: "Core services" },
    { value: "1", label: "Local coordination point" },
  ];

  return (
    <div className="metric-strip">
      {metrics.map((item) => (
        <div key={item.label} className="metric-item">
          <div className="metric-value">{item.value}</div>
          <div className="metric-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="network-visual-wrap">
      <div className="network-legend">POTENTIAL LOCATION NETWORK</div>
      <svg
        className="network-visual"
        viewBox="0 0 820 420"
        aria-label="Baltic locations network visualisation"
      >
        <defs>
          <linearGradient id="lineFade" x1="0" x2="1">
            <stop offset="0%" stopColor="#B7F000" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#B7F000" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B7F000" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <g opacity="0.26">
          <path
            d="M128 120C215 70 243 127 324 148S457 144 547 90 690 87 746 158"
            stroke="#DCE2E8"
            strokeWidth="1.1"
            fill="none"
          />
          <path
            d="M111 202C172 181 208 224 277 241S399 262 470 219 639 224 720 260"
            stroke="#DCE2E8"
            strokeWidth="1.1"
            fill="none"
          />
          <path
            d="M180 291C240 238 289 273 353 279S473 305 560 282 678 246 733 302"
            stroke="#DCE2E8"
            strokeWidth="1.1"
            fill="none"
          />
        </g>
        <g>
          <path
            d="M202 309L239 246L285 234L372 144L456 169L517 104L600 178L667 242"
            stroke="url(#lineFade)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M188 178L246 140L318 213L380 126L411 177L520 224L613 211L666 181"
            stroke="#DCE2E8"
            strokeWidth="1.2"
            fill="none"
            opacity="0.78"
          />
        </g>
        <g>
          <circle className="pulse pulse-1" cx="202" cy="309" r="8" fill="#B7F000" />
          <circle className="pulse pulse-2" cx="285" cy="234" r="7" fill="#DCE2E8" />
          <circle className="pulse pulse-3" cx="372" cy="144" r="8" fill="#F5F7F8" />
          <circle className="pulse pulse-4" cx="456" cy="169" r="6" fill="#B7F000" />
          <circle className="pulse pulse-5" cx="600" cy="178" r="7" fill="#DCE2E8" />
          <circle className="pulse pulse-6" cx="667" cy="242" r="8" fill="#B7F000" />
          <circle className="pulse pulse-7" cx="515" cy="104" r="7" fill="#F5F7F8" />
        </g>
        <g className="network-labels" fill="#EAF1F4">
          <text x="150" y="84">
            TALLINN
          </text>
          <text x="420" y="78">
            RIGA
          </text>
          <text x="615" y="110">
            VILNIUS
          </text>
        </g>
        <g fill="#8C99A8">
          <text x="210" y="336">
            ESTONIA
          </text>
          <text x="440" y="335">
            LATVIA
          </text>
          <text x="610" y="336">
            LITHUANIA
          </text>
        </g>
        <g fill="#B7F000" fontSize="12" fontWeight="700">
          <text x="350" y="196">
            STATUS
          </text>
        </g>
      </svg>
      <div className="network-stats">
        <div>
          <strong>500+</strong>
          <span>Potential commercial locations</span>
        </div>
        <div className="disclosure">
          Potential locations identified for sourcing and evaluation. Availability is assessed case
          by case.
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div className="service-card">
      <div className="service-topline">
        <span className="service-index">{item.index}</span>
        <span className="service-icon">{item.icon}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="service-link">
        <span>Explore</span>
        <ArrowUpRight size={16} />
      </div>
    </div>
  );
}

function AudiencePanel({
  eyebrow,
  title,
  text,
  examples,
  cta,
  href,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  examples: string[];
  cta: string;
  href: string;
  dark?: boolean;
}) {
  return (
    <div className={`audience-panel ${dark ? "dark" : "light"}`}>
      <div className="panel-node" aria-hidden="true" />
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="example-list">
        {examples.map((example) => (
          <span key={example}>{example}</span>
        ))}
      </div>
      <PrimaryButton href={href}>{cta}</PrimaryButton>
    </div>
  );
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="use-case-card">
      <div className="use-case-graphic" aria-hidden="true">
        <span />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="process-timeline">
      {steps.map((step) => (
        <div className="timeline-item" key={step.number}>
          <div className="timeline-mark">{step.number}</div>
          <div className="timeline-content">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SiteHeader({
  currentPath,
  currentLocale,
  onNavigate,
  onLocaleChange,
}: {
  currentPath: PageKey;
  currentLocale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
  onLocaleChange: (locale: Locale) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  const headerClassName = `site-header ${scrolled ? "scrolled" : ""}`.trim();
  const t = copy[currentLocale].header;
  const nav = (
    <nav className="desktop-nav" aria-label="Main navigation">
      {navItems(currentLocale).map((item) => (
        <a
          key={item.href}
          href={withLocale(item.href, currentLocale)}
          className={currentPath === item.href ? "active" : ""}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(item.href, currentLocale);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".language-selector")) {
        setLanguageOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLanguageOpen(false);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className={headerClassName}>
      <div className="rankly-container header-inner">
        <a
          href={withLocale("/", currentLocale)}
          className="brand-link"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("/", currentLocale);
          }}
          aria-label={t.home}
        >
          <Wordmark compact />
        </a>

        {nav}

        <div className="header-actions">
          <div className="language-selector" aria-label={t.selectLanguage}>
            <button
              type="button"
              className="language-toggle"
              aria-expanded={languageOpen}
              aria-label={t.selectLanguage}
              onClick={() => setLanguageOpen((open) => !open)}
            >
              {localeLabels[currentLocale]}
            </button>
            {languageOpen && (
              <div className="language-menu" role="menu" aria-label={t.selectLanguage}>
                {(Object.keys(localeLabels) as Locale[]).map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    role="menuitemradio"
                    aria-checked={currentLocale === locale}
                    className={currentLocale === locale ? "active" : ""}
                    onClick={() => {
                      setLanguageOpen(false);
                      onLocaleChange(locale);
                    }}
                  >
                    {localeLabels[locale]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <PrimaryButton
            href={withLocale("/contact", currentLocale)}
            onClick={(event) => {
              event.preventDefault();
              onNavigate("/contact", currentLocale);
            }}
          >
            {t.discuss}
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`mobile-panel ${mobileOpen ? "open" : ""} ${prefersReducedMotion ? "reduced" : ""}`}
      >
        <nav aria-label="Mobile navigation">
          {navItems(currentLocale).map((item) => (
            <a
              key={item.href}
              href={withLocale(item.href, currentLocale)}
              className={currentPath === item.href ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.href, currentLocale);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-language-row">
          {(Object.keys(localeLabels) as Locale[]).map((locale) => (
            <button
              key={locale}
              type="button"
              className={currentLocale === locale ? "active" : ""}
              onClick={() => {
                setMobileOpen(false);
                onLocaleChange(locale);
              }}
            >
              {localeLabels[locale]}
            </button>
          ))}
        </div>
        <PrimaryButton
          href={withLocale("/contact", currentLocale)}
          onClick={(event) => {
            event.preventDefault();
            onNavigate("/contact", currentLocale);
          }}
          full
        >
          {t.discuss}
        </PrimaryButton>
      </div>
    </header>
  );
}

function SiteFooter({
  currentLocale,
  onNavigate,
}: {
  currentLocale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
}) {
  const t = copy[currentLocale].footer;
  return (
    <footer className="site-footer">
      <div className="rankly-container footer-grid">
        <div className="footer-brand-block">
          <div className="footer-wordmark">
            <Wordmark compact />
          </div>
          <div className="footer-subtitle">{t.brand}</div>
          <p>Location Sourcing · Market Entry · Lease Negotiation · Local Operations</p>
          <p>Estonia · Latvia · Lithuania</p>
        </div>

        <div className="footer-links">
          <div>
            <h3>{t.navigation}</h3>
            <ul>
              {navItems(currentLocale).map((link) => (
                <li key={link.href}>
                  <a
                    href={withLocale(link.href, currentLocale)}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(link.href, currentLocale);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t.contact}</h3>
            <ul>
              <li>
                <a
                  href={withLocale("/contact", currentLocale)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate("/contact", currentLocale);
                  }}
                >
                  {copy[currentLocale].nav.contact}
                </a>
              </li>
              <li>
                <a
                  href={withLocale("/privacy", currentLocale)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate("/privacy", currentLocale);
                  }}
                >
                  {t.privacyPolicy}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <div className="rankly-container legal-inner">
          <span>{t.legal}</span>
        </div>
      </div>
    </footer>
  );
}

function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale].form;
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const required = values.name.trim() && values.email.trim() && values.message.trim();
    if (!required) {
      setStatus("idle");
      return;
    }
    setStatus("success");
  };

  return (
    <form className="rankly-form" onSubmit={onSubmit} noValidate>
      <div className="field-grid two-up">
        <label>
          <span>{t.name}</span>
          <input
            type="text"
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
            placeholder={
              locale === "lv" ? "Jūsu vārds" : locale === "de" ? "Ihr Name" : "Your name"
            }
            required
          />
        </label>
        <label>
          <span>{t.email}</span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            placeholder="name@company.com"
            required
          />
        </label>
      </div>
      <label>
        <span>{t.message}</span>
        <textarea
          value={values.message}
          onChange={(event) => setValues({ ...values, message: event.target.value })}
          rows={5}
          placeholder={
            locale === "lv"
              ? "Pastāstiet par savu konceptu vai lokāciju."
              : locale === "de"
                ? "Erzählen Sie uns von Ihrem Konzept oder Standort."
                : "Tell us about your concept or location."
          }
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="primary-button">
          <span>{t.sendInquiry}</span>
          <ArrowRight size={16} />
        </button>
      </div>
      {status === "success" && (
        <div className="form-success" role="status" aria-live="polite">
          {t.success}
        </div>
      )}
    </form>
  );
}

function LocationForm({ locale }: { locale: Locale }) {
  const t = copy[locale].form;
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    city: "",
    propertyType: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const required =
      values.name.trim() && values.email.trim() && values.city.trim() && values.propertyType.trim();
    if (!required) return;
    setStatus("success");
  };

  return (
    <form className="rankly-form" onSubmit={onSubmit} noValidate>
      <div className="field-grid two-up">
        <label>
          <span>{t.propertyName}</span>
          <input
            type="text"
            value={values.name}
            onChange={(event) => setValues({ ...values, name: event.target.value })}
            placeholder={
              locale === "lv"
                ? "Īpašuma nosaukums"
                : locale === "de"
                  ? "Immobilienname"
                  : "Property name"
            }
            required
          />
        </label>
        <label>
          <span>{t.email}</span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            placeholder="name@company.com"
            required
          />
        </label>
      </div>
      <div className="field-grid two-up">
        <label>
          <span>{t.city}</span>
          <input
            type="text"
            value={values.city}
            onChange={(event) => setValues({ ...values, city: event.target.value })}
            placeholder={
              locale === "lv"
                ? "Latvija, Rīga"
                : locale === "de"
                  ? "Estland, Tallinn"
                  : "Estonia, Tallinn"
            }
            required
          />
        </label>
        <label>
          <span>{t.propertyType}</span>
          <input
            type="text"
            value={values.propertyType}
            onChange={(event) => setValues({ ...values, propertyType: event.target.value })}
            placeholder={
              locale === "lv"
                ? "Tirdzniecības centrs"
                : locale === "de"
                  ? "Einkaufszentrum"
                  : "Shopping centre"
            }
            required
          />
        </label>
      </div>
      <label>
        <span>{t.message}</span>
        <textarea
          rows={5}
          placeholder={
            locale === "lv"
              ? "Aprakstiet telpu, piekļuvi un paredzēto lietošanas gadījumu."
              : locale === "de"
                ? "Beschreiben Sie den Raum, den Zugang und den vorgesehenen Verwendungszweck."
                : "Describe the space, access and expected use case."
          }
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="primary-button">
          <span>{t.submitLocation}</span>
          <ArrowRight size={16} />
        </button>
      </div>
      {status === "success" && (
        <div className="form-success" role="status" aria-live="polite">
          {t.successLocation}
        </div>
      )}
    </form>
  );
}

function HomePage({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
}) {
  return (
    <>
      <section className="hero-section">
        <div className="rankly-container hero-grid">
          <div className="hero-copy">
            <Eyebrow>{copy[locale].home.eyebrow}</Eyebrow>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {copy[locale].home.heroTitle}
            </motion.h1>
            <p>{copy[locale].home.heroBody}</p>
            <div className="geo-label">{copy[locale].home.geography}</div>
            <div className="cta-row">
              <PrimaryButton
                href={withLocale("/contact", locale)}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/contact", locale);
                }}
              >
                {copy[locale].home.primaryCta}
              </PrimaryButton>
              <SecondaryButton
                href={withLocale("/property-owners", locale)}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate("/property-owners", locale);
                }}
              >
                {copy[locale].home.secondaryCta}
              </SecondaryButton>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <NetworkVisual />
          </div>
        </div>
      </section>

      <div className="rankly-container">
        <MetricStrip />
      </div>

      <section className="section-light">
        <div className="rankly-container intro-block">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].home.modelEyebrow}
              title={copy[locale].home.modelTitle}
              intro={copy[locale].home.modelBody}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <div className="model-diagram" aria-label="Location agreement launch operations flow">
              <span>LOCATION</span>
              <ChevronRight size={18} />
              <span>AGREEMENT</span>
              <ChevronRight size={18} />
              <span>LAUNCH</span>
              <ChevronRight size={18} />
              <span>OPERATIONS</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-dark">
        <div className="rankly-container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].home.whatWeDo}
              title={copy[locale].home.whatWeDoTitle}
              intro=""
              align="left"
            />
          </RevealOnScroll>
          <div className="service-grid">
            {serviceItems.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.06}>
                <ServiceCard item={item} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="panel-section">
        <div className="rankly-container audience-grid">
          <RevealOnScroll>
            <AudiencePanel
              eyebrow={copy[locale].home.operatorsEyebrow}
              title={copy[locale].home.operatorsTitle}
              text={copy[locale].home.operatorsBody}
              examples={[
                "Vending",
                "Automated retail",
                "EV charging",
                "Advertising",
                "Pop-up concepts",
              ]}
              cta={copy[locale].home.primaryCta}
              href={withLocale("/contact", locale)}
              dark
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <AudiencePanel
              eyebrow={copy[locale].home.propertyEyebrow}
              title={copy[locale].home.propertyTitle}
              text={copy[locale].home.propertyBody}
              examples={[
                "Shopping centres",
                "Stations",
                "Offices",
                "Sports clubs",
                "Logistics",
                "Fuel stations",
              ]}
              cta={copy[locale].home.secondaryCta}
              href={withLocale("/property-owners", locale)}
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-dark network-section">
        <div className="rankly-container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].home.networkEyebrow}
              title={copy[locale].home.networkTitle}
              intro={copy[locale].home.networkBody}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <div className="filter-bar" aria-label="Location types filter controls">
              <span className="active">ALL LOCATIONS</span>
              <span>RETAIL</span>
              <span>TRANSPORT</span>
              <span>OFFICE</span>
              <span>SPORTS</span>
              <span>LOGISTICS</span>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <div className="network-map-box">
              <div className="network-map-grid" aria-hidden="true">
                <span className="map-label map-estonia">ESTONIA</span>
                <span className="map-label map-latvia">LATVIA</span>
                <span className="map-label map-lithuania">LITHUANIA</span>
                <span className="map-node node-a" />
                <span className="map-node node-b" />
                <span className="map-node node-c" />
                <span className="map-node node-d" />
                <span className="map-node node-e" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow=""
              title={
                locale === "lv"
                  ? "Dažādi formāti. Viena lokāciju partnere."
                  : locale === "de"
                    ? "Verschiedene Formate. Ein Standortpartner."
                    : "Different formats. One location partner."
              }
              align="center"
            />
          </RevealOnScroll>
          <div className="use-case-grid">
            {useCases.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.04}>
                <UseCaseCard title={item.title} description={item.description} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-process">
        <div className="rankly-container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].nav.howItWorks.toUpperCase()}
              title={
                locale === "lv"
                  ? "Skaidrs ceļš no prasības līdz darbībai."
                  : locale === "de"
                    ? "Ein klarer Weg von der Anforderung bis zum Betrieb."
                    : "A clear route from requirement to operation."
              }
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <ProcessTimeline steps={processSteps} />
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-light why-rankly">
        <div className="rankly-container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={
                locale === "lv" ? "KAPĒC RANKLY" : locale === "de" ? "WARUM RANKLY" : "WHY RANKLY"
              }
              title={
                locale === "lv"
                  ? "Viens vietējais koordinācijas punkts. Daudzas komercvides."
                  : locale === "de"
                    ? "Ein lokaler Koordinationspunkt. Mehrere gewerbliche Umgebungen."
                    : "One local coordination point. Multiple commercial environments."
              }
            />
          </RevealOnScroll>
          <div className="why-grid">
            {whyGrid.map((item, index) => (
              <RevealOnScroll key={item} delay={index * 0.04}>
                <div className="why-item">
                  <div className="why-marker">
                    <CircleDot size={12} />
                  </div>
                  <span>{item}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="rankly-container cta-band-inner">
          <div>
            <h2>
              {locale === "lv"
                ? "Vai jums ir jāaktivizē lokācija vai jāuzsāk koncepts?"
                : locale === "de"
                  ? "Haben Sie einen Standort zu aktivieren oder ein Konzept zu starten?"
                  : "Have a location to activate or a concept to launch?"}
            </h2>
            <p>
              {locale === "lv"
                ? "Sāciet ar prasību. Mēs palīdzēsim definēt nākamo komerciālo soli."
                : locale === "de"
                  ? "Starten Sie mit der Anforderung. Wir helfen Ihnen, den nächsten kommerziellen Schritt zu definieren."
                  : "Start with the requirement. We will help define the next commercial step."}
            </p>
          </div>
          <div className="cta-row">
            <PrimaryButton
              href={withLocale("/contact", locale)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/contact", locale);
              }}
            >
              {copy[locale].home.primaryCta}
            </PrimaryButton>
            <SecondaryButton
              href={withLocale("/property-owners", locale)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate("/property-owners", locale);
              }}
            >
              {copy[locale].home.secondaryCta}
            </SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}

function OperatorsPage({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
}) {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="rankly-container narrow">
          <Eyebrow>{copy[locale].pages.operators.eyebrow}</Eyebrow>
          <h1>{copy[locale].pages.operators.title}</h1>
          <p>{copy[locale].pages.operators.intro}</p>
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container split-page">
          <RevealOnScroll>
            <div className="info-column">
              <Eyebrow>{copy[locale].pages.operators.who}</Eyebrow>
              <h2>{copy[locale].pages.operators.whoTitle}</h2>
              <ul className="check-list">
                <li>Vending and automated retail</li>
                <li>EV charging and infrastructure</li>
                <li>Advertising networks</li>
                <li>Pop-up retail concepts</li>
              </ul>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.06}>
            <div className="info-column">
              <Eyebrow>{copy[locale].pages.operators.info}</Eyebrow>
              <h2>{copy[locale].pages.operators.infoTitle}</h2>
              <ul className="check-list">
                <li>Company name</li>
                <li>Concept or equipment type</li>
                <li>Target countries and required location types</li>
                <li>Technical requirements and location count</li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-dark">
        <div className="rankly-container narrow">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.operators.process}
              title={copy[locale].pages.operators.processTitle}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <ProcessTimeline
              steps={[
                {
                  number: "01",
                  title: "Scope the requirement",
                  description: "Define format, area, technical conditions and launch objectives.",
                },
                {
                  number: "02",
                  title: "Source options",
                  description:
                    "Identify potential environments across Estonia, Latvia and Lithuania.",
                },
                {
                  number: "03",
                  title: "Review suitability",
                  description:
                    "Assess visibility, access, power, customer flow and commercial fit.",
                },
                {
                  number: "04",
                  title: "Coordinate next steps",
                  description: "Support presentation, discussions and agreement preparation.",
                },
                {
                  number: "05",
                  title: "Support launch",
                  description: "Prepare the operational handover and local coordination plan.",
                },
              ]}
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container narrow">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.operators.after}
              title={copy[locale].pages.operators.afterTitle}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <div className="timeline-summary">
              <div>
                <Sparkles size={18} />
                <span>Location review and commercial fit discussion</span>
              </div>
              <div>
                <Check size={18} />
                <span>Local implementation and coordination support</span>
              </div>
              <div>
                <Building2 size={18} />
                <span>Operational launch and ongoing local requirements</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-form">
        <div className="rankly-container narrow form-wrapper">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.operators.qual}
              title={copy[locale].pages.operators.qualTitle}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <ContactForm locale={locale} />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

function PropertyOwnersPage({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
}) {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="rankly-container narrow">
          <Eyebrow>{copy[locale].pages.propertyOwners.eyebrow}</Eyebrow>
          <h1>{copy[locale].pages.propertyOwners.title}</h1>
          <p>{copy[locale].pages.propertyOwners.intro}</p>
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container split-page">
          <RevealOnScroll>
            <div className="info-column">
              <Eyebrow>{copy[locale].pages.propertyOwners.suitable}</Eyebrow>
              <h2>{copy[locale].pages.propertyOwners.suitableTitle}</h2>
              <ul className="check-list">
                <li>Shopping centres</li>
                <li>Transport hubs</li>
                <li>Offices and mixed-use spaces</li>
                <li>Sports clubs and logistics centres</li>
              </ul>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.06}>
            <div className="info-column">
              <Eyebrow>{copy[locale].pages.propertyOwners.useful}</Eyebrow>
              <h2>{copy[locale].pages.propertyOwners.usefulTitle}</h2>
              <ul className="check-list">
                <li>Footfall and customer access</li>
                <li>Power and technical conditions</li>
                <li>Open hours and operational access</li>
                <li>Potential format suitability</li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-dark">
        <div className="rankly-container narrow">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.propertyOwners.evaluation}
              title={copy[locale].pages.propertyOwners.evaluationTitle}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <div className="timeline-summary">
              <div>
                <MapPinned size={18} />
                <span>Potential use case and geographic fit review</span>
              </div>
              <div>
                <Factory size={18} />
                <span>Operational and technical suitability check</span>
              </div>
              <div>
                <ShieldCheck size={18} />
                <span>Commercial terms reviewed case by case</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container narrow">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.propertyOwners.coordination}
              title={copy[locale].pages.propertyOwners.coordinationTitle}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <div className="timeline-summary">
              <div>
                <Check size={18} />
                <span>Initial screening and fit review</span>
              </div>
              <div>
                <ArrowRight size={18} />
                <span>Operator introductions and discussion support</span>
              </div>
              <div>
                <CircleDot size={18} />
                <span>Operational coordination for launch planning</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-form">
        <div className="rankly-container narrow form-wrapper">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.propertyOwners.submit}
              title={copy[locale].pages.propertyOwners.submitTitle}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <LocationForm locale={locale} />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

function HowItWorksPage({ locale }: { locale: Locale }) {
  const evaluationItems = [
    "Geographic fit",
    "Customer flow and visibility",
    "Physical access",
    "Power and technical conditions",
    "Operating access",
    "Commercial terms",
    "Maintenance requirements",
    "Format suitability",
  ];

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="rankly-container narrow">
          <Eyebrow>{copy[locale].pages.howItWorks.eyebrow}</Eyebrow>
          <h1>{copy[locale].pages.howItWorks.title}</h1>
        </div>
      </section>

      <section className="section-dark">
        <div className="rankly-container narrow">
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container narrow">
          <RevealOnScroll>
            <SectionHeader
              eyebrow={copy[locale].pages.howItWorks.evalTitle}
              title={copy[locale].pages.howItWorks.evalBody}
            />
          </RevealOnScroll>
          <div className="tag-list">
            {evaluationItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="evaluation-note">{copy[locale].pages.howItWorks.note}</p>
        </div>
      </section>
    </div>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="rankly-container narrow">
          <Eyebrow>{copy[locale].pages.contact.eyebrow}</Eyebrow>
          <h1>{copy[locale].pages.contact.title}</h1>
        </div>
      </section>

      <section className="section-light">
        <div className="rankly-container contact-grid">
          <RevealOnScroll>
            <div className="contact-card">
              <Eyebrow>{copy[locale].pages.contact.expand}</Eyebrow>
              <h2>{copy[locale].pages.contact.expandTitle}</h2>
              <p>{copy[locale].pages.contact.expandBody}</p>
              <ContactForm locale={locale} />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <div className="contact-card">
              <Eyebrow>{copy[locale].pages.contact.location}</Eyebrow>
              <h2>{copy[locale].pages.contact.locationTitle}</h2>
              <p>{copy[locale].pages.contact.locationBody}</p>
              <LocationForm locale={locale} />
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}

function PrivacyPage({ locale }: { locale: Locale }) {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="rankly-container narrow">
          <Eyebrow>{copy[locale].pages.privacy.eyebrow}</Eyebrow>
          <h1>{copy[locale].pages.privacy.title}</h1>
          <p>{copy[locale].pages.privacy.intro}</p>
        </div>
      </section>
    </div>
  );
}

export function RanklyApp() {
  const [route, setRoute] = useState<{ locale: Locale; page: PageKey }>(() => getInitialPath());

  const navigate = useCallback(
    (path: PageKey, localeOverride?: Locale) => {
      const nextLocale = localeOverride ?? route.locale;
      setRoute({ locale: nextLocale, page: path });
      window.history.pushState({}, "", withLocale(path, nextLocale));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [route.locale],
  );

  const changeLocale = useCallback(
    (nextLocale: Locale) => {
      setRoute((current) => ({
        locale: nextLocale,
        page: current.page,
      }));
      window.history.pushState({}, "", withLocale(route.page, nextLocale));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [route.page],
  );

  useEffect(() => {
    const onPopState = () => setRoute(getInitialPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const pageContent = useMemo(() => {
    switch (route.page) {
      case "/operators":
        return <OperatorsPage locale={route.locale} onNavigate={navigate} />;
      case "/property-owners":
        return <PropertyOwnersPage locale={route.locale} onNavigate={navigate} />;
      case "/how-it-works":
        return <HowItWorksPage locale={route.locale} />;
      case "/contact":
        return <ContactPage locale={route.locale} />;
      case "/privacy":
        return <PrivacyPage locale={route.locale} />;
      default:
        return <HomePage locale={route.locale} onNavigate={navigate} />;
    }
  }, [route]);

  return (
    <div className="rankly-shell">
      <SiteHeader
        currentPath={route.page}
        currentLocale={route.locale}
        onNavigate={navigate}
        onLocaleChange={changeLocale}
      />
      <main>{pageContent}</main>
      <SiteFooter currentLocale={route.locale} onNavigate={navigate} />
    </div>
  );
}
