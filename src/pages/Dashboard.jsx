import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PayPalPayment from '../components/PayPalPayment';

// ✨ FREE_VIDEOS: 무료 유튜브 샘플 영상 (고정 유지)
const FREE_VIDEOS = [
    { id: 'v0', title: 'Korean Language Magic (Shorts)', duration: '00:59', link: 'https://youtube.com/shorts/nJNVucTqc0k?si=OKK' },
    { id: 'v1', title: 'Lesson 1: Korean Consonants', duration: '32:47', link: 'https://www.youtube.com/watch?v=kCwBVDg7UpY' },
    { id: 'v2', title: 'Lesson 2: Korean Vowels', duration: '24:56', link: 'https://www.youtube.com/watch?v=WqcFmW6_Fug' },
    { id: 'v3', title: 'Lesson 4: Basic Vocabulary', duration: '04:14', link: 'https://www.youtube.com/watch?v=h4k6ic5Lg6k' },
];

const Dashboard = () => {
    const { user, hasPremium, grantPremiumAccess, logout } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [attendanceCount, setAttendanceCount] = useState(0);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    // ✨ DB에서 불러온 강의 목록 상태
    const [courses, setCourses] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);

    useEffect(() => {
        // 유저 데이터 로드
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const userRef = doc(db, 'users', user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setAttendanceCount(userData.completedCourses?.length || 0);
                        setAttendanceHistory(userData.attendanceHistory || []);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        // ✨ Firestore 'courses' 컬렉션에서 실제 강의 목록 로드
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'courses'));
                const courseList = querySnapshot.docs.map(d => ({
                    id: d.data().courseId || d.id, // courseId 필드를 우선 사용
                    docId: d.id,
                    ...d.data(),
                    progress: 0 // 개인 진도는 추후 연동
                }));
                // order 기준 정렬
                courseList.sort((a, b) => (a.order || 0) - (b.order || 0));
                setCourses(courseList);
            } catch (error) {
                console.error("강의 목록 로드 에러:", error);
            } finally {
                setCoursesLoading(false);
            }
        };

        fetchUserData();
        fetchCourses();
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const handleCourseAction = (course) => {
        if (course.isLocked && !hasPremium) {
            const isConfirmed = window.confirm(`${course.title} 강의는 프리미엄 수강권이 필요합니다.\n\n수강 신청 및 결제 안내 페이지로 이동하시겠습니까?`);

            if (isConfirmed) {
                const element = document.getElementById('payment-section');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    navigate('/study');
                }
            }
            return;
        }
        navigate(`/course/${course.id}`);
    };

    const handlePaymentSuccess = async (details) => {
        setIsProcessing(true);
        try {
            await grantPremiumAccess();
            alert(`Payment successful! Welcome to Premium, ${details.payer.name.given_name}!`);
        } catch (error) {
            console.error("Error granting premium access:", error);
            alert("Payment was successful, but there was an error updating your account. Please contact support.");
        } finally {
            setIsProcessing(false);
        }
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
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${hasPremium ? 'text-[#D6BBFB]' : 'text-white/20'}`}>
                                                {hasPremium ? 'Premium Learner' : 'Free Member'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <p className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-0.5">Attendance</p>
                                            <p className="text-sm font-black text-brand-purple">{attendanceCount} Days</p>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                            <p className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-0.5">Courses</p>
                                            <p className="text-sm font-black text-brand-blue">{attendanceCount}</p>
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

                            {/* Scholarship Challenge Section */}
                            <div className="bg-gradient-to-br from-[#1A1B26] to-[#12121A] border border-brand-purple/20 rounded-2xl p-5 relative overflow-hidden shadow-2xl mb-4 group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-purple/10 transition-colors"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-brand-purple mb-1 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse"></span>
                                                Scholarship Challenge
                                            </h3>
                                            <p className="text-white/60 text-[11px] font-bold">Collect 100 badges to earn your scholarship!</p>
                                        </div>
                                        <div className="bg-brand-purple/20 px-2 py-1 rounded-md border border-brand-purple/30">
                                            <span className="text-[12px] font-black text-brand-purple">14 / 100</span>
                                        </div>
                                    </div>

                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5 p-[1px]">
                                        <div className="h-full bg-gradient-to-r from-brand-purple via-brand-blue to-cyan-400 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-all duration-1000" style={{ width: '14%' }}></div>
                                    </div>

                                    <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1">
                                        {[...Array(100)].map((_, i) => {
                                            const isEarned = i < 14; // Mock more progress
                                            const emojis = ['🔥', '🎯', '⭐', '🚀', '💎', '📚', '🎓', '👑', '⚡', '🏆'];
                                            const emoji = emojis[i % emojis.length];

                                            // Example detailed badge names
                                            const badgeNames = [
                                                "Day 1 Explorer", "First Quiz Done", "Morning Person", "Night Owl",
                                                "Streak Master 3d", "XP Collector", "Vocab Hero", "Grammar Pro",
                                                "K-Culture Fan", "Global Learner"
                                            ];
                                            const badgeName = i < 10 ? badgeNames[i] : `Achievement #${i + 1}`;

                                            return (
                                                <div
                                                    key={i}
                                                    title={badgeName}
                                                    className={`aspect-square rounded-md flex items-center justify-center text-[10px] transition-all duration-300 cursor-help ${isEarned
                                                        ? 'bg-brand-purple/20 border border-brand-purple/40 text-white shadow-[0_0_10px_rgba(124,58,237,0.2)] hover:scale-110 active:scale-95'
                                                        : 'bg-white/[0.05] border border-white/10 opacity-40 grayscale hover:opacity-100 hover:scale-110'
                                                        }`}
                                                >
                                                    {emoji}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-5 h-5 rounded-full border border-[#080812] bg-white/10 flex items-center justify-center text-[8px]">
                                                    👤
                                                </div>
                                            ))}
                                            <div className="pl-3 text-[8px] font-bold text-white/30 uppercase tracking-widest flex items-center">
                                                +128 students participating
                                            </div>
                                        </div>
                                        <button className="text-[11px] font-black text-brand-purple uppercase tracking-widest hover:text-white transition-colors">
                                            Details →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance History Section */}
                            <div className="bg-[#12121A] border border-white/5 rounded-2xl p-5 relative overflow-hidden shadow-xl">
                                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                                    Attendance Log
                                </h3>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {attendanceHistory.length > 0 ? (
                                        [...attendanceHistory].reverse().map((record, idx) => {
                                            const course = courses.find(c => c.id === record.courseId || c.courseId === record.courseId);
                                            const date = new Date(record.date);
                                            return (
                                                <div key={idx} className="flex flex-col gap-1 p-2 rounded-lg bg-white/5 border border-white/5">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] font-black text-cyan-400/60 uppercase tracking-widest leading-none">
                                                            {date.toLocaleDateString('ko-KR')}
                                                        </span>
                                                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none">
                                                            {date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] font-bold text-white/80 truncate leading-tight">
                                                        {course?.title || record.courseId}
                                                    </p>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest text-center py-4">No records found</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Main Content */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Premium Call to Action */}
                            {!hasPremium && (
                                <div id="payment-section" className="bg-gradient-to-br from-[#1A1B26] to-[#12121A] border border-brand-purple/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="space-y-2 text-center md:text-left">
                                            <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                                                UNLOCK <span className="text-brand-purple text-glow-purple">PREMIUM</span> ACCESS
                                            </h3>
                                            <p className="text-white/60 text-sm max-w-md">
                                                Get unlimited access to all TOPIK mastery courses, culture lessons, and earn your scholarship certificates.
                                            </p>
                                            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-brand-purple">✓</span>
                                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">All Courses</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-brand-purple">✓</span>
                                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Certificates</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-brand-purple">✓</span>
                                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Study Materials</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full max-w-[280px]">
                                            {isProcessing ? (
                                                <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/10">
                                                    <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-purple">Updating Account...</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="text-center">
                                                        <span className="text-3xl font-black text-white">$99</span>
                                                        <span className="text-white/40 text-sm ml-1">/ one-time</span>
                                                    </div>
                                                    <PayPalPayment
                                                        amount="99.00"
                                                        onSuccess={handlePaymentSuccess}
                                                        onError={() => alert("Payment encounter an error. Please try again.")}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Continuing Section */}
                            <div>
                                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-purple mb-4 flex items-center gap-2">
                                    <span className="h-[1px] w-6 bg-brand-purple/40"></span>
                                    Resume Lessons
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                    {courses.filter(c => c.progress > 0 && c.progress < 100).map(course => (
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
                                    {coursesLoading ? (
                                        <div className="p-8 text-center text-white/30 text-xs font-bold animate-pulse">강의 목록 불러오는 중...</div>
                                    ) : courses.length === 0 ? (
                                        <div className="p-8 text-center text-white/20 text-xs font-bold">등록된 강의가 없습니다.</div>
                                    ) : courses.map(course => (
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
                                                        {course.isLocked && course.price > 0 && <span className="text-[8px] font-black text-brand-blue uppercase tracking-widest">₩{Number(course.price).toLocaleString()}</span>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-4 shrink-0">
                                                {course.isLocked && !hasPremium ? (
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
