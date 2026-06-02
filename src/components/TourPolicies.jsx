import React from "react";

const TourPolicies = ({ policies }) => {
  if (!policies?.length) {
    return null;
  }

  return (
    <section
      className="tour-policies-section"
      aria-labelledby="tour-policies-title"
    >
      <h2 id="tour-policies-title" className="tour-policies-heading">
        Políticas de uso
      </h2>
      <div className="tour-policies-underline" aria-hidden="true" />
      <div className="tour-policies-grid">
        {policies.map((policy) => (
          <article key={policy.id ?? policy.title} className="tour-policy-card">
            <h3 className="tour-policy-title">{policy.title}</h3>
            <p className="tour-policy-description">{policy.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TourPolicies;
