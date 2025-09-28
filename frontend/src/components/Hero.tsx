import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>But first... a Shnack!</h1>
        <h2>YOUR NEW FAVOURITE READY TO DRINK PROTEIN SHAKE!</h2>
        <button className={styles.cta}>Shop Now</button>
      </div>

      <div className={styles.imageWrapper} aria-hidden="true">
        <Image
          src="/images/shnack-hero.webp"
          alt=""
          fill
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}
