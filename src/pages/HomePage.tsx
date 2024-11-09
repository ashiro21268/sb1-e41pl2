import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import SocialAnalytics from '../components/SocialAnalytics';
import Pricing from '../components/Pricing';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <SocialAnalytics />
      <Pricing />
    </div>
  );
}