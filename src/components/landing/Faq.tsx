import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  { q: "Cik ātri saņemšu demo?", a: "24 stundu laikā pēc pieprasījuma saņemšanas. Parasti ātrāk." },
  { q: "Vai man jāslēdz līgums pēc demo?", a: "Nē. Demo ir bezmaksas un bez saistībām. Tu izlemj, vai turpināt." },
  { q: "Cik maksā pilna mājaslapa?", a: "Sākuma cena ir €50 mēnesī — ietver mājaslapu, hostingu un atjauninājumus. Nav vienreizēja maksājuma." },
  { q: "Kādā tehnoloģijā tiek veidotas lapas?", a: "React, Next.js vai Lovable — atkarībā no projekta vajadzībām. Visas lapas ir ātras, mobilās un SEO draudzīgas." },
  { q: "Vai varat palīdzēt arī ar Google Ads vai SEO?", a: "Jā. Pēc mājaslapas izveides piedāvājam arī SEO optimizāciju, Google Ads pārvaldību un AI automatizāciju." },
];

export function Faq() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display font-black text-3xl md:text-4xl text-foreground text-center mb-12">
          Biežākie jautājumi
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-hairline">
              <AccordionTrigger className="font-display font-bold text-lg text-foreground hover:no-underline py-5">
                {it.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
