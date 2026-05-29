import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { MobileCTA } from "@/components/landing/MobileCTA";
import { NelasitPage } from "@/pages/NelasitPage";
import { MozaikaGenerator } from "@/mozaika/MozaikaGenerator";
import { VideoGenerator } from "@/video/VideoGenerator";
import { MaterialGenerator } from "@/materials/MaterialGenerator";
import { ProfileGenerator } from "@/materials/profile/ProfileGenerator";

const WebsiteBlock = lazy(() => import("@/components/sections/WebsiteBlock").then((m) => ({ default: m.WebsiteBlock })));
const LeadGenBlock = lazy(() => import("@/components/sections/LeadGenBlock").then((m) => ({ default: m.LeadGenBlock })));
const AIBlock      = lazy(() => import("@/components/sections/AIBlock").then((m) => ({ default: m.AIBlock })));
const NelasitLink  = lazy(() => import("@/components/sections/NelasitLink").then((m) => ({ default: m.NelasitLink })));
const FooterCTA    = lazy(() => import("@/components/sections/FooterCTA").then((m) => ({ default: m.FooterCTA })));
const CtaForm      = lazy(() => import("@/components/landing/CtaForm").then((m) => ({ default: m.CtaForm })));
const Footer       = lazy(() => import("@/components/landing/Footer").then((m) => ({ default: m.Footer })));

function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    // Section not in DOM yet (lazy loading) — watch until it appears
    const observer = new MutationObserver(() => {
      if (tryScroll()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);
  return null;
}

export function App() {
  if (window.location.pathname.startsWith("/profile")) {
    return <ProfileGenerator />;
  }

  if (window.location.pathname.startsWith("/materials")) {
    return <MaterialGenerator />;
  }

  if (window.location.pathname.startsWith("/video")) {
    return <VideoGenerator />;
  }

  if (window.location.pathname.startsWith("/mozaika")) {
    return <MozaikaGenerator />;
  }

  if (window.location.pathname.startsWith("/nelasit")) {
    return <NelasitPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-14 md:pb-0">
      <ScrollToHash />
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
