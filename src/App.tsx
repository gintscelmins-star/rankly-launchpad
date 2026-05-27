import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WebsiteBlock } from "@/components/sections/WebsiteBlock";
import { LeadGenBlock } from "@/components/sections/LeadGenBlock";
import { AIBlock } from "@/components/sections/AIBlock";
import { NelasitBlock } from "@/components/sections/NelasitBlock";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { CtaForm } from "@/components/landing/CtaForm";
import { Footer } from "@/components/landing/Footer";

const queryClient = new QueryClient();

export function App() {
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
          <NelasitBlock />
          <FooterCTA />
          <CtaForm />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
