import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MOCK_COURSES = [
    {
        id: 'part01',
        title: 'Part 01: 한국어 기초',
        subtitle: '자음과 모음 (Consonants & Vowels)',
        progress: 100,
        category: 'Foundations',
        lessons: 12,
        image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'part03',
        title: 'Part 03: 일상 대화',
        subtitle: '인사와 소개 (Greetings & Intro)',
        progress: 65,
        category: 'Conversation',
        lessons: 8,
        image: 'https://images.unsplash.com/photo-1523240715638-752bd1e43e33?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'part04',
        title: 'Part 04: 비즈니스 한국어',
        subtitle: '직장 예절과 소통 (Work Ethic)',
        progress: 12,
        category: 'Business',
        lessons: 15,
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 'part08',
        title: 'Part 08: 심화 문법',
        subtitle: 'TOPIK II 준비 (Advanced TOPIK)',
        progress: 0,
        category: 'Exam Prep',
        lessons: 20,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'
    },
];

const Dashboard = () => {
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
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                                My Page<br />
                                <span className="text-brand-purple">마이 페이지</span>
                            </h1>
                            <p className="text-white/40 font-medium">환영합니다, {user?.displayName || user?.email?.split('@')[0]}님!</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* User Profile Card */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-[#12121A] border border-white/5 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-blue rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-brand-purple/20">
                                            {user?.displayName?.[0] || user?.email?.[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-xl">{user?.displayName || 'User'}</h2>
                                            <p className="text-white/40 text-xs truncate max-w-[150px]">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Completed</p>
                                            <p className="text-xl font-black text-brand-purple">12 <span className="text-[10px] text-white/20">Lessons</span></p>
                                        </div>
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Learning</p>
                                            <p className="text-xl font-black text-brand-blue">3 <span className="text-[10px] text-white/20">Courses</span></p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Rank</span>
                                            <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest">TOP 15%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements/Badges Mini Section */}
                            <div className="bg-[#12121A] border border-white/5 rounded-3xl p-8 shadow-xl">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6">Badges Earned</h3>
                                <div className="flex gap-4">
                                    {['🔥', '🎯', '⭐'].map((emoji, i) => (
                                        <div key={i} className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl hover:scale-110 hover:border-brand-purple transition-all cursor-help grayscale hover:grayscale-0">
                                            {emoji}
                                        </div>
                                    ))}
                                    <div className="w-12 h-12 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-white/10 text-xs">
                                        +5
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Continuing Section */}
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-purple mb-6 pl-1">Continue Watching</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {MOCK_COURSES.filter(c => c.progress > 0 && c.progress < 100).map(course => (
                                        <div
                                            key={course.id}
                                            onClick={() => navigate(`/course/${course.id}`)}
                                            className="group relative bg-[#12121A] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-purple/30 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-purple/10 cursor-pointer"
                                        >
                                            <div className="aspect-video relative overflow-hidden">
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#080812] to-transparent opacity-60"></div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-purple rounded-full" style={{ width: `${course.progress}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[9px] font-black text-brand-purple uppercase tracking-widest px-2 py-1 bg-brand-purple/10 rounded-md border border-brand-purple/20">
                                                        {course.category}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">
                                                        {course.lessons} Lessons
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-lg leading-tight mb-1 group-hover:text-brand-purple transition-colors">{course.title}</h4>
                                                <p className="text-white/40 text-xs font-medium">{course.subtitle}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* All Courses Section */}
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-6 pl-1">All Available Lessons</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {MOCK_COURSES.map(course => (
                                        <div
                                            key={course.id}
                                            onClick={() => navigate(`/course/${course.id}`)}
                                            className="group flex bg-[#12121A] border border-white/5 rounded-2xl p-4 gap-4 hover:bg-white/5 transition-all cursor-pointer"
                                        >
                                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-bold text-sm leading-tight mb-1 group-hover:text-brand-purple transition-colors">{course.title}</h4>
                                                <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{course.subtitle}</p>
                                                {course.progress === 100 && (
                                                    <span className="mt-2 text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
