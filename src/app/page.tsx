import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { SkillsSection } from '@/components/landing/SkillsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
