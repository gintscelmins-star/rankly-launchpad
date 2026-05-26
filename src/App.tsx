import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { Portfolio } from "@/components/landing/Portfolio";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { About } from "@/components/sections/About";
import { Process } from "@/components/landing/Process";
import { CtaForm } from "@/components/landing/CtaForm";
import { Faq } from "@/components/landing/Faq";
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
          <Stats />
          <Problem />
          <Solution />
          <Portfolio />
          <Services />
          <CaseStudies />
          <About />
          <Process />
          <CtaForm />
          <Faq />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
