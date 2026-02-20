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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 aspect-[3/2] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-[#080812] border border-white/10 rounded-xl p-4 aspect-[3/2] flex flex-col justify-between items-start text-left cursor-pointer hover:border-brand-purple/50 hover:shadow-[0_0_15px_rgba(124,77,255,0.2)] transition-all duration-300 group">
                                <div>
                                    <div className="flex justify-between w-full items-start">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">{job.location}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple text-[8px] font-black uppercase">{job.visa}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white line-clamp-2 mt-2 leading-tight group-hover:text-brand-purple transition-colors">{job.title}</h3>
                                </div>
                                <div className="w-full">
                                    <div className="h-[1px] w-full bg-white/5 mb-3"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-white">{job.salary}</span>
                                        <span className="text-[8px] text-white/40">{new Date(job.date).toLocaleDateString()}</span>
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
