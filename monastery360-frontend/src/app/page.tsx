import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Navigation />
      <Hero />
      <Features />
    </div>
  );
}
