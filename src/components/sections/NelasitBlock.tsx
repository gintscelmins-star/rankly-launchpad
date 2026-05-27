import type { ReactNode } from "react"

function Hl({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        textDecoration: "underline",
        textDecorationColor: "#9A2020",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
      }}
    >
      {children}
    </span>
  )
}

const SECTION_STYLE: React.CSSProperties = {
  backgroundColor: "#0A0A0A",
  color: "#6B6B6B",
  fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
  fontSize: "13px",
  lineHeight: "1.9",
}

const INNER_STYLE: React.CSSProperties = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "128px 24px",
}

const P: React.CSSProperties = { marginTop: "24px" }
const P_L: React.CSSProperties = { marginTop: "40px" }

export function NelasitBlock() {
  return (
    <section id="nelasit" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>

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

        {/* Ievads */}
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
          izolāciju. Nav nevajadzīgu partnerību vai draudzības ilūziju — ir tikai{" "}
          <Hl>darījums un kompetence</Hl>.
        </p>

        {/* Separator */}
        <p style={{ marginTop: "40px", color: "#1E1E1E" }}>——</p>

        {/* Galvenais teksts */}
        <p style={{ marginTop: "40px" }}>Nelasīt.</p>

        <p style={P}>
          Ja tu šeit meklēji manus pakalpojumus vai produktus, šo sadaļu vari droši aizvērt. Te
          nav nekā pārdodama. Šis ir vienkārši fona process — īss konspekts par to, kā strādā mana
          operacionālā sistēma. Man patīk, ja lietas ir sakārtotas kastītēs.
        </p>

        {/* Pamats */}
        <p style={{ ...P_L, color: "#4A4A4A" }}>Pamats: Koka zobeni un izgriezti tauki</p>

        <p style={P}>
          Mijamoto Musasi reiz ieradās uz nāves dueli ar no aira izgrieztu koka zobenu un vienalga
          uzvarēja. Viņam neinteresēja estētika, tradīcijas vai tas, kā "būtu pareizi" turēt
          asmeni. Viņu interesēja tikai <Hl>tas, kas strādā</Hl>.
        </p>

        <p style={P}>
          Tā būtībā ir visa mana <Hl>LEAN filosofija</Hl>. Jebkura lieka darbība, jebkurš
          estētisks uzlabojums, kas nenes rezultātu, ir sistēmas piesārņojums. Japāņiem ir tāds
          koncepts Kaizen — tā vietā, lai zīmētu grandiozus plānus, tu vienkārši izdari 1%
          uzlabojumu katru dienu. Ja mana sistēma vai kods šodien ir nedaudz efektīvāks nekā vakar,
          tas ir pietiekami. Viss pārējais ir kosmētika, no kuras vajag atbrīvoties.
        </p>

        {/* Mērķis */}
        <p style={{ ...P_L, color: "#4A4A4A" }}>Mērķis: Asimetriskā svira</p>

        <p style={P}>
          Kāpēc vispār kaut ko būvēt? Navals Ravikants to noformulēja diezgan precīzi: pārdodot
          savu laiku, brīvību nenopirksi.
        </p>

        <p style={P}>
          Mans mērķis nav "smagi strādāt" vai kolekcionēt darba stundas. Mērķis ir{" "}
          <Hl>asimetriska svira</Hl>. Uzrakstīt kodu vai uzbūvēt sistēmu vienreiz, lai tā
          turpinātu strādā un pieņemt lēmumus bez manas fiziskas klātbūtnes tūkstošiem reižu.
          Bizness un kapitāls ir tikai blakusprodukts labi uzbūvētam dzinējam, kas spēj darboties
          autonomi.
        </p>

        {/* Metode */}
        <p style={{ ...P_L, color: "#4A4A4A" }}>Metode: Sterilitāte un reālie motīvi</p>

        <p style={P}>
          Kā to izdarīt, nesajūkot prātā un nepazaudējot fokusu? Metode ir diezgan sena un
          attīrīta no emocijām.
        </p>

        <p style={P}>
          Stoicisms manā ikdienā nav nekāda augstā filosofija, tas ir vienkārši rīks{" "}
          <Hl>emocionālajai sterilitātei</Hl>. Tirgus krīt, kampaņa nestrādā, serveris uzkaras —
          tas ir vienkārši fakts. Faktiem nav emocionāla svara, tie vienkārši prasa tehnisku
          risinājumu.
        </p>

        <p style={P}>
          Frīdrihs Nīče uzskatīja, ka cilvēkam ir sevi jāpārvar, jāpārraksta noklusējuma
          noteikumi. Nevienam neinteresē tava ērtība, un tirgum ir nospļauties par tavām jūtām. Tu
          vai nu uzbūvē savu sistēmu, vai kļūsti par skrūvīti kāda cita sistēmā.
        </p>

        <p style={P}>
          Savukārt Karls Jungs ļoti labi saprata, ka zem katras virskārtas slēpjas ēna. Biznesā
          tas nozīmē redzēt un strādāt ar reālajiem, bieži vien tumšajiem cilvēku un tirgus
          motīviem, nevis ar to, kā lietām "vajadzētu" izskatīties.{" "}
          <Hl>Radikāla patiesība vienmēr uzvar ilūzijas.</Hl>
        </p>

        <p style={{ marginTop: "40px" }}>
          Tas arī viss. Sistēma, svira un izpilde. Vari atgriezties pie galvenās lapas.
        </p>

      </div>
    </section>
  )
}
