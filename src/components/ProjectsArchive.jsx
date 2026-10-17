import { useMemo, useState } from 'react'
import { projectCategories, projects } from '../data/projects.js'
import './ProjectsArchive.css'

function ProjectCard({ project, index }) {
  return (
    <article className={`archive-card archive-card--${(index % 4) + 1}`}>
      <a
        aria-label={`Ouvrir le visuel de ${project.title} dans un nouvel onglet`}
        className="archive-card__visual-link"
        href={project.image}
        rel="noreferrer"
        target="_blank"
      >
        <figure className="archive-card__visual">
          <img
            alt={project.alt}
            decoding="async"
            loading={index < 2 ? 'eager' : 'lazy'}
            src={project.image}
          />
          <span aria-hidden="true" className="archive-card__open">
            ↗
          </span>
        </figure>
      </a>
      <div className="archive-card__details">
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
        <div className="archive-card__meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </article>
  )
}

function ProjectsArchive() {
  const [activeCategory, setActiveCategory] = useState('Toutes')
  const [sortOrder, setSortOrder] = useState('recent')

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        projectCategories.map((category) => [
          category,
          projects.filter((project) => project.category === category).length,
        ]),
      ),
    [],
  )

  const visibleProjects = useMemo(() => {
    const filteredProjects =
      activeCategory === 'Toutes'
        ? projects
        : projects.filter((project) => project.category === activeCategory)

    return [...filteredProjects].sort((first, second) => {
      if (sortOrder === 'alphabetical') {
        return first.title.localeCompare(second.title, 'fr')
      }

      const dateDifference = new Date(first.date) - new Date(second.date)
      return sortOrder === 'oldest' ? dateDifference : -dateDifference
    })
  }, [activeCategory, sortOrder])

  const filters = [
    { label: 'Toutes', count: projects.length },
    ...projectCategories.map((label) => ({ label, count: categoryCounts[label] })),
  ]

  return (
    <section aria-labelledby="archive-title" className="projects-archive">
      <header className="archive-intro">
        <p className="archive-eyebrow">
          <span>Portfolio · 2024 — 2026</span>
          <span>Création numérique</span>
        </p>
        <div className="archive-intro__title-row">
          <h1 id="archive-title">Les projets<span>.</span></h1>
          <span aria-hidden="true" className="archive-intro__spark">✳</span>
        </div>
        <p className="archive-intro__description">
          Des idées sensibles, du papier à l’écran.
        </p>
      </header>

      <div className="archive-toolbar">
        <div aria-label="Filtrer les projets par catégorie" className="archive-filters" role="group">
          {filters.map(({ label, count }) => (
            <button
              aria-pressed={activeCategory === label}
              className="archive-filter"
              key={label}
              onClick={() => setActiveCategory(label)}
              type="button"
            >
              {label} <span>{count}</span>
            </button>
          ))}
        </div>
        <div className="archive-results">
          <p aria-live="polite" className="archive-results__count">
            {visibleProjects.length} {visibleProjects.length === 1 ? 'projet' : 'projets'}
          </p>
          <label className="archive-sort">
            <span>Trier par</span>
            <select
              aria-label="Trier les projets"
              onChange={(event) => setSortOrder(event.target.value)}
              value={sortOrder}
            >
              <option value="recent">Plus récent</option>
              <option value="oldest">Plus ancien</option>
              <option value="alphabetical">Ordre alphabétique</option>
            </select>
          </label>
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="archive-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard index={index} key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <p className="archive-empty">Aucun projet ne correspond à cette catégorie.</p>
      )}
    </section>
  )
}

export default ProjectsArchive
