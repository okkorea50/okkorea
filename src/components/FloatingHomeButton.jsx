import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingHomeButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('FloatingHomeButton mounted');
        const toggleVisibility = () => {
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            setIsVisible(true); // Force true for debugging
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        console.log('Scrolling to top');
        if (location.pathname === '/') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            navigate('/?section=hero');
        }
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[9999] p-4 bg-[#FBBF24] text-[#080812] rounded-full shadow-[0_0_50px_rgba(251,191,36,0.8)] border-4 border-white transition-all duration-500 hover:scale-110 active:scale-95 group flex items-center justify-center opacity-100 pointer-events-auto`}
            aria-label="Back to home"
            style={{ display: 'flex' }}
        >
            <Home size={24} className="relative z-10 transition-transform group-hover:-translate-y-0.5" />

            {/* Pulsing Ring Effect */}
            <span className="absolute inset-0 rounded-full border-2 border-[#FBBF24] animate-ping opacity-20 group-hover:opacity-40"></span>
        </button>
    );
};

export default FloatingHomeButton;
