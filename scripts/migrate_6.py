import os
import shutil

app_dir = r'c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\app'
backup_dir = r'c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\securehouse-backup main backup\secure-house.co.uk'
urls_file = r'c:\Users\AJINKYA\OneDrive\Desktop\SH NEXT JS\secure-house-nextjs\all_urls.md'

pages = [
    'how-to-choose-fire-doors-for-high-risk-areas',
    'inspiration/test',
    'security-garage-doors-for-maximum-home-protection',
    'side-hinged-garage-doors-types-maintainace-advantages',
    'simply-stunning-and-totally-secure-inside-and-out',
    'strategies-for-effective-fire-door-management-in-uk-schools'
]

template = """import fs from 'fs';
import path from 'path';

export default function Page() {
  const filePath = path.join(process.cwd(), 'app', {path_args}, 'content.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return <div className="wp-singular page-template page-template-100-width page-template-100-width-php page page-id-9 wp-theme-Avada edd-js-none fusion-image-hovers fusion-pagination-sizing fusion-button_type-flat fusion-button_span-yes fusion-button_gradient-linear avada-image-rollover-circle-no avada-image-rollover-yes avada-image-rollover-direction-fade fusion-body ltr no-tablet-sticky-header no-mobile-sticky-header no-mobile-slidingbar fusion-disable-outline fusion-sub-menu-fade mobile-logo-pos-left layout-wide-mode avada-has-boxed-modal-shadow-none layout-scroll-offset-full avada-has-zero-margin-offset-top fusion-top-header menu-text-align-center mobile-menu-design-modern fusion-show-pagination-text fusion-header-layout-v6 avada-responsive avada-footer-fx-none avada-menu-highlight-style-bar fusion-search-form-classic fusion-main-menu-search-dropdown fusion-avatar-square avada-sticky-shrinkage avada-blog-layout-large avada-blog-archive-layout-large avada-header-shadow-no avada-menu-icon-position-left avada-has-mainmenu-dropdown-divider avada-has-header-100-width avada-has-mobile-menu-search avada-has-main-nav-search-icon avada-has-100-footer avada-has-titlebar-hide avada-header-border-color-full-transparent avada-social-full-transparent avada-has-pagination-padding avada-flyout-menu-direction-fade avada-ec-views-v1 awb-link-decoration" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
"""

for page in pages:
    parts = page.split('/')
    path_args = ', '.join([f"'{p}'" for p in parts])
    content = template.replace('{path_args}', path_args)
    
    # ensure dir exists
    dest_dir = os.path.join(app_dir, *parts)
    os.makedirs(dest_dir, exist_ok=True)
    
    # write page.tsx
    with open(os.path.join(dest_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(content)
        
    # copy content.html
    src_html = os.path.join(backup_dir, *parts, 'index.html')
    if os.path.exists(src_html):
        shutil.copy2(src_html, os.path.join(dest_dir, 'content.html'))
        print(f'Migrated {page}')

# update all_urls.md
with open(urls_file, 'a', encoding='utf-8') as f:
    for page in pages:
        f.write(f'\n- https://secure-house-next-js.vercel.app/{page}\n')

print('Migration complete!')
