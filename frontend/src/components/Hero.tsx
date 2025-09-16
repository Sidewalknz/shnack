import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero({
  title = 'Shnack',
  subtitle = 'But first... a Shnack!',
  primary = { href: '/about', label: 'Discover' },
  secondary = { href: '/shop', label: 'Shop' },
  right,
}: {
  title?: string;
  subtitle?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  right?: React.ReactNode; // e.g. <CanHero />
}) {
  return (
    <section className={styles.hero} aria-label="Shnack hero">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.btnRow}>
            <Link href={primary.href} className={`${styles.btn} ${styles.primary}`}>
              {primary.label}
            </Link>
            <Link href={secondary.href} className={`${styles.btn} ${styles.secondary}`}>
              {secondary.label}
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          {right}
        </div>
      </div>
    </section>
  );
}
