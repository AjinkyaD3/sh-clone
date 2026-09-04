const fs = require('fs');
const path = require('path');

const headerPath = 'c:/Users/AJINKYA/OneDrive/Desktop/SH NEXT JS/secure-house-nextjs/components/Header.tsx';
let headerCode = fs.readFileSync(headerPath, 'utf-8');

// Extract the raw HTML string from dangerouslySetInnerHTML
const startIdx = headerCode.indexOf('`');
const endIdx = headerCode.lastIndexOf('`');
const rawHtml = headerCode.substring(startIdx, endIdx + 1);

const newHeaderComponent = `"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The "PRODUCTS" button trigger
    const triggerBtn = document.querySelector('a[href="#awb-oc__1349"]');
    
    const handleTriggerClick = (e: Event) => {
      e.preventDefault();
      setMenuOpen(prev => !prev);
    };

    if (triggerBtn) {
      triggerBtn.addEventListener('click', handleTriggerClick);
    }

    // Handle clicks inside and outside the menu
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // If clicking the trigger button itself, let the trigger handler deal with it
      if (triggerBtn && triggerBtn.contains(target)) return;
      
      const mobileNav = document.querySelector('nav.awb-menu_mobile-toggle');
      if (menuOpen && mobileNav) {
        // Close if clicking outside
        if (!mobileNav.contains(target)) {
          setMenuOpen(false);
        }
        // Close if clicking a link inside the menu
        else if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleGlobalClick);

    return () => {
      if (triggerBtn) triggerBtn.removeEventListener('click', handleTriggerClick);
      document.removeEventListener('mousedown', handleGlobalClick);
    };
  }, [menuOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: \`
        /* When menuOpen is true, force the mobile menu and its parents to be visible */
        .mobile-menu-active .fusion-no-medium-visibility,
        .mobile-menu-active .fusion-no-large-visibility {
          display: block !important;
        }
        
        /* The off-canvas panel overlay effect */
        .mobile-menu-active nav.awb-menu_mobile-toggle {
          display: block !important;
          position: fixed !important;
          top: 0;
          right: 0;
          bottom: 0;
          width: 350px;
          max-width: 100vw;
          z-index: 999999 !important;
          background-color: #1a1a1a;
          overflow-y: auto;
          box-shadow: -5px 0 25px rgba(0,0,0,0.5);
          padding: 20px;
          animation: slideIn 0.3s ease-out forwards;
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        /* Make links visible in the dark panel */
        .mobile-menu-active nav.awb-menu_mobile-toggle a {
          color: #fff !important;
          padding: 15px 0;
          display: block;
          border-bottom: 1px solid #333;
          text-decoration: none;
        }
        
        .mobile-menu-active nav.awb-menu_mobile-toggle a:hover {
          color: #f7931e !important;
        }
        
        /* Hide the regular toggle button since we use the Products button */
        .mobile-menu-active .awb-menu__toggle-button {
          display: none !important;
        }
      \` }} />
      
      {/* Background overlay when menu is open */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 999998,
            cursor: 'pointer'
          }} 
          onClick={() => setMenuOpen(false)}
        >
          {/* Visual Close Button on the overlay next to the panel */}
          <div style={{ position: 'absolute', top: '20px', right: '370px', color: '#fff', fontSize: '30px', fontWeight: 'bold' }}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      )}

      <div 
        ref={headerRef}
        className={menuOpen ? "mobile-menu-active" : ""}
        dangerouslySetInnerHTML={{ __html: ${rawHtml} }} 
      />
    </>
  );
}
`;

fs.writeFileSync(headerPath, newHeaderComponent);
console.log("Updated components/Header.tsx with interactivity!");
