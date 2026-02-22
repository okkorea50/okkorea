import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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

    const scrollToSection = (e, id) => {
        if (e) e.preventDefault();
        setIsOpen(false);

        const element = document.getElementById(id);
        if (element && location.pathname === '/') {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            navigate(`/?section=${id}`);
        }
    };

    const navLinks = [
        { name: 'Home', action: (e) => scrollToSection(e, 'hero'), id: 'hero' },
        { name: 'Job orders', action: (e) => scrollToSection(e, 'resources'), id: 'resources' },
        { name: 'Visa consulting', action: (e) => scrollToSection(e, 'consultation'), id: 'consultation' },
        { name: 'Now Recruiting', path: '/recruiting', id: 'recruiting' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center z-50 backdrop-blur-md bg-[#0B0C15]/80 border-b border-white/10 transition-all duration-700">

            {/* Brand Logo */}
            <a
                href="#/"
                onClick={(e) => scrollToSection(e, 'hero')}
                className="text-base font-bold tracking-tight flex items-center gap-2 z-50 relative cursor-pointer"
            >
                <img src={`${import.meta.env.BASE_URL}oklogo.png`} alt="OK KOREA Logo" className="w-8 h-8 object-contain" />
                <span className="text-white">OK KOREA</span>
            </a>

            <div className="hidden md:flex gap-8 text-base font-medium text-white items-center">
                {navLinks.map((link) => (
                    link.path ? (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="transition-all duration-300 hover:text-[#FFD700] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                        >
                            {link.name}
                        </Link>
                    ) : (
                        <a
                            key={link.name}
                            href={`#${link.id}`}
                            onClick={(e) => link.action(e)}
                            className="transition-all duration-300 hover:text-[#FFD700] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                        >
                            {link.name}
                        </a>
                    )
                ))}
            </div>

            {/* Desktop Auth / CTA */}
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName} className="w-7 h-7 rounded-full border border-white/20" />
                        ) : (
                            <div className="w-7 h-7 bg-brand-purple rounded-full flex items-center justify-center">
                                <User size={14} className="text-white" />
                            </div>
                        )}
                        <span className="text-xs font-bold text-white/80">{user.displayName || 'User'}</span>
                        <button
                            onClick={logout}
                            className="p-1.5 hover:bg-white/10 rounded-full transition-colors group"
                            title="Logout"
                        >
                            <LogOut size={14} className="text-white/40 group-hover:text-red-400" />
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-[#FBBF24] text-[#080812] rounded-lg font-black text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden z-50 relative p-2 text-white hover:text-brand-purple transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Drawer Menu */}
            <div className={`fixed inset-0 bg-[#080812] backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link) => (
                    link.path ? (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-black text-white hover:text-[#FBBF24] transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </Link>
                    ) : (
                        <a
                            key={link.name}
                            href={`#${link.id}`}
                            onClick={(e) => link.action(e)}
                            className="text-2xl font-black text-white hover:text-[#FBBF24] transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    )
                ))}
                <div className="w-3/4 h-px bg-white/10 my-4"></div>
                {user ? (
                    <div className="flex flex-col items-center gap-4">
                        <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full border-2 border-[#FBBF24]" />
                        <div className="text-xl font-bold">{user.displayName}</div>
                        <button
                            onClick={() => { logout(); setIsOpen(false); }}
                            className="px-8 py-3 bg-white/5 border border-white/10 text-red-400 rounded-xl font-bold"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="px-12 py-4 bg-[#FBBF24] text-[#080812] rounded-xl font-black text-lg hover:bg-[#FBBF24]/90 transition-colors w-3/4 text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                )}
            </div>

        </nav>
    );
};

export default Navbar;
