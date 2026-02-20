import React, { useLayoutEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
// ... rest of imports unchanged

const MainContent = () => {
  const [searchParams] = useSearchParams();
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const darkSectionRef = useRef(null);
  const synergyRef = useRef(null);

  useEffect(() => {
    const sectionId = searchParams.get('section');
    if (sectionId) {
      // Small delay to ensure all components and animations are ready
      const timer = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useLayoutEffect(() => {
    // ... GSAP code unchanged ...
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
