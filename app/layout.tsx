import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure House",
  description: "Bespoke Security Doors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
