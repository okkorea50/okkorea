import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import E7VisaInfo from '../components/E7VisaInfo';

const Work = () => {
    return (
        <div className="min-h-screen bg-[#0B0C15] text-white">
            <Navbar />
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                        Work in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Bridge your career to the Korean global market with specialized settlement and professional support.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholder for Table Menu / Content */}
                    <div className="pink-card-style rounded-3xl p-8 flex flex-col min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4 text-brand-purple">Career Consulting</h2>
                        <p className="text-slate-400 mb-6">Strategic planning for finding professional opportunities matched to your expertise.</p>
                        <ul className="space-y-3 text-sm text-slate-300 mt-auto">
                            <li>• Resume Localization</li>
                            <li>• Industry Analysis</li>
                            <li>• Networking Support</li>
                        </ul>
                    </div>

                    <div className="yellow-card-style rounded-3xl p-8 flex flex-col min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4 text-brand-orange">Visa & Settlement</h2>
                        <p className="text-slate-400 mb-6">Professional E-7, D-8, and F-series visa processing and administrative guidance.</p>
                        <ul className="space-y-3 text-sm text-slate-300 mt-auto">
                            <li>• Professional Employment Visa</li>
                            <li>• Startup & Investment</li>
                            <li>• Long-term Residency</li>
                        </ul>
                    </div>

                    <div className="green-card-style rounded-3xl p-8 flex flex-col min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4 text-blue-500">Business Matching</h2>
                        <p className="text-slate-400 mb-6">Connecting international talent with Korean corporations and fast-growing startups.</p>
                        <ul className="space-y-3 text-sm text-slate-300 mt-auto">
                            <li>• Partner Introductions</li>
                            <li>• Cultural Onboarding</li>
                            <li>• Compliance Check</li>
                        </ul>
                    </div>
                </div>

                <E7VisaInfo />
            </div>
            <Footer showCTA={false} />
        </div>
    );
};

export default Work;
