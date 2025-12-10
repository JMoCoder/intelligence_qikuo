import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  useInView,
  useSpring
} from 'framer-motion';
import { 
  Menu, X, ArrowRight, BarChart3, 
  Building2, Zap, Car, Layers, 
  TrendingUp, ShieldCheck, Database,
  ArrowUpRight, User, ExternalLink,
  ChevronRight, RefreshCw
} from 'lucide-react';
import { Logo } from './components/Logo';
import { Section } from './components/Section';
import { TeamMember } from './types';

// --- Data Constants (Content Fixed) ---

const NAV_ITEMS = [
  { label: '首页', href: '#home' },
  { label: '关于颀阔', href: '#about' },
  { label: '业务模式', href: '#model' },
  { label: '重点领域', href: '#sectors' },
  { label: '核心技术', href: '#tech' },
  { label: '管理团队', href: '#team' },
];

const FOOTER_LINKS = [
  { label: '关于颀阔', href: '#about' },
  { label: '业务模式', href: '#model' },
  { label: '重点领域', href: '#sectors' },
  { label: '核心技术', href: '#tech' },
  { label: '管理团队', href: '#team' },
];

const TEAM_DATA: TeamMember[] = [
  {
    name: "周鹏",
    role: "执行董事",
    bio: "曾任尚颀资本董事总经理、尚掣智能董事长。拥有20余年金融及汽车产业经验，主导发行国内首单车贷ABS。在资产证券化、私募股权投资及固收领域拥有深厚的行业积累，全面负责公司战略规划与资本运作。",
    education: "法国波尔多大学 / IPAG商学院 硕士"
  },
  {
    name: "邹海",
    role: "总经理",
    bio: "曾任光大保德信基金机构部总监、平安养老险分公司副总。精通资产证券化及金融产品营销，擅长资金端渠道建设。创新建立了“Pre-REITs基金+ABS”的业务闭环模型，解决了资产流动性难题并创造稳健收益。",
    education: "上海财经大学 保险精算 本科"
  },
  {
    name: "桂仑",
    role: "副总经理",
    bio: "曾任上汽财务固收部高级经理，拥有13年固定收益投资及管理经验。专注于能源与基础设施领域，主导开发了颀阔新能源和停车资产数据服务系统，通过数字化手段实现了底层资产的透明化管理。",
    education: "同济大学 技术经济及管理 硕士"
  },
  {
    name: "席诚悦",
    role: "总经理助理",
    bio: "曾任尚颀资本创新业务部投资助理。特许金融分析师（CFA）、金融风险管理师（FRM）持证人。具备扎实的金融理论功底，负责多个Pre-REITs基金的前期商务谈判、交易结构设计及全流程方案落地。",
    education: "英国华威大学 经济与国际金融 硕士"
  }
];

const PARTNERS = [
  '上汽集团', 
  '尚颀资本', 
  '瑞能新动力', 
  '风泉资本', 
  '晶科能源', 
  '首正创信', 
  '中国城市公共交通协会'
];

const BUSINESS_INTRO_URL = "https://jmocoder.github.io/iq_reits_intro/";
const CLASSROOM_URL = "https://jmocoder.github.io/iq_knowledge_share/";
const REITS_MARKET_URL = "https://cnreitspro.netlify.app/";

// --- Utility Components ---

const Counter = ({ value, suffix = "" }: { value: number, suffix?: React.ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { stiffness: 50, damping: 15, duration: 2000 });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
        x: [0, 50, 0],
        y: [0, 30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-purple-200/20 rounded-full blur-[100px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        x: [0, -30, 0],
        y: [0, 50, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[80px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        x: [0, 40, 0],
        y: [0, -40, 0]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[90px]" 
    />
  </div>
);

// --- Main Component ---

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      try {
        const element = document.querySelector(href);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          setMobileMenuOpen(false);
        }
      } catch (err) {
        console.error("Navigation error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-purple-500/30 selection:text-purple-900 font-sans">
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* --- Navigation --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 py-3 shadow-lg shadow-slate-200/20' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <Logo className="h-10 w-10 drop-shadow-sm" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">颀阔智能</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold group-hover:text-purple-500 transition-colors">Intelligence Qikuo</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors rounded-full"
              >
                {hoveredNav === item.href && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
            <div className="w-px h-6 bg-slate-300 mx-2" />
            <a 
              href={REITS_MARKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-purple-700 transition-all flex items-center gap-1.5 group"
            >
              REITs行情
              <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a 
              href={CLASSROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-purple-700 transition-all flex items-center gap-1.5 group"
            >
              颀阔课堂
              <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a 
              href={BUSINESS_INTRO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-purple-700 transition-all flex items-center gap-1.5 group"
            >
              业务介绍
              <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-2 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-purple-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20"
            >
              联系我们
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-xl">
              {NAV_ITEMS.map((item, i) => (
                <motion.a 
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-bold text-slate-800 border-b border-slate-100 pb-4 flex justify-between items-center"
                >
                  {item.label}
                  <ChevronRight size={16} className="text-slate-400" />
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                href={REITS_MARKET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-700 border-b border-slate-100 pb-4 flex items-center gap-2"
              >
                REITs行情 <ExternalLink size={18} />
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                href={CLASSROOM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-700 border-b border-slate-100 pb-4 flex items-center gap-2"
              >
                颀阔课堂 <ExternalLink size={18} />
              </motion.a>
              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                href={BUSINESS_INTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-purple-700 border-b border-slate-100 pb-4 flex items-center gap-2"
              >
                业务介绍 <ExternalLink size={18} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/60 border border-purple-200/50 backdrop-blur-md shadow-sm text-purple-800 text-sm font-semibold mb-8 hover:bg-white/80 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
              </span>
              上汽尚颀资本孵化企业
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
              懂资产运营的<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 animate-gradient-x">
                数据服务商
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mb-12 leading-relaxed font-light">
              致力于通过“Pre-REITs基金 + 科技化运营”模式，锁定并培育优质基础设施资产，数据驱动资产增值，实现高溢价退出。
            </p>
            
            <motion.div 
              className="flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href={BUSINESS_INTRO_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="group relative px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg overflow-hidden shadow-2xl shadow-purple-900/30 hover:shadow-purple-700/40 transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-3">
                  业务介绍
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, '#about')}
                className="px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:bg-white hover:border-purple-200 transition-all hover:-translate-y-1 shadow-sm"
              >
                了解更多
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-slate-300 to-transparent mx-auto mb-2" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* --- About Section --- */}
      <Section id="about" className="bg-white">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-slate-900 tracking-tight">企业背景与使命</h2>
            <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
              <p>
                上海颀阔智能科技有限公司孵化于上汽集团旗下私募股权基金管理人——<strong className="text-slate-900 bg-slate-100 px-1 rounded">尚颀资本</strong>。我们兼具“产业方”与“资本方”的双重基因。
              </p>
              <p>
                为配合产品交易结构安排，公司就原创新业务部进行市场化改制，专业承担 ABS、REITs、Pre-REITs 等创新类业务。我们全力支持体系内资产盘活，同时探索体系外如储能、停车场等现金流充裕场景。
              </p>
              <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  核心定位
                </h4>
                <p className="text-base text-slate-700">打造数字化的科技型资产管理技术提供商，通过数据穿透底层资产，修复现金流，实现价值重估。</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-100/50 flex flex-col items-center justify-center text-center group"
             >
                <span className="text-5xl font-black text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300 block">
                  <Counter value={443} suffix={<span className="text-2xl ml-1">亿+</span>} />
                </span>
                <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">尚颀资本<br/>管理规模</span>
             </motion.div>
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl border border-purple-100 shadow-xl shadow-purple-100/50 flex flex-col items-center justify-center text-center group"
             >
                <span className="text-5xl font-black text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300 block">
                  <Counter value={200} suffix={<span className="text-2xl ml-1">+</span>} />
                </span>
                <span className="text-sm text-slate-500 font-bold uppercase tracking-wide">投资产业链<br/>优质企业</span>
             </motion.div>
             <motion.div 
               whileHover={{ y: -5 }}
               className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center col-span-2 group relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-5xl font-black text-white mb-3 relative z-10 group-hover:scale-110 transition-transform duration-300 block">
                  <Counter value={3} suffix={<span className="text-2xl ml-1">倍</span>} />
                </span>
                <span className="text-sm text-slate-300 font-bold uppercase tracking-wide relative z-10">资产REITs上市<br/>潜在估值提升</span>
             </motion.div>
          </div>
        </div>
      </Section>

      {/* --- Business Model (Pre-REITs) - REDESIGNED --- */}
      <Section id="model" className="bg-slate-900 text-white overflow-hidden">
        <AnimatedBackground />
        
        <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold tracking-wider text-xs uppercase mb-4 backdrop-blur-sm">
            我们的模式
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 md:whitespace-nowrap">
            Pre-REITs 全生命周期闭环
          </h2>
          <p className="text-slate-400 text-lg">
            构建“募、投、管、退”金融生态闭环，<br className="md:hidden"/>解决优质资产培育痛点。
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[88px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/50 to-emerald-500/30 -z-10" />
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                icon: <Layers size={32} />, 
                title: "资产归集 (募/投)", 
                desc: "设立Pre-REITs基金，收购分散的优质基础设施资产（停车场、储能）。",
                color: "text-blue-400",
                step: "01"
              },
              { 
                icon: <Zap size={32} />, 
                title: "科技运营 (管)", 
                desc: "引入颀阔BI系统，穿透底层数据，堵塞漏洞，提升现金流与运营效率。",
                color: "text-yellow-400",
                step: "02"
              },
              { 
                icon: <TrendingUp size={32} />, 
                title: "价值重估 (孵化)", 
                desc: "通过合规化改造和运营提升，使资产收益率达到公募REITs发行要求。",
                color: "text-purple-400",
                step: "03"
              },
              { 
                icon: <RefreshCw size={32} />, 
                title: "证券化退出 (退)", 
                desc: "对接公募REITs、ABS或上市公司并购，实现资产高溢价退出，完成闭环。",
                color: "text-emerald-400",
                step: "04"
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl h-full hover:bg-slate-800 transition-all duration-300 hover:border-slate-600 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/10">
                  <div className="flex justify-center mb-6 relative">
                     <div className={`w-20 h-20 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 relative z-10 ${step.color}`}>
                       {step.icon}
                     </div>
                     {/* Connector dot on line */}
                     <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-900 rounded-full -z-10" />
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-black text-slate-800 group-hover:text-slate-700 transition-colors mb-2 absolute top-4 right-4 opacity-50 select-none">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Sectors --- */}
      <Section id="sectors" className="bg-slate-50">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">重点布局领域</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            紧跟国家“双碳”战略与基础设施建设需求，聚焦两大现金流充裕的细分赛道。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Energy Storage */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="h-64 bg-gradient-to-br from-green-600 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -bottom-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"
              />
              <Zap size={80} className="text-white/20 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Zap size={28} /></div>
                <h3 className="text-3xl font-bold text-slate-900">工商业储能</h3>
              </div>
              <p className="text-slate-600 mb-8 text-justify leading-relaxed">
                利用峰谷电价差套利，现金流稳定。未来可参与电力辅助服务创造超额收益。通过基金助力，加速挖掘上汽产业链内外的优质工商业客户资源。
              </p>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span>峰谷价差套利 (核心收益)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span>电力辅助服务 (增值收益)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span>设备可重复利用，风险可控</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Parking */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100"
          >
            <div className="h-64 bg-gradient-to-br from-blue-700 to-indigo-950 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
               <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -left-20 -top-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
              />
              <Car size={80} className="text-white/20 relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Car size={28} /></div>
                <h3 className="text-3xl font-bold text-slate-900">智慧停车场</h3>
              </div>
              <p className="text-slate-600 mb-8 text-justify leading-relaxed">
                属于强现金流资产，但存在分散、管理效率低等痛点。颀阔通过收购分散资产，实施数字化改造，堵塞漏洞，提升收入，使其达到REITs发行标准。
              </p>
              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                  <span>数字化改造，杜绝跑冒滴漏</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                  <span>单车位日均收入显著提升</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                  <span>中国停车产业数字化共建企业</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- Technology (BI) --- */}
      <Section id="tech" className="bg-white overflow-visible">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col h-full justify-center">
            <div className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold tracking-widest mb-6 shadow-lg shadow-slate-900/20 self-start">QIKUO BI SYSTEM</div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900">颀阔 BI <br/>智慧运营管理系统</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              一款专为现代资产设计的一体化解决方案。集成物联网、大数据分析和 AI 算法，实现对资产的全链条穿透式监控。
              <span className="block mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium text-slate-700">
                目前系统管理覆盖场库总数 <span className="text-purple-600 font-bold text-lg">804</span> 个<br/>
                车位数 <span className="text-purple-600 font-bold text-lg">463,335</span> 个
              </span>
            </p>
            
            <div className="space-y-8">
              {[
                { icon: <Building2 className="text-white" />, title: '管好“钱”', desc: '全周期资金监控，自动生成不可篡改的财务报表，保障现金流稳定。', bg: 'bg-blue-500' },
                { icon: <ShieldCheck className="text-white" />, title: '管好“人”', desc: '量化运营能力，通过数据对比发现短板，驱动管理优化。', bg: 'bg-purple-500' },
                { icon: <Database className="text-white" />, title: '管好“物”', desc: '物联网实时采集运营数据（如充放电量、车位状态），形成完整数字画像。', bg: 'bg-indigo-500' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex gap-5 group"
                >
                  <div className={`mt-1 w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shadow-lg shadow-${item.bg.split('-')[1]}-200 shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white flex items-center justify-between shadow-2xl relative overflow-hidden group cursor-pointer hover:bg-slate-800 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Feature</span>
                <span className="font-bold text-xl">AI 智能分析报告</span>
              </div>
              <BarChart3 className="text-purple-400 group-hover:scale-110 transition-transform" size={32} />
            </div>
          </div>
          
          <div className="relative perspective-[2000px] h-full flex items-center">
            <motion.div 
               initial={{ rotateY: -10, rotateX: 5 }}
               whileInView={{ rotateY: 0, rotateX: 0 }}
               transition={{ duration: 1.5, type: "spring" }}
               className="relative bg-slate-900 p-3 rounded-2xl shadow-2xl border border-slate-800 w-full"
            >
              {/* Abstract UI Representation */}
              <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800/50 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="flex items-center gap-2 p-4 border-b border-slate-800 bg-slate-900/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-slate-800 rounded-md text-[10px] text-slate-400 font-mono border border-slate-700 flex items-center gap-2 w-full max-w-[200px]">
                    <span className="text-green-500">🔒</span> dashboard.qikuo.ai
                  </div>
                </div>
                
                <div className="p-6 grid grid-cols-2 gap-4">
                   {/* Main chart area */}
                   <div className="col-span-2 bg-slate-800/50 h-44 rounded-lg p-4 border border-slate-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 z-10"></div>
                      {/* Graph Lines */}
                      <svg className="w-full h-full absolute bottom-0 left-0 z-0 opacity-50" preserveAspectRatio="none">
                        <motion.path 
                          d="M0,100 C100,50 200,80 300,20 L400,60 L500,10"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </svg>
                   </div>
                   
                   {/* Small stats cards */}
                   <div className="bg-slate-800/50 h-44 rounded-lg border border-slate-800 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <TrendingUp size={16} />
                      </div>
                      <div className="space-y-2">
                         <div className="w-12 h-2 bg-slate-700 rounded-full"></div>
                         <div className="w-20 h-2 bg-slate-700 rounded-full"></div>
                      </div>
                      <div className="w-full h-16 bg-blue-500/10 rounded mt-2 border border-blue-500/20 relative">
                         <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-2 pb-2 gap-1">
                             <div className="w-1/4 h-[40%] bg-blue-500/50 rounded-sm"></div>
                             <div className="w-1/4 h-[70%] bg-blue-500/50 rounded-sm"></div>
                             <div className="w-1/4 h-[50%] bg-blue-500/50 rounded-sm"></div>
                             <div className="w-1/4 h-[80%] bg-blue-500/50 rounded-sm"></div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="bg-slate-800/50 h-44 rounded-lg border border-slate-800 p-4 flex flex-col justify-between">
                      <div className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Zap size={16} />
                      </div>
                       <div className="space-y-2">
                         <div className="w-12 h-2 bg-slate-700 rounded-full"></div>
                         <div className="w-16 h-2 bg-slate-700 rounded-full"></div>
                      </div>
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-slate-700 border-t-purple-500 border-r-purple-500 rotate-45 mt-2"></div>
                   </div>

                   {/* Bottom tall section */}
                   <div className="col-span-2 bg-slate-800/50 h-56 rounded-lg border border-slate-800 flex items-end justify-between px-6 pb-0 pt-6 gap-3">
                      {[40, 70, 50, 90, 60, 80, 45, 75, 55, 95].map((h, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ delay: idx * 0.05, duration: 0.8 }}
                          className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-md opacity-80"
                        />
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* --- Team --- */}
      <Section id="team" className="bg-slate-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">核心管理团队</h2>
          <p className="text-lg text-slate-600">深耕金融与产业多年，拥有丰富的资产证券化与运营管理经验。</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {TEAM_DATA.map((member, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Photo Placeholder */}
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl mb-6 overflow-hidden relative group-hover:shadow-inner transition-all">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                  <User size={64} className="mb-2 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Photo Unavailable</span>
                </div>
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{member.name}</h3>
                <p className="text-purple-600 font-semibold text-sm mt-1">{member.role}</p>
              </div>
              
              <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow text-justify">
                {member.bio}
              </p>
              
              <div className="pt-5 border-t border-slate-100 mt-auto">
                <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Education</p>
                <p className="text-xs text-slate-700 font-medium mt-1">{member.education}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- Partners / Cases --- */}
      <Section id="partners" className="bg-white">
        <div className="text-center max-w-7xl mx-auto">
          <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-10">部分合作伙伴与储备项目</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {PARTNERS.map((partner, i) => (
               <motion.span 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="px-6 py-4 bg-slate-50 rounded-xl text-slate-600 font-bold border border-slate-100 hover:border-purple-200 hover:text-purple-700 hover:bg-white hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 cursor-default select-none whitespace-nowrap"
               >
                 {partner}
               </motion.span>
            ))}
          </div>
        </div>
      </Section>

      {/* --- Footer --- */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900 relative overflow-hidden">
        {/* Footer Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Logo className="h-10 w-10 text-white" />
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl">颀阔智能</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Intelligence Qikuo</span>
              </div>
            </div>
            <p className="text-sm leading-7 mb-8 text-slate-400 max-w-sm">
              上海颀阔智能科技有限公司<br/>
              <span className="text-slate-300">懂资产运营的数据服务商</span><br/>
              Pre-REITs基金 + 科技化运营
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-8 text-lg">快速链接</h4>
            <ul className="space-y-4 text-sm">
              {FOOTER_LINKS.map((item, i) => (
                <li key={i}>
                  <a href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="hover:text-purple-400 transition-colors block py-1">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 text-lg">联系方式</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 text-purple-500 flex items-center justify-center"><Building2 size={18}/></div>
                <span>上海市嘉定区墨玉路185号1层J</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 text-purple-500 flex items-center justify-center"><span className="font-bold text-lg">@</span></div>
                <span className="text-white">contact@qikuo.ai</span>
              </li>
              <li>
                 <div className="mt-6 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                   <p className="text-xs text-slate-500 leading-relaxed">
                     <strong className="text-slate-300 block mb-1">资质荣誉</strong>
                     中国城市公共交通协会城市停车分会副会长单位
                   </p>
                 </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 text-xs text-center text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Shanghai Qikuo Intelligence Technology Co., Ltd.</span>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;