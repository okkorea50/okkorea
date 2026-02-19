import React from 'react';

const TestimonialGrid = () => {
    return (
        <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 relative">
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 -rotate-6 text-brand-purple font-handwriting text-2xl animate-bounce">See the insights!</span>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                        Real results from<br />
                        real customers
                    </h2>
                    <p className="text-[18px] font-bold text-slate-500 mt-4 italic">
                        "진짜 고객이 증명하는 확실한 결과"
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Row 1 */}
                    <div className="bg-[#FEF08A] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">92%<span className="text-2xl align-top">+</span></div>
                        <div className="font-medium text-slate-800">Visa Approval Rate</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Global Avg: 72%</div>
                    </div>

                    <div className="bg-[#86EFAC] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">20<span className="text-2xl align-top">+</span></div>
                        <div className="font-medium text-slate-800">Partner Universities</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Across Korea</div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12 relative overflow-hidden">
                        <div className="text-xl font-medium text-slate-900 leading-relaxed relative z-10">
                            <p>"OK KOREA has helped revive our recruitment pipeline. We found 5 incredible developers in just 2 weeks!"</p>
                            <p className="text-sm text-slate-500 mt-2 font-normal">
                                "OK KOREA 덕분에 정체되었던 채용에 다시 활기가 돌기 시작했습니다.<br />
                                단 2주 만에 실력이 검증된 개발자 5명을 채용하는 성과를 거뒀습니다!"
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                👩‍💼
                            </div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">Sarah Kim</div>
                                <div className="text-xs text-slate-500">HR Director, SG service in Singapore</div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12">
                        <div className="text-xl font-medium text-slate-900 leading-relaxed">
                            <p>"The New Standard of Visa Support: Expert-led & Lightning-fast."</p>
                            <p className="text-sm text-slate-500 mt-2 font-normal">
                                "기존 대행사와는 차원이 다릅니다. 전문가들이 이끄는 철저하고 신속한<br />
                                비자 서류 준비로 걱정할 필요가 없었습니다."
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                👨‍🎓
                            </div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">Michael Chang</div>
                                <div className="text-xs text-slate-500">Student, China</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FDE047] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-4xl font-black text-slate-900 tracking-tighter line-clamp-2">2-3 weeks <span className="text-2xl align-top">faster</span></div>
                        <div className="font-medium text-slate-800">Saved on process</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Fast Track</div>
                    </div>

                    <div className="bg-[#FBCFE8] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">Top<span className="text-2xl align-top">15</span></div>
                        <div className="font-medium text-slate-800">Career Placement</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">IN SEOUL and 5 Metropolitan cities in KOREA</div>
                    </div>

                    {/* Row 3 */}
                    <div className="bg-[#E9D5FF] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">E-7-1 ~ E-7-4</div>
                        <div className="font-medium text-slate-800 leading-tight">Ready-To-Go Solution with Legal Experts</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">AVG 95% Approved</div>
                    </div>

                    <div className="bg-[#FBCFE8] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-3xl font-black text-slate-900 tracking-tighter">D-2, D-4 Visa 30%-80%</div>
                        <div className="font-medium text-slate-800">Scholarship Base</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">From Banks or Schools</div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12">
                        <div className="leading-relaxed">
                            <p className="text-base font-medium text-slate-900">"We created super-tailored settlement plans for you and your family"</p>
                            <p className="text-xs text-slate-500 mt-1 font-normal italic">
                                "당신과 당신의 가족을 위해, 세상에 단 하나뿐인 초정밀 맞춤형 정착 플랜을 설계했습니다."
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                👨‍👩‍👧‍👦
                            </div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">David & Lisa</div>
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
