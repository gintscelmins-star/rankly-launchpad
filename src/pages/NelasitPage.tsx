import type { ReactNode } from "react"

function Hl({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        textDecoration: "underline",
        textDecorationColor: "#9A2020",
        textDecorationThickness: "1px",
        textUnderlineOffset: "4px",
      }}
    >
      {children}
    </span>
  )
}

const PAGE: React.CSSProperties = {
  backgroundColor: "#0A0A0A",
  minHeight: "100vh",
  color: "#9A9A9A",
  fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
  fontSize: "15px",
  lineHeight: "1.85",
}

const INNER: React.CSSProperties = {
  maxWidth: "720px",
  margin: "0 auto",
  padding: "80px 28px 140px",
}

const P:  React.CSSProperties = { marginTop: "28px" }
const PL: React.CSSProperties = { marginTop: "44px" }

export function NelasitPage() {
  return (
    <div style={PAGE}>
      <div style={INNER}>

        {/* Back link */}
        <div style={{ marginBottom: "56px" }}>
          <a
            href="/"
            style={{
              color: "#2D2D2D",
              textDecoration: "none",
              fontSize: "11px",
              letterSpacing: "0.25em",
              fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
            }}
          >
            ← rankly.lv
          </a>
        </div>

        {/* Label */}
        <div style={{ marginBottom: "48px" }}>
          <span
            style={{
              display: "block",
              color: "#2D2D2D",
              fontSize: "10px",
              letterSpacing: "0.3em",
              marginBottom: "16px",
            }}
          >
            nelasīt
          </span>
          <div style={{ height: "1px", backgroundColor: "#1A1A1A" }} />
        </div>

        {/* ── Intro ── */}
        <p>
          Žana Pjēra Melvila kino ērā Alens Delons radīja tēlu, kas operē ārpus morāles un
          emocijām. Ne nonchalant — patiess, <Hl>tīrs tukšums</Hl>. <Hl>Amor fati</Hl> — bez
          nožēlas, bez eiforijas. Emocijas ir mainīgais, kas rada kļūdas un iznīcina sistēmas.
        </p>

        <p style={P}>
          "Le Cercle Rouge" laupīšanas aina ilgst vairāk nekā 25 minūtes bez neviena vārda. Katra
          kustība kalpo funkcionālam mērķim. <Hl>Tukša runāšana ir izslēgta.</Hl>
        </p>

        <p style={P}>
          Operatori sadarbojas, jo to prasa mērķa mērogs, taču katrs saglabā absolūtu iekšējo
          izolāciju.
        </p>

        {/* Separator */}
        <p style={{ marginTop: "44px", color: "#1E1E1E" }}>——</p>

        {/* ── Nelasīt ── */}
        <p style={{ marginTop: "44px" }}>Nelasīt.</p>

        <p style={P}>
          Ja tu šeit meklēji manus pakalpojumus vai produktus, šo sadaļu vari droši aizvērt. Te nav
          nekā pārdodama. Šis ir vienkārši fona process.{" "}
          <Hl>Kultūra vienmēr uzvar procesus.</Hl>
        </p>

        <p style={P}>
          Melville bija apsēsts ar japāņu samuraju kultūru — ne romantizētajā formā, bet tās
          kodolā: pilnīga pienākuma izpilde bez emocionāla troksņa.
        </p>

        <p style={P}>
          Bushido ētikas un stoiķu filozofijas krustpunktā ir identisks secinājums: viss
          liekvārdīgais ir vājums. <Hl>Darbība bez komentāra. Forma bez dekorācijas.</Hl>
        </p>

        <p style={PL}><Hl>Tā ir ētiska pozīcija.</Hl></p>

        {/* ── Eksistenciālisms ── */}
        <p style={{ ...PL, color: "#4A4A4A", fontSize: "11px", letterSpacing: "0.2em" }}>
          eksistenciālisms
        </p>
        <div style={{ height: "1px", backgroundColor: "#141414", marginTop: "14px", marginBottom: "28px" }} />

        <p>
          Sartra un Kamī Francija bija Melvila intelektuālais ūdens. Eksistenciālisma centrālais
          jautājums — ko nozīmē rīkoties pasaulē bez garantētās nozīmes — izkristalizējas Melvila
          personāžos. Ir kāda aina Le Cercle Rouge, kas nesatur dialogu. Divi vīri sagatavo
          laupīšanu. Mēs redzam rokas, instrumentus, griestus, grīdu. Neviena seja pilnā gaismā.
          Neviena emocionāla ekspozīcija.
        </p>

        <p style={P}>Skatītājs nesaņem norādes par to, kā justies.</p>

        <p style={P}>
          Šis ir Melvila morālais paraksts: <Hl>telpa atsakās tiesāt.</Hl>
        </p>

        <p style={P}>
          Parastais stāstījums — literārs vai kinematogrāfisks — izmanto telpu kā morāles signālu.
          Ļauna vieta: tumša, šaura, netīra. Laba vieta: gaiša, plaša, silta.
        </p>

        <p style={P}>Melville šo kodu atceļ.</p>

        <p style={{ ...P, color: "#C8C8C8" }}>
          <Hl>Telpa ir neitrāla sistēma.</Hl> Morāle ir cilvēka projekcija uz telpu, nevis telpas
          īpašums.
        </p>

        <p style={P}>
          Kad tu noņem vizuālos morāles signālus, skatītājs paliek viens ar savu spriedumu — bez
          atbalsta, bez vadlīnijām. Un tas ir neērti. Jo lielākā daļa morāles ikdienā nav
          pārliecība — <Hl>tā ir imitācija apkārtējo reakcijās.</Hl>
        </p>

        <p style={P}>Jef Costello Le Samouraï ieiet istabā. Nogalina vīru. Iziet.</p>

        <p style={P}>
          Nav muzikāla sasprindzinājuma pirms. Nav emocionāla atslābuma pēc. Kamera fiksē darbību
          ar tādu pašu distanci, ar kādu tā fiksētu cilvēku, kurš ielej kafiju.
        </p>

        <p style={P}>
          Šis ir centrālais Melvila morālās nosacītības jautājums, formulēts kā vizuāls fakts:
        </p>

        <p style={{ ...P, color: "#C8C8C8" }}>
          Vai darbības morālā kvalitāte pieder darbībai pašai — vai mūsu interpretācijai par to?
        </p>

        <p style={P}>
          Ja slepkavība tiek filmēta bez sprieduma, vai tā kļūst morāli neitrāla? Nē. Tā kļūst
          morāli nesegta — un tieši tad skatītājs saprot, ka segumu vienmēr nodrošināja stāstījuma
          konvencija, nevis pati darbība.
        </p>

        <p style={P}>
          Melville atņem šo segumu. Tas, kas paliek, ir{" "}
          <Hl>tīrā darbība un tīrais diskomforts.</Hl>
        </p>

        <p style={P}>
          Costello, kā arī Le Cercle Rouge personāži darbojas pēc koda — profesionāla, gandrīz
          rituāla uzvedības sistēmas. Šis kods nav morāle vispārpieņemtajā nozīmē. Tas nesatur
          kategoriju "labs" vai "ļauns". Tas satur tikai: pareizi izpildīts vai nav izpildīts.
        </p>

        <p style={P}>
          Samuraju kodekss, ko Melville apzināti citē, darbojas identiskā loģikā. Bushido nav
          ētika — tā ir tehnika. Tā neinteresējas par to, vai darbība ir morāli pamatota. Tā
          interesējas par to, vai darbība tiek veikta ar pilnu apņemšanos un precizitāti.
        </p>

        <p style={PL}>Šeit rodas Melvila filozofiskā provokācija:</p>

        <p style={{ ...P, color: "#C8C8C8" }}>
          Ja cilvēks rīkojas perfekti saskaņā ar savu kodu, bet šis kods ir ārpus sabiedriskās
          morāles sistēmas — ko mēs tiesājam?
        </p>

        <p style={P}>Personāžu vai normas, ko viņš nepārkāpj?</p>

        <p style={P}>
          Atbilde, ko Melville sniedz ar telpu un kadru — atsakoties iesaistīties emocionālajā
          spriedumā — ir: <Hl>jūs tiesājat sevi.</Hl> Savu nepieciešamību pēc morālas kārtības,
          kuras garantijas neeksistē. Tieši tā strādā mans AI. Ja Tu esi tas retais, kurš izlasīja
          līdz galam, iespējams, Tu jau nojauti nepieciešamību sajust un satvert divas nebijušas
          sajūtas, kuras rodas pēc šī konspekta izlasīšanas.
        </p>

      </div>
    </div>
  )
}
