import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const BlogResources = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jobsCol = collection(db, 'jobs');
        const q = query(jobsCol, orderBy('date', 'desc'), limit(4));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const jobsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJobs(jobsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Fallback static styles for cards if data is missing or loading
    const cardStyles = [
        { bg: "bg-[#3B1C1C]", color: "text-white", subColor: "text-white/60" },
        { bg: "bg-[#D8B4FE]", color: "text-slate-900", subColor: "text-slate-700" },
        { bg: "bg-[#FEF08A]", color: "text-slate-900", subColor: "text-slate-700" },
        { bg: "bg-white", color: "text-slate-900", subColor: "text-slate-500", border: true }
    ];

    return (
        <section id="resources" className="py-[100px] px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Job Orders Here <span className="text-brand-purple">내 직업 찾기</span></h2>
                    </div>
                    <button className="px-6 py-2 bg-[#080812] text-white border border-white/10 rounded-full text-sm font-bold hover:border-brand-purple hover:shadow-[0_0_15px_rgba(124,77,255,0.4)] transition-all duration-300">View all jobs</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {loading ? (
                        // Skeleton/Loading State
                        [1, 2, 3, 4].map((n) => (
                            <div key={n} className="bg-white border border-slate-200 rounded-2xl p-8 aspect-video md:aspect-[4/3] animate-pulse"></div>
                        ))
                    ) : (
                        jobs.map((job, i) => {
                            const style = cardStyles[i % cardStyles.length];
                            return (
                                <div key={job.id} className={`${style.bg} bottom-feature-card rounded-2xl p-8 aspect-video md:aspect-[4/3] flex flex-col justify-center items-start text-left cursor-pointer hover:scale-105 transition-transform ${style.border ? 'border border-slate-200' : ''}`}>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${style.subColor} mb-2`}>{job.company} • {job.location}</span>
                                    <h3 className={`text-xl font-black ${style.color} uppercase tracking-tight leading-tight mb-4`}>{job.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.tags?.map(tag => (
                                            <span key={tag} className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-black/10 ${style.color}`}>{tag}</span>
                                        ))}
                                    </div>
                                    <span className={`text-xs font-bold ${style.color}`}>{job.salary}</span>
                                </div>
                            );
                        })
                    )}

                    {/* Add a placeholder if fewer than 4 jobs */}
                    {!loading && jobs.length < 4 && (
                        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 aspect-video md:aspect-[4/3] flex flex-col justify-center items-center text-center opacity-50">
                            <span className="text-sm font-bold text-slate-400">WAITING FOR MORE JOBS...</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogResources;
