import React from 'react';

const Footer = () => {
    return (
        <>
            {/* CTA Section */}
            <section id="footer" className="py-20 px-6 bg-[#0B0C15] text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                        Start your<br />
                        <span className="text-brand-purple">Super Journey.</span>
                    </h2>
                    <button className="px-12 py-5 bg-white text-brand-dark rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        로그인(구글)
                    </button>
                </div>
            </section>

            {/* Footer Text */}
            <footer className="py-12 bg-black text-slate-600 text-sm border-t border-white/10 text-center">
                <p>© 2026 OK KOREA Inc.</p>
            </footer>
        </>
    );
};

export default Footer;
