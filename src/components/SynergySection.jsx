import React, { forwardRef, useEffect, useRef } from 'react';

const SynergySection = forwardRef((props, ref) => {
    const gridRef = useRef(null);

    useEffect(() => {
        const cards = gridRef.current.querySelectorAll('.synergy-card');

        const observerOptions = {
            root: null,
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible-card');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const partners = [
        {
            id: 'suman',
            title: 'Digital Strategy Lead',
            name: 'Suman Silwal (CEO)',
            desc: '비즈니스 모델을 분석하여 실행 가능한 디지털 전환 전략과 성장 로드맵을 설계합니다.',
            icon: '🚀',
            img: '/team/nepal-suman.png'
        },
        {
            id: 'pratik',
            title: 'Growth & SEO Hacker',
            name: 'Pratik Guragain',
            desc: '검색 엔진 최적화와 퍼포먼스 마케팅으로 브랜드 가시성을 극대화합니다.',
            icon: '📈',
            img: '/team/nepal-pratik.png'
        },
        {
            id: 'sajina',
            title: 'Creative UI/UX Lead',
            name: 'Sajina Silwal',
            desc: '사용자 중심의 직관적이고 매력적인 인터페이스 디자인으로 고객 경험을 향상시킵니다.',
            icon: '🎨',
            img: '/team/nepal-sajina.png'
        },
        {
            id: 'pralhad',
            title: 'Global Tech Director',
            name: 'Pralhad Sedhai',
            desc: '안정적인 글로벌 시스템 통합과 기술적 이슈를 해결하여 비즈니스 연속성을 보장합니다.',
            icon: '🌐',
            img: '/team/nepal-pralhad.png'
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
                    transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                    opacity: 0;
                    transform: translateY(40px);
                    background: #0f1020;
                }

                .synergy-card.visible-card {
                    opacity: 1;
                    transform: translateY(0);
                }

                .synergy-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    z-index: 0;
                    opacity: 0.15;
                    filter: grayscale(100%) brightness(0.5);
                    transition: all 0.7s ease;
                }

                .card-suman::before { background-image: url('/team/nepal-suman.png'); }
                .card-pratik::before { background-image: url('/team/nepal-pratik.png'); }
                .card-sajina::before { background-image: url('/team/nepal-sajina.png'); }
                .card-pralhad::before { background-image: url('/team/nepal-pralhad.png'); }

                .synergy-card:hover {
                    transform: translateY(-12px);
                    border-color: rgba(124, 77, 255, 0.5);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .synergy-card:hover::before {
                    opacity: 0.4;
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

                .card-icon-top {
                    font-size: 2.8rem;
                    margin-bottom: auto;
                    filter: drop-shadow(0 0 10px rgba(124, 77, 255, 0.3));
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

            <div ref={gridRef} className="synergy-grid">
                {partners.map((partner) => (
                    <div key={partner.id} className={`synergy-card card-${partner.id}`}>
                        <div className="card-content">
                            <div className="card-icon-top">{partner.icon}</div>
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
