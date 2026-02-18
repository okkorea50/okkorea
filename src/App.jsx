import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, GraduationCap, Briefcase, FileText, Home, CheckCircle2, Menu, X, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const App = () => {
  const mainRef = useRef(null);
  const horizontalRef = useRef(null);
  const parallaxRef = useRef(null);
  const parallaxImgRef = useRef(null);
  const horizontalContainerRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. GSAP Register Plugin (Vite/React environment)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // (1) Hero Text Reveal
      const tl = gsap.timeline();
      tl.from(".hero-title-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      })
        .from(".hero-sub", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.8");

      // (2) Parallax Image
      gsap.to(parallaxImgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // (3) Horizontal Scroll
      const sections = gsap.utils.toArray(".horizontal-panel");
      // Use offsetWidth logic for safe calculation
      // For a 400% width container, we want to scroll 3 screens worth (300%)
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + horizontalContainerRef.current.offsetWidth,
        }
      });

      // (4) Background Color Transition
      ScrollTrigger.create({
        trigger: "#expertise-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(mainRef.current, { backgroundColor: "#F8FAFC", color: "#0F172A", duration: 0.5 }),
        onLeave: () => gsap.to(mainRef.current, { backgroundColor: "#0F172A", color: "#F8FAFC", duration: 0.5 }),
        onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: "#F8FAFC", color: "#0F172A", duration: 0.5 }),
        onLeaveBack: () => gsap.to(mainRef.current, { backgroundColor: "#0F172A", color: "#F8FAFC", duration: 0.5 })
      });

      // (5) Reveal Stats on Scroll
      gsap.from(".stat-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#expertise-section",
          start: "top 70%"
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-slate-900 text-slate-50 font-sans transition-colors duration-500 overflow-x-hidden w-full min-h-screen">

      {/* 1. Global Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div className="text-2xl font-black tracking-tighter cursor-pointer">OK KOREA.</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium items-center">
          <a href="#" className="hover:text-blue-400 transition-colors">Study</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Career</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Visa</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Life</a>
          <button className="px-6 py-2 bg-white text-slate-900 rounded-2xl font-bold hover:bg-blue-50 transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-slate-900 flex flex-col items-center justify-center gap-8 z-40">
            <a href="#" className="text-2xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>Study</a>
            <a href="#" className="text-2xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>Career</a>
            <a href="#" className="text-2xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>Visa</a>
            <a href="#" className="text-2xl font-bold text-white" onClick={() => setIsMenuOpen(false)}>Life</a>
          </div>
        )}
      </nav>

      {/* 2. Hero Section (The Trust Builder) */}
      <section className="h-screen flex flex-col justify-center items-center relative px-4 text-center">
        <div className="z-10 max-w-5xl">
          <div className="overflow-hidden">
            <h1 className="hero-title-line text-[12vw] md:text-[8vw] leading-[0.9] font-black tracking-tight text-white mb-2">
              BEYOND
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-title-line text-[12vw] md:text-[8vw] leading-[0.9] font-black tracking-tight text-blue-500">
              BORDERS
            </h1>
          </div>

          <p className="hero-sub mt-8 text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            유학, 취업, 그리고 완벽한 정착까지.<br className="md:hidden" />
            20년 경력의 전문가 그룹이 당신의 한국 생활을 설계합니다.
          </p>

          <div className="hero-sub mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
              무료 상담 신청하기 <ArrowRight size={20} />
            </button>
            <span className="text-sm text-slate-400">5,000+ 명의 학생들이 선택했습니다</span>
          </div>
        </div>

        {/* Background Gradient Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      </section>

      {/* 2.5 Parallax Intro Section */}
      <section ref={parallaxRef} className="min-h-[80vh] py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-slate-900">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
              신뢰할 수 있는<br />
              <span className="text-blue-500">유일한 파트너.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              낯선 땅에서의 시작은 두려움이 아닌 설렘이어야 합니다.
              우리는 단순한 에이전시가 아닙니다. 당신의 잠재력을
              한국이라는 무대에서 증명할 수 있도록 돕는
              전략적 파트너입니다.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">98%</span>
                <span className="text-sm text-slate-500">비자 승인률</span>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">Top 10</span>
                <span className="text-sm text-slate-500">대학 진학 전문</span>
              </div>
            </div>
          </div>

          {/* Parallax Image Wrapper */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl border border-slate-700">
            <img
              ref={parallaxImgRef}
              src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2553&auto=format&fit=crop"
              alt="Korean City Life"
              className="absolute top-[-20%] left-0 w-full h-[140%] object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Scroll Services (Interactive) */}
      <section ref={horizontalRef} className="h-screen overflow-hidden bg-slate-900 relative">
        <div
          ref={horizontalContainerRef}
          className="flex h-full w-[400%]" // 400% width for 4 panels
        >
          {/* Panel 1 */}
          <div className="horizontal-panel w-screen h-full flex flex-col justify-center px-8 md:px-32 border-r border-slate-800 bg-slate-900 shrink-0 relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="text-blue-500 font-bold mb-4 tracking-widest uppercase">Our Service 01</h3>
              <h2 className="text-5xl md:text-8xl font-black mb-8 text-white">Study<br />In Korea</h2>
              <p className="text-xl text-slate-400 max-w-md">
                나에게 맞는 대학과 전공은 무엇일까요? 입학부터 장학금까지, A to Z 솔루션.
              </p>
              <div className="mt-12">
                <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-blue-400 hover:border-blue-400 transition-colors">
                  교육 컨설팅 자세히 보기 <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <GraduationCap className="absolute bottom-20 right-10 md:right-40 text-slate-800 opacity-20" size={300} strokeWidth={0.5} />
          </div>

          {/* Panel 2 */}
          <div className="horizontal-panel w-screen h-full flex flex-col justify-center px-8 md:px-32 border-r border-slate-800 bg-slate-900 shrink-0 relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="text-purple-500 font-bold mb-4 tracking-widest uppercase">Our Service 02</h3>
              <h2 className="text-5xl md:text-8xl font-black mb-8 text-white">Career<br />Matching</h2>
              <p className="text-xl text-slate-400 max-w-md">
                한국 기업 문화에 맞춘 이력서 첨삭과 면접 코칭. 당신의 커리어를 연결합니다.
              </p>
              <div className="mt-12">
                <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-purple-400 hover:border-purple-400 transition-colors">
                  채용 연계 프로그램 보기 <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <Briefcase className="absolute top-20 right-10 md:right-40 text-slate-800 opacity-20" size={300} strokeWidth={0.5} />
          </div>

          {/* Panel 3 */}
          <div className="horizontal-panel w-screen h-full flex flex-col justify-center px-8 md:px-32 border-r border-slate-800 bg-slate-900 shrink-0 relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="text-emerald-500 font-bold mb-4 tracking-widest uppercase">Our Service 03</h3>
              <h2 className="text-5xl md:text-8xl font-black mb-8 text-white">Visa &<br />Legal</h2>
              <p className="text-xl text-slate-400 max-w-md">
                D-2, D-10, E-7. 복잡한 비자 문제, 전문 행정사가 확실하게 해결해드립니다.
              </p>
              <div className="mt-12">
                <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-emerald-400 hover:border-emerald-400 transition-colors">
                  비자 상담 신청하기 <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <FileText className="absolute bottom-20 right-10 md:right-40 text-slate-800 opacity-20" size={300} strokeWidth={0.5} />
          </div>

          {/* Panel 4 */}
          <div className="horizontal-panel w-screen h-full flex flex-col justify-center px-8 md:px-32 bg-slate-900 shrink-0 relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="text-orange-500 font-bold mb-4 tracking-widest uppercase">Our Service 04</h3>
              <h2 className="text-5xl md:text-8xl font-black mb-8 text-white">Life<br />Settlement</h2>
              <p className="text-xl text-slate-400 max-w-md">
                안전한 집 구하기부터 은행 계좌 개설까지. 한국 생활의 첫 걸음을 함께합니다.
              </p>
              <div className="mt-12">
                <button className="flex items-center gap-2 text-white border-b border-white pb-1 hover:text-orange-400 hover:border-orange-400 transition-colors">
                  정착 패키지 확인하기 <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <Home className="absolute top-20 right-10 md:right-40 text-slate-800 opacity-20" size={300} strokeWidth={0.5} />
          </div>
        </div>
      </section>

      {/* 4. Proof of Expertise (Background Color Change) */}
      <section id="expertise-section" className="py-32 px-6 bg-[#F8FAFC] text-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              숫자가 증명하는<br />압도적인 전문성
            </h2>
            <p className="text-slate-500 text-lg">성공적인 한국 정착, 결과로 보여드립니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "누적 지원 학생", value: "1,000+", desc: "전 세계 30개국 학생들" },
              { label: "협력 대학 및 기업", value: "250+", desc: "검증된 파트너십 네트워크" },
              { label: "취업 매칭 성공률", value: "92%", desc: "졸업 후 6개월 이내 취업" }
            ].map((stat, idx) => (
              <div key={idx} className="stat-card bg-white p-10 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl font-black text-blue-600 mb-4">{stat.value}</div>
                <div className="text-xl font-bold text-slate-900 mb-2">{stat.label}</div>
                <div className="text-slate-500">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Start Your Journey<br />In Korea Today.
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            더 이상 혼자 고민하지 마세요. 당신의 꿈을 현실로 만드는 가장 빠른 길입니다.<br />
            지금 무료 상담을 신청하고 맞춤형 로드맵을 받아보세요.
          </p>
          <button className="px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-xl shadow-blue-600/40 hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-3 mx-auto">
            지금 무료 상담 신청하기 <ArrowRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-500 text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white font-bold text-xl">OK KOREA.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">오시는 길</a>
          </div>
          <div className="text-center md:text-right">
            © 2024 OK KOREA Corp. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
