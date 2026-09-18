const FAQS: { id: string; q: string; a: string }[] = [
  {
    id: "9289f60892413e571",
    q: "Why industrial doors are often called Crittall doors?",
    a: "Crittall doors are named after the Crittall Company, a pioneer in manufacturing metal-framed windows and doors. The term has become synonymous with industrial-style steel doors due to the company's widespread influence and the durability of their products.",
  },
  {
    id: "6db996688f4959727",
    q: "What materials are used by Secure House to manufacture their window and door elements?",
    a: "Secure House manufactures window and door elements from glazed slim steel or bronze profiles.",
  },
  {
    id: "744777fe80442a44e",
    q: "What types of doors does Secure House offer?",
    a: "Secure House offers a range of doors including sliding, folding, pivot, and industrial style French doors made from slim steel, bronze, and thermally insulated profiles.",
  },
  {
    id: "9e50aea7944322302",
    q: "What is a distinguishing feature of the W20, W40 steel fire doors and windows?",
    a: "A W20 steel fire door is popular because of its styling created with door furniture or glazing in windows. One of the key factors which determines the effectiveness of a door in terms of safety and security is the level of fire protection it offers. The W40 Fire series, ranging from fire protection classes E30 to E120, provides extensive options for safely segmenting residential, commercial, and institutional spaces into protected fire zones, while preserving the traditional hot-rolling fabrication technique.",
  },
  {
    id: "a2174d4cbcd755320",
    q: "What is the fire protection category for Secure House's industrial doors?",
    a: "Secure House's industrial doors include category FD30 fire protection, ensuring up to 30 minutes of fire integrity.",
  },
  {
    id: "4c34898af1bcf1105",
    q: "How can one get in touch with Secure House to know more about their products?",
    a: "To learn more about Secure House's products, you can call 0207 859 4207 or email info@secure-house.co.uk.",
  },
  {
    id: "613150b6f5a2b137f",
    q: "Does Secure House offer Crittall style doors?",
    a: "No, Secure House does not offer Crittall style doors. Instead, we specialize in industrial style doors and windows manufactured from glazed slim steel or bronze profiles, which not only enhance security but also offer distinctive styling to complement the aesthetics of a building.",
  },
  {
    id: "17b6c8153fbc42e17",
    q: "What kind of response did Secure House receive after adding a range of industrial proof doors, windows, and room dividers to their steel portfolio?",
    a: "Secure House received a huge response from both new and existing clients wanting to include these products in their homes.",
  },
  {
    id: "ce258bbb051ea84e9",
    q: "For what types of buildings are Secure House's glazed slim steel or bronze profiled windows and doors ideal?",
    a: "They are ideal for renovated historical buildings, top-of-the-line residential, and commercial buildings.",
  },
  {
    id: "ad761665226c8e4e5",
    q: "Why is the fire rating important for a set of internal doors?",
    a: "The fire rating determines the effectiveness of a door in terms of safety and security, and it plays a crucial role in preventing the spread of fire and providing a possible escape route during accidents.",
  },
  {
    id: "032077ea8a8849d42",
    q: "What are some of the most popular finishes for Secure House's ironmongery handles and door furniture?",
    a: "Some of the most popular finishes include bronze, aged or antique brass, and black.",
  },
];

// Same Bootstrap-collapse-style accordion markup already used sitewide
// (see components/door-styles/victorian-doors/FrequentlyAskedQuestionsFaq.tsx)
// - the toggle behavior is already wired globally, no new JS needed here.
export default function FrequentlyAskedQuestionsFaq() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "56px 40px 100px" }}>
      <h2
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 500,
          fontSize: "32px",
          color: "#1c1e36",
          margin: "0 0 32px",
        }}
      >
        Frequently asked questions (FAQ)
      </h2>
      <div className="panel-group fusion-toggle-icon-unboxed" id="accordion-industrial-style-doors">
        {FAQS.map((faq) => (
          <div
            key={faq.id}
            className={`fusion-panel panel-default panel-${faq.id} fusion-toggle-no-divider`}
            style={{ "--awb-title-color": "#1c1e36", "--awb-content-color": "#3a3a3a" } as unknown as React.CSSProperties}
          >
            <div className="panel-heading">
              <h4 className="panel-title toggle" id={`toggle_${faq.id}`}>
                <a
                  aria-controls={faq.id}
                  aria-expanded="false"
                  data-parent="#accordion-industrial-style-doors"
                  data-target={`#${faq.id}`}
                  data-toggle="collapse"
                  href={`#${faq.id}`}
                  role="button"
                >
                  <span aria-hidden="true" className="fusion-toggle-icon-wrapper">
                    <i aria-hidden="true" className="fa-fusion-box active-icon awb-icon-minus"></i>
                    <i aria-hidden="true" className="fa-fusion-box inactive-icon awb-icon-plus"></i>
                  </span>
                  <span className="fusion-toggle-heading">{faq.q}</span>
                </a>
              </h4>
            </div>
            <div aria-labelledby={`toggle_${faq.id}`} className="panel-collapse collapse" id={faq.id}>
              <div className="panel-body toggle-content fusion-clearfix">
                <p>{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
