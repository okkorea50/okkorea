import React, { useLayoutEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
import FeatureSection from './components/FeatureSection';
import PersonaSelector from './components/PersonaSelector';
import SynergySection from './components/SynergySection';
import TestimonialGrid from './components/TestimonialGrid';
import BlogResources from './components/BlogResources';
import Footer from './components/Footer';

// Pages
import AllJobs from './pages/AllJobs';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

const MainContent = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const darkSectionRef = useRef(null);
  const synergyRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#features",
        start: "top 60%",
        end: "bottom center",
        onEnter: () => {
          gsap.to(mainRef.current, { backgroundColor: "#0B0C15", color: "#F8FAFC", duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(mainRef.current, { backgroundColor: "#0B0C15", color: "#F8FAFC", duration: 0.8 });
        }
      });

      gsap.from(".hero-ui", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          scrub: 1
        }
      });

      gsap.from(".synergy-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: {
          amount: 0.6,
          from: "start"
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: synergyRef.current,
          start: "top 95%",
          once: true,
          toggleActions: "play none none none"
        },
        onComplete: () => {
          gsap.set(".synergy-card", { clearProps: "transform" });
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
      <SynergySection ref={synergyRef} />
      <TestimonialGrid />
      <BlogResources />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
