import './index.css'
import AboutPage from './components/Aboutpage.jsx'
import BackToTopButton from './components/BackToTopButton.jsx'
import LegalPage from './components/LegalPage.jsx'
import ProjectPage from './components/ProjectPage.jsx'
import ProjectsArchive from './components/ProjectsArchive.jsx'
import { getProjectPage } from './data/projectDetails.js'
import {
  AboutSection,
  ContactSection,
  Header,
  HeroSection,
  InformationStrip,
  ProjectsSection,
} from './components/PortfolioSections.jsx'

function App() {
  const basePath = import.meta.env.BASE_URL
  const appPath = window.location.pathname.startsWith(basePath)
    ? `/${window.location.pathname.slice(basePath.length)}`
    : window.location.pathname
  const route = appPath.replace(/\/+$/, '') || '/'
  const projectSlug = route.match(/^\/projets\/([^/]+)$/)?.[1]
  const projectPage = projectSlug ? getProjectPage(decodeURIComponent(projectSlug)) : null

  if (route === '/a-propos') {
    return (
      <>
        <AboutPage />
        <BackToTopButton />
      </>
    )
  }

  if (route === '/mentions-legales') {
    return (
      <>
        <div className="portfolio-shell" id="top" tabIndex="-1">
          <Header />
          <main>
            <LegalPage />
            <ContactSection />
          </main>
        </div>
        <BackToTopButton />
      </>
    )
  }

  if (projectPage) {
    return (
      <>
        <div className="portfolio-shell" id="top" tabIndex="-1">
          <Header />
          <main>
            <ProjectPage page={projectPage} />
            <ContactSection />
          </main>
        </div>
        <BackToTopButton />
      </>
    )
  }

  // Page projet introuvable : on affiche la liste des projets
  if (route === '/projets' || projectSlug) {
    return (
      <>
        <div className="portfolio-shell" id="top" tabIndex="-1">
          <Header />
          <main>
            <ProjectsArchive />
            <ContactSection />
          </main>
        </div>
        <BackToTopButton />
      </>
    )
  }

  return (
    <>
      <div className="portfolio-shell" id="top" tabIndex="-1">
        <Header />
        <main>
          <HeroSection />
          <InformationStrip />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </main>
      </div>
      <BackToTopButton />
    </>
  )
}

export default App