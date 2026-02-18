import React, { forwardRef } from 'react';
import { Globe, Shield, Users } from 'lucide-react';

const BentoGrid = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="py-32 px-6 bg-slate-50 text-brand-text">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">Everything you need</h2>
                    <p className="text-xl text-slate-500">성공적인 정착을 위한 4가지 핵심 솔루션</p>
                </div>

                {/* Changed fixed height h-[800px] to min-h-[800px] or auto for responsiveness */}
                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-none md:grid-rows-2 gap-6 min-h-[800px]">
                    {/* Bento Item 1 (Large Left) */}
                    <div className="bento-item col-span-1 md:col-span-2 row-span-2 rounded-[2rem] bg-white p-10 shadow-xl border border-slate-100 relative overflow-hidden group min-h-[400px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 transition-transform group-hover:scale-150"></div>
                        <div className="h-full flex flex-col justify-between relative z-10">
                            <div>
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                                    <Globe size={24} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-slate-900">Total Settlement<br />Service</h3>
                                <p className="text-slate-500 text-lg">주거, 통신, 금융까지 한 번에 해결하세요.</p>
                            </div>
                            <img src="https://images.unsplash.com/photo-1565514020179-0c2235efe9cd?q=80&w=1000&auto=format&fit=crop" className="w-full h-1/2 object-cover rounded-2xl shadow-lg transform group-hover:translate-y-2 transition-transform mt-8" alt="Settlement Services Illustration" />
                        </div>
                    </div>

                    {/* Bento Item 2 (Top Right) */}
                    <div className="bento-item rounded-[2rem] bg-[#F8FAFC] p-8 shadow-lg border border-slate-100 hover:border-brand-purple/50 transition-colors min-h-[250px]">
                        <Shield className="text-brand-purple mb-4" size={40} />
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Legal Protection</h3>
                        <p className="text-slate-500 text-sm">전문 변호사의 법률 자문 서비스 제공</p>
                    </div>

                    {/* Bento Item 3 (Bottom Right) */}
                    <div className="bento-item rounded-[2rem] bg-[#FFF7ED] p-8 shadow-lg border border-orange-100 hover:border-brand-orange/50 transition-colors min-h-[250px]">
                        <Users className="text-brand-orange mb-4" size={40} />
                        <h3 className="text-xl font-bold mb-2 text-slate-900">Community</h3>
                        <p className="text-slate-500 text-sm">5,000명 이상의 글로벌 커뮤니티</p>
                    </div>
                </div>
            </div>
        </section>
    );
});

BentoGrid.displayName = 'BentoGrid';
export default BentoGrid;
