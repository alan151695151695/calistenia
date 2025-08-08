import Hero from "../components/Hero";
import Program from "../components/Program";
import Challenge from "../components/Challenge";
import Learn from "../components/Learn";
import Bonuses from "../components/Bonuses";
import Argument from "../components/Argument";
import Guarantee from "../components/Guarantee";
import AccessSteps from "../components/AccessSteps";
import Trust from "../components/Trust";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import copy from "../lib/copy";

export const metadata = {
  title: "Calistenia – Guía Completa (ES)",
  description: "Entrena en cualquier lugar con +421 videos y acceso inmediato."
};

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800">
      <Hero {...copy.hero} />
      <Program {...copy.program} />
      <Challenge {...copy.challenge} />
      <Learn {...copy.learn} />
      <Bonuses {...copy.bonuses} />
      <Argument {...copy.argument} />
      <Guarantee {...copy.guarantee} />
      <AccessSteps {...copy.access} />
      <Trust {...copy.trust} />
      <Pricing {...copy.pricing} />
      <CTA {...copy.cta} />
      <Footer {...copy.footer} />
    </main>
  );
}