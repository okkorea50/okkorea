import React, { forwardRef } from 'react';
import { Zap } from 'lucide-react';

const FeatureSection = forwardRef((props, ref) => {
    return (
        <section ref={ref} id="features" className="py-32 px-6 bg-brand-dark text-white overflow-hidden relative">
            {/* Background Glows for Dark Mode */}
            <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <div className="inline-block px-4 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold text-sm border border-brand-purple/30">
                        AI-Powered Solution
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black leading-tight">
                        Transform your<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea Journey.</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        데이터 기반의 매칭 시스템으로 당신에게 가장 완벽한 대학과 직장을 찾아드립니다.
                        OK KOREA의 독보적인 AI 알고리즘을 경험하세요.
                    </p>

                    <div className="space-y-4">
                        {[
                            "실시간 비자 자격 진단",
                            "빅데이터 기반 대학/전공 추천",
                            "기업 채용 공고 자동 매칭"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <Zap className="text-brand-orange fill-brand-orange" />
                                <span className="font-bold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dark UI Mockup */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-orange blur-[40px] opacity-20"></div>
                    <div className="relative rounded-2xl bg-[#151621] border border-white/10 p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 p-4 border-b border-white/5 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="space-y-4 p-4">
                            <div className="h-40 rounded-lg bg-white/5 animate-pulse"></div>
                            <div className="h-8 w-2/3 rounded-lg bg-white/5"></div>
                            <div className="h-8 w-1/2 rounded-lg bg-white/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

FeatureSection.displayName = 'FeatureSection';
export default FeatureSection;
