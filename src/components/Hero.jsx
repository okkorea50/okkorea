import React, { forwardRef, useEffect, useState } from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { useNavigate, Link } from 'react-router-dom';
// import HeroImage from '../assets/Hero.png'; // Replaced with direct URL

const Hero = forwardRef((props, ref) => {
    const [particles, setParticles] = useState([]);
    const titleLine1Ref = React.useRef(null);
    const titleLine2Ref = React.useRef(null);

    // Mouse Interaction Refs
    const particleContainerRef = React.useRef(null);

    useEffect(() => {
        // GSAP Text Animations
        const ctx = gsap.context(() => {
            gsap.from(titleLine1Ref.current, {
                x: -50,
                opacity: 0,
                duration: 2.5,
                ease: "power4.out",
                delay: 0.2
            });
            gsap.from(titleLine2Ref.current, {
                x: 50,
                opacity: 0,
                duration: 2.5,
                ease: "power4.out",
                delay: 0.8
            });

            // Mouse Move Listener
            const handleMouseMove = (e) => {
                const { innerWidth, innerHeight } = window;
                // Calculate normalized position (-1 to 1)
                const x = (e.clientX / innerWidth) * 2 - 1;
                const y = (e.clientY / innerHeight) * 2 - 1;

                // Animate particles container subtly opposite to mouse direction for depth (Parallax)
                // Or follow the mouse (Attraction). Repulsion/Attraction needs individual particle logic.
                // Let's go with a subtle parallax 'follow' effect on the container first for smoothness.
                gsap.to(particleContainerRef.current, {
                    x: x * 30, // Move 30px max
                    y: y * 30,
                    duration: 1,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);

        }, ref);

        return () => ctx.revert();
    }, [ref]);

    useEffect(() => {
        const count = 60;
        const newParticles = [];
        for (let i = 0; i < count; i++) {
            const left = Math.random() * 100;
            const top = 20 + Math.random() * 70;
            const dur = 4 + Math.random() * 6;
            const delay = Math.random() * 6;
            const drift = (Math.random() - 0.5) * 60 + 'px';
            const size = 3 + Math.random() * 5;
            const opacity = 0.4 + Math.random() * 0.5;

            // Color Mix: White and Gold
            const isGold = Math.random() > 0.7; // 30% chance of gold
            const color = isGold ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            const boxShadow = isGold
                ? '0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 140, 0, 0.4)'
                : '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(200, 200, 255, 0.4)';

            newParticles.push({
                id: i,
                style: {
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color, // Override CSS
                    boxShadow: boxShadow,   // Override CSS
                    animationDuration: `${dur}s`,
                    animationDelay: `${delay}s`,
                    '--drift': drift,
                    opacity: opacity
                }
            });
        }
        // eslint-disable-next-line
        setParticles(newParticles);
    }, []);

    return (
        <section id="hero" ref={ref} className="pt-[140px] pb-[80px] px-6 relative overflow-hidden bg-brand-dark text-white">
            {/* Aurora Gradients matches reference */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/30 rounded-full blur-[120px] mix-blend-screen animate-blob pointer-events-none"></div>
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 pointer-events-none"></div>

            {/* Particle Effect Container */}
            <div id="heroParticles" ref={particleContainerRef} className="absolute inset-0 pointer-events-none">
                {particles.map(p => (
                    <div key={p.id} className="particle" style={p.style}></div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-12 border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                    <span className="text-sm font-semibold text-brand-textDark">New: 2026 Global Visa Guide Released</span>
                </div>

                {/* Content Group: Headline -> Subhead -> Buttons */}
                <div className="flex flex-col items-center gap-6 mb-16 relative">
                    {/* Floating Badge - Relocated to Headline Area */}
                    <div className="absolute -top-12 right-0 md:right-[15%] z-20 animate-bounce duration-[3000ms]">
                        <div className="bg-white/95 backdrop-blur-sm p-2 px-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 flex items-center gap-2 -rotate-[35deg] scale-90 origin-bottom-right">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                                <CheckCircle2 size={16} />
                            </div>
                            <div className="text-left">
                                <div className="text-[12px] font-black text-slate-900 whitespace-nowrap leading-none">Visa Approved</div>
                                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Just now
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white">
                        <span ref={titleLine1Ref} className="block">Step into the future</span>
                        <span ref={titleLine2Ref} className="block">of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea Life.</span></span>
                    </h1>

                    <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        유학부터 취업, 비자까지. OK KOREA가 당신의 한국 생활을 완벽하게 가이드합니다.<br className="hidden md:block" />
                        복잡한 절차는 저희에게 맡기고 꿈을 향해 나아가세요.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                        {/* Adjusted text color for visibility: text-brand-dark on light bg */}
                        <Link
                            to="/study"
                            className="group px-6 py-3 bg-brand-light text-brand-dark rounded-full font-bold text-base hover:bg-[#a04bb0] hover:text-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                            aria-label="Start for free"
                        >
                            Study <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/work"
                            className="group px-6 py-3 bg-white/5 text-white border border-white/10 rounded-full font-bold text-base hover:bg-[#cd5f62] hover:border-transparent transition-all flex items-center gap-2 backdrop-blur-sm"
                            aria-label="Watch Demo Video"
                        >
                            <Play size={16} className="fill-current" /> Work
                        </Link>
                    </div>
                </div>

                {/* Hero UI Mockup (Parallax) */}
                <div className="hero-ui relative max-w-5xl mx-auto -mt-[30px]">
                    <div className="rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white relative z-10">
                        {/* Fixed Alt Text */}
                        <img
                            src="https://postfiles.pstatic.net/MjAyNjAyMTlfMTEx/MDAxNzcxNDYzOTY0ODAx.5KTt66rkHdzuVNUdJMAStkdEYFVwwJUjJfcV8h68AiAg.OYFL9SKtPMwQO4xaJ0ZlEZaHBp72bzoylwHQbhaFp5sg.PNG/Hero.png?type=w966"
                            className="w-full object-cover"
                            alt="OK KOREA Dashboard Analytics Interface"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';
export default Hero;
