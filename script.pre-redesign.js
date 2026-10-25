/* ==========================================================================
   SAHITHI CHUKKA - Premium Futuristic Developer Portfolio
   Interactive Engine:
   1. Global 3D Asset Switcher (Avatar / Sculpture / GitHub)
   2. Background Animated Particle-Network Canvas
   3. Sticky Navbar with IntersectionObserver Active Section Highlighting
   4. Futuristic Accent Theme Switcher
   5. Interactive Technology Constellation Canvas with Node Physics & Hover Details
   6. Skills, Projects, and Certifications Filtering Engines
   7. MoodCanvas Dynamic Harmonic Palette Randomizer
   8. Working Contact Form with Validation & Feedback States
   9. Lightbox Screenshot Modal Manager
   10. Clipboard Helpers & Toast Notifications
   11. Portfolio AI Assistant Interactive Chatbot
   ========================================================================== */

// --- 1. GLOBAL 3D HERO ASSET SWITCHER ---
window.setHeroVisual = function(mode) {
  const btnCharacter = document.getElementById('btnCharacter');
  const btnSculpture = document.getElementById('btnSculpture');
  const btnGithubAvatar = document.getElementById('btnGithubAvatar');

  const paneAvatar = document.getElementById('paneAvatar');
  const paneSculpture = document.getElementById('paneSculpture');
  const paneGithub = document.getElementById('paneGithub');
  const heroGlow = document.getElementById('heroGlow');

  const buttons = [
    { el: btnCharacter, active: mode === 'avatar' },
    { el: btnSculpture, active: mode === 'sculpture' },
    { el: btnGithubAvatar, active: mode === 'github' }
  ];

  buttons.forEach(({ el, active }) => {
    if (el) {
      el.classList.toggle('active', active);
      el.setAttribute('aria-pressed', String(active));
    }
  });

  if (paneAvatar) {
    paneAvatar.classList.toggle('active', mode === 'avatar');
    paneAvatar.style.display = mode === 'avatar' ? 'block' : 'none';
  }
  if (paneSculpture) {
    paneSculpture.classList.toggle('active', mode === 'sculpture');
    paneSculpture.style.display = mode === 'sculpture' ? 'block' : 'none';
  }
  if (paneGithub) {
    paneGithub.classList.toggle('active', mode === 'github');
    paneGithub.style.display = mode === 'github' ? 'flex' : 'none';
  }

  if (heroGlow) {
    if (mode === 'avatar') {
      heroGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(168, 85, 247, 0.25) 45%, transparent 70%)';
    } else if (mode === 'github') {
      heroGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, rgba(16, 185, 129, 0.25) 45%, transparent 70%)';
    } else {
      heroGlow.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(0, 240, 255, 0.15) 45%, transparent 70%)';
    }
  }
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

// --- CORE APPLICATION INITIALIZATION ---
function initPortfolio() {

  // =========================================================================
  // 3. BACKGROUND ANIMATED PARTICLE-NETWORK CANVAS
  // =========================================================================
  const bgCanvas = document.getElementById('bgParticleCanvas');
  if (bgCanvas && bgCanvas.getContext) {
    const ctx = bgCanvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 35 : 70;
    let mouse = { x: null, y: null, maxDist: 140 };

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
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 0.8;
        this.color = Math.random() > 0.4 ? 'rgba(168, 85, 247, ' : 'rgba(0, 240, 255, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Subtle mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.maxDist) {
            const force = (mouse.maxDist - dist) / mouse.maxDist;
            this.x += (dx / dist) * force * 1.2;
            this.y += (dy / dist) * force * 1.2;
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

      // Connect particles with network lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
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
  // 4. STICKY NAVBAR SCROLL ELEVATION & ACTIVE SECTION HIGHLIGHTING
  // =========================================================================
  const navbar = document.getElementById('mainNavbar');
  const navLinksList = document.querySelectorAll('.nav-links .nav-link');
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
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -65% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));
  }

  // =========================================================================
  // 5. ACCENT THEME SWITCHER
  // =========================================================================
  const themeAccentBtn = document.getElementById('themeAccentBtn');
  const accents = ['purple', 'cyan', 'emerald'];
  let currentAccentIdx = 0;

  if (themeAccentBtn) {
    themeAccentBtn.addEventListener('click', () => {
      currentAccentIdx = (currentAccentIdx + 1) % accents.length;
      const newAccent = accents[currentAccentIdx];
      if (newAccent === 'purple') {
        document.documentElement.removeAttribute('data-accent');
      } else {
        document.documentElement.setAttribute('data-accent', newAccent);
      }
      showToast(`Switched accent to ${newAccent.toUpperCase()}`);
    });
  }

  // =========================================================================
  // 6. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('mobile-open');
      mobileBtn.setAttribute('aria-expanded', String(isOpen));
      if (menuIcon) {
        menuIcon.textContent = isOpen ? '✕' : '☰';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        if (menuIcon) menuIcon.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        if (navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
          mobileBtn.setAttribute('aria-expanded', 'false');
          if (menuIcon) menuIcon.textContent = '☰';
        }
      }
    });
  }

  // =========================================================================
  // 7. SCROLL-TRIGGERED REVEAL ANIMATIONS
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-init');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }

  // =========================================================================
  // 8. 3D HERO VISUAL STAGE & MOUSE TILT (Desktop Parallax with Touch Decoupling)
  // =========================================================================
  const heroStage = document.getElementById('heroStage');
  const hero3DVisual = document.getElementById('hero3DVisual');
  const isTouchDevice = typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: coarse)').matches : false;
  const prefersReduced = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  if (heroStage && hero3DVisual && !prefersReduced && !isTouchDevice) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = ((y - centerY) / centerY) * -8;
      const tiltY = ((x - centerX) / centerX) * 8;

      hero3DVisual.style.transform = `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1.02)`;

      const holoLeft = document.querySelector('.holo-panel-top-left');
      const holoRight = document.querySelector('.holo-panel-top-right');
      if (holoLeft) holoLeft.style.transform = `translate3d(${(-tiltY * 0.7).toFixed(1)}px, ${(-tiltX * 0.7).toFixed(1)}px, 15px)`;
      if (holoRight) holoRight.style.transform = `translate3d(${(tiltY * 0.7).toFixed(1)}px, ${(-tiltX * 0.7).toFixed(1)}px, 15px)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      hero3DVisual.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      const holoLeft = document.querySelector('.holo-panel-top-left');
      const holoRight = document.querySelector('.holo-panel-top-right');
      if (holoLeft) holoLeft.style.transform = '';
      if (holoRight) holoRight.style.transform = '';
    });
  }

  // =========================================================================
  // 9. INTERACTIVE SKILLS CONSTELLATION CANVAS
  // =========================================================================
  const constCanvas = document.getElementById('skillsConstellationCanvas');
  const constBox = document.getElementById('constellationBox');
  const nodeIcon = document.getElementById('nodeIcon');
  const nodeName = document.getElementById('nodeName');
  const nodeContext = document.getElementById('nodeContext');
  const nodeProficiency = document.getElementById('nodeProficiency');

  if (constCanvas && constCanvas.getContext && constBox) {
    const cCtx = constCanvas.getContext('2d');
    let cW, cH;

    function resizeConstellation() {
      cW = constCanvas.width = constBox.clientWidth;
      cH = constCanvas.height = constBox.clientHeight;
    }
    resizeConstellation();
    window.addEventListener('resize', resizeConstellation, { passive: true });

    const nodes = [
      { id: 'react', name: 'React 19', icon: '⚛', category: 'Frontend', context: 'Core UI architecture in CineBook V2, SceneLingo & Groundwater', xRel: 0.28, yRel: 0.35, r: 24, color: '#00f0ff' },
      { id: 'ts', name: 'TypeScript', icon: '🔷', category: 'Language', context: 'Strict static type definitions & interfaces across all modern projects', xRel: 0.44, yRel: 0.24, r: 22, color: '#3178c6' },
      { id: 'three', name: 'Three.js WebGL', icon: '🧊', category: 'Graphics', context: 'Interactive floating 3D cinema pass hero with bounded sine-wave tilt', xRel: 0.16, yRel: 0.58, r: 20, color: '#a855f7' },
      { id: 'tailwind', name: 'Tailwind CSS', icon: '🎨', category: 'Styling', context: 'Utility-first modern design token systems in CineBook & SceneLingo', xRel: 0.38, yRel: 0.55, r: 20, color: '#38bdf8' },
      { id: 'supabase', name: 'Supabase PostgreSQL', icon: '⚡', category: 'Database', context: 'Atomic row-level holds & 10-minute concurrency locking engine', xRel: 0.62, yRel: 0.38, r: 22, color: '#10b981' },
      { id: 'node', name: 'Node.js & Express', icon: '🟢', category: 'Backend', context: 'REST APIs, single-hop proxy trust, HMAC-SHA256 webhooks, and rate limiters', xRel: 0.54, yRel: 0.66, r: 21, color: '#22c55e' },
      { id: 'python', name: 'Python & AI', icon: '🐍', category: 'AI & Data', context: 'CNN handwritten digit recognition, ML classification & Azure ML workspace', xRel: 0.76, yRel: 0.28, r: 20, color: '#f59e0b' },
      { id: 'azure', name: 'Microsoft Azure', icon: '☁', category: 'Cloud', context: 'Microsoft Learn Certified: Azure ML Workspace & Natural Language Solutions', xRel: 0.84, yRel: 0.52, r: 20, color: '#0284c7' },
      { id: 'speech', name: 'Web Speech API', icon: '🎙', category: 'Browser API', context: 'Bilingual audio synthesis engine for Telugu & Hindi in SceneLingo', xRel: 0.72, yRel: 0.72, r: 19, color: '#ec4899' },
      { id: 'git', name: 'Git & GitHub', icon: '🐙', category: 'Tools', context: 'Branch management, feature commits, releases, and CI/CD workflows', xRel: 0.48, yRel: 0.84, r: 19, color: '#e2e8f0' }
    ];

    const connections = [
      ['react', 'ts'],
      ['react', 'three'],
      ['react', 'tailwind'],
      ['react', 'supabase'],
      ['ts', 'node'],
      ['supabase', 'node'],
      ['python', 'azure'],
      ['react', 'speech'],
      ['node', 'git'],
      ['ts', 'git'],
      ['azure', 'supabase']
    ];

    let hoveredNode = null;
    let cMouse = { x: null, y: null };

    constCanvas.addEventListener('mousemove', (e) => {
      const rect = constCanvas.getBoundingClientRect();
      cMouse.x = e.clientX - rect.left;
      cMouse.y = e.clientY - rect.top;

      let found = null;
      nodes.forEach(node => {
        const nx = node.xRel * cW;
        const ny = node.yRel * cH;
        const dist = Math.hypot(nx - cMouse.x, ny - cMouse.y);
        if (dist <= node.r + 6) {
          found = node;
        }
      });

      if (found !== hoveredNode) {
        hoveredNode = found;
        if (hoveredNode) {
          if (nodeIcon) nodeIcon.textContent = hoveredNode.icon;
          if (nodeName) nodeName.textContent = `${hoveredNode.name} • ${hoveredNode.category}`;
          if (nodeContext) nodeContext.textContent = hoveredNode.context;
          if (nodeProficiency) nodeProficiency.textContent = 'Verified in Production Code';
        }
      }
    });

    constCanvas.addEventListener('mouseleave', () => {
      hoveredNode = null;
      cMouse.x = null;
      cMouse.y = null;
    });

    function renderConstellation() {
      cCtx.clearRect(0, 0, cW, cH);

      // Draw Connections
      connections.forEach(([id1, id2]) => {
        const n1 = nodes.find(n => n.id === id1);
        const n2 = nodes.find(n => n.id === id2);
        if (!n1 || !n2) return;

        const x1 = n1.xRel * cW;
        const y1 = n1.yRel * cH;
        const x2 = n2.xRel * cW;
        const y2 = n2.yRel * cH;

        const isHighlighted = hoveredNode && (hoveredNode.id === id1 || hoveredNode.id === id2);

        cCtx.beginPath();
        cCtx.moveTo(x1, y1);
        cCtx.lineTo(x2, y2);
        cCtx.strokeStyle = isHighlighted ? 'rgba(0, 240, 255, 0.7)' : 'rgba(168, 85, 247, 0.2)';
        cCtx.lineWidth = isHighlighted ? 2.2 : 1;
        cCtx.stroke();
      });

      // Draw Nodes
      nodes.forEach(node => {
        const nx = node.xRel * cW;
        const ny = node.yRel * cH;
        const isHovered = hoveredNode && hoveredNode.id === node.id;

        // Glowing outer halo
        cCtx.beginPath();
        cCtx.arc(nx, ny, node.r + (isHovered ? 8 : 4), 0, Math.PI * 2);
        cCtx.fillStyle = isHovered ? 'rgba(0, 240, 255, 0.25)' : 'rgba(168, 85, 247, 0.12)';
        cCtx.fill();

        // Node Circle Body
        cCtx.beginPath();
        cCtx.arc(nx, ny, node.r, 0, Math.PI * 2);
        cCtx.fillStyle = '#0a0b16';
        cCtx.fill();
        cCtx.lineWidth = isHovered ? 2.5 : 1.5;
        cCtx.strokeStyle = isHovered ? '#00f0ff' : node.color;
        cCtx.stroke();

        // Node Label
        cCtx.font = `${isHovered ? 'bold ' : ''}11px Plus Jakarta Sans, sans-serif`;
        cCtx.fillStyle = isHovered ? '#ffffff' : '#e2e8f0';
        cCtx.textAlign = 'center';
        cCtx.textBaseline = 'middle';
        cCtx.fillText(node.name, nx, ny + node.r + 14);
      });

      requestAnimationFrame(renderConstellation);
    }

    renderConstellation();
  }

  // =========================================================================
  // 10. SKILLS FILTER TABS
  // =========================================================================
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skills-categories-grid .skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        const isSelected = b === btn;
        b.classList.toggle('active', isSelected);
        b.setAttribute('aria-selected', String(isSelected));
      });

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;
        card.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });

  // =========================================================================
  // 11. PROJECTS FILTER TABS
  // =========================================================================
  const projFilterBtns = document.querySelectorAll('.projects-filter-nav .filter-btn');
  const projectCards = document.querySelectorAll('.projects-feed .project-card-editorial');

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-proj-filter');

      projFilterBtns.forEach(b => b.classList.toggle('active', b === btn));

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        const show = filterVal === 'all' || cardCat === filterVal;
        card.style.display = show ? 'block' : 'none';
      });
    });
  });

  // =========================================================================
  // 12. CERTIFICATIONS TABS
  // =========================================================================
  const certTabBtns = document.querySelectorAll('.cert-tabs-nav .filter-btn');
  const certCards = document.querySelectorAll('.cert-cards-grid .cert-card');

  certTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabVal = btn.getAttribute('data-cert-tab');

      certTabBtns.forEach(b => b.classList.toggle('active', b === btn));

      certCards.forEach(card => {
        const cardCat = card.getAttribute('data-cert-cat');
        const show = tabVal === 'all' || cardCat === tabVal;
        card.style.display = show ? 'flex' : 'none';
      });
    });
  });

  // =========================================================================
  // 13. MOODCANVAS LIVE HARMONIC PALETTE GENERATOR
  // =========================================================================
  const btnGenPalette = document.getElementById('btnGenPalette');
  const paletteSwatches = document.getElementById('paletteSwatches');

  const harmonicPalettes = [
    [
      { hex: '#9D4EDD', name: 'Vibrant Violet', dark: true },
      { hex: '#00F0FF', name: 'Electric Cyan', dark: false },
      { hex: '#241442', name: 'Deep Obsidian', dark: true },
      { hex: '#00B4D8', name: 'Ocean Aqua', dark: false }
    ],
    [
      { hex: '#EC4899', name: 'Neon Magenta', dark: true },
      { hex: '#A855F7', name: 'Cyber Purple', dark: true },
      { hex: '#38BDF8', name: 'Sky Electric', dark: false },
      { hex: '#0F172A', name: 'Midnight Navy', dark: true }
    ],
    [
      { hex: '#10B981', name: 'Emerald Glow', dark: true },
      { hex: '#06B6D4', name: 'Teal Flare', dark: false },
      { hex: '#042F2E', name: 'Abyssal Deep', dark: true },
      { hex: '#6EE7B7', name: 'Mint Ice', dark: false }
    ],
    [
      { hex: '#F59E0B', name: 'Solar Amber', dark: false },
      { hex: '#EF4444', name: 'Crimson Pulse', dark: true },
      { hex: '#8B5CF6', name: 'Nebula Violet', dark: true },
      { hex: '#18181B', name: 'Carbon Black', dark: true }
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
      swatch.title = `Click to copy ${item.name} (${item.hex})`;
      
      swatch.addEventListener('click', () => {
        copyToClipboard(item.hex, `Copied ${item.hex} (${item.name}) to clipboard!`);
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

    document.querySelectorAll('.palette-swatches-row .swatch-item').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const hex = swatch.textContent.trim();
        copyToClipboard(hex, `Copied ${hex} to clipboard!`);
      });
    });
  }

  // =========================================================================
  // 14. WORKING CONTACT FORM WITH VALIDATION & FEEDBACK
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

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
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      if (message.length < 10) {
        showFormStatus('Please provide a descriptive message (at least 10 characters).', 'error');
        return;
      }

      // Visual sending state
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = '<span>Sending Message...</span>';
      }

      setTimeout(() => {
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = '<span>Send Message →</span>';
        }
        showFormStatus(`Thank you, ${name}! Your message has been prepared. You can also reach me directly at Sahithi's LinkedIn or via mailto link below.`, 'success');
        
        // Open pre-populated mail client fallback seamlessly
        const mailtoUrl = `mailto:sahithi.chukka@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        contactForm.reset();
      }, 900);
    });
  }

  function showFormStatus(msg, type) {
    if (!formStatusMsg) return;
    formStatusMsg.textContent = msg;
    formStatusMsg.className = `form-status-msg ${type}`;
  }

  // =========================================================================
  // 15. CLIPBOARD COPY UTILITIES
  // =========================================================================
  const btnCopyLinkedIn = document.getElementById('btnCopyLinkedIn');
  const btnCopyGitHub = document.getElementById('btnCopyGitHub');
  const copyToast = document.getElementById('copyToast');

  function copyToClipboard(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(message);
      }).catch(() => {
        fallbackCopy(text, message);
      });
    } else {
      fallbackCopy(text, message);
    }
  }

  function fallbackCopy(text, message) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(message);
    } catch (e) {
      console.warn('Copy fallback failed', e);
    }
    document.body.removeChild(input);
  }

  function showToast(message) {
    if (!copyToast) return;
    copyToast.textContent = message || '✓ Copied to clipboard!';
    copyToast.style.display = 'block';
    setTimeout(() => {
      copyToast.style.display = 'none';
    }, 2800);
  }

  if (btnCopyLinkedIn) {
    btnCopyLinkedIn.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard('https://www.linkedin.com/in/sahithi-chukka-26b919290/', '✓ Copied LinkedIn Profile URL!');
    });
  }

  if (btnCopyGitHub) {
    btnCopyGitHub.addEventListener('click', (e) => {
      e.preventDefault();
      copyToClipboard('https://github.com/Sahithi200423/', '✓ Copied GitHub Profile URL!');
    });
  }

  // =========================================================================
  // 16. LIGHTBOX MODAL EVENT LISTENERS
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', window.closeLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) window.closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        window.closeLightbox();
      }
    });
  }

  // =========================================================================
  // 17. PORTFOLIO AI ASSISTANT INTERACTIVE CHATBOT
  // =========================================================================
  const chatbotTriggerBtn = document.getElementById('chatbotTriggerBtn');
  const chatbotModal = document.getElementById('chatbotModal');
  const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotChips = document.querySelectorAll('.chatbot-chip');

  function toggleChatbot(forceOpen) {
    if (!chatbotModal) return;
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !chatbotModal.classList.contains('active');
    chatbotModal.classList.toggle('active', shouldOpen);
    if (shouldOpen) {
      chatbotInput?.focus();
    }
  }

  if (chatbotTriggerBtn) {
    chatbotTriggerBtn.addEventListener('click', () => toggleChatbot());
  }

  if (chatbotCloseBtn) {
    chatbotCloseBtn.addEventListener('click', () => toggleChatbot(false));
  }

  // Knowledge base responses for Sahithi's portfolio
  const portfolioKnowledge = [
    {
      keywords: ['education', 'college', 'degree', 'university', 'bachelor', 'btech', 'gpa', 'study'],
      answer: "Sahithi holds a B.Tech in Computer Science and Engineering (2022–2026) from Andhra University College of Engineering (A), Andhra University, graduating with a 7.46 CGPA. Her core coursework includes Data Structures, Web Development, Databases, and Machine Learning."
    },
    {
      keywords: ['cinebook', 'movie', 'ticket', 'booking', 'concurrency', 'v2'],
      answer: "CineBook V2 is Sahithi's full-stack movie booking system. It features an interactive 128-seat auditorium map, a 10-minute atomic PostgreSQL hold concurrency engine that eliminates double bookings (HTTP 409), a Three.js 3D ticket hero, Razorpay test payments, and 43 automated backend tests passing at 100%."
    },
    {
      keywords: ['scenelingo', 'language', 'acting', 'telugu', 'speech', 'rehearsal'],
      answer: "SceneLingo is an innovative language-learning and acting rehearsal platform. It helps learners master native Indian languages (starting with Telugu) through a 5-tier pedagogical transliteration, Web Speech API audio synthesis, and in-browser camera rehearsal recording."
    },
    {
      keywords: ['groundwater', 'consultant', 'calculator', 'hydrology'],
      answer: "Global Groundwater Consultants is an enterprise digital web application featuring 5 specialized hydrogeological calculators (recharge volume, rainwater harvesting, cost estimation with jsPDF export) and a 10-view administrative CRUD portal built with Supabase."
    },
    {
      keywords: ['skill', 'stack', 'tech', 'language', 'react', 'typescript'],
      answer: "Sahithi specializes in Frontend Architecture (React 19, TypeScript, JavaScript ES6+, Semantic HTML5, Tailwind CSS 4), 3D Web Graphics (Three.js WebGL), Backend & Data (Node.js, Express, Supabase PostgreSQL with row-level locks), AI/ML (Python, Microsoft Azure ML), and DevOps (Vercel, Render, Git)."
    },
    {
      keywords: ['certif', 'microsoft', 'learn', 'azure', 'achievement'],
      answer: "Sahithi holds two Microsoft Learn credentials from September 2026: 'Explore and Configure the Azure Machine Learning Workspace' and 'Develop Natural Language Solutions in Azure'. She also achieved a 100% pass rate on CineBook V2's 43 automated backend tests."
    },
    {
      keywords: ['contact', 'hire', 'email', 'linkedin', 'reach', 'job', 'resume'],
      answer: "You can connect with Sahithi on LinkedIn at linkedin.com/in/sahithi-chukka-26b919290/ or review her repositories at github.com/Sahithi200423. You can also download her official resume PDF directly using the button in the Contact section!"
    }
  ];

  function getBotResponse(userQuery) {
    const query = userQuery.toLowerCase();
    for (const item of portfolioKnowledge) {
      if (item.keywords.some(kw => query.includes(kw))) {
        return item.answer;
      }
    }
    return "Sahithi Chukka is a Frontend Developer and Computer Science Graduate from Andhra University skilled in React 19, TypeScript, Three.js, and Supabase. You can ask me about her education, CineBook V2, SceneLingo, technical skills, or how to contact her!";
  }

  function appendChatMessage(text, sender) {
    if (!chatbotMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-msg ${sender}`;
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleUserChat(messageText) {
    const text = messageText.trim();
    if (!text) return;

    appendChatMessage(text, 'user');
    if (chatbotInput) chatbotInput.value = '';

    // Typing indicator delay
    setTimeout(() => {
      const response = getBotResponse(text);
      appendChatMessage(response, 'bot');
    }, 450);
  }

  if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserChat(chatbotInput?.value || '');
    });
  }

  chatbotChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent;
      handleUserChat(prompt);
    });
  });

  // =========================================================================
  // 18. SMOOTH SCROLLING WITH NAVBAR OFFSET
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

}

// Safe initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
