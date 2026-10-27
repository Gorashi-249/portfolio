import { useState } from 'react';

function ContactPage({ copy }) {
  const [status, setStatus] = useState('');
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!contactEmail) {
      setStatus(copy.contactSetupNotice);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const subject = encodeURIComponent(`${copy.formSubjectPrefix}: ${name}`);
    const body = encodeURIComponent(`${copy.formName}: ${name}\n${copy.formEmail}: ${email}\n\n${message}`);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus(copy.emailDraftNotice);
    event.currentTarget.reset();
  };

  return (
    <main className="contact-page" id="main-content">
      <section className="contact-page-hero section-shell">
        <p className="eyebrow">{copy.contactPageEyebrow}</p>
        <h1>{copy.contactPageTitle} <span>{copy.contactPageAccent}</span></h1>
        <p>{copy.contactPageIntro}</p>
      </section>
      <section className="section-shell contact-page-content" aria-label={copy.contactPageTitle}>
        <div className="contact-page-copy">
          <h2>{copy.letsConnect}</h2>
          <p>{copy.contactPageDetails}</p>
          <div className="contact-placeholder">
            <span className="contact-status"><span /> {copy.openToConversations}</span>
            <p>{copy.contactDetailsMissing}</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>{copy.sendMessage}</h2>
          <p className="form-description">{copy.formDescription}</p>
          {!contactEmail && <p className="form-setup-note">{copy.contactSetupNotice}</p>}
          <label htmlFor="contact-name">{copy.formName}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            required
            maxLength={100}
          />
          <label htmlFor="contact-email">{copy.formEmail}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            required
            maxLength={254}
          />
          <label htmlFor="contact-message">{copy.formMessage}</label>
          <textarea
            id="contact-message"
            name="message"
            rows="6"
            placeholder={copy.messagePlaceholder}
            required
            minLength={10}
            maxLength={5000}
          />
          <button className="button button-primary" type="submit">{copy.sendMessage} <span aria-hidden="true">↗</span></button>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </section>
    </main>
  );
}

export default ContactPage;
