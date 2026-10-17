import './index.css'
import AboutPage from './components/Aboutpage.jsx'
import BackToTopButton from './components/BackToTopButton.jsx'
import ProjectsArchive from './components/ProjectsArchive.jsx'
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

  if (route === '/a-propos') {
    return (
      <>
        <AboutPage />
        <BackToTopButton />
      </>
    )
  }

  if (route === '/projets') {
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
