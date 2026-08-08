import React from 'react';

export default function LegacyPageWrapper({ html }: { html: string }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
