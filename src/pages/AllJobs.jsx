import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const scrollToConsultation = () => {
        navigate('/?section=consultation');
    };

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
        <div className="w-full min-h-screen bg-[#080812] text-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 pt-[160px] pb-[100px]">
                <div className="mb-12">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">전체 구직 정보 <span className="text-[#FBBF24]">All Jobs</span></h1>
                    <p className="text-white/40 font-medium">OK KOREA에서 제공하는 모든 최신 실시간 일자리 목록입니다.</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg h-[100px] animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {jobs.map((job) => (
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
                        ))}
                    </div>
                )}
            </div>
            <Footer
                showCTA={true}
                ctaSubtitle="Apply Now"
                ctaButtonText="Get a Job"
                ctaAction={scrollToConsultation}
            />
        </div>
    );
};

export default AllJobs;
