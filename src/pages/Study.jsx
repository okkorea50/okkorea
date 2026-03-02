import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VisaInfo from '../components/VisaInfo';

const Study = () => {
    return (
        <div className="min-h-screen bg-[#0B0C15] text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Study in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Your comprehensive guide to academic opportunities, university admissions, and student life in South Korea.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder for Table Menu / Content */}
                    <div className="pink-card-style rounded-3xl p-8 flex flex-col min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4 text-brand-purple">University Admission</h2>
                        <p className="text-slate-400 mb-6">Expert consulting for undergraduate and graduate applications to Korea's top universities.</p>
                        <ul className="space-y-3 text-sm text-slate-300 mt-auto">
                            <li>• Document Preparation</li>
                            <li>• Personal Statement Review</li>
                            <li>• Interview Coaching</li>
                        </ul>
                    </div>

                    <div className="yellow-card-style rounded-3xl p-8 flex flex-col min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4 text-brand-orange">Language Programs</h2>
                        <p className="text-slate-400 mb-6">Find the perfect Korean language course hosted by prestigious institutions.</p>
                        <ul className="space-y-3 text-sm text-slate-300 mt-auto">
                            <li>• D-4 Visa Support</li>
                            <li>• Institution Comparison</li>
                            <li>• Housing Assistance</li>
                        </ul>
                    </div>

                    <div className="green-card-style rounded-3xl p-8 flex flex-col min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4 text-blue-500">Scholarship Support</h2>
                        <p className="text-slate-400 mb-6">Maximize your chances for GKS and university-specific scholarships.</p>
                        <ul className="space-y-3 text-sm text-slate-300 mt-auto">
                            <li>• Application Strategy</li>
                            <li>• Merit-based Awards</li>
                            <li>• Financial Aid Planning</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 border-t border-white/5 pt-20">
                    <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-tighter">
                        Sample <span className="text-brand-purple">Lectures</span>
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[#12121A] border border-brand-purple/20 rounded-3xl overflow-hidden shadow-2xl group">
                            <div className="aspect-video bg-black/40 flex items-center justify-center relative overflow-hidden">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/nJNVucTqc0k"
                                    title="OKKorea Sample Lecture"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                                <div className="absolute inset-0 bg-brand-purple/5 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-purple transition-colors">Study in Korea: Your Ultimate Guide</h3>
                                    <span className="bg-brand-purple/20 text-brand-purple text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-brand-purple/30">
                                        Free Sample
                                    </span>
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    Get a glimpse into our high-quality video content. Our expert instructors provide clear, concise, and engaging lessons designed to help you master the Korean language and excel in your TOPIK exams.
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 text-sm">Duration:</span>
                                        <span className="text-white font-bold text-sm text-[12px]">Shorts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-500 text-sm">Instructor:</span>
                                        <span className="text-white font-bold text-sm text-[12px]">OKKorea Staff</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New components for more details */}
                <VisaInfo />
            </div>
            <Footer showCTA={false} />
        </div>
    );
};

export default Study;
