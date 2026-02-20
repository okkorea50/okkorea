import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const BlogResources = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jobsCol = collection(db, 'jobs');
        // Main view: 12 jobs (3 rows if 4 columns)
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

    const handleViewAll = () => {
        window.open('#/all-jobs', '_blank');
    };

    return (
        <section id="resources" className="py-[100px] px-6 bg-[#080812]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Your Job Orders <span className="text-brand-purple">내 직업 찾기</span></h2>
                        <p className="text-white/40 text-sm font-medium">실시간으로 업데이트되는 OK KOREA의 특별한 채용 정보를 확인하세요.</p>
                    </div>
                    <button
                        onClick={handleViewAll}
                        className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand-purple hover:border-brand-purple hover:shadow-[0_0_20px_rgba(124,77,255,0.4)] transition-all duration-300"
                    >
                        View All Jobs
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {loading ? (
                        [...Array(12)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl h-[120px] animate-pulse"></div>
                        ))
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className="bg-[#12121A] border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-brand-purple/50 transition-all duration-300 group hover:-translate-y-1">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-bold text-brand-purple uppercase tracking-tight">{job.location}</span>
                                        <span className="text-[9px] font-black text-white/20 uppercase">{job.visa}</span>
                                    </div>
                                    <h3 className="text-[14px] font-bold text-white line-clamp-1 group-hover:text-brand-purple transition-colors mb-1">{job.title}</h3>
                                </div>
                                <div className="mt-auto">
                                    <div className="text-[12px] font-black text-white mb-2">{job.salary}</div>
                                    <div className="flex flex-wrap gap-1">
                                        {(job.tags || []).slice(0, 2).map(tag => (
                                            <span key={tag} className="px-1.5 py-0.5 rounded-sm bg-white/5 text-white/40 text-[8px] font-bold uppercase tracking-tighter">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogResources;
