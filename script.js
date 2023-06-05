document.addEventListener("DOMContentLoaded", function(event) {
  AOS.init();

  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.pageYOffset;

      if (
        scrollPosition >= sectionTop - window.innerHeight * 0.5 &&
        scrollPosition < sectionTop + sectionHeight - window.innerHeight * 0.5
      ) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  });

  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const headerOffset = document.querySelector(".header-content").offsetHeight;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
});
