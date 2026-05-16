// --- src/i18n.js ---
// Internationalization module — Separation of Concerns: pure data + DOM apply

const translations = {
  es: {
    logo: "Oasis Studio",
    navServices: "Servicios",
    navHome: "Inicio",
    navAbout: "Nosotros",
    serv1: "Branding",
    serv2: "Diseño Web",
    serv3: "Contenidos",
    navProjects: "Proyectos",
    navTestimonials: "Testimonios",
    navContact: "Contacto",

    // Hero
    heroEyebrow: "Estudio Creativo",
    heroTitle: "Navega<br>tu Desierto",
    heroSub: "Encuentra las soluciones definitivas para tu negocio empresarial.",
    heroExplore: "Explorar Servicios",

    // Clients
    clientsLabel: "Marcas que confían en nosotros",

    // Stats
    statProjects: "Proyectos Entregados",
    statClients: "Clientes Activos",
    statSatisfaction: "Satisfacción del Cliente",
    statYears: "Años de Experiencia",

    // Services section (home)
    servicesEyebrow: "Lo Que Hacemos",
    servicesHeading: "Diseñado para Impactar",

    // Bento Cards
    bentoTitle1: "Branding",
    bentoDesc1: "Identifica las necesidades del mercado con precisión mediante nuestro radar de marca.",
    bentoTitle2: "Diseño Web",
    bentoDesc2: "Entornos inmersivos y código de alto rendimiento para elevar tu producto.",
    bentoTitle3: "Gestión de Contenido",
    bentoDesc3: "Nodos interconectados para distribuir tu mensaje en cada plataforma social.",
    bentoTitle4: "Nuestras Soluciones",
    bentoDesc4: "Flujos de trabajo garantizados que generan un impacto real en tus conversiones.",
    check1: "Arquitectura Escalable",
    check2: "Optimización SEO",
    check3: "Tasa de Conversión",

    // Process
    processEyebrow: "Cómo Trabajamos",
    processHeading: "De la Visión a la Realidad",
    processStep1Title: "Descubrimiento",
    processStep1Desc: "Nos sumergimos en tu marca, tu mercado y tu audiencia para identificar cada oportunidad estratégica.",
    processStep2Title: "Estrategia",
    processStep2Desc: "Diseñamos una hoja de ruta a medida que alinea tus objetivos de negocio con resultados digitales medibles.",
    processStep3Title: "Diseño & Desarrollo",
    processStep3Desc: "Nuestro equipo construye experiencias inmersivas con tecnología de vanguardia y estética premium.",
    processStep4Title: "Lanzamiento & Crecimiento",
    processStep4Desc: "Desplegamos, monitoreamos y optimizamos continuamente para que tu presencia digital siga creciendo.",

    // Testimonials
    testimonialsEyebrow: "Voces de Clientes",
    testimonialsHeading: "Lo Que Dicen de Nosotros",
    testimonial1: "\"Oasis Studio transformó toda nuestra identidad digital. La atención al detalle y el diseño inmersivo superaron cada expectativa.\"",
    testimonial2: "\"No solo construyen sitios web — diseñan experiencias. Nuestra tasa de conversión aumentó un 340% en el primer trimestre.\"",
    testimonial3: "\"Trabajar con Oasis fue como asociarse con un equipo que realmente entiende el storytelling de marca al más alto nivel.\"",

    // CTA
    ctaTitle: "Bienvenido<br>al Oasis",
    ctaSub: "Tu negocio está listo para florecer. Construyamos el futuro juntos hoy.",
    ctaBtn: "Transformar mi Negocio",

    // Services Page
    servicesPageTitle: "Nuestros Servicios",
    servicesPageSub: "Soluciones integrales diseñadas para impulsar tu presencia digital.",

    // About Page
    aboutPageTitle: "Sobre Nosotros",
    aboutPageSub: "Somos un estudio creativo boutique que transforma marcas en experiencias memorables.",
    aboutMission: "Misión",
    aboutMissionText: "Construir experiencias digitales que cautiven, conviertan y escalen, fusionando diseño premium con tecnología de vanguardia.",
    aboutVision: "Visión",
    aboutVisionText: "Ser el estudio de referencia para empresas que buscan una presencia digital extraordinaria en Latinoamérica.",
    aboutValues: "Valores",
    aboutValue1: "Excelencia Visual",
    aboutValue2: "Innovación Tecnológica",
    aboutValue3: "Impacto Medible",

    // Contact Page
    contactEyebrow: "Hablemos",
    contactTitle: "Construyamos Algo Extraordinario",
    contactSub: "Cuéntanos sobre tu proyecto. Respondemos en menos de 24 horas.",
    formName: "Nombre Completo",
    formEmail: "Correo Electrónico",
    formCompany: "Empresa",
    formService: "Servicio de Interés",
    formSelectDefault: "Selecciona un servicio",
    formMessage: "Tu Mensaje",
    formSubmit: "Enviar Mensaje",
    infoEmailTitle: "Email",
    infoLocationTitle: "Ubicación",
    infoSocialTitle: "Redes",

    // Footer
    footerTagline: "Estudio creativo boutique que transforma marcas en experiencias digitales extraordinarias.",
    footerNavigation: "Navegación",
    footerServices: "Servicios",
    footerConnect: "Conecta",
    footerPrivacy: "Política de Privacidad",
  },
  en: {
    logo: "Oasis Studio",
    navServices: "Services",
    navHome: "Home",
    navAbout: "About",
    serv1: "Branding",
    serv2: "Web Design",
    serv3: "Content Management",
    navProjects: "Projects",
    navTestimonials: "Testimonials",
    navContact: "Contact",

    // Hero
    heroEyebrow: "Creative Studio",
    heroTitle: "Navigate<br>Your Desert",
    heroSub: "Find the definitive solutions for your enterprise business.",
    heroExplore: "Explore Services",

    // Clients
    clientsLabel: "Trusted by forward-thinking brands",

    // Stats
    statProjects: "Projects Delivered",
    statClients: "Active Clients",
    statSatisfaction: "Client Satisfaction",
    statYears: "Years of Experience",

    // Services section (home)
    servicesEyebrow: "What We Do",
    servicesHeading: "Engineered for Impact",

    // Bento Cards
    bentoTitle1: "Branding",
    bentoDesc1: "Identify market needs with precision through our advanced brand radar analysis.",
    bentoTitle2: "Web Design",
    bentoDesc2: "Immersive and performing code environments to elevate your digital product.",
    bentoTitle3: "Content Managing",
    bentoDesc3: "Interconnected nodes to effortlessly distribute your message on every platform.",
    bentoTitle4: "Our Solutions",
    bentoDesc4: "Guaranteed enterprise workflows that generate true scalable impact.",
    check1: "Scalable Architecture",
    check2: "SEO Optimization",
    check3: "Conversion Rate",

    // Process
    processEyebrow: "How We Work",
    processHeading: "From Vision to Reality",
    processStep1Title: "Discovery",
    processStep1Desc: "We immerse ourselves in your brand, your market, and your audience to identify every strategic opportunity.",
    processStep2Title: "Strategy",
    processStep2Desc: "We craft a tailored roadmap that aligns your business goals with measurable digital outcomes.",
    processStep3Title: "Design & Build",
    processStep3Desc: "Our team engineers immersive experiences with cutting-edge technology and premium aesthetics.",
    processStep4Title: "Launch & Scale",
    processStep4Desc: "We deploy, monitor, and optimize continuously so your digital presence keeps growing.",

    // Testimonials
    testimonialsEyebrow: "Client Voices",
    testimonialsHeading: "What They Say About Us",
    testimonial1: "\"Oasis Studio transformed our entire digital identity. The attention to detail and the immersive design exceeded every expectation.\"",
    testimonial2: "\"They don't just build websites — they engineer experiences. Our conversion rate increased 340% in the first quarter.\"",
    testimonial3: "\"Working with Oasis felt like partnering with a team that truly understands brand storytelling at the highest level.\"",

    // CTA
    ctaTitle: "Welcome to<br>the Oasis",
    ctaSub: "Your business is ready to flourish. Let's build the future together today.",
    ctaBtn: "Transform My Business",

    // Services Page
    servicesPageTitle: "Our Services",
    servicesPageSub: "Comprehensive solutions designed to boost your digital presence.",

    // About Page
    aboutPageTitle: "About Us",
    aboutPageSub: "We are a boutique creative studio that transforms brands into memorable experiences.",
    aboutMission: "Mission",
    aboutMissionText: "Build digital experiences that captivate, convert and scale, merging premium design with cutting-edge technology.",
    aboutVision: "Vision",
    aboutVisionText: "To be the go-to studio for companies seeking an extraordinary digital presence in Latin America.",
    aboutValues: "Values",
    aboutValue1: "Visual Excellence",
    aboutValue2: "Technological Innovation",
    aboutValue3: "Measurable Impact",

    // Contact Page
    contactEyebrow: "Get in Touch",
    contactTitle: "Let's Build Something Extraordinary",
    contactSub: "Tell us about your project. We respond within 24 hours.",
    formName: "Full Name",
    formEmail: "Email Address",
    formCompany: "Company",
    formService: "Service of Interest",
    formSelectDefault: "Select a service",
    formMessage: "Your Message",
    formSubmit: "Send Message",
    infoEmailTitle: "Email",
    infoLocationTitle: "Location",
    infoSocialTitle: "Social",

    // Footer
    footerTagline: "Boutique creative studio that transforms brands into extraordinary digital experiences.",
    footerNavigation: "Navigation",
    footerServices: "Services",
    footerConnect: "Connect",
    footerPrivacy: "Privacy Policy",
  },
};

let currentLang = 'en';

/**
 * Apply translations to all elements with [data-i18n] in the DOM.
 */
export function applyTranslation(lang) {
  if (lang) currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang]?.[key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
}

/**
 * Get translation value by key for current language.
 */
export function t(key) {
  return translations[currentLang]?.[key] ?? key;
}

/**
 * Get the current active language.
 */
export function getCurrentLang() {
  return currentLang;
}

/**
 * Toggle between ES and EN and re-apply.
 */
export function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyTranslation(currentLang);
}

/**
 * Initialize i18n: bind toggle button and apply default language.
 */
export function initI18n() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', toggleLang);
  }
  applyTranslation(currentLang);
}
