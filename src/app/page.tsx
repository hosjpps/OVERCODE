import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import ShowcaseReel from '@/components/sections/ShowcaseReel';
import Services from '@/components/sections/Services';
import Numbers from '@/components/sections/Numbers';
import Packages from '@/components/sections/Packages';
import Process from '@/components/sections/Process';
import Cases from '@/components/sections/Cases';
import WhyUs from '@/components/sections/WhyUs';
import TechStack from '@/components/sections/TechStack';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';
import StickyChat from '@/components/layout/StickyChat';
import FloatingElements from '@/components/ui/FloatingElements';
import CursorGlow from '@/components/ui/CursorGlow';

const Divider = () => <div className="section-divider" />;

export default function Home() {
  return (
    <>
      <Preloader />
      <FloatingElements />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <ShowcaseReel />
        <Divider />
        <Services />
        <Numbers />
        <Divider />
        <Packages />
        <Divider />
        <Process />
        <Divider />
        <Cases />
        <WhyUs />
        <Divider />
        <TechStack />
        <Divider />
        <FAQ />
        <Divider />
        <CTA />
      </main>
      <Footer />
      <StickyChat />
    </>
  );
}
