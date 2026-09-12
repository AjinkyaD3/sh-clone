import Link from "next/link";

export default function IntroHeading() {
  return (
                      <div
                        className="fusion-fullwidth fullwidth-box fusion-builder-row-4 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling fusion-no-medium-visibility fusion-no-large-visibility"
                        style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-top': '0px', '--awb-padding-right': '0px', '--awb-padding-bottom': '0px', '--awb-padding-left': '0px', '--awb-padding-top-small': '0px', '--awb-padding-bottom-small': '0px', '--awb-margin-top': '0px', '--awb-margin-bottom': '0px', '--awb-background-color': 'rgba(28, 30, 54, 0)', '--awb-background-image': 'linear-gradient( 180deg, rgba(33, 35, 38, 0.8) 0%, rgba(33, 35, 38, 0.76) 100% )', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="awb-background-slider"
                          data-animation="fade"
                          data-animation-speed="800"
                          data-direction="up"
                          data-loop="yes"
                          data-slideshow-speed="5000"
                          data-type="container"
                          style={{ '--awb-image-position': '50% 50%' } as unknown as React.CSSProperties}
                        >
                          <div
                            className="swiper-wrapper"
                          >
                            <div
                              className="swiper-slide"
                            ></div>
                          </div>
                        </div>
                        <div
                          className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-align-content-center fusion-flex-content-wrap"
                          style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                        >
                          <div
                            className="fusion-layout-column fusion_builder_column fusion-builder-column-6 fusion_builder_column_1_1 1_1 fusion-flex-column"
                            style={{ '--awb-padding-top-small': '435px', '--awb-padding-right-small': '0px', '--awb-padding-bottom-small': '140px', '--awb-padding-left-small': '0px', '--awb-bg-image-small': 'linear-gradient( 180deg, rgba(33, 35, 38, 0.36) 0%, rgba(33, 35, 38, 0.69) 100% ), url(/legacy-assets/uploads/2025/02/Group-275.png)', '--awb-bg-image': 'linear-gradient( 180deg, rgba(33, 35, 38, 0.36) 0%, rgba(33, 35, 38, 0.69) 100% )', '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                          >
                            <div
                              className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column fusion-column-has-bg-image-small"
                            >
                              <div
                                className="fusion-title title fusion-title-4 fusion-sep-none fusion-title-text fusion-title-size-one"
                                style={{ '--awb-margin-top-small': '30px', '--awb-margin-bottom-small': '30px', '--awb-font-size': '40px' } as unknown as React.CSSProperties}
                              >
                                <h1
                                  className="fusion-title-heading title-heading-left sm-text-align-center fusion-responsive-typography-calculated"
                                  style={{ fontFamily: 'var(--awb-typography1-font-family)', fontWeight: 'var(--awb-typography1-font-weight)', fontStyle: 'var(--awb-typography1-font-style)', margin: '0', letterSpacing: 'var( --awb-typography1-letter-spacing )', textTransform: 'var( --awb-typography1-text-transform )', fontSize: '1em', '--fontSize': '40', lineHeight: '1.2' } as unknown as React.CSSProperties}
                                >
                                  <p
                                    className="fusion-responsive-typography-calculated"
                                    data-fontsize="60"
                                    data-lineheight="90px"
                                  >
                                    {` Bespoke Luxury –`}
                                    <br />
                                    {` Mastercrafted`}
                                    <br />
                                    {` Security `}
                                  </p>
                                </h1>
                              </div>
                              <div
                                className="sm-text-align-center"
                              >
                                <Link
                                  className="fusion-button button-flat button-xlarge button-custom fusion-button-default button-5 fusion-button-span-no fusion-button-default-type"
                                  href="/products/"
                                  style={{ '--button_accent_color': 'var(--awb-color6)', '--button_border_color': 'var(--awb-color6)', '--button_accent_hover_color': 'var(--awb-color1)', '--button_border_hover_color': 'hsla( var(--awb-color4-h), var(--awb-color4-s), calc(var(--awb-color4-l) - 4%), var(--awb-color4-a) )', '--button_gradient_top_color': 'rgba( 255, 255, 255, 0.8 )', '--button_gradient_bottom_color': 'rgba( 255, 255, 255, 0.8 )', '--button_gradient_top_color_hover': 'var( --awb-color6 )', '--button_gradient_bottom_color_hover': 'var( --awb-color6 )' } as unknown as React.CSSProperties}
                                  target="_self"
                                >
                                  <span
                                    className="fusion-button-text awb-button__text awb-button__text--default"
                                  >
                                    {`Discover products`}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
  );
}
