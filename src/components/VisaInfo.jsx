import React, { useState } from 'react';
import { Phone, Mail, ChevronRight, Info } from 'lucide-react';

const VisaInfo = () => {
    const mainMenus = [
        { id: 'd2', name: 'D-2 (유학)' },
        { id: 'd4', name: 'D-4 (일반연수)' },
        { id: 'parttime', name: '시간제 취업' },
        { id: 'jobseeker', name: '졸업 후 진로(D-10)' }
    ];

    const subMenus = {
        d2: [
            { id: 'types', name: '세부 체류자격' },
            { id: 'target', name: '발급 대상' },
            { id: 'documents', name: '제출 서류' }
        ],
        d4: [
            { id: 'types', name: '세부 체류자격' },
            { id: 'korean', name: 'D-4-1 (어학연수)' }
        ],
        parttime: [
            { id: 'permission', name: '허용 기준' },
            { id: 'procedure', name: '신고 절차 및 제한' }
        ],
        jobseeker: [
            { id: 'info', name: '구직비자 (D-10)' },
            { id: 'e7change', name: '취업비자 변경' }
        ]
    };

    const contentData = {
        'd2-types': { title: 'D-2 세부 체류자격', subtitle: '정규 학위 과정 유학생 비자입니다.', content: <ul className="space-y-4"><li><span className="inline-block bg-brand-purple/20 text-brand-purple px-2 py-1 rounded text-xs font-bold mr-2">D-2-1</span> 전문학사</li><li><span className="inline-block bg-brand-purple/20 text-brand-purple px-2 py-1 rounded text-xs font-bold mr-2">D-2-2</span> 학사</li><li><span className="inline-block bg-brand-purple/20 text-brand-purple px-2 py-1 rounded text-xs font-bold mr-2">D-2-3</span> 석사</li><li><span className="inline-block bg-brand-purple/20 text-brand-purple px-2 py-1 rounded text-xs font-bold mr-2">D-2-4</span> 박사</li></ul> },
        'd2-target': { title: '발급 대상', subtitle: '학위 취득 목적의 교육생', content: <div className="border border-white/10 rounded-xl overflow-hidden"><table className="w-full text-left"><tbody><tr className="border-b border-white/10"><th className="bg-white/5 p-4 text-sm font-bold text-slate-300 w-1/3">체류기간</th><td className="p-4 text-sm text-slate-400">최대 2년 (연장 가능)</td></tr><tr><th className="bg-white/5 p-4 text-sm font-bold text-slate-300 w-1/3">범위</th><td className="p-4 text-sm text-slate-400">학사, 석사, 박사 과정</td></tr></tbody></table></div> },
        'd2-documents': {
            title: '제출 서류', subtitle: '기본 필요 서류 목록', content: <ul className="space-y-3">
                {['표준입학허가서', '최종학력 입증서류', '재정능력 증명서류'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div> {item}
                    </li>
                ))}
            </ul>
        },
        'd4-types': { title: 'D-4 세부 자격', subtitle: '어학 및 기술 연수', content: <ul className="space-y-4"><li><span className="inline-block bg-brand-orange/20 text-brand-orange px-2 py-1 rounded text-xs font-bold mr-2">D-4-1</span> 한국어 연수</li><li><span className="inline-block bg-brand-orange/20 text-brand-orange px-2 py-1 rounded text-xs font-bold mr-2">D-4-7</span> 외국어 연수</li></ul> },
        'd4-korean': { title: '어학연수 (D-4-1)', subtitle: '대학 부설 어학당 연수', content: <div className="border border-white/10 rounded-xl overflow-hidden"><table className="w-full text-left"><tbody><tr className="border-b border-white/10"><th className="bg-white/5 p-4 text-sm font-bold text-slate-300 w-1/3">연장단위</th><td className="p-4 text-sm text-slate-400">6개월 단위</td></tr><tr><th className="bg-white/5 p-4 text-sm font-bold text-slate-300 w-1/3">최장기간</th><td className="p-4 text-sm text-slate-400">2년</td></tr></tbody></table></div> },
        'parttime-permission': {
            title: '시간제 취업 기준', subtitle: '허가 후 아르바이트 가능', content: <ul className="space-y-3">
                {['학부생: 주 20~25시간', '대학원생: 주 30~35시간'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {item}
                    </li>
                ))}
            </ul>
        },
        'parttime-procedure': {
            title: '신고 절차', subtitle: '사전 허가 필수 사항', content: <ul className="space-y-3">
                {['고용계약서 체결', '학교 담당자 확인', '출입국 신고 및 허가'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {item}
                    </li>
                ))}
            </ul>
        },
        'jobseeker-info': {
            title: 'D-10 구직 비자', subtitle: '졸업 후 취업 준비 단계', content: <ul className="space-y-4 text-slate-300">
                <li><strong>점수제:</strong> 60점 이상 필수</li>
                <li><strong>기간:</strong> 6개월씩 최장 2년</li>
            </ul>
        },
        'jobseeker-e7change': { title: 'E-7 비자 변경', subtitle: '정식 전문직 취업 비자', content: <div className="border border-white/10 rounded-xl overflow-hidden"><table className="w-full text-left"><tbody><tr className="border-b border-white/10"><th className="bg-white/5 p-4 text-sm font-bold text-slate-300 w-1/3">임금 요건</th><td className="p-4 text-sm text-slate-400">전년도 GNI 80% 이상</td></tr><tr><th className="bg-white/5 p-4 text-sm font-bold text-slate-300 w-1/3">심사</th><td className="p-4 text-sm text-slate-400">전공 연관성 확인</td></tr></tbody></table></div> }
    };

    const [activeMain, setActiveMain] = useState('d2');
    const [activeSub, setActiveSub] = useState('types');

    const activeData = contentData[`${activeMain}-${activeSub}`];

    return (
        <div className="w-full max-w-5xl mx-auto rounded-[32px] overflow-hidden bg-[#13141C] border border-white/5 shadow-2xl mt-20">
            {/* Main Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5">
                {mainMenus.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => {
                            setActiveMain(m.id);
                            setActiveSub(subMenus[m.id][0].id);
                        }}
                        className={`py-6 px-4 text-sm font-bold transition-all ${activeMain === m.id
                                ? 'bg-brand-purple/10 text-brand-purple border-b-2 border-brand-purple'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {m.name}
                    </button>
                ))}
            </div>

            {/* Sub Tabs */}
            <div className="bg-white/[0.02] p-4 flex gap-2 overflow-x-auto scrollbar-hide border-b border-white/5">
                {subMenus[activeMain].map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveSub(s.id)}
                        className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold transition-all border ${activeSub === s.id
                                ? 'bg-brand-purple text-white border-brand-purple shadow-[0_0_15px_rgba(124,58,237,0.3)]'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        {s.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 min-h-[400px]">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                        {activeData.title}
                    </h2>
                    <p className="text-slate-400 font-medium pb-4 border-b border-white/5">
                        {activeData.subtitle}
                    </p>
                </div>

                <div className="animate-fade-in">
                    {activeData.content}
                </div>

                {/* Info Box */}
                <div className="mt-16 p-6 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <h3 className="text-brand-orange font-bold flex items-center gap-2 mb-3">
                        <Info size={18} /> 문의 안내
                    </h3>
                    <p className="text-slate-400 text-sm mb-6">
                        상세한 상담이 필요하시면 아래 연락처로 문의해 주세요. 전문 상담사가 친절히 안내해 드립니다.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center gap-3 text-white font-bold">
                            <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                <Phone size={18} />
                            </div>
                            010-2596-6937
                        </div>
                        <div className="flex items-center gap-3 text-white font-bold">
                            <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                                <Mail size={18} />
                            </div>
                            ok.korea50@gmail.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisaInfo;
