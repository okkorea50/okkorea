import React, { forwardRef } from 'react';
import { Zap } from 'lucide-react';

const FeatureSection = forwardRef((props, ref) => {
    const teamMembers = [
        {
            name: "Ariel",
            role: "Admin Expert",
            desc: "차분하고 꼼꼼한 행정 전문가. 깔끔하고 정확한 서류 정리로 인기가 높습니다.",
            img: "team/ariel.jpg"
        },
        {
            name: "Anna",
            role: "Chief Team Leader",
            desc: "수석 팀장. 국제 교류 및 협력 총괄 전문가입니다.",
            img: "team/anna.jpg"
        },
        {
            name: "Eric",
            role: "Global Manager",
            desc: "국내 유학 담당. 미국 대학 시절부터 다져진 친화력으로 전국을 누비는 전문가입니다.",
            img: "team/eric.jpg"
        }
    ];

    return (
        <section ref={ref} id="features" className="py-32 px-6 bg-brand-dark text-white overflow-hidden relative">
            {/* Background Glows for Dark Mode */}
            <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold text-sm border border-brand-purple/30">
                        Creative Experts
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight">
                        Meet Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Professional.</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        각 분야의 전문가들이 모여 비즈니스의 혁신을 이끕니다.<br />
                        실행력과 전문성을 갖춘 OK KOREA의 핵심 인재들입니다.
                    </p>

                    <div className="space-y-4">
                        {[
                            "체계적인 행정 및 리스크 관리",
                            "글로벌 파트너십 및 전략 총괄",
                            "현장 중심의 국내 유학/채용 매칭"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                <Zap className="text-brand-orange fill-brand-orange group-hover:scale-110 transition-transform" />
                                <span className="font-bold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Window frame */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-orange blur-[40px] opacity-20"></div>
                    <div className="relative rounded-2xl bg-[#151621] border border-white/10 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700 overflow-hidden">
                        {/* Fake Window Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">OK KOREA Team_info</span>
                        </div>

                        {/* Scrollable Body */}
                        <div className="max-h-[450px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 transition-all custom-scrollbar">
                            <style>{`
                                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                                .custom-scrollbar::-webkit-scrollbar-thumb { 
                                    background: rgba(255, 255, 255, 0.1); 
                                    border-radius: 10px; 
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: rgba(255, 255, 255, 0.2);
                                }
                            `}</style>
                            {teamMembers.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-5 p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:translate-x-2 transition-all duration-300 group/card"
                                >
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-purple/50 flex-shrink-0 group-hover/card:border-brand-orange transition-colors duration-500 shadow-lg">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                                            {member.name}
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple font-medium uppercase tracking-tighter border border-brand-purple/30">
                                                {member.role}
                                            </span>
                                        </h4>
                                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
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
