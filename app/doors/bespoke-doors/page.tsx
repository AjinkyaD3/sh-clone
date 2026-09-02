import fs from 'fs';
import path from 'path';
import CTABlock from '@/components/CTABlock';

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
