export function Stats() {
  const items = [
    { v: "24h", l: "Demo laiks" },
    { v: "€50/mēn", l: "Sākuma cena" },
    { v: "7 dienas", l: "Pilna mājaslapa" },
  ];
  return (
    <section className="border-t border-b border-hairline">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-3 divide-x divide-hairline">
        {items.map((i) => (
          <div key={i.v} className="text-center px-4">
            <div className="font-display font-black text-2xl md:text-3xl text-foreground">{i.v}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">{i.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
