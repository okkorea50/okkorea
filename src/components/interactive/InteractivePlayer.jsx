import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Play, Pause, Settings } from 'lucide-react';
import { DEFAULT_TUTOR_SETTINGS } from './constants';

const InteractivePlayer = ({ scenes = [], tutorSettings = DEFAULT_TUTOR_SETTINGS, onOpenSettings }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);

    // Quiz State
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizFeedback, setQuizFeedback] = useState(null);

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const scene = scenes[currentSceneIndex];

    // Reset quiz state when scene changes
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
        setShowQuiz(false);
        setQuizCompleted(false);
        setSelectedOption(null);
        setQuizFeedback(null);
    }, [currentSceneIndex]);

    // Apply voice settings (simulated via playback rate)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = tutorSettings.voice.speed;
        }
    }, [tutorSettings.voice.speed, currentSceneIndex]);

    const nextScene = () => {
        // If there is a quiz and it's not completed, show quiz first
        if (scene?.quiz && !quizCompleted && !showQuiz) {
            setShowQuiz(true);
            return;
        }

        if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex(currentSceneIndex + 1);
        } else {
            // Reached the end
            if (onComplete) onComplete();
        }
    };

    const prevScene = () => {
        if (currentSceneIndex > 0) setCurrentSceneIndex(currentSceneIndex - 1);
    };

    const handleQuizAnswer = (optionId) => {
        if (!scene?.quiz) return;

        setSelectedOption(optionId);
        const option = scene.quiz.options.find(o => o.id === optionId);

        if (option) {
            // Generate personality-based feedback prefix
            let prefix = "";
            if (option.isCorrect) {
                if (tutorSettings.personality === 'formal') prefix = "Correct. ";
                if (tutorSettings.personality === 'friendly') prefix = "That's wonderful! ";
                if (tutorSettings.personality === 'humorous') prefix = "Bingo! You're a genius! ";
            } else {
                if (tutorSettings.personality === 'formal') prefix = "Incorrect. ";
                if (tutorSettings.personality === 'friendly') prefix = "Not quite, let's try again. ";
                if (tutorSettings.personality === 'humorous') prefix = "Oops! Did you slip on a banana peel? ";
            }

            setQuizFeedback(prefix + option.feedback);

            if (option.isCorrect) {
                setQuizCompleted(true);
            }
        }
    };

    // Generate dynamic subtitle based on personality
    const getPersonalitySubtitle = (originalSubtitle) => {
        if (showQuiz) return "Let's check your understanding.";
        if (quizFeedback) return quizFeedback;
        if (!originalSubtitle) return "";

        if (tutorSettings.personality === 'humorous') {
            return originalSubtitle + " (Trust me, I'm an AI)";
        }
        if (tutorSettings.personality === 'formal') {
            return originalSubtitle.replace("!", ".");
        }
        return originalSubtitle;
    };

    // Calculate CSS filters for avatar appearance simulation
    const getAvatarFilter = () => {
        let filter = '';
        // Simulate clothing color change with hue-rotate
        if (tutorSettings.appearance.clothing === 'casual') filter += 'hue-rotate(90deg) ';
        if (tutorSettings.appearance.clothing === 'hoodie') filter += 'hue-rotate(180deg) sepia(0.5) ';

        // Simulate hairstyle change (very rough approximation via contrast/brightness for demo)
        if (tutorSettings.appearance.hairstyle === 'curly') filter += 'contrast(1.2) ';
        if (tutorSettings.appearance.hairstyle === 'long') filter += 'brightness(1.1) ';

        return filter;
    };

    if (!scene) return <div className="p-8 text-center text-white/50">No scenes loaded.</div>;

    return (
        <div className="w-full h-full bg-[#080812] text-white flex flex-col items-center justify-center font-sans overflow-hidden">
            <div className="w-full h-full bg-[#080812] flex overflow-hidden border border-white/10 relative">

                {/* Settings Button */}
                <button
                    onClick={onOpenSettings}
                    className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors"
                >
                    <Settings size={20} className="text-white" />
                </button>

                {/* 1. Left: TOC - 1/4 */}
                <div className="w-1/4 min-w-[200px] bg-[#12121A] border-r border-white/5 p-6 flex flex-col hidden lg:flex overflow-hidden">
                    <h3 className="text-[10px] font-black text-purple-500 tracking-widest uppercase mb-6">Course Outline</h3>
                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {scenes.map((s, index) => (
                            <div
                                key={s.id || index}
                                onClick={() => {
                                    if (!showQuiz) setCurrentSceneIndex(index);
                                }}
                                className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${currentSceneIndex === index
                                    ? 'bg-purple-500/20 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                                    : 'hover:bg-white/5 border border-transparent opacity-50'
                                    }`}
                            >
                                <div className="text-[10px] font-bold text-white/50 mb-1">{s.chapter}</div>
                                <div className={`text-xs font-bold leading-tight ${currentSceneIndex === index ? 'text-white' : 'text-white/70'}`}>
                                    {s.title}
                                </div>
                                {s.quiz && (
                                    <div className="mt-2 text-[8px] uppercase tracking-wider bg-white/10 inline-block px-1.5 py-0.5 rounded text-white/50">
                                        Quiz
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Main Content - 3/4 */}
                <div className="flex-1 relative flex flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10 overflow-hidden">

                    {/* 2. Main Slide Content */}
                    <div className="flex-1 p-6 md:p-12 overflow-hidden relative z-10 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {showQuiz && scene.quiz ? (
                                <motion.div
                                    key="quiz"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="w-full max-w-2xl bg-[#1A1A24] p-8 rounded-3xl border border-white/10 shadow-2xl"
                                >
                                    <h3 className="text-xl font-bold mb-6 text-purple-400">Quiz Time!</h3>
                                    <p className="text-lg mb-8">{scene.quiz.question}</p>
                                    <div className="space-y-3">
                                        {scene.quiz.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => handleQuizAnswer(option.id)}
                                                disabled={quizCompleted && option.isCorrect}
                                                className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between ${selectedOption === option.id
                                                    ? option.isCorrect
                                                        ? 'bg-green-500/20 border border-green-500 text-green-400'
                                                        : 'bg-red-500/20 border border-red-500 text-red-400'
                                                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                                                    }`}
                                            >
                                                <span>{option.text}</span>
                                                {selectedOption === option.id && (
                                                    option.isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    {quizCompleted && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-6 flex justify-end"
                                        >
                                            <button
                                                onClick={() => {
                                                    setShowQuiz(false);
                                                    if (currentSceneIndex < scenes.length - 1) {
                                                        setCurrentSceneIndex(currentSceneIndex + 1);
                                                    }
                                                }}
                                                className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200"
                                            >
                                                Continue Lesson
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`content-${animationKey}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="w-full h-full flex items-center justify-center p-4 text-center"
                                >
                                    <div className="prose prose-invert max-w-none w-full">
                                        {/* If it's a string, we might want to render as HTML or just text */}
                                        {typeof scene.content === 'string' ? (
                                            <div dangerouslySetInnerHTML={{ __html: scene.content }} />
                                        ) : (
                                            scene.content
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. Avatar Area (PIP) */}
                    <div className="absolute bottom-24 right-6 md:right-12 z-30 w-28 h-28 md:w-44 md:h-44 bg-black rounded-full overflow-hidden border-4 border-[#12121A] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-105 group">
                        <video
                            ref={videoRef}
                            key={`video-${scene.id}`}
                            src={scene.avatarVideo}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover transition-all duration-500"
                            style={{ filter: getAvatarFilter() }}
                        />
                        {/* Playback Controls Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onClick={() => {
                                if (videoRef.current) {
                                    if (isPlaying) videoRef.current.pause();
                                    else videoRef.current.play();
                                    setIsPlaying(!isPlaying);
                                }
                            }}>
                                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
                            </button>
                        </div>
                    </div>

                    {/* 4. Lower Thirds (Subtitles) */}
                    <div className="absolute bottom-24 left-6 md:left-12 z-20 max-w-[60%] md:max-w-xl">
                        <motion.div
                            key={`subtitle-${animationKey}-${quizFeedback}`}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`backdrop-blur-md border-l-4 p-4 rounded-r-xl shadow-2xl transition-colors duration-500 ${quizFeedback
                                ? 'bg-blue-900/90 border-blue-500'
                                : 'bg-[#12121A]/90 border-purple-500'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                                    {tutorSettings.name} • {tutorSettings.personality}
                                </span>
                            </div>
                            <p className="text-sm md:text-base font-bold text-white leading-relaxed">
                                {getPersonalitySubtitle(scene.subtitle)}
                            </p>
                        </motion.div>
                    </div>

                    {/* Player Controls */}
                    <div className="h-16 bg-[#0B0C15] border-t border-white/5 flex items-center justify-between px-6 z-40 relative">
                        <button
                            onClick={prevScene}
                            disabled={currentSceneIndex === 0 || showQuiz}
                            className="px-4 py-2 text-xs font-bold text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                        >
                            ← Previous
                        </button>
                        <div className="text-[10px] font-bold text-white/30 tracking-widest hidden sm:block">
                            SCENE {currentSceneIndex + 1} / {scenes.length}
                        </div>
                        <button
                            onClick={nextScene}
                            disabled={currentSceneIndex === scenes.length - 1 && !scene.quiz && quizCompleted}
                            className={`px-5 py-2 rounded-full text-xs font-bold shadow-lg transition-all ${showQuiz && !quizCompleted
                                ? 'bg-gray-700 text-white/50 cursor-not-allowed'
                                : 'bg-purple-500 text-white hover:bg-purple-600'
                                }`}
                        >
                            {showQuiz ? (quizCompleted ? "Next Scene →" : "Answer Quiz") : (currentSceneIndex === scenes.length - 1 ? "Finish" : "Next Scene →")}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InteractivePlayer;
