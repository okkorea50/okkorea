import React, { useState } from 'react';
import { GraduationCap, Briefcase, Rocket, Home, Globe } from 'lucide-react';

const PersonaSelector = () => {
    const [activeTab, setActiveTab] = useState('Students');

    const tabs = ['Students', 'Job Seekers', 'Startups', 'Families', 'Expats'];

    const contentMap = {
        Students: {
            title: "Turning students into\nfuture leaders",
            color: "bg-brand-purple",
            lightColor: "bg-brand-purple/20",
            borderColor: "border-brand-purple/20",
            benefits: [
                { title: "Boost admission chances by 60%", desc: "AI-driven application strategy highlights strengths.", iconColor: "bg-brand-orange/20" },
                { title: "Save 100+ hours on prep", desc: "Automated document organizing and translation.", iconColor: "bg-brand-purple/20" }
            ],
            cta: "Explore Student Solutions",
            icon: <GraduationCap size={80} className="text-brand-purple mx-auto mb-6 opacity-80" strokeWidth={1} />
        },
        'Job Seekers': {
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
        Startups: {
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
        Families: {
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
        Expats: {
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
                        Built to empower<br />global citizens like you
                    </h2>
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
                                            <p className="text-slate-500 text-sm">{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-8 px-6 py-3 border border-slate-200 rounded-lg font-bold text-sm hover:border-brand-purple hover:text-brand-purple text-slate-700 transition-colors">
                                {currentContent.cta}
                            </button>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden h-[400px] flex items-center justify-center animate-slide-up key={activeTab + '-img'}">
                            {/* Abstract Illustration */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                            <div className="relative z-10 text-center">
                                {currentContent.icon}
                                <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto mb-3 overflow-hidden">
                                    <div className={`w-2/3 h-full rounded-full animate-pulse ${currentContent.color.replace('bg-', 'bg-')}`}></div>
                                </div>
                                <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonaSelector;
