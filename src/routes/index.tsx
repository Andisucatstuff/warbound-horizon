import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/wt/Navbar";
import { TacticalBackdrop } from "@/components/wt/TacticalBackdrop";
import { Hero } from "@/components/wt/Hero";
import { About } from "@/components/wt/About";
import { TacticalAI } from "@/components/wt/TacticalAI";
import { Reviews } from "@/components/wt/Reviews";
import { DownloadCTA } from "@/components/wt/DownloadCTA";
import { Footer } from "@/components/wt/Footer";

const TITLE = "War Thunder Fan Hub | 3D Vehicle Customizer & Tactical AI";
const DESCRIPTION =
  "Explore a fan-made War Thunder experience: interactive 3D vehicle customizer, air/ground/naval feature briefings, player reviews and a simulated tactical AI assistant.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <TacticalBackdrop />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TacticalAI />
        <Reviews />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
