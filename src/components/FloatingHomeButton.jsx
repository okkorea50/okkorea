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
            aria-label="Back to home"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                zIndex: 2147483647, // Max possible z-index
                backgroundColor: 'red', // Changed to red for debugging as per instruction
                color: '#080812',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 1,
                visibility: 'visible',
                pointerEvents: 'auto'
            }}
        >
            <Home size={32} />
        </button>
    );
};

export default FloatingHomeButton;
