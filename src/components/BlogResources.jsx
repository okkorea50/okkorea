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

    return (
        <section id="resources" className="pt-16 pb-12 px-6 bg-[#080812]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Your Job Orders <span className="text-brand-purple">내 직업 찾기</span></h2>
                        <p className="text-white/40 text-sm font-medium">실시간으로 업데이트되는 OK KOREA의 특별한 채용 정보를 확인하세요.</p>
                    </div>
                    <a
                        href="#/all-jobs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#FBBF24] hover:text-[#080812] hover:border-[#FBBF24] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300"
                    >
                        View All Jobs
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {loading ? (
                        [...Array(12)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg h-[100px] animate-pulse"></div>
                        ))
                    ) : (
                        jobs.map((job) => (
                            <div key={job.id} className="bg-[#12121A] border border-white/5 rounded-lg p-3 flex flex-col justify-between hover:border-[#FBBF24]/50 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] font-black text-[#FBBF24] uppercase tracking-tighter">{job.location}</span>
                                        <span className="text-[9px] font-extrabold text-[#FBBF24]/40 uppercase tracking-widest">{job.visa}</span>
                                    </div>
                                    <h3 className="text-[14px] font-bold text-white line-clamp-1 group-hover:text-[#FBBF24] transition-colors">{job.title}</h3>
                                </div>
                                <div className="mt-3 pt-2 border-t border-white/5 flex flex-col gap-1.5">
                                    <div className="text-[13px] font-black text-[#FBBF24] leading-tight">{job.salary}</div>
                                    <div className="flex flex-wrap gap-1">
                                        {(job.tags || []).map(tag => (
                                            <span key={tag} className="px-1.5 py-0.5 rounded-sm bg-[#FBBF24]/10 text-[#FBBF24] text-[9px] font-bold uppercase tracking-tight">{tag}</span>
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
