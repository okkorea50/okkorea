import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

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
        { name: 'Solutions', href: '#features' }, // Use anchor links
        { name: 'Resources', href: '#resources' },
        { name: 'Pricing', href: '#footer' }, // Placeholder anchor
    ];

    return (
        <nav className="fixed top-0 left-0 w-full px-6 md:px-8 py-4 flex justify-between items-center z-50 backdrop-blur-md bg-white/80 border-b border-black/5 transition-all duration-700">

            {/* Brand Logo */}
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2 z-50 relative">
                <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">O</div>
                <span className="text-brand-text">OK KOREA.</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm font-semibold">
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} className="hover:text-brand-purple transition-colors">
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Desktop CTA */}
            <button className="hidden md:block px-5 py-2 bg-brand-dark text-white rounded-lg font-bold hover:bg-brand-purple transition-colors">
                Get Started
            </button>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-50 relative p-2 text-brand-text hover:text-brand-purple transition-colors"
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
                <button className="mt-4 px-8 py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-purple transition-colors w-3/4">
                    Get Started
                </button>
            </div>

        </nav>
    );
};

export default Navbar;
