import fs from 'fs';
import path from 'path';
import CTABlock from '@/components/CTABlock';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bespoke Doors | Premium Bespoke Door Manufacturers UK',
  description: 'Explore high-quality bespoke doors by leading UK manufacturers. Custom designs, secure materials & expert craftsmanship – made just for you. Contact us today!',
  alternates: {
    canonical: 'https://secure-house-next-js.vercel.app/doors/bespoke-doors',
  },
};

export default function Page() {
  const filePath = path.join(process.cwd(), 'app', 'doors/bespoke-doors', 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return (
    <div className="{body_class}" suppressHydrationWarning>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <CTABlock 
        heading="Your Door, Designed Your Way"
        text="Create a made-to-measure door that matches your property's style, dimensions, and functional requirements."
        buttonLabel="Start Your Bespoke Design"
      />
    </div>
  );
}
