// Main Interactive Engine for Akanksha Bhosale's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbarScroll();
  initMobileMenu();
  initProjects();
  initSkillBars();
  initContactForm();
});

// 1. Dynamic Typewriter Effect
function initTypewriter() {
  const textElement = document.getElementById('typewriter-text');
  if (!textElement) return;

  const phrases = [
    "Full-Stack Web & Software Developer",
    "C, C++, PHP, Java & Python Programmer",
    "Database & MySQL Application Builder",
    "WordPress & Elementor Developer",
    "Energetic & Eager to Contribute"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// 2. Navbar Scroll Spy
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    if (scrollY > 40) {
      navbar.classList.add('shadow-xl', 'bg-[#080b11]/95');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-[#080b11]/95');
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// 3. Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 4. Render & Filter Projects
function initProjects() {
  const grid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.project-filter-btn');

  if (!grid || typeof PROJECTS_DATA === 'undefined') return;

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(project => `
      <div class="editorial-card overflow-hidden flex flex-col group">
        
        <!-- Thumbnail -->
        <div class="relative h-48 sm:h-56 overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0e121b] via-[#0e121b]/30 to-transparent"></div>
          
          <span class="absolute top-3.5 right-3.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#080b11]/90 backdrop-blur border border-white/10 text-cyan-300">
            ${project.category.toUpperCase()}
          </span>
        </div>

        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition">${project.title}</h3>
            <p class="text-xs text-cyan-400/90 font-medium mt-1">${project.subtitle}</p>
            <p class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">${project.description}</p>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${project.tags.map(t => `<span class="text-[10px] bg-slate-900/90 text-slate-300 px-2 py-0.5 rounded border border-white/5 font-mono">${t}</span>`).join('')}
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <button onclick="openProjectModal('${project.id}')" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition">
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> View Details
            </button>
            <a href="${project.github}" target="_blank" class="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 transition">
              <i class="fa-brands fa-github"></i> Code
            </a>
          </div>

        </div>

      </div>
    `).join('');
  }

  renderProjects('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-white/5', 'text-slate-400');
      });
      btn.classList.remove('bg-white/5', 'text-slate-400');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');

      renderProjects(btn.dataset.filter);
    });
  });
}

// Project Details Modal
window.openProjectModal = function(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const desc = document.getElementById('modal-desc');
  const image = document.getElementById('modal-img');
  const highlights = document.getElementById('modal-highlights');
  const tags = document.getElementById('modal-tags');
  const githubLink = document.getElementById('modal-github-link');

  if (title) title.textContent = project.title;
  if (desc) desc.textContent = project.description;
  if (image) image.src = project.image;
  if (githubLink) githubLink.href = project.github;

  if (tags) {
    tags.innerHTML = project.tags.map(t => `<span class="text-xs bg-slate-900 text-cyan-300 border border-white/10 px-2.5 py-1 rounded font-mono">${t}</span>`).join('');
  }

  if (highlights) {
    highlights.innerHTML = project.highlights.map(h => `<li class="flex items-start gap-2 text-xs text-slate-300"><i class="fa-solid fa-check text-cyan-400 mt-0.5"></i> <span>${h}</span></li>`).join('');
  }

  if (modal) modal.classList.remove('hidden');
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.add('hidden');
};

// 5. Skill Bar Animation
function initSkillBars() {
  const skillSection = document.getElementById('skills');
  if (!skillSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const targetWidth = bar.dataset.level || '80%';
          bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.15 });

  observer.observe(skillSection);
}

// 6. Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    const toast = document.getElementById('contact-toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 5000);
    }

    form.reset();
  });
}
