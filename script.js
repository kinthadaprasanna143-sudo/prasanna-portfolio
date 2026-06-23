AOS.init({
  duration: 950,
  once: true,
  easing: "ease-out-cubic",
});

const typed = new Typed(".typed-text", {
  strings: ["ECE Student", "Full Stack Developer", "IoT Enthusiast", "Data Science Learner"],
  typeSpeed: 70,
  backSpeed: 35,
  backDelay: 2000,
  loop: true,
});

particlesJS("particles-js", {
  particles: {
    number: { value: 85, density: { enable: true, value_area: 800 } },
    color: { value: "#ff2d55" },
    shape: { type: "circle" },
    opacity: { value: 0.18, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: false },
    move: { enable: true, speed: 1.6, direction: "none", out_mode: "out" },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
    modes: { grab: { distance: 180, line_linked: { opacity: 0.2 } }, push: { particles_nb: 4 } },
  },
  retina_detect: true,
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  cursorGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
});

const magneticButtons = document.querySelectorAll(".magnetic");
magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

const counterItems = document.querySelectorAll(".counter");
const progressBars = document.querySelectorAll(".skill-bar");

function animateCounters() {
  counterItems.forEach((counter) => {
    const target = +counter.dataset.target;
    let current = 0;
    const step = Math.max(1, Math.round(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + "+";
        clearInterval(interval);
      } else {
        counter.textContent = current;
      }
    }, 25);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains("skills-grid")) {
        progressBars.forEach((bar) => {
          const percent = bar.dataset.percent;
          const fill = bar.querySelector(".skill-fill");
          if (fill) {
            fill.style.width = `${percent}%`;
          }
        });
      }
      if (entry.target.classList.contains("stats-grid")) {
        animateCounters();
      }
    });
  },
  { threshold: 0.35 }
);

const skillsGrid = document.querySelector(".skills-grid");
const statsGrid = document.querySelector(".stats-grid");
if (skillsGrid) observer.observe(skillsGrid);
if (statsGrid) observer.observe(statsGrid);

const heroTimeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
heroTimeline.from(".topbar", { y: -50, opacity: 0 });
heroTimeline.from(
  ".hero-copy h1, .hero-copy p, .hero-actions .btn, .hero-meta",
  { y: 40, opacity: 0, stagger: 0.12 },
  "-=0.7"
);
heroTimeline.from(".hero-card, .hero-highlights", { y: 40, opacity: 0, stagger: 0.13 }, "-=0.9");

gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".glass-card, .section-header, .feature-card, .project-card, .language-card").forEach((section) => {
  gsap.from(section, {
    y: 40,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
});

new Swiper(".certifications-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 24,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 120,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4200,
    disableOnInteraction: false,
  },
});

VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
  max: 16,
  speed: 500,
  glare: true,
  "max-glare": 0.18,
});

const loadProgress = () => {
  progressBars.forEach((bar) => {
    const fill = document.createElement("div");
    fill.className = "skill-fill";
    fill.style.width = "0%";
    fill.style.height = "100%";
    fill.style.background = "linear-gradient(90deg, rgba(255,45,85,0.95), rgba(255,45,85,0.75))";
    fill.style.borderRadius = "999px";
    fill.style.transformOrigin = "left";
    fill.style.transition = "width 1.4s ease";
    bar.appendChild(fill);

    requestAnimationFrame(() => {
      fill.style.width = bar.dataset.percent + "%";
    });
  });
};

window.addEventListener("load", loadProgress);
