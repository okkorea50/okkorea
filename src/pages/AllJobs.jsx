import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const jobsCol = collection(db, 'jobs');
        const q = query(jobsCol, orderBy('date', 'desc'));

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
        <div className="w-full min-h-screen bg-brand-dark text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 pt-[160px] pb-[100px]">
                <div className="mb-12">
                    <h1 className="text-4xl font-black mb-4">전체 구직 정보 <span className="text-brand-purple">All Jobs</span></h1>
                    <p className="text-white/60">OK KOREA에서 제공하는 모든 최신 일자리 목록입니다.</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl h-[120px] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {jobs.map((job) => (
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
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AllJobs;
