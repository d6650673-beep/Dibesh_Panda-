import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { CertificatesSection } from '@/components/landing/CertificatesSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { SkillsSection } from '@/components/landing/SkillsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <CertificatesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
