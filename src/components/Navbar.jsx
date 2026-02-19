import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile menu on resize if screen becomes large
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', href: '#features' },
        { name: 'Job orders', href: '#resources' },
        { name: 'Visa consulting', href: '#footer' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full px-6 md:px-8 py-4 flex justify-between items-center z-50 backdrop-blur-md bg-[#0B0C15]/80 border-b border-white/10 transition-all duration-700">

            {/* Brand Logo */}
            <div className="text-base font-bold tracking-tight flex items-center gap-2 z-50 relative">
                <img src={`${import.meta.env.BASE_URL}oklogo.png`} alt="OK KOREA Logo" className="w-8 h-8 object-contain" />
                <span className="text-white">OK KOREA</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-base font-medium text-white items-center">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="transition-all duration-300 hover:text-[#FFD700] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Desktop CTA */}
            <button className="hidden md:block px-4 py-2 bg-[#0d0d15] text-white rounded-lg font-bold hover:bg-[#352019] transition-colors text-center whitespace-normal leading-tight w-auto min-w-[120px]">
                Send Resume
            </button>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-50 relative p-2 text-white hover:text-brand-purple transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Drawer Menu */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-bold text-slate-800 hover:text-brand-purple transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {link.name}
                    </a>
                ))}
                <button className="mt-4 px-8 py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-[#352019] transition-colors w-3/4 text-center whitespace-normal leading-tight">
                    Send Resume
                </button>
            </div>

        </nav>
    );
};

export default Navbar;
