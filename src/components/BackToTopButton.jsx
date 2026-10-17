import './BackToTopButton.css'

function BackToTopButton() {
  function returnToTop() {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    window.scrollTo({ top: 0, behavior })
  }

  return (
    <button
      aria-label="Retourner en haut de la page"
      className="back-to-top"
      onClick={returnToTop}
      type="button"
    >
      <span aria-hidden="true" className="back-to-top__arrow">
        ↑
      </span>
      <span className="back-to-top__label">Haut de page</span>
    </button>
  )
}

export default BackToTopButton
