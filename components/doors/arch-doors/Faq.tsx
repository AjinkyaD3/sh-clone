const FAQS = [
  { id: "arch-faq-1", q: "What is the difference between an arch door and a standard front door?", a: "An arch door features a curved or rounded top profile – semicircular, segmental or gothic – rather than the flat header of a standard rectangular door. This gives it a distinctive, architecturally rich appearance suited to both period and contemporary properties." },
  { id: "arch-faq-2", q: "Can you fit an arch door into an existing rectangular opening?", a: "Yes. In most cases, an arched door frame can be installed into an existing rectangular opening, with the arched head formed within the new frame. Our team will assess your existing opening during a free site visit and advise on the best approach." },
  { id: "arch-faq-3", q: "Are arch doors secure?", a: "Yes. Every arch door we build at Secure House includes a reinforced steel frame, 12-point multi-point locking, anti-drill manganese plating and toughened glass. All doors meet EN 1627:2011 and PAS 24 security standards." },
  { id: "arch-faq-4", q: "Do arch doors work on modern homes?", a: "Absolutely. While arch doors have a strong heritage association, they are increasingly chosen for contemporary properties where architects and homeowners want to add sculptural warmth and character. We produce arch doors across all profiles to suit any architectural style." },
  { id: "arch-faq-5", q: "Can I add stained glass to an arch door?", a: "Yes. We offer a full range of glazing options for arch doors, including decorative and stained glass panels – which can be set into the arch head, sidelights or within the door leaf itself." },
  { id: "arch-faq-6", q: "How long does it take to build and install an arch door?", a: "Lead times depend on the specification and profile complexity. We will agree a clear, confirmed production and installation timeline with you before any work begins." },
];

export default function Faq() {
  return (
                    <div
                      className="fusion-fullwidth fullwidth-box fusion-builder-row-9 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                      style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-right': '120px', '--awb-padding-bottom': '56px', '--awb-padding-left': '120px', '--awb-padding-right-small': '40px', '--awb-padding-bottom-small': '28px', '--awb-padding-left-small': '40px', '--awb-margin-bottom': '0px', '--awb-background-image': 'linear-gradient( 180deg, var(--awb-color1) 0%, rgba(255, 255, 255, 0) 100% )', '--awb-margin-top': '50px', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                    >
                      <div
                        className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                        style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-12 fusion_builder_column_1_1 1_1 fusion-flex-column"
                          style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                            <div
                              className="fusion-title title fusion-title-7 fusion-sep-none fusion-title-text fusion-title-size-two"
                              style={{ '--awb-text-color': 'var(--awb-color6)', '--awb-margin-bottom': '30px', '--awb-margin-bottom-small': '24px', '--awb-font-size': 'var(--awb-typography1-font-size)' } as unknown as React.CSSProperties}
                            >
                              <h2
                                className="fusion-title-heading title-heading-left fusion-responsive-typography-calculated"
                                style={{ fontFamily: 'var(--awb-typography1-font-family)', fontWeight: 'var(--awb-typography1-font-weight)', fontStyle: 'var(--awb-typography1-font-style)', margin: '0', letterSpacing: 'var( --awb-typography1-letter-spacing )', textTransform: 'var( --awb-typography1-text-transform )', fontSize: '1em', '--fontSize': '42', lineHeight: 'var(--awb-typography1-line-height)' } as unknown as React.CSSProperties}
                              >
                                {` Arch Doors – Frequently Asked Questions `}
                              </h2>
                            </div>
                            <div
                              className="accordian fusion-accordian"
                              style={{ '--awb-padding-bottom': '15px', '--awb-padding-left': '0px', '--awb-border-size': '0px', '--awb-icon-size': '18px', '--awb-icon-alignment': 'left', '--awb-hover-color': 'var(--awb-color6)', '--awb-background-color': 'var(--awb-color1)', '--awb-icon-color': 'var(--awb-color6)', '--awb-title-color': 'var(--awb-color6)', '--awb-content-color': 'var(--awb-color6)', '--awb-icon-box-color': 'var(--awb-color1)', '--awb-title-font-family': '"Montserrat"', '--awb-title-font-weight': '500', '--awb-title-font-style': 'normal', '--awb-title-font-size': '18px', '--awb-content-font-family': '"Montserrat"', '--awb-content-font-style': 'normal', '--awb-content-font-weight': '400' } as unknown as React.CSSProperties}
                            >
                              <div className="panel-group fusion-toggle-icon-unboxed" id="accordion-arch-faq">
                                {FAQS.map((faq) => (
                                  <div className="fusion-panel panel-default fusion-toggle-no-divider" key={faq.id}>
                                    <div className="panel-heading">
                                      <h4 className="panel-title toggle" id={`toggle_${faq.id}`}>
                                        <a aria-controls={faq.id} aria-expanded="false" data-parent="#accordion-arch-faq" data-target={`#${faq.id}`} data-toggle="collapse" href={`#${faq.id}`} role="button">
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
