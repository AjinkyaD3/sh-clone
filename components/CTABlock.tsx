import Link from 'next/link';

interface CTABlockProps {
  heading: string;
  text: string;
  buttonLabel: string;
}

export default function CTABlock({ heading, text, buttonLabel }: CTABlockProps) {
  return (
    <div style={{
      backgroundColor: '#f8f8f8',
      padding: '40px 20px',
      textAlign: 'center',
      borderTop: '2px solid #eaeaea',
      margin: '40px 0',
      fontFamily: "'Montserrat', sans-serif"
    }}>
      <h2 style={{
        fontSize: '28px',
        fontWeight: '600',
        color: '#222',
        marginBottom: '15px'
      }}>
        {heading}
      </h2>
      <p style={{
        fontSize: '16px',
        color: '#555',
        marginBottom: '25px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: '1.6'
      }}>
        {text}
      </p>
      <Link href="/contact-us" style={{
        display: 'inline-block',
        backgroundColor: '#e3000f', // Secure House red
        color: '#fff',
        padding: '12px 30px',
        fontSize: '16px',
        fontWeight: '600',
        textDecoration: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s ease'
      }}>
        {buttonLabel}
      </Link>
    </div>
  );
}
