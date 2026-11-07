import { butYears, projectTypes } from '../data/projects.js'
import './ProjectTag.css'

/* Étiquette de type de projet.
   Par défaut : posée en haut à droite d'une carte.
   inline : dans le flux du texte (page détail).
   Pour un projet académique, l'année de BUT s'affiche à côté : « Académique · BUT2 ». */
function ProjectTag({ type, but, inline = false }) {
  const label = projectTypes[type]
  if (!label) return null

  const year = type === 'academique' && butYears.includes(but) ? but : null

  return (
    <span className={`project-tag project-tag--${type}${inline ? ' project-tag--inline' : ''}`}>
      {label}
      {year && (
        <>
          <span aria-hidden="true" className="project-tag__dot">
            ·
          </span>
          <span className="project-tag__but">{year}</span>
        </>
      )}
    </span>
  )
}

export default ProjectTag
