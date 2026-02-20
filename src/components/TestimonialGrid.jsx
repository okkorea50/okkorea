import React from 'react';

const TestimonialGrid = () => {
    return (
        <section className="py-[100px] px-6 bg-[#0B0C15]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 relative">
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 -rotate-6 text-brand-purple font-handwriting text-2xl animate-bounce">See the insights!</span>
                    <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        Real results from<br />
                        real customers
                    </h2>
                    <p className="text-[18px] font-bold text-slate-400 mt-4 italic">
                        "진짜 고객이 증명하는 확실한 결과"
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Row 1 */}
                    <div className="point-card-style rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px]">
                        <div className="text-5xl font-black tracking-tighter text-white">92%<span className="text-2xl align-top">+</span></div>
                        <div className="font-medium">Visa Approval Rate</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50">Global Avg: 72%</div>
                    </div>

                    <div className="green-card-style rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px]">
                        <div className="text-5xl font-black tracking-tighter text-white">20<span className="text-2xl align-top">+</span></div>
                        <div className="font-medium">Partner Universities</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50">Across Korea</div>
                    </div>

                    <div className="bg-[#16162a] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-white/5 px-12 relative overflow-hidden group hover:border-brand-purple/50 transition-all duration-300">
                        <div className="text-xl font-medium text-white leading-relaxed relative z-10 transition-colors group-hover:text-white">
                            <p>"OK KOREA has helped revive our recruitment pipeline. We found 5 incredible developers in just 2 weeks!"</p>
                            <p className="text-sm text-slate-400 mt-2 font-normal">
                                "OK KOREA 덕분에 정체되었던 채용에 다시 활기가 돌기 시작했습니다.<br />
                                단 2주 만에 실력이 검증된 개발자 5명을 채용하는 성과를 거뒀습니다!"
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                👩‍💼
                            </div>
                            <div>
                                <div className="font-bold text-sm text-white">Sarah Kim</div>
                                <div className="text-xs text-slate-500">HR Director, SG service in Singapore</div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-[#16162a] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-white/5 px-12 group hover:border-brand-purple/50 transition-all duration-300">
                        <div className="text-xl font-medium text-white leading-relaxed">
                            <p>"The New Standard of Visa Support: Expert-led & Lightning-fast."</p>
                            <p className="text-sm text-slate-400 mt-2 font-normal">
                                "기존 대행사와는 차원이 다릅니다. 전문가들이 이끄는 철저하고 신속한<br />
                                비자 서류 준비로 걱정할 필요가 없었습니다."
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                👨‍🎓
                            </div>
                            <div>
                                <div className="font-bold text-sm text-white">Michael Chang</div>
                                <div className="text-xs text-slate-500">Student, China</div>
                            </div>
                        </div>
                    </div>

                    <div className="yellow-card-style rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px]">
                        <div className="text-4xl font-black tracking-tighter text-white line-clamp-2">2-3 weeks <span className="text-2xl align-top">faster</span></div>
                        <div className="font-medium leading-tight">Saved on process</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50">Fast Track</div>
                    </div>

                    <div className="pink-card-style rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px]">
                        <div className="text-5xl font-black tracking-tighter text-white">Top<span className="text-2xl align-top">15</span></div>
                        <div className="font-medium">Career Placement</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50">IN SEOUL and 5 Metropolitan cities in KOREA</div>
                    </div>

                    {/* Row 3 */}
                    <div className="green-card-style rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px]">
                        <div className="text-3xl font-black tracking-tighter text-white">E-7-1 ~ E-7-4</div>
                        <div className="font-medium leading-tight">Ready-To-Go Solution with Legal Experts</div>
                        <div className="font-bold text-xs mt-4 uppercase">AVG 95% Approved</div>
                    </div>

                    <div className="pink-card-style rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px]">
                        <div className="text-3xl font-black tracking-tighter text-white">D-2, D-4 Visa 30%-80%</div>
                        <div className="font-medium">Scholarship Base</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50">From Banks or Schools</div>
                    </div>

                    <div className="bg-[#16162a] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-white/5 px-12 group hover:border-brand-purple/50 transition-all duration-300">
                        <div className="leading-relaxed">
                            <p className="text-base font-medium text-white whitespace-nowrap">"Brian Kim created super-tailored settlement plans for me and my family"</p>
                            <p className="text-xs text-slate-400 mt-1 font-normal italic">
                                "대표님이 나와 나의 가족을 위해, 세상에 단 하나뿐인 초정밀 맞춤형 정착 플랜을<br />
                                설계해 주었습니다."
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                👨‍👩‍👧‍👦
                            </div>
                            <div>
                                <div className="font-bold text-sm text-white">David & Lisa</div>
                                <div className="text-xs text-slate-500">Family from India</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TestimonialGrid;
