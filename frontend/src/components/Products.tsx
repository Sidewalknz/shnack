'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './Products.module.css';
import catalog from '../data/data.json';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  nutrition?: unknown;
  ingredients?: string[];
};

export default function Products() {
  const flavours = (catalog as Product[]).filter(p => p.id !== 'multipack');

  // Reveal on first intersection
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);   // one-shot
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Which Shnack are you grabbing?</h2>

        <ul className={styles.grid}>
          {flavours.map((p, i) => (
            <li
              key={p.id}
              className={`${styles.card} ${inView ? styles.in : ''}`}
              style={
                {
                  '--float-delay': `${i * 0.3}s`,
                  '--tilt': `${i === 1 ? 0 : i === 0 ? -6 : 6}deg`,
                  '--reveal-delay': `${i * 120}ms`,
                } as React.CSSProperties
              }
            >
              <div className={styles.imageWrap}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 900px) 40vw, 25vw"
                  className={styles.image}
                  priority={i === 1}
                />
              </div>
              <span className={styles.label}>{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
