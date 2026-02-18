import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Play, CheckCircle2, Zap, Globe, Shield, Users, BarChart3, ChevronRight, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const App = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const darkSectionRef = useRef(null);
  const bentoRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // 1. Scroll Interaction: Background Color Transition (White -> Black)
      ScrollTrigger.create({
        trigger: darkSectionRef.current,
        start: "top 60%", // When dark section hits middle of screen
        end: "bottom center",
        onEnter: () => {
          gsap.to(mainRef.current, { backgroundColor: "#0B0C15", color: "#F8FAFC", duration: 0.8 });
          gsap.to("nav", { backgroundColor: "rgba(11, 12, 21, 0.8)", borderColor: "rgba(255,255,255,0.1)", duration: 0.8 });
        },
        onLeaveBack: () => {
          gsap.to(mainRef.current, { backgroundColor: "#FFFFFF", color: "#0F172A", duration: 0.8 });
          gsap.to("nav", { backgroundColor: "rgba(255, 255, 255, 0.8)", borderColor: "rgba(0,0,0,0.05)", duration: 0.8 });
        }
      });

      // 2. Scroll Interaction: Hero UI Reveal (Parallax + Scale)
      gsap.from(".hero-ui", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top center",
          scrub: 1
        }
      });

      // 3. Scroll Interaction: Bento Grid Staggered Reveal
      gsap.from(".bento-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 75%"
        }
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full min-h-screen bg-brand-light text-brand-text transition-colors duration-700">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-8 py-4 flex justify-between items-center z-50 backdrop-blur-md bg-white/80 border-b border-black/5 transition-all duration-700">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">O</div>
          OK KOREA.
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold">
          <a href="#" className="hover:text-brand-purple transition-colors">Solutions</a>
          <a href="#" className="hover:text-brand-purple transition-colors">Resources</a>
          <a href="#" className="hover:text-brand-purple transition-colors">Pricing</a>
        </div>
        <button className="px-5 py-2 bg-brand-dark text-white rounded-lg font-bold hover:bg-brand-purple transition-colors">
          Get Started
        </button>
      </nav>

      {/* SECTION 1: HERO (Light Mode + Gradients) */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Aurora Gradients matches reference */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-multiply animate-blob pointer-events-none"></div>
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 mb-8 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-600">New: 2024 Global Visa Guide Released</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            Step into the future<br />
            of <span className="gradient-text-hero">Korea Life.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            유학부터 취업, 정착까지. 복잡한 한국 생활의 모든 퍼즐을<br />
            OK KOREA의 올인원 솔루션으로 완성하세요.
          </p>

          <div className="flex justify-center gap-4 mb-20">
            <button className="px-8 py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-purple transition-all shadow-xl flex items-center gap-2">
              Start for free <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white text-brand-dark border border-slate-200 rounded-xl font-bold text-lg hover:border-brand-purple transition-all flex items-center gap-2">
              <Play size={18} /> Watch Demo
            </button>
          </div>

          {/* Hero UI Mockup (Parallax) */}
          <div className="hero-ui relative max-w-5xl mx-auto">
            <div className="rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" className="w-full object-cover" alt="Dashboard" />

              {/* Floating Elements mimicking reference */}
              <div className="absolute top-10 left-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">Visa Approved</div>
                  <div className="text-xs text-slate-500">Just now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LOGOS (Social Proof) */}
      <section className="py-10 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by 5,000+ Students & Companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for logos matching style */}
            {['Samsung', 'LG', 'Hyundai', 'SK', 'Naver', 'Kakao'].map(logo => (
              <span key={logo} className="text-xl font-black text-slate-800">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DARK FEATURE (The "Transform" Section) */}
      <section ref={darkSectionRef} className="py-32 px-6 bg-[#0B0C15] text-white overflow-hidden relative">
        {/* Background Glows for Dark Mode */}
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold text-sm border border-brand-purple/30">
              AI-Powered Solution
            </div>
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              Transform your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-orange">Korea Journey.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              데이터 기반의 매칭 시스템으로 당신에게 가장 완벽한 대학과 직장을 찾아드립니다.
              OK KOREA의 독보적인 AI 알고리즘을 경험하세요.
            </p>

            <div className="space-y-4">
              {[
                "실시간 비자 자격 진단",
                "빅데이터 기반 대학/전공 추천",
                "기업 채용 공고 자동 매칭"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <Zap className="text-brand-orange fill-brand-orange" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dark UI Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-orange blur-[40px] opacity-20"></div>
            <div className="relative rounded-2xl bg-[#151621] border border-white/10 p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 p-4 border-b border-white/5 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4 p-4">
                <div className="h-40 rounded-lg bg-white/5 animate-pulse"></div>
                <div className="h-8 w-2/3 rounded-lg bg-white/5"></div>
                <div className="h-8 w-1/2 rounded-lg bg-white/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BENTO GRID (Scroll Interaction 3) */}
      <section ref={bentoRef} className="py-32 px-6 bg-slate-50 text-brand-text">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Everything you need</h2>
            <p className="text-xl text-slate-500">성공적인 정착을 위한 4가지 핵심 솔루션</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-[800px]">
            {/* Bento Item 1 (Large Left) */}
            <div className="bento-item col-span-1 md:col-span-2 row-span-2 rounded-[2rem] bg-white p-10 shadow-xl border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 transition-transform group-hover:scale-150"></div>
              <div className="h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Total Settlement<br />Service</h3>
                  <p className="text-slate-500 text-lg">주거, 통신, 금융까지 한 번에 해결하세요.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1565514020179-0c2235efe9cd?q=80&w=1000&auto=format&fit=crop" className="w-full h-1/2 object-cover rounded-2xl shadow-lg transform group-hover:translate-y-2 transition-transform" />
              </div>
            </div>

            {/* Bento Item 2 (Top Right) */}
            <div className="bento-item rounded-[2rem] bg-[#F8FAFC] p-8 shadow-lg border border-slate-100 hover:border-brand-purple/50 transition-colors">
              <Shield className="text-brand-purple mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Legal Protection</h3>
              <p className="text-slate-500 text-sm">전문 변호사의 법률 자문 서비스 제공</p>
            </div>

            {/* Bento Item 3 (Bottom Right) */}
            <div className="bento-item rounded-[2rem] bg-[#FFF7ED] p-8 shadow-lg border border-orange-100 hover:border-brand-orange/50 transition-colors">
              <Users className="text-brand-orange mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-slate-500 text-sm">5,000명 이상의 글로벌 커뮤니티</p>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 3.5: PERSONA SELECTOR (Light Card) */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Built to empower<br />global citizens like you
            </h2>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {['Students', 'Job Seekers', 'Startups', 'Families', 'Expats'].map((tab, i) => (
                <button key={i} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${i === 0 ? 'bg-white shadow-xl text-brand-purple border border-brand-purple/20 ring-4 ring-brand-purple/5' : 'bg-transparent text-slate-500 hover:bg-slate-100'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Turning students into<br />future leaders</h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1 bg-brand-orange/20 rounded-full h-auto"></div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Boost admission chances by 60%</h4>
                      <p className="text-slate-500 text-sm">AI-driven application strategy that highlights your unique strengths to admission officers.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-brand-purple/20 rounded-full h-auto"></div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Save 100+ hours on prep</h4>
                      <p className="text-slate-500 text-sm">Automated document organizing and translation services that streamline your visa process.</p>
                    </div>
                  </div>
                </div>

                <button className="mt-8 px-6 py-3 border border-slate-200 rounded-lg font-bold text-sm hover:border-brand-purple hover:text-brand-purple transition-colors">
                  Explore Student Solutions
                </button>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden h-[400px] flex items-center justify-center">
                {/* Abstract Illustration Placeholder */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10 text-center">
                  <GraduationCap size={80} className="text-brand-purple mx-auto mb-6 opacity-80" strokeWidth={1} />
                  <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto mb-3">
                    <div className="w-2/3 h-full bg-brand-purple rounded-full animate-pulse"></div>
                  </div>
                  <div className="w-48 h-2 bg-slate-200 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REAL RESULTS (Colored Bento Grid) */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 relative">
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 -rotate-6 text-brand-purple font-handwriting text-2xl animate-bounce">See the insights!</span>
            <h2 className="text-5xl md:text-6xl font-black text-brand-text">Real results from<br />real customers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Row 1 */}
            <div className="bg-[#FEF08A] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">98%<span className="text-2xl align-top">+</span></div>
              <div className="font-medium text-slate-800">Visa Approval Rate</div>
              <div className="font-bold text-xs mt-4 uppercase opacity-50">Global Avg: 72%</div>
            </div>

            <div className="bg-[#86EFAC] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">150<span className="text-2xl align-top">+</span></div>
              <div className="font-medium text-slate-800">Partner Universities</div>
              <div className="font-bold text-xs mt-4 uppercase opacity-50">Across Korea</div>
            </div>

            <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12 relative overflow-hidden">
              <p className="text-xl font-medium text-slate-900 leading-relaxed relative z-10">
                "OK KOREA has helped revive our recruitment pipeline. We found 5 incredible developers in just 2 weeks!"
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm">Sarah Kim</div>
                  <div className="text-xs text-slate-500">HR Director, Toss Lab</div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12">
              <p className="text-xl font-medium text-slate-900 leading-relaxed">
                "Having the ability to automate visa paperwork with AI guidance was a huge upgrade from typical agencies."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm">Michael Chang</div>
                  <div className="text-xs text-slate-500">Student, Yonsei Univ.</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FDE047] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">2<span className="text-2xl align-top">mo</span></div>
              <div className="font-medium text-slate-800">Saved on process</div>
              <div className="font-bold text-xs mt-4 uppercase opacity-50">Fast Track</div>
            </div>

            <div className="bg-[#FBCFE8] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">Top<span className="text-2xl align-top">10</span></div>
              <div className="font-medium text-slate-800">Career Placement</div>
              <div className="font-bold text-xs mt-4 uppercase opacity-50">Major Firms</div>
            </div>

            {/* Row 3 */}
            <div className="bg-[#E9D5FF] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">9<span className="text-2xl align-top">x</span></div>
              <div className="font-medium text-slate-800">ROI on Tuition</div>
              <div className="font-bold text-xs mt-4 uppercase opacity-50">Avg. 1st Year</div>
            </div>

            <div className="bg-[#FBCFE8] rounded-3xl p-8 col-span-1 flex flex-col justify-between min-h-[240px] hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-black text-slate-900 tracking-tighter">4<span className="text-2xl align-top">x</span></div>
              <div className="font-medium text-slate-800">Scholarship Base</div>
              <div className="font-bold text-xs mt-4 uppercase opacity-50">Founding</div>
            </div>

            <div className="bg-[#F8FAFC] rounded-3xl p-8 col-span-1 md:col-span-2 flex flex-col justify-center min-h-[240px] border border-slate-100 px-12">
              <p className="text-xl font-medium text-slate-900 leading-relaxed">
                "We created super-tailored settlement plans for our family, freeing us to focus on enjoying Seoul."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm">David & Lisa</div>
                  <div className="text-xs text-slate-500">Expats from UK</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4.5: BLOG / RESOURCES (Level-Up) */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-400 mb-2">Level-up your Korea game</h2>
            </div>
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">View all articles</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { bg: "bg-[#3B1C1C]", title: "MADE FOR YOU IN 2026", sub: "Visa Insights", color: "text-white" },
              { bg: "bg-[#D8B4FE]", title: "FIND A CEO'S EMAIL", sub: "Job Hunting", color: "text-slate-900" },
              { bg: "bg-[#FEF08A]", title: "MADE FOR YOU DEC 2025", sub: "Trend Report", color: "text-slate-900" },
              { bg: "bg-white", title: "Duo Inbox", sub: "Product Update", color: "text-slate-900", border: true }
            ].map((card, i) => (
              <div key={i} className={`${card.bg} rounded-2xl p-8 aspect-video md:aspect-[4/3] flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform ${card.border ? 'border border-slate-200' : ''}`}>
                <h3 className={`text-2xl font-black ${card.color} uppercase tracking-tighter leading-none`}>{card.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA + FOOTER (Dark again) */}
      <section className="py-20 px-6 bg-[#0B0C15] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            Start your<br />
            <span className="text-brand-purple">Super Journey.</span>
          </h2>
          <button className="px-12 py-5 bg-white text-brand-dark rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Get Started Now
          </button>
        </div>
      </section>

      <footer className="py-12 bg-black text-slate-600 text-sm border-t border-white/10 text-center">
        <p>© 2024 OK KOREA Inc. Inspired by Amplemarket.</p>
      </footer>

    </div>
  );
};

export default App;
