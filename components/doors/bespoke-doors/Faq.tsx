const FAQS = [
  {
    id: "bd-faq-1",
    q: "How long does it take to design and manufacture a bespoke door?",
    a: "The time depends on design complexity and the materials you choose.",
  },
  {
    id: "bd-faq-2",
    q: "What materials can I choose for my bespoke front door?",
    a: "With us, you can choose from materials and combinations including steel, aluminium, wood and glass. Each material offers unique advantages, and our experts will help you navigate them, their benefits and their suitability in your context - with your expectations and vision at the centre.",
  },
  {
    id: "bd-faq-3",
    q: "Do bespoke doors improve home security?",
    a: "Standard doors usually come with standard security systems, but a bespoke door can have advanced locking systems and reinforced materials, making it more secure.",
  },
];

const CONTACT_ITEM = {
  id: "bd-faq-4",
  q: "Contact Us for Bespoke Door Enquiries",
  a: "Prepared to design and engineer your bespoke door? Choose us for it. We'll review your needs, answer all your questions and guide you through the different options.",
};

export default function Faq() {
  return (
                    <div
                      className="fusion-fullwidth fullwidth-box fusion-builder-row-19 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                      style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-right': '120px', '--awb-padding-bottom': '56px', '--awb-padding-left': '120px', '--awb-padding-right-small': '40px', '--awb-padding-bottom-small': '28px', '--awb-padding-left-small': '40px', '--awb-margin-bottom': '0px', '--awb-margin-top-small': '35px', '--awb-background-image': 'linear-gradient( 180deg, var(--awb-color1) 0%, rgba(255, 255, 255, 0) 100% )', '--awb-margin-top': '50px', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                    >
                      <div
                        className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                        style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-24 fusion_builder_column_1_1 1_1 fusion-flex-column"
                          style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div
                            className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column"
                          >
                            <div
                              className="fusion-title title fusion-title-16 fusion-sep-none fusion-title-text fusion-title-size-two"
                              style={{ '--awb-text-color': 'var(--awb-color6)', '--awb-margin-bottom': '30px', '--awb-margin-bottom-small': '24px', '--awb-font-size': 'var(--awb-typography1-font-size)' } as unknown as React.CSSProperties}
                            >
                              <h2
                                className="fusion-title-heading title-heading-left fusion-responsive-typography-calculated"
                                style={{ fontFamily: 'var(--awb-typography1-font-family)', fontWeight: 'var(--awb-typography1-font-weight)', fontStyle: 'var(--awb-typography1-font-style)', margin: '0', letterSpacing: 'var( --awb-typography1-letter-spacing )', textTransform: 'var( --awb-typography1-text-transform )', fontSize: '1em', '--fontSize': '50', lineHeight: 'var(--awb-typography1-line-height)' } as unknown as React.CSSProperties}
                              >
                                {` Frequently asked questions (FAQ) `}
                              </h2>
                            </div>
                            <div
                              className="accordian fusion-accordian"
                              style={{ '--awb-padding-bottom': '15px', '--awb-padding-left': '0px', '--awb-border-size': '0px', '--awb-icon-size': '18px', '--awb-content-font-size': '18px', '--awb-content-letter-spacing': '0px', '--awb-icon-alignment': 'left', '--awb-hover-color': 'var(--awb-color6)', '--awb-border-color': 'hsla( var(--awb-color5-h), var(--awb-color5-s), calc(var(--awb-color5-l) + 56%), var(--awb-color5-a) )', '--awb-background-color': 'var(--awb-color1)', '--awb-divider-color': 'hsla( var(--awb-color1-h), var(--awb-color1-s), var(--awb-color1-l), calc(var(--awb-color1-a) - 80%) )', '--awb-divider-hover-color': 'hsla( var(--awb-color1-h), var(--awb-color1-s), var(--awb-color1-l), calc(var(--awb-color1-a) - 80%) )', '--awb-icon-color': 'var(--awb-color6)', '--awb-title-color': 'var(--awb-color6)', '--awb-content-color': 'var(--awb-color6)', '--awb-icon-box-color': 'var(--awb-color1)', '--awb-toggle-hover-accent-color': 'var( --awb-color5 )', '--awb-toggle-active-accent-color': 'var( --awb-color6 )', '--awb-title-font-family': '"Montserrat"', '--awb-title-font-weight': '500', '--awb-title-font-style': 'normal', '--awb-title-font-size': '18px', '--awb-title-letter-spacing': '0px', '--awb-title-text-transform': 'none', '--awb-content-font-family': '"Montserrat"', '--awb-content-font-style': 'normal', '--awb-content-font-weight': '400' } as unknown as React.CSSProperties}
                            >
                              <div className="panel-group fusion-toggle-icon-unboxed" id="accordion-bespoke-faq">
                                {FAQS.map((faq) => (
                                  <div className="fusion-panel panel-default fusion-toggle-no-divider" key={faq.id}>
                                    <div className="panel-heading">
                                      <h4 className="panel-title toggle" id={`toggle_${faq.id}`}>
                                        <a
                                          aria-controls={faq.id}
                                          aria-expanded="false"
                                          data-parent="#accordion-bespoke-faq"
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
                                <div className="fusion-panel panel-default fusion-toggle-no-divider" key={CONTACT_ITEM.id}>
                                  <div className="panel-heading">
                                    <h4 className="panel-title toggle" id={`toggle_${CONTACT_ITEM.id}`}>
                                      <a
                                        aria-controls={CONTACT_ITEM.id}
                                        aria-expanded="false"
                                        data-parent="#accordion-bespoke-faq"
                                        data-target={`#${CONTACT_ITEM.id}`}
                                        data-toggle="collapse"
                                        href={`#${CONTACT_ITEM.id}`}
                                        role="button"
                                      >
                                        <span aria-hidden="true" className="fusion-toggle-icon-wrapper">
                                          <i aria-hidden="true" className="fa-fusion-box active-icon awb-icon-minus"></i>
                                          <i aria-hidden="true" className="fa-fusion-box inactive-icon awb-icon-plus"></i>
                                        </span>
                                        <span className="fusion-toggle-heading">{CONTACT_ITEM.q}</span>
                                      </a>
                                    </h4>
                                  </div>
                                  <div aria-labelledby={`toggle_${CONTACT_ITEM.id}`} className="panel-collapse collapse" id={CONTACT_ITEM.id}>
                                    <div className="panel-body toggle-content fusion-clearfix">
                                      <p>{CONTACT_ITEM.a}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
