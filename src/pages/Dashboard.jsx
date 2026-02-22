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
        isLocked: false
    },
    {
        id: 'part03',
        title: 'Part 03: 일상 대화',
        subtitle: '인사와 소개 (Greetings & Intro)',
        progress: 65,
        category: 'Conversation',
        lessons: 8,
        isLocked: false
    },
    {
        id: 'part04',
        title: 'Part 04: 비즈니스 한국어',
        subtitle: '직장 예절과 소통 (Work Ethic)',
        progress: 12,
        category: 'Business',
        lessons: 15,
        isLocked: false
    },
    {
        id: 'topik-high',
        title: 'TOPIK II Mastery',
        subtitle: '고급 한국어 및 시험 대비 (Advanced)',
        progress: 0,
        category: 'Exam Prep',
        lessons: 24,
        isLocked: true,
        price: '₩49,000'
    },
    {
        id: 'korean-culture',
        title: 'Korean Culture & Etiquette',
        subtitle: '한국 문화와 예절 (Culture)',
        progress: 0,
        category: 'General',
        lessons: 10,
        isLocked: true,
        price: '₩29,000'
    },
];

const FREE_VIDEOS = [
    { id: 'v1', title: 'Top 10 Survival Phrases', duration: '12:45', link: '#' },
    { id: 'v2', title: 'Korean Alphabet in 5 Minutes', duration: '05:30', link: '#' },
    { id: 'v3', title: 'How to Order at a Restaurant', duration: '08:20', link: '#' },
    { id: 'v4', title: 'Slang Young Koreans Use', duration: '10:15', link: '#' },
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

    const handleCourseAction = (course) => {
        if (course.isLocked) {
            alert(`${course.title} 강의를 신청하시겠습니까? 신청 페이지로 이동합니다.`);
            return;
        }
        navigate(`/course/${course.id}`);
    };

    return (
        <div className="w-full min-h-screen bg-[#080812] text-white flex flex-col font-['Inter']">
            <Navbar />

            <main className="flex-1 pt-[100px] pb-[60px] px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-brand-purple">
                                MY CLASS
                            </h1>
                            <p className="text-white/40 font-medium text-sm">Hello, {user?.displayName || user?.email?.split('@')[0]}!</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-all"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Status Sidebar */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-[#12121A] border border-white/5 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/10 rounded-full blur-2xl -mr-12 -mt-12"></div>

                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-blue rounded-xl flex items-center justify-center text-sm font-black shadow-lg">
                                            {user?.displayName?.[0] || user?.email?.[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-base leading-tight">{user?.displayName || 'Active Member'}</h2>
                                            <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">Premium Learner</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <p className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-0.5">XP</p>
                                            <p className="text-sm font-black text-brand-purple">2,450</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <p className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-0.5">Streak</p>
                                            <p className="text-sm font-black text-brand-blue">12d</p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-white/5">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Global Rank</span>
                                            <span className="text-[7px] font-black text-brand-purple uppercase tracking-widest">TOP 15%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#12121A] border border-white/5 rounded-2xl p-4">
                                <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-brand-purple rounded-full animate-pulse"></span>
                                    Badges
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {['🔥', '🎯', '⭐', '🚀'].map((emoji, i) => (
                                        <div key={i} className="w-8 h-8 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center text-base grayscale opacity-30">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Lessons Area */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Continuing Section */}
                            <div>
                                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-purple mb-4 flex items-center gap-2">
                                    <span className="h-[1px] w-6 bg-brand-purple/40"></span>
                                    Resume Lessons
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                    {MOCK_COURSES.filter(c => c.progress > 0 && c.progress < 100).map(course => (
                                        <div
                                            key={course.id}
                                            onClick={() => handleCourseAction(course)}
                                            className="group flex items-center bg-[#12121A] border border-white/5 rounded-xl p-4 gap-4 hover:border-brand-purple/30 transition-all cursor-pointer"
                                        >
                                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-lg">
                                                📖
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[8px] font-black text-brand-purple uppercase tracking-widest">
                                                        {course.category}
                                                    </span>
                                                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                                        {course.progress}% done
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-base truncate group-hover:text-brand-purple transition-colors">{course.title}</h4>
                                                <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                    <div className="h-full bg-brand-purple" style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                            </div>
                                            <button className="px-3 py-1.5 rounded-lg bg-brand-purple text-[8px] font-black uppercase tracking-wider hover:scale-105 transition-transform">
                                                Continue
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Free Video Section */}
                            <div>
                                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-4 flex items-center gap-2">
                                    <span className="h-[1px] w-6 bg-cyan-400/40"></span>
                                    Free Video Lessons
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {FREE_VIDEOS.map(video => (
                                        <a
                                            key={video.id}
                                            href={video.link}
                                            className="group bg-[#12121A] border border-white/5 rounded-xl p-3 hover:border-cyan-400/30 transition-all block"
                                        >
                                            <div className="aspect-video bg-white/5 rounded-lg mb-2 flex items-center justify-center text-xl group-hover:bg-white/10 transition-colors">
                                                ▶️
                                            </div>
                                            <h5 className="text-xs font-bold leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors">{video.title}</h5>
                                            <p className="text-[8px] text-white/20 mt-1 uppercase font-black">{video.duration}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* All Courses Section */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-2">
                                        <span className="h-[1px] w-6 bg-white/10"></span>
                                        Full Curriculum
                                    </h3>
                                </div>
                                <div className="bg-[#12121A] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                                    {MOCK_COURSES.map(course => (
                                        <div
                                            key={course.id}
                                            onClick={() => handleCourseAction(course)}
                                            className="group flex items-center justify-between p-4 hover:bg-white/[0.02] transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${course.isLocked ? 'bg-white/5 text-white/20' : 'bg-brand-purple/10 text-brand-purple'}`}>
                                                    {course.isLocked ? '🔒' : '📖'}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className={`font-bold text-sm truncate ${course.isLocked ? 'text-white/40' : 'text-white'} group-hover:text-brand-purple transition-colors`}>
                                                        {course.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest truncate">{course.subtitle}</span>
                                                        {course.isLocked && <span className="text-[8px] font-black text-brand-blue uppercase tracking-widest">{course.price}</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-4 shrink-0">
                                                {course.isLocked ? (
                                                    <button className="px-3 py-1 rounded-md bg-brand-blue text-[8px] font-black uppercase tracking-wider">
                                                        Unlock
                                                    </button>
                                                ) : (
                                                    <button className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-wider group-hover:bg-brand-purple group-hover:border-brand-purple whitespace-nowrap">
                                                        {course.progress === 100 ? 'Review' : (course.progress > 0 ? 'Resume' : 'Start')}
                                                    </button>
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
