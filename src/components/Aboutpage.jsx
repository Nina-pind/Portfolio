import {
  ArrowLink,
  Footer,
  Header,
  InformationStrip,
  SocialLinks,
  email,
  useTilt,
} from './Sections.jsx' // adapte le chemin au nom de ton fichier de composants

const basePath = import.meta.env.BASE_URL

const services = [
  {
    title: 'Identités visuelles',
    text: 'Logotype, langage graphique et univers de marque.',
  },
  {
    title: 'Graphisme & illustration',
    text: 'Flyers, affiches, goodies et dessin sur tablette graphique.',
  },
  {
    title: 'Expériences digitales',
    text: 'Web, UI et intégration, du concept jusqu’à l’écran.',
  },
]

// À compléter avec ton vrai parcours (formations, stages, expériences)
const timeline = [
  {
    period: 'En cours',
    title: 'BUT MMI',
    text: 'Parcours Création numérique.',
  },
  {
    period: '2026',
    title: 'Concours sweat MMI',
    text: 'Design du sweat du département · Photoshop, Illustrator.',
  },
  {
    period: '2026',
    title: 'Flyers HIERO',
    text: 'Promotion de concerts · Photoshop, tablette graphique.',
  },
]

function AboutPage() {
  const tilt = useTilt(6)

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const from = data.get('email')
    const message = data.get('message')

    const subject = `Portfolio · Message de ${name}`
    const body = `${message}\n\n— ${name} (${from})`

    // Ouvre l'application mail avec le message pré-rempli.
    // Pour un vrai envoi sans app mail, branche un service (Formspree, EmailJS…).
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="portfolio-shell" id="top">
      <Header />

      <main>
        <section aria-labelledby="ap-title" className="ap-hero" id="a-propos">
          <div className="hero-meta eyebrow">
            <span>Nina, en quelques mots.</span>
            <span>Limoges · Brive · France</span>
          </div>

          <h1 className="ap-title" id="ap-title">
            Curieuse de nature.
            <br />
            Créative par passion.
          </h1>

          <div aria-hidden="true" className="hero-sun">
            <span />
          </div>

          <div className="ap-hero-grid">
            <figure
              className="ap-card"
              onPointerLeave={tilt.onPointerLeave}
              onPointerMove={tilt.onPointerMove}
              ref={tilt.ref}
            >
              <img
                alt="Portrait de Nina entourée de rayons roses."
                src={`${basePath}images/alma-portrait.png`}
              />
              <figcaption className="eyebrow">Une idée, puis une forme.</figcaption>
            </figure>

            <div>
              <p className="ap-lead">Je cherche le moyen de donner forme à une idée.</p>
              <div className="ap-text">
                <p>
                  Hello ! Moi, c’est Nina, j’ai 20 ans et je suis toujours en train de chercher une nouvelle idée à transformer en quelque chose de concret.
                </p>
                <p>
                  J’aime créer sous toutes ses formes : design, illustration, communication visuelle, web… mais aussi dessin, peinture, couture et autres activités manuelles. Ce que j’aime surtout, c’est partir d’une idée, parfois toute simple, et la voir prendre forme petit à petit.
                </p>
                <p>
                  Je suis actuellement en BUT MMI, parcours Création numérique, et ce portfolio rassemble une partie de ce que j’ai pu imaginer, expérimenter et réaliser.
                </p>
              </div>
              <div className="ap-actions">
                <ArrowLink
                  href={`${basePath}sources/CV_derniere_version.pdf`}
                  rel="noopener noreferrer"
                  target="_blank"
                  tone="lavender"
                >
                  Mon CV · PDF
                </ArrowLink>
                <span className="eyebrow">Disponible dès maintenant</span>
              </div>
            </div>
          </div>
        </section>

        <InformationStrip />

        <div className="ap-columns" id="cv">
          <section aria-labelledby="ap-services-title" className="ap-column">
            <p className="eyebrow">Ce que je peux construire</p>
            <h2 className="ap-heading" id="ap-services-title">
              Du sens à la forme.
            </h2>
            <ol className="ap-list">
              {services.map(({ title, text }, index) => (
                <li key={title}>
                  <span className="ap-list__meta">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="ap-cv-title" className="ap-column">
            <p className="eyebrow">Parcours / CV</p>
            <h2 className="ap-heading" id="ap-cv-title">
              Un regard qui se cultive.
            </h2>
            <ol className="ap-list">
              {timeline.map(({ period, title, text }) => (
                <li key={title}>
                  <span className="ap-list__meta">{period}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>

      <div className="contact-footer">
        <section aria-labelledby="ap-contact-title" className="ap-contact" id="contact" tabIndex="-1">
          <div>
            <p className="eyebrow">Une idée commence ici.</p>
            <h2 className="ap-heading ap-heading--xl" id="ap-contact-title">
              Et si on en
              <br />
              parlait ?
            </h2>
            <p className="ap-contact__intro">
              Une idée précise ou encore un peu floue ? Racontez-moi ce qui vous anime, je vous réponds dès que possible.
            </p>
            <a className="ap-contact__email" href={`mailto:${email}`}>
              {email}
            </a>
            <p className="ap-contact__place">Limoges · Brive · France</p>
            <SocialLinks />
          </div>

          <form className="ap-form" onSubmit={handleSubmit}>
            <div className="ap-field">
              <label htmlFor="contact-name">Votre nom *</label>
              <input
                autoComplete="name"
                id="contact-name"
                name="name"
                placeholder="Camille Martin"
                required
                type="text"
              />
            </div>
            <div className="ap-field">
              <label htmlFor="contact-email">Votre email *</label>
              <input
                autoComplete="email"
                id="contact-email"
                name="email"
                placeholder="camille@exemple.fr"
                required
                type="email"
              />
            </div>
            <div className="ap-field">
              <label htmlFor="contact-message">Votre message *</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Bonjour Nina, j’aimerais vous parler de…"
                required
              />
            </div>
            <p className="ap-form__note">
              * Champs requis. Vos informations servent uniquement à répondre à votre demande.
            </p>
            <button className="arrow-link arrow-link--lavender ap-submit" type="submit">
              <span>Envoyer mon message</span>
              <span aria-hidden="true" className="arrow-link__arrow">
                ↗
              </span>
            </button>
          </form>
        </section>
        <Footer />
      </div>
    </div>
  )
}

export default AboutPage