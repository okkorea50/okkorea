import React, { forwardRef } from 'react';
import { Zap } from 'lucide-react';
import imgAriel from '../assets/team-ariel.jpg';
import imgAnna from '../assets/team-anna.jpg';
import imgEric from '../assets/team-eric.jpg';

const FeatureSection = forwardRef((props, ref) => {
    const teamMembers = [
        {
            name: "Ariel",
            role: "Admin Expert",
            desc: "차분하고 꼼꼼한 행정 전문가. 깔끔하고 정확한 서류 정리로 인기가 높습니다. 자주 옥상에 올라가 머리를 식히곤 합니다.",
            img: imgAriel
        },
        {
            name: "Anna",
            role: "Chief Team Leader",
            desc: "수석 팀장. 열받으면 대표도 못 말리는 그녀이지만, 웃는 모습이 아름답습니다. 국제 교류 및 협력, 국내 업무를 총괄합니다.",
            img: imgAnna
        },
        {
            name: "Eric",
            role: "Global Manager",
            desc: "미국 대학 시절부터 다져진 친화력으로 국내 유학을 담당하며 전국을 누비는 전문가입니다. 본인이 인기남이었다고 합니다.",
            img: imgEric
        }
    ];

    return (
        <section ref={ref} id="features" className="py-32 px-6 bg-brand-dark text-white overflow-hidden relative">
            {/* Background Glows for Dark Mode */}
            <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                <div className="space-y-8 lg:w-2/5">
                    <div className="inline-block px-4 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold text-sm border border-brand-purple/30 animate-fade-in">
                        Creative Experts
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight">
                        Meet Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Professional.</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        실행력과 전문성을 갖춘 OK KOREA의 핵심 인재들입니다.
                    </p>

                    <div className="space-y-4">
                        {[
                            "체계적인 행정 및 리스크 관리",
                            "글로벌 파트너십 및 전략 총괄",
                            "현장 중심의 국내 유학/채용 매칭"
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group w-fit pr-8 opacity-0 animate-slide-in-left"
                                style={{ animationDelay: `${0.2 + i * 0.2}s`, animationFillMode: 'forwards' }}
                            >
                                <Zap className="text-brand-orange fill-brand-orange group-hover:scale-110 transition-transform" />
                                <span className="font-bold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Window frame - Wide Layout */}
                <div className="relative lg:flex-1 w-full lg:min-w-[600px] animate-float">
                    <style>{`
                        @keyframes slide-in-left {
                            from { opacity: 0; transform: translateX(-30px); }
                            to { opacity: 1; transform: translateX(0); }
                        }
                        @keyframes float-window {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                        .animate-float {
                            animation: float-window 4s ease-in-out infinite;
                        }
                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-thumb { 
                            background: rgba(255, 255, 255, 0.1); 
                            border-radius: 10px; 
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: rgba(255, 255, 255, 0.2);
                        }
                    `}</style>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-orange blur-[40px] opacity-20"></div>
                    <div className="relative rounded-2xl bg-[#151621] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700">
                        {/* Fake Window Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">OK KOREA TEAM_INFO</span>
                        </div>

                        {/* Scrollable Body */}
                        <div className="max-h-[500px] overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar">
                            {teamMembers.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.06] hover:translate-x-2 transition-all duration-300 group/card border-b last:border-b-0 border-white/5"
                                >
                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-brand-purple/50 flex-shrink-0 group-hover/card:border-brand-orange transition-all duration-500 shadow-2xl transform group-hover/card:scale-105">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left space-y-2">
                                        <h4 className="text-white font-bold text-xl flex items-center justify-center md:justify-start gap-3">
                                            {member.name}
                                            <span className="text-[10px] px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold uppercase tracking-wider border border-brand-purple/30">
                                                {member.role}
                                            </span>
                                        </h4>
                                        <p className="text-[#e0e0e0] text-sm leading-relaxed font-medium">
                                            {member.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

FeatureSection.displayName = 'FeatureSection';
export default FeatureSection;
