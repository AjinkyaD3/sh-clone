import Link from 'next/link';
import type { Metadata } from 'next';
import posts from '@/data/blog-posts.json';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog - Secure House',
  description: 'Blog',
  alternates: {
    canonical: 'https://secure-house-next-js.vercel.app/blog',
  },
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Blog</h1>
      <ul className={styles.grid}>
        {sorted.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className={styles.card}
                style={{ backgroundImage: `url('${post.featuredImage}')` }}
              >
                <div>
                  <div className={styles.cardCategory}>Blog</div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{post.excerpt}</p>
                  <p className={styles.cardDate}>{formattedDate}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
