import React from 'react';
import { Link } from 'react-router-dom';
import HikoreaLogo from '../assets/footer/hikorea.png';
import VisaPortalLogo from '../assets/footer/visaportal.png';
import EpsLogo from '../assets/footer/eps.png';

const Footer = ({ showCTA = true }) => {
    return (
        <>
            {/* CTA Section */}
            {showCTA && (
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
            )}

            {/* Government Portals Section */}
            <div className="bg-black py-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 transition-opacity duration-500">
                        <a href="https://www.hikorea.go.kr/Main.pt" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                            <img src={HikoreaLogo} alt="Hi Korea" className="h-10 md:h-12 w-auto object-contain" />
                        </a>
                        <a href="https://www.visa.go.kr/" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                            <img src={VisaPortalLogo} alt="Korea Visa Portal" className="h-10 md:h-12 w-auto object-contain" />
                        </a>
                        <a href="https://eps.hrdkorea.or.kr/main/intro.do" target="_blank" rel="noopener noreferrer" className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                            <img src={EpsLogo} alt="EPS HRD Korea" className="h-10 md:h-12 w-auto object-contain" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <footer className="py-8 bg-black text-slate-600 text-sm border-t border-white/5 text-center">
                <p>© Since 2007 OK KOREA Co,.Ltd</p>
            </footer>
        </>
    );
};

export default Footer;
