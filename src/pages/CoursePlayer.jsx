import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractivePlayer from '../components/interactive/InteractivePlayer';
import TutorCustomizer from '../components/interactive/TutorCustomizer';
import { DEFAULT_TUTOR_SETTINGS } from '../components/interactive/constants';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user, hasPremium, loading: authLoading } = useAuth();

    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [courseData, setCourseData] = useState(null);
    const [courseLoading, setCourseLoading] = useState(true);

    // ✨ 인터랙티브 설정
    const [tutorSettings, setTutorSettings] = useState(DEFAULT_TUTOR_SETTINGS);
    const [showCustomizer, setShowCustomizer] = useState(false);

    // ✨ 현재 재생 중인 강의 인덱스
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    // 1. 가져오기
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const q = query(collection(db, 'courses'), where('courseId', '==', courseId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setCourseData(docData);
                } else {
                    const directRef = doc(db, 'courses', courseId);
                    const directSnap = await getDoc(directRef);
                    if (directSnap.exists()) {
                        setCourseData(directSnap.data());
                    }
                }
            } catch (error) {
                console.error('강의 데이터 로드 에러:', error);
            } finally {
                setCourseLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    // 2. 권한/출석
    useEffect(() => {
        if (authLoading || courseLoading) return;

        if (courseData?.isLocked && !hasPremium) {
            alert('이 강의는 프리미엄 회원 전용입니다. 결제 후 이용해주세요.');
            navigate('/dashboard');
            return;
        }

        const checkAttendance = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    if (userData.completedCourses && userData.completedCourses.includes(courseId)) {
                        setIsCompleted(true);
                    }
                }
            }
        };
        checkAttendance();
    }, [user, courseId, courseData, authLoading, courseLoading]);

    const markAttendance = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                completedCourses: arrayUnion(courseId),
                attendanceHistory: arrayUnion({
                    courseId: courseId,
                    date: new Date().toISOString()
                })
            }, { merge: true });
            setIsCompleted(true);
            alert('✅ 수강 완료 처리되었습니다!');
        } catch (error) {
            console.error('수강 완료 에러:', error);
            alert('처리 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return null;
        if (url.includes('youtube.com/embed/')) return url;
        const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
        if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
        const watchMatch = url.match(/[?&]v=([^?&]+)/);
        if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
        const shortsMatch = url.match(/shorts\/([^?&]+)/);
        if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
        return url;
    };

    // ✨ lessonsList 지원 (하위호환 포함)
    const lessons = courseData?.lessonsList && courseData.lessonsList.length > 0
        ? courseData.lessonsList
        : (courseData?.videoUrl ? [{ id: 'legacy', title: '본 강의', videoUrl: courseData.videoUrl }] : []);

    const currentLesson = lessons[currentLessonIndex] || {};
    const embedUrl = getEmbedUrl(currentLesson.videoUrl) || '';

    // ✨ 3.1 인터랙티브 모드 판단
    const isInteractive = courseData?.isInteractive === true;
    const scenes = courseData?.scenesList || [];

    return (
        <div className="w-full min-h-screen bg-[#080812] text-white flex flex-col">
            <Navbar />

            <main className="flex-1 pt-[120px] pb-20 px-6 max-w-6xl mx-auto w-full animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => navigate('/dashboard')} className="text-white/50 hover:text-white font-bold text-sm transition-colors">
                        ← 내 강의실로 돌아가기
                    </button>
                    <div className="flex gap-4">
                        {isInteractive && (
                            <button
                                onClick={() => setShowCustomizer(true)}
                                className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2"
                            >
                                👤 튜터 커스터마이징
                            </button>
                        )}
                        {courseData?.pdfUrl && (
                            <a
                                href={courseData.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                            >
                                <span className="text-base">📄</span> 강의 교안 (PDF) 다운로드
                            </a>
                        )}
                    </div>
                </div>

                <div className="bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl relative">
                    {courseLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
                        </div>
                    ) : (
                        isInteractive ? (
                            <div className="p-2">
                                <InteractivePlayer
                                    scenes={scenes}
                                    tutorSettings={tutorSettings}
                                    courseTitle={courseData?.title}
                                    onComplete={markAttendance}
                                    onOpenSettings={() => setShowCustomizer(true)}
                                />
                            </div>
                        ) : (
                            <div className={`grid grid-cols-1 ${lessons.length > 1 ? 'lg:grid-cols-3' : ''}`}>

                                {/* 왼쪽/메인: 영상 플레이어 영역 */}
                                <div className={`p-6 ${lessons.length > 1 ? 'lg:col-span-2 border-b lg:border-b-0 lg:border-r border-white/5' : ''}`}>
                                    <div className="mb-6 flex justify-between items-end">
                                        <div>
                                            {courseData?.category && (
                                                <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest bg-brand-purple/10 px-2 py-1 rounded">
                                                    {courseData.category}
                                                </span>
                                            )}
                                            <h1 className="text-2xl lg:text-3xl font-black mt-3 text-white">
                                                {courseData?.title || `강의: ${courseId}`}
                                            </h1>
                                            {courseData?.subtitle && (
                                                <p className="text-sm text-white/50 mt-2">{courseData.subtitle}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* 선택된 강의 소제목 (여러 강의일 때만) */}
                                    {lessons.length > 1 && (
                                        <div className="mb-4 text-brand-purple font-bold flex items-center gap-2">
                                            <span className="bg-brand-purple text-white px-2 py-0.5 rounded text-xs">{currentLessonIndex + 1}강</span>
                                            {currentLesson.title}
                                        </div>
                                    )}

                                    <div className="w-full aspect-video bg-black rounded-2xl border border-white/10 mb-8 overflow-hidden shadow-2xl">
                                        {embedUrl ? (
                                            <iframe
                                                className="w-full h-full"
                                                src={embedUrl}
                                                title={currentLesson.title || courseData?.title || 'OKKorea Lecture Video'}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                                                <span className="text-4xl mb-2">🎬</span>
                                                영상 링크가 없습니다.
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-white/10 pt-6 gap-4 bg-[#080812]/30 -mx-6 -mb-6 p-6">
                                        <div>
                                            <p className="text-sm font-bold text-white/80">강의를 수강하셨나요?</p>
                                            <p className="text-xs text-white/50 mt-1">
                                                {lessons.length > 1 ? '모든 영상을 시청한 후 수강 완료 버튼을 눌러 진행도를 기록하세요.' : '강의를 시청하신 후 완료 버튼을 눌러주세요.'}
                                            </p>
                                        </div>

                                        <button
                                            onClick={markAttendance}
                                            disabled={isCompleted || loading}
                                            className={`px-8 py-3 rounded-xl font-black transition-all whitespace-nowrap ${isCompleted
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-not-allowed'
                                                : 'bg-brand-purple text-white hover:bg-purple-500 hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                                }`}
                                        >
                                            {loading ? '처리 중...' : isCompleted ? '✅ 수강 완료됨' : '수강 완료 (출석)'}
                                        </button>
                                    </div>
                                </div>

                                {/* 오른쪽: 커리큘럼 플레이리스트 (강의가 여러 개일 때만 표시) */}
                                {lessons.length > 1 && (
                                    <div className="p-6 bg-[#080812]/50 lg:max-h-[85vh] lg:overflow-y-auto custom-scrollbar">
                                        <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#080812] py-2 z-10 border-b border-white/5">
                                            <h3 className="text-sm font-black text-white uppercase tracking-wider">📚 커리큘럼</h3>
                                            <span className="text-xs font-bold text-white/40 bg-white/5 px-2 py-1 rounded">총 {lessons.length}강</span>
                                        </div>
                                        <div className="space-y-2">
                                            {lessons.map((lesson, idx) => (
                                                <button
                                                    key={lesson.id || idx}
                                                    onClick={() => {
                                                        setCurrentLessonIndex(idx);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${currentLessonIndex === idx ? 'bg-brand-purple/20 border border-brand-purple/50 text-white' : 'hover:bg-white/5 text-white/50 border border-transparent'}`}
                                                >
                                                    <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shrink-0 ${currentLessonIndex === idx ? 'bg-brand-purple text-white' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-sm leading-snug flex-1 break-words line-clamp-2">{lesson.title}</span>
                                                    {currentLessonIndex === idx && (
                                                        <span className="w-2 h-2 rounded-full bg-brand-purple shrink-0 animate-pulse"></span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        )
                    )}
                </div>
            </main>

            {/* ✨ 튜터 커스텀 모달 */}
            {showCustomizer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <TutorCustomizer
                        settings={tutorSettings}
                        onApply={(newSettings) => {
                            setTutorSettings(newSettings);
                            setShowCustomizer(false);
                        }}
                        onClose={() => setShowCustomizer(false)}
                    />
                </div>
            )}

            <Footer showCTA={false} />
        </div>
    );
};

export default CoursePlayer;
