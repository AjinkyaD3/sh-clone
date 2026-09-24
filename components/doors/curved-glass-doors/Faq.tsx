const FAQS = [
  { id: "cg-faq-1", q: "How much do curved glass doors cost in the UK?", a: "Curved glass doors are a premium, made-to-measure product and pricing depends on size, radius, glazing specification and security features required. At Secure House, we provide a free, no-obligation quote tailored to your exact requirements. Contact us for a personalised consultation." },
  { id: "cg-faq-2", q: "Are curved glass doors secure?", a: "Yes. All our curved glass doors are built with reinforced steel frames, 12-point multi-point locking and toughened safety glass as standard. Our doors are certified to EN 1627:2011 and PAS 24 – the same security standards across our full door range." },
  { id: "cg-faq-3", q: "Can curved glass doors be used as front doors?", a: "Absolutely. A curved glass front door makes a stunning and highly secure entrance for residential and commercial properties alike. Each door is manufactured to your specific opening dimensions and radius." },
  { id: "cg-faq-4", q: "How long does it take to manufacture and install a curved glass door?", a: "Lead times vary depending on specification and complexity. We will confirm a clear, agreed timeline during your consultation before any work begins." },
  { id: "cg-faq-5", q: "Do curved glass doors offer good insulation?", a: "Yes. Our doors feature thermally broken frames and double glazing as standard, with triple-glazed options available – delivering excellent thermal and acoustic performance alongside their striking appearance." },
  { id: "cg-faq-6", q: "Can you fit a curved glass door to an existing opening?", a: "Yes. Our team carries out a full site survey before manufacture to ensure your door is built to the precise dimensions of your existing opening for a perfect, weather-tight fit." },
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
                                {` Curved Glass Doors – Frequently Asked Questions `}
                              </h2>
                            </div>
                            <div
                              className="accordian fusion-accordian"
                              style={{ '--awb-padding-bottom': '15px', '--awb-padding-left': '0px', '--awb-border-size': '0px', '--awb-icon-size': '18px', '--awb-icon-alignment': 'left', '--awb-hover-color': 'var(--awb-color6)', '--awb-background-color': 'var(--awb-color1)', '--awb-icon-color': 'var(--awb-color6)', '--awb-title-color': 'var(--awb-color6)', '--awb-content-color': 'var(--awb-color6)', '--awb-icon-box-color': 'var(--awb-color1)', '--awb-title-font-family': '"Montserrat"', '--awb-title-font-weight': '500', '--awb-title-font-style': 'normal', '--awb-title-font-size': '18px', '--awb-content-font-family': '"Montserrat"', '--awb-content-font-style': 'normal', '--awb-content-font-weight': '400' } as unknown as React.CSSProperties}
                            >
                              <div className="panel-group fusion-toggle-icon-unboxed" id="accordion-cg-faq">
                                {FAQS.map((faq) => (
                                  <div className="fusion-panel panel-default fusion-toggle-no-divider" key={faq.id}>
                                    <div className="panel-heading">
                                      <h4 className="panel-title toggle" id={`toggle_${faq.id}`}>
                                        <a aria-controls={faq.id} aria-expanded="false" data-parent="#accordion-cg-faq" data-target={`#${faq.id}`} data-toggle="collapse" href={`#${faq.id}`} role="button">
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
