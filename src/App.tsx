
import { useEffect, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const [publicationVisible, setPublicationVisible] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const section = document.getElementById('publications')
    if (!section) return

    let glowTimer: number | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(glowTimer)
          setPublicationVisible(true)

          glowTimer = window.setTimeout(() => {
            setPublicationVisible(false)
          }, 3000)
        } else {
          window.clearTimeout(glowTimer)
          setPublicationVisible(false)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.clearTimeout(glowTimer)
    }
  }, [])

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (sending) return

    setSending(true)
    setStatus('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      )

      setStatus('Message sent successfully! Thank you for reaching out.')

      window.setTimeout(() => {
        setStatus('')
      }, 5000)

      form.reset()
    } catch (error) {
      console.error('Email sending failed:', error)
      setStatus(
        'Could not send your message. Please try again or email me directly.',
      )

      window.setTimeout(() => {
        setStatus('')
      }, 5000)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <nav className="navbar">
        <a href="#about" className="nav-logo">
          V.
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#publications">Publications</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section id="about" className="hero-section">
          <div className="hero-content">
            <p className="hero-label">COMPUTER SCIENCE STUDENT</p>
            <h1>Hi, I'm Vrishank.</h1>

            <p className="hero-description">
              I'm a Computer Science and Engineering student at PES University,
              interested in software development, machine learning, and building
              useful technology.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="button-primary">
                Contact Me
              </a>

              <a href="/resume.pdf" className="button-secondary" download>
                Download Resume
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/vrishank.png"
              alt="Vrishank Amembal"
              className="profile-photo"
            />
          </div>
        </section>

        <section id="projects" className="content-section">
          <h2>Projects</h2>

          <p className="section-description">
            A selection of projects I've worked on.
          </p>

          <div className="projects-grid">
            <article className="project-card">
              <p className="project-number">01 / MACHINE LEARNING</p>

              <h3>ECG-Based Cardiac Event Detection &amp; Simulation</h3>

              <p>
                An end-to-end system combining ECG signal processing and
                machine learning to detect cardiac events and connect them to
                a Unity-based virtual heart simulation.
              </p>

              <div className="project-tech">
                <span>Python</span>
                <span>Machine Learning</span>
                <span>Unity</span>
              </div>

              <a
                href="https://github.com/vrishank-na/ECG-Simulation-Pipeline"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                GitHub ↗
              </a>
            </article>

            <article className="project-card">
              <p className="project-number">02 / FORECASTING</p>

              <h3>Short-Term Energy Load Forecasting</h3>

              <p>
                A machine learning solution for forecasting electricity
                demand, exploring time-series foundation models and LightGBM.
                Ranked 14th among 3,300+ participants in the IndiaAI Impact
                Gen-AI Hackathon.
              </p>

              <div className="project-tech">
                <span>Python</span>
                <span>LightGBM</span>
                <span>Time Series</span>
              </div>
            </article>

            <article className="project-card">
              <p className="project-number">03 / 3D VISUALIZATION</p>

              <h3>3D Campus Sports Complex Visualization</h3>

              <p>
                A recreation of the PES University Sports Complex in a virtual
                3D environment, covering modelling, scene design, and
                visualization.
              </p>

              <div className="project-tech">
                <span>Blender</span>
                <span>3D Modelling</span>
                <span>Visualization</span>
              </div>

              <a
                href="https://github.com/vrishank-na/PES-Basketball-court"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                GitHub ↗
              </a>
            </article>
          </div>
        </section>

        <section id="experience" className="content-section">
          <h2>Experience</h2>

          <p className="section-description">
            My professional experience and the work I've contributed to.
          </p>

          <div className="experience-list">
            <article className="experience-card">
              <div className="experience-header">
                <div>
                  <h3>Summer Intern</h3>
                  <p className="experience-company">PESU IoT Centre</p>
                </div>

                <span className="experience-date">Jun 2026 – Aug 2026</span>
              </div>

              <ul className="experience-details">
                <li>
                  Worked on ECG signal preprocessing and machine
                  learning-based cardiac event detection.
                </li>
                <li>
                  Developed components for P, QRS, and T wave segmentation in
                  ECG signals.
                </li>
                <li>
                  Integrated ECG-derived events with a virtual cardiac
                  simulation and visual dashboard.
                </li>
              </ul>
            </article>

            <article className="experience-card">
              <div className="experience-header">
                <div>
                  <h3>Event Management Team Member</h3>
                  <p className="experience-company">Embrione Club</p>
                </div>

                <span className="experience-date">Sep 2024 – Oct 2024</span>
              </div>

              <ul className="experience-details">
                <li>Contributed to planning and coordinating club events.</li>
                <li>Assisted with event logistics and on-ground execution.</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="publications" className="content-section">
          <h2>Publications</h2>

          <p className="section-description">
            Research contributions in biomedical signal processing and machine
            learning.
          </p>

          <div className="publication-card">
            <p className="publication-label">CONFERENCE PAPER · ACCEPTED</p>

            <h3>
              Physiologically Guided R-Centered Deep Learning for ECG Wave
              Delineation across Heterogeneous Databases
            </h3>

            <p className="publication-venue">
              13th International Conference on Biomedical and Bioinformatics
              Engineering
            </p>

            <p className="publication-description">
              Research on ECG wave delineation using an R-centered deep
              learning approach, with a focus on physiological guidance and
              performance across heterogeneous databases.
            </p>

            <p className="publication-status">
  <span
    className={`status-dot ${publicationVisible ? 'is-visible' : ''}`}
    aria-hidden="true"
  />
  Accepted for presentation
</p>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <h2>Get In Touch</h2>

          <p className="section-description contact-intro">
            Feel free to reach out if you'd like to work together!
          </p>

          <div className="contact-links">
            <a href="mailto:vrishankamembal@gmail.com">Email</a>

            <a
              href="https://github.com/vrishank-na"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/vrishank-amembal/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              aria-label="Your name"
              autoComplete="name"
              maxLength={100}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              aria-label="Your email"
              autoComplete="email"
              maxLength={254}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              aria-label="Your message"
              rows={5}
              maxLength={5000}
              required
            />

            <button type="submit" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <p className="contact-status" role="status" aria-live="polite">
                {status}
              </p>
            )}
          </form>
        </section>
      </main>
    </>
  )
}

export default App
