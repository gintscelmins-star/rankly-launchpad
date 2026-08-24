# RANKLY — Claude Code Addendum v2

## Multilingual Website, Complete Rebrand and Removal of Legacy Web-Design Content

Apply this addendum to the existing RANKLY website build prompt. This is a mandatory product, content and code update.

---

## 1. Mandatory language support

The website must support three complete languages:

- Latvian: `lv`
- English: `en`
- German: `de`

English is the default fallback language, but the initial language should be selected according to the browser language when possible:

- Latvian browser → Latvian.
- German browser → German.
- All other browsers → English.

The user must always be able to manually change the language.

Do not mix languages in one page. All visible UI text, navigation, buttons, validation messages, success messages, metadata, form labels, footer content, status labels and accessibility labels must use the selected language.

Do not use machine-translated-looking placeholder text. Translations must be natural, concise and professional for a B2B audience.

---

## 2. Recommended routing

Use locale-prefixed routes:

- `/lv/`
- `/en/`
- `/de/`

Pages:

- `/[locale]/`
- `/[locale]/operators`
- `/[locale]/property-owners`
- `/[locale]/how-it-works`
- `/[locale]/contact`
- `/[locale]/privacy`

If the current project already uses another internationalisation structure, preserve the existing architecture but maintain the same language separation and URL discoverability.

Requirements:

- Configure `lv`, `en` and `de` as supported locales.
- Configure a safe fallback to English.
- Add locale-aware navigation links.
- Preserve the current page when changing language.
- Do not lose form input during a language switch unless technically unavoidable.
- Add `hreflang` metadata for every public page.
- Add canonical URLs per locale.
- Add language-specific Open Graph titles and descriptions.
- Do not redirect search engines in a way that prevents crawling all three locales.

Suggested implementation options:

- Next.js App Router with `[locale]` segment and a typed translation dictionary.
- `next-intl` only if already installed or if adding it does not conflict with the project.
- A custom typed dictionary is acceptable for a small static site.

Do not duplicate entire page components for each language. Keep layout and components shared, with content loaded from translation dictionaries.

---

## 3. Language selector

Add a polished language selector to the desktop header and mobile navigation.

Visible labels:

- LV
- EN
- DE

Accessibility:

- Use a real button or native select.
- Include an accessible label: `Select language` / translated equivalent.
- Show the active locale clearly.
- Keyboard accessible.
- Close the dropdown with Escape.
- Close it when clicking outside.

Do not use country flags as the only language indicator. Text abbreviations must be visible.

Suggested selector appearance:

- Small technical control.
- Thin border.
- Active language marked with Electric Lime.
- Navy surface in the dark header.
- Light version in light sections if the header changes colour.

---

## 4. Brand and complete content rebrand

RANKLY is no longer a web-design company, website agency, digital studio or web-design project.

The website must communicate only this business:

> RANKLY is a specialised leasing and commercial location operations partner for the Baltic market.

Primary descriptor:

> SPECIALISED LEASING

Core position:

> Baltic commercial location and market-entry partner.

Core services:

- Location Sourcing
- Market Entry
- Lease Negotiation
- Local Operations

Business categories:

- Automated retail
- Vending
- EV charging
- Advertising
- Pop-up retail
- Commercial services

Target partners:

- Property owners and commercial venue operators.
- Companies expanding equipment, infrastructure, retail or service concepts into the Baltics.

Geography:

- Estonia
- Latvia
- Lithuania

---

## 5. Legacy content deletion — mandatory audit

Perform a complete repository-wide audit before finalising the website.

Search all source files, routes, components, data files, translation files, metadata, SEO files, JSON-LD, image alt text, filenames and comments for legacy web-design agency content.

Remove or replace every reference to:

- Web design
- Website design
- Web development agency
- Digital agency
- Creative studio
- Design studio
- Branding agency
- Landing-page services
- UX/UI services sold to clients
- Website packages
- Websites for businesses
- E-commerce website services
- WordPress services
- Framer services
- Webflow services
- React development services
- App development as a client service
- SaaS development as a client service
- Old project names
- Old domains
- Old email addresses
- Old phone numbers
- Old CTAs
- Old testimonials
- Old client logos
- Old portfolio items
- Old navigation labels
- Old page titles and descriptions
- Old Open Graph content
- Old structured data
- Old favicon or logo assets

Also search for old content in:

- `app/`
- `pages/`
- `components/`
- `public/`
- `src/`
- `lib/`
- `content/`
- `data/`
- `locales/`
- `messages/`
- `README.md`
- `package.json` description fields
- sitemap files
- robots files
- manifest files
- analytics event names
- form endpoints
- tracking labels
- alt attributes
- accessibility text
- comments and TODOs

If a legacy asset is not used, delete it from the project or move it out of the public build. Do not leave old logos or screenshots accessible at predictable public paths.

Do not preserve old web-design pages as hidden pages. Delete them or redirect them to the RANKLY homepage according to the existing deployment strategy.

Do not leave phrases such as “formerly”, “previously”, “our web design services” or “old website”. The final public website must look like RANKLY has always been this business.

---

## 6. Canonical multilingual content

Create one typed translation dictionary with equivalent content in Latvian, English and German.

Suggested structure:

```ts
export const messages = {
  lv: {
    common: {},
    nav: {},
    home: {},
    operators: {},
    propertyOwners: {},
    howItWorks: {},
    contact: {},
    privacy: {},
    forms: {},
    seo: {},
  },
  en: {
    common: {},
    nav: {},
    home: {},
    operators: {},
    propertyOwners: {},
    howItWorks: {},
    contact: {},
    privacy: {},
    forms: {},
    seo: {},
  },
  de: {
    common: {},
    nav: {},
    home: {},
    operators: {},
    propertyOwners: {},
    howItWorks: {},
    contact: {},
    privacy: {},
    forms: {},
    seo: {},
  },
} as const;
```

Do not use scattered inline strings in components. All user-facing strings must be translated.

Use English as the source language for semantic consistency, but make all three dictionaries complete.

---

## 7. Required translation content

Implement the following copy in all three languages. Preserve the meaning, not necessarily the exact word order.

### Brand descriptor

English:
SPECIALISED LEASING

Latvian:
SPECIALIZĒTA NOMA

German:
SPEZIALISIERTE VERMIETUNG

If the German phrase looks too close to conventional property leasing in context, the descriptor may remain as the international brand descriptor `SPECIALISED LEASING`, while the explanatory copy is German. Do not translate the brand name.

### Homepage hero

English:
Your gateway to commercial locations in the Baltics.

Latvian:
Tavs piekļuves punkts komerciālajām lokācijām Baltijā.

German:
Ihr Zugang zu gewerblichen Standorten im Baltikum.

English supporting copy:
Rankly helps businesses find, secure and operate commercial locations for market entry, automated retail, advertising and infrastructure.

Latvian supporting copy:
Rankly palīdz uzņēmumiem atrast, nodrošināt un pārvaldīt komerciālās lokācijas ienākšanai tirgū, automatizētai mazumtirdzniecībai, reklāmai un infrastruktūras risinājumiem.

German supporting copy:
Rankly unterstützt Unternehmen dabei, gewerbliche Standorte für den Markteintritt, den automatisierten Einzelhandel, Werbung und Infrastruktur zu finden, zu sichern und zu betreiben.

English geography:
ESTONIA · LATVIA · LITHUANIA

Latvian geography:
IGAUNIJA · LATVIJA · LIETUVA

German geography:
ESTLAND · LETTLAND · LITAUEN

English primary CTA:
Discuss your expansion

Latvian primary CTA:
Pārrunāt paplašināšanos

German primary CTA:
Expansion besprechen

English secondary CTA:
Submit a location

Latvian secondary CTA:
Pieteikt lokāciju

German secondary CTA:
Standort einreichen

### Factual network statement

English:
Access to 500+ potential commercial locations across the Baltics.

Latvian:
Piekļuve vairāk nekā 500 potenciālām komerciālajām lokācijām Baltijā.

German:
Zugang zu mehr als 500 potenziellen gewerblichen Standorten im Baltikum.

Required qualification in all languages:

English:
Potential locations are identified for sourcing and evaluation. Availability is assessed case by case.

Latvian:
Potenciālās lokācijas tiek identificētas atlasei un izvērtēšanai. Pieejamība tiek noteikta katrā gadījumā atsevišķi.

German:
Potenzielle Standorte werden zur Suche und Bewertung identifiziert. Die Verfügbarkeit wird im Einzelfall geprüft.

### Main model section

English heading:
Commercial space is only valuable when it becomes operational.

Latvian heading:
Komerctelpa kļūst vērtīga, kad tā sāk darboties.

German heading:
Gewerbeflächen schaffen erst dann Wert, wenn sie genutzt werden.

English:
We connect location owners and expansion-focused businesses, then coordinate the commercial and operational steps required to move from an opportunity to a functioning site.

Latvian:
Mēs savienojam lokāciju īpašniekus ar uzņēmumiem, kas vēlas paplašināties, un koordinējam komerciālos un operacionālos soļus no iespējas līdz funkcionējošai lokācijai.

German:
Wir verbinden Standortinhaber mit expandierenden Unternehmen und koordinieren die kommerziellen und operativen Schritte von der Chance bis zum funktionsfähigen Standort.

### Service labels

English → Latvian → German:

- Location Sourcing → Lokāciju atlase → Standortsuche
- Market Entry → Ienākšana tirgū → Markteintritt
- Lease Negotiation → Nomas līguma pārrunas → Mietvertragsverhandlung
- Local Operations → Vietējā darbības koordinēšana → Lokale Betriebskoordination

### Service descriptions

Location Sourcing:

English:
We identify potential locations based on your target customer, format, geography and operational requirements.

Latvian:
Mēs identificējam potenciālās lokācijas, ņemot vērā jūsu mērķauditoriju, konceptu, ģeogrāfiju un darbības prasības.

German:
Wir identifizieren potenzielle Standorte anhand Ihrer Zielgruppe, Ihres Formats, der Geografie und Ihrer betrieblichen Anforderungen.

Market Entry:

English:
We help businesses evaluate the Baltic market and select suitable entry locations.

Latvian:
Mēs palīdzam uzņēmumiem izvērtēt Baltijas tirgu un izvēlēties piemērotas sākuma lokācijas.

German:
Wir unterstützen Unternehmen bei der Bewertung des baltischen Marktes und der Auswahl geeigneter Standorte für den Markteintritt.

Lease Negotiation:

English:
We coordinate commercial discussions and help structure the relevant location agreement.

Latvian:
Mēs koordinējam komerciālās pārrunas un palīdzam strukturēt konkrētajai lokācijai nepieciešamo vienošanos.

German:
Wir koordinieren kommerzielle Gespräche und unterstützen bei der Strukturierung der relevanten Standortvereinbarung.

Local Operations:

English:
We support installation, access, maintenance coordination, replacement and ongoing local operational needs.

Latvian:
Mēs atbalstām uzstādīšanu, piekļuvi, apkopes koordinēšanu, nomaiņu un citas ikdienas vietējās darbības vajadzības.

German:
Wir unterstützen bei Installation, Zugang, Wartungskoordination, Austausch und laufenden lokalen Betriebsanforderungen.

### Audience sections

English operators heading:
Launch in the Baltics without building the local process from zero.

Latvian operators heading:
Ienāc Baltijas tirgū, neveidojot vietējo procesu no nulles.

German operators heading:
Starten Sie im Baltikum, ohne den lokalen Prozess von Grund auf aufzubauen.

English property owners heading:
Make underused commercial space productive.

Latvian property owners heading:
Pārvērtiet nepietiekami izmantotu komerctelpu produktīvā iespējā.

German property owners heading:
Machen Sie ungenutzte Gewerbeflächen produktiv.

### Network section

English heading:
A sourcing network built for market entry.

Latvian heading:
Lokāciju atlases tīkls ienākšanai tirgū.

German heading:
Ein Standortnetzwerk für den Markteintritt.

English body:
Our sourcing network covers multiple commercial environments across Estonia, Latvia and Lithuania. Location suitability, availability and commercial terms are evaluated case by case.

Latvian body:
Mūsu lokāciju atlases tīkls aptver dažādas komerciālās vides Igaunijā, Latvijā un Lietuvā. Lokācijas piemērotība, pieejamība un komerciālie nosacījumi tiek izvērtēti katrā gadījumā atsevišķi.

German body:
Unser Standortnetzwerk umfasst verschiedene gewerbliche Umgebungen in Estland, Lettland und Litauen. Eignung, Verfügbarkeit und kommerzielle Bedingungen werden im Einzelfall geprüft.

### Process labels

English:

- Define the requirement
- Source potential locations
- Evaluate the opportunity
- Coordinate the agreement
- Launch and operate

Latvian:

- Definēt prasības
- Atlasīt potenciālās lokācijas
- Izvērtēt iespēju
- Koordinēt vienošanos
- Uzsākt un nodrošināt darbību

German:

- Anforderungen definieren
- Potenzielle Standorte suchen
- Möglichkeit bewerten
- Vereinbarung koordinieren
- Starten und betreiben

### Final CTA

English:
Have a location to activate or a concept to launch?

Latvian:
Vai jums ir lokācija, ko aktivizēt, vai koncepts, ko ieviest?

German:
Haben Sie einen Standort zu aktivieren oder ein Konzept zu starten?

English supporting text:
Start with the requirement. We will help define the next commercial step.

Latvian:
Sāciet ar prasības definēšanu. Mēs palīdzēsim noteikt nākamo komerciālo soli.

German:
Beginnen Sie mit Ihrer Anforderung. Wir helfen Ihnen, den nächsten kommerziellen Schritt zu definieren.

---

## 8. Translation rules for forms

Translate all form elements naturally.

### Operator form

English labels:

- Company name
- Contact person
- Email
- Country of registration
- Concept or equipment type
- Target countries
- Required location types
- Number of target locations
- Technical requirements
- Message
- Send request

Latvian labels:

- Uzņēmuma nosaukums
- Kontaktpersona
- E-pasts
- Reģistrācijas valsts
- Koncepta vai iekārtas veids
- Mērķa valstis
- Nepieciešamo lokāciju veidi
- Mērķa lokāciju skaits
- Tehniskās prasības
- Ziņa
- Nosūtīt pieprasījumu

German labels:

- Unternehmensname
- Kontaktperson
- E-Mail
- Registrierungsland
- Konzept- oder Gerätetyp
- Zielländer
- Benötigte Standorttypen
- Anzahl der Zielstandorte
- Technische Anforderungen
- Nachricht
- Anfrage senden

### Property owner form

English labels:

- Property or company name
- Contact person
- Email
- Country and city
- Property type
- Approximate available area
- Indoor or outdoor
- Electricity available
- Customer or vehicle access
- Preferred use case
- Photos or link
- Message
- Submit location

Latvian labels:

- Īpašuma vai uzņēmuma nosaukums
- Kontaktpersona
- E-pasts
- Valsts un pilsēta
- Īpašuma veids
- Aptuvenā pieejamā platība
- Iekštelpās vai ārā
- Pieejams elektrības pieslēgums
- Piekļuve klientiem vai transportlīdzekļiem
- Vēlamais izmantošanas veids
- Fotoattēli vai saite
- Ziņa
- Pieteikt lokāciju

German labels:

- Name der Immobilie oder des Unternehmens
- Kontaktperson
- E-Mail
- Land und Stadt
- Immobilientyp
- Ungefähr verfügbare Fläche
- Innen- oder Außenbereich
- Stromanschluss vorhanden
- Zugang für Kunden oder Fahrzeuge
- Bevorzugter Nutzungszweck
- Fotos oder Link
- Nachricht
- Standort einreichen

Validation messages must also be translated. Examples:

English:
Please complete this field.
Please enter a valid email address.

Latvian:
Lūdzu, aizpildiet šo lauku.
Lūdzu, ievadiet derīgu e-pasta adresi.

German:
Bitte füllen Sie dieses Feld aus.
Bitte geben Sie eine gültige E-Mail-Adresse ein.

Success messages:

English:
Thank you. Your request has been prepared successfully. Connect a CRM or form endpoint before launch to receive submissions.

Latvian:
Paldies! Jūsu pieprasījums ir veiksmīgi sagatavots. Pirms palaišanas pieslēdziet CRM vai formas galapunktu, lai saņemtu iesniegumus.

German:
Vielen Dank. Ihre Anfrage wurde erfolgreich vorbereitet. Verbinden Sie vor dem Launch ein CRM oder einen Formular-Endpunkt, um Einsendungen zu empfangen.

Do not claim that an email, CRM record or lead has been sent if no integration exists.

---

## 9. SEO and metadata per locale

Create unique metadata for each route and locale.

Homepage title:

English:
Rankly — Specialised Leasing for Baltic Commercial Locations

Latvian:
Rankly — Specializēta komerciālo lokāciju noma Baltijā

German:
Rankly — Spezialisierte Vermietung gewerblicher Standorte im Baltikum

Homepage description:

English:
Rankly helps businesses access potential commercial locations across Estonia, Latvia and Lithuania through location sourcing, market entry, lease negotiation and local operations.

Latvian:
Rankly palīdz uzņēmumiem piekļūt potenciālām komerciālajām lokācijām Igaunijā, Latvijā un Lietuvā, nodrošinot lokāciju atlasi, ienākšanu tirgū, nomas pārrunas un vietējo darbības koordinēšanu.

German:
Rankly unterstützt Unternehmen beim Zugang zu potenziellen gewerblichen Standorten in Estland, Lettland und Litauen – von der Standortsuche über den Markteintritt und Mietverhandlungen bis zur lokalen Betriebskoordination.

Use locale-specific JSON-LD where appropriate. The organisation type should not claim unverified awards, clients, address, telephone or social links.

If legal company data is not yet available, leave clearly marked code-level TODO values and do not render fake data publicly.

---

## 10. Analytics and event naming

If analytics is already present, update event names so they describe the new business only.

Allowed examples:

- `rankly_language_changed`
- `rankly_expansion_cta_clicked`
- `rankly_location_submission_started`
- `rankly_operator_form_submitted`
- `rankly_property_owner_form_submitted`
- `rankly_network_filter_selected`

Remove old event names related to:

- Web design leads
- Website quote requests
- Portfolio clicks
- Design packages
- Development consultations

Do not add analytics IDs or tracking destinations that have not been provided.

---

## 11. Visual rules remain unchanged

Preserve the approved visual direction:

- Deep Navy `#0B1220`.
- Off White `#F5F7F8`.
- Electric Lime `#B7F000`.
- Space Grotesk headings.
- Inter body text.
- Network, locations, movement and commercial infrastructure.
- Dark, modern, architectural and high-contrast imagery.
- No generic handshake images.
- No giant vending machine hero.
- No building-plus-R icon.
- No web-design agency visual language.

The language selector should look like part of the operating interface, not like a decorative marketing widget.

---

## 12. Final repository audit checklist

Before declaring the work complete:

1. Search the whole repository for all legacy web-design terms.
2. Search for old brand names and old company descriptions.
3. Search all three translation dictionaries.
4. Search metadata, sitemap, robots, manifest and JSON-LD.
5. Search public assets and filenames.
6. Remove old images, screenshots, logos and portfolio assets.
7. Check every visible page in LV, EN and DE.
8. Verify that no page contains mixed languages.
9. Verify that language switching preserves the current route.
10. Verify all forms use translated labels and messages.
11. Verify all links include the active locale.
12. Verify all page titles and descriptions are translated.
13. Verify `hreflang` and canonical metadata.
14. Verify that all old web-design URLs are deleted or safely redirected.
15. Verify that “500+” is always qualified as potential, not guaranteed.
16. Verify that no invented clients, partnerships, signed contracts, exclusivity or availability appear.
17. Run TypeScript, lint and build commands.
18. Test 320px, 768px, 1024px and 1440px layouts.
19. Test keyboard navigation and screen-reader labels.
20. Test reduced-motion mode.
21. Confirm the browser console has no errors.
22. Confirm the final brand communicates only specialised leasing, location sourcing, market entry, lease negotiation and local operations.

The final result must be a complete multilingual RANKLY website in Latvian, English and German, with no remaining public or code-level legacy web-design identity except unavoidable version-control history that is not part of the deployed application.
