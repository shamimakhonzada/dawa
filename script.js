// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.querySelector(".nav-overlay");

  if (hamburger && navMenu && navOverlay) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navOverlay.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Close menu when clicking outside or on overlay
  document.addEventListener("click", function (event) {
    if (
      ((!event.target.closest(".main-nav") &&
        !event.target.closest(".hamburger")) ||
        event.target.closest(".nav-overlay")) &&
      navMenu.classList.contains("active")
    ) {
      navMenu.classList.remove("active");
      navOverlay.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      if (img.complete) return;
      imageObserver.observe(img);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });

  // Video background play/pause control for mobile efficiency
  const heroVideo = document.querySelector(".hero-video video");
  if (heroVideo) {
    // Pause video when not in viewport for performance
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroVideo
              .play()
              .catch((e) => console.log("Autoplay prevented:", e));
          } else {
            heroVideo.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoObserver.observe(heroVideo);
  }
});

(function () {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    () => {
      const current = window.pageYOffset || document.documentElement.scrollTop;

      if (current > lastScroll && current > 100) {
        // scrolling down and scrolled past 100px
        header.classList.add("header--hidden");
        header.classList.remove("header--visible");
      } else {
        // scrolling up
        header.classList.remove("header--hidden");
        header.classList.add("header--visible");
      }
      lastScroll = Math.max(0, current);
    },
    { passive: true }
  );
})();

// Additional functionality for the new sections

// News & Events card hover effect
document.addEventListener("DOMContentLoaded", function () {
  const eventCards = document.querySelectorAll(".event-card");

  eventCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
    });
  });

  // Video background for final CTA section
  const ctaVideo = document.querySelector(".cta-video video");
  if (ctaVideo) {
    // Ensure video plays correctly on mobile
    ctaVideo.addEventListener("loadedmetadata", function () {
      ctaVideo.play().catch((e) => {
        console.log("Video autoplay prevented:", e);
      });
    });
  }
});
