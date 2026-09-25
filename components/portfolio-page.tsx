import { AboutSection } from './about-section';
import { AchievementsSection } from './achievements-section';
import { EducationSection } from './education-section';
import { ExperienceSection } from './experience-section';
import { Footer } from './footer';
import { HobbiesSection } from './hobbies-section';
import { ProfileHeader } from './profile-header';
import { Settings } from './settings';
import { ProjectsSection } from './projects-section';
import { TechnologiesSection } from './technologies-section';
import { AvatarMenu } from "./avatar-menu";
export function PortfolioPage() {
  return (
    <main className="page-shell">
      <div className="portfolio-column">
        <nav className="site-nav" aria-label="Main navigation">
          <AvatarMenu />
          <div className="site-nav__links">
            <a href="#list-project">Work</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
          </div>
          <Settings />
        </nav>
        <ProfileHeader />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <TechnologiesSection />
        <AchievementsSection />
        <EducationSection />
        <HobbiesSection />
        <Footer />
      </div>
    </main>
  );
}
