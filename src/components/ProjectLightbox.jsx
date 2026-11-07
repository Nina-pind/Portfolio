import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const pad = (n) => String(n).padStart(2, '0')

/* Visionneuse plein écran : flèches, miniatures, zoom, swipe, clavier.
   images : [{ src, alt, caption }] · index : image affichée · onChange(i) · onClose() */
function ProjectLightbox({ images, index, onChange, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const frameRef = useRef(null)
  const thumbsRef = useRef(null)
  const swipeStart = useRef(null)
  const [zoom, setZoom] = useState(null) // { x, y } en % quand l'image est zoomée

  const total = images.length
  const image = images[index]

  const go = useCallback(
    (step) => {
      setZoom(null)
      onChange((index + step + total) % total)
    },
    [index, total, onChange],
  )

  // Scroll bloqué + focus dans la fenêtre, puis retour du focus à la fermeture
  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`
    closeRef.current?.focus()

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
      returnFocusRef?.current?.focus()
    }
  }, [returnFocusRef])

  // Clavier : Échap, flèches, focus piégé dans la fenêtre
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll('button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [go, onClose])

  // Précharge les voisines, centre la miniature active
  useEffect(() => {
    ;[index - 1, index + 1].forEach((i) => {
      const preload = new window.Image()
      preload.src = images[(i + total) % total].src
    })
    thumbsRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [index, images, total])

  function pointInFrame(event) {
    const rect = frameRef.current.getBoundingClientRect()
    return {
      x: Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100)),
    }
  }

  function toggleZoom(event) {
    setZoom(zoom ? null : pointInFrame(event))
  }

  function followPointer(event) {
    if (zoom && event.pointerType === 'mouse') setZoom(pointInFrame(event))
  }

  function onPointerDown(event) {
    if (event.pointerType === 'touch' && !zoom) swipeStart.current = event.clientX
  }

  function onPointerUp(event) {
    if (swipeStart.current === null) return
    const distance = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(distance) > 50) go(distance > 0 ? -1 : 1)
  }

  return createPortal(
    <div
      aria-label="Galerie du projet"
      aria-modal="true"
      className="pp-lightbox"
      ref={dialogRef}
      role="dialog"
    >
      <div className="pp-lightbox__top">
        <p aria-live="polite" className="pp-lightbox__counter">
          {pad(index + 1)} / {pad(total)}
        </p>
        <button
          aria-label="Fermer la galerie"
          className="pp-lightbox__close"
          onClick={onClose}
          ref={closeRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
          Fermer
        </button>
      </div>

      <div
        className="pp-lightbox__stage"
        onPointerCancel={() => (swipeStart.current = null)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {total > 1 && (
          <button
            aria-label="Image précédente"
            className="pp-lightbox__nav pp-lightbox__nav--prev"
            onClick={() => go(-1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
        )}

        <div className={`pp-lightbox__frame${zoom ? ' is-zoomed' : ''}`} ref={frameRef}>
          <img
            alt={image.alt}
            className="pp-lightbox__image"
            decoding="async"
            key={image.src}
            onClick={toggleZoom}
            onPointerMove={followPointer}
            src={image.src}
            style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          />
        </div>

        {total > 1 && (
          <button
            aria-label="Image suivante"
            className="pp-lightbox__nav pp-lightbox__nav--next"
            onClick={() => go(1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      <p className="pp-lightbox__caption">{image.caption}</p>

      {total > 1 && (
        <div aria-label="Miniatures" className="pp-lightbox__thumbs" ref={thumbsRef} role="group">
          {images.map((item, i) => (
            <button
              aria-current={i === index ? 'true' : undefined}
              aria-label={`Afficher l’image ${i + 1} sur ${total}`}
              className="pp-lightbox__thumb"
              key={item.src}
              onClick={() => {
                setZoom(null)
                onChange(i)
              }}
              type="button"
            >
              <img alt="" loading="lazy" src={item.src} />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}

export default ProjectLightbox