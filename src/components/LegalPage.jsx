import { useEffect } from 'react'
import { email } from './PortfolioSections.jsx'
import './LegalPage.css'

/* =====================================================================
   MENTIONS LÉGALES
   Pour modifier un texte, change-le directement ci-dessous.
   Pense à mettre à jour la date « Dernière mise à jour » en bas.
   ===================================================================== */

const basePath = import.meta.env.BASE_URL

const sections = [
  {
    id: 'editeur',
    title: 'Éditrice du site',
    content: (
      <>
        <p>
          Ce site est le portfolio personnel de <strong>Nina Pinardel</strong>, étudiante en BUT Métiers du Multimédia et
          de l’Internet (MMI), basée en France (Limoges · Brive).
        </p>
        <p>
          Contact : <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>Directrice de la publication : Nina Pinardel.</p>
      </>
    ),
  },
  {
    id: 'hebergement',
    title: 'Hébergement',
    content: (
      <>
        <p>Le site est hébergé par GitHub Pages, un service de :</p>
        <p>
          GitHub, Inc.
          <br />
          88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis
          <br />
          <a href="https://github.com" rel="noopener noreferrer" target="_blank">
            github.com
          </a>
        </p>
        <p>Certaines vidéos des pages projet sont hébergées par Wix.com Ltd.</p>
      </>
    ),
  },
  {
    id: 'propriete',
    title: 'Propriété intellectuelle',
    content: (
      <>
        <p>
          Sauf mention contraire, les créations présentées sur ce site (illustrations, logos, mises en page, vidéos,
          textes) sont la propriété de Nina Pinardel. Les projets réalisés en équipe ou en binôme appartiennent aussi aux
          personnes qui y ont participé.
        </p>
        <p>
          Toute reproduction, modification ou réutilisation, même partielle, sans autorisation écrite préalable est
          interdite.
        </p>
        <p>
          Certains projets sont des exercices pédagogiques réalisés dans le cadre de ma formation et font référence à des
          marques existantes (par exemple Starbucks ou UGC). Ces marques et logos appartiennent à leurs propriétaires
          respectifs ; ces travaux n’ont aucun lien commercial avec eux.
        </p>
      </>
    ),
  },
  {
    id: 'donnees',
    title: 'Données personnelles',
    content: (
      <>
        <p>
          Ce site n’utilise ni cookies de suivi, ni outil de mesure d’audience, et ne collecte aucune donnée personnelle
          à votre insu.
        </p>
        <p>
          Les informations que vous transmettez via le formulaire de contact ou par e-mail (nom, adresse e-mail,
          message) servent uniquement à vous répondre. Elles ne sont ni vendues, ni transmises à des tiers, et ne sont
          pas conservées au-delà du temps nécessaire à nos échanges.
        </p>
        <p>
          Conformément au Règlement général sur la protection des données (RGPD), vous pouvez demander à consulter,
          corriger ou supprimer vos données en écrivant à <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </>
    ),
  },
  {
    id: 'liens',
    title: 'Liens externes',
    content: (
      <p>
        Ce site contient des liens vers d’autres sites (LinkedIn, Instagram, sites de projets…). Je ne suis pas
        responsable de leur contenu ni de leur politique de confidentialité.
      </p>
    ),
  },
]

function LegalPage() {
  useEffect(() => {
    document.title = 'Mentions légales · Nina Pinardel'
  }, [])

  return (
    <article className="legal-page">
      <div className="legal-topbar">
        <a className="legal-back" href={basePath}>
          <span aria-hidden="true">←</span> Retour à l’accueil
        </a>
      </div>

      <header className="legal-hero">
        <p className="legal-eyebrow">Informations</p>
        <h1 className="legal-title">
          Mentions légales<span>.</span>
        </h1>
      </header>

      <div className="legal-body">
        <nav aria-label="Sommaire des mentions légales" className="legal-toc">
          <ul>
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="legal-content">
          {sections.map(({ id, title, content }, i) => (
            <section aria-labelledby={`${id}-title`} className="legal-section" id={id} key={id}>
              <p className="legal-section__number">{String(i + 1).padStart(2, '0')}</p>
              <h2 id={`${id}-title`}>{title}</h2>
              {content}
            </section>
          ))}
          <p className="legal-updated">Dernière mise à jour : 4 novembre 2026</p>
        </div>
      </div>
    </article>
  )
}

export default LegalPage
