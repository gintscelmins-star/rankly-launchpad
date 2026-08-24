# Claude Code — Rankly.lv Pilnā Pārstāde

## KONTEKSTS

Strādājam uz esošu projektu: **rankly.lv**
Repository: https://github.com/gintscelmins-star/rankly-launchpad
Stack: Vite + React + TypeScript + Tailwind CSS
Deploy: Vercel (auto no GitHub)

**SVARĪGI PIRMS SĀKT:**

1. Izlasi esošo failu struktūru
2. Izlasi `tailwind.config.ts` — saglabā esošo krāsu shēmu
3. Izlasi `App.tsx` vai galveno router failu
4. Izlasi 2–3 esošos komponentus — saglabā koda stilu
5. Tikai tad raksti kodu

**DIZAINS PALIEK.** Mēs mainām struktūru un saturu. Nav jāpārraksta CSS sistēma.

---

## FAILU STRUKTŪRA — IZVEIDOT

```
src/
  components/
    sections/
      Hero.tsx
      WebsiteBlock.tsx
      LeadGenBlock.tsx
      AIBlock.tsx
      NelasitBlock.tsx
      FooterCTA.tsx
    ui/
      NodeGraph.tsx        (animēts savienojumu grafiks hero)
      TypewriterText.tsx   (typewriter animācija)
      BlurCard.tsx         (blurred karte ar stamp)
      StampText.tsx        (KONFIDENCIĀLI stamp)
  data/
    content.ts             (viss teksts centralizēti)
```

---

## SEKCIJA 1 — HERO

### Layouta struktūra:

```
Kreisā puse (55%): Teksts + CTA
Labā puse (45%): NodeGraph animācija
Mobile: Teksts augšā, graph pazūd vai kļūst mazāks
```

### Teksts (TIEŠI ŠIS — nemainīt):

```
HEADLINE (3 rindas, liels bold):
"Tu vari pelnīt vairāk.
Šodien.
Ar vienu lēmumu."

SUBLINE (typewriter loop — mainās vārds):
"_______ strādās Tavā vietā — viss no €50/mēn. Demo 24 stundu laikā."

Kur mainās (typewriter efekts, loop):
→ "Mājaslapa"
→ "Google Ads"
→ "CRM"
→ "AI"

CTA POGA:
Teksts: "Gribu redzēt kā →"
Stils: primārā poga, esošais dizains

MICRO-COPY zem pogas:
"Bez līguma. Bez riska."
Font-size: small, muted krāsa
```

### NodeGraph komponente (labā puse):

```typescript
// Nodes un savienojumi:
const nodes = [
  { id: "web", label: "Mājaslapa", x: 20, y: 20 },
  { id: "ads", label: "Google Ads", x: 70, y: 20 },
  { id: "crm", label: "CRM", x: 20, y: 60 },
  { id: "ai", label: "AI Auto", x: 70, y: 60 },
  { id: "result", label: "Jauni klienti ✓", x: 45, y: 85 },
];

const edges = [
  ["web", "crm"],
  ["ads", "crm"],
  ["crm", "ai"],
  ["ai", "result"],
  ["web", "result"],
];

// Animācija: pulsējoši punkti gar līnijām (CSS animation)
// Nodes: apaļi, ar glow efektu
// Krāsas: atbilstoši esošajai Tailwind paletei
// SVG vai div-based — izvēlies viegļāko implementāciju
```

---

## SEKCIJA 2 — BLOKS 1: MĀJASLAPA

### Sekcijas struktūra:

```
Virsraksts
Apakšvirsraksts
6 kartes grid (3x2 desktop, 2x3 tablet, 1x6 mobile)
3 soļu sekcija (horizontāla)
Cenu bloks
Rankly Statement
```

### Teksti (TIEŠI ŠIS — nemainīt):

```
VIRSRAKSTS:
"Tava jaunā mājaslapa — klienti to iemīlēs"

APAKŠVIRSRAKSTS:
"Magnētiska un funkcionāla. No €50/mēn. Gatava 24 stundu laikā."

6 KARTES:

Karte 1:
Nosaukums: "Biznesa dizains"
Teksts: "Izstrādāts tieši Tavu klientu piesaistei"

Karte 2:
Nosaukums: "Mobile-first"
Teksts: "70% klientu meklē no telefona. Tava lapa ir ātra un perfekta uz jebkura ekrāna."

Karte 3:
Nosaukums: "24h delivery"
Teksts: "Piesakies šodien — rīt mājaslapa ir live. Ne nedēļas, ne mēneši."

Karte 4:
Nosaukums: "SEO-ready"
Teksts: "Google redz tavu lapu no pirmās dienas. Pamata optimizācija iekļauta."

Karte 5:
Nosaukums: "Analytics"
Teksts: "Redzi kas apmeklē tavu lapu, no kurienes nāk un ko dara. Google Analytics setup iekļauts."

Karte 6:
Nosaukums: "Hosting + domēns"
Teksts: "Viss iekļauts €50/mēn. Nav slēpto maksu, nav pārsteigumu."

NAV EMOJI. NAV IKONAS. Tikai teksts un kartes.

3 SOĻI (horizontāli, numurēti):

01. PIESAKIES
"Aizpildi formu. Pastāsti par savu biznesu."

02. DEMO 24H
"Mēs izstrādājam tavu lapu.
Tu redzi pirms maksā."

03. LIVE + KLIENTI
"Mājaslapa live. Google to redz.
Klienti sāk zvanīt."

CENU BLOKS:
"no €50/mēn"
Saraksts:
- Custom mājaslapa
- Hosting + domēns
- Mobile-friendly
- SEO-ready struktūra
- Analytics setup
- 1 mēnesis bezmaksas atbalsts

Setup: €149 (vienreizējs)
vai 6 mēn. līgums → €0 setup

CTA: "Gribu demo 24h laikā →"
Micro-copy: "Maksā tikai ja patīk."

RANKLY STATEMENT (bloka apakšā, citāta stils):
"Mēs netaisām ego mājaslapas.

Katrs lēmums balstās datos —
tava auditorija, viņu paradumi, viņu gaume.

Pirms koda rakstām — analizējam.
Ātrums. Funkcionalitāte. Estētika.
Šajā secībā."
```

---

## SEKCIJA 3 — BLOKS 2: LEAD GEN

### Sekcijas struktūra:

```
Virsraksts
4 pīlāri (2x2 grid vai horizontāli)
Sistēmas plūsmas vizuāls
Cenu bloks
Rankly Statement
```

### Teksti (TIEŠI ŠIS — nemainīt):

```
VIRSRAKSTS:
"Mājaslapa ir tikai sākums."

APAKŠVIRSRAKSTS:
"Tava sistēma, kas automātiski piesaista klientus."

4 PĪLĀRI (kartes bez ikonām):

Pīlārs 1:
Nosaukums: "Google Ads pārvaldīšana"
Teksts: "Mēs izveidojam un optimizējam tavu Google reklāmu. Tu maksā tikai par klikšķiem no taviem klientiem."

Pīlārs 2:
Nosaukums: "CRM sistēma"
Teksts: "Katrs pieprasījums automātiski nonāk tavā CRM. Neviens klients nepazūd. Viss ir pārredzams."

Pīlārs 3:
Nosaukums: "AI apstrāde"
Teksts: "Tu iesaisties tikai kad klients ir gatavs pirkt."

Pīlārs 4:
Nosaukums: "Admin panelis"
Teksts: "Viss vienā kontroles panelī: leads, Google Ads atskaites, konversijas, ieņēmumi. Bez Excel, bez manuālas saskaitīšanas."

SISTĒMAS PLŪSMA (vizuāls elements):
[Google Ads] ──→ [Mājaslapa]
                      ↓
                 [Lead ienāk]
                      ↓
             [CRM automātiski]
                      ↓
         [AI outreach → Klients atbild]
                      ↓
             [Tu saņem zvanu] ✓

Implementācija: vienkāršs CSS/SVG flow diagram,
atbilstoši esošajai krāsu paletei.

CENU BLOKS:
"no €290/mēn"
Saraksts:
- Mājaslapa (iekļauta)
- Google Ads pārvaldīšana
- CRM sistēma
- AI auto outreach
- Admin panelis
- Ikmēneša atskaite

CTA: "Gribu uzzināt vairāk →"

RANKLY STATEMENT:
"Mājaslapa bez sistēmas ir tikai
skaista telpa, kurā neviens nenāk.

Mēs pievienojam sistēmu —
CRM, reklāma, automātika.

Tu saņem klientus.
Mēs pārvaldām visu pārējo."
```

---

## SEKCIJA 4 — BLOKS 3: AI

### Sekcijas struktūra:

```
Brīdinājuma banner (augšā)
Virsraksts
4 kartes ar blurred saturu + KONFIDENCIĀLI stamp
CTA
Rankly Statement
```

### Dizaina direktīvas AI blokam:

```
FONS: Tumšāks nekā pārējās sekcijas
(dark variant — esošās paletes tumšākais tonis)
Tas vizuāli nošķir AI kā premium/citu kategoriju.

BRĪDINĀJUMA BANNER:
Stils: horizontāla josla augšā pirms virsraksta
Fons: dzeltens vai sarkans (warning krāsa)
Teksts: "BRĪDINĀJUMS: AI risinājumu izmantošana
var dot Jums negodīgu priekšrocību biznesā"
Font: bold, uppercase, melns teksts uz dzeltena fona
Nav ikonas. Nav emoji.

VIRSRAKSTS:
"AI risinājumi — jauns peļņas avots"

APAKŠVIRSRAKSTS:
"Individuāli pielāgoti rīki un automatizācijas."
```

### BlurCard komponente:

```typescript
// Katra karte satur:
// 1. Virsraksts (redzams, liels)
// 2. Teksts (CSS blur efekts — user-select: none)
// 3. KONFIDENCIĀLI stamp virs blurred teksta

// KONFIDENCIĀLI stamp stils:
// - Fonts: 'Courier New' vai 'Special Elite' (Google Font)
// - Teksts: "KONFIDENCIĀLI"
// - Krāsa: sarkana (#CC0000)
// - Transform: rotate(-12deg)
// - Font-size: large, bold, uppercase
// - Letter-spacing: 0.15em
// - Border: 3px solid #CC0000
// - Padding: 4px 12px
// - Opacity: 0.85
// - Position: absolute, centrēts virs blurred teksta
// - Stils: kā īsts klasificēts dokumentu zīmogs
// NAV nevienas ikonas vai emoji pie šī elementa

// Blur efekts:
// filter: blur(4px)
// user-select: none
// pointer-events: none

// 4 KARTES SATURS:

Karte 1:
Virsraksts: "Iegūt vairāk klientu ar AI"
Blurred teksts: "Automatizēta lead kvalifikācija,
AI chatbot kas konvertē apmeklētājus klientos 24/7,
personalizēti follow-up e-pasti uz katra klienta
uzvedības bāzes. Sistēma strādā kamēr tu guli."

Karte 2:
Virsraksts: "Samazināt darbaspēka izmaksas ar AI"
Blurred teksts: "Automātiski rēķini, AI asistents
kas atbild klientiem, dokumentu apstrāde bez
cilvēka iesaistes. Vidējais ietaupījums —
12 stundas nedēļā uz 5 darbinieku komandu."

Karte 3:
Virsraksts: "Uzzināt konkurentu noslēpumus ar AI"
Blurred teksts: "Konkurentu cenu monitorings reāllaikā,
SEO stratēģiju analīze, klientu atsauksmju izpēte,
tirgus tendences pirms tās kļūst publiski zināmas.
Informācija, kas nav pieejama bez AI rīkiem."

Karte 4:
Virsraksts: "x10 peļņa ar AI"
Blurred teksts: "Dinamiskas cenas atkarībā no pieprasījuma,
upsell automatizācija, klientu LTV optimizācija,
ieņēmumu prognozēšana. Sistēma, kas pelna
kamēr tu strādā pie nākamā projekta."

CTA (bloku apakšā):
Teksts: "Uzzināt vairāk par saviem AI risinājumiem →"
Micro-copy: "Katrs risinājums individuāli pielāgots."

RANKLY STATEMENT:
"Kamēr konkurenti vēl domā par AI —
tavi procesi jau darbojas automātiski.

Mēs neieviesam tehnoloģiju.
Mēs dodam tev priekšrocību,
kas tirgū nav publiski pieejama."
```

---

## SEKCIJA 5 — NELASĪT

### Dizaina direktīvas (ĻOTI SVARĪGI):

```
FONS: Tīri balts (#FFFFFF) vai #FAFAFA
FONTS: 'Courier New', monospace — VISS teksts
TEKSTA KRĀSA: #888888 (pelēks — ne melns)
FONT-SIZE: 14px — viss vienādā izmērā
LINE-HEIGHT: 1.8
MAX-WIDTH: 640px, centrēts
PADDING: daudz whitespace augšā un apakšā (py-32)

NAV:
- Nav heading hierarhijas (ne h1, h2, h3)
- Nav bold teksta
- Nav CTA pogas
- Nav ikonas
- Nav border vai card
- Nav shadow

SEKCIJAS LABEL (augšējā kreisajā stūrī):
Teksts: "nelasīt"
Stils: lowercase, #BBBBBB, font-size: 11px,
letter-spacing: 0.2em
Atdalīts no teksta ar horizontal rule (1px, #EEEEEE)
```

### Teksts (TIEŠI ŠIS — nemainīt, ne vārdu):

```
[Ievads — Melvils/Delons fragments:]

Žana Pjēra Melvila kino ērā Alens Delons radīja
tēlu, kas operē ārpus morāles un emocijām.
Ne nonchalant — patiess, tīrs tukšums.
Amor fati — bez nožēlas, bez eiforijas.
Emocijas ir mainīgais, kas rada kļūdas
un iznīcina sistēmas.

"Le Cercle Rouge" laupīšanas aina ilgst
vairāk nekā 25 minūtes bez neviena vārda.
Katra kustība kalpo funkcionālam mērķim.
Tukša runāšana ir izslēgta.

Operatori sadarbojas, jo to prasa mērķa mērogs,
taču katrs saglabā absolūtu iekšējo izolāciju.
Nav nevajadzīgu partnerību vai draudzības ilūziju —
ir tikai darījums un kompetence.

——

[Galvenais teksts:]

Nelasīt.

Ja tu šeit meklēji manus pakalpojumus vai produktus,
šo sadaļu vari droši aizvērt. Te nav nekā pārdodama.
Šis ir vienkārši fona process — īss konspekts par to,
kā strādā mana operacionālā sistēma.
Man patīk, ja lietas ir sakārtotas kastītēs.

Pamats: Koka zobeni un izgriezti tauki

Mijamoto Musasi reiz ieradās uz nāves dueli ar
no aira izgrieztu koka zobenu un vienalga uzvarēja.
Viņam neinteresēja estētika, tradīcijas vai tas,
kā "būtu pareizi" turēt asmeni.
Viņu interesēja tikai tas, kas strādā.

Tā būtībā ir visa mana LEAN filosofija.
Jebkura lieka darbība, jebkurš estētisks uzlabojums,
kas nenes rezultātu, ir sistēmas piesārņojums.
Japāņiem ir tāds koncepts Kaizen — tā vietā,
lai zīmētu grandiozus plānus, tu vienkārši izdari
1% uzlabojumu katru dienu. Ja mana sistēma vai kods
šodien ir nedaudz efektīvāks nekā vakar,
tas ir pietiekami. Viss pārējais ir kosmētika,
no kuras vajag atbrīvoties.

Mērķis: Asimetriskā svira

Kāpēc vispār kaut ko būvēt?
Navals Ravikants to noformulēja diezgan precīzi:
pārdodot savu laiku, brīvību nenopirksi.

Mans mērķis nav "smagi strādāt" vai kolekcionēt
darba stundas. Mērķis ir asimetriska svira.
Uzrakstīt kodu vai uzbūvēt sistēmu vienreiz,
lai tā turpinātu strādā un pieņemt lēmumus
bez manas fiziskas klātbūtnes tūkstošiem reižu.
Bizness un kapitāls ir tikai blakusprodukts
labi uzbūvētam dzinējam, kas spēj darboties autonomi.

Metode: Sterilitāte un reālie motīvi

Kā to izdarīt, nesajūkot prātā un
nepazaudējot fokusu? Metode ir diezgan
sena un attīrīta no emocijām.

Stoicisms manā ikdienā nav nekāda augstā filosofija,
tas ir vienkārši rīks emocionālajai sterilitātei.
Tirgus krīt, kampaņa nestrādā, serveris uzkaras —
tas ir vienkārši fakts. Faktiem nav emocionāla svara,
tie vienkārši prasa tehnisku risinājumu.

Frīdrihs Nīče uzskatīja, ka cilvēkam ir sevi jāpārvar,
jāpārraksta noklusējuma noteikumi.
Nevienam neinteresē tava ērtība,
un tirgum ir nospļauties par tavām jūtām.
Tu vai nu uzbūvē savu sistēmu,
vai kļūsti par skrūvīti kāda cita sistēmā.

Savukārt Karls Jungs ļoti labi saprata,
ka zem katras virskārtas slēpjas ēna.
Biznesā tas nozīmē redzēt un strādāt ar reālajiem,
bieži vien tumšajiem cilvēku un tirgus motīviem,
nevis ar to, kā lietām "vajadzētu" izskatīties.
Radikāla patiesība vienmēr uzvar ilūzijas.

Tas arī viss. Sistēma, svira un izpilde.
Vari atgriezties pie galvenās lapas.
```

---

## SEKCIJA 6 — FOOTER CTA

```
STRUKTŪRA: Centrēts, daudz whitespace

TEKSTS:
"Viens lēmums. 24 stundas."

CTA POGA:
"Gribu redzēt kā →"
(primārā poga, esošais dizains)

MICRO-COPY:
"Bez līguma. Bez riska."

APAKŠĀ:
rankly.lv | Rīga, Latvija | [e-pasts]
```

---

## NAVIGĀCIJA — ATJAUNINĀT

```
Esošie linki + pievienot smooth scroll uz sekcijām:

Mājaslapa → #website
Lead Gen → #leadgen
AI → #ai
Nelasīt → #nelasit
Kontakti → #contact (esošā forma)

Mobile: hamburger menu ja jau eksistē — saglabāt
```

---

## GLOBĀLIE STILA NOTEIKUMI

```
1. NAV EMOJI visā lapā (izņemot ja jau eksistē hero)
2. NAV SMALL BADGES ar ikonām
3. Rankly statements — italic vai citātu stils
4. Kartes — esošais dizains (rounded, shadow-sm)
5. Sekciju padding — py-24 desktop, py-16 mobile
6. Virsraksti — esošais font-size hierarhija
7. Muted teksts — esošā gray krāsa
8. Pogas — esošais button komponents, nemainīt stilu
9. Fonts — Special Elite (Google Font) tikai KONFIDENCIĀLI stampam
   Pievienot: <link href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap">
```

---

## TYPESCRIPT TIPI

```typescript
// src/data/content.ts

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
```

---

## QUALITY CHECKLIST — PIRMS PABEIGT

```
□ Hero typewriter animācija darbojas (loop)
□ NodeGraph animācija — pulsi redzami
□ Bloks 1 — 6 kartes render pareizi mobile
□ Bloks 1 — 3 soļi horizontāli desktop, vertikāli mobile
□ Bloks 2 — sistēmas plūsma renderējas
□ Bloks 3 — tumšs fons
□ Bloks 3 — BRĪDINĀJUMS banner redzams
□ Bloks 3 — blur efekts uz kartēm
□ Bloks 3 — KONFIDENCIĀLI stamp: sarkans, rotēts, serif fonts
□ Bloks 3 — NAV nevienas ikonas vai emoji
□ NELASĪT — Courier New fonts
□ NELASĪT — pelēks teksts (#888)
□ NELASĪT — nav CTA, nav bold, nav heading hierarhija
□ NELASĪT — teksts ir TIEŠI kā norādīts, nemainīts
□ Footer CTA — centrēts, whitespace
□ Navigācija — smooth scroll uz sekcijām
□ Mobile responsive — viss darbojas 375px
□ Nav TypeScript errori
□ Nav konsoles errori
□ Commit: "feat: full rankly.lv redesign — all sections"
```

---

## SVARĪGĀKIE NOTEIKUMI

1. **Tekstu NEMAINĪT** — visi teksti ir apstiprināti. Kopē tieši.
2. **Dizainu NESĀKT NO NULLES** — bāzējies uz esošo kodu
3. **Ikonas/emoji NAV** — izņemot NodeGraph un ja jau eksistē
4. **KONFIDENCIĀLI** — tikai ar Special Elite fontu, sarkans, rotēts
5. **NELASĪT sekcija** — Courier New, pelēks, bez hierarhijas, teksts nemainīts
6. **TypeScript** — strict mode, proper typing
7. **Mobile first** — katru sekciju testē 375px

---

**COMMIT KAD GATAVS:** `feat: full rankly.lv redesign — hero, website, leadgen, ai, nelasit, footer`
