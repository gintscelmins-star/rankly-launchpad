import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { NelasitPage } from "@/pages/NelasitPage";
import { MobileCTA } from "@/components/landing/MobileCTA";

const WebsiteBlock = lazy(() => import("@/components/sections/WebsiteBlock").then((m) => ({ default: m.WebsiteBlock })));
const LeadGenBlock = lazy(() => import("@/components/sections/LeadGenBlock").then((m) => ({ default: m.LeadGenBlock })));
const AIBlock      = lazy(() => import("@/components/sections/AIBlock").then((m) => ({ default: m.AIBlock })));
const NelasitLink  = lazy(() => import("@/components/sections/NelasitLink").then((m) => ({ default: m.NelasitLink })));
const FooterCTA    = lazy(() => import("@/components/sections/FooterCTA").then((m) => ({ default: m.FooterCTA })));
const CtaForm      = lazy(() => import("@/components/landing/CtaForm").then((m) => ({ default: m.CtaForm })));
const Footer       = lazy(() => import("@/components/landing/Footer").then((m) => ({ default: m.Footer })));

export function App() {
  if (window.location.pathname.startsWith("/nelasit")) {
    return <NelasitPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-14 md:pb-0">
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <WebsiteBlock />
          <LeadGenBlock />
          <AIBlock />
          <NelasitLink />
          <FooterCTA />
          <CtaForm />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <MobileCTA />
    </div>
  );
}
