import{r as n,j as e}from"./vendor-CDKqLek8.js";const i="/okkorea/team/nepal-suman.png",s="/okkorea/team/nepal-pratik.png",o="/okkorea/team/nepal-sajina.png",l="/okkorea/team/nepal-pralhad.png",d=n.forwardRef((c,r)=>{const t=[{id:"suman",title:"Digital Transformation",name:"Suman Silwal (CEO)",desc:`9년 이상의 경험으로 비즈니스
디지털 성숙도를 진단하고
전략적 로드맵을 설계합니다.`,img:i},{id:"pratik",title:"Growth & SEO",name:"Pratik Guragain",desc:`검색 최적화와 디지털 캠페인을
통해 글로벌 시장에서의 가시성을
극대화합니다.`,img:s},{id:"sajina",title:"Creative UI/UX",name:"Sajina Silwal",desc:`3년 이상의 디자인 경험으로
아이디어를 직관적이고 매력적인
인터페이스로 구현합니다.`,img:o},{id:"pralhad",title:"International Business",name:"Pralhad Sedhai",desc:`10년 이상의 기술 컨설팅 경험으로
글로벌 시스템 통합 및 리스크관리를 
지원합니다.`,img:l}];return e.jsxs("section",{ref:r,className:"marketing-synergy-section bg-[#080812] py-8 md:py-16 px-4 md:px-6 overflow-hidden",children:[e.jsx("style",{children:`
                .marketing-synergy-section {
                    text-align: center;
                }

                .synergy-header {
                    margin-bottom: 48px;
                }

                .synergy-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    background: rgba(124, 77, 255, 0.15);
                    color: #a88aff;
                    border-radius: 99px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    border: 1px solid rgba(124, 77, 255, 0.3);
                }

                .synergy-header h2 {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 900;
                    color: white;
                    line-height: 1.1;
                    margin-bottom: 20px;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #7c4dff, #ff8a65);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .synergy-header p {
                    color: #94a3b8;
                    font-size: 1.1rem;
                    max-width: 900px; /* Increased to allow one-line display */
                    margin: 0 auto;
                }

                .synergy-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .synergy-card {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    cursor: pointer;
                    height: 420px;
                    background: #0f1020;
                    /* GSAP will handle the entrance, removing 'transition: all' 
                       from the base state to avoid conflicts during reveal */
                    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), 
                                border-color 0.5s ease, 
                                box-shadow 0.5s ease;
                    opacity: 1; /* Ensure visible after GSAP cleanup */
                }

                /* Background image container for each card */
                .card-image-bg {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    z-index: 0;
                    opacity: 0.25;
                    filter: grayscale(100%) brightness(0.6);
                    transition: all 0.7s ease;
                }

                .synergy-card:hover .card-image-bg {
                    opacity: 0.6;
                    filter: grayscale(0%) brightness(0.85);
                    transform: scale(1.1);
                }

                .synergy-card:hover {
                    transform: translateY(-12px);
                    border-color: rgba(124, 77, 255, 0.5);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .card-content {
                    position: relative;
                    z-index: 1;
                    padding: 40px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    background: linear-gradient(to top, rgba(8, 8, 18, 0.95), transparent 70%);
                    text-align: left;
                }


                .card-content h3 {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 8px;
                }

                .member-name {
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #fff;
                    margin-bottom: 12px;
                }

                .member-desc {
                    font-size: 0.95rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    font-weight: 500;
                    white-space: pre-line;
                }
            `}),e.jsxs("div",{className:"synergy-header max-w-4xl mx-auto px-4",children:[e.jsx("span",{className:"synergy-badge",children:"Global Strategic Team"}),e.jsxs("h2",{className:"text-3xl md:text-5xl lg:text-7xl",children:["Everything for your ",e.jsx("span",{className:"gradient-text",children:"Global Growth."})]}),e.jsxs("p",{className:"text-sm md:text-lg",children:["핀테크 및 인슈어테크 전문 파트너와 ",e.jsx("br",{className:"md:hidden"}),"함께 데이터 기반의 마케팅 ",e.jsx("br",{className:"md:hidden"}),"혁신을 시작하세요."]}),e.jsx("p",{className:"text-sm md:text-lg font-bold mt-2",children:"OK KOREA 해외 마케팅 팀"})]}),e.jsx("div",{className:"synergy-grid",children:t.map(a=>e.jsxs("div",{className:`synergy-card card-${a.id}`,children:[e.jsx("div",{className:"card-image-bg",style:{backgroundImage:`url(${a.img})`}}),e.jsxs("div",{className:"card-content",children:[e.jsx("h3",{children:a.title}),e.jsx("p",{className:"member-name",children:a.name}),e.jsx("p",{className:"member-desc",children:a.desc})]})]},a.id))})]})});d.displayName="SynergySection";export{d as default};
