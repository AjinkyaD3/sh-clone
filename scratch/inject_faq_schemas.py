import os
import json
import re

app_root = r"c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app"

schemas = {
    "curved-glass-doors-modern-elegance-for-stylish-entrances": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question", "name": "How much do curved glass doors cost in the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Curved glass doors are a premium, made-to-measure product and pricing depends on size, radius, glazing specification and security features required. At Secure House, we provide a free, no-obligation quote tailored to your exact requirements. Contact us for a personalised consultation."}},
        {"@type": "Question", "name": "Are curved glass doors secure?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. All our curved glass doors are built with reinforced steel frames, 12-point multi-point locking and toughened safety glass as standard. Our doors are certified to EN 1627:2011 and PAS 24 — the same security standards across our full door range."}},
        {"@type": "Question", "name": "Can curved glass doors be used as front doors?", "acceptedAnswer": {"@type": "Answer", "text": "Absolutely. A curved glass front door makes a stunning and highly secure entrance for residential and commercial properties alike. Each door is manufactured to your specific opening dimensions and radius."}},
        {"@type": "Question", "name": "How long does it take to manufacture and install a curved glass door?", "acceptedAnswer": {"@type": "Answer", "text": "Lead times vary depending on specification and complexity. We will confirm a clear, agreed timeline during your consultation before any work begins."}},
        {"@type": "Question", "name": "Do curved glass doors offer good insulation?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Our doors feature thermally broken frames and double glazing as standard, with triple-glazed options available — delivering excellent thermal and acoustic performance alongside their striking appearance."}},
        {"@type": "Question", "name": "Can you fit a curved glass door to an existing opening?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Our team carries out a full site survey before manufacture to ensure your door is built to the precise dimensions of your existing opening for a perfect, weather-tight fit."}}
      ]
    },
    "doors/stained-glass-doors": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question", "name": "What is the difference between stained glass and leaded glass?", "acceptedAnswer": {"@type": "Answer", "text": "Leaded glass refers to the method of joining glass pieces using lead caming (strips of lead). Stained glass is coloured glass, which is usually also leaded. For traditional UK front doors, the two terms are commonly used to mean the same thing."}},
        {"@type": "Question", "name": "Are stain glass doors (also called stained glass doors) secure?", "acceptedAnswer": {"@type": "Answer", "text": "Yes — when built correctly. At Secure House, all our stained glass doors include reinforced steel frames, 12-point multi-point locking and toughened or laminated safety glass. They are certified to EN 1627:2011 and PAS 24. Decorative glass panels do not reduce the security of the door when the door is engineered to the right standard."}},
        {"@type": "Question", "name": "Can you replace a damaged stained glass panel?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. If your existing stained glass door has a cracked, broken or missing panel, we can restore or replace it — recreating the original design as closely as possible from photographs or surviving sections."}},
        {"@type": "Question", "name": "Can I have panels designed to match my existing windows?", "acceptedAnswer": {"@type": "Answer", "text": "Absolutely. We regularly produce stained glass panels that complement or continue existing glazing in fanlights, sidelights or internal windows within a property."}},
        {"@type": "Question", "name": "Can stained glass be added to other door styles?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Stained glass panels can be incorporated into arch doors, standard front doors and other styles across our range. Discuss your requirements with our team and we will advise on the best configuration for your property."}},
        {"@type": "Question", "name": "Are stained glass doors energy efficient?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Our stained glass panels are set within double-glazed units with thermally broken frames — providing good energy performance alongside their decorative appeal. Triple glazing is available for properties with higher thermal requirements."}},
        {"@type": "Question", "name": "Can you fit a curved glass door to an existing opening?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Our team carries out a full site survey before manufacture to ensure your door is built to the precise dimensions of your existing opening for a perfect, weather-tight fit."}},
        {"@type": "Question", "name": "How long does it take to design and build a stained glass door?", "acceptedAnswer": {"@type": "Answer", "text": "Lead times vary depending on design complexity and current production schedule. We will give you a clear, confirmed timeline during your free consultation before any commitment is made."}}
      ]
    },
    "arched-doors": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question", "name": "What is the difference between an arch door and a standard front door?", "acceptedAnswer": {"@type": "Answer", "text": "An arch door features a curved or rounded top profile — semicircular, segmental or gothic — rather than the flat header of a standard rectangular door. This gives it a distinctive, architecturally rich appearance suited to both period and contemporary properties."}},
        {"@type": "Question", "name": "Can you fit an arch door into an existing rectangular opening?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. In most cases, an arched door frame can be installed into an existing rectangular opening, with the arched head formed within the new frame. Our team will assess your existing opening during a free site visit and advise on the best approach."}},
        {"@type": "Question", "name": "Are arch doors secure?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Every arch door we build at Secure House includes a reinforced steel frame, 12-point multi-point locking, anti-drill manganese plating and toughened glass. All doors meet EN 1627:2011 and PAS 24 security standards."}},
        {"@type": "Question", "name": "Do arch doors work on modern homes?", "acceptedAnswer": {"@type": "Answer", "text": "Absolutely. While arch doors have a strong heritage association, they are increasingly chosen for contemporary properties where architects and homeowners want to add sculptural warmth and character. We produce arch doors across all profiles to suit any architectural style."}},
        {"@type": "Question", "name": "How long does it take to build and install an arch door?", "acceptedAnswer": {"@type": "Answer", "text": "Lead times depend on the specification and profile complexity. We will agree a clear, confirmed production and installation timeline with you before any work begins."}},
        {"@type": "Question", "name": "Can you fit a curved glass door to an existing opening?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Our team carries out a full site survey before manufacture to ensure your door is built to the precise dimensions of your existing opening for a perfect, weather-tight fit."}}
      ]
    }
}

for route, schema_obj in schemas.items():
    page_file = os.path.join(app_root, route, "page.tsx")
    if not os.path.exists(page_file):
        print(f"File not found: {page_file}")
        continue
        
    with open(page_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check if FAQPage already injected
    if 'FAQPage' in content:
        print(f"FAQPage Schema already in {route}")
        continue
        
    schema_str = json.dumps(schema_obj, separators=(',', ':'))
    script_tag = f'<script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({schema_str}) }}}} />'
    
    # Cases:
    # 1. Already wrapped in <>...</> (from previous injection)
    # Match everything up to the final `</>` before `);`
    match_wrapped = re.search(r'(return\s*\(\s*<>)(.*?</>\s*\);)', content, flags=re.DOTALL)
    
    # 2. Not wrapped yet (like doors/stained-glass-doors)
    # Match `return <div ... />;`
    match_unwrapped = re.search(r'(return\s+)(<div[^>]*?dangerouslySetInnerHTML=\{\{\s*__html:\s*html\s*\}\}\s*/>);', content)

    if match_wrapped:
        # Just append before the closing `</>`
        # Find the last `</>` inside match_wrapped.group(2)
        inner = match_wrapped.group(2)
        last_tag_idx = inner.rfind("</>")
        if last_tag_idx != -1:
            new_inner = inner[:last_tag_idx] + "\n      " + script_tag + "\n    " + inner[last_tag_idx:]
            content = content[:match_wrapped.end(1)] + new_inner + content[match_wrapped.end():]
            with open(page_file, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Injected FAQ schema into wrapped {route}")
        else:
            print(f"Failed to find closing tag in {route}")
            
    elif match_unwrapped:
        original_div = match_unwrapped.group(2)
        new_return = f"""return (
    <>
      {original_div}
      {script_tag}
    </>
  );"""
        content = content[:match_unwrapped.start()] + new_return + content[match_unwrapped.end():]
        with open(page_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Injected FAQ schema into unwrapped {route}")
        
    else:
        print(f"Could not parse return statement in {route}")
