import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { EventsSection } from '@/components/EventsSection';
import { TimelineSection } from '@/components/TimelineSection';
import { TeamSection } from '@/components/TeamSection';
import { RegistrationSection } from '@/components/RegistrationSection';
import { SponsorsSection } from '@/components/SponsorsSection';
import { Footer } from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <TimelineSection />
        <TeamSection />
        <RegistrationSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
