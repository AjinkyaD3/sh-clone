import Link from "next/link";

export default function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontSize: "14px",
        color: "#847b73",
        padding: "24px 40px 0",
      }}
    >
      <Link href="/">Home</Link>
      {` » `}
      <Link href="/doors/">Doors</Link>
      {` » `}
      <span aria-current="page">Industrial style doors</span>
    </nav>
  );
}
