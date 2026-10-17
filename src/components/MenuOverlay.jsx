import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './MenuOverlay.css'

const email = 'ninapinardel@gmail.com'
const basePath = import.meta.env.BASE_URL

function MenuOverlay({ onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const appBasePath = window.location.pathname.startsWith(basePath) ? basePath : '/'
  const appPath = window.location.pathname.startsWith(basePath)
    ? `/${window.location.pathname.slice(basePath.length)}`
    : window.location.pathname
  const route = appPath.replace(/\/+$/, '') || '/'
  const isHomePage = route === '/'
  const isAboutPage = route === '/a-propos'
  const destinations = [
    { label: 'Accueil', href: isHomePage ? '#top' : `${appBasePath}#top` },
    { label: 'Projets', href: `${appBasePath}projets` },
    { label: 'À propos', href: `${appBasePath}a-propos` },
    {
      label: 'Contact',
      href: isHomePage || isAboutPage ? '#contact' : `${appBasePath}#contact`,
    },
  ]

  function closeOnInternalLink(event) {
    const { hash } = event.currentTarget
    const targetId = hash.slice(1)
    onClose({ returnFocus: false })
    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.focus({ preventScroll: true })
      })
    }
  }

  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function closeFromBackdrop(event) {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <div className="menu-overlay" onMouseDown={closeFromBackdrop}>
      <section
        aria-labelledby="menu-overlay-title"
        aria-modal="true"
        className="menu-overlay__dialog"
        id="portfolio-menu"
        ref={dialogRef}
        role="dialog"
      >
        <header className="menu-overlay__topbar">
          <button
            aria-label="Fermer le menu"
            className="menu-overlay__close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <span aria-hidden="true">×</span>
            Fermer
          </button>
          <span className="menu-overlay__topbar-note">Navigation</span>
          <span aria-hidden="true" className="menu-overlay__topbar-mark">
            Nina Pinardel
          </span>
        </header>

        <div className="menu-overlay__content">
          <div className="menu-overlay__navigation">
            <p className="menu-overlay__eyebrow" id="menu-overlay-title">
              Prenez le temps d’explorer.
            </p>
            <nav aria-label="Navigation du portfolio">
              <ol className="menu-overlay__list">
                {destinations.map(({ label, href }, index) => (
                  <li className="menu-overlay__item" key={href}>
                    <a className="menu-overlay__link" href={href} onClick={closeOnInternalLink}>
                      <span aria-hidden="true" className="menu-overlay__number">
                        0{index + 1}
                      </span>
                      <span className="menu-overlay__label">{label}</span>
                      <span aria-hidden="true" className="menu-overlay__arrow">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <aside aria-label="Coordonnées et informations" className="menu-overlay__aside">
            <div aria-hidden="true" className="menu-overlay__sun" />
            <div className="menu-overlay__contact">
              <p className="menu-overlay__eyebrow">Une idée en tête ?</p>
              <a className="menu-overlay__email" href={`mailto:${email}`} onClick={onClose}>
                {email}
              </a>
            </div>
            <div className="menu-overlay__availability">
              <p className="menu-overlay__eyebrow">Disponible dès maintenant</p>
              <p>À Limoges et Brive, j’imagine des identités et des expériences visuelles.</p>
            </div>
            <a
              className="menu-overlay__cv"
              href={`${basePath}sources/CV_derniere_version.pdf`}
              rel="noopener noreferrer"
              target="_blank"
            >
              CV <span aria-hidden="true">↗</span>
            </a>
            <div className="menu-overlay__socials">
              <a href={`mailto:${email}`} onClick={onClose}>
                E-mail <span aria-hidden="true">↗</span>
              </a>
              <a
                href={isHomePage || isAboutPage ? '#contact' : `${appBasePath}#contact`}
                onClick={closeOnInternalLink}
              >
                Me contacter <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>

        <footer className="menu-overlay__footer">
          <span>Nina Pinardel · 2026</span>
          <span>Des idées sensibles.</span>
        </footer>
      </section>
    </div>,
    document.body,
  )
}

export default MenuOverlay
