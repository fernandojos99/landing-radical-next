'use client';

import { Navbar } from './navbar';
import { HeroSection } from './hero-section';
import { AboutSection } from './about-section';
import { ProfilesSection } from './profiles-section';
import { RequirementsSection } from './requirements-section';
// import { ProcessSection } from './process-section';
import { CriteriaSection } from './criteria-section';
import { DatesSection } from './dates-section';
import { CtaSection } from './cta-section';
import { Footer } from './footer';

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProfilesSection />
      <RequirementsSection />
      {/* <ProcessSection /> */}
      <CriteriaSection />
      <DatesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
