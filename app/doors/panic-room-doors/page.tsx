import type { Metadata } from "next";
import CTABlock from "@/components/CTABlock";
import HighSecuritySafeRoomPanicRoom from "@/components/doors/panic-room-doors/HighSecuritySafeRoomPanicRoom";
import Row4 from "@/components/doors/panic-room-doors/Row4";
import Row5 from "@/components/doors/panic-room-doors/Row5";
import BespokeSafeRoomPanicRoomDoor from "@/components/doors/panic-room-doors/BespokeSafeRoomPanicRoomDoor";
import Row7 from "@/components/doors/panic-room-doors/Row7";
import Row8 from "@/components/doors/panic-room-doors/Row8";
import Row9 from "@/components/doors/panic-room-doors/Row9";
import OurPanicRoomDoorsOptions from "@/components/doors/panic-room-doors/OurPanicRoomDoorsOptions";
import VideoEmbed from "@/components/doors/panic-room-doors/VideoEmbed";
import ChoosePanicRoomDoorType from "@/components/doors/panic-room-doors/ChoosePanicRoomDoorType";
import InternalVaultDoors from "@/components/doors/panic-room-doors/InternalVaultDoors";
import VideoEmbed2 from "@/components/doors/panic-room-doors/VideoEmbed2";
import FireProtectionUp120Minutes from "@/components/doors/panic-room-doors/FireProtectionUp120Minutes";
import VaultDoorDesign from "@/components/doors/panic-room-doors/VaultDoorDesign";
import HowChoosePanicRoomSafeRoom from "@/components/doors/panic-room-doors/HowChoosePanicRoomSafeRoom";
import WhatKeyAspectsSafeRooms from "@/components/doors/panic-room-doors/WhatKeyAspectsSafeRooms";
import VaultDoorsVsPanicRoomDoors from "@/components/doors/panic-room-doors/VaultDoorsVsPanicRoomDoors";
import VaultPanicRoomDoorsGallery from "@/components/doors/panic-room-doors/VaultPanicRoomDoorsGallery";
import FrequentlyAskedQuestionsFaq from "@/components/doors/panic-room-doors/FrequentlyAskedQuestionsFaq";
import LetsSecurePropertyTogether from "@/components/doors/panic-room-doors/LetsSecurePropertyTogether";
import { DEFAULT_OG_IMAGE } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Safe Room & Panic Room Doors for Ultimate Security | UK Made",
  description:
    "Looking for top-grade Safe Room or Panic Room Doors? Explore UK-engineered solutions for maximum security, durability & protection. Built to resist threats.",
  alternates: {
    canonical: "https://secure-house.co.uk/doors/panic-room-doors",
  },
  openGraph: {
    title: "Safe Room & Panic Room Doors for Ultimate Security | UK Made",
    description: "Looking for top-grade Safe Room or Panic Room Doors? Explore UK-engineered solutions for maximum security, durability & protection. Built to resist threats.",
    url: "https://secure-house.co.uk/doors/panic-room-doors",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe Room & Panic Room Doors for Ultimate Security | UK Made",
    description: "Looking for top-grade Safe Room or Panic Room Doors? Explore UK-engineered solutions for maximum security, durability & protection. Built to resist threats.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function Page() {
  return (
    <div
      className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-2175 page-child parent-pageid-2163 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration"
      suppressHydrationWarning
    >
      <link key="pl2" rel="stylesheet" href="/legacy-assets/uploads/fusion-styles/14d953cf40ac083fdc4b89930f1dfacc.min.css?ver=3.13.3" />
      <link key="pl3" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Megrim" />
      <div
        id="boxed-wrapper"
      >
        <div
          className="fusion-wrapper"
          id="wrapper"
        >
          <main
            className="clearfix width-100"
            id="main"
          >
            <div
              className="fusion-row"
              style={{ maxWidth: '100%' } as React.CSSProperties}
            >
              <section
                className="full-width"
                id="content"
              >
                <div
                  className="post-2175 page type-page status-publish has-post-thumbnail hentry"
                  id="post-2175"
                >
                  <div
                    className="post-content"
                  >
      <HighSecuritySafeRoomPanicRoom />
      <Row4 />
      <Row5 />
      <BespokeSafeRoomPanicRoomDoor />
      <Row7 />
      <Row8 />
      <Row9 />
      <OurPanicRoomDoorsOptions />
      <VideoEmbed />
      <ChoosePanicRoomDoorType />
      <InternalVaultDoors />
      <VideoEmbed2 />
      <FireProtectionUp120Minutes />
      <VaultDoorDesign />
      <HowChoosePanicRoomSafeRoom />
      <WhatKeyAspectsSafeRooms />
      <VaultDoorsVsPanicRoomDoors />
      <VaultPanicRoomDoorsGallery />
      <FrequentlyAskedQuestionsFaq />
      <LetsSecurePropertyTogether />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <CTABlock
        heading="Create Your Ultimate Safe Space"
        text="Speak with our experts about a bespoke panic room door built for discreet, dependable protection."
        buttonLabel="Discuss Your Safe Room"
      />
    </div>
  );
}
