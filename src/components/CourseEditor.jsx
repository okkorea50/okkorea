import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const CourseEditor = ({ onBack }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // ✨ 3.1 핵심: isInteractive (인터랙티브 모드 여부), scenesList (씬 배열) 추가
    const initialFormState = {
        courseId: '',
        title: '',
        subtitle: '',
        category: 'Foundations',
        lessonsList: [{ id: Date.now(), title: '', videoUrl: '' }], // 기본 영상 강의용
        isInteractive: false, // 인터랙티브 모드 토글
        scenesList: [],       // 인터랙티브 씬 목록
        pdfUrl: '',        // 강의 자료(PDF) 링크
        isLocked: true,
        price: 0,
        order: 1,
        thumbnail: '',
        isPublished: true  // 공개(true) / 임시저장(false)
    };

    const [formData, setFormData] = useState(initialFormState);

    // 1. 파이어베이스에서 기존 강의 목록 불러오기
    const fetchCourses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'courses'));
            const courseList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            courseList.sort((a, b) => (a.order || 0) - (b.order || 0));
            setCourses(courseList);
            setLoading(false);
        } catch (error) {
            console.error("강의 목록을 불러오는 중 에러 발생:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // 2. 기본 입력값 핸들러
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // ✨ 3.0 다중 영상 핸들러
    const handleLessonChange = (index, field, value) => {
        const newLessonsList = [...formData.lessonsList];
        newLessonsList[index][field] = value;
        setFormData({ ...formData, lessonsList: newLessonsList });
    };

    const addLesson = () => {
        setFormData({
            ...formData,
            lessonsList: [...formData.lessonsList, { id: Date.now(), title: '', videoUrl: '' }]
        });
    };

    const removeLesson = (index) => {
        const newLessonsList = formData.lessonsList.filter((_, i) => i !== index);
        setFormData({ ...formData, lessonsList: newLessonsList });
    };

    // ✨ 3.1 인터랙티브 씬 핸들러
    const addScene = () => {
        setFormData({
            ...formData,
            scenesList: [
                ...formData.scenesList,
                {
                    id: Date.now(),
                    chapter: `Chapter ${formData.scenesList.length + 1}`,
                    title: '',
                    content: '',
                    subtitle: '',
                    avatarVideo: '',
                    quiz: null
                }
            ]
        });
    };

    const handleSceneChange = (index, field, value) => {
        const newScenesList = [...formData.scenesList];
        if (field.startsWith('quiz.')) {
            const quizField = field.split('.')[1];
            if (!newScenesList[index].quiz) {
                newScenesList[index].quiz = { question: '', options: [] };
            }
            newScenesList[index].quiz[quizField] = value;
        } else {
            newScenesList[index][field] = value;
        }
        setFormData({ ...formData, scenesList: newScenesList });
    };

    const removeScene = (index) => {
        const newScenesList = formData.scenesList.filter((_, i) => i !== index);
        setFormData({ ...formData, scenesList: newScenesList });
    };

    const toggleQuiz = (index) => {
        const newScenesList = [...formData.scenesList];
        if (newScenesList[index].quiz) {
            newScenesList[index].quiz = null;
        } else {
            newScenesList[index].quiz = {
                question: '',
                options: [
                    { id: '1', text: '', isCorrect: true, feedback: 'Correct!' },
                    { id: '2', text: '', isCorrect: false, feedback: 'Try again.' }
                ]
            };
        }
        setFormData({ ...formData, scenesList: newScenesList });
    };

    const handleQuizOptionChange = (sceneIndex, optionIndex, field, value) => {
        const newScenesList = [...formData.scenesList];
        const options = [...newScenesList[sceneIndex].quiz.options];
        options[optionIndex][field] = field === 'isCorrect' ? (value === 'true') : value;
        newScenesList[sceneIndex].quiz.options = options;
        setFormData({ ...formData, scenesList: newScenesList });
    };

    // 3. 강의 등록 또는 수정
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.courseId || !formData.title) {
            alert("강의 ID와 제목은 필수입니다!");
            return;
        }

        setIsSubmitting(true);
        try {
            const courseDataToSave = {
                ...formData,
                price: Number(formData.price),
                order: Number(formData.order),
                lessonsCount: formData.isInteractive ? formData.scenesList.length : formData.lessonsList.length
            };

            if (editingId) {
                await updateDoc(doc(db, 'courses', editingId), {
                    ...courseDataToSave,
                    updatedAt: serverTimestamp()
                });
                alert("✅ 강의가 성공적으로 수정되었습니다!");
            } else {
                await addDoc(collection(db, 'courses'), {
                    ...courseDataToSave,
                    createdAt: serverTimestamp()
                });
                alert("✅ 새 강의가 등록되었습니다!");
            }

            setFormData(initialFormState);
            setEditingId(null);
            fetchCourses();
        } catch (error) {
            console.error("강의 저장 에러:", error);
            alert("강의 저장에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 4. 수정 버튼 클릭 시 폼에 데이터 채우기
    const handleEditClick = (course) => {
        setFormData({
            courseId: course.courseId || '',
            title: course.title || '',
            subtitle: course.subtitle || '',
            category: course.category || 'Foundations',
            lessonsList: course.lessonsList || [{ id: Date.now(), title: '본 강의', videoUrl: course.videoUrl || '' }],
            isInteractive: course.isInteractive || false,
            scenesList: course.scenesList || [],
            pdfUrl: course.pdfUrl || '',
            isLocked: course.isLocked ?? true,
            price: course.price || 0,
            order: course.order || 1,
            thumbnail: course.thumbnail || '',
            isPublished: course.isPublished ?? true
        });
        setEditingId(course.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 5. 강의 삭제
    const handleDelete = async (docId, courseTitle) => {
        if (window.confirm(`정말 '${courseTitle}' 강의를 삭제하시겠습니까?`)) {
            try {
                await deleteDoc(doc(db, 'courses', docId));
                alert("🗑️ 강의가 삭제되었습니다.");
                if (editingId === docId) {
                    setFormData(initialFormState);
                    setEditingId(null);
                }
                fetchCourses();
            } catch (error) {
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                    <span className="text-4xl">📚</span> Course Editor <span className="text-sm font-normal text-brand-purple border border-brand-purple/30 px-2 py-1 rounded-full bg-brand-purple/10">v3.1</span>
                </h2>
                <button
                    onClick={onBack}
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                    ← Back to Dashboard
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 왼쪽: 강의 등록/수정 폼 */}
                <div className="xl:col-span-1 bg-[#12121A] border border-white/5 rounded-3xl p-6 shadow-2xl h-fit max-h-[85vh] overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#12121A] py-2 z-10 border-b border-white/5">
                        <h3 className="text-xl font-bold text-brand-purple">
                            {editingId ? '✏️ 강의 수정' : '✨ 새 강의 등록'}
                        </h3>
                        <div className="flex gap-4 items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} className="w-4 h-4 accent-green-500" />
                                <span className={`text-[10px] font-bold ${formData.isPublished ? 'text-green-400' : 'text-gray-500'}`}>
                                    {formData.isPublished ? '👁️ 공개' : '🙈 숨김'}
                                </span>
                            </label>
                            {editingId && (
                                <button type="button" onClick={() => { setFormData(initialFormState); setEditingId(null); }} className="text-xs text-white/50 hover:text-white underline">취소</button>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 pb-4">
                        <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/20 mb-6 flex justify-between items-center">
                            <div>
                                <div className="text-xs font-bold text-purple-300">강의 모드 설정</div>
                                <div className="text-[9px] text-white/40">영상 중심 vs 인터랙티브 자동화</div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer bg-[#080812] px-3 py-1.5 rounded-full border border-white/10">
                                <input type="checkbox" name="isInteractive" checked={formData.isInteractive} onChange={handleInputChange} className="w-4 h-4 accent-brand-purple" />
                                <span className="text-[10px] font-bold text-white/80">인터랙티브 모드</span>
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/3">
                                <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase">노출 순서</label>
                                <input type="number" name="order" value={formData.order} onChange={handleInputChange} className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" required />
                            </div>
                            <div className="w-2/3">
                                <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase">강의 ID (URL)</label>
                                <input type="text" name="courseId" value={formData.courseId} onChange={handleInputChange} placeholder="예: part01" className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" required disabled={!!editingId} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase">강의 제목</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="예: Part 01: 한국어 기초" className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" required />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase">카테고리</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple">
                                    <option value="Foundations">Foundations (기초)</option>
                                    <option value="Conversation">Conversation (회화)</option>
                                    <option value="Business">Business (비즈니스)</option>
                                    <option value="TOPIK">TOPIK (시험대비)</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase">썸네일 이미지</label>
                                <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleInputChange} placeholder="https://..." className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-white/50 mb-1 uppercase">강의 자료 (PDF/링크)</label>
                            <input type="text" name="pdfUrl" value={formData.pdfUrl} onChange={handleInputChange} placeholder="학생들이 다운받을 교안 링크" className="w-full bg-[#080812] border border-white/10 rounded-xl px-4 py-3 text-sm text-blue-300 focus:outline-none focus:border-blue-500" />
                        </div>

                        {!formData.isInteractive ? (
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-xs font-bold text-brand-purple uppercase">🎬 커리큘럼 (영상 목록)</label>
                                    <span className="text-[10px] text-white/40">총 {formData.lessonsList.length}강</span>
                                </div>
                                <div className="space-y-3">
                                    {formData.lessonsList.map((lesson, index) => (
                                        <div key={lesson.id} className="bg-white/5 p-3 rounded-xl border border-white/10 relative group">
                                            <div className="absolute top-2 right-2 flex gap-2">
                                                {formData.lessonsList.length > 1 && (
                                                    <button type="button" onClick={() => removeLesson(index)} className="text-white/30 hover:text-red-400 text-xs">✖</button>
                                                )}
                                            </div>
                                            <div className="space-y-2 mt-2">
                                                <input type="text" placeholder="소제목 (예: 1강. 자음)" value={lesson.title} onChange={(e) => handleLessonChange(index, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-purple" required />
                                                <input type="text" placeholder="유튜브 링크" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-purple" required />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addLesson} className="w-full mt-3 py-2 border border-dashed border-white/20 rounded-xl text-xs text-white/50 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
                                    + 영상 추가하기
                                </button>
                            </div>
                        ) : (
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-xs font-bold text-purple-400 uppercase">🎭 인터랙티브 씬 (Scenes)</label>
                                    <span className="text-[10px] text-white/40">총 {formData.scenesList.length}개 씬</span>
                                </div>
                                <div className="space-y-4">
                                    {formData.scenesList.map((scene, index) => (
                                        <div key={scene.id} className="bg-purple-500/5 p-4 rounded-2xl border border-purple-500/20 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black text-purple-500 bg-purple-500/20 px-2 py-0.5 rounded">SCENE {index + 1}</span>
                                                <button type="button" onClick={() => removeScene(index)} className="text-white/20 hover:text-red-500">✖</button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input type="text" placeholder="챕터 번호" value={scene.chapter} onChange={(e) => handleSceneChange(index, 'chapter', e.target.value)} className="bg-[#080812] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                                                <input type="text" placeholder="씬 제목" value={scene.title} onChange={(e) => handleSceneChange(index, 'title', e.target.value)} className="bg-[#080812] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                                            </div>
                                            <textarea placeholder="메인 콘텐츠 (HTML 지원)" value={scene.content} onChange={(e) => handleSceneChange(index, 'content', e.target.value)} className="w-full bg-[#080812] border border-white/10 rounded-lg px-3 py-2 text-xs text-white h-20" />
                                            <input type="text" placeholder="튜터 대사 (자막)" value={scene.subtitle} onChange={(e) => handleSceneChange(index, 'subtitle', e.target.value)} className="w-full bg-[#080812] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                                            <input type="text" placeholder="아바타 영상 URL" value={scene.avatarVideo} onChange={(e) => handleSceneChange(index, 'avatarVideo', e.target.value)} className="w-full bg-[#080812] border border-white/10 rounded-lg px-3 py-2 text-xs text-blue-300" />

                                            <button type="button" onClick={() => toggleQuiz(index)} className={`w-full py-2 rounded-lg text-[10px] font-bold transition-all ${scene.quiz ? 'bg-green-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                                                {scene.quiz ? '✓ 퀴즈 포함됨' : '+ 퀴즈 추가'}
                                            </button>

                                            {scene.quiz && (
                                                <div className="bg-black/30 p-3 rounded-xl space-y-3 border border-green-500/20">
                                                    <input type="text" placeholder="질문 내용" value={scene.quiz.question} onChange={(e) => handleSceneChange(index, 'quiz.question', e.target.value)} className="w-full bg-transparent border-b border-white/10 text-xs text-white px-1 py-1" />
                                                    {scene.quiz.options.map((opt, optIdx) => (
                                                        <div key={optIdx} className="space-y-1 bg-white/5 p-2 rounded-lg">
                                                            <div className="flex gap-2">
                                                                <input type="text" placeholder={`옵션 ${optIdx + 1}`} value={opt.text} onChange={(e) => handleQuizOptionChange(index, optIdx, 'text', e.target.value)} className="flex-1 bg-transparent border-b border-white/5 text-[10px] text-white" />
                                                                <select value={opt.isCorrect} onChange={(e) => handleQuizOptionChange(index, optIdx, 'isCorrect', e.target.value)} className="bg-transparent text-[9px] text-white">
                                                                    <option value="true">정답</option>
                                                                    <option value="false">오답</option>
                                                                </select>
                                                            </div>
                                                            <input type="text" placeholder="해설(피드백)" value={opt.feedback} onChange={(e) => handleQuizOptionChange(index, optIdx, 'feedback', e.target.value)} className="w-full bg-transparent text-[9px] text-white/50" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addScene} className="w-full mt-3 py-2 border border-dashed border-purple-500/30 rounded-xl text-xs text-purple-400 hover:text-white hover:bg-purple-500/10 transition-all">
                                    + 새 인터랙티브 씬 추가
                                </button>
                            </div>
                        )}

                        <button type="submit" disabled={isSubmitting} className={`w-full mt-6 text-white font-black py-4 rounded-xl transition-all shadow-lg ${editingId ? 'bg-blue-600 hover:bg-blue-500' : 'bg-brand-purple hover:bg-purple-600'}`}>
                            {isSubmitting ? '저장 중...' : (editingId ? '수정 내용 저장하기' : '새 강의 등록하기')}
                        </button>
                    </form>
                </div>

                {/* 오른쪽: 등록된 강의 목록 */}
                <div className="xl:col-span-2 bg-[#12121A] border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-fit">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/5">
                                    <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-white/50">순서</th>
                                    <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-white/50">강의 정보</th>
                                    <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-white/50">타입/가격</th>
                                    <th className="p-5 text-[10px] font-bold uppercase tracking-wider text-white/50 text-right">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {courses.map((course) => (
                                    <tr key={course.id} className={`transition-colors ${editingId === course.id ? 'bg-brand-purple/10' : 'hover:bg-white/[0.02]'}`}>
                                        <td className="p-5">
                                            <span className="w-7 h-7 flex items-center justify-center bg-white/5 rounded-full text-[10px] font-bold text-brand-purple">
                                                {course.order || 0}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-9 bg-[#080812] rounded-lg border border-white/10 flex items-center justify-center text-white/20 text-xs">
                                                    {course.isInteractive ? '🎭' : '🎬'}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-xs flex items-center gap-2">
                                                        {course.title}
                                                        {!course.isPublished && <span className="text-[8px] bg-gray-700 text-gray-300 px-1 py-0.5 rounded">숨김</span>}
                                                        {course.isInteractive && <span className="text-[8px] bg-purple-600 text-white px-1 py-0.5 rounded">인터랙티브</span>}
                                                    </div>
                                                    <div className="text-[10px] text-white/40 mt-1">
                                                        {course.category} | {course.lessonsCount || 0}개 챕터/씬
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col gap-1">
                                                <span className={`text-[10px] font-bold ${course.isLocked ? 'text-red-400' : 'text-green-400'}`}>
                                                    {course.isLocked ? '🔒 유료' : '🔓 무료'}
                                                </span>
                                                <span className="text-[10px] text-white/60">
                                                    {course.price > 0 ? `₩${Number(course.price).toLocaleString()}` : '0'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right whitespace-nowrap">
                                            <button onClick={() => handleEditClick(course)} className="px-2 py-1 bg-white/5 text-white hover:bg-brand-purple rounded text-[10px] font-bold transition-all mr-1">수정</button>
                                            <button onClick={() => handleDelete(course.id, course.title)} className="px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white rounded text-[10px] font-bold transition-all">삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseEditor;

