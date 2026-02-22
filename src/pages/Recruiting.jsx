import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Zap, Briefcase, GraduationCap, Clock, MapPin, ChevronRight } from 'lucide-react';

const Recruiting = () => {
    const [urgentJobs, setUrgentJobs] = useState([]);
    const [studentJobs, setStudentJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const scrollToConsultation = () => {
        navigate('/?section=consultation');
    };

    useEffect(() => {
        const jobsCol = collection(db, 'jobs');

        // Fetch all jobs and we'll filter them locally for simpler logic, 
        // or we could use multiple queries if preferred.
        // For 'Now Recruiting', we might want to prioritize jobs with specific tags like 'urgent' or 'D-2'
        const q = query(jobsCol, orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Urgent Job Orders (e.g., E-9, E-7 types but prioritized)
            setUrgentJobs(allData.filter(job => !job.visa.includes('D-2')).slice(0, 8));

            // International Student Recruitment (D-2 visa jobs)
            setStudentJobs(allData.filter(job => job.visa.includes('D-2')));

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const JobCard = ({ job }) => (
        <div className="bg-[#12121A] border border-white/5 rounded-2xl p-5 hover:border-[#FBBF24]/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FBBF24]/5 blur-[40px] pointer-events-none"></div>
            <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 bg-[#FBBF24]/10 rounded-full border border-[#FBBF24]/20">
                    <span className="text-[10px] font-black text-[#FBBF24] uppercase tracking-wider">{job.visa}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-medium">
                    <Clock size={12} />
                    {new Date(job.date).toLocaleDateString()}
                </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FBBF24] transition-colors">{job.title}</h3>
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin size={14} className="text-[#FBBF24]" />
                    {job.location}
                </div>
                <div className="text-[#FBBF24] font-black text-lg">{job.salary}</div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
                {(job.tags || []).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-tight border border-white/5">{tag}</span>
                ))}
            </div>
            <button
                onClick={scrollToConsultation}
                className="w-full py-2.5 bg-white/5 hover:bg-[#FBBF24] text-white hover:text-[#080812] border border-white/10 hover:border-[#FBBF24] rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
                Apply Now <ChevronRight size={14} />
            </button>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#080812] text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-[180px] pb-[80px] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[#FBBF24] font-black text-xs uppercase tracking-widest mb-6 animate-pulse">
                        <Zap size={14} /> Urgent Vacancies
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                        Now <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#f97316]">Recruiting</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        OK KOREA에서 엄선한 실시간 급구 공고를 확인하세요. <br className="hidden md:block" />
                        유학생 전용 일자리부터 전문 취업 비자 공고까지 모두 모았습니다.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-[120px] space-y-24">

                {/* Student Jobs Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-orange rounded-2xl flex items-center justify-center shadow-lg shadow-brand-purple/20">
                            <GraduationCap className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight uppercase">International Student <span className="text-brand-purple">Recruitment</span></h2>
                            <p className="text-white/40 font-bold">현재 모집 중인 공고입니다.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl h-[280px] animate-pulse"></div>
                            ))}
                        </div>
                    ) : studentJobs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {studentJobs.map(job => <JobCard key={job.id} job={job} />)}
                        </div>
                    ) : (
                        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 text-center">
                            <p className="text-white/20 font-bold text-lg mb-4">현재 업데이트된 공고가 없습니다.</p>
                            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Coming Soon</button>
                        </div>
                    )}
                </section>

                {/* Urgent Job Orders Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FBBF24] to-[#f59e0b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FBBF24]/20">
                            <Briefcase className="text-[#080812]" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tight uppercase text-[#FBBF24]">Urgent <span className="text-white">Job Orders</span></h2>
                            <p className="text-white/40 font-bold">지금 바로 지원 가능한 긴급 구인 목록입니다.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl h-[280px] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {urgentJobs.map(job => <JobCard key={job.id} job={job} />)}
                        </div>
                    )}
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Recruiting;
