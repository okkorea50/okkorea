import React, { useState } from 'react';
import { Phone, Mail, ChevronRight, Info } from 'lucide-react';

const E7VisaInfo = () => {
    const mainMenus = [
        { id: 'e71', name: 'E-7-1 (전문인력)' },
        { id: 'e72', name: 'E-7-2 (준전문인력)' },
        { id: 'e73', name: 'E-7-3 (일반기능)' },
        { id: 'e74', name: 'E-7-4 (숙련기능)' }
    ];

    const subMenus = {
        e71: [
            { id: 'manager', name: '관리자' },
            { id: 'expert', name: '전문가/관련종사자' },
            { id: 'it', name: 'IT 및 기술' },
            { id: 'medical', name: '의료/교육/법률' },
            { id: 'arts', name: '문화/예술' }
        ],
        e72: [
            { id: 'office', name: '사무 종사자' },
            { id: 'service', name: '서비스 종사자' }
        ],
        e73: [
            { id: 'animal', name: '동물/농림' },
            { id: 'fishery', name: '어업/양식' },
            { id: 'root', name: '제조/뿌리산업' }
        ],
        e74: [
            { id: 'overview', name: '제도 개요' },
            { id: 'requirements', name: '핵심 요건' }
        ]
    };

    const contentData = {
        'e71-manager': {
            title: '관리자 직군 (15개 직종)',
            subtitle: '기업 및 단체의 고위 임원 또는 관리직을 수행하는 인력입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '1110', desc: '경제이익단체 고위임원' },
                        { code: '1120', desc: '기업 고위임원' },
                        { code: '1211', desc: '경영지원 관리자' },
                        { code: '1312', desc: '건설 및 채굴 관리자' },
                        { code: '1320', desc: '정보통신(ICT) 관리자' },
                        { code: '1390', desc: '기타 전문서비스 관리자' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-brand-purple text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e71-expert': {
            title: '전문가 및 관련 종사자 (52개 직종)',
            subtitle: '고도화된 기술을 보유한 과학, 공학계열 인력입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '2111', desc: '생명과학 전문가' },
                        { code: '2112', desc: '자연과학 전문가' },
                        { code: '2121', desc: '건축가 및 건축공학' },
                        { code: '2122', desc: '토목공학 기술자' },
                        { code: '2131', desc: '환경공학 기술자' },
                        { code: '2742', desc: '해외 영업원 (인기)' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-brand-purple text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e71-it': {
            title: 'IT 및 기술 전문직',
            subtitle: '소프트웨어 개발 및 4차 산업 핵심 기술 전문가 그룹입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '2211', desc: '컴퓨터 하드웨어 기술자' },
                        { code: '2212', desc: '통신공학 기술자' },
                        { code: '2223', desc: '웹 개발 및 멀티미디어' },
                        { code: '2224', desc: '데이터 전문가' },
                        { code: '2228', desc: '시스템 소프트웨어 개발' },
                        { code: '2231', desc: '정보보안 전문가' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-brand-purple text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e71-medical': {
            title: '의료, 교육, 법률 및 행정',
            subtitle: '특수 자격이 요구되는 전문 지식 인력입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '2310', desc: '간호사 (국내면허 필수)' },
                        { code: '2520', desc: '대학 강사' },
                        { code: '2591', desc: '해외 기술학교 강사' },
                        { code: '2610', desc: '법률 전문가' },
                        { code: '2715', desc: '경영 및 진단 전문가' },
                        { code: '2720', desc: '금융 및 보험 전문가' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-brand-purple text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e71-arts': {
            title: '문화, 예술 및 디자인',
            subtitle: '창의적 활동을 수행하는 기획 및 디자인 인력입니다.',
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { code: '2730', desc: '상품기획 전문가' },
                            { code: '2810', desc: '작가 및 관련 전문가' },
                            { code: '2830', desc: '화가 및 조각가' },
                            { code: '2840', desc: '디자이너' },
                            { code: '2850', desc: '영상예술 전문가' }
                        ].map(job => (
                            <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                                <span className="text-brand-purple text-xs font-bold mb-1">{job.code}</span>
                                <span className="text-slate-200 font-medium">{job.desc}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                        <p className="text-xs text-brand-purple font-medium leading-relaxed">
                            💡 참고: E-7-1은 전공/경력 요건이 까다로우며, 업체당 국민 고용의 20% 이내로 제한됩니다.
                        </p>
                    </div>
                </div>
            )
        },
        'e72-office': {
            title: '사무 종사자 (5개 직종)',
            subtitle: '학력 또는 일정 경력을 요구하는 전문 사무 직종입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '3112', desc: '면세점/제주 판매원' },
                        { code: '3121', desc: '항공운송 사무원' },
                        { code: '3122', desc: '호텔 접수 사무원' },
                        { code: '3126', desc: '의료 코디네이터' },
                        { code: '3990', desc: '고객상담 사무원' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-brand-orange text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e72-service': {
            title: '서비스 종사자 (4개 직종)',
            subtitle: '전문 서비스 스킬을 요하는 분야입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '4320', desc: '운송 서비스 (승무원)' },
                        { code: '4410', desc: '주방장 및 조리사' },
                        { code: '4420', desc: '통·번역가 (관광 등)' },
                        { code: '4440', desc: '카지노 딜러' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-brand-orange text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e73-animal': {
            title: '동물 사육 및 조련',
            subtitle: '특수 기술을 요하는 동식물 숙련직입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '6131', desc: '동물 사육사' },
                        { code: '6139', desc: '기타 농림어업 숙련직' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-blue-400 text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e73-fishery': {
            title: '어업 및 양식',
            subtitle: '현장 숙련 기술이 필요한 수산업 직종입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '6300', desc: '양식 기술자 (고도기술)' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-blue-400 text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e73-root': {
            title: '제조 및 뿌리산업 기술',
            subtitle: '국가 기반 산업 현장의 핵심 기능 인력입니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { code: '7430', desc: '조선용접 기능공' },
                        { code: '7520', desc: '항공기 정비원' },
                        { code: '7700', desc: '금속 재료 제조 기능직' }
                    ].map(job => (
                        <div key={job.code} className="flex flex-col p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                            <span className="text-blue-400 text-xs font-bold mb-1">{job.code}</span>
                            <span className="text-slate-200 font-medium">{job.desc}</span>
                        </div>
                    ))}
                </div>
            )
        },
        'e74-overview': {
            title: '숙련기능인력 (K-point E74) 개요',
            subtitle: '비숙련 외국인 근로자의 장기 체류 비자 변경 제도입니다.',
            content: (
                <div className="space-y-6">
                    <p className="text-slate-400 leading-relaxed">E-7-4 비자는 별도의 직종 코드보다 <strong>비자 변경 제도</strong>의 성격이 강합니다.</p>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            { title: '대상', desc: 'E-9, E-10, H-2 비자로 4-5년 이상 근무한 숙련 외국인' },
                            { title: '방식', desc: '점수제(K-point E74)를 통한 선발' },
                            { title: '조건', desc: '현 근무지(제조, 건설, 뿌리 등) 계속 근무 조건' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl">
                                <div className="w-2 h-2 rounded-full bg-brand-orange mt-2 flex-shrink-0"></div>
                                <div>
                                    <span className="block text-white font-bold text-sm mb-1">{item.title}</span>
                                    <span className="text-slate-400 text-sm">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        'e74-requirements': {
            title: '핵심 선발 요건',
            subtitle: '고득점자 순으로 선발되며 항목별 합산 평가가 진행됩니다.',
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { icon: "1️⃣", title: "기본 요건", desc: "10년 이내 4년 이상 국내 합법 취업" },
                        { icon: "2️⃣", title: "소득 요건", desc: "연봉 2,600만원 이상 (2년 평균)" },
                        { icon: "3️⃣", title: "한국어 능력", desc: "TOPIK 2급 이상 또는 KIIP 2단계" },
                        { icon: "4️⃣", title: "가점 항목", desc: "추천서, 근속, 나이, 자산 등" }
                    ].map((item, i) => (
                        <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-brand-orange/30 transition-all group">
                            <span className="text-2xl mb-3 block">{item.icon}</span>
                            <h4 className="text-white font-bold mb-2 group-hover:text-brand-orange transition-colors">{item.title}</h4>
                            <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            )
        }
    };

    const [activeMain, setActiveMain] = useState('e71');
    const [activeSub, setActiveSub] = useState('manager');

    const activeData = contentData[`${activeMain}-${activeSub}`];

    return (
        <div className="bottom-feature-card w-full max-w-5xl mx-auto overflow-hidden mt-20">
            {/* Main Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5">
                {mainMenus.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => {
                            setActiveMain(m.id);
                            const nextSub = subMenus[m.id][0].id;
                            setActiveSub(nextSub);
                        }}
                        className={`py-6 px-4 text-sm font-bold transition-all relative ${activeMain === m.id
                            ? 'bg-brand-purple/10 text-brand-purple'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {m.name}
                        {activeMain === m.id && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-orange shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>
                        )}
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
            <div className="p-8 md:p-12 min-h-[450px]">
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
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                    <h3 className="text-brand-orange font-bold flex items-center gap-2 mb-3">
                        <Info size={18} /> E-7 비자 문의 안내
                    </h3>
                    <p className="text-slate-400 text-sm mb-6">
                        직종별 세부 자격 요건 및 고용 추천서 발급 절차에 대해 궁금하신 점이 있다면 언제든 문의해 주세요.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 relative z-10">
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

export default E7VisaInfo;
