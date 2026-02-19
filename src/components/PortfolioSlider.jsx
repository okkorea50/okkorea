import React from 'react';

const PortfolioSlider = () => {
    // We have 16 images in public/images/pot/ (pot-01.png to pot-16.png)
    const totalImages = 16;
    const images = Array.from({ length: totalImages }, (_, i) => ({
        id: i + 1,
        src: `/images/pot/pot-${(i + 1).toString().padStart(2, '0')}.png`
    }));

    // For infinite loop, we duplicate the image set
    const displayImages = [...images, ...images];

    return (
        <section className="portfolio-slider-wrap py-16 bg-[#050510] overflow-hidden">
            <style>{`
                .slider-label {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.9rem;
                    margin-bottom: 30px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .infinite-container {
                    width: 100%;
                    display: flex;
                }

                .infinite-track {
                    display: flex;
                    width: max-content;
                    animation: slideInfinite 60s linear infinite;
                }

                .infinite-track:hover {
                    animation-play-state: paused;
                }

                .pot-slide {
                    width: 300px;
                    padding: 0 15px;
                    flex-shrink: 0;
                }

                .pot-slide img {
                    width: 100%;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: transform 0.4s ease, border-color 0.4s ease;
                    aspect-ratio: 16/9;
                    object-fit: cover;
                }

                .pot-slide img:hover {
                    transform: scale(1.05);
                    border-color: #8b5cf6;
                    box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.5);
                }

                @keyframes slideInfinite {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @media (max-width: 768px) {
                    .pot-slide {
                        width: 220px;
                    }
                    .infinite-track {
                        animation-duration: 40s;
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
