import { Link } from 'react-router-dom';

function EducationRecord({ record }) {
  return (
    <article className="education-record">
      <div>
        <h3>{record.title}</h3>
        {record.details && (
          <dl className="education-record-details">
            {record.details.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {record.description && <p>{record.description}</p>}
      </div>
    </article>
  );
}

function EducationPage({ copy }) {
  return (
    <main className="education-page" id="main-content">
      <section className="education-page-hero section-shell">
        <p className="eyebrow">{copy.educationEyebrow}</p>
        <h1>{copy.educationTitle} <span>{copy.educationAccent}</span></h1>
        <p>{copy.educationPageIntro}</p>
      </section>
      <div className="section-shell education-page-content">
        <section className="education-page-section" aria-labelledby="formal-education-title">
          <h2 id="formal-education-title"><span>01.</span> {copy.educationFormalHeading}</h2>
          <EducationRecord record={copy.educationFormalCard} />
        </section>
        <section className="education-page-section" aria-labelledby="development-training-title">
          <h2 id="development-training-title"><span>02.</span> {copy.educationTrainingHeading}</h2>
          <div className="education-records">
            {copy.educationTrainingCards.map((record) => (
              <EducationRecord key={record.title} record={record} />
            ))}
          </div>
          <p className="education-section-summary">{copy.educationTrainingSummary}</p>
        </section>
        <section className="education-page-section" aria-labelledby="certifications-title">
          <h2 id="certifications-title"><span>03.</span> {copy.educationCertificationsHeading}</h2>
          <EducationRecord record={copy.educationCertificationCard} />
          <p className="education-verification-note">{copy.educationVerificationNote}</p>
        </section>
        <Link className="button button-secondary education-home-link" to="/">
          {copy.educationBackToHome}
        </Link>
      </div>
    </main>
  );
}

export default EducationPage;
