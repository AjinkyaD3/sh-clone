const ROWS: { label: string; crittall: string; industrial: string }[] = [
  {
    label: "Material",
    crittall:
      "Primarily made of hot rolled steel sections. Known for their durability and robustness, ensuring longevity of the product.",
    industrial:
      "Varies widely based on design preferences. Common materials include galvanized or hot rolled steel sections, aluminum, wood, or a combination of components.",
  },
  {
    label: "Design",
    crittall:
      "Characterized by a slender frame profile and large glazing panels, offering a minimalist aesthetic with a grid-like pattern from multiple panes of glass.",
    industrial:
      "Features an unfinished, raw design inspired by factories and warehouses. Exposed hardware and broader frames are common, often mixing materials for a rustic or vintage look.",
  },
  {
    label: "Origin",
    crittall:
      "Named after the British company “Crittall” which pioneered this style in the early 20th century, initially used for strength in industrial buildings.",
    industrial:
      "Originated from the need for functional, durable doors in industrial settings such as factories and warehouses, later appreciated for its aesthetic value.",
  },
  {
    label: "Transparency",
    crittall:
      "Large glass panels provide high levels of transparency, ensuring maximum natural light and enhancing the feel of indoor-outdoor living.",
    industrial:
      "Can offer moderate to high levels of transparency depending on the design - some focus more on metal or wood, others use larger glass panels similar to Crittall style.",
  },
  {
    label: "Installation",
    crittall:
      "Requires specialized installation due to the thin frames, precision needed for the glass panels, and weight of the steel.",
    industrial:
      "Requires specialized installation due to the thin frames, precision needed for the glass panels, and weight of the steel.",
  },
  {
    label: "Cost",
    crittall:
      "Due to the specialized design, materials, and installation process, they tend to be on the higher end of the cost spectrum, offering long-term value.",
    industrial:
      "Can range based on materials and design complexity - simpler designs are more cost-effective, though high-end custom industrial doors can command premium prices.",
  },
];

export default function ComparisonTable() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "56px 40px" }}>
      <h2
        style={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 500,
          fontSize: "32px",
          color: "#1c1e36",
          textAlign: "center",
          margin: "0 0 12px",
        }}
      >
        Crittall style doors vs. industrial style doors
      </h2>
      <p
        style={{
          fontFamily: '"Montserrat", sans-serif',
          fontSize: "16px",
          color: "#635548",
          textAlign: "center",
          margin: "0 0 40px",
        }}
      >
        What are the key differences?
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {ROWS.map((row) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr 1fr",
              gap: "24px",
              padding: "20px 0",
              borderBottom: "1px solid #e7e6e6",
            }}
            className="industrial-comparison-row"
          >
            <div
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                fontSize: "14px",
                textTransform: "uppercase",
                color: "#1c1e36",
              }}
            >
              {row.label}
            </div>
            <div style={{ fontSize: "14px", lineHeight: 1.6, color: "#3a3a3a" }}>
              <strong style={{ display: "block", marginBottom: "4px" }}>
                Crittall style
              </strong>
              {row.crittall}
            </div>
            <div style={{ fontSize: "14px", lineHeight: 1.6, color: "#3a3a3a" }}>
              <strong style={{ display: "block", marginBottom: "4px" }}>
                Industrial style
              </strong>
              {row.industrial}
            </div>
          </div>
        ))}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 640px) {
              .industrial-comparison-row {
                grid-template-columns: 1fr !important;
                gap: 8px !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}
