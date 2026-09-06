import Markdown from 'react-markdown';
import styles from './BlogPostTemplate.module.css';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featuredImage: string;
  body: string;
};

export default function BlogPostTemplate({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={styles.wrapper}>
      <p className={styles.dateAuthor}>
        {formattedDate} — {post.author}
      </p>
      <h1 className={styles.title}>{post.title}</h1>
      {post.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.featuredImage}
          alt={post.title}
          className={styles.featuredImage}
        />
      )}
      <div className={styles.body}>
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  );
}
