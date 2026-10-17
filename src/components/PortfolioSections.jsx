import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import MenuOverlay from './MenuOverlay.jsx'
import sweatBackArtwork from '../assets/Mesprojets/sweatmmi/Back pull BLANC noir.png'
import hieroDancerArtwork from '../assets/Mesprojets/flyerhiero/danseuse.jpg'

const email = 'ninapinardel@gmail.com'
const basePath = import.meta.env.BASE_URL

/* Inclinaison 3D d'un élément qui suit la souris (desktop uniquement) */
function useTilt(maxTilt = 7) {
  const ref = useRef(null)
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  function onPointerMove(event) {
    if (event.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--rx', `${(0.5 - y) * maxTilt * 2}deg`)
      element.style.setProperty('--ry', `${(x - 0.5) * maxTilt * 2}deg`)
      element.style.setProperty('--mx', `${x * 100}%`)
      element.style.setProperty('--my', `${y * 100}%`)
      element.classList.add('is-tilting')
    })
  }

  function onPointerLeave() {
    cancelAnimationFrame(frame.current)
    const element = ref.current
    if (!element) return
    element.style.setProperty('--rx', '0deg')
    element.style.setProperty('--ry', '0deg')
    element.classList.remove('is-tilting')
  }

  return { ref, onPointerMove, onPointerLeave }
}

/* Halo + cercle qui suivent la souris sur tout le site */
function CursorFollower() {
  const glowRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduced) return undefined

    const glow = glowRef.current
    const ring = ringRef.current
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const glowPos = { ...target }
    const ringPos = { ...target }
    let visible = false
    let frame = 0

    function show() {
      visible = true
      glow.classList.add('is-visible')
      ring.classList.add('is-visible')
    }

    function hide() {
      visible = false
      glow.classList.remove('is-visible')
      ring.classList.remove('is-visible')
    }

    function onMove(event) {
      target.x = event.clientX
      target.y = event.clientY
      if (!visible) {
        glowPos.x = ringPos.x = target.x
        glowPos.y = ringPos.y = target.y
        show()
      }
      const interactive = event.target instanceof Element && event.target.closest('a, button')
      ring.classList.toggle('is-active', Boolean(interactive))
    }

    function tick() {
      glowPos.x += (target.x - glowPos.x) * 0.07
      glowPos.y += (target.y - glowPos.y) * 0.07
      ringPos.x += (target.x - ringPos.x) * 0.22
      ringPos.y += (target.y - ringPos.y) * 0.22
      glow.style.transform = `translate3d(${glowPos.x}px, ${glowPos.y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', hide)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', hide)
    }
  }, [])

  return createPortal(
    <>
      <div aria-hidden="true" className="cursor-glow" ref={glowRef} />
      <div aria-hidden="true" className="cursor-ring" ref={ringRef}>
        <span />
      </div>
    </>,
    document.body,
  )
}

function ArrowLink({ children, href, tone = 'light', className = '', ...props }) {
  return (
    <a className={`arrow-link arrow-link--${tone} ${className}`} href={href} {...props}>
      <span>{children}</span>
      <span aria-hidden="true" className="arrow-link__arrow">
        ↗
      </span>
    </a>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  function closeMenu({ returnFocus = true } = {}) {
    setIsMenuOpen(false)
    if (returnFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  return (
    <header className="site-header">
      <nav aria-label="Navigation principale" className="header-nav">
        <button
          aria-controls={isMenuOpen ? 'portfolio-menu' : undefined}
          aria-expanded={isMenuOpen}
          className="header-menu"
          onClick={() => setIsMenuOpen(true)}
          ref={menuButtonRef}
          type="button"
        >
          <span aria-hidden="true" className="menu-mark">
            <i />
            <i />
          </span>
          Menu
        </button>
        <div className="header-links">
          <a href={`mailto:${email}`}>Contactez-moi</a>
          <a href={`${basePath}sources/CV_derniere_version.pdf`} rel="noopener noreferrer" target="_blank">
            CV
          </a>
        </div>
      </nav>
      {isMenuOpen && <MenuOverlay onClose={closeMenu} />}
      <CursorFollower />
    </header>
  )
}

function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero-meta eyebrow">
        <span>Portfolio</span>
        <span>Limoges · Brive · France</span>
      </div>
      <div className="hero-title-block">
        <div className="hero-heading-row">
          <h1 id="hero-title">Nina Pinardel.</h1>
          <img
            alt="Portrait de Nina entourée de rayons roses."
            className="hero-portrait"
            src={`${basePath}images/alma-portrait.png`}
          />
        </div>
        <p className="hero-role">Portfolio · Création Numérique</p>
      </div>
      <div aria-hidden="true" className="hero-sun">
        <span />
      </div>
      <div className="hero-intro">
        <span className="hero-signature">Découvrons la suite.</span>
      </div>
      <div className="hero-actions">
        <ArrowLink href={`${basePath}projets`} tone="lavender">
          Voir les projets
        </ArrowLink>
        <ArrowLink href={`mailto:${email}`}>
          Contact
        </ArrowLink>
      </div>
    </section>
  )
}

const information = [
  { label: 'Disponibilité', value: 'Dès maintenant' },
  { label: 'Spécialités', value: 'Identité · Graphisme · Digital' },
  { label: 'Localisation', value: 'Limoges, Brive, France' },
  { label: 'Contact direct', value: email, href: `mailto:${email}` },
]

function InformationStrip() {
  return (
    <div aria-label="Informations pratiques" className="information-strip" role="group">
      {/* La liste est dupliquée pour que la boucle défile sans coupure.
          La copie est cachée aux lecteurs d'écran et au focus clavier. */}
      {[0, 1].map((copy) => (
        <dl
          aria-hidden={copy === 1 ? 'true' : undefined}
          className="information-track"
          key={copy}
        >
          {information.map(({ label, value, href }) => (
            <div className="information-item" key={label}>
              <dt>{label}</dt>
              <dd>
                {href ? (
                  <a href={href} tabIndex={copy === 1 ? -1 : undefined}>
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  )
}

const projects = [
  {
    title: 'Sweat MMI',
    description: 'Concours de design du sweat du département MMI',
    discipline: 'Photoshop · Illustrator',
    artwork: sweatBackArtwork,
    artworkAlt: 'Sweat à capuche blanc avec le logo MMI imprimé dans le dos.',
  },
  {
    title: 'Flyer HIERO',
    description: 'Concevoir des Flyer pour promouvoir des concerts.',
    discipline: 'Photoshop · Tablette graphique',
    artwork: hieroDancerArtwork,
    artworkAlt: 'Visuel de danseuse créé pour le flyer HIERO.',
  },
]

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-card--${index + 1}`}>
      <figure className={`project-art project-art--${index + 1}`}>
        <img
          alt={project.artworkAlt}
          className="project-art__image"
          decoding="async"
          loading="lazy"
          src={project.artwork}
        />
      </figure>
      <div className="project-details">
        <div>
          {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
          <h3>{project.title}<span>.</span></h3>
        </div>
        <div className="project-description">
          <p>{project.description}</p>
          <span>{project.discipline}</span>
        </div>
      </div>
    </article>
  )
}

function ProjectsSection() {
  return (
    <section aria-labelledby="projects-title" className="projects-section" id="projects" tabIndex="-1">
      <div className="section-heading">
        <h2 id="projects-title">Mes projets.</h2>
        <span className="section-note">01 — 02 / 2026</span>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard index={index} key={project.title} project={project} />
        ))}
      </div>
      <a className="text-link all-projects" href={`${basePath}projets`}>
        <span>Tous les projets · 12</span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function AboutSection() {
  const tilt = useTilt(7)

  return (
    <section aria-labelledby="about-title" className="about-section" id="about" tabIndex="-1">
      <div className="about-kicker eyebrow">
        <span>À propos</span>
      </div>
      <div className="about-content">
        <div className="about-heading">
          <img
            alt=""
            aria-hidden="true"
            className="about-portrait"
            src={`${basePath}images/alma-portrait.png`}
          />
          <h2 id="about-title">
            À PROPOS
            <br />
            DE MOI
          </h2>
        </div>
        <div
          className="about-copy"
          onPointerLeave={tilt.onPointerLeave}
          onPointerMove={tilt.onPointerMove}
          ref={tilt.ref}
        >
          <p className="about-intro">
            Hello ! Moi, c’est Nina, j’ai 20 ans et je suis toujours en train de chercher une nouvelle idée à transformer en quelque chose de concret !
          </p>
          <p>
            J’aime créer sous toutes ses formes : design, illustration, communication visuelle, web… mais aussi dessin, peinture, couture et autres activités manuelles. Ce que j’aime surtout, c’est partir d’une idée, parfois toute simple, et la voir prendre forme petit à petit.
          </p>
          <p>
            Je suis actuellement en BUT MMI, parcours Création numérique, et ce portfolio rassemble une partie de ce que j’ai pu imaginer, expérimenter et réaliser au fil de mon parcours.
          </p>
          <p className="about-lead">Bienvenue dans mon univers ! ♡</p>
          <ArrowLink href={`mailto:${email}`} className="about-link">
            En savoir plus
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}

function SocialLinks() {
  return (
    <nav aria-label="Réseaux sociaux" className="contact-socials">
      <a
        aria-label="LinkedIn (nouvel onglet)"
        href="https://www.linkedin.com/in/nina-pinardel-814a77332/?isSelfProfile=true"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M5.3 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM3.8 8.5h3v11h-3v-11Zm5 0h2.9V10h.1a3.2 3.2 0 0 1 2.9-1.7c3.1 0 3.7 2 3.7 4.6v6.6h-3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6h-3v-11Z" />
        </svg>
        <span>LinkedIn</span>
      </a>
      <a
        aria-label="Instagram (nouvel onglet)"
        href="https://www.instagram.com/desi_gnbynina/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <rect height="15" rx="4" width="15" x="4.5" y="4.5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle className="contact-socials__dot" cx="17.2" cy="6.9" r="1" />
        </svg>
        <span>Instagram</span>
      </a>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-copyright">© 2026 Nina Pinardel</span>
      <span className="footer-location">Limoges · Brive · France</span>
      <a
        className="footer-legal"
        href={`mailto:${email}?subject=Demande%20des%20mentions%20l%C3%A9gales`}
        title="Demander les mentions légales par e-mail"
      >
        Mentions légales
      </a>
    </footer>
  )
}

function ContactSection() {
  return (
    <div className="contact-footer">
      <section aria-labelledby="contact-title" className="contact-section" id="contact" tabIndex="-1">
        <div className="contact-topline eyebrow">
          <span>Une idée en tête ?</span>
          <span>Je serais ravie d’en parler.</span>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <h2 id="contact-title">
              Parlons de
              <br />
              votre idée<span>.</span>
            </h2>
            <div className="contact-actions">
              <a className="contact-email" href={`mailto:${email}`}>
                {email}
              </a>
              <ArrowLink href={`mailto:${email}`} tone="lavender" className="contact-button">
                Écrivez-moi
              </ArrowLink>
              <ArrowLink
                href={`${basePath}sources/CV_derniere_version.pdf`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Mon CV
              </ArrowLink>
            </div>
          </div>
          <SocialLinks />
        </div>
      </section>
      {/* Le footer est rendu ici : retire <Footer /> de ton App.jsx */}
      <Footer />
    </div>
  )
}

export {
  AboutSection,
  ArrowLink,
  ContactSection,
  Footer,
  Header,
  HeroSection,
  InformationStrip,
  ProjectsSection,
  SocialLinks,
  email,
  useTilt,
}