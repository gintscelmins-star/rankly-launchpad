import React from "react";

const wrapperBase: React.CSSProperties = {
  background: "#0A0A0A",
  width: 1080,
  height: 1080,
  position: "relative",
  overflow: "hidden",
};

const txt: React.CSSProperties = {
  fontFamily: "'Courier New', 'Courier', monospace",
  fontSize: 24,
  color: "#9A9A9A",
  lineHeight: 1.85,
};

function Hl({ children }: { children: React.ReactNode }) {
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
  );
}

export function MozaikaTileB({
  col,
  row,
  divRef,
}: {
  col: number;
  row: number;
  divRef: (el: HTMLDivElement | null) => void;
}) {
  const localCx = 1620 - col * 1080;
  const localCy = 1620 - row * 1080;

  const circle = (
    <svg style={{ position: "absolute", inset: 0 }} width={1080} height={1080}>
      <circle cx={localCx} cy={localCy} r={900} fill="none" stroke="#CC0000" strokeWidth="8" />
    </svg>
  );

  // Tile 1 (col=0, row=2): "LE"
  if (col === 0 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 120,
            color: "#E8E8E8",
            lineHeight: 1,
          }}
        >
          LE
        </div>
      </div>
    );
  }

  // Tile 2 (col=1, row=2): T1 — 25-min robbery scene
  // Circle bottom edge at y = localCy + r = -540 + 900 = 360, text starts below
  if (col === 1 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div style={{ position: "absolute", top: 420, left: 60, right: 60, ...txt }}>
          "Le Cercle Rouge" laupīšanas aina ilgst vairāk nekā 25 minūtes bez neviena vārda. Katra
          kustība kalpo funkcionālam mērķim. <Hl>Tukša runāšana ir izslēgta.</Hl>
        </div>
      </div>
    );
  }

  // Tile 3 (col=2, row=2): "ROUGE"
  if (col === 2 && row === 2) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 80,
            color: "#CC0000",
            lineHeight: 1,
          }}
        >
          ROUGE
        </div>
      </div>
    );
  }

  // Tile 4 (col=0, row=1): "CERCLE" vertical
  if (col === 0 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 60,
            transform: "translateY(-50%)",
            writingMode: "vertical-rl",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 96,
            color: "#E8E8E8",
            lineHeight: 1,
          }}
        >
          CERCLE
        </div>
      </div>
    );
  }

  // Tile 5 (col=1, row=1): circle center
  if (col === 1 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            color: "#CC0000",
            whiteSpace: "nowrap",
          }}
        >
          1970
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: "#4A4A4A",
            whiteSpace: "nowrap",
          }}
        >
          Jean-Pierre Melville
        </div>
      </div>
    );
  }

  // Tile 6 (col=2, row=1): T2 — space/morality text
  // Circle arc passes at x≈180 (left side), right portion x>220 is free
  if (col === 2 && row === 1) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 240,
            right: 60,
            bottom: 60,
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{ ...txt, margin: 0 }}>
            <Hl>Telpa ir neitrāla sistēma.</Hl> Morāle ir cilvēka projekcija uz telpu, nevis telpas
            īpašums. Kad tu noņem vizuālos morāles signālus, skatītājs paliek viens ar savu
            spriedumu — bez atbalsta, bez vadlīnijām. Un tas ir neērti. Jo lielākā daļa morāles
            ikdienā nav pārliecība — <Hl>tā ir imitācija apkārtējo reakcijās.</Hl>
          </p>
        </div>
      </div>
    );
  }

  // Tile 7 (col=0, row=0): RANKLY + sistema. svira.
  if (col === 0 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 60,
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            color: "#C8FF00",
          }}
        >
          RANKLY
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: 60,
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: "#4A4A4A",
          }}
        >
          sistema. svira.
        </div>
      </div>
    );
  }

  // Tile 8 (col=1, row=0): T3 — Delon character text
  // Circle bottom edge at y = localCy + r = 1620 + 900 = 2520 (below tile), top at 1620-900=720
  // So circle appears only below y=720, text fits in top 680px
  if (col === 1 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div style={{ position: "absolute", top: 60, left: 60, right: 60, bottom: 380, ...txt }}>
          Žana Pjēra Melvila kino ērā Alens Delons radīja tēlu, kas operē ārpus morāles un emocijām.{" "}
          Ne nonchalant — patiess, <Hl>tīrs tukšums</Hl>. <Hl>Amor fati</Hl> — bez nožēlas, bez
          eiforijas. Emocijas ir mainīgais, kas rada kļūdas un iznīcina sistēmas.
        </div>
      </div>
    );
  }

  // Tile 9 (col=2, row=0): T4 — judging the code text + rankly.lv
  // Circle only in lower-left corner (from ~(0,900) to (180,1080)), rest is free
  if (col === 2 && row === 0) {
    return (
      <div ref={divRef} style={wrapperBase}>
        {circle}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            right: 60,
            bottom: 140,
            ...txt,
            fontSize: 22,
          }}
        >
          Ja cilvēks rīkojas perfekti saskaņā ar savu kodu, bet šis kods ir ārpus sabiedriskās
          morāles sistēmas — ko mēs tiesājam? Personāžu vai normas, ko viņš nepārkāpj? Atbilde, ko
          Melville sniedz ar telpu un kadru — atsakoties iesaistīties emocionālajā spriedumā — ir:{" "}
          <Hl>jūs tiesājat sevi.</Hl> Savu nepieciešamību pēc morālas kārtības, kuras garantijas
          neeksistē.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            fontFamily: "'Courier New', monospace",
            fontSize: 20,
            color: "#C8FF00",
          }}
        >
          rankly.lv
        </div>
      </div>
    );
  }

  return <div ref={divRef} style={wrapperBase} />;
}
