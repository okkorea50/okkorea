import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const BlogResources = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jobsCol = collection(db, 'jobs');
        // Fetch 12 jobs for 3 rows of 4 columns
        const q = query(jobsCol, orderBy('date', 'desc'), limit(12));

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

    // Dark neon themed styling for cards
    const cardStyles = [
        { bg: "bg-[#080812]", color: "text-white", subColor: "text-white/60", border: true },
        { bg: "bg-[#0B0C15]", color: "text-white", subColor: "text-white/40", border: true }
    ];

    const handleViewAll = () => {
        window.open('#/all-jobs', '_blank');
    };

    return (
        <section id="resources" className="py-[100px] px-6 bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Our Latest Job Listings <span className="text-brand-purple">실시간 구직 정보</span></h2>
                        <p className="text-sm text-white/60">현재 모집 중인 최신 일자리 정보를 확인하세요.</p>
                    </div>
                    <button
                        onClick={handleViewAll}
                        className="px-6 py-2 bg-brand-purple text-white rounded-full text-sm font-bold hover:shadow-[0_0_20px_rgba(124,77,255,0.6)] transition-all duration-300"
                    >
                        전체 보기 (All Jobs)
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {loading ? (
                        [...Array(12)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 aspect-[3/2] animate-pulse"></div>
                        ))
                    ) : (
                        jobs.map((job, i) => {
                            const style = cardStyles[i % cardStyles.length];
                            return (
                                <div key={job.id} className={`${style.bg} border border-white/10 rounded-xl p-4 aspect-[3/2] flex flex-col justify-between items-start text-left cursor-pointer hover:border-brand-purple/50 hover:shadow-[0_0_15px_rgba(124,77,255,0.2)] transition-all duration-300 group`}>
                                    <div>
                                        <div className="flex justify-between w-full items-start">
                                            <span className={`text-[9px] font-bold uppercase tracking-widest ${style.subColor}`}>{job.location}</span>
                                            <span className="px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple text-[8px] font-black uppercase">{job.visa}</span>
                                        </div>
                                        <h3 className={`text-sm font-bold ${style.color} line-clamp-2 mt-2 leading-tight group-hover:text-brand-purple transition-colors`}>{job.title}</h3>
                                    </div>
                                    <div className="w-full">
                                        <div className="h-[1px] w-full bg-white/5 mb-3"></div>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-[10px] font-bold ${style.color}`}>{job.salary}</span>
                                            <span className={`text-[8px] ${style.subColor}`}>{new Date(job.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogResources;
