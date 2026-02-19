import React, { useState } from 'react';
import { GraduationCap, Briefcase, Rocket, Home, Globe } from 'lucide-react';

const PersonaSelector = () => {
    const [activeTab, setActiveTab] = useState('Who we are');

    const tabs = ['Who we are', 'History', 'Achievement', 'Networks', 'Partners'];

    const contentMap = {
        'Who we are': {
            title: "Who We Are",
            color: "bg-brand-purple",
            lightColor: "bg-brand-purple/20",
            borderColor: "border-brand-purple/20",
            benefits: [
                { title: "1999", desc: "01 서울 대치, 송파 영어/한국어 교육원 시작\n02 건국대 외국인 유학생 한국어 교육 지원", iconColor: "bg-brand-purple/20" },
                { title: "2007", desc: "01 싱가폴 교육법인 설립: 영어,한국어, 중국어, 일본어 교육\n02 어학 연수 프로그램 운영, 외국인 유학생 유치, 한국으로 송출\n03 동남아시아 교육, 무역 시장조사. 코트라, 한국산업인력공단, 인천경제통상진흥원", iconColor: "bg-brand-purple/30" },
                { title: "2016-22", desc: "01 국내 교육 서비스 및 컨설팅, 국내 대학 외국인 학생 유치 모집\n02 미국, 영국, 호주, 캐나다 유학 및 연수\n03 싱가폴 유학 및 취업 프로그램 운영\n04 외국인 유학생 모집 및 유치,관리, 해외 거점화 사업\n05 한국산업인력공단 K-move 사업", iconColor: "bg-brand-purple/40" },
                { title: "2025", desc: "01 국내 대학 해외거점화 연구용역\n02 외국인 근로자의 학생 전환 연구 용역\n03 외국인 유학생 모집 및 유치 해외 거점화 사업\n(네팔,베트남,캄보디아,태국,인도,싱가폴, 방글라데시, 스리랑카, 미얀마, 라오스, 몽골 등 현지 네트워크 구축)\n04 KF24 BIZ 시작\n05 자동차 판금 도장, 부품 제조원, 요양보호사 연구용역, 김포대학 외국인 지원", iconColor: "bg-brand-purple/50" }
            ],
            cta: null,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            icon: <GraduationCap size={80} className="text-brand-purple mx-auto mb-6 opacity-80" strokeWidth={1} />
        },
        'History': {
            title: "Land your dream job\nin Korea",
            color: "bg-blue-600",
            lightColor: "bg-blue-600/20",
            borderColor: "border-blue-600/20",
            benefits: [
                { title: "Resume Optimization", desc: "Tailor your CV to Korean standards instantly.", iconColor: "bg-blue-200" },
                { title: "Visa Sponsorship Match", desc: "Find companies willing to sponsor E-7 visas.", iconColor: "bg-green-200" }
            ],
            cta: "Find Jobs Now",
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
            cta: "Start Your Business",
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
                <div className="text-center mb-16">
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
                                    : 'bg-transparent text-slate-500 hover:bg-slate-100'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl border border-slate-100 min-h-[500px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center h-full">
                        <div className="space-y-6 animate-fade-in key={activeTab}">
                            <h3 className="text-3xl font-bold whitespace-pre-line text-slate-900">{currentContent.title}</h3>

                            <div className="space-y-4">
                                {currentContent.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className={`w-1 rounded-full h-auto ${benefit.iconColor}`}></div>
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

                        <div className="bg-slate-50 rounded-2xl p-0 border border-slate-100 relative overflow-hidden h-[400px] flex items-center justify-center animate-slide-up key={activeTab + '-img'}">
                            {currentContent.image ? (
                                <img
                                    src={currentContent.image}
                                    alt={currentContent.title}
                                    className="w-full h-full object-cover"
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
                </div>
            </div>
        </section>
    );
};

export default PersonaSelector;
