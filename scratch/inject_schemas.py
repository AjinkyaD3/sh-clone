import os
import json
import re

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

schemas = {
    "full-house-package": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/full-house-package"},
      "headline": "Full House Security & Design Package from Secure House",
      "description": "Keep your home safe without compromising on style. With Secure House's Full House Package, you get top-notch security and stunning design — all in one.",
      "image": "",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "arched-doors": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/arched-doors"},
      "headline": "Elegant Arched Doors | Premium Custom Arched Door Designs",
      "description": "Explore elegant arched doors. Our bespoke arched door designs combine beauty and strength, perfect for enhancing homes with timeless style and charm.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "what-is-the-best-material-for-industrial-fire-doors": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/what-is-the-best-material-for-industrial-fire-doors"},
      "headline": "Best Material for Front Doors | Durable & Stylish Choices",
      "description": "Discover the best material for front doors to combine style and strength. Compare timber, steel, and composite doors to choose the perfect fit for your home.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "time-to-get-bullet-proof-with-secure-house": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/time-to-get-bullet-proof-with-secure-house"},
      "headline": "Bullet Proof Doors and Windows by Secure House",
      "description": "Get bullet proof protection with Secure House's tested doors and windows offering ultimate safety, style, and world-class ballistic security.",
      "image": "",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "inspiration/controlled-drug-license-door-requirements": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/inspiration/controlled-drug-license-door-requirements"},
      "headline": "Secure Your Premises: Controlled Drug License Door Solutions",
      "description": "Ensure compliance with Home Office regulations using LPS 1175 SR4-rated doors. Secure House offers tailored solutions for controlled drug licensed premises.",
      "image": "",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "curved-glass-doors-modern-elegance-for-stylish-entrances": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/curved-glass-doors-modern-elegance-for-stylish-entrances"},
      "headline": "Curved Glass Doors | Elegant & Modern Architectural Designs",
      "description": "Enhance your space with sleek curved glass doors. Perfect for modern homes, they offer panoramic views and seamless integration with your architecture.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "deflecting-the-elements-how-rain-deflectors-shield-your-home": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/deflecting-the-elements-how-rain-deflectors-shield-your-home"},
      "headline": "Rain Deflectors Shield | Protect Your Home from Water Damage",
      "description": "Install rain deflectors to prevent water ingress and protect your home's foundation. Reduce maintenance and safeguard your property with effective solutions.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "enhancing-home-security-the-importance-of-door-barricades": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/enhancing-home-security-the-importance-of-door-barricades"},
      "headline": "Door Barricade | Strengthen Home Security",
      "description": "Strengthen your home's defenses with durable door barricades. Easy to install, they provide an additional layer of protection against unauthorized entry.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    },
    "choosing-eco-friendly-door-materials": {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {"@type": "WebPage", "@id": "https://secure-house-next-js.vercel.app/choosing-eco-friendly-door-materials"},
      "headline": "Eco-Friendly Door Materials | Sustainable & Stylish Choices",
      "description": "Opt for eco-friendly door materials that combine sustainability with style. Durable and energy-efficient options to reduce your carbon footprint.",
      "image": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk",
      "author": {"@type": "Organization", "name": ""},
      "publisher": {"@type": "Organization", "name": "Secure House", "logo": {"@type": "ImageObject", "url": "https://secure-house.co.uk/wp-content/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-84-1-200x83.png.bv.webp?bv_host=secure-house.co.uk"}},
      "datePublished": "2025-10-14",
      "dateModified": "2025-10-15"
    }
}

for route, schema_obj in schemas.items():
    page_file = os.path.join(app_root, route, "page.tsx")
    if not os.path.exists(page_file):
        print(f"File not found: {page_file}")
        continue
        
    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check if we already injected schema
    if 'application/ld+json' in content:
        print(f"Schema already in {route}")
        continue
        
    schema_str = json.dumps(schema_obj, separators=(',', ':'))
    
    # We will use regex to find the entire return statement
    # `return <div ... />;\n}` or `return (\n  <>\n  <div ... />\n  </>\n);\n}`
    
    # Find `return <div ... dangerouslySetInnerHTML={{ __html: html }} />;`
    match = re.search(r'(return\s+)(<div[^>]*?dangerouslySetInnerHTML=\{\{\s*__html:\s*html\s*\}\}\s*/>);', content)
    
    if match:
        original_return = match.group(2)
        new_return = f"""return (
    <>
      {original_return}
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({schema_str}) }}}} />
    </>
  );"""
        content = content[:match.start()] + new_return + content[match.end():]
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Injected schema for {route}")
    else:
        # Check if it's already using parens or <>
        match2 = re.search(r'(return\s*\(\s*<>\s*<div[^>]*?dangerouslySetInnerHTML=\{\{\s*__html:\s*html\s*\}\}\s*/>)(.*?</>\s*\);)', content, flags=re.DOTALL)
        if match2:
            new_return = f"""{match2.group(1)}
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({schema_str}) }}}} />{match2.group(2)}"""
            content = content[:match2.start()] + new_return + content[match2.end():]
            with open(page_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Injected schema for {route} (already wrapped)")
        else:
            print(f"Could not parse return statement in {route}")
