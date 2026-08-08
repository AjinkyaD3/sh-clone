import React from 'react';

export default function LegacyPageWrapper({ html, bodyClass }: { html: string, bodyClass?: string }) {
  return (
    <div className={bodyClass} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
