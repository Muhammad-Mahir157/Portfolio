(function () {
  const menu = document.querySelector(".menu-links");
  const hamburgerBtn = document.querySelector(".hamburger-icon");

  function setMenu(open) {
    if (!menu || !hamburgerBtn) return;
    menu.classList.toggle("open", open);
    hamburgerBtn.classList.toggle("open", open);
    hamburgerBtn.setAttribute("aria-expanded", String(open));
  }

  // Hamburger toggle
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu?.classList.contains("open");
      setMenu(!isOpen);
    });
  }

  // Close menu when a link is clicked
  document.querySelectorAll(".menu-links a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!menu || !hamburgerBtn) return;
    const isOpen = menu.classList.contains("open");
    if (!isOpen) return;

    const clickedInside =
      menu.contains(e.target) || hamburgerBtn.contains(e.target);
    if (!clickedInside) setMenu(false);
  });

  // Close on Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Smooth scroll for buttons/arrows using data-scroll
  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.getAttribute("data-scroll");
      if (!target) return;
      const node = document.querySelector(target);
      if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Dark mode toggle (desktop + mobile)
  const themeButtons = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile"),
  ].filter(Boolean);

  function applyTheme(mode) {
    const root = document.documentElement;
    root.classList.toggle("theme-dark", mode === "dark");
    localStorage.setItem("theme", mode);

    // Update icons
    const icon = mode === "dark" ? "☀️" : "🌙";
    themeButtons.forEach((btn) => (btn.textContent = icon));
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("theme-dark");
      applyTheme(isDark ? "light" : "dark");
    });
  });

  // Back to top button
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    const onScroll = () => {
      const show = window.scrollY > 600;
      backToTop.classList.toggle("show", show);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
