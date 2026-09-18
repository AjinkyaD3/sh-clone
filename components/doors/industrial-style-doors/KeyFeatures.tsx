const FEATURES = [
  "Bespoke design, made to measure products",
  "Material thicknesses up to 5 mm",
  "Solid hot rolled steel profiles",
  "Available in RAL colours",
  "FD30 fire resistance",
  "Minimalistic profiles",
];

export default function KeyFeatures() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "16px 32px",
        padding: "48px 40px",
        backgroundColor: "#f5efe9",
      }}
    >
      {FEATURES.map((label) => (
        <div
          key={label}
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: "14px",
            fontWeight: 600,
            color: "#1c1e36",
            textAlign: "center",
            maxWidth: "150px",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
