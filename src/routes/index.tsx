import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { Portfolio } from "@/components/landing/Portfolio";
import { Process } from "@/components/landing/Process";
import { CtaForm } from "@/components/landing/CtaForm";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rankly — Web aģentūra Rīgā | Augstas konversijas mājaslapas" },
      {
        name: "description",
        content:
          "Rankly izveido augstas konversijas mājaslapas Latvijas B2B uzņēmumiem. Demo 24h laikā. Sākuma cena €50/mēn.",
      },
      { property: "og:title", content: "Rankly — Web aģentūra Rīgā" },
      {
        property: "og:description",
        content: "Augstas konversijas mājaslapas Latvijas B2B uzņēmumiem. Demo 24h laikā.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Solution />
        <Portfolio />
        <Process />
        <CtaForm />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
