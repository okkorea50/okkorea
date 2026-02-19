import React from 'react';

const TestimonialGrid = () => {
    return (
        <section className="py-32 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 relative">
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 -rotate-6 text-brand-purple font-handwriting text-2xl animate-bounce">See the insights!</span>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                        Real results from<br />
                        real customers <span className="text-[18px] font-medium text-slate-500 block md:inline md:ml-4">진짜 고객이 증명하는 확실한 결과</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Row 1 */}
                    <div className="bg-[#FEF08A] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">98%<span className="text-2xl align-top">+</span></div>
                        <div className="font-medium text-slate-800">Visa Approval Rate</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Global Avg: 72%</div>
                    </div>

                    <div className="bg-[#86EFAC] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">150<span className="text-2xl align-top">+</span></div>
                        <div className="font-medium text-slate-800">Partner Universities</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Across Korea</div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12 relative overflow-hidden">
                        <p className="text-xl font-medium text-slate-900 leading-relaxed relative z-10">
                            "OK KOREA has helped revive our recruitment pipeline. We found 5 incredible developers in just 2 weeks!"
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-slate-300 rounded-full flex-shrink-0"></div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">Sarah Kim</div>
                                <div className="text-xs text-slate-500">HR Director, Toss Lab</div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12">
                        <p className="text-xl font-medium text-slate-900 leading-relaxed">
                            "Having the ability to automate visa paperwork with AI guidance was a huge upgrade from typical agencies."
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-slate-300 rounded-full flex-shrink-0"></div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">Michael Chang</div>
                                <div className="text-xs text-slate-500">Student, Yonsei Univ.</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FDE047] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">2<span className="text-2xl align-top">mo</span></div>
                        <div className="font-medium text-slate-800">Saved on process</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Fast Track</div>
                    </div>

                    <div className="bg-[#FBCFE8] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">Top<span className="text-2xl align-top">10</span></div>
                        <div className="font-medium text-slate-800">Career Placement</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Major Firms</div>
                    </div>

                    {/* Row 3 */}
                    <div className="bg-[#E9D5FF] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">9<span className="text-2xl align-top">x</span></div>
                        <div className="font-medium text-slate-800">ROI on Tuition</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Avg. 1st Year</div>
                    </div>

                    <div className="bg-[#FBCFE8] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
                        <div className="text-5xl font-black text-slate-900 tracking-tighter">4<span className="text-2xl align-top">x</span></div>
                        <div className="font-medium text-slate-800">Scholarship Base</div>
                        <div className="font-bold text-xs mt-4 uppercase opacity-50 text-slate-900">Founding</div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12">
                        <p className="text-xl font-medium text-slate-900 leading-relaxed">
                            "We created super-tailored settlement plans for our family, freeing us to focus on enjoying Seoul."
                        </p>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 bg-slate-300 rounded-full flex-shrink-0"></div>
                            <div>
                                <div className="font-bold text-sm text-slate-900">David & Lisa</div>
                                <div className="text-xs text-slate-500">Expats from UK</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TestimonialGrid;
