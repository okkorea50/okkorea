import React from 'react';

const BlogResources = () => {
    return (
        <section id="resources" className="py-20 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-400 mb-2">Level-up your Korea game</h2>
                    </div>
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors text-slate-600">View all articles</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { bg: "bg-[#3B1C1C]", title: "MADE FOR YOU IN 2026", sub: "Visa Insights", color: "text-white", subColor: "text-white/60" },
                        { bg: "bg-[#D8B4FE]", title: "FIND A CEO'S EMAIL", sub: "Job Hunting", color: "text-slate-900", subColor: "text-slate-700" },
                        { bg: "bg-[#FEF08A]", title: "MADE FOR YOU DEC 2025", sub: "Trend Report", color: "text-slate-900", subColor: "text-slate-700" },
                        { bg: "bg-white", title: "Duo Inbox", sub: "Product Update", color: "text-slate-900", subColor: "text-slate-500", border: true }
                    ].map((card, i) => (
                        <div key={i} className={`${card.bg} rounded-2xl p-8 aspect-video md:aspect-[4/3] flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform ${card.border ? 'border border-slate-200' : ''}`}>
                            <h3 className={`text-2xl font-black ${card.color} uppercase tracking-tighter leading-none mb-2`}>{card.title}</h3>
                            {/* Fix: Added code to render the 'sub' field */}
                            <span className={`text-sm font-bold uppercase tracking-widest ${card.subColor || 'text-slate-500'}`}>{card.sub}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogResources;
