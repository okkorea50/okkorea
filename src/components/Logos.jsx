import React from 'react';

const Logos = () => {
    return (
        <section className="py-10 border-y border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by 5,000+ Students & Companies</p>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholders for logos matching style */}
                    {['Samsung', 'LG', 'Hyundai', 'SK', 'Naver', 'Kakao'].map(logo => (
                        <span key={logo} className="text-xl font-black text-slate-800">{logo}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Logos;
