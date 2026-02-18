import React, { forwardRef } from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="pt-32 pb-20 px-6 relative overflow-hidden bg-brand-light">
            {/* Aurora Gradients matches reference */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-multiply animate-blob pointer-events-none"></div>
            <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 mb-8 border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
                    <span className="text-sm font-semibold text-slate-600">New: 2026 Global Visa Guide Released</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-brand-text">
                    Step into the future<br />
                    of <span className="gradient-text-hero">Korea Life.</span>
                </h1>

                <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    유학부터 취업, 정착까지. 복잡한 한국 생활의 모든 퍼즐을<br />
                    OK KOREA의 올인원 솔루션으로 완성하세요.
                </p>

                <div className="flex justify-center gap-4 mb-20">
                    <button className="px-8 py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-purple transition-all shadow-xl flex items-center gap-2" aria-label="Start for free">
                        Start for free <ArrowRight size={18} />
                    </button>
                    <button className="px-8 py-4 bg-white text-brand-dark border border-slate-200 rounded-xl font-bold text-lg hover:border-brand-purple transition-all flex items-center gap-2" aria-label="Watch Demo Video">
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
