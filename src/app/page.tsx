import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { CertificatesSection } from '@/components/landing/CertificatesSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { SkillsSection } from '@/components/landing/SkillsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CertificatesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
