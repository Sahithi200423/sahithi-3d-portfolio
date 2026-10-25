/* ==========================================================================
   SAHITHI CHUKKA - Premium Futuristic Developer Portfolio
   Interactive Engine:
   1. Authentic Portrait View Switcher & 3D Tilt Parallax Engine
   2. Mobile Drawer Navigation & Sticky Navbar Highlighting
   3. Background Animated Particle-Network Canvas
   4. Futuristic Theme Accent Switcher
   5. Interactive Technology Constellation Canvas with Node Physics
   6. Skills, Projects, and Certifications Filter Engines
   7. MoodCanvas Dynamic Harmonic Palette Generator
   8. Verified Contact Form with Live Validation & Honest Mailto Fallback
   9. Lightbox Screenshot Modal Manager
   10. Clipboard Utilities & Feedback Toasts
   11. Portfolio AI Assistant Chatbot
   ========================================================================== */

// --- 1. GLOBAL PORTRAIT VIEW SWITCHER ---
window.setPortraitView = function(mode) {
  const btnOutdoor = document.getElementById('btnViewOutdoor');
  const btnStudio = document.getElementById('btnViewStudio');
  const btnAvatar = document.getElementById('btnViewAvatar');
  const btnSculpture = document.getElementById('btnViewSculpture');

  const viewOutdoor = document.getElementById('viewPortraitOutdoor');
  const viewStudio = document.getElementById('viewPortraitStudio');
  const viewAvatar = document.getElementById('viewPortraitAvatar');
  const viewSculpture = document.getElementById('viewPortraitSculpture');
  const ambientGlow = document.getElementById('portraitAmbientGlow');

  const buttons = [
    { el: btnOutdoor, active: mode === 'outdoor' },
    { el: btnStudio, active: mode === 'studio' },
    { el: btnAvatar, active: mode === 'avatar' },
    { el: btnSculpture, active: mode === 'sculpture' }
  ];

  buttons.forEach(({ el, active }) => {
    if (el) {
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', String(active));
    }
  });

  if (viewOutdoor) viewOutdoor.classList.toggle('active', mode === 'outdoor');
  if (viewStudio) viewStudio.classList.toggle('active', mode === 'studio');
  if (viewAvatar) viewAvatar.classList.toggle('active', mode === 'avatar');
  if (viewSculpture) viewSculpture.classList.toggle('active', mode === 'sculpture');

  if (ambientGlow) {
    if (mode === 'outdoor') {
      ambientGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(168, 85, 247, 0.28) 45%, transparent 70%)';
    } else if (mode === 'studio') {
      ambientGlow.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(0, 240, 255, 0.25) 45%, transparent 70%)';
    } else if (mode === 'avatar') {
      ambientGlow.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.25) 45%, transparent 70%)';
    } else {
      ambientGlow.style.background = 'radial-gradient(circle, rgba(226, 232, 240, 0.35) 0%, rgba(168, 85, 247, 0.2) 45%, transparent 70%)';
    }
  }
};

// Legacy compatibility for any case study buttons referencing setHeroVisual
window.setHeroVisual = function(mode) {
  if (mode === 'github' || mode === 'avatar') window.setPortraitView('avatar');
  else if (mode === 'sculpture') window.setPortraitView('sculpture');
  else window.setPortraitView('outdoor');
};

// --- 2. GLOBAL LIGHTBOX MODAL MANAGER ---
window.openLightbox = function(imageSrc, title, description) {
  const lightboxModal = document.getElementById('lightboxModal');
  const modalLightboxImg = document.getElementById('modalLightboxImg');
  const modalHeading = document.getElementById('modalHeading');
  const modalSubtext = document.getElementById('modalSubtext');

  if (!lightboxModal || !modalLightboxImg) return;
  modalLightboxImg.src = imageSrc;
  modalLightboxImg.alt = title || 'Screenshot Preview';
  if (modalHeading) modalHeading.textContent = title || 'Screenshot Preview';
  if (modalSubtext) modalSubtext.textContent = description || '';

  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const lightboxModal = document.getElementById('lightboxModal');
  if (!lightboxModal) return;
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
};

// --- MAIN PORTFOLIO INITIALIZATION ---
function initPortfolio() {

  // =========================================================================
  // 3. BACKGROUND ANIMATED PARTICLE-NETWORK CANVAS
  // =========================================================================
  const bgCanvas = document.getElementById('bgParticleCanvas');
  if (bgCanvas && bgCanvas.getContext) {
    const ctx = bgCanvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 65;
    let mouse = { x: null, y: null, maxDist: 130 };

    function resizeCanvas() {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.6 + 0.8;
        this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
        this.alpha = Math.random() * 0.45 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (mouse.maxDist - dist) / mouse.maxDist;
            this.x += (dx / dist) * force * 1.1;
            this.y += (dy / dist) * force * 1.1;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) requestAnimationFrame(animateParticles);
    });

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateParticles() {
      if (!isVisible || prefersReducedMotion) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0, 240, 255, ' + lineAlpha + ')';
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    if (!prefersReducedMotion) {
      animateParticles();
    }
  }

  // =========================================================================
  // 4. 3D TILT & PARALLAX ON AUTHENTIC PORTRAIT FRAME
  // =========================================================================
  const portraitContainer = document.getElementById('portraitStageContainer');
  const tiltCard = document.getElementById('portraitTiltCard');
  const floatingChips = document.querySelectorAll('.floating-tech-chip');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (portraitContainer && tiltCard && !prefersReduced && window.innerWidth >= 900) {
    let bounds = null;

    function updateBounds() {
      bounds = portraitContainer.getBoundingClientRect();
    }
    updateBounds();
    window.addEventListener('resize', updateBounds, { passive: true });
    window.addEventListener('scroll', updateBounds, { passive: true });

    portraitContainer.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const normY = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      const tiltX = -normY * 9; // Max 9 deg
      const tiltY = normX * 9;

      tiltCard.style.transform = 'perspective(1000px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg) scale3d(1.02, 1.02, 1.02)';

      floatingChips.forEach(chip => {
        const depth = parseFloat(chip.getAttribute('data-depth')) || 25;
        const moveX = normX * (depth * 0.35);
        const moveY = normY * (depth * 0.35);
        chip.style.transform = 'translate3d(' + moveX.toFixed(1) + 'px, ' + moveY.toFixed(1) + 'px, ' + depth + 'px)';
      });
    });

    portraitContainer.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      floatingChips.forEach(chip => {
        chip.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // =========================================================================
  // 5. STICKY NAVBAR SCROLL ELEVATION & ACTIVE SECTION HIGHLIGHTING
  // =========================================================================
  const navbar = document.getElementById('mainNavbar');
  const navLinksList = document.querySelectorAll('.nav-links .nav-link');
  const drawerLinksList = document.querySelectorAll('.mobile-drawer-links .mobile-drawer-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinksList.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === ('#' + currentId));
          });
          drawerLinksList.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === ('#' + currentId));
          });
        }
      });
    }, {
      rootMargin: '-25% 0px -60% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));
  }

  // =========================================================================
  // 6. MOBILE DRAWER NAVIGATION MENU
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-link');

  function openMobileMenu() {
    mobileDrawer?.classList.add('active');
    mobileDrawerOverlay?.classList.add('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('active');
    mobileDrawerOverlay?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('active');
    if (isOpen) closeMobileMenu();
    else openMobileMenu();
  });

  mobileDrawerCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileDrawerOverlay?.addEventListener('click', closeMobileMenu);

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      window.closeLightbox();
      closeChatbot();
    }
  });

  // =========================================================================
  // 7. FUTURISTIC THEME ACCENT SWITCHER
  // =========================================================================
  const themeAccentBtn = document.getElementById('themeAccentBtn');
  const accents = ['default', 'cyan', 'emerald'];
  let currentAccentIdx = 0;

  if (themeAccentBtn) {
    themeAccentBtn.addEventListener('click', () => {
      document.body.classList.remove('theme-accent-cyan', 'theme-accent-emerald');
      currentAccentIdx = (currentAccentIdx + 1) % accents.length;
      const nextAccent = accents[currentAccentIdx];
      
      if (nextAccent !== 'default') {
        document.body.classList.add('theme-accent-' + nextAccent);
      }
      
      const icons = { default: '⚡', cyan: '💎', emerald: '🌿' };
      themeAccentBtn.textContent = icons[nextAccent] || '⚡';
      showToast('Futuristic accent: ' + nextAccent.toUpperCase());
    });
  }

  // =========================================================================
  // 8. INTERACTIVE TECHNOLOGY CONSTELLATION CANVAS
  // =========================================================================
  const constellationCanvas = document.getElementById('skillsConstellationCanvas');
  const constellationBox = document.getElementById('constellationBox');

  if (constellationCanvas && constellationCanvas.getContext) {
    const cCtx = constellationCanvas.getContext('2d');
    let cWidth, cHeight;

    function resizeConstellation() {
      if (!constellationBox) return;
      cWidth = constellationCanvas.width = constellationBox.clientWidth;
      cHeight = constellationCanvas.height = constellationBox.clientHeight;
    }
    resizeConstellation();
    window.addEventListener('resize', resizeConstellation, { passive: true });

    const techNodes = [
      { id: 'react', name: 'React 19', icon: '⚛', category: 'Frontend', context: 'Architecture in CineBook V3, SceneLingo & Groundwater Platform', xRel: 0.18, yRel: 0.28, r: 24, color: '#00d8ff' },
      { id: 'ts', name: 'TypeScript', icon: 'TS', category: 'Language', context: 'Strict typing across all application models, props, and hooks', xRel: 0.38, yRel: 0.22, r: 24, color: '#3178c6' },
      { id: 'three', name: 'Three.js / WebGL', icon: '✦', category: '3D Graphics', context: 'Interactive 3D cinema pass, bounded tilt & GPU rendering', xRel: 0.58, yRel: 0.32, r: 22, color: '#a855f7' },
      { id: 'supabase', name: 'Supabase (PostgreSQL)', icon: '⚡', category: 'Database', context: 'Atomic row-level locks, 10-minute hold TTL & CRUD services', xRel: 0.78, yRel: 0.26, r: 24, color: '#10b981' },
      { id: 'tailwind', name: 'Tailwind CSS 4', icon: '🎨', category: 'Styling', context: 'Responsive layouts, dark glassmorphism & typography', xRel: 0.26, yRel: 0.68, r: 22, color: '#38bdf8' },
      { id: 'speech', name: 'Web Speech API', icon: '🎙', category: 'Browser API', context: 'Multilingual audio speech synthesis in SceneLingo', xRel: 0.48, yRel: 0.62, r: 22, color: '#ec4899' },
      { id: 'camera', name: 'MediaRecorder', icon: '📹', category: 'Hardware API', context: 'In-browser webcam video rehearsal recording in SceneLingo', xRel: 0.68, yRel: 0.72, r: 22, color: '#f59e0b' },
      { id: 'git', name: 'Git & GitHub', icon: '🐙', category: 'Workflow', context: 'Branch management, feature commits, releases & verification', xRel: 0.44, yRel: 0.84, r: 20, color: '#e2e8f0' },
      { id: 'vercel', name: 'Vercel Edge', icon: '▲', category: 'Deployment', context: 'Edge network deployment, sub-second TTFB & HTTPS', xRel: 0.84, yRel: 0.65, r: 20, color: '#ffffff' }
    ];

    const techLinks = [
      ['react', 'ts'],
      ['react', 'three'],
      ['react', 'tailwind'],
      ['ts', 'supabase'],
      ['react', 'speech'],
      ['speech', 'camera'],
      ['supabase', 'vercel'],
      ['react', 'git'],
      ['ts', 'vercel']
    ];

    let hoveredNode = null;
    let cMouse = { x: null, y: null };

    constellationCanvas.addEventListener('mousemove', (e) => {
      const rect = constellationCanvas.getBoundingClientRect();
      cMouse.x = e.clientX - rect.left;
      cMouse.y = e.clientY - rect.top;

      let found = null;
      techNodes.forEach(node => {
        const nx = node.xRel * cWidth;
        const ny = node.yRel * cHeight;
        const dist = Math.hypot(nx - cMouse.x, ny - cMouse.y);
        if (dist < node.r + 8) found = node;
      });

      hoveredNode = found;
      constellationCanvas.style.cursor = found ? 'pointer' : 'default';

      if (found) {
        const nodeIcon = document.getElementById('nodeIcon');
        const nodeName = document.getElementById('nodeName');
        const nodeContext = document.getElementById('nodeContext');
        if (nodeIcon) nodeIcon.textContent = found.icon;
        if (nodeName) nodeName.textContent = found.name + ' • ' + found.category;
        if (nodeContext) nodeContext.textContent = found.context;
      }
    });

    constellationCanvas.addEventListener('mouseleave', () => {
      hoveredNode = null;
      cMouse.x = null;
      cMouse.y = null;
    });

    function renderConstellation() {
      cCtx.clearRect(0, 0, cWidth, cHeight);

      // Draw links
      techLinks.forEach(([fromId, toId]) => {
        const fromNode = techNodes.find(n => n.id === fromId);
        const toNode = techNodes.find(n => n.id === toId);
        if (!fromNode || !toNode) return;

        const x1 = fromNode.xRel * cWidth;
        const y1 = fromNode.yRel * cHeight;
        const x2 = toNode.xRel * cWidth;
        const y2 = toNode.yRel * cHeight;

        const isHighlighted = hoveredNode && (hoveredNode.id === fromId || hoveredNode.id === toId);

        cCtx.beginPath();
        cCtx.moveTo(x1, y1);
        cCtx.lineTo(x2, y2);
        cCtx.strokeStyle = isHighlighted ? 'rgba(0, 240, 255, 0.7)' : 'rgba(255, 255, 255, 0.1)';
        cCtx.lineWidth = isHighlighted ? 2 : 1;
        cCtx.stroke();
      });

      // Draw nodes
      techNodes.forEach(node => {
        const nx = node.xRel * cWidth;
        const ny = node.yRel * cHeight;
        const isHovered = hoveredNode && hoveredNode.id === node.id;

        // Outer glow
        if (isHovered) {
          cCtx.beginPath();
          cCtx.arc(nx, ny, node.r + 10, 0, Math.PI * 2);
          cCtx.fillStyle = 'rgba(0, 240, 255, 0.25)';
          cCtx.fill();
        }

        // Node circle
        cCtx.beginPath();
        cCtx.arc(nx, ny, node.r, 0, Math.PI * 2);
        cCtx.fillStyle = '#0a0f1e';
        cCtx.fill();
        cCtx.strokeStyle = isHovered ? '#00f0ff' : node.color;
        cCtx.lineWidth = isHovered ? 2.5 : 1.5;
        cCtx.stroke();

        // Node text
        cCtx.font = 'bold 11px sans-serif';
        cCtx.fillStyle = '#ffffff';
        cCtx.textAlign = 'center';
        cCtx.textBaseline = 'middle';
        cCtx.fillText(node.icon, nx, ny);

        // Label below
        cCtx.font = '10px "JetBrains Mono", monospace';
        cCtx.fillStyle = isHovered ? '#00f0ff' : '#9ea4c2';
        cCtx.fillText(node.name, nx, ny + node.r + 14);
      });

      requestAnimationFrame(renderConstellation);
    }

    renderConstellation();
  }

  // =========================================================================
  // 9. CATEGORY FILTERS (SKILLS, PROJECTS, CERTIFICATIONS)
  // =========================================================================
  // Skills filter
  const skillFilterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skills-categories-grid .skill-category-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      skillFilterBtns.forEach(b => {
        const isSel = b === btn;
        b.classList.toggle('active', isSel);
        b.setAttribute('aria-selected', String(isSel));
      });

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  // Projects filter
  const projFilterBtns = document.querySelectorAll('.projects-filter-nav .filter-btn');
  const projectCards = document.querySelectorAll('.projects-feed .project-card-editorial');

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-proj-filter');
      projFilterBtns.forEach(b => b.classList.toggle('active', b === btn));

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  // Certifications filter
  const certTabBtns = document.querySelectorAll('.cert-tabs-nav .filter-btn');
  const certCards = document.querySelectorAll('.cert-cards-grid .cert-card');

  certTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-cert-tab');
      certTabBtns.forEach(b => b.classList.toggle('active', b === btn));

      certCards.forEach(card => {
        const cat = card.getAttribute('data-cert-cat');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  // =========================================================================
  // 10. MOODCANVAS HARMONIC PALETTE GENERATOR
  // =========================================================================
  const btnGenPalette = document.getElementById('btnGenPalette');
  const paletteSwatches = document.getElementById('paletteSwatches');

  const harmonicPalettes = [
    [
      { hex: '#9d4edd', name: 'Cyber Violet', dark: true },
      { hex: '#00f0ff', name: 'Electric Cyan', dark: false },
      { hex: '#241442', name: 'Deep Space', dark: true },
      { hex: '#00b4d8', name: 'Pacific Blue', dark: false }
    ],
    [
      { hex: '#10b981', name: 'Emerald Wave', dark: true },
      { hex: '#064e3b', name: 'Forest Obsidian', dark: true },
      { hex: '#34d399', name: 'Mint Glow', dark: false },
      { hex: '#00f0ff', name: 'Cyan Accent', dark: false }
    ],
    [
      { hex: '#ec4899', name: 'Neon Rose', dark: true },
      { hex: '#a855f7', name: 'Purple Ray', dark: true },
      { hex: '#3b82f6', name: 'Royal Electric', dark: true },
      { hex: '#fbcfe8', name: 'Blush Mist', dark: false }
    ],
    [
      { hex: '#f59e0b', name: 'Amber Gold', dark: true },
      { hex: '#b45309', name: 'Deep Ochre', dark: true },
      { hex: '#1e1b4b', name: 'Midnight Indigo', dark: true },
      { hex: '#fbbf24', name: 'Sunbeam', dark: false }
    ]
  ];

  let currentPaletteIdx = 0;

  function renderPalette(palette) {
    if (!paletteSwatches) return;
    paletteSwatches.innerHTML = '';
    palette.forEach(item => {
      const swatch = document.createElement('div');
      swatch.className = 'swatch-item';
      swatch.style.background = item.hex;
      swatch.style.color = item.dark ? '#ffffff' : '#000000';
      swatch.textContent = item.hex;
      swatch.title = 'Click to copy ' + item.name + ' (' + item.hex + ')';
      
      swatch.addEventListener('click', () => {
        copyToClipboard(item.hex, 'Copied ' + item.hex + ' (' + item.name + ') to clipboard!');
        swatch.style.transform = 'scale(1.15)';
        setTimeout(() => {
          swatch.style.transform = 'scale(1)';
        }, 250);
      });

      paletteSwatches.appendChild(swatch);
    });
  }

  if (btnGenPalette) {
    btnGenPalette.addEventListener('click', () => {
      currentPaletteIdx = (currentPaletteIdx + 1) % harmonicPalettes.length;
      renderPalette(harmonicPalettes[currentPaletteIdx]);
    });
  }

  // =========================================================================
  // 11. CONTACT FORM WITH TRUTHFUL STATUS & MAILTO FALLBACK
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const formSubmitBtn = document.getElementById('formSubmitBtn');
  const formFallbackActions = document.getElementById('formFallbackActions');
  const btnMailtoLaunch = document.getElementById('btnMailtoLaunch');
  const btnCopyFormattedMsg = document.getElementById('btnCopyFormattedMsg');

  let preparedMessage = '';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const subject = document.getElementById('formSubject')?.value.trim();
      const message = document.getElementById('formMessage')?.value.trim();

      if (!name || !email || !subject || !message) {
        showFormStatus('Please complete all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus('Please provide a valid email address.', 'error');
        return;
      }

      if (message.length < 10) {
        showFormStatus('Please provide a descriptive message (at least 10 characters).', 'error');
        return;
      }

      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<span>Formatting Message...</span>';
      }

      setTimeout(() => {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = '<span>Prepared! Re-submit or Copy Below →</span>';
        }

        // Truthful feedback: explain that client-side form triggers mail client
        showFormStatus(
          'Thank you, ' + name + '! Your inquiry has been formatted. Since this static portfolio does not store data on an external server, please launch your email client below or copy the message to send to sahithichukka2004@gmail.com directly.',
          'info'
        );

        preparedMessage = 'From: ' + name + ' (' + email + ')\nSubject: ' + subject + '\n\n' + message;

        const mailtoUrl = 'mailto:sahithichukka2004@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(preparedMessage);
        
        if (btnMailtoLaunch) {
          btnMailtoLaunch.href = mailtoUrl;
        }

        if (formFallbackActions) {
          formFallbackActions.style.display = 'flex';
        }

      }, 500);
    });

    if (btnCopyFormattedMsg) {
      btnCopyFormattedMsg.addEventListener('click', () => {
        if (preparedMessage) {
          copyToClipboard(preparedMessage, 'Formatted message copied to clipboard!');
        }
      });
    }
  }

  function showFormStatus(msg, type) {
    if (!formStatusMsg) return;
    formStatusMsg.textContent = msg;
    formStatusMsg.className = 'form-status-msg ' + type;
    formStatusMsg.style.display = 'block';
  }

  // =========================================================================
  // 12. CLIPBOARD UTILITIES & TOAST FEEDBACK
  // =========================================================================
  const copyToast = document.getElementById('copyToast');

  function showToast(text) {
    if (!copyToast) return;
    copyToast.textContent = text;
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 2500);
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'Copied to clipboard!');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'Copied to clipboard!');
    } catch (err) {
      showToast('Press Ctrl+C to copy');
    }
    document.body.removeChild(ta);
  }

  const btnCopyLinkedIn = document.getElementById('btnCopyLinkedIn');
  if (btnCopyLinkedIn) {
    btnCopyLinkedIn.addEventListener('click', () => {
      copyToClipboard('https://www.linkedin.com/in/sahithi-chukka-26b919290/', 'LinkedIn URL copied to clipboard!');
    });
  }

  const btnCopyGitHub = document.getElementById('btnCopyGitHub');
  if (btnCopyGitHub) {
    btnCopyGitHub.addEventListener('click', () => {
      copyToClipboard('https://github.com/Sahithi200423/', 'GitHub profile URL copied to clipboard!');
    });
  }

  // Close Lightbox Modal
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const lightboxModal = document.getElementById('lightboxModal');
  modalCloseBtn?.addEventListener('click', window.closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) window.closeLightbox();
  });

  // =========================================================================
  // 13. PORTFOLIO AI ASSISTANT CHATBOT
  // =========================================================================
  const chatbotTriggerBtn = document.getElementById('chatbotTriggerBtn');
  const chatbotModal = document.getElementById('chatbotModal');
  const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotChips = document.querySelectorAll('.chatbot-chip');

  function openChatbot() {
    chatbotModal?.classList.add('active');
  }

  function closeChatbot() {
    chatbotModal?.classList.remove('active');
  }

  chatbotTriggerBtn?.addEventListener('click', () => {
    const isActive = chatbotModal?.classList.contains('active');
    if (isActive) closeChatbot();
    else openChatbot();
  });

  chatbotCloseBtn?.addEventListener('click', closeChatbot);

  const knowledgeBase = [
    {
      keywords: ['education', 'degree', 'college', 'university', 'andhra', 'background', 'qualification'],
      response: 'Sahithi Chukka is pursuing her B.Tech + M.Tech Dual Degree in Computer Science and Engineering at Andhra University College of Engineering (A), Visakhapatnam (Batch: 2022–2026). Her verified Semester V grade shows an SGPA of 7.32 (pass with 22 credits), with comprehensive coursework in Data Communications, AI, Compiler Design, and Python Programming.'
    },
    {
      keywords: ['cinebook', 'movie', 'booking', 'concurrency', 'tickets', 'cinema'],
      response: 'CineBook V3 is Sahithi&rsquo;s flagship full-stack cinema booking application. It features an interactive 128-seat auditorium map, real-time PostgreSQL atomic row locks with a 10-minute hold TTL to eliminate double bookings, a floating Three.js 3D ticket pass, and 43 automated backend security and concurrency tests passing with a 100% score.'
    },
    {
      keywords: ['skills', 'stack', 'technologies', 'react', 'typescript', 'languages'],
      response: 'Sahithi specializes in Frontend Development and Web Application Engineering. Her primary stack includes React 19, TypeScript, Modern ES6+ JavaScript, Tailwind CSS 4, Three.js WebGL graphics, and Supabase (PostgreSQL). She also has expertise in Python, Node.js, and browser platform APIs (Web Speech API, MediaRecorder).'
    },
    {
      keywords: ['contact', 'email', 'linkedin', 'github', 'hire', 'reach', 'phone'],
      response: 'You can connect with Sahithi on LinkedIn at linkedin.com/in/sahithi-chukka-26b919290/ or explore her GitHub repositories at github.com/Sahithi200423/. You can also email her at sahithichukka2004@gmail.com or download her official PDF resume from the header.'
    },
    {
      keywords: ['resume', 'cv', 'pdf', 'download'],
      response: 'You can download Sahithi&rsquo;s official PDF resume directly from the navigation bar or from the Resume card in the Contact section (assets/Chukka_Sahithi_resume.pdf).'
    },
    {
      keywords: ['scenelingo', 'language', 'acting', 'telugu', 'speech'],
      response: 'SceneLingo is an innovative bilingual EdTech and acting rehearsal web platform developed by Sahithi. It uses the browser MediaRecorder API for webcam video takes, Web Speech API for authentic Telugu audio pronunciation, and a 5-tier pedagogical transliteration framework.'
    },
    {
      keywords: ['groundwater', 'calculator', 'hydrogeology'],
      response: 'Global Groundwater Consultants is an enterprise web application featuring 5 specialized mathematical engineering calculators for aquifer infiltration and rainwater harvesting, along with client-side jsPDF estimation reports and Supabase admin operations.'
    }
  ];

  function appendChatMsg(text, sender) {
    if (!chatbotMessages) return;
    const msgEl = document.createElement('div');
    msgEl.className = 'chatbot-msg ' + sender;
    msgEl.innerHTML = text;
    chatbotMessages.appendChild(msgEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query) return;
    appendChatMsg(query, 'user');

    const clean = query.toLowerCase();
    let reply = 'Thank you for your question! Sahithi is a Frontend Developer & Web Application Engineer specializing in React 19, TypeScript, and Three.js. Feel free to explore her projects or download her resume!';

    for (const item of knowledgeBase) {
      if (item.keywords.some(k => clean.includes(k))) {
        reply = item.response;
        break;
      }
    }

    setTimeout(() => {
      appendChatMsg(reply, 'bot');
    }, 400);
  }

  chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatbotInput?.value.trim();
    if (val) {
      handleUserQuery(val);
      chatbotInput.value = '';
    }
  });

  chatbotChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) handleUserQuery(prompt);
    });
  });

}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
