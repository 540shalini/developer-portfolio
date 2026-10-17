/**
 * World-Class Creative Motion System for Shalini Gupta Sanjay
 * Features:
 * - Interactive Custom Magnet Cursor System with Trailing Smoothing
 * - Magnetic CTA Buttons with Spring Physics
 * - Canvas Ambient Particle Network with Cursor Gravity
 * - 3D Abstract Geometric Sculpture Tilt Simulation
 * - Constellation Tech Node Filtering
 * - Real-Time IST Time Clock
 * - One-Click Direct Email Fast-Copy (87794san@gmail.com)
 * - Project Case Study Dialog Modals
 * - Contact Form Handling with Feedback
 * - Mobile Navigation Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMagneticElements();
  initAmbientCanvas();
  initTimeClock();
  initSculptureTilt();
  initFastCopy();
  initConstellationNodes();
  initProjectModals();
  initMobileDrawer();
  initContactForm();
  initSmoothScrollSpy();
});

/* ==========================================================================
   1. Interactive Custom Magnet Cursor System
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Add Hover state on interactive elements
  const hoverables = document.querySelectorAll('a, button, .tech-node, input, select, textarea');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
}

/* ==========================================================================
   2. Magnetic CTA Buttons
   ========================================================================== */
function initMagneticElements() {
  const magnets = document.querySelectorAll('[data-magnet]');

  magnets.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   3. Canvas Ambient Particle Physics
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
  const mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.8;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 2.5;
        this.y -= Math.sin(angle) * force * 2.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const alpha = 1 - distance / 110;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.14})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. Real-Time IST Time Clock
   ========================================================================== */
function initTimeClock() {
  const clockEl = document.getElementById('local-time-clock');
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat([], options);
    clockEl.textContent = `${formatter.format(new Date())} IST`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   5. 3D Sculpture Tilt Simulation
   ========================================================================== */
function initSculptureTilt() {
  const card = document.getElementById('sculpture-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   6. One-Click Fast Copy Email (87794san@gmail.com)
   ========================================================================== */
function initFastCopy() {
  const email = '87794san@gmail.com';
  const heroCopy = document.getElementById('hero-quick-copy');

  if (heroCopy) {
    heroCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(email).then(() => {
        heroCopy.classList.add('copied');
        setTimeout(() => {
          heroCopy.classList.remove('copied');
        }, 2200);
      });
    });
  }
}

/* ==========================================================================
   7. Constellation Tech Node Filtering
   ========================================================================== */
function initConstellationNodes() {
  const buttons = document.querySelectorAll('.cluster-btn');
  const nodes = document.querySelectorAll('.tech-node');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      nodes.forEach(node => {
        if (category === 'all' || node.getAttribute('data-category') === category) {
          node.style.display = 'flex';
          node.style.opacity = '1';
          node.style.transform = 'scale(1)';
        } else {
          node.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Project Case Study Dialog Modals
   ========================================================================== */
function initProjectModals() {
  const dialog = document.getElementById('project-modal');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogContent = document.getElementById('dialog-content');
  const closeBtn = document.getElementById('close-dialog-btn');

  const cases = {
    brahmand: {
      title: 'BRAHMAND • Mobile Application Architecture',
      content: `
        <p><strong>Category:</strong> Mobile Application / Spiritual & Community Experience</p>
        <p><strong>Platform:</strong> React Native, Expo, TypeScript, Expo Router, Zustand.</p>
        <h4>Frontend Focus & Contributions:</h4>
        <ul>
          <li>Contributed directly to frontend development of spiritual community features, live devotional countdowns, and sacred chant tracking.</li>
          <li>Utilized modern AI coding assistants (Cursor, Antigravity, Claude) to accelerate component implementation, modularize UI components, and debug mobile screen workflows.</li>
          <li>Worked on smooth screen transitions and responsive layouts using Expo Router navigation.</li>
          <li>Collaborated on iterative UI design improvements with high contrast and intuitive navigation.</li>
        </ul>
      `
    },
    puristine: {
      title: 'PURISTINE FOODS • E-Commerce Concept',
      content: `
        <p><strong>Category:</strong> Academic Project · E-Commerce Web Portal</p>
        <p><strong>Technologies:</strong> HTML5, CSS3, JavaScript, PHP, MySQL, Chart.js.</p>
        <h4>Implemented Functionality:</h4>
        <ul>
          <li>Product catalog with category filtration for international export snacks.</li>
          <li>User authentication, session handling, and cart persistence.</li>
          <li>Streamlined checkout flow and interactive customer review module.</li>
          <li>Admin analytics dashboard visualising order patterns using Chart.js.</li>
        </ul>
        <p><em>Status: Academic capstone project completed and documented with distinction.</em></p>
      `
    }
  };

  document.querySelectorAll('.inspect-case-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = cases[key];
      if (data && dialog) {
        dialogTitle.textContent = data.title;
        dialogContent.innerHTML = data.content;
        dialog.showModal();
      }
    });
  });

  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });
  }
}

/* ==========================================================================
   9. Mobile Menu Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!drawer || !toggleBtn) return;

  const toggle = (open) => {
    if (open) {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
    } else {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  };

  toggleBtn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });
}

/* ==========================================================================
   10. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const statusMsg = document.getElementById('form-status-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('form-submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      statusMsg.className = 'form-status-msg';
      statusMsg.innerHTML = 'Thank you for reaching out! Your message has been logged. Shalini will get back to you shortly at 87794san@gmail.com.';
      statusMsg.style.display = 'block';
      form.reset();

      setTimeout(() => {
        statusMsg.style.display = 'none';
      }, 6000);
    }, 800);
  });
}

/* ==========================================================================
   11. Smooth Active Nav Link Spy
   ========================================================================== */
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
