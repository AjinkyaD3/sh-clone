'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';

type Slide = {
  heading: string;
  buttonLabel: string;
  buttonHref: string;
  video?: string;
  poster?: string;
  image?: string;
};

const slides: Slide[] = [
  {
    heading: '10 Years of Crafting Luxury\nSecurity Doors with Seamless Service',
    buttonLabel: 'Learn more about us',
    buttonHref: '/about-us/',
    video: '/legacy-assets/uploads/2024/11/Hero-_-secure-house-1-2.mp4',
    poster: '/legacy-assets/uploads/2024/11/hero-video-poster.webp',
  },
  {
    heading: 'Bespoke Security Doors with\nPremium Craftsmanship & Advanced Security.',
    buttonLabel: 'Discover entrance solutions',
    buttonHref: '/products/',
    image: '/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/11/Group-276-scaled.webp',
  },
  {
    heading: 'Premium Security Doors\nAcross London & the UK.',
    buttonLabel: 'Contact us',
    buttonHref: '/contact-us/',
    image: '/legacy-assets/uploads/al_opt_content/IMAGE/secure-house.co.uk/wp-content/uploads/2024/10/Group-175-scaled.webp',
  },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.slider}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
        >
          {slide.video ? (
            <video
              className={styles.media}
              src={slide.video}
              poster={slide.poster}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img className={styles.media} src={slide.image} alt="" />
          )}
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className={styles.heading}>
              {slide.heading.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < slide.heading.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <Link href={slide.buttonHref} className={styles.button}>
              {slide.buttonLabel}
            </Link>
          </div>
        </div>
      ))}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
