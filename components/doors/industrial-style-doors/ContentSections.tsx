const sectionHeading: React.CSSProperties = {
  fontFamily: '"Playfair Display", serif',
  fontWeight: 500,
  fontSize: "32px",
  color: "#1c1e36",
  margin: "0 0 20px",
};

const paragraph: React.CSSProperties = {
  fontFamily: '"Montserrat", sans-serif',
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#3a3a3a",
  margin: "0 0 16px",
};

const section: React.CSSProperties = {
  maxWidth: "820px",
  margin: "0 auto",
  padding: "56px 40px",
};

export default function ContentSections() {
  return (
    <>
      <div style={section}>
        <h2 style={sectionHeading}>Design</h2>
        <p style={paragraph}>
          Window and door elements made from glazed slim steel or bronze
          profiles are ideal not only for renovated historical buildings,
          but also for top-of-the-line residential and commercial
          buildings. These timeless windows and doors are sure to make any
          residence stand out. Due to the unparalleled structural strength
          of these steel frames, they are also an excellent choice for
          modern buildings with tall and wide windows.
        </p>
        <p style={paragraph}>
          Steel is an excellent choice for manufacturing fire doors due to
          its reliable performance under fire conditions. When combined
          with suitable fire-resistant glass, it forms an effective
          defense against both fire and smoke.
        </p>
        <p style={paragraph}>
          A sturdy, yet seamless frame - each of the doors offered in our
          range not only feature bespoke door frames but also seamless
          integration which does not compromise it in terms of look. Our
          top of the line options offer up to 115 mm of steel door frame
          profile with reinforced lines and locks. Reinforced hinges with
          added protection - we understand that even a seemingly small
          part of an internal door solution such as a door hinge has to be
          beefed up in order to offer the maximum amount of security. Our
          hinges are made from reinforced steel materials and are
          adjustable in height, and are easily customizable.
        </p>
        <p style={paragraph}>
          Typified by a very slim profile frame that forms a grid-like
          finish for doors, windows and room dividers, our steel fire
          proof products will not only open up a space but totally
          transform it into something completely contemporary with
          bundles of natural light. They&apos;re ideal for use across a wide
          variety of buildings too, from refurbishments and new build
          homes to listed buildings and properties located in conservation
          areas. Large, open plan rooms can be skillfully partitioned to
          delineate specific areas and highlight a room&apos;s full potential.
        </p>
      </div>

      <div style={{ ...section, backgroundColor: "#f5efe9" }}>
        <h2 style={sectionHeading}>Crittall style doors - elegance and heritage</h2>
        <p style={paragraph}>
          Crittall style doors owe their name to the British company
          &quot;Crittall,&quot; which pioneered this design in the early 20th
          century. Primarily crafted from hot rolled steel sections, these
          heritage bifold doors and hinged doors are renowned for their
          remarkable durability and robustness.
        </p>
        <p style={paragraph}>
          In modern adaptations, some designers have been employing steel
          look aluminium doors, including aluminium french doors, as a nod
          to the traditional Crittall aesthetic but with the lightweight
          benefits of aluminium frames. A defining feature of the Crittall
          style is its slender frame profile paired with vast glazing
          panels, offering a minimalist aesthetic while ensuring spaces
          benefit from maximum natural light.
        </p>
      </div>

      <div style={section}>
        <h2 style={sectionHeading}>Industrial style doors - ruggedness and versatility</h2>
        <p style={paragraph}>
          Industrial style doors, also known as a heritage style door,
          draw inspiration from the raw, functional designs found in
          factories and warehouses. Their origin lies in the necessity for
          durable sliding doors in these heavy-duty environments.
        </p>
        <p style={paragraph}>
          Over time, the rugged charm of these doors, including steel and
          aluminium french doors, transcended their utilitarian
          beginnings, finding a place in commercial and even residential
          settings, as both internal and external doors. Industrial doors
          boast a diverse range of materials, from galvanized steel to
          aluminium and wood.
        </p>
        <p style={paragraph}>
          Some of the popular choices in contemporary settings include
          steel or aluminium steel look doors which combine the ruggedness
          of steel designs with the lightweight and corrosion-resistant
          benefits of aluminium frames. Designs might be bifold, hinged,
          or double doors, with transparency levels ranging from mostly
          metal or wooden structures to larger integrated glass panels.
        </p>
      </div>

      <div style={{ ...section, backgroundColor: "#1c1e36" }}>
        <h2 style={{ ...sectionHeading, color: "#ffffff" }}>
          Why fire rating is so important for a set of internal doors
        </h2>
        <p style={{ ...paragraph, color: "#dcd7ca" }}>
          At Secure House, we ensure that every single one of our window
          and door solutions is designed with careful attention to detail,
          ensuring correct fire protection for a fire door. In the case of
          an accident, your set of doors or windows will be your main
          means of preventing the spread of fire to neighbouring rooms or
          the inside of the building, which can happen in minutes if not
          seconds, and can also act as a possible escape route.
        </p>
        <p style={{ ...paragraph, color: "#dcd7ca", marginBottom: 0 }}>
          Our windows and doors feature a reinforced steel frame with
          additional components such as cladding, seals and glazing, all
          aimed at providing the best possible level of protection. This
          lineup can be made to be FD30 fire regulations compliant.
        </p>
      </div>
    </>
  );
}
