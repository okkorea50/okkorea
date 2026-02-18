import React, { forwardRef, useEffect, useState } from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = forwardRef((props, ref) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const count = 30;
        const newParticles = [];
        for (let i = 0; i < count; i++) {
            const left = Math.random() * 100;
            const top = 20 + Math.random() * 70;
            const dur = 4 + Math.random() * 6;
            const delay = Math.random() * 6;
            const drift = (Math.random() - 0.5) * 60 + 'px'; // -30px to +30px
            const size = 1 + Math.random() * 2;

            newParticles.push({
                id: i,
                style: {
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDuration: `${dur}s`,
                    animationDelay: `${delay}s`,
                    '--drift': drift
                }
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <section ref={ref} className="pt-32 pb-20 px-6 relative overflow-hidden bg-brand-dark text-white">
            {/* Aurora Gradients matches reference */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/30 rounded-full blur-[120px] mix-blend-screen animate-blob pointer-events-none"></div>
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/30 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000 pointer-events-none"></div>

            {/* Particle Effect Container */}
            <div id="heroParticles" className="absolute inset-0 pointer-events-none opacity-70">
                {particles.map(p => (
                    <div key={p.id} className="particle" style={p.style}></div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8 border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                    <span className="text-sm font-semibold text-brand-textDark">New: 2026 Global Visa Guide Released</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-white">
                    Step into the future<br />
                    of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea Life.</span>
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    유학부터 취업, 정착까지. 복잡한 한국 생활의 모든 퍼즐을<br />
                    OK KOREA의 올인원 솔루션으로 완성하세요.
                </p>

                <div className="flex justify-center gap-4 mb-20">
                    <button className="px-8 py-4 bg-white text-brand-dark rounded-xl font-bold text-lg hover:bg-brand-orange hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2" aria-label="Start for free">
                        Start for free <ArrowRight size={18} />
                    </button>
                    <button className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2" aria-label="Watch Demo Video">
                        <Play size={18} /> Watch Demo
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
