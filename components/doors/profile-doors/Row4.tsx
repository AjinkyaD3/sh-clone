import Link from "next/link";

export default function Row4() {
  return (
                    <div
                      className="fusion-fullwidth fullwidth-box fusion-builder-row-4 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                      style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-top': '80px', '--awb-padding-right': '120px', '--awb-padding-bottom': '80px', '--awb-padding-left': '120px', '--awb-padding-right-small': '40px', '--awb-padding-left-small': '40px', '--awb-margin-top': '0px', '--awb-margin-bottom': '0px', '--awb-margin-top-small': '0px', '--awb-background-color': 'var(--awb-color3)', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                    >
                      <div
                        className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                        style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-layout-column fusion_builder_column fusion-builder-column-6 fusion_builder_column_1_1 1_1 fusion-flex-column"
                          style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                        >
                          <div
                            className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column"
                          >
                            <nav
                              aria-label="Breadcrumb"
                              className="fusion-breadcrumbs awb-yoast-breadcrumbs fusion-breadcrumbs-1"
                              style={{ paddingTop: '24px', paddingBottom: '24px', '--awb-font-size': '14px', '--awb-text-color': '#847b73', '--awb-breadcrumb-sep': '"-"' } as unknown as React.CSSProperties}
                            >
                              <span>
                                <span>
                                  <Link
                                    href="/"
                                  >
                                    {`Home`}
                                  </Link>
                                </span>
                                {` » `}
                                <span>
                                  <Link
                                    href="/doors/"
                                  >
                                    {`Doors`}
                                  </Link>
                                </span>
                                {` » `}
                                <span
                                  aria-current="page"
                                  className="breadcrumb_last"
                                >
                                  {`Profile doors`}
                                </span>
                              </span>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
  );
}
