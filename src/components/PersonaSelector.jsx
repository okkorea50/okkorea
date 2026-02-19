import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Rocket, Home, Globe, X } from 'lucide-react';

const networkCountries = [
    "중국", "필리핀", "인도네시아", "베트남", "몽골",
    "태국", "파키스탄", "스리랑카", "인도", "미얀마",
    "네팔", "방글라데시", "키르기스스탄", "우즈베키스탄",
    "카자흐스탄", "나이지리아", "가나", "모로코", "타지키스탄"
];

const getCountryCode = (name) => {
    const codes = {
        "중국": "cn", "필리핀": "ph", "인도네시아": "id", "베트남": "vn", "몽골": "mn",
        "태국": "th", "파키스탄": "pk", "스리랑카": "lk", "인도": "in", "미얀마": "mm",
        "네팔": "np", "방글라데시": "bd", "키르기스스탄": "kg", "우즈베키스탄": "uz",
        "카자흐스탄": "kz", "나이지리아": "ng", "가나": "gh", "모로코": "ma", "타지키스탄": "tj"
    };
    return codes[name] || "un";
};

const PersonaSelector = () => {
    const [activeTab, setActiveTab] = useState('Who we are');
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); // Reset when out of view
                }
            },
            { threshold: 0.1 } // Trigger when 10% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const tabs = ['Who we are', 'History', 'Achievement', 'Networks', 'Partners'];

    const contentMap = {
        'Who we are': {
            title: "Who We Are",
            color: "bg-brand-purple",
            lightColor: "bg-brand-purple/20",
            borderColor: "border-brand-purple/20",
            benefits: [
                { title: "1999", desc: "01 서울 대치, 송파 영어/한국어 교육원 시작\n02 건국대 외국인 유학생 한국어 교육 지원", iconColor: "bg-brand-purple/20" },
                { title: "2007", desc: "01 싱가폴 교육법인 설립: 영어,한국어, 중국어, 일본어 교육\n02 어학 연수 프로그램 운영, 외국인 유학생 유치, 한국으로 송출\n03 동남아시아 교육, 무역 시장조사. 코트라, 한국산업인력공단, \n\u00A0\u00A0\u00A0\u00A0인천경제통상진흥원", iconColor: "bg-brand-purple/30" },
                { title: "2016-22", desc: "01 국내 교육 서비스 및 컨설팅, 국내 대학 외국인 학생 유치 모집\n02 미국, 영국, 호주, 캐나다 유학 및 연수\n03 싱가폴 유학 및 취업 프로그램 운영\n04 외국인 유학생 모집 및 유치,관리, 해외 거점화 사업\n05 한국산업인력공단 K-move 사업", iconColor: "bg-brand-purple/40" },
                { title: "2025", desc: "01 국내 대학 해외거점화 연구용역\n02 외국인 근로자의 학생 전환 연구 용역\n03 외국인 유학생 모집 및 유치 해외 거점화 사업(네팔,베트남\n\u00A0\u00A0\u00A0\u00A0캄보디아,태국,인도,싱가폴, 방글라데시, 스리랑카, 미얀마,\n\u00A0\u00A0\u00A0\u00A0라오스, 몽골 등 현지 네트워크 구축)\n04 KF24 BIZ 외국인 지원센터\n05 자동차 판금 도장, 부품 제조원, 요양보호사 연구용역, \n\u00A0\u00A0\u00A0\u00A0김포대학 외국인 지원", iconColor: "bg-brand-purple/50" }
            ],
            cta: null,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            icon: <GraduationCap size={80} className="text-brand-purple mx-auto mb-6 opacity-80" strokeWidth={1} />
        },
        'History': {
            title: <>Connecting the World to Korea<br /><span className="text-base font-normal text-slate-500 mt-2 block">세계를 한국과 연결해온 이야기</span></>,
            color: "bg-blue-600",
            lightColor: "bg-blue-600/20",
            borderColor: "border-blue-600/20",
            benefits: [
                { title: "1999 ~ 2012: Pioneering Global Education & Building an Asia-Centric Network", desc: "글로벌 교육 개척 및 아시아 중심 네트워크 구축", iconColor: "bg-blue-200" },
                { title: "2013 ~ 2019: Exporting the K-Education System & Accelerating International Talent Recruitment", desc: "K-교육 시스템 수출 및 글로벌 우수 인재 유치 가속화", iconColor: "bg-blue-300" },
                { title: "2020 ~ Present: Expanding Global Partnerships & Launching the Integrated K-Education Platform", desc: "글로벌 파트너십 확장 및 K-Education 통합 지원 플랫폼 론칭", iconColor: "bg-blue-400" }
            ],
            cta: null,
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
            icon: <Briefcase size={80} className="text-blue-600 mx-auto mb-6 opacity-80" strokeWidth={1} />
        },
        'Achievement': {
            title: "Launch your business\nwith confidence",
            color: "bg-rose-600",
            lightColor: "bg-rose-600/20",
            borderColor: "border-rose-600/20",
            benefits: [
                { title: "OASIS Program Guide", desc: "Step-by-step startup visa (D-8-4) roadmap.", iconColor: "bg-rose-200" },
                { title: "Global Talent Pool", desc: "Hire international talent compliant with regulations.", iconColor: "bg-orange-200" }
            ],
            cta: null, // Removed CTA
            images: [
                "https://postfiles.pstatic.net/MjAyNjAyMTlfMzgg/MDAxNzcxNDk1MjYzMjc2.owB0wA8HxEov_Cd1yxou7vBPYXSX26MctpO0M-2V_FIg.mAZgor8SJa5mUi2XujqKBFZnsDdAwVlj56W2x9i9wLIg.PNG/chrome_0VSDJLIqAq.png?type=w966",
                "https://postfiles.pstatic.net/MjAyNjAyMTlfMjc0/MDAxNzcxNDk1MjYzMjcx.VXQEjlwwKcUKGoLWFJzd1PhvwRR4hqF6VO4QHCiOMmUg.1EGd-73Z5M9N1cLmJG8sNk4BkHIPXgl6iVf-gqNkakAg.PNG/chrome_I19ec6vGF2.png?type=w3840",
                "https://postfiles.pstatic.net/MjAyNjAyMTlfNzcg/MDAxNzcxNDk1MjYzMjY3.ClqKqMTZtcbf7vD_3KsMKJuQS6e8_1Pa89mXRw1zYkwg.-FOTBIaBiXBJ5e0xPZwEoqguyNgGiGt_sX8F5Hm4GFMg.PNG/chrome_IzzvVoOw8G.png?type=w3840",
                "https://postfiles.pstatic.net/MjAyNjAyMTlfMjM3/MDAxNzcxNDk1MjYzMjcy.6JzY3a-Hl2WBdyHJAFzVN03lnvOiRNJkP9DNCUXAuiog.suOPviQZzhNnFRn9HweRwopZB1VfP82tCfzxgNAI-tEg.PNG/chrome_rUjnPyFKWJ.png?type=w3840"
            ],
            icon: <Rocket size={80} className="text-rose-600 mx-auto mb-6 opacity-80" strokeWidth={1} />
        },
        'Networks': {
            title: "Seamless relocation\nfor your loved ones",
            color: "bg-green-600",
            lightColor: "bg-green-600/20",
            borderColor: "border-green-600/20",
            benefits: [
                { title: "Housing & Schools", desc: "Find foreigner-friendly housing and international schools.", iconColor: "bg-green-200" },
                { title: "Dependent Visa Support", desc: "F-3 visa processing simplified.", iconColor: "bg-yellow-200" }
            ],
            cta: "Plan Family Move",
            icon: <Home size={80} className="text-green-600 mx-auto mb-6 opacity-80" strokeWidth={1} />
        },
        'Partners': {
            title: "Enjoy Korea like\na local",
            color: "bg-teal-600",
            lightColor: "bg-teal-600/20",
            borderColor: "border-teal-600/20",
            benefits: [
                { title: "Banking & Admin", desc: "Navigate ARC, banks, and taxes without stress.", iconColor: "bg-teal-200" },
                { title: "Community Events", desc: "Connect with 5,000+ global citizens.", iconColor: "bg-indigo-200" }
            ],
            cta: "Join Community",
            icon: <Globe size={80} className="text-teal-600 mx-auto mb-6 opacity-80" strokeWidth={1} />
        }
    };

    const currentContent = contentMap[activeTab];

    return (
        <section className="py-20 px-6 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">
                        Built to empower<br />international talent like you
                    </h2>
                    <p className="text-[14px] text-slate-600 font-medium">
                        우리는 당신과 같은 글로벌 인재의 역량을 강화하기 위해 존재합니다.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab
                                    ? 'bg-white shadow-xl text-brand-purple border border-brand-purple/20 ring-4 ring-brand-purple/5 transform scale-105'
                                    : 'bg-white text-slate-500 border-2 border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-slate-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    ref={sectionRef}
                    className={`bg-white rounded-[2rem] shadow-2xl border border-slate-100 min-h-[600px] transition-all duration-500 ease-in-out ${activeTab === 'Achievement' ? 'max-w-3xl mx-auto p-5 md:p-8' : activeTab === 'Networks' ? 'max-w-5xl mx-auto p-8' : 'w-full p-6 md:p-10'
                        }`}
                >
                    {activeTab === 'Achievement' ? (
                        <div key="achievement-grid" className="w-full h-full animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full w-full mx-auto">
                                {currentContent.images.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedImage(img)}
                                        className="relative group aspect-square rounded-2xl border-4 border-slate-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] bg-white overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] cursor-zoom-in"
                                    >
                                        <img
                                            src={img}
                                            alt={`Achievement Chart ${i + 1}`}
                                            className="w-full h-full object-cover pointer-events-none"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : activeTab === 'Networks' ? (
                        <div key="networks-grid" className="w-full h-full animate-fade-in text-center">
                            <h3 className="text-3xl font-bold mb-10 text-slate-900">Global Networks</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                                {networkCountries.map((country, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center group transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="relative mb-4 w-20 h-14 overflow-hidden rounded-lg shadow-md border border-slate-100 group-hover:shadow-xl group-hover:border-brand-purple/30 transition-all">
                                            <img
                                                src={`https://flagcdn.com/w160/${getCountryCode(country)}.png`}
                                                alt={`${country} flag`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-brand-purple transition-colors">{country}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch h-full">
                            <div key={activeTab} className="space-y-6 animate-fade-in">
                                <h3 className="text-3xl font-bold whitespace-pre-line text-slate-900">{currentContent.title}</h3>

                                <div className="space-y-4">
                                    {currentContent.benefits.map((benefit, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex gap-4 hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 rounded-lg p-2 -mx-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                            style={{ animationDelay: `${idx * 150}ms` }}
                                        >
                                            <div className="w-1 rounded-full h-auto bg-[#8c52ef] shrink-0"></div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-slate-800">{benefit.title}</h4>
                                                <p className="text-slate-500 text-sm whitespace-pre-line">{benefit.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {currentContent.cta && (
                                    <button className="mt-8 px-6 py-3 border border-slate-200 rounded-lg font-bold text-sm hover:border-brand-purple hover:text-brand-purple text-slate-700 transition-colors">
                                        {currentContent.cta}
                                    </button>
                                )}
                            </div>

                            <div key={activeTab + '-img'} className={`bg-slate-50 rounded-2xl p-0 border border-slate-100 relative overflow-hidden h-full min-h-[400px] flex items-center justify-center ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                                {currentContent.image ? (
                                    <img
                                        src={currentContent.image}
                                        alt={currentContent.title}
                                        className="w-full h-full object-cover animate-ken-burns"
                                    />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                        <div className="relative z-10 text-center">
                                            {currentContent.icon}
                                            <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto mb-3 overflow-hidden">
                                                <div className={`w-2/3 h-full rounded-full animate-pulse ${currentContent.color.replace('bg-', 'bg-')}`}></div>
                                            </div>
                                            <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto"></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={48} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full size view"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </section>
    );
};

export default PersonaSelector;
