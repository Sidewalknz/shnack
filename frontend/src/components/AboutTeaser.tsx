import Link from "next/link";
import styles from "./AboutTeaser.module.css";

export default function AboutTeaser() {
  return (
    <section className={styles.section} aria-labelledby="about-teaser-title">
      <div className={styles.inner}>
        <p className={styles.kicker}>
          Created for People Like Us — Busy, Active, and Always On the Go.
        </p>

        <h2 id="about-teaser-title" className={styles.title}>
          Why go Shnack?
        </h2>

        <ul className={styles.features}>
          <li className={styles.feature}>
            <h3>Plant-Powered Punch</h3>
            <p>
              17g of quality plant protein in every can, crafted from carefully
              selected sources to keep you fuelled.
            </p>
          </li>

          <li className={styles.feature}>
            <h3>Kiwi Crafted</h3>
            <p>
              Proudly made in New&nbsp;Zealand with a clean, green mindset and
              zero compromise on quality.
            </p>
          </li>

          <li className={styles.feature}>
            <h3>Simply Delicious</h3>
            <p>
              Simple ingredients, epic taste. Naturally sweetened with monk
              fruit for low-sugar, dairy-free goodness.
            </p>
          </li>
        </ul>

        <div className={styles.story}>
          <h3>About us</h3>
          <p>
            We’re Kelsi and Andrew — a husband-and-wife team who turned a
            personal need into a small, family-run business in New&nbsp;Zealand.
            From building a 500k+ wellness community (@healthykelsii) and
            launching Second&nbsp;Nature, we created Shnack to make healthy
            living easy, convenient, and genuinely delicious.
          </p>

          <h3>Our promise</h3>
          <p>
            Real ingredients and real transparency. 17g protein, dairy-free,
            low-sugar, creamy flavours, and sustainability-conscious packaging —
            ready to grab-and-go for your active life.
          </p>

          <Link href="/about" className={styles.cta} aria-label="Read our story">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
