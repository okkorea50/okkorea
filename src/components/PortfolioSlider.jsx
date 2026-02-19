import React from 'react';

// Explicitly import images for robust Vite/GitHub Pages path resolution
import pot01 from '/images/pot/pot-01.png';
import pot02 from '/images/pot/pot-02.png';
import pot03 from '/images/pot/pot-03.png';
import pot04 from '/images/pot/pot-04.png';
import pot05 from '/images/pot/pot-05.png';
import pot06 from '/images/pot/pot-06.png';
import pot07 from '/images/pot/pot-07.png';
import pot08 from '/images/pot/pot-08.png';
import pot09 from '/images/pot/pot-09.png';
import pot10 from '/images/pot/pot-10.png';
import pot11 from '/images/pot/pot-11.png';
import pot12 from '/images/pot/pot-12.png';
import pot13 from '/images/pot/pot-13.png';
import pot14 from '/images/pot/pot-14.png';
import pot15 from '/images/pot/pot-15.png';
import pot16 from '/images/pot/pot-16.png';

const PortfolioSlider = () => {
    const images = [
        { id: 1, src: pot01 },
        { id: 2, src: pot02 },
        { id: 3, src: pot03 },
        { id: 4, src: pot04 },
        { id: 5, src: pot05 },
        { id: 6, src: pot06 },
        { id: 7, src: pot07 },
        { id: 8, src: pot08 },
        { id: 9, src: pot09 },
        { id: 10, src: pot10 },
        { id: 11, src: pot11 },
        { id: 12, src: pot12 },
        { id: 13, src: pot13 },
        { id: 14, src: pot14 },
        { id: 15, src: pot15 },
        { id: 16, src: pot16 }
    ];

    // For infinite loop, we duplicate the image set
    const displayImages = [...images, ...images];

    return (
        <section className="portfolio-slider-wrap py-16 bg-[#050510] overflow-hidden border-t border-white/5">
            <style>{`
                .slider-label {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.9rem;
                    margin-bottom: 40px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                .infinite-container {
                    width: 100%;
                    display: flex;
                }

                .infinite-track {
                    display: flex;
                    width: max-content;
                    animation: slideInfinite 70s linear infinite;
                }

                .infinite-track:hover {
                    animation-play-state: paused;
                }

                .pot-slide {
                    width: 320px;
                    padding: 0 12px;
                    flex-shrink: 0;
                }

                .pot-slide img {
                    width: 100%;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    /* Dimmed and Grayscale by default */
                    filter: grayscale(100%) brightness(0.4);
                    opacity: 0.6;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), 
                                filter 0.6s ease,
                                opacity 0.6s ease,
                                border-color 0.5s ease,
                                box-shadow 0.5s ease;
                    aspect-ratio: 16/10;
                    object-fit: cover;
                    background: #101122;
                }

                .pot-slide img:hover {
                    transform: scale(1.08) translateY(-10px);
                    filter: grayscale(0%) brightness(1);
                    opacity: 1;
                    border-color: rgba(139, 92, 246, 0.8);
                    box-shadow: 0 30px 60px -15px rgba(139, 92, 246, 0.4);
                }

                @keyframes slideInfinite {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @media (max-width: 768px) {
                    .pot-slide {
                        width: 240px;
                        padding: 0 8px;
                    }
                    .infinite-track {
                        animation-duration: 45s;
                    }
                    .slider-label {
                        font-size: 0.75rem;
                        letter-spacing: 2px;
                        margin-bottom: 25px;
                    }
                }
            `}</style>

            <div className="slider-label">Our Innovation Portfolio</div>
            <div className="infinite-container">
                <div className="infinite-track">
                    {displayImages.map((img, index) => (
                        <div key={`${img.id}-${index}`} className="pot-slide">
                            <img
                                src={img.src}
                                alt={`Portfolio Item ${img.id}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSlider;
