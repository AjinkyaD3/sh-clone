const FAQS = [
  { id: "sg-faq-1", q: "What is the difference between stained glass and leaded glass?", a: "Leaded glass refers to the method of joining glass pieces using lead caming (strips of lead). Stained glass is coloured glass, which is usually also leaded. For traditional UK front doors, the two terms are commonly used to mean the same thing." },
  { id: "sg-faq-2", q: "Are stain glass doors (also called stained glass doors) secure?", a: "Yes – when built correctly. At Secure House, all our stained glass doors include reinforced steel frames, 12-point multi-point locking and toughened or laminated safety glass. They are certified to EN 1627:2011 and PAS 24. Decorative glass panels do not reduce the security of the door when the door is engineered to the right standard." },
  { id: "sg-faq-3", q: "Can you replace a damaged stained glass panel?", a: "Yes. If your existing stained glass door has a cracked, broken or missing panel, we can restore or replace it – recreating the original design as closely as possible from photographs or surviving sections." },
  { id: "sg-faq-4", q: "Can I have panels designed to match my existing windows?", a: "Absolutely. We regularly produce stained glass panels that complement or continue existing glazing in fanlights, sidelights or internal windows within a property." },
  { id: "sg-faq-5", q: "Are stained glass doors energy efficient?", a: "Yes. Our stained glass panels are set within double-glazed units with thermally broken frames – providing good energy performance alongside their decorative appeal. Triple glazing is available for properties with higher thermal requirements." },
  { id: "sg-faq-6", q: "Can stained glass be added to other door styles?", a: "Yes. Stained glass panels can be incorporated into arch doors, standard front doors and other styles across our range. Discuss your requirements with our team and we will advise on the best configuration for your property." },
  { id: "sg-faq-7", q: "How long does it take to design and build a stained glass door?", a: "Lead times vary depending on design complexity and current production schedule. We will give you a clear, confirmed timeline during your free consultation before any commitment is made." },
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
                                {` Stained Glass Doors – Frequently Asked Questions `}
                              </h2>
                            </div>
                            <div
                              className="accordian fusion-accordian"
                              style={{ '--awb-padding-bottom': '15px', '--awb-padding-left': '0px', '--awb-border-size': '0px', '--awb-icon-size': '18px', '--awb-icon-alignment': 'left', '--awb-hover-color': 'var(--awb-color6)', '--awb-background-color': 'var(--awb-color1)', '--awb-icon-color': 'var(--awb-color6)', '--awb-title-color': 'var(--awb-color6)', '--awb-content-color': 'var(--awb-color6)', '--awb-icon-box-color': 'var(--awb-color1)', '--awb-title-font-family': '"Montserrat"', '--awb-title-font-weight': '500', '--awb-title-font-style': 'normal', '--awb-title-font-size': '18px', '--awb-content-font-family': '"Montserrat"', '--awb-content-font-style': 'normal', '--awb-content-font-weight': '400' } as unknown as React.CSSProperties}
                            >
                              <div className="panel-group fusion-toggle-icon-unboxed" id="accordion-sg-faq">
                                {FAQS.map((faq) => (
                                  <div className="fusion-panel panel-default fusion-toggle-no-divider" key={faq.id}>
                                    <div className="panel-heading">
                                      <h4 className="panel-title toggle" id={`toggle_${faq.id}`}>
                                        <a aria-controls={faq.id} aria-expanded="false" data-parent="#accordion-sg-faq" data-target={`#${faq.id}`} data-toggle="collapse" href={`#${faq.id}`} role="button">
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
