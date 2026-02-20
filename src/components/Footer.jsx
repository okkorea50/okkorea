import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            {/* CTA Section */}
            <section id="footer" className="pt-4 pb-16 px-6 bg-[#0B0C15] text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                        Start your<br />
                        <span className="text-brand-purple">Super Journey.</span>
                    </h2>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-3.5 bg-white text-brand-dark rounded-full font-black text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        Login
                    </Link>
                </div>
            </section>

            {/* Footer Text */}
            <footer className="py-8 bg-black text-slate-600 text-sm border-t border-white/10 text-center">
                <p>© 2026 OK KOREA Inc.</p>
            </footer>
        </>
    );
};

export default Footer;
