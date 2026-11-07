import { useEffect, useMemo, useRef, useState } from 'react'
import ProjectLightbox from './ProjectLightbox.jsx'
import ProjectTag from './ProjectTag.jsx'
import './ProjectPage.css'

const basePath = import.meta.env.BASE_URL
const pad = (n) => String(n).padStart(2, '0')

function paragraphs(text) {
  if (!text) return []
  return (Array.isArray(text) ? text : String(text).split(/\n\s*\n/)).filter(Boolean)
}

function Spark() {
  return (
    <svg aria-hidden="true" className="pp-spark" viewBox="0 0 64 64">
      <path d="M32 1C34 21 43 30 63 32C43 34 34 43 32 63C30 43 21 34 1 32C21 30 30 21 32 1Z" />
    </svg>
  )
}

function Section({ block }) {
  const { id, number, label, title, text, stats, quote } = block

  return (
    <section aria-labelledby={`${id}-title`} className="pp-section" id={id}>
      <p className="pp-section__eyebrow">
        {number} / {label}
      </p>
      <h2 className="pp-section__title" id={`${id}-title`}>
        {title || label}
      </h2>
      <div className="pp-section__text">
        {paragraphs(text).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {stats?.length > 0 && (
        <dl className="pp-stats">
          {stats.map(({ value, label: statLabel }) => (
            <div key={statLabel}>
              <dt>{statLabel}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {quote && (
        <figure className="pp-quote">
          <Spark />
          <blockquote>« {quote.text} »</blockquote>
          {quote.author && <figcaption>{quote.author}</figcaption>}
        </figure>
      )}
    </section>
  )
}

function GalleryImage({ image, imageIndex, onOpen }) {
  return (
    <>
      <button
        aria-label={`Agrandir : ${image.caption}`}
        className="pp-figure__button"
        onClick={(event) => onOpen(imageIndex, event)}
        type="button"
      >
        <img alt={image.alt} decoding="async" loading="lazy" src={image.src} />
      </button>
      <figcaption>
        <span className="pp-figure__number">{pad(imageIndex + 1)}</span>
        <span>{image.caption}</span>
        <span aria-hidden="true" className="pp-figure__expand">
          ↗
        </span>
      </figcaption>
    </>
  )
}

function Gallery({ images, onOpen }) {
  // Image avec texte : image à côté du texte (côté qui alterne).
  // Images seules : première en grand, puis deux par deux ; la dernière seule d'une série passe en grand.
  const items = images.slice(1).map((image, i) => ({ image, imageIndex: i + 1, hasText: Boolean(image.note) }))

  let plainPosition = 0
  let textCount = 0
  const rows = items.map((item, i) => {
    if (item.hasText) {
      plainPosition = 0
      return { ...item, layout: 'text', flip: textCount++ % 2 === 1 }
    }
    const nextIsPlain = items[i + 1] && !items[i + 1].hasText
    const position = plainPosition++
    const wide = position % 3 === 0 || (position % 3 === 1 && !nextIsPlain)
    return { ...item, layout: wide ? 'wide' : 'half' }
  })

  return (
    <section aria-labelledby="galerie-title" className="pp-section pp-section--gallery" id="galerie">
      <h2 className="pp-sr-only" id="galerie-title">
        Galerie
      </h2>
      <div className="pp-gallery">
        {rows.map(({ image, imageIndex, layout, flip }) =>
          layout === 'text' ? (
            <div className={`pp-row${flip ? ' pp-row--flip' : ''}`} key={image.src}>
              <figure className="pp-figure pp-row__media">
                <GalleryImage image={image} imageIndex={imageIndex} onOpen={onOpen} />
              </figure>
              <div className="pp-row__text">
                {image.note.title && <h3>{image.note.title}</h3>}
                {paragraphs(image.note.text).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : (
            <figure className={`pp-figure${layout === 'wide' ? ' pp-figure--wide' : ''}`} key={image.src}>
              <GalleryImage image={image} imageIndex={imageIndex} onOpen={onOpen} />
            </figure>
          ),
        )}
      </div>
    </section>
  )
}

function VideoSection({ video }) {
  const { src, poster, title, text } = video

  return (
    <section aria-labelledby="video-title" className="pp-section pp-video" id="video">
      <p className="pp-section__eyebrow">
        <Spark /> La vidéo
      </p>
      <h2 className={title ? 'pp-section__title' : 'pp-sr-only'} id="video-title">
        {title || 'La vidéo'}
      </h2>
      {paragraphs(text).map((paragraph) => (
        <p className="pp-video__text" key={paragraph}>
          {paragraph}
        </p>
      ))}
      <div className="pp-video__frame">
        <video controls playsInline poster={poster} preload="metadata" src={src}>
          Ton navigateur ne peut pas lire cette vidéo.
        </video>
      </div>
    </section>
  )
}

function DossierSection({ dossier }) {
  const { title, eyebrow, text, image, pdf, pdfName, link, linkLabel, details } = dossier
  const href = pdf || link

  return (
    <section aria-labelledby="dossier-title" className="pp-section pp-dossier" id="dossier">
      <div className="pp-dossier__card">
        {link && !pdf ? (
          // Lien vers un site : aperçu dans une fenêtre de navigateur
          <a aria-hidden="true" className="pp-dossier__browser" href={link} rel="noopener" tabIndex={-1} target="_blank">
            <span className="pp-dossier__browser-bar">
              <span />
              <span />
              <span />
              <span className="pp-dossier__browser-url">{link.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
            </span>
            <img alt="" decoding="async" loading="lazy" src={image} />
          </a>
        ) : (
          <a aria-hidden="true" className="pp-dossier__preview" href={href} rel="noopener" tabIndex={-1} target="_blank">
            <span className="pp-dossier__sheet pp-dossier__sheet--back" />
            <span className="pp-dossier__sheet pp-dossier__sheet--mid" />
            <span className="pp-dossier__sheet pp-dossier__sheet--front">
              <img alt="" decoding="async" loading="lazy" src={image} />
            </span>
          </a>
        )}

        <div className="pp-dossier__info">
          <p className="pp-section__eyebrow">
            <Spark /> {eyebrow}
          </p>
          <h2 className="pp-section__title" id="dossier-title">
            {title}
          </h2>
          {paragraphs(text).map((paragraph) => (
            <p className="pp-dossier__text" key={paragraph}>
              {paragraph}
            </p>
          ))}

          {pdf || link ? (
            // PDF et/ou lien : chaque bouton n'apparaît que s'il a quelque chose à ouvrir
            <div className="pp-dossier__actions">
              {pdf && (
                <a className="pp-btn pp-btn--primary" href={pdf} rel="noopener" target="_blank">
                  Consulter le PDF <span aria-hidden="true">↗</span>
                </a>
              )}
              {link && (
                <a className={`pp-btn${pdf ? '' : ' pp-btn--primary'}`} href={link} rel="noopener" target="_blank">
                  {linkLabel || 'Visiter le site'} <span aria-hidden="true">↗</span>
                </a>
              )}
              {pdf && (
                <a className="pp-btn" download={pdfName} href={pdf}>
                  Télécharger <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          ) : (
            import.meta.env.DEV && <p className="pp-dossier__details">⚠ Pas encore de PDF : dépose-le dans le dossier du projet et écris son nom dans « pdf » (projectDetails.js). Cette carte n’apparaît pas sur le site en ligne tant qu’il n’y a pas de PDF.</p>
          )}
          {details && <p className="pp-dossier__details">{details}</p>}
        </div>
      </div>
    </section>
  )
}

function ProjectPage({ page }) {
  const { project, accent, tagline, intro, meta, images, blocks, dossier, video, files, position, total, previous, next } =
    page
  const [openIndex, setOpenIndex] = useState(null)
  const [activeId, setActiveId] = useState(blocks[0]?.id)
  const returnFocusRef = useRef(null)

  const toc = useMemo(() => blocks.map(({ id, label }) => ({ id, label })), [blocks])

  useEffect(() => {
    document.title = `${project.title} · Nina Pinardel`
  }, [project.title])

  // Aide (mode développement uniquement) : noms à utiliser dans imageTexts
  useEffect(() => {
    if (import.meta.env.DEV && files.length > 0) {
      console.info(`[${project.title}] fichiers de la galerie (pour imageTexts) :`, files)
    }
  }, [project.title, files])

  // Sommaire : la section visible à l'écran est mise en avant
  useEffect(() => {
    const ids = toc.map((item) => item.id)
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0 || !('IntersectionObserver' in window)) return undefined

    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        const current = ids.find((id) => visible.has(id))
        if (current) setActiveId(current)
      },
      { rootMargin: '-20% 0px -55% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [toc])

  function openLightbox(index, event) {
    returnFocusRef.current = event.currentTarget
    setOpenIndex(index)
  }

  const metaItems = [{ label: 'Année', value: String(project.year) }, ...meta]

  // Textes (avec le sommaire à gauche), puis à partir de la galerie : bloc centré pleine largeur
  const wideAt = blocks.findIndex((block) => ['video', 'gallery', 'dossier'].includes(block.type))
  const textBlocks = wideAt === -1 ? blocks : blocks.slice(0, wideAt)
  const wideBlocks = wideAt === -1 ? [] : blocks.slice(wideAt)
  const showToc = blocks.length > 1

  function renderBlock(block) {
    if (block.type === 'gallery') return <Gallery images={images} key={block.id} onOpen={openLightbox} />
    if (block.type === 'dossier') return <DossierSection dossier={dossier} key={block.id} />
    if (block.type === 'video') return <VideoSection key={block.id} video={video} />
    return <Section block={block} key={block.id} />
  }

  return (
    <article className="project-page" data-accent={accent}>
      <div className="pp-topbar">
        <a className="pp-back" href={`${basePath}projets`}>
          <span aria-hidden="true">←</span> Tous les projets
        </a>
        <span className="pp-count">
          {pad(position)} / {pad(total)} · {project.year}
        </span>
      </div>

      <header className="pp-hero">
        <div className="pp-hero__media">
          <button
            aria-label={`Agrandir le visuel de ${project.title}`}
            className="pp-cover"
            onClick={(event) => openLightbox(0, event)}
            type="button"
          >
            <img alt={images[0].alt} decoding="async" src={images[0].src} />
            <span aria-hidden="true" className="pp-cover__expand">
              ↗
            </span>
          </button>
        </div>

        <div className="pp-hero__info">
          <p className="pp-eyebrow">
            <ProjectTag but={project.but} inline type={project.type} />
            <span>{project.category}</span>
          </p>
          <h1 className="pp-title">
            {project.title}
            <span>.</span>
          </h1>
          {tagline && <p className="pp-tagline">{tagline}</p>}
          <p className="pp-intro">{intro}</p>
          <dl className="pp-meta">
            {metaItems.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {textBlocks.length > 0 && (
        <div className={`pp-body${showToc ? ' pp-body--toc' : ''}`}>
          {showToc && (
            <nav aria-label="Dans ce projet" className="pp-toc">
              <p className="pp-toc__title">Dans ce projet</p>
              <ul>
                {toc.map(({ id, label }) => (
                  <li key={id}>
                    <a aria-current={activeId === id ? 'true' : undefined} href={`#${id}`}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <Spark />
            </nav>
          )}

          <div className="pp-content">{textBlocks.map(renderBlock)}</div>
        </div>
      )}

      {/* Galerie, dossier et ce qui suit : centrés sur toute la largeur de la page */}
      {wideBlocks.length > 0 && (
        <div className={`pp-wide${textBlocks.length > 0 ? ' pp-wide--after' : ''}`}>
          <div className="pp-wide__inner">{wideBlocks.map(renderBlock)}</div>
        </div>
      )}

      <nav aria-label="Autres projets" className="pp-pager">
        <a className="pp-pager__link" href={`${basePath}projets/${previous.slug}`}>
          <span className="pp-pager__label">← Projet précédent</span>
          <span className="pp-pager__title">{previous.title}</span>
        </a>
        <a className="pp-pager__link" href={`${basePath}projets/${next.slug}`}>
          <span className="pp-pager__label">Projet suivant ↗</span>
          <span className="pp-pager__title">{next.title}</span>
        </a>
      </nav>

      {openIndex !== null && (
        <ProjectLightbox
          images={images}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          returnFocusRef={returnFocusRef}
        />
      )}
    </article>
  )
}

export default ProjectPage