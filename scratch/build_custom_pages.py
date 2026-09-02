import os
import re

# This script creates a template matching the fusion-builder layout of stained-glass-doors
# and uses it to generate curved-glass-doors and arch-doors

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

def create_page(slug, title, desc, h1, body_html, image_url="/legacy-assets/uploads/2025/02/Mask-group-15.png"):
    out_dir = os.path.join(app_root, "doors", slug)
    os.makedirs(out_dir, exist_ok=True)
    
    content = f"""
    <div class="post-content">
        <!-- Hero Section -->
        <div class="fusion-fullwidth fullwidth-box fusion-builder-row-3 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling" style="--awb-padding-right:0px;--awb-padding-left:0px;--awb-flex-wrap:wrap;">
            <div class="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap" style="width:104% !important;max-width:104% !important;margin-left: calc(-4% / 2 );margin-right: calc(-4% / 2 );">
                <div class="fusion-layout-column fusion_builder_column fusion-builder-column-5 fusion_builder_column_1_1 1_1 fusion-flex-column" style="--awb-padding-top:320px;--awb-padding-bottom:80px;--awb-padding-right-small:40px;--awb-padding-left-small:40px;--awb-bg-image:linear-gradient(180deg, rgba(33,35,38,0.38) 0%,rgba(33,35,38,0.61) 100%);;--awb-bg-position:right center;--awb-bg-size:cover;--awb-width-large:100%;">
                    <div class="fusion-column-wrapper lazyload fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column fusion-column-has-bg-image" style="background-image: url('{image_url}');">
                        <div class="fusion-builder-row fusion-builder-row-inner fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap" style="width:104% !important;max-width:104% !important;margin-left: calc(-4% / 2 );margin-right: calc(-4% / 2 );">
                            <div class="fusion-layout-column fusion_builder_column_inner fusion-builder-nested-column-3 fusion_builder_column_inner_1_1 1_1 fusion-flex-column" style="--awb-width-large:100%;">
                                <div class="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                                    <div class="fusion-title title fusion-title-1 fusion-sep-none fusion-title-center fusion-title-text fusion-title-size-one">
                                        <h1 class="fusion-title-heading title-heading-center fusion-responsive-typography-calculated" style="margin:0;text-transform:none;--fontSize:50;line-height:1.2;color:#ffffff;">{h1}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content Body -->
        <div class="fusion-fullwidth fullwidth-box fusion-builder-row-4 fusion-flex-container has-pattern-background has-mask-background hundred-percent-fullwidth non-hundred-percent-height-scrolling" style="--awb-padding-right:160px;--awb-padding-left:160px;--awb-padding-right-small:40px;--awb-padding-left-small:40px;--awb-margin-top:100px;--awb-margin-bottom:54px;--awb-flex-wrap:wrap;">
            <div class="fusion-builder-row fusion-row fusion-flex-align-items-flex-start fusion-flex-content-wrap" style="width:104% !important;max-width:104% !important;margin-left: calc(-4% / 2 );margin-right: calc(-4% / 2 );">
                <div class="fusion-layout-column fusion_builder_column fusion-builder-column-6 fusion_builder_column_1_1 1_1 fusion-flex-column" style="--awb-width-large:100%;">
                    <div class="fusion-column-wrapper fusion-column-has-shadow fusion-flex-justify-content-flex-start fusion-content-layout-column">
                        <div class="fusion-text fusion-text-1" style="--awb-content-alignment:left;--awb-font-size:18px;--awb-text-color:var(--awb-color6);--awb-text-font-family:'Montserrat';">
                            {body_html}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    """
    
    content_file = os.path.join(out_dir, "content.html")
    with open(content_file, "w", encoding="utf-8") as f:
        f.write(content)

    title_escaped = title.replace("'", "\\'")
    desc_escaped = desc.replace("'", "\\'")
    
    page_tsx = f"""import fs from 'fs';
import path from 'path';

import type {{ Metadata }} from 'next';

export const metadata: Metadata = {{
  title: '{title_escaped}',
  description: '{desc_escaped}',
  alternates: {{
    canonical: 'https://secure-house-next-js.vercel.app/doors/{slug}',
  }},
}};

export default function Page() {{
  const filePath = path.join(process.cwd(), 'app', 'doors/{slug}', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return (
    <div className="wp-singular page-template page-template-100-width page-template-100-width-php page page-child wp-theme-Avada fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration" suppressHydrationWarning dangerouslySetInnerHTML={{{{ __html: html }}}} />
  );
}}
"""
    page_file = os.path.join(out_dir, "page.tsx")
    with open(page_file, "w", encoding="utf-8") as f:
        f.write(page_tsx)
    print(f"Built /doors/{slug}/")

# Generate Curved Glass Doors
body_curved = """
<p>Few architectural features make a statement quite like a curved glass door. Whether you are designing a striking residential entrance, a contemporary extension, or a high-end commercial facade, curved glass doors deliver a visual impact that standard doors simply cannot match.</p>
<p>At Secure House, we design and manufacture curved glass doors from our UK facility in Luton — combining the elegance of architectural glazing with the robust, multi-point security systems we are known for. Every door is built to your exact measurements, your specification, your vision.</p>
<p style="margin-top: 30px; margin-bottom: 30px;">
    <a class="fusion-button button-flat button-large button-custom fusion-button-default button-2 fusion-button-span-no" style="--button_accent_color:#ffffff;--button_border_color:#e3000f;--button_gradient_top_color:#e3000f;--button_gradient_bottom_color:#e3000f;--button_typography-font-family:'Montserrat';--button_typography-font-weight:500;" href="/contact-us/"><span class="fusion-button-text">Get a Free Consultation</span></a>
    &nbsp;&nbsp;
    <a class="fusion-button button-flat button-large button-custom fusion-button-default button-3 fusion-button-span-no" style="--button_accent_color:#ffffff;--button_border_color:#333333;--button_gradient_top_color:#333333;--button_gradient_bottom_color:#333333;--button_typography-font-family:'Montserrat';--button_typography-font-weight:500;" href="tel:02078594207"><span class="fusion-button-text">Call 0207 859 4207</span></a>
</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">What Are Curved Glass Doors?</h2>
<p>Curved glass doors feature glass panels that have been precision-shaped into a gentle arc — either convex (curving outward) or concave (curving inward). Unlike standard flat-glass doors, they require careful engineering of both the glass unit and the door frame to achieve a perfect, weatherproof, weather-tight fit.</p>
<p>They are increasingly specified for:</p>
<ul>
    <li>Luxury residential properties — as front doors, garden room entrances, or rear extensions opening onto a terrace</li>
    <li>Period and heritage properties — where a traditional arched or curved profile needs to be faithfully recreated</li>
    <li>Commercial buildings — hotels, offices, showrooms and retail spaces seeking a distinctive, high-impact entrance</li>
</ul>
<p>At Secure House, every curved glass door we produce is engineered with the same security standards as our wider door range. You never have to choose between a stunning design and a door that genuinely protects your property. Learn more about <a href="/doors/high-security-doors/">our high-security door range</a>.</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">The Benefits of Curved Glass Doors</h2>
<h3>Instant Architectural Impact</h3>
<p>A curved glass door sets a property apart immediately. The graceful arc creates a focal point that commands attention, adding kerb appeal and measurable value to any property.</p>

<h3>More Natural Light Inside</h3>
<p>Curved glass panels maximise the amount of natural light entering your hallway, living space or commercial entrance — creating a brighter, more welcoming atmosphere throughout the day.</p>

<h3>Seamless Indoor-Outdoor Flow</h3>
<p>For rear entrances and extensions, a curved glass door creates a fluid, uninterrupted connection between your interior and outdoor space — ideal for gardens, patios and terraces.</p>

<h3>Built to Your Exact Dimensions</h3>
<p>Every property is different. Our doors are manufactured to your precise opening dimensions and radius specifications — whether you need a subtle arc or a bold circular profile. No standard sizes, no compromise on fit.</p>

<h3>Security Built In — Not Bolted On</h3>
<p>Reinforced steel frames, 12-point multi-point locking, toughened safety glass and anti-drill plating are all standard. Striking design never comes at the cost of your security.</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Key Features of Curved Glass Doors</h2>
<ul>
    <li>Bespoke UK manufacture — designed and built in our own factory to your exact specifications</li>
    <li>Available in a wide range of radii and configurations — from 2-panel to 6-panel curved sliding systems</li>
    <li>High-security multi-point locking systems integrated into the curved frame</li>
    <li>Thermally insulated aluminium frames — energy efficient and compliant with UK building regulations</li>
    <li>Toughened and laminated safety glass options, including Low-E glass for better thermal performance</li>
    <li>Smooth sliding or hinged operation — automation available for larger, heavier configurations</li>
    <li>Powder coated in any RAL colour — seamlessly matches your property exterior</li>
    <li>Suitable for both new-build projects and retrofit installations in existing properties</li>
    <li>Nationwide UK supply and installation coverage</li>
</ul>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Where Are Curved Glass Doors Used?</h2>
<p>Our curved glass doors are specified across a wide range of UK projects:</p>
<ul>
    <li>Period and listed buildings — recreating original arched or curved entrances with modern security</li>
    <li>New-build luxury homes — creating a signature architectural entrance</li>
    <li>Rear kitchen and dining extensions — connecting interior living spaces to garden terraces</li>
    <li>Commercial showrooms and office lobbies — making a powerful first impression on visitors</li>
    <li>Hotels and hospitality venues — blending luxury aesthetics with practical security</li>
    <li>Garden rooms and orangeries — maximising glazing and natural light</li>
</ul>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Curved Glass Doors — Frequently Asked Questions</h2>
<div class="accordian fusion-accordian" style="margin-top: 30px;">
    <div class="panel-group fusion-toggle-icon-right fusion-toggle-icon-unboxed">
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq1">How much do curved glass doors cost in the UK?</a></h4></div>
            <div id="faq1" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Curved glass doors are a premium, made-to-measure product and pricing depends on size, radius, glazing specification and security features required. At Secure House, we provide a free, no-obligation quote tailored to your exact requirements. Contact us for a personalised consultation.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq2">Are curved glass doors secure?</a></h4></div>
            <div id="faq2" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Yes. All our curved glass doors are built with reinforced steel frames, 12-point multi-point locking and toughened safety glass as standard. Our doors are certified to EN 1627:2011 and PAS 24 — the same security standards across our full door range.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq3">Can curved glass doors be used as front doors?</a></h4></div>
            <div id="faq3" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Absolutely. A curved glass front door makes a stunning and highly secure entrance for residential and commercial properties alike. Each door is manufactured to your specific opening dimensions and radius.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq4">How long does it take to manufacture and install a curved glass door?</a></h4></div>
            <div id="faq4" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Lead times vary depending on specification and complexity. We will confirm a clear, agreed timeline during your consultation before any work begins.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq5">Do curved glass doors offer good insulation?</a></h4></div>
            <div id="faq5" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Yes. Our doors feature thermally broken frames and double glazing as standard, with triple-glazed options available — delivering excellent thermal and acoustic performance alongside their striking appearance.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq6">Can you fit a curved glass door to an existing opening?</a></h4></div>
            <div id="faq6" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Yes. Our team carries out a full site survey before manufacture to ensure your door is built to the precise dimensions of your existing opening for a perfect, weather-tight fit.</p></div></div>
        </div>
    </div>
</div>
<p style="margin-top: 40px;">
    Ready to design your curved glass door? <a href="/doors/bespoke-doors/">View our full door range</a>, browse <a href="/doors/">all door styles</a>, or <a href="/products/">explore all products</a>.
</p>
"""

create_page(
    slug="curved-glass-doors",
    title="Curved Glass Doors | Made to Measure & Secure Design",
    desc="Made-to-measure curved glass doors, manufactured in the UK. Stunning design with multi-point security as standard. Free consultation.",
    h1="Curved Glass Doors — Made to Measure, UK Manufactured & Security Certified",
    body_html=body_curved,
    image_url="/legacy-assets/uploads/2024/02/Bespoke-curved-glass.jpg" # A relevant image if possible
)

# Generate Arch Doors
body_arch = """
<p>An arch door does more than frame an entrance — it defines it. Whether you are restoring the character of a period property or creating a bold architectural focal point on a new build, a hand-built arched front door delivers a timeless elegance that no standard rectangular door can match.</p>
<p>At Secure House, we design and manufacture arch doors from our UK facility in Luton — every profile, every dimension, every finish built to your exact specification. Each door combines the classic proportions of an arched entrance with the high-security engineering that modern homes and commercial properties demand.</p>
<p style="margin-top: 30px; margin-bottom: 30px;">
    <a class="fusion-button button-flat button-large button-custom fusion-button-default button-2 fusion-button-span-no" style="--button_accent_color:#ffffff;--button_border_color:#e3000f;--button_gradient_top_color:#e3000f;--button_gradient_bottom_color:#e3000f;--button_typography-font-family:'Montserrat';--button_typography-font-weight:500;" href="/contact-us/"><span class="fusion-button-text">Get a Free Consultation</span></a>
    &nbsp;&nbsp;
    <a class="fusion-button button-flat button-large button-custom fusion-button-default button-3 fusion-button-span-no" style="--button_accent_color:#ffffff;--button_border_color:#333333;--button_gradient_top_color:#333333;--button_gradient_bottom_color:#333333;--button_typography-font-family:'Montserrat';--button_typography-font-weight:500;" href="/door-styles/"><span class="fusion-button-text">Explore Arch Door Styles</span></a>
</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">What Is an Arch Door?</h2>
<p>An arch door — also called a round-top door or arched front door — features a curved or rounded top profile rather than the flat header of a standard rectangular door. The most common arch profiles are:</p>
<ul>
    <li>Semi-circular arch — a classic full half-circle head, widely seen on Georgian and Victorian properties</li>
    <li>Gothic or pointed arch — a distinctive V-shaped curve associated with period and ecclesiastical architecture</li>
    <li>Segmental arch — a subtle, flatter curve that adds elegance without the drama of a full semicircle</li>
    <li>Elliptical arch — a wider, oval-shaped curve popular in contemporary and Art Deco influenced properties</li>
</ul>
<p>At Secure House, we build all arch door profiles — from a traditional semicircular Victorian arch to a sleek modern segmental curve — entirely to your specification, from the dimensions of your opening to the finish on the frame.</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">The Benefits of Arch Doors</h2>
<h3>Transforms Your Property's First Impression</h3>
<p>Few design choices have a greater impact on kerb appeal than an arched front door. The sweeping profile signals craftsmanship and quality before a visitor has even crossed the threshold.</p>

<h3>The Right Choice for Period Properties</h3>
<p>Georgian, Victorian and Edwardian homes were designed around arched proportions. A properly built arch door restores authentic character to a period property — without compromising on modern security, insulation or energy efficiency.</p>

<h3>A Growing Trend in Contemporary Architecture</h3>
<p>The arch has made a strong return in modern residential design. A steel-framed, cleanly detailed arch door brings warmth and sculptural interest to an otherwise contemporary facade.</p>

<h3>Built Precisely to Your Opening</h3>
<p>No two arched openings are identical. Each door is manufactured to the precise dimensions of your specific opening — ensuring a perfect, draught-free, weather-tight fit from day one.</p>

<h3>High Security Built In as Standard</h3>
<p>Every arch door we produce includes our 12-point multi-point locking system, reinforced steel frame and anti-drill security plating. Strong design and genuine security are not a compromise — they come together in every door we build.</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Materials, Profiles & Customisation</h2>
<h3>Steel-Framed Arch Doors</h3>
<p>Our steel-framed arch doors offer outstanding structural strength. With frames of up to 115mm in thickness, they resist forced entry from crowbars, hammers and heavy-duty tools — while maintaining an elegant, refined appearance.</p>

<h3>Glazing Options</h3>
<p>Choose from clear, frosted, toughened, laminated, decorative or stained glass panels. Glazing can be incorporated into the arch head, side panels, or within the door leaf — or combined across all three for a fully glazed entrance. You can even <a href="/doors/stained-glass-doors/">add stained glass to your arch door</a> for a truly unique look.</p>

<h3>Colours and Finishes</h3>
<p>Available across the full RAL colour range, with powder coat, satin and gloss finish options. Timber-effect cladding is also available for properties where a warmer, more traditional look is required — without sacrificing the strength of a steel core.</p>

<h3>Door Hardware</h3>
<p>Hardware is chosen to suit your style — from period-inspired handles and knockers in brass, chrome or antique black, to contemporary lever handles and smart electronic locking systems.</p>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Who Chooses Arch Doors?</h2>
<p>Our arch doors are specified by a wide range of clients across the UK:</p>
<ul>
    <li>Homeowners renovating or restoring a period property who want to match original architectural proportions</li>
    <li>Property developers working on high-end residential schemes who want to differentiate with strong architectural detail</li>
    <li>Architects and designers specifying premium entrance solutions for listed buildings or heritage-sensitive projects</li>
    <li>Commercial clients — hotels, restaurants, private members clubs — seeking an entrance that signals exclusivity</li>
    <li>New-build homeowners who want to introduce warmth and character to a clean, contemporary facade</li>
</ul>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Key Features Of Arch Doors</h2>
<ul>
    <li>Genuine bespoke manufacture — every arch door built to your exact measurements and design preferences</li>
    <li>Over 200 standard designs — or supply your own design prepared by an architect</li>
    <li>12-point multi-point locking system — uncompromising security across all arch door variants</li>
    <li>Reinforced steel frames — from 100mm to 115mm thickness, resistant to crowbars, drills and impact</li>
    <li>Complete thermal insulation — up to 60mm rockwool for outstanding thermal and acoustic performance</li>
    <li>Full range of hardware — handles, knockers, letterboxes and furniture matched to your arch door style</li>
    <li>Available in any RAL colour — powder coated for long-lasting durability in the UK climate</li>
    <li>Fire-rated and bulletproof arch door options available on request</li>
    <li>Hinged or pivot door options engineered for smooth, reliable operation</li>
</ul>

<h2 style="font-family:'Playfair Display'; font-size:40px; margin-top: 50px;">Arch Doors — Frequently Asked Questions</h2>
<div class="accordian fusion-accordian" style="margin-top: 30px;">
    <div class="panel-group fusion-toggle-icon-right fusion-toggle-icon-unboxed">
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq_arch1">What is the difference between an arch door and a standard front door?</a></h4></div>
            <div id="faq_arch1" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>An arch door features a curved or rounded top profile — semicircular, segmental or gothic — rather than the flat header of a standard rectangular door. This gives it a distinctive, architecturally rich appearance suited to both period and contemporary properties.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq_arch2">Can you fit an arch door into an existing rectangular opening?</a></h4></div>
            <div id="faq_arch2" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Yes. In most cases, an arched door frame can be installed into an existing rectangular opening, with the arched head formed within the new frame. Our team will assess your existing opening during a free site visit and advise on the best approach.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq_arch3">Are arch doors secure?</a></h4></div>
            <div id="faq_arch3" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Yes. Every arch door we build at Secure House includes a reinforced steel frame, 12-point multi-point locking, anti-drill manganese plating and toughened glass. All doors meet EN 1627:2011 and PAS 24 security standards. Learn more about <a href="/doors/high-security-doors/">our high-security front doors</a>.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq_arch4">Do arch doors work on modern homes?</a></h4></div>
            <div id="faq_arch4" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Absolutely. While arch doors have a strong heritage association, they are increasingly chosen for contemporary properties where architects and homeowners want to add sculptural warmth and character. We produce arch doors across all profiles to suit any architectural style.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq_arch5">Can I add stained glass to an arch door?</a></h4></div>
            <div id="faq_arch5" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Yes. We offer a full range of glazing options for arch doors, including decorative and stained glass panels — which can be set into the arch head, sidelights or within the door leaf itself.</p></div></div>
        </div>
        <div class="fusion-panel panel-default fusion-toggle-no-divider fusion-toggle-boxed-mode">
            <div class="panel-heading"><h4 class="panel-title toggle"><a aria-expanded="false" data-toggle="collapse" href="#faq_arch6">How long does it take to build and install an arch door?</a></h4></div>
            <div id="faq_arch6" class="panel-collapse collapse"><div class="panel-body toggle-content"><p>Lead times depend on the specification and profile complexity. We will agree a clear, confirmed production and installation timeline with you before any work begins.</p></div></div>
        </div>
    </div>
</div>
<p style="margin-top: 40px;">
    To explore more options, <a href="/doors/bespoke-doors/">view our full range</a> or <a href="/doors/">explore all door styles</a>.
</p>
"""

create_page(
    slug="arch-doors",
    title="Arch Doors | Made to Measure Arched Front Doors UK",
    desc="Custom-built arch doors, manufactured in the UK. Steel-reinforced arched front doors for period and modern properties. Security certified. Free consultation.",
    h1="Arch Doors — Custom Built, UK Manufactured, Security Certified",
    body_html=body_arch,
    image_url="/legacy-assets/uploads/2024/02/Bespoke-arch-doors.jpg" # Another relevant image from the site
)
