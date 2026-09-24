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

// Same section + accordion markup as the Victorian doors FAQ, so both pages
// render identically - the toggle behavior is already wired globally.
export default function FrequentlyAskedQuestionsFaq() {
  return (
                    <div
                      className="fusion-fullwidth fullwidth-box fusion-builder-row-15 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                      style={{ '--link_hover_color': 'var(--awb-color5)', '--link_color': 'var(--awb-color6)', '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-right': '120px', '--awb-padding-bottom': '56px', '--awb-padding-left': '120px', '--awb-padding-right-small': '40px', '--awb-padding-bottom-small': '28px', '--awb-padding-left-small': '40px', '--awb-margin-bottom': '0px', '--awb-background-image': 'linear-gradient( 180deg, var(--awb-color1) 0%, rgba(255, 255, 255, 0) 100% )', '--awb-margin-top': '50px', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                    >
                      <div
                        className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                        style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-19 fusion_builder_column_1_1 1_1 fusion-flex-column"
                          style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div
                            className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column"
                          >
                            <div
                              className="fusion-title title fusion-title-10 fusion-sep-none fusion-title-text fusion-title-size-two"
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
                              <div
                                className="panel-group fusion-toggle-icon-unboxed"
                                id="accordion-industrial-style-doors"
                              >
                                {FAQS.map((faq) => (
                                  <div
                                    key={faq.id}
                                    className={`fusion-panel panel-default panel-${faq.id} fusion-toggle-no-divider`}
                                    style={{ '--awb-title-color': 'var(--awb-color6)', '--awb-content-color': 'var(--awb-color6)' } as unknown as React.CSSProperties}
                                  >
                                    <div
                                      className="panel-heading"
                                    >
                                      <h4
                                        className="panel-title toggle"
                                        id={`toggle_${faq.id}`}
                                      >
                                        <a
                                          aria-controls={faq.id}
                                          aria-expanded="false"
                                          data-parent="#accordion-industrial-style-doors"
                                          data-target={`#${faq.id}`}
                                          data-toggle="collapse"
                                          href={`#${faq.id}`}
                                          role="button"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="fusion-toggle-icon-wrapper"
                                          >
                                            <i
                                              aria-hidden="true"
                                              className="fa-fusion-box active-icon awb-icon-minus"
                                            ></i>
                                            <i
                                              aria-hidden="true"
                                              className="fa-fusion-box inactive-icon awb-icon-plus"
                                            ></i>
                                          </span>
                                          <span
                                            className="fusion-toggle-heading"
                                          >
                                            {faq.q}
                                          </span>
                                        </a>
                                      </h4>
                                    </div>
                                    <div
                                      aria-labelledby={`toggle_${faq.id}`}
                                      className="panel-collapse collapse"
                                      id={faq.id}
                                    >
                                      <div
                                        className="panel-body toggle-content fusion-clearfix"
                                      >
                                        <p>
                                          {faq.a}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
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
                        </div>
                      </div>
                    </div>
  );
}
