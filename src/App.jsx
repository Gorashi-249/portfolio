import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import profilePhoto from '../img/profile.png';
import ContactPage from './ContactPage';
import EducationPage from './EducationPage';
import { translations } from './i18n';

const skillGroups = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Development tools', items: ['React Router', 'Vite'] },
];

const navigation = [
  ['home', 'home'],
  ['about', 'about'],
  ['skills', 'skills'],
  ['projects', 'projects'],
  ['experience', 'experience'],
];

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function Reveal({ children, className = '' }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`reveal${visible ? ' is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Header({ copy, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';
  const isEducationPage = pathname === '/education';
  const isHomePage = pathname === '/';

  useEffect(() => setMenuOpen(false), [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">{copy.skipToContent}</a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" onClick={closeMenu} aria-label={`${copy.name}, ${copy.home}`}>
            <span className="brand-mark">MG</span>
            <span>{copy.name}</span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav
            className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
            id="primary-navigation"
            aria-label={copy.mainNavigation}
          >
            {navigation.map(([key, id]) => (
              <a key={key} href={isHomePage ? `#${id}` : `/#${id}`} onClick={closeMenu}>
                {copy.nav[key]}
              </a>
            ))}
            <Link
              className={isEducationPage ? 'is-current' : ''}
              to="/education"
              onClick={closeMenu}
              aria-current={isEducationPage ? 'page' : undefined}
            >
              {copy.nav.education}
            </Link>
            <Link
              className={`nav-contact${isContactPage ? ' is-current' : ''}`}
              to="/contact"
              onClick={closeMenu}
              aria-current={isContactPage ? 'page' : undefined}
            >
              {copy.nav.contact} <ArrowIcon />
            </Link>
            <div className="language-switcher" role="group" aria-label={copy.chooseLanguage}>
              {['en', 'ar'].map((code) => (
                <button
                  type="button"
                  key={code}
                  lang={code}
                  dir="auto"
                  aria-pressed={language === code}
                  onClick={() => onLanguageChange(code)}
                >
                  {copy.languageNames[code]}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer({ copy }) {
  const { pathname } = useLocation();
  const prefix = pathname === '/' ? '' : '/';

  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div className="footer-identity">
          <Link className="brand" to="/">
            <span className="brand-mark">MG</span>
            <span>{copy.name}</span>
          </Link>
          <p>{copy.role}</p>
        </div>
        <nav className="footer-navigation" aria-label={copy.footerNavigation}>
          {['about', 'skills', 'projects', 'experience'].map((item) => (
            <a key={item} href={`${prefix}#${item}`}>{copy.nav[item]}</a>
          ))}
          <Link to="/education">{copy.nav.education}</Link>
          <Link to="/contact">{copy.nav.contact}</Link>
        </nav>
        <p className="footer-copyright">
          © {new Date().getFullYear()} {copy.name}. {copy.footerNote}
        </p>
      </div>
    </footer>
  );
}

function Layout({ copy, language, onLanguageChange, pageTitle = copy.pageTitle, metaDescription = copy.metaDescription, children }) {
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = pageTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', metaDescription);
    const socialTitle = document.querySelector('meta[property="og:title"]');
    if (socialTitle) socialTitle.setAttribute('content', pageTitle);
    const socialDescription = document.querySelector('meta[property="og:description"]');
    if (socialDescription) socialDescription.setAttribute('content', metaDescription);
  }, [copy, language, metaDescription, pageTitle]);

  return (
    <>
      <Header copy={copy} language={language} onLanguageChange={onLanguageChange} />
      {children}
      <Footer copy={copy} />
    </>
  );
}

function SectionHeading({ eyebrow, title, accent }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title} <span>{accent}</span></h2>
    </div>
  );
}

function HomePage({ copy, language, onLanguageChange }) {
  return (
    <Layout copy={copy} language={language} onLanguageChange={onLanguageChange}>
      <main id="main-content">
        <section className="hero section-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="availability"><span /> {copy.openToOpportunities}</p>
            <p className="eyebrow">{copy.role}</p>
            <h1 id="hero-title">{copy.heroTitle}<br /><span>{copy.heroAccent}</span></h1>
            <p className="hero-intro">{copy.heroIntro}</p>
            <p className="hero-location">{copy.location}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">{copy.viewProjects} <ArrowIcon /></a>
              <Link className="button button-secondary" to="/contact">{copy.contactMe}</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img src={profilePhoto} alt={copy.portraitAlt} fetchPriority="high" />
            </div>
            <div className="portrait-caption">
              <span className="caption-line" />
              <span>{copy.portraitCaption}</span>
            </div>
            <span className="visual-index" aria-hidden="true">01 / 04</span>
          </div>
        </section>

        <Reveal>
          <section className="about section-shell section-block" id="about">
            <SectionHeading eyebrow={copy.aboutEyebrow} title={copy.aboutTitle} accent={copy.aboutAccent} />
            <div className="about-grid">
              <p className="about-lead">{copy.aboutLead}</p>
              <div className="about-copy">
                <p>{copy.aboutParagraphOne}</p>
                <p>{copy.aboutParagraphTwo}</p>
                <a className="text-link" href="#skills">{copy.seeSkills} <ArrowIcon /></a>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="skills section-block" id="skills">
            <div className="section-shell">
              <SectionHeading eyebrow={copy.skillsEyebrow} title={copy.skillsTitle} accent={copy.skillsAccent} />
              <p className="section-intro">{copy.skillsIntro}</p>
              <div className="skills-grid">
                {skillGroups.map((group, index) => (
                  <article className="skill-card" key={group.title}>
                    <span className="card-index">0{index + 1}</span>
                    <h3>{copy.skillGroups[index]}</h3>
                    <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="projects section-shell section-block" id="projects">
            <SectionHeading eyebrow={copy.projectsEyebrow} title={copy.projectsTitle} accent={copy.projectsAccent} />
            <article className="project-card">
              <div className="project-art" role="img" aria-label={copy.projectImageAlt}>
                <div className="project-window">
                  <div className="window-bar"><span /><span /><span /></div>
                  <div className="window-content">
                    <span className="window-label">{copy.projectType}</span>
                    <span className="window-title">{copy.projectArtwork}</span>
                    <span className="window-button">{copy.viewProjects} <ArrowIcon /></span>
                  </div>
                </div>
                <span className="project-art-note">{copy.projectArtworkCaption}</span>
              </div>
              <div className="project-details">
                <p className="eyebrow">{copy.projectType}</p>
                <h3>{copy.projectName}</h3>
                <p>{copy.projectDescription}</p>
                <ul className="tag-list" aria-label={copy.technologiesUsed}>
                  {['React', 'JavaScript', 'CSS', 'Vite'].map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <p className="project-note">{copy.projectLinksNote}</p>
              </div>
            </article>
            <p className="projects-footnote">{copy.projectsFootnote}</p>
          </section>
        </Reveal>

        <Reveal>
          <section className="experience section-block" id="experience">
            <div className="section-shell">
              <SectionHeading eyebrow={copy.experienceEyebrow} title={copy.experienceTitle} accent={copy.experienceAccent} />
              <article className="info-card">
                <span className="card-index">01</span>
                <div>
                  <p className="eyebrow">{copy.personalDevelopment}</p>
                  <h3>{copy.experienceCardTitle}</h3>
                  <p>{copy.experienceDescription}</p>
                </div>
                <p className="info-note">{copy.experiencePlaceholder}</p>
              </article>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="education section-block" id="education">
            <div className="section-shell">
              <SectionHeading eyebrow={copy.educationEyebrow} title={copy.educationTitle} accent={copy.educationAccent} />
              <p className="section-intro">{copy.educationDescription}</p>
              <Link className="button button-primary" to="/education">
                {copy.educationViewDetails} <ArrowIcon />
              </Link>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="contact section-block">
            <div className="section-shell contact-inner">
              <div>
                <p className="eyebrow">{copy.contactEyebrow}</p>
                <h2>{copy.contactTitle} <span>{copy.contactAccent}</span></h2>
                <p>{copy.contactIntro}</p>
              </div>
              <div className="contact-details">
                <span className="contact-status"><span /> {copy.openToConversations}</span>
                <p>{copy.contactDetailsMissing}</p>
                <Link className="button button-primary" to="/contact">{copy.visitContactPage} <ArrowIcon /></Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
    </Layout>
  );
}

function AuthPage({ copy, type }) {
  const isLogin = type === 'login';
  return (
    <main className="auth-page" id="main-content">
      <div className="auth-card">
        <h1>{isLogin ? copy.loginTitle : copy.registerTitle}</h1>
        <p>{isLogin ? copy.loginNotice : copy.registerNotice}</p>
        <Link className="button button-primary" to="/">{copy.backToPortfolio} <ArrowIcon /></Link>
      </div>
    </main>
  );
}

function AppContent() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('portfolio-language');
    return ['en', 'ar'].includes(savedLanguage) ? savedLanguage : 'en';
  });
  const copy = translations[language];

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem('portfolio-language', nextLanguage);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage copy={copy} language={language} onLanguageChange={changeLanguage} />}
      />
      <Route
        path="/contact"
        element={(
          <Layout copy={copy} language={language} onLanguageChange={changeLanguage}>
            <ContactPage copy={copy} />
          </Layout>
        )}
      />
      <Route
        path="/education"
        element={(
          <Layout
            copy={copy}
            language={language}
            onLanguageChange={changeLanguage}
            pageTitle={copy.educationPageTitle}
            metaDescription={copy.educationPageMetaDescription}
          >
            <EducationPage copy={copy} />
          </Layout>
        )}
      />
      <Route path="/login" element={<AuthPage copy={copy} type="login" />} />
      <Route path="/register" element={<AuthPage copy={copy} type="register" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
