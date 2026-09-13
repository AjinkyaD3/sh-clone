"use client";

import { useState } from "react";

// Original WordPress form posted to Avada/Fusion's own ajax handler, which
// doesn't exist in this migration - the form had no working submission path
// at all. Wired to the shared /api/enquiry route (see
// migration-log/CHANGES-NEEDED.md, "contact form backend") instead of
// building a second endpoint just for this form. The two response alert
// blocks below already existed in the ported markup (Avada renders both,
// permanently hidden, and its own JS shows one or the other) - now toggled
// by real submission state instead of always being present in the DOM.
export default function Row4() {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    setSending(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setResult("success");
      e.currentTarget.reset();
    } catch {
      setResult("error");
    } finally {
      setSending(false);
    }
  };

  return (
                    <div
                      className="fusion-container-anchor"
                      id="contact"
                    >
                      <div
                        className="fusion-fullwidth fullwidth-box fusion-builder-row-4 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling"
                        style={{ '--link_color': 'var(--awb-color6)', '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-top': '120px', '--awb-padding-right': '190px', '--awb-padding-bottom': '0px', '--awb-padding-left': '190px', '--awb-padding-right-small': '40px', '--awb-padding-left-small': '40px', '--awb-margin-top': '0px', '--awb-margin-bottom': '0px', '--awb-margin-top-small': '0px', '--awb-margin-bottom-small': '0px', '--awb-background-color': 'var(--awb-color3)', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                      >
                        <div
                          className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                          style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                        >
                          <div
                            className="fusion-layout-column fusion_builder_column fusion-builder-column-6 fusion_builder_column_1_1 1_1 fusion-flex-column fusion-flex-align-self-center"
                            style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '0%', '--awb-margin-bottom-large': '62px', '--awb-spacing-left-large': '0%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                          >
                            <div
                              className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-end fusion-content-layout-column"
                            >
                              <div
                                className="fusion-title title fusion-title-2 fusion-sep-none fusion-title-center fusion-title-text fusion-title-size-three"
                                style={{ '--awb-text-color': 'var(--awb-color6)', '--awb-margin-right': '260px', '--awb-margin-bottom': '60px', '--awb-margin-left': '260px', '--awb-font-size': 'var( --awb-typography1-font-size )' } as unknown as React.CSSProperties}
                              >
                                <h3
                                  className="fusion-title-heading title-heading-center fusion-responsive-typography-calculated"
                                  style={{ fontFamily: 'var( --awb-typography1-font-family )', fontWeight: 'var( --awb-typography1-font-weight )', fontStyle: 'var(--awb-typography1-font-style)', margin: '0', letterSpacing: 'var( --awb-typography1-letter-spacing )', textTransform: 'var( --awb-typography1-text-transform )', fontSize: '1em', '--fontSize': '50', lineHeight: 'var( --awb-typography1-line-height )' } as unknown as React.CSSProperties}
                                >
                                  {` Please don’t hesitate to call, pop in or get in touch `}
                                </h3>
                              </div>
                              <div
                                className="fusion-builder-row fusion-builder-row-inner fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                                style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                              >
                                <div
                                  className="fusion-layout-column fusion_builder_column_inner fusion-builder-nested-column-5 fusion_builder_column_inner_1_2 1_2 fusion-flex-column"
                                  style={{ '--awb-bg-size': 'cover', '--awb-width-large': '50%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '9.792%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '3.84%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-margin-top-small': '80px', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                                >
                                  <div
                                    className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column"
                                  >
                                    <div
                                      className="fusion-form fusion-form-builder fusion-form-form-wrapper fusion-form-1040 has-icon-alignment"
                                      data-config="{&quot;form_id&quot;:&quot;1040&quot;,&quot;form_post_id&quot;:&quot;1040&quot;,&quot;post_id&quot;:2173,&quot;form_type&quot;:&quot;ajax&quot;,&quot;confirmation_type&quot;:&quot;message&quot;,&quot;redirect_url&quot;:&quot;&quot;,&quot;field_labels&quot;:{&quot;name&quot;:&quot;Name&quot;,&quot;email&quot;:&quot;Email&quot;,&quot;phone&quot;:&quot;Contact phone&quot;,&quot;message&quot;:&quot;Your MESSAGE:&quot;},&quot;field_logics&quot;:{&quot;notice_1&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;email&quot;:&quot;&quot;,&quot;phone&quot;:&quot;&quot;,&quot;message&quot;:&quot;&quot;,&quot;submit_1&quot;:&quot;&quot;},&quot;field_types&quot;:{&quot;notice_1&quot;:&quot;notice&quot;,&quot;name&quot;:&quot;text&quot;,&quot;email&quot;:&quot;email&quot;,&quot;phone&quot;:&quot;phone_number&quot;,&quot;message&quot;:&quot;textarea&quot;,&quot;submit_1&quot;:&quot;submit&quot;,&quot;utm_source&quot;:&quot;hidden&quot;,&quot;utm_medium&quot;:&quot;hidden&quot;,&quot;utm_campaign&quot;:&quot;hidden&quot;},&quot;nonce_method&quot;:&quot;ajax&quot;}"
                                      data-form-id="1040"
                                      style={{ '--awb-tooltip-text-color': '#ffffff', '--awb-tooltip-background-color': 'var( --awb-color1 )', '--awb-form-input-height': '30px', '--awb-form-bg-color': 'var(--awb-color3)', '--awb-label-font-size': '18px', '--awb-form-font-size': '18px', '--awb-form-placeholder-color': '#635548', '--awb-form-text-color': '#635548', '--awb-form-label-color': '#635548', '--awb-form-border-width-bottom': '1px', '--awb-form-border-color': '#1c1e36', '--awb-icon-alignment-top': '1px', '--awb-icon-alignment-bottom': '1px', '--awb-icon-alignment-font-size': '18px' } as unknown as React.CSSProperties}
                                    >
                                      <form
                                        className="fusion-form fusion-form-1040"
                                        onSubmit={handleSubmit}
                                      >
                                        <div
                                          className="fusion-fullwidth fullwidth-box fusion-builder-row-4-1 fusion-flex-container nonhundred-percent-fullwidth non-hundred-percent-height-scrolling"
                                          style={{ '--awb-border-radius-top-left': '0px', '--awb-border-radius-top-right': '0px', '--awb-border-radius-bottom-right': '0px', '--awb-border-radius-bottom-left': '0px', '--awb-padding-top': '0px', '--awb-padding-right': '0px', '--awb-padding-bottom': '0px', '--awb-padding-left': '0px', '--awb-flex-wrap': 'wrap' } as unknown as React.CSSProperties}
                                        >
                                          <div
                                            className="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap"
                                            style={{ width: '104% !important', maxWidth: '104% !important', marginLeft: 'calc(-4% / 2)', marginRight: 'calc(-4% / 2)' } as unknown as React.CSSProperties}
                                          >
                                            <div
                                              className="fusion-layout-column fusion_builder_column fusion-builder-column-7 fusion_builder_column_1_1 1_1 fusion-flex-column"
                                              style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-flex-grow': '0', '--awb-flex-shrink': '0', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '20px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-flex-grow-medium': '0', '--awb-flex-shrink-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-flex-grow-small': '0', '--awb-flex-shrink-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                                            >
                                              <div
                                                className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column"
                                              >
                                                <div
                                                  className="form-submission-notices data-notice_1"
                                                  id="fusion-notices-1"
                                                >
                                                  {result === "success" && (
                                                    <div
                                                      className="fusion-alert alert success alert-success fusion-alert-center fusion-form-response fusion-form-response-success fusion-alert-capitalize awb-alert-native-link-color alert-dismissable awb-alert-close-boxed"
                                                      role="alert"
                                                      style={{ display: 'block' }}
                                                    >
                                                      <div
                                                        className="fusion-alert-content-wrapper"
                                                      >
                                                        <span
                                                          className="alert-icon"
                                                        >
                                                          <i
                                                            aria-hidden="true"
                                                            className="awb-icon-check-circle"
                                                          ></i>
                                                        </span>
                                                        <span
                                                          className="fusion-alert-content"
                                                        >
                                                          {`Thank you for your message. It has been sent.`}
                                                        </span>
                                                      </div>
                                                      <button
                                                        aria-label="Close"
                                                        className="close toggle-alert"
                                                        onClick={() => setResult(null)}
                                                        type="button"
                                                      >
                                                        {` × `}
                                                      </button>
                                                    </div>
                                                  )}
                                                  {result === "error" && (
                                                    <div
                                                      className="fusion-alert alert error alert-danger fusion-alert-center fusion-form-response fusion-form-response-error fusion-alert-capitalize awb-alert-native-link-color alert-dismissable awb-alert-close-boxed"
                                                      role="alert"
                                                      style={{ display: 'block' }}
                                                    >
                                                      <div
                                                        className="fusion-alert-content-wrapper"
                                                      >
                                                        <span
                                                          className="alert-icon"
                                                        >
                                                          <i
                                                            aria-hidden="true"
                                                            className="awb-icon-exclamation-triangle"
                                                          ></i>
                                                        </span>
                                                        <span
                                                          className="fusion-alert-content"
                                                        >
                                                          {`There was an error trying to send your message. Please try again later.`}
                                                        </span>
                                                      </div>
                                                      <button
                                                        aria-label="Close"
                                                        className="close toggle-alert"
                                                        onClick={() => setResult(null)}
                                                        type="button"
                                                      >
                                                        {` × `}
                                                      </button>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="fusion-layout-column fusion_builder_column fusion-builder-column-8 fusion_builder_column_1_1 1_1 fusion-flex-column"
                                              style={{ '--awb-bg-size': 'cover', '--awb-width-large': '100%', '--awb-flex-grow': '0', '--awb-flex-shrink': '0', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '1.92%', '--awb-margin-bottom-large': '20px', '--awb-spacing-left-large': '1.92%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-flex-grow-medium': '0', '--awb-flex-shrink-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-flex-grow-small': '0', '--awb-flex-shrink-small': '0', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                                            >
                                              <div
                                                className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column"
                                              >
                                                <div
                                                  className="fusion-form-field fusion-form-text-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <div
                                                    className="fusion-form-label-wrapper"
                                                  >
                                                    <label
                                                      htmlFor="name"
                                                    >
                                                      {`Name `}
                                                      <abbr
                                                        className="fusion-form-element-required"
                                                        title="required"
                                                      >
                                                        {`*`}
                                                      </abbr>
                                                    </label>
                                                  </div>
                                                  <input
                                                    aria-required="true"
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    data-empty-notice="please fill"
                                                    data-holds-private-data="false"
                                                    id="name"
                                                    minLength={0}
                                                    name="name"
                                                    required={true}
                                                    type="text"
                                                    defaultValue=""
                                                  />
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-email-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <div
                                                    className="fusion-form-label-wrapper"
                                                  >
                                                    <label
                                                      htmlFor="email"
                                                    >
                                                      {`Email `}
                                                      <abbr
                                                        className="fusion-form-element-required"
                                                        title="required"
                                                      >
                                                        {`*`}
                                                      </abbr>
                                                    </label>
                                                  </div>
                                                  <input
                                                    aria-required="true"
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    data-empty-notice="please fill"
                                                    data-holds-private-data="false"
                                                    id="email"
                                                    name="email"
                                                    required={true}
                                                    type="email"
                                                    defaultValue=""
                                                  />
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-phone-number-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <div
                                                    className="fusion-form-label-wrapper"
                                                  >
                                                    <label
                                                      htmlFor="phone"
                                                    >
                                                      {`Contact phone `}
                                                      <abbr
                                                        className="fusion-form-element-required"
                                                        title="required"
                                                      >
                                                        {`*`}
                                                      </abbr>
                                                    </label>
                                                  </div>
                                                  <input
                                                    aria-required="true"
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    data-empty-notice="please fill"
                                                    data-holds-private-data="false"
                                                    id="phone"
                                                    name="phone"
                                                    required={true}
                                                    type="tel"
                                                    defaultValue=""
                                                  />
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-textarea-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <label
                                                    htmlFor="message"
                                                  >
                                                    {`Your MESSAGE:`}
                                                  </label>
                                                  <textarea
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    cols={40}
                                                    data-holds-private-data="false"
                                                    id="message"
                                                    minLength={0}
                                                    name="message"
                                                    rows={4}
                                                  ></textarea>
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-submit-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <div
                                                    style={{ textAlign: 'center' } as unknown as React.CSSProperties}
                                                  >
                                                    <button
                                                      className="fusion-button button-flat fusion-button-default-size button-custom fusion-button-default button-2 fusion-button-span-no form-form-submit button-default"
                                                      data-form-number="1040"
                                                      disabled={sending}
                                                      style={{ '--button_accent_color': 'var( --awb-color1 )', '--button_accent_hover_color': 'var( --awb-color1 )', '--button_border_hover_color': 'hsla( var(--awb-color4-h), var(--awb-color4-s), calc( var(--awb-color4-l) - 4% ), var(--awb-color4-a) )', '--button_gradient_top_color': 'var( --awb-color6 )', '--button_gradient_bottom_color': 'var( --awb-color6 )', '--button_gradient_top_color_hover': 'var( --awb-color5 )', '--button_gradient_bottom_color_hover': 'var( --awb-color5 )', '--button_padding-top': '10px', '--button_padding-right': '70px', '--button_padding-bottom': '10px', '--button_padding-left': '70px', '--button_margin-top': '30px' } as unknown as React.CSSProperties}
                                                      type="submit"
                                                    >
                                                      <span
                                                        className="fusion-button-text awb-button__text awb-button__text--default"
                                                      >
                                                        {sending ? `Sending…` : `Send`}
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-hidden-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <input
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    data-holds-private-data="false"
                                                    id="utm_source"
                                                    name="utm_source"
                                                    type="hidden"
                                                    defaultValue=""
                                                  />
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-hidden-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <input
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    data-holds-private-data="false"
                                                    id="utm_medium"
                                                    name="utm_medium"
                                                    type="hidden"
                                                    defaultValue=""
                                                  />
                                                </div>
                                                <div
                                                  className="fusion-form-field fusion-form-hidden-field fusion-form-label-above"
                                                  data-form-id="1040"
                                                  style={{  } as unknown as React.CSSProperties}
                                                >
                                                  <input
                                                    autoComplete="off"
                                                    className="fusion-form-input"
                                                    data-holds-private-data="false"
                                                    id="utm_campaign"
                                                    name="utm_campaign"
                                                    type="hidden"
                                                    defaultValue=""
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <input
                                          name="fusion_privacy_store_ip_ua"
                                          type="hidden"
                                          defaultValue="false"
                                        />
                                        <input
                                          name="fusion_privacy_expiration_interval"
                                          type="hidden"
                                          defaultValue="48"
                                        />
                                        <input
                                          name="privacy_expiration_action"
                                          type="hidden"
                                          defaultValue="anonymize"
                                        />
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="fusion-layout-column fusion_builder_column_inner fusion-builder-nested-column-6 fusion_builder_column_inner_1_2 1_2 fusion-flex-column fusion-flex-align-self-stretch"
                                  style={{ '--awb-bg-size': 'cover', '--awb-width-large': '50%', '--awb-margin-top-large': '0px', '--awb-spacing-right-large': '3.84%', '--awb-margin-bottom-large': '0px', '--awb-spacing-left-large': '13.248%', '--awb-width-medium': '100%', '--awb-order-medium': '0', '--awb-spacing-right-medium': '1.92%', '--awb-spacing-left-medium': '1.92%', '--awb-width-small': '100%', '--awb-order-small': '0', '--awb-margin-top-small': '81px', '--awb-spacing-right-small': '1.92%', '--awb-spacing-left-small': '1.92%' } as unknown as React.CSSProperties}
                                >
                                  <div
                                    className="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-center fusion-content-layout-column"
                                  >
                                    <div
                                      className="fusion-text fusion-text-1"
                                      style={{ '--awb-font-size': '18px', '--awb-line-height': '1.7', '--awb-letter-spacing': 'var( --awb-typography4-letter-spacing )', '--awb-text-transform': 'var( --awb-typography4-text-transform )', '--awb-text-color': 'var(--awb-color6)', '--awb-text-font-family': '"Montserrat"', '--awb-text-font-style': 'normal', '--awb-text-font-weight': '600' } as unknown as React.CSSProperties}
                                    >
                                      <p>
                                        {` info@secure-house.co.uk`}
                                        <br />
                                        <a
                                          href="tel: +44 20 7859 4207"
                                        >
                                          {`+44 20 7859 4207`}
                                        </a>
                                      </p>
                                    </div>
                                    <div
                                      className="fusion-text fusion-text-2"
                                      style={{ '--awb-font-size': '18px', '--awb-line-height': '1.7', '--awb-letter-spacing': 'var( --awb-typography4-letter-spacing )', '--awb-text-transform': 'var( --awb-typography4-text-transform )', '--awb-text-color': 'var(--awb-color6)', '--awb-text-font-family': 'var( --awb-typography4-font-family )', '--awb-text-font-weight': 'var( --awb-typography4-font-weight )', '--awb-text-font-style': 'var( --awb-typography4-font-style )' } as unknown as React.CSSProperties}
                                    >
                                      <p>
                                        {` Mon–Fri: 08:00–18:00`}
                                        <br />
                                        {` Sat–Sun: Closed `}
                                      </p>
                                    </div>
                                    <div
                                      className="fusion-text fusion-text-3"
                                      style={{ '--awb-font-size': '18px', '--awb-line-height': '1.7', '--awb-letter-spacing': 'var( --awb-typography4-letter-spacing )', '--awb-text-transform': 'var( --awb-typography4-text-transform )', '--awb-text-color': 'var(--awb-color6)', '--awb-text-font-family': '"Montserrat"', '--awb-text-font-style': 'normal', '--awb-text-font-weight': '600' } as unknown as React.CSSProperties}
                                    >
                                      <p>
                                        {`SECURE HOUSE LTD.`}
                                      </p>
                                    </div>
                                    <div
                                      className="fusion-text fusion-text-4"
                                      style={{ '--awb-font-size': '18px', '--awb-line-height': '1.7', '--awb-letter-spacing': 'var( --awb-typography4-letter-spacing )', '--awb-text-transform': 'var( --awb-typography4-text-transform )', '--awb-text-color': 'var(--awb-color6)', '--awb-text-font-family': 'var( --awb-typography4-font-family )', '--awb-text-font-weight': 'var( --awb-typography4-font-weight )', '--awb-text-font-style': 'var( --awb-typography4-font-style )' } as unknown as React.CSSProperties}
                                    >
                                      <p>
                                        {` VAT: 215 1274 44`}
                                        <br />
                                        {` Company registration number: 9440776 `}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  );
}
