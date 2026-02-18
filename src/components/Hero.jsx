import React, { forwardRef, useEffect, useState } from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';

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
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2
            });
            gsap.from(titleLine2Ref.current, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.4
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
        <section ref={ref} className="pt-32 pb-20 px-6 relative overflow-hidden bg-brand-dark text-white">
            {/* Aurora Gradients matches reference */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/30 rounded-full blur-[120px] mix-blend-screen animate-blob pointer-events-none"></div>
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 pointer-events-none"></div>

            {/* Particle Effect Container */}
            <div id="heroParticles" ref={particleContainerRef} className="absolute inset-0 pointer-events-none">
                {particles.map(p => (
                    <div key={p.id} className="particle" style={p.style}></div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8 border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                    <span className="text-sm font-semibold text-brand-textDark">New: 2026 Global Visa Guide Released</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-white overflow-hidden">
                    <span ref={titleLine1Ref} className="block">Step into the future</span>
                    <span ref={titleLine2Ref} className="block">of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea Life.</span></span>
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    유학부터 취업, 정착까지. 복잡한 한국 생활의 모든 퍼즐을<br />
                    OK KOREA의 올인원 솔루션으로 완성하세요.
                </p>

                <div className="flex justify-center gap-4 mb-20">
                    <button className="px-10 py-4 bg-white text-brand-dark rounded-xl font-bold text-lg hover:bg-[#a04bb0] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2" aria-label="Study">
                        Study <ArrowRight size={18} />
                    </button>
                    <button className="px-10 py-4 bg-transparent text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-[#cd5f62] hover:border-[#cd5f62] transition-all flex items-center gap-2" aria-label="Work">
                        <Play size={18} /> Work
                    </button>
                </div>

                {/* Hero UI Mockup (Parallax) */}
                <div className="hero-ui relative max-w-5xl mx-auto">
                    <div className="rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white">
                        {/* Fixed Alt Text */}
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                            className="w-full object-cover"
                            alt="OK KOREA Dashboard Analytics Interface"
                        />

                        {/* Floating Elements mimicking reference */}
                        <div className="absolute top-10 left-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <CheckCircle2 size={20} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">Visa Approved</div>
                                <div className="text-xs text-slate-500">Just now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';
export default Hero;
