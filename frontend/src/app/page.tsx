import Hero from '@/components/Hero';
import CanHero from '@/components/CanHero';

export default function Home() {
  return (
    <main>
      <Hero
        title="Shnack"
        subtitle="But first... a Shnack!"
        primary={{ href: '/about', label: 'Discover' }}
        secondary={{ href: '/shop', label: 'Shop' }}
        right={<CanHero />}
      />
      {/* More sections can go here */}
    </main>
  );
}
