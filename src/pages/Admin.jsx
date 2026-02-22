import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Admin = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#080812] text-white flex flex-col font-['Inter']">
            <Navbar />

            <main className="flex-1 pt-[120px] pb-[60px] px-6">
                <div className="max-w-7xl mx-auto text-center py-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        Management Console
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                        Admin Portal<br />
                        <span className="text-brand-purple italic">관리자 패널</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-white/40 font-medium mb-12">
                        Welcome to the OK KOREA Administration Panel.
                        This area is restricted to authorized administrative personnel.
                        Content management and user analytics will be displayed here soon.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="bg-[#12121A] border border-white/5 p-8 rounded-3xl hover:border-brand-purple/30 transition-all group">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                👥
                            </div>
                            <h3 className="font-bold text-lg mb-2">User Management</h3>
                            <p className="text-white/30 text-xs">Manage registered students and educators</p>
                        </div>
                        <div className="bg-[#12121A] border border-white/5 p-8 rounded-3xl hover:border-brand-purple/30 transition-all group">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                📚
                            </div>
                            <h3 className="font-bold text-lg mb-2">Course Editor</h3>
                            <p className="text-white/30 text-xs">Create and update educational content</p>
                        </div>
                        <div className="bg-[#12121A] border border-white/5 p-8 rounded-3xl hover:border-brand-purple/30 transition-all group">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                💼
                            </div>
                            <h3 className="font-bold text-lg mb-2">Job Listings</h3>
                            <p className="text-white/30 text-xs">Post and manage real-time job opportunities</p>
                        </div>
                    </div>

                    <div className="mt-16">
                        <button
                            onClick={handleLogout}
                            className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-purple hover:border-brand-purple transition-all"
                        >
                            Secure Sign Out
                        </button>
                    </div>
                </div>
            </main>

            {/* Admin page has no CTA by default */}
            <Footer showCTA={false} />
        </div>
    );
};

export default Admin;
