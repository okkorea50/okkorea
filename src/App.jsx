import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Logos from './components/Logos';
const LazyFeatureSection = React.lazy(() => import('./components/FeatureSection'));
const LazyPersonaSelector = React.lazy(() => import('./components/PersonaSelector'));
const LazySynergySection = React.lazy(() => import('./components/SynergySection'));
const LazyTestimonialGrid = React.lazy(() => import('./components/TestimonialGrid'));
const LazyBlogResources = React.lazy(() => import('./components/BlogResources'));
const LazyConsultationForm = React.lazy(() => import('./components/ConsultationForm'));
const LazyLogos = React.lazy(() => import('./components/Logos'));
import Footer from './components/Footer';
import FloatingHomeButton from './components/FloatingHomeButton';

// Pages
import AllJobs from './pages/AllJobs';
import Login from './pages/Login';
import Study from './pages/Study';
import Work from './pages/Work';
import Recruiting from './pages/Recruiting';
import Dashboard from './pages/Dashboard';
import CoursePlayer from './pages/CoursePlayer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
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
    // GSAP animations code...
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
      <React.Suspense fallback={<div className="h-48 bg-[#0B0C15]" />}>
        <LazyLogos />
        <LazyPersonaSelector />
        <LazyFeatureSection ref={darkSectionRef} />
        <LazySynergySection ref={synergyRef} />
        <LazyTestimonialGrid />
        <LazyBlogResources />
        <LazyConsultationForm />
      </React.Suspense>
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
          <Route path="/study" element={<Study />} />
          <Route path="/work" element={<Work />} />
          <Route path="/recruiting" element={<Recruiting />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <ProtectedRoute>
                <CoursePlayer />
              </ProtectedRoute>
            }
          />
        </Routes>
        <FloatingHomeButton />
      </Router>
    </AuthProvider>
  );
};

export default App;
