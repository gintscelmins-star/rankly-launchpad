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

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type OpportunityStat = {
  id: string;
  label: string;
  value: string | null;
  verified: boolean;
  source?: string;
  referenceDate?: string;
};

const opportunityStats: Record<Locale, OpportunityStat[]> = {
  en: [
    { id: "airports", label: "INTERNATIONAL AIRPORTS", value: null, verified: false },
    {
      id: "shopping",
      label: "LARGE SHOPPING CENTRES",
      value: "~50",
      verified: true,
      source: "User-provided indicative estimate",
      referenceDate: "2026-08-25",
    },
    {
      id: "gyms",
      label: "GYMS / SPORTS CLUBS",
      value: "~1,000",
      verified: true,
      source: "User-provided indicative estimate",
      referenceDate: "2026-08-25",
    },
    {
      id: "business",
      label: "BUSINESS CENTRES",
      value: "~330",
      verified: true,
      source: "User-provided indicative estimate",
      referenceDate: "2026-08-25",
    },
  ],
  lv: [
    { id: "airports", label: "STARPTAUTISKĀS LIDOSTAS", value: null, verified: false },
    {
      id: "shopping",
      label: "LIELIE TIRDZNIECĪBAS CENTRI",
      value: "~50",
      verified: true,
      source: "Lietotāja sniegts orientējošs aprēķins",
      referenceDate: "2026-08-25",
    },
    {
      id: "gyms",
      label: "SPORTA ZĀLES / KLUBI",
      value: "~1 000",
      verified: true,
      source: "Lietotāja sniegts orientējošs aprēķins",
      referenceDate: "2026-08-25",
    },
    {
      id: "business",
      label: "BIZNESA CENTRI",
      value: "~330",
      verified: true,
      source: "Lietotāja sniegts orientējošs aprēķins",
      referenceDate: "2026-08-25",
    },
  ],
  de: [
    { id: "airports", label: "INTERNATIONALE FLUGHÄFEN", value: null, verified: false },
    {
      id: "shopping",
      label: "GROSSE EINKAUFSZENTREN",
      value: "~50",
      verified: true,
      source: "Vom Nutzer bereitgestellte indikative Schätzung",
      referenceDate: "2026-08-25",
    },
    {
      id: "gyms",
      label: "FITNESSSTUDIOS / SPORTVEREINE",
      value: "~1.000",
      verified: true,
      source: "Vom Nutzer bereitgestellte indikative Schätzung",
      referenceDate: "2026-08-25",
    },
    {
      id: "business",
      label: "BÜRO- UND GESCHÄFTSZENTREN",
      value: "~330",
      verified: true,
      source: "Vom Nutzer bereitgestellte indikative Schätzung",
      referenceDate: "2026-08-25",
    },
  ],
};

const supportedLocales = ["en", "lv", "de"] as const;
const defaultLocale: Locale = "en";

const proofMetrics = {
  balticPopulation: {
    value: "~6.1M",
    verified: true,
    source: "Eurostat demo_pjan, total population by country (EE/LV/LT)",
    referenceDate: "2025-01-01",
  },
  placementOpportunities: {
    value: "2,000+",
    verified: false,
  },
} as const;

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
      heroTitle: "Your gateway to commercial locations in Europe and the Baltics.",
      heroBody:
        "Rankly helps businesses find, secure and operate commercial locations for automated retail, vending, massage chairs, EV charging, advertising, pop-up retail and other commercial concepts.",
      geography: "ESTONIA · LATVIA · LITHUANIA",
      primaryCta: "Discuss your expansion",
      secondaryCta: "Submit a location",
      networkLabel: "BALTIC COMMERCIAL OPPORTUNITIES",
      networkDisclosure:
        "Illustrative regional coverage. Specific opportunities are evaluated case by case.",
      populationLabel: "BALTIC POPULATION",
      potentialLocationsLabel: "POTENTIAL LOCATIONS",
      opportunityTitle: "Enter the Baltic market through the right commercial locations.",
      opportunityBody:
        "We help operators identify potential sites and coordinate the path from first opportunity to local launch.",
      regionalAccess: "REGIONAL ACCESS",
      mapCaption: "Illustrative regional coverage",
      potentialOpportunities: "POTENTIAL OPPORTUNITIES",
      offerLine: "LOCATION SOURCING  ·  LEASE COORDINATION  ·  LOCAL OPERATIONS",
      qualificationNote:
        "Potential opportunities are identified for sourcing and evaluation. Final availability depends on the location and commercial agreement.",
      objectsHeading: "POTENTIAL OBJECTS ACROSS THE BALTICS",
      objectsQualification:
        "Figures are indicative categories for sourcing, not confirmed availability.",
      potentialSites: "Potential sites",
      alertEyebrow: "CURRENT EUROPEAN SOURCING REQUEST",
      alertTitle: "European locations wanted for massage chairs.",
      alertSubheadline: "Help bring self-service massage chairs to high-footfall locations.",
      alertBody:
        "We are currently helping Baltic massage-chair operators identify potential locations across Europe. At the same time, Rankly supports many other commercial concepts looking for suitable locations.",
      alertHeading: "Two sides of the same opportunity.",
      ownerOffer: "Have underused commercial space in Europe or the Baltics?",
      ownerAction: "Submit a potential location",
      operatorOffer: "Looking for locations for your next commercial concept?",
      operatorAction: "Discuss your expansion",
      campaignOperatorLabel: "MASSAGE-CHAIR OPERATORS",
      ownerOfferDetail:
        "Provide unused space. We coordinate the initial opportunity review with the relevant operator.",
      operatorOfferDetail:
        "Tell us your target countries, preferred location types and technical requirements. We help structure the search and local coordination.",
      alertNow: "NOW SOURCING EUROPEAN LOCATIONS",
      alertQualification:
        "This is an active sourcing request. Placement, commercial terms and final availability are evaluated case by case.",
      positioning:
        "Rankly helps businesses find, secure and operate commercial locations across Europe and the Baltics.",
      positioningDetail:
        "We work with operators across automated retail, vending, massage chairs, EV charging, advertising, pop-up retail and other commercial concepts.",
      directionA: "Baltic operators → European locations",
      directionB: "European opportunities → Commercial operators",
      intent: "What are you looking for?",
      generalConcept: "General commercial concept",
      massageChairs: "Massage chairs",
      propertyIntent: "Property owner / available space",
      otherIntent: "Other",
      modelEyebrow: "THE RANKLY MODEL",
      modelTitle: "Commercial space becomes valuable only when it is operational.",
      modelBody:
        "We connect property owners with expansion-focused businesses and coordinate the commercial and operational steps required to turn an opportunity into a functioning site.",
      operatorsEyebrow: "FOR OPERATORS & BRANDS",
      operatorsTitle: "Enter the Baltics without rebuilding the local process from scratch.",
      operatorsBody:
        "Tell us what you want to deploy, where you want to operate, and what the site must support. We help identify and coordinate relevant opportunities.",
      propertyEyebrow: "FOR PROPERTY OWNERS",
      propertyTitle: "Turn underused commercial space into a productive opportunity.",
      propertyBody:
        "Submit a site for potential vending, advertising, pop-up retail, or infrastructure use. Suitability and commercial terms are assessed individually.",
      broadOperatorEyebrow: "FOR OPERATORS AND COMMERCIAL CONCEPTS",
      broadOperatorTitle: "Looking for locations for your next commercial concept?",
      broadOperatorBody:
        "Tell us what you operate, where you want to expand and what the location must support. Rankly helps structure the search, evaluate potential opportunities and coordinate local commercial discussions.",
      broadPropertyTitle: "Have underused commercial space in Europe or the Baltics?",
      broadPropertyBody:
        "Rankly helps property owners evaluate potential uses for underused space and connect with suitable commercial operators.",
      categories: [
        "Automated retail",
        "Vending",
        "Massage chairs",
        "EV charging",
        "Advertising",
        "Pop-up retail",
        "Commercial services",
      ],
    },
    form: {
      name: "Name",
      intent: "What are you looking for?",
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
      contactPerson: "Contact person",
      country: "Country",
      availableArea: "Available area",
      setting: "Indoor / outdoor",
      electricity: "Electricity available",
      accessInfo: "Customer traffic or access information",
      photosLink: "Photos or location link",
      operatingCountries: "Current operating countries",
      targetCountries: "Target European countries",
      preferredTypes: "Preferred location types",
      desiredLocations: "Number of desired locations",
      chairDimensions: "Chair dimensions",
      powerRequirements: "Power requirements",
      serviceModel: "Maintenance / service model",
      installationTimeline: "Installation timeline",
      businessType: "Business or concept type",
      requiredTypes: "Required location types",
      technicalRequirements: "Technical requirements",
      timeline: "Timeline",
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
          "Rankly helps operators identify relevant locations, coordinate commercial discussions, and support local implementation.",
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
          "Submit a potential site for evaluation by operators seeking commercial space across the Baltics.",
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
          "We process contact and site information for commercial evaluation and coordination. This placeholder policy outlines the intended use of data and should be replaced with the final legal version before launch.",
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
      heroTitle: "Tavs piekļuves punkts komerciālajām lokācijām Eiropā un Baltijā.",
      heroBody:
        "Rankly palīdz uzņēmumiem atrast, nodrošināt un pārvaldīt komerciālās lokācijas automatizētai mazumtirdzniecībai, vending, masāžas krēsliem, EV uzlādei, reklāmai, pop-up tirdzniecībai un citiem komerciāliem konceptiem.",
      geography: "IGAUNIJA · LATVIJA · LIETUVA",
      primaryCta: "Pārrunāt paplašināšanos",
      secondaryCta: "Pieteikt lokāciju",
      networkLabel: "BALTIJAS KOMERCIĀLĀS IESPĒJAS",
      networkDisclosure:
        "Ilustratīvs reģiona pārklājums. Konkrētas iespējas tiek izvērtētas katrā gadījumā atsevišķi.",
      populationLabel: "BALTIJAS IEDZĪVOTĀJI",
      potentialLocationsLabel: "POTENCIĀLĀS LOKĀCIJAS",
      opportunityTitle: "Ienāc Baltijas tirgū caur īstajām komerciālajām lokācijām.",
      opportunityBody:
        "Mēs palīdzam operatoriem identificēt potenciālās vietas un koordinējam procesu no pirmās iespējas līdz darbības uzsākšanai.",
      regionalAccess: "REĢIONĀLĀ PIEEJAMĪBA",
      mapCaption: "Ilustratīvs reģiona pārklājums",
      potentialOpportunities: "POTENCIĀLĀS IESPĒJAS",
      offerLine: "LOKĀCIJU ATLASE  ·  NOMAS KOORDINĒŠANA  ·  VIETĒJĀ DARBĪBA",
      qualificationNote:
        "Potenciālās iespējas tiek identificētas atlasei un izvērtēšanai. Galīgā pieejamība ir atkarīga no lokācijas un komerciālās vienošanās.",
      objectsHeading: "IESPĒJAMIE OBJEKTI BALTIJĀ KOPĀ",
      objectsQualification:
        "Skaitļi ir orientējoši atlases kategoriju apjomi, nevis apstiprināta pieejamība.",
      potentialSites: "Potenciālie objekti",
      alertEyebrow: "AKTUĀLS LOKĀCIJU ATLASES PIEPRASĪJUMS EIROPĀ",
      alertTitle: "Eiropā meklējam lokācijas masāžas krēsliem.",
      alertSubheadline:
        "Palīdziet izvietot pašapkalpošanās masāžas krēslus vietās ar lielu cilvēku plūsmu.",
      alertBody:
        "Pašlaik palīdzam Baltijas masāžas krēslu operatoriem atrast potenciālas lokācijas Eiropā. Vienlaikus Rankly atbalsta arī citus komerciālos konceptus, kas meklē piemērotas lokācijas.",
      alertHeading: "Divas vienas iespējas puses.",
      ownerOffer: "Vai jums Eiropā vai Baltijā ir nepietiekami izmantota komerctelpa?",
      ownerAction: "Piesakiet potenciālo lokāciju",
      operatorOffer: "Meklē lokācijas savam nākamajam komerciālajam konceptam?",
      operatorAction: "Pārrunājiet paplašināšanos",
      campaignOperatorLabel: "MASĀŽAS KRĒSLU OPERATORI",
      ownerOfferDetail:
        "Piedāvājiet neizmantotu platību. Mēs koordinēsim sākotnējo iespējas izvērtēšanu ar attiecīgo operatoru.",
      operatorOfferDetail:
        "Pastāstiet par mērķa valstīm, vēlamajiem objektu veidiem un tehniskajām prasībām. Mēs palīdzēsim strukturēt atlasi un vietējo koordinēšanu.",
      alertNow: "PAŠLAIK MEKLĒJAM LOKĀCIJAS EIROPĀ",
      alertQualification:
        "Šis ir aktīvs lokāciju atlases pieprasījums. Izvietošana, komerciālie nosacījumi un galīgā pieejamība tiek izvērtēti katrā gadījumā atsevišķi.",
      positioning:
        "Rankly palīdz uzņēmumiem atrast, nodrošināt un pārvaldīt komerciālās lokācijas Eiropā un Baltijā.",
      positioningDetail:
        "Mēs strādājam ar automatizētās mazumtirdzniecības, vending, masāžas krēslu, EV uzlādes, reklāmas, pop-up tirdzniecības un citu komerciālo konceptu operatoriem.",
      directionA: "Baltijas operatori → Eiropas lokācijas",
      directionB: "Eiropas iespējas → Komerciālie operatori",
      intent: "Ko jūs meklējat?",
      generalConcept: "Vispārīgs komerciāls koncepts",
      massageChairs: "Masāžas krēsli",
      propertyIntent: "Īpašnieks / pieejama telpa",
      otherIntent: "Cits",
      modelEyebrow: "RANKLY MODELIS",
      modelTitle: "Komerctelpa kļūst vērtīga tikai tad, kad tā darbojas.",
      modelBody:
        "Mēs savienojam īpašniekus ar uzņēmumiem, kuri plāno paplašināties, un koordinējam komerc- un operacionālos soļus no iespējas līdz funkcionējošai vietai.",
      operatorsEyebrow: "OPERATORIEM UN ZĪMOLIEM",
      operatorsTitle: "Ienesiet savu konceptu Baltijā, neizveidojot vietējo procesu no nulles.",
      operatorsBody:
        "Pastāstiet, ko vēlaties izvietot, kur plānojat darboties un kādas prasības jāatbilst vietai. Mēs palīdzam identificēt un koordinēt potenciālās iespējas.",
      propertyEyebrow: "ĪPAŠNIEKIEM",
      propertyTitle: "Padariet neizmantoto komercvietu produktīvu.",
      propertyBody:
        "Piesniedziet vietu potenciālai tirdzniecībai, reklāmai, pagaidu veikalam vai infrastruktūras izmantošanai. Piemērotība un komerciālie nosacījumi tiek vērtēti individuāli.",
      broadOperatorEyebrow: "OPERATORIEM UN KOMERCIĀLIEM KONCEPTIEM",
      broadOperatorTitle: "Meklē lokācijas savam nākamajam komerciālajam konceptam?",
      broadOperatorBody:
        "Pastāsti, ko tu pārvaldi, kur vēlies paplašināties un kādām prasībām lokācijai jāatbilst. Rankly palīdz strukturēt meklēšanu, izvērtēt potenciālās iespējas un koordinēt vietējās komerciālās pārrunas.",
      broadPropertyTitle: "Vai jums Eiropā vai Baltijā ir nepietiekami izmantota komerctelpa?",
      broadPropertyBody:
        "Rankly palīdz īpašniekiem izvērtēt nepietiekami izmantotas telpas potenciālo izmantošanu un savienot tās ar piemērotiem komerciālajiem operatoriem.",
      categories: [
        "Automatizētā mazumtirdzniecība",
        "Vending",
        "Masāžas krēsli",
        "EV uzlāde",
        "Reklāma",
        "Pop-up tirdzniecība",
        "Komerciālie pakalpojumi",
      ],
    },
    form: {
      name: "Vārds",
      intent: "Ko jūs meklējat?",
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
      contactPerson: "Kontaktpersona",
      country: "Valsts",
      availableArea: "Pieejamā platība",
      setting: "Iekštelpās / ārā",
      electricity: "Pieejama elektrība",
      accessInfo: "Apmeklētāju plūsma vai piekļuve",
      photosLink: "Fotoattēli vai lokācijas saite",
      operatingCountries: "Pašreizējās darbības valstis",
      targetCountries: "Mērķa valstis Eiropā",
      preferredTypes: "Vēlamie objektu veidi",
      desiredLocations: "Vēlamo lokāciju skaits",
      chairDimensions: "Krēsla izmēri",
      powerRequirements: "Elektroenerģijas prasības",
      serviceModel: "Apkopes / servisa modelis",
      installationTimeline: "Uzstādīšanas termiņš",
      businessType: "Biznesa vai koncepta veids",
      requiredTypes: "Nepieciešamie objektu veidi",
      technicalRequirements: "Tehniskās prasības",
      timeline: "Termiņš",
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
      heroTitle: "Ihr Zugang zu gewerblichen Standorten in Europa und im Baltikum.",
      heroBody:
        "Rankly unterstützt Unternehmen dabei, gewerbliche Standorte für automatisierten Einzelhandel, Vending, Massagesessel, EV-Ladestationen, Werbung, Pop-up-Handel und andere kommerzielle Konzepte zu finden, zu sichern und zu betreiben.",
      geography: "ESTLAND · LETTLAND · LITAUEN",
      primaryCta: "Expansion besprechen",
      secondaryCta: "Standort einreichen",
      networkLabel: "GEWERBLICHE CHANCEN IM BALTIKUM",
      networkDisclosure:
        "Illustrative regionale Abdeckung. Konkrete Möglichkeiten werden im Einzelfall geprüft.",
      populationLabel: "BEVÖLKERUNG DES BALTIKUMS",
      potentialLocationsLabel: "POTENZIELLE STANDORTE",
      opportunityTitle:
        "Erschließen Sie den baltischen Markt über die richtigen gewerblichen Standorte.",
      opportunityBody:
        "Wir unterstützen Betreiber dabei, potenzielle Standorte zu identifizieren und den Weg von der ersten Chance bis zum lokalen Start zu koordinieren.",
      regionalAccess: "REGIONALER ZUGANG",
      mapCaption: "Illustrative regionale Abdeckung",
      potentialOpportunities: "POTENZIELLE MÖGLICHKEITEN",
      offerLine: "STANDORTSUCHE  ·  MIETKOORDINATION  ·  LOKALER BETRIEB",
      qualificationNote:
        "Potenzielle Möglichkeiten werden zur Suche und Bewertung identifiziert. Die endgültige Verfügbarkeit hängt vom Standort und der kommerziellen Vereinbarung ab.",
      objectsHeading: "POTENZIELLE OBJEKTE IM BALTIKUM",
      objectsQualification:
        "Die Zahlen sind indikative Suchkategorien und keine bestätigte Verfügbarkeit.",
      potentialSites: "Potenzielle Objekte",
      alertEyebrow: "AKTUELLE STANDORTANFRAGE FÜR EUROPA",
      alertTitle: "Europäische Standorte für Massagesessel gesucht.",
      alertSubheadline:
        "Helfen Sie dabei, Selbstbedienungs-Massagesessel an stark frequentierten Standorten zu platzieren.",
      alertBody:
        "Derzeit unterstützen wir baltische Betreiber von Massagesesseln bei der Suche nach potenziellen Standorten in Europa. Gleichzeitig unterstützt Rankly auch andere kommerzielle Konzepte bei der Suche nach geeigneten Standorten.",
      alertHeading: "Zwei Seiten derselben Chance.",
      ownerOffer: "Haben Sie ungenutzte Gewerbeflächen in Europa oder im Baltikum?",
      ownerAction: "Reichen Sie einen potenziellen Standort ein",
      operatorOffer: "Suchen Sie Standorte für Ihr nächstes kommerzielles Konzept?",
      operatorAction: "Besprechen Sie Ihre Expansion",
      campaignOperatorLabel: "BETREIBER VON MASSAGESESSELN",
      ownerOfferDetail:
        "Stellen Sie ungenutzte Flächen vor. Wir koordinieren die erste Prüfung der Möglichkeit mit dem jeweiligen Betreiber.",
      operatorOfferDetail:
        "Teilen Sie uns Ihre Zielländer, bevorzugten Standorttypen und technischen Anforderungen mit. Wir unterstützen bei der strukturierten Suche und lokalen Koordination.",
      alertNow: "JETZT EUROPÄISCHE STANDORTE GESUCHT",
      alertQualification:
        "Dies ist eine aktuelle Standortanfrage. Platzierung, kommerzielle Bedingungen und endgültige Verfügbarkeit werden im Einzelfall geprüft.",
      positioning:
        "Rankly unterstützt Unternehmen dabei, gewerbliche Standorte in Europa und im Baltikum zu finden, zu sichern und zu betreiben.",
      positioningDetail:
        "Wir arbeiten mit Betreibern aus den Bereichen automatisierter Einzelhandel, Vending, Massagesessel, EV-Ladestationen, Werbung, Pop-up-Handel und anderen kommerziellen Konzepten.",
      directionA: "Baltische Betreiber → Europäische Standorte",
      directionB: "Europäische Chancen → Kommerzielle Betreiber",
      intent: "Wonach suchen Sie?",
      generalConcept: "Allgemeines kommerzielles Konzept",
      massageChairs: "Massagesessel",
      propertyIntent: "Immobilieneigentümer / verfügbare Fläche",
      otherIntent: "Andere",
      modelEyebrow: "DAS RANKLY-MODELL",
      modelTitle: "Gewerbeflächen werden erst wertvoll, wenn sie genutzt werden.",
      modelBody:
        "Wir verbinden Eigentümer mit Unternehmen, die expandieren möchten, und koordinieren die kommerziellen und operativen Schritte von der ersten Chance bis zur funktionsfähigen Fläche.",
      operatorsEyebrow: "FÜR OPERATOREN & MARKEN",
      operatorsTitle:
        "Starten Sie im Baltikum, ohne den lokalen Prozess von Grund auf neu aufzubauen.",
      operatorsBody:
        "Erzählen Sie uns, was Sie einsetzen möchten, wo Sie tätig werden und welche Anforderungen der Standort erfüllen muss. Wir helfen bei der Identifizierung und Koordination potenzieller Standorte.",
      propertyEyebrow: "FÜR EIGENTÜMER",
      propertyTitle: "Machen Sie ungenutzte Gewerbeflächen produktiv.",
      propertyBody:
        "Reichen Sie einen Standort für potenzielle Vending-, Werbe-, Pop-up- oder Infrastrukturnutzung ein. Eignung und kommerzielle Bedingungen werden individuell bewertet.",
      broadOperatorEyebrow: "FÜR BETREIBER UND KOMMERZIELLE KONZEPTE",
      broadOperatorTitle: "Suchen Sie Standorte für Ihr nächstes kommerzielles Konzept?",
      broadOperatorBody:
        "Teilen Sie uns mit, was Sie betreiben, wohin Sie expandieren möchten und welche Anforderungen der Standort erfüllen muss. Rankly unterstützt bei der strukturierten Suche, der Bewertung potenzieller Möglichkeiten und der Koordination lokaler kommerzieller Gespräche.",
      broadPropertyTitle: "Haben Sie ungenutzte Gewerbeflächen in Europa oder im Baltikum?",
      broadPropertyBody:
        "Rankly unterstützt Immobilieneigentümer bei der Bewertung möglicher Nutzungen ungenutzter Flächen und bringt sie mit geeigneten kommerziellen Betreibern zusammen.",
      categories: [
        "Automatisierter Einzelhandel",
        "Vending",
        "Massagesessel",
        "EV-Ladestationen",
        "Werbung",
        "Pop-up-Handel",
        "Kommerzielle Dienstleistungen",
      ],
    },
    form: {
      name: "Name",
      intent: "Wonach suchen Sie?",
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
      contactPerson: "Kontaktperson",
      country: "Land",
      availableArea: "Verfügbare Fläche",
      setting: "Innenbereich / Außenbereich",
      electricity: "Strom vorhanden",
      accessInfo: "Besucherfrequenz oder Zugangsinformationen",
      photosLink: "Fotos oder Standortlink",
      operatingCountries: "Aktuelle Betriebsländer",
      targetCountries: "Zielländer in Europa",
      preferredTypes: "Bevorzugte Standorttypen",
      desiredLocations: "Anzahl gewünschter Standorte",
      chairDimensions: "Abmessungen des Sessels",
      powerRequirements: "Stromanforderungen",
      serviceModel: "Wartungs- / Servicemodell",
      installationTimeline: "Installationszeitraum",
      businessType: "Geschäfts- oder Konzepttyp",
      requiredTypes: "Benötigte Standorttypen",
      technicalRequirements: "Technische Anforderungen",
      timeline: "Zeitraum",
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

  if (normalized === "/operators") return { locale: defaultLocale, page: "/operators" };
  if (normalized === "/property-owners") return { locale: defaultLocale, page: "/property-owners" };
  if (normalized === "/how-it-works") return { locale: defaultLocale, page: "/how-it-works" };
  if (normalized === "/contact") return { locale: defaultLocale, page: "/contact" };
  if (normalized === "/privacy") return { locale: defaultLocale, page: "/privacy" };
  return { locale: defaultLocale, page: "/" };
}

function getInitialPath(): { locale: Locale; page: PageKey } {
  if (typeof window === "undefined") return { locale: defaultLocale, page: "/" };
  return getRouteFromPath(window.location.pathname);
}

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
    <div className={`brand-mark ${small ? "small" : ""}`} role="img" aria-label="RANKLY logo">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M9 32V8h10.5C26.3 8 30 11.2 30 16.5c0 3.8-2 6.4-5.4 7.7L32 32h-7l-6.2-7.2H15V32H9Zm6-12.5h4c3.2 0 5-1 5-3s-1.8-3-5-3h-4v6Z"
          fill="currentColor"
        />
        <path d="M20 23.5 31 32" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
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

function OpportunityCard({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
}) {
  return (
    <div className="opportunity-card">
      <div className="network-card-header">
        <div>
          <div className="network-kicker">{copy[locale].home.mapCaption}</div>
          <div className="network-legend">{copy[locale].home.networkLabel}</div>
        </div>
        <div className="network-status">
          <span className="network-status-dot" />
          <span>{copy[locale].home.regionalAccess}</span>
        </div>
      </div>
      <div className="network-opportunity">
        <h3>{copy[locale].home.opportunityTitle}</h3>
        <p>{copy[locale].home.opportunityBody}</p>
      </div>
      <div className="network-stats">
        {proofMetrics.balticPopulation.verified && (
          <div>
            <strong>{proofMetrics.balticPopulation.value}</strong>
            <span>{copy[locale].home.populationLabel}</span>
          </div>
        )}
        <div>
          <strong>
            {proofMetrics.placementOpportunities.verified
              ? proofMetrics.placementOpportunities.value
              : "—"}
          </strong>
          <span>
            {proofMetrics.placementOpportunities.verified
              ? copy[locale].home.potentialLocationsLabel
              : copy[locale].home.potentialOpportunities}
          </span>
        </div>
      </div>
      <div className="network-offer-line">{copy[locale].home.offerLine}</div>
      <button type="button" className="network-cta" onClick={() => onNavigate("/contact", locale)}>
        {copy[locale].home.primaryCta} <ArrowRight size={15} />
      </button>
      <div className="network-disclosure">{copy[locale].home.qualificationNote}</div>
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
  examples: readonly string[];
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
    intent: "",
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
        <span>{t.intent}</span>
        <select
          value={values.intent}
          onChange={(event) => setValues({ ...values, intent: event.target.value })}
        >
          <option value="">{t.intent}</option>
          <option>{copy[locale].home.generalConcept}</option>
          <option>{copy[locale].home.massageChairs}</option>
          <option>{copy[locale].home.propertyIntent}</option>
          <option>{copy[locale].home.otherIntent}</option>
        </select>
      </label>
      <div className="field-grid two-up">
        <label>
          <span>{t.businessType}</span>
          <input type="text" />
        </label>
        <label>
          <span>{t.operatingCountries}</span>
          <input type="text" />
        </label>
        <label>
          <span>{t.targetCountries}</span>
          <input type="text" />
        </label>
        <label>
          <span>{t.requiredTypes}</span>
          <input type="text" />
        </label>
        <label>
          <span>{t.desiredLocations}</span>
          <input type="text" />
        </label>
        <label>
          <span>{t.technicalRequirements}</span>
          <input type="text" />
        </label>
        <label>
          <span>{t.timeline}</span>
          <input type="text" />
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
    contactPerson: "",
    country: "",
    city: "",
    propertyType: "",
    availableArea: "",
    setting: "",
    electricity: "",
    accessInfo: "",
    photosLink: "",
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
          <span>{t.contactPerson}</span>
          <input
            type="text"
            value={values.contactPerson}
            onChange={(event) => setValues({ ...values, contactPerson: event.target.value })}
          />
        </label>
        <label>
          <span>{t.country}</span>
          <input
            type="text"
            value={values.country}
            onChange={(event) => setValues({ ...values, country: event.target.value })}
            required
          />
        </label>
      </div>
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
          <span>{t.availableArea}</span>
          <input
            type="text"
            value={values.availableArea}
            onChange={(event) => setValues({ ...values, availableArea: event.target.value })}
          />
        </label>
        <label>
          <span>{t.setting}</span>
          <input
            type="text"
            value={values.setting}
            onChange={(event) => setValues({ ...values, setting: event.target.value })}
          />
        </label>
        <label>
          <span>{t.electricity}</span>
          <input
            type="text"
            value={values.electricity}
            onChange={(event) => setValues({ ...values, electricity: event.target.value })}
          />
        </label>
        <label>
          <span>{t.accessInfo}</span>
          <input
            type="text"
            value={values.accessInfo}
            onChange={(event) => setValues({ ...values, accessInfo: event.target.value })}
          />
        </label>
      </div>
      <label>
        <span>{t.photosLink}</span>
        <input
          type="url"
          value={values.photosLink}
          onChange={(event) => setValues({ ...values, photosLink: event.target.value })}
        />
      </label>
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

function PlacementStrip({ locale }: { locale: Locale }) {
  const t = copy[locale].home;
  return (
    <section className="placement-strip" aria-label={t.objectsHeading}>
      <div className="rankly-container placement-strip-inner">
        <div className="placement-strip-heading">{t.objectsHeading}</div>
        <div className="placement-stat-list">
          {opportunityStats[locale].map((stat) => (
            <div className="placement-stat" key={stat.id}>
              <span>{stat.label}</span>
              <strong>{stat.verified && stat.value ? stat.value : t.potentialSites}</strong>
            </div>
          ))}
        </div>
        <p className="placement-qualification">{t.objectsQualification}</p>
      </div>
    </section>
  );
}

function OperatorForm({ locale }: { locale: Locale }) {
  const t = copy[locale].form;
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [values, setValues] = useState({ company: "", contact: "", email: "" });
  const fields = [
    ["operatingCountries", t.operatingCountries],
    ["targetCountries", t.targetCountries],
    ["preferredTypes", t.preferredTypes],
    ["desiredLocations", t.desiredLocations],
    ["chairDimensions", t.chairDimensions],
    ["powerRequirements", t.powerRequirements],
    ["serviceModel", t.serviceModel],
    ["installationTimeline", t.installationTimeline],
  ];
  return (
    <form
      className="rankly-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (values.company && values.contact && values.email) setStatus("success");
      }}
      noValidate
    >
      <div className="field-grid two-up">
        <label>
          <span>{t.propertyName}</span>
          <input
            value={values.company}
            onChange={(event) => setValues({ ...values, company: event.target.value })}
            required
          />
        </label>
        <label>
          <span>{t.contactPerson}</span>
          <input
            value={values.contact}
            onChange={(event) => setValues({ ...values, contact: event.target.value })}
            required
          />
        </label>
        <label>
          <span>{t.email}</span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => setValues({ ...values, email: event.target.value })}
            required
          />
        </label>
      </div>
      <div className="field-grid two-up">
        {fields.map(([id, label]) => (
          <label key={id}>
            <span>{label}</span>
            <input name={id} type="text" />
          </label>
        ))}
      </div>
      <label>
        <span>{t.message}</span>
        <textarea rows={4} />
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

function MassageChairAlert({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: (path: PageKey, locale?: Locale) => void;
}) {
  const t = copy[locale].home;
  return (
    <section className="massage-alert">
      <div className="rankly-container massage-alert-inner">
        <div className="massage-alert-topline">
          <span className="alert-icon">
            <ArrowUpRight size={15} />
          </span>
          <span>{t.alertEyebrow}</span>
          <span className="alert-now">
            <span />
            {t.alertNow}
          </span>
        </div>
        <h2>{t.alertTitle}</h2>
        <p className="massage-alert-subheadline">{t.alertSubheadline}</p>
        <p className="massage-alert-body">{t.alertBody}</p>
        <h3>{t.alertHeading}</h3>
        <div className="massage-audience-grid">
          <div className="massage-audience-card">
            <span className="audience-label">{copy[locale].home.propertyEyebrow}</span>
            <h4>{t.ownerOffer}</h4>
            <p>{t.ownerOfferDetail}</p>
            <button
              type="button"
              className="alert-button"
              onClick={() => onNavigate("/property-owners", locale)}
            >
              {t.ownerAction} <ArrowRight size={15} />
            </button>
          </div>
          <div className="massage-audience-card featured">
            <span className="audience-label">{t.campaignOperatorLabel}</span>
            <h4>{t.operatorOffer}</h4>
            <p>{t.operatorOfferDetail}</p>
            <button
              type="button"
              className="alert-button"
              onClick={() => onNavigate("/contact", locale)}
            >
              {t.operatorAction} <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <p className="massage-alert-qualification">{t.alertQualification}</p>
      </div>
    </section>
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
            <OpportunityCard locale={locale} onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      <PlacementStrip locale={locale} />
      <MassageChairAlert locale={locale} onNavigate={onNavigate} />

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

      <section className="panel-section">
        <div className="rankly-container audience-grid">
          <RevealOnScroll>
            <AudiencePanel
              eyebrow={copy[locale].home.broadOperatorEyebrow}
              title={copy[locale].home.broadOperatorTitle}
              text={copy[locale].home.broadOperatorBody}
              examples={copy[locale].home.categories}
              cta={copy[locale].home.primaryCta}
              href={withLocale("/contact", locale)}
              dark
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <AudiencePanel
              eyebrow={copy[locale].home.propertyEyebrow}
              title={copy[locale].home.broadPropertyTitle}
              text={copy[locale].home.broadPropertyBody}
              examples={copy[locale].home.categories}
              cta={copy[locale].home.secondaryCta}
              href={withLocale("/property-owners", locale)}
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="direction-band">
        <div className="rankly-container direction-band-inner">
          <p>{copy[locale].home.positioning}</p>
          <span>{copy[locale].home.positioningDetail}</span>
          <div className="direction-flow">
            <strong>{copy[locale].home.directionA}</strong>
            <strong>{copy[locale].home.directionB}</strong>
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
              <OperatorForm locale={locale} />
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

  useEffect(() => {
    const metadata = {
      en: {
        title: "Rankly — Specialised Leasing for Commercial Locations in Europe and the Baltics",
        description:
          "Rankly helps businesses find, secure and operate commercial locations across Europe and the Baltics for automated retail, vending, massage chairs, EV charging, advertising and other commercial concepts.",
      },
      lv: {
        title: "Rankly — Specializēta komerciālo lokāciju noma Eiropā un Baltijā",
        description:
          "Rankly palīdz uzņēmumiem atrast, nodrošināt un pārvaldīt komerciālās lokācijas Eiropā un Baltijā dažādiem komerciāliem konceptiem.",
      },
      de: {
        title:
          "Rankly — Spezialisierte Vermietung gewerblicher Standorte in Europa und im Baltikum",
        description:
          "Rankly unterstützt Unternehmen dabei, gewerbliche Standorte in Europa und im Baltikum für verschiedene kommerzielle Konzepte zu finden, zu sichern und zu betreiben.",
      },
    }[route.locale];
    document.title = metadata.title;
    document.documentElement.lang = route.locale;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata.description);
  }, [route.locale]);

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
