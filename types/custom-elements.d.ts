// Web-component custom elements found in scraped page content. These are
// real HTML (any tag name containing a hyphen is a valid custom element per
// spec), not a conversion error - TypeScript just doesn't know about them
// unless declared here. Kept as a JSX pass-through with the exact attributes
// found in the source; behaves identically to the unconverted page (i.e. if
// the backing JS library for a given element isn't loaded anywhere in this
// app, the element renders inert on both the old and new version alike -
// this file doesn't change that, it only makes the markup compile).
//
// React 19's types define JSX.IntrinsicElements inside `declare module
// "react"` (React.JSX), not the old global JSX namespace used by the
// classic runtime - has to be augmented the same way here.
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": {
        className?: string;
        videoid?: string;
        params?: string;
        height?: string | number;
        width?: string | number;
        title?: string;
        "data-button-label"?: string;
        "data-no-cookie"?: string;
        "data-thumbnail-size"?: string;
        [key: string]: unknown;
      };
    }
  }
}
