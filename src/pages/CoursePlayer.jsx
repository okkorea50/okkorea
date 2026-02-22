import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data for lessons (In a real app, this would come from Firestore)
const MOCK_COURSE_CONTENT = {
    'part01': {
        title: 'Part 01: 한국어 기초',
        lessons: [
            { id: '1-1', title: '자음 기초 01', videoId: 'dQw4w9WgXcQ', duration: '12:45' },
            { id: '1-2', title: '자음 기초 02', videoId: 'dQw4w9WgXcQ', duration: '10:20' },
            { id: '1-3', title: '모음 기초 01', videoId: 'dQw4w9WgXcQ', duration: '15:10' },
            { id: '1-4', title: '모음 기초 02', videoId: 'dQw4w9WgXcQ', duration: '11:30' },
        ]
    },
    'part03': {
        title: 'Part 03: 일상 대화',
        lessons: [
            { id: '3-1', title: '첫 인사 나누기', videoId: 'dQw4w9WgXcQ', duration: '08:45' },
            { id: '3-2', title: '자기소개 하기', videoId: 'dQw4w9WgXcQ', duration: '12:20' },
        ]
    }
};

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const course = MOCK_COURSE_CONTENT[courseId] || MOCK_COURSE_CONTENT['part01'];

    const [activeLesson, setActiveLesson] = useState(course.lessons[0]);
    const [completedLessons, setCompletedLessons] = useState([]);

    const handleLessonComplete = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#080812] text-white flex flex-col font-['Inter']">
            <Navbar />

            <main className="flex-1 pt-[100px] pb-[60px]">
                <div className="max-w-[1600px] mx-auto px-6">
                    {/* Breadcrumbs / Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/dashboard" className="text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                            Back to Dashboard
                        </Link>
                        <span className="text-white/10">|</span>
                        <h1 className="text-xl font-black uppercase tracking-tight text-brand-purple">{course.title}</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Video Player Area */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="aspect-video bg-[#12121A] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative shadow-brand-purple/5">
                                <iframe
                                    src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0&modestbranding=1`}
                                    title={activeLesson.title}
                                    className="w-full h-full"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="flex justify-between items-center p-8 bg-[#12121A] border border-white/5 rounded-3xl">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black uppercase tracking-tight">{activeLesson.title}</h2>
                                    <p className="text-white/40 text-sm font-medium">Duration: {activeLesson.duration} • Topic: Grammar & Speaking</p>
                                </div>
                                <button
                                    onClick={() => handleLessonComplete(activeLesson.id)}
                                    disabled={completedLessons.includes(activeLesson.id)}
                                    className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all ${completedLessons.includes(activeLesson.id)
                                        ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default'
                                        : 'bg-brand-purple hover:scale-105 shadow-lg shadow-brand-purple/20'
                                        }`}
                                >
                                    {completedLessons.includes(activeLesson.id) ? 'Completed' : 'Mark as Done'}
                                </button>
                            </div>
                        </div>

                        {/* Lesson Sidebar */}
                        <div className="lg:col-span-1 border-l border-white/5 pl-8 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Course Content</h3>
                            <div className="space-y-3">
                                {course.lessons.map((lesson, idx) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLesson(lesson)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group ${activeLesson.id === lesson.id
                                            ? 'bg-brand-purple/10 border-brand-purple/30'
                                            : 'bg-white/20 border-white/5 hover:bg-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black border ${completedLessons.includes(lesson.id)
                                            ? 'bg-green-500/10 border-green-500/30 text-green-500'
                                            : activeLesson.id === lesson.id
                                                ? 'bg-brand-purple text-white border-brand-purple'
                                                : 'bg-white/10 border-white/10 text-white/40'
                                            }`}>
                                            {completedLessons.includes(lesson.id) ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                            ) : (idx + 1).toString().padStart(2, '0')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-bold truncate ${activeLesson.id === lesson.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                                {lesson.title}
                                            </p>
                                            <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">{lesson.duration}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 bg-[#12121A] border border-white/5 rounded-2xl space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Course Resources</h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'Vocabulary List.pdf', size: '1.2 MB' },
                                        { name: 'Grammar Cheat Sheet.pdf', size: '0.8 MB' },
                                    ].map((res, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-brand-purple/30 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                <span className="text-xs font-bold text-white/60 group-hover:text-white transition-colors">{res.name}</span>
                                            </div>
                                            <span className="text-[10px] text-white/20 font-bold">{res.size}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 rounded-2xl space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-purple">Next Step</h4>
                                <p className="text-xs text-white/60 font-medium italic">"Every small step in learning Korean brings you closer to your dream life in Korea."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CoursePlayer;
