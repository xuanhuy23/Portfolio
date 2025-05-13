document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Hiệu ứng fade-in cho các section khi cuộn
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Hiệu ứng stagger cho các mục kỹ năng
  const skillItems = document.querySelectorAll(".skill-item");
  gsap.fromTo(
    skillItems,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".skills-container",
        start: "top 70%",
      },
    }
  );

  // Hiệu ứng stagger cho các dự án
  const projectItems = document.querySelectorAll(".project-item");
  gsap.fromTo(
    projectItems,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 70%",
      },
    }
  );

  // Hiệu ứng hero section
  gsap.fromTo(
    ".hero-content",
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
  );

  gsap.fromTo(
    ".hero-image",
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.3 }
  );

  // Hiệu ứng hover cho các dự án
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item.querySelector(".project-overlay"), {
        opacity: 1,
        duration: 0.3,
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item.querySelector(".project-overlay"), {
        opacity: 0,
        duration: 0.3,
      });
    });
  });

  // Hiệu ứng cho các nút trong hero section
  gsap.from(".hero-btns .btn", {
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.8,
  });

  gsap.from(".social-links a", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out",
    delay: 1.2,
  });

  // Hiệu ứng scroll smooth
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
