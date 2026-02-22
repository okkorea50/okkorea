import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingHomeButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.scrollY || document.documentElement.scrollTop;
            if (location.pathname === '/') {
                setIsVisible(scrolled > 300);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        toggleVisibility();
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [location.pathname]);

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
            aria-label="Back to home"
            className={`transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 group shadow-[0_0_40px_rgba(251,191,36,0.4)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 2147483647,
                backgroundColor: '#FBBF24',
                color: '#080812',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
        >
            <Home size={24} className="group-hover:-translate-y-0.5 transition-transform" />
            <span className="absolute inset-0 rounded-full border-2 border-[#FBBF24] animate-ping opacity-20 group-hover:opacity-40"></span>
        </button>
    );
};

export default FloatingHomeButton;
