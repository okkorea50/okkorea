import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserManagement from '../components/UserManagement';
import CourseEditor from '../components/CourseEditor'; // ✨ 강의 편집기 컴포넌트 불러오기

const Admin = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // ✨ 현재 보여줄 화면 상태 관리 ('dashboard', 'users', 'courses', 'jobs')
    const [activeView, setActiveView] = useState('dashboard');

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
                <div className="max-w-7xl mx-auto py-10">

                    {/* ✨ 대시보드 화면일 때만 타이틀과 카드들 보여주기 */}
                    {activeView === 'dashboard' ? (
                        <div className="text-center">
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
                                {/* ✨ User Management 카드에 onClick 추가 */}
                                <div
                                    onClick={() => setActiveView('users')}
                                    className="bg-[#12121A] border border-white/5 p-8 rounded-3xl hover:border-brand-purple/30 transition-all group cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                        👥
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">User Management</h3>
                                    <p className="text-white/30 text-xs">Manage registered students and educators</p>
                                </div>

                                <div
                                    onClick={() => setActiveView('courses')}
                                    className="bg-[#12121A] border border-white/5 p-8 rounded-3xl hover:border-brand-purple/30 transition-all group cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                                        📚
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Course Editor</h3>
                                    <p className="text-white/30 text-xs">Create and update educational content</p>
                                </div>

                                <div
                                    onClick={() => setActiveView('jobs')}
                                    className="bg-[#12121A] border border-white/5 p-8 rounded-3xl hover:border-brand-purple/30 transition-all group cursor-pointer"
                                >
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
                    ) : activeView === 'users' ? (
                        /* ✨ User Management 화면 렌더링 */
                        <UserManagement onBack={() => setActiveView('dashboard')} />
                    ) : activeView === 'courses' ? (
                        /* ✨ Course Editor 화면 렌더링 */
                        <CourseEditor onBack={() => setActiveView('dashboard')} />
                    ) : (
                        /* ✨ 나머지 미개발 화면 렌더링 */
                        <div className="text-center py-20">
                            <h2 className="text-3xl text-white font-bold mb-6">🛠️ 개발 중인 기능입니다</h2>
                            <button
                                onClick={() => setActiveView('dashboard')}
                                className="px-6 py-3 bg-brand-purple rounded-xl font-bold"
                            >
                                돌아가기
                            </button>
                        </div>
                    )}

                </div>
            </main>

            <Footer showCTA={false} />
        </div>
    );
};

export default Admin;
