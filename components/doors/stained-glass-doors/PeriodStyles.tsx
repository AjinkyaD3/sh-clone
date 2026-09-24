const ITEMS = [
  { title: "Victorian Stained Glass Doors", text: "Victorian stained glass typically features rich jewel colours – deep ruby, cobalt blue, emerald green and amber – arranged in bold geometric or floral compositions. A central pictorial panel surrounded by a decorative border is a hallmark of the style. We recreate these using hand-cut coloured glass, faithful to the original methods." },
  { title: "Edwardian Stained Glass Doors", text: "Edwardian glazing favours softer, lighter tones – flowing florals, stylised leaves and gentle curves worked in clear and lightly tinted glass. The result is an airier, more refined look compared to the bold drama of Victorian work." },
  { title: "1930s Art Deco Stained Glass", text: "The interwar period introduced bold angular geometry to British doorways – sunburst patterns, stepped borders and clean abstract forms in amber, green and black. Particularly sought-after for the millions of semi-detached homes built across the UK between the wars." },
  { title: "Original Custom Designs", text: "Not limited to period styles. We work directly with homeowners, architects and interior designers to produce completely original stained glass designs for modern properties – built around your chosen colours, proportions and vision." },
];

export default function PeriodStyles() {
  return (
                    <div
                      className="fusion-fullwidth fullwidth-box fusion-builder-row-10 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                      style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-right': '120px', '--awb-padding-left': '120px', '--awb-padding-right-small': '40px', '--awb-padding-left-small': '40px', '--awb-margin-top': '70px', '--awb-margin-bottom': '70px', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                    >
                      <div
                        className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                        style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-13 fusion_builder_column_1_1 1_1 fusion-flex-column"
                          style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                            <div
                              className="fusion-title title fusion-title-4b fusion-sep-none fusion-title-text fusion-title-size-three"
                              style={{ '--awb-text-color': 'var(--awb-color6)', '--awb-margin-bottom': '30px', '--awb-font-size': 'var( --awb-typography1-font-size )' } as unknown as React.CSSProperties}
                            >
                              <h3
                                className="fusion-title-heading title-heading-left fusion-responsive-typography-calculated"
                                style={{ fontFamily: 'var( --awb-typography1-font-family )', fontWeight: 'var( --awb-typography1-font-weight )', fontStyle: 'var( --awb-typography1-font-style )', margin: '0', letterSpacing: 'var( --awb-typography1-letter-spacing )', textTransform: 'var( --awb-typography1-text-transform )', fontSize: '1em', '--fontSize': '32', lineHeight: 'var( --awb-typography1-line-height )' } as unknown as React.CSSProperties}
                              >
                                {` Period Stained Glass Styles We Build `}
                              </h3>
                            </div>
                            <div
                              className="fusion-builder-row fusion-builder-row-inner fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                              style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                            >
                              {ITEMS.map((item) => (
                                <div
                                  className="fusion-layout-column fusion_builder_column_inner fusion-builder-nested-column-mp fusion_builder_column_inner_1_2 1_2 fusion-flex-column"
                                  key={item.title}
                                  style={{ '--awb-padding-top': '30px', '--awb-padding-right': '40px', '--awb-padding-bottom': '30px', '--awb-width-large': '50%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '0%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '0%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                                >
                                  <div className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                                    <div
                                      className="fusion-title title fusion-title-mp fusion-sep-none fusion-title-text fusion-title-size-four"
                                      style={{ '--awb-text-color': 'var(--awb-color6)' } as unknown as React.CSSProperties}
                                    >
                                      <h4 style={{ margin: '0', fontSize: '20px', fontFamily: '"Montserrat"', fontWeight: 600 } as unknown as React.CSSProperties}>
                                        {item.title}
                                      </h4>
                                    </div>
                                    <div
                                      className="fusion-text"
                                      style={{ '--awb-text-color': 'var(--awb-color6)', '--awb-font-size': '16px', '--awb-line-height': '1.5', '--awb-margin-top': '12px' } as unknown as React.CSSProperties}
                                    >
                                      <p>{item.text}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  );
}
