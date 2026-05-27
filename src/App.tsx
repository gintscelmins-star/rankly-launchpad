import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WebsiteBlock } from "@/components/sections/WebsiteBlock";
import { LeadGenBlock } from "@/components/sections/LeadGenBlock";
import { AIBlock } from "@/components/sections/AIBlock";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { NelasitLink } from "@/components/sections/NelasitLink";
import { CtaForm } from "@/components/landing/CtaForm";
import { Footer } from "@/components/landing/Footer";
import { NelasitPage } from "@/pages/NelasitPage";

const queryClient = new QueryClient();

export function App() {
  if (window.location.pathname.startsWith("/nelasit")) {
    return <NelasitPage />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster theme="dark" position="top-center" richColors />
        <Navbar />
        <main>
          <Hero />
          <WebsiteBlock />
          <LeadGenBlock />
          <AIBlock />
          <NelasitLink />
          <FooterCTA />
          <CtaForm />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
