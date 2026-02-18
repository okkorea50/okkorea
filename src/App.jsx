import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
import FeatureSection from './components/FeatureSection';
import PersonaSelector from './components/PersonaSelector';
import BentoGrid from './components/BentoGrid';
import TestimonialGrid from './components/TestimonialGrid';
import BlogResources from './components/BlogResources';
import Footer from './components/Footer';

const App = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const darkSectionRef = useRef(null);
  const bentoRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // 1. Scroll Interaction: Background Color Transition
      // Since Hero is now Dark, we might want to keep it dark or transition to slight gray for Bento
      // For now, let's keep the nav bar transparent/dark consistent
      ScrollTrigger.create({
        trigger: "#features",
        start: "top 60%",
        end: "bottom center",
        onEnter: () => {
          gsap.to(mainRef.current, { backgroundColor: "#0B0C15", color: "#F8FAFC", duration: 0.8 });
        },
        onLeaveBack: () => {
          // Keep it dark even when scrolling back to hero
          gsap.to(mainRef.current, { backgroundColor: "#0B0C15", color: "#F8FAFC", duration: 0.8 });
        }
      });

      // 2. Scroll Interaction: Hero UI Reveal
      gsap.from(".hero-ui", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current, // We will attach this ref to Hero div
          start: "top center",
          scrub: 1
        }
      });

      // 3. Scroll Interaction: Bento Grid Staggered Reveal
      gsap.from(".bento-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 75%"
        }
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full min-h-screen bg-brand-light text-brand-text transition-colors duration-700">
      <Navbar />
      <Hero ref={heroRef} />
      <Logos />
      <PersonaSelector />
      <FeatureSection ref={darkSectionRef} />
      <BentoGrid ref={bentoRef} />
      <TestimonialGrid />
      <BlogResources />
      <Footer />
    </div>
  );
};

export default App;
