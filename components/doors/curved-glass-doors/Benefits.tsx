const PANEL_STYLE = {
  '--awb-content-font-size': '16px',
  '--awb-content-font-family': '"Montserrat"',
  '--awb-content-font-style': 'normal',
  '--awb-content-font-weight': '400',
} as unknown as React.CSSProperties;

const ITEMS = [
  { id: "cg-benefit-1", q: "Instant Architectural Impact", a: "A curved glass door sets a property apart immediately. The graceful arc creates a focal point that commands attention, adding kerb appeal and measurable value to any property." },
  { id: "cg-benefit-2", q: "More Natural Light Inside", a: "Curved glass panels maximise the amount of natural light entering your hallway, living space or commercial entrance – creating a brighter, more welcoming atmosphere throughout the day." },
  { id: "cg-benefit-3", q: "Seamless Indoor-Outdoor Flow", a: "For rear entrances and extensions, a curved glass door creates a fluid, uninterrupted connection between your interior and outdoor space – ideal for gardens, patios and terraces." },
  { id: "cg-benefit-4", q: "Built to Your Exact Dimensions", a: "Every property is different. Our doors are manufactured to your precise opening dimensions and radius specifications – whether you need a subtle arc or a bold circular profile. No standard sizes, no compromise on fit." },
  { id: "cg-benefit-5", q: "Security Built In – Not Bolted On", a: "Reinforced steel frames, 12-point multi-point locking, toughened safety glass and anti-drill plating are all standard. Striking design never comes at the cost of your security." },
];

export default function Benefits() {
  return (
                    <div
                      className="fusion-fullwidth fullwidth-box fusion-builder-row-7 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                      style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-right': '120px', '--awb-padding-left': '120px', '--awb-padding-right-small': '40px', '--awb-padding-left-small': '40px', '--awb-margin-bottom': '70px', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                    >
                      <div
                        className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                        style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-10 fusion_builder_column_1_2 1_2 fusion-flex-column fusion-flex-align-self-center"
                          style={{ '--awb-padding-right': '60px', '--awb-padding-right-small': '0px', '--awb-bg-size': 'cover', '--awb-width-large': '50%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '0%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '0%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-margin-bottom-small': '25px', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                            <div
                              className="fusion-title title fusion-title-4 fusion-sep-none fusion-title-text fusion-title-size-three"
                              style={{ '--awb-text-color': 'var(--awb-color6)', '--awb-font-size': 'var( --awb-typography1-font-size )' } as unknown as React.CSSProperties}
                            >
                              <h3
                                className="fusion-title-heading title-heading-left fusion-responsive-typography-calculated"
                                style={{ fontFamily: 'var( --awb-typography1-font-family )', fontWeight: 'var( --awb-typography1-font-weight )', fontStyle: 'var( --awb-typography1-font-style )', margin: '0', letterSpacing: 'var( --awb-typography1-letter-spacing )', textTransform: 'var( --awb-typography1-text-transform )', fontSize: '1em', '--fontSize': '32', lineHeight: 'var( --awb-typography1-line-height )' } as unknown as React.CSSProperties}
                              >
                                {` The Benefits of Curved Glass Doors `}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-11 fusion_builder_column_1_2 1_2 fusion-flex-column"
                          style={{ '--awb-bg-size': 'cover', '--awb-width-large': '50%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '0%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '0%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                            <div
                              className="accordian fusion-accordian"
                              style={{ '--awb-border-size': '0px', '--awb-icon-size': '15px', '--awb-content-font-size': '16px', '--awb-icon-alignment': 'right', '--awb-hover-color': '#847b73', '--awb-border-color': 'var(--awb-color6)', '--awb-background-color': '#f5efe9', '--awb-icon-color': 'var(--awb-color1)', '--awb-title-color': 'var(--awb-color6)', '--awb-content-color': 'var(--awb-color6)', '--awb-icon-box-color': 'var(--awb-color6)', '--awb-toggle-hover-accent-color': 'var( --awb-color5 )', '--awb-toggle-active-accent-color': 'var( --awb-color6 )', '--awb-title-font-family': '"Montserrat"', '--awb-title-font-weight': '500', '--awb-title-font-style': 'normal', '--awb-title-font-size': '18px', '--awb-content-font-family': '"Montserrat"', '--awb-content-font-style': 'normal', '--awb-content-font-weight': '400' } as unknown as React.CSSProperties}
                            >
                              <div className="panel-group fusion-toggle-icon-right fusion-toggle-icon-unboxed" id="accordion-cg-benefits">
                                {ITEMS.map((item) => (
                                  <div className="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode" key={item.id} style={PANEL_STYLE}>
                                    <div className="panel-heading">
                                      <h4 className="panel-title toggle" id={`toggle_${item.id}`}>
                                        <a aria-controls={item.id} aria-expanded="false" data-parent="#accordion-cg-benefits" data-target={`#${item.id}`} data-toggle="collapse" href={`#${item.id}`} role="button">
                                          <span aria-hidden="true" className="fusion-toggle-icon-wrapper">
                                            <i aria-hidden="true" className="fa-fusion-box active-icon fa-angle-up fas"></i>
                                            <i aria-hidden="true" className="fa-fusion-box inactive-icon fa-angle-down fas"></i>
                                          </span>
                                          <span className="fusion-toggle-heading">{item.q}</span>
                                        </a>
                                      </h4>
                                    </div>
                                    <div aria-labelledby={`toggle_${item.id}`} className="panel-collapse collapse" id={item.id}>
                                      <div className="panel-body toggle-content fusion-clearfix">
                                        <p>{item.a}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  );
}
