import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
                    <div className="bg-[#13141C] border border-white/5 p-8 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-brand-purple">University Admission</h2>
                        <p className="text-slate-400 mb-6">Expert consulting for undergraduate and graduate applications to Korea's top universities.</p>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• Document Preparation</li>
                            <li>• Personal Statement Review</li>
                            <li>• Interview Coaching</li>
                        </ul>
                    </div>

                    <div className="bg-[#13141C] border border-white/5 p-8 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-brand-orange">Language Programs</h2>
                        <p className="text-slate-400 mb-6">Find the perfect Korean language course hosted by prestigious institutions.</p>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• D-4 Visa Support</li>
                            <li>• Institution Comparison</li>
                            <li>• Housing Assistance</li>
                        </ul>
                    </div>

                    <div className="bg-[#13141C] border border-white/5 p-8 rounded-3xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-blue-500">Scholarship Support</h2>
                        <p className="text-slate-400 mb-6">Maximize your chances for GKS and university-specific scholarships.</p>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li>• Application Strategy</li>
                            <li>• Merit-based Awards</li>
                            <li>• Financial Aid Planning</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Study;
