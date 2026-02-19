import React, { forwardRef } from 'react';

// Import images for robust path resolution (Vite)
import imgSuman from '/team/nepal-suman.png';
import imgPratik from '/team/nepal-pratik.png';
import imgSajina from '/team/nepal-sajina.png';
import imgPralhad from '/team/nepal-pralhad.png';

const SynergySection = forwardRef((props, ref) => {
    const partners = [
        {
            id: 'suman',
            title: 'Digital Strategy',
            name: 'Suman Silwal | CEO',
            desc: '핀테크 및 인슈어테크 시스템 설계 전문가로서 비즈니스 디지털 전환 전략을 설계합니다.',
            icon: '🚀',
            img: imgSuman
        },
        {
            id: 'pratik',
            title: 'Growth & SEO',
            name: 'Pratik Guragain | SEO Specialist',
            desc: '브랜드의 가시성을 확보하고 최고의 마케팅으로 수익실현',
            icon: '📈',
            img: imgPratik
        },
        {
            id: 'sajina',
            title: 'Creative Design',
            name: 'Sajina Silwal | UI/UX Designer',
            desc: '사용자 아이디어를 시각적으로 매력적이고 직관적인 인터페이스로 구현합니다.',
            icon: '🎨',
            img: imgSajina
        },
        {
            id: 'pralhad',
            title: 'Global Systems',
            name: 'Pralhad Sedhai | Tech Director',
            desc: '10년 이상의 금융 시스템 아키텍처 분석 경험으로 안정적인 글로벌 통합을 지원합니다.',
            icon: '🌐',
            img: imgPralhad
        }
    ];

    return (
        <section ref={ref} className="marketing-synergy-section bg-[#080812] py-24 px-6 overflow-hidden">
            <style>{`
                .marketing-synergy-section {
                    text-align: center;
                }

                .synergy-header {
                    margin-bottom: 60px;
                }

                .synergy-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    background: rgba(124, 77, 255, 0.15);
                    color: #a88aff;
                    border-radius: 99px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    border: 1px solid rgba(124, 77, 255, 0.3);
                }

                .synergy-header h2 {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 900;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 20px;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #7c4dff, #ff8a65);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .synergy-header p {
                    color: #94a3b8;
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .synergy-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .synergy-card {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    cursor: pointer;
                    height: 420px;
                    background: #0f1020;
                    /* GSAP will handle the entrance, removing 'transition: all' 
                       from the base state to avoid conflicts during reveal */
                    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), 
                                border-color 0.5s ease, 
                                box-shadow 0.5s ease;
                }

                /* Background image container for each card */
                .card-image-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    z-index: 0;
                    opacity: 0.25;
                    filter: grayscale(100%) brightness(0.6);
                    transition: all 0.7s ease;
                }

                .synergy-card:hover .card-image-bg {
                    opacity: 0.6;
                    filter: grayscale(0%) brightness(0.85);
                    transform: scale(1.1);
                }

                .synergy-card:hover {
                    transform: translateY(-12px);
                    border-color: rgba(124, 77, 255, 0.5);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .synergy-card:hover::before {
                    opacity: 0.5;
                    filter: grayscale(0%) brightness(0.7);
                    transform: scale(1.08);
                }

                .card-content {
                    position: relative;
                    z-index: 1;
                    padding: 40px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    background: linear-gradient(to top, rgba(8, 8, 18, 0.95), transparent 70%);
                    text-align: left;
                }


                .card-content h3 {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                }

                .member-name {
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 12px;
                }

                .member-desc {
                    font-size: 0.95rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    font-weight: 500;
                }
            `}</style>

            <div className="synergy-header max-w-4xl mx-auto">
                <span className="synergy-badge">Global Strategic Team</span>
                <h2>Your Extended Marketing <span className="gradient-text">Powerhouse.</span></h2>
                <p>네팔의 InsurTech 혁신 기업과 함께 데이터 기반의 글로벌 마케팅을 실현합니다.</p>
            </div>

            <div className="synergy-grid">
                {partners.map((partner) => (
                    <div key={partner.id} className={`synergy-card card-${partner.id}`}>
                        <div
                            className="card-image-bg"
                            style={{ backgroundImage: `url(${partner.img})` }}
                        />
                        <div className="card-content">
                            <h3>{partner.title}</h3>
                            <p className="member-name">{partner.name}</p>
                            <p className="member-desc">{partner.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

SynergySection.displayName = 'SynergySection';
export default SynergySection;
