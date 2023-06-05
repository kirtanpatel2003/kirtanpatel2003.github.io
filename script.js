document.addEventListener("DOMContentLoaded", function(event) {
  AOS.init();

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav ul li a");

  function setActiveSection() {
    const scrollPosition = window.pageYOffset;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        section.classList.add("active");
        navLinks.forEach(function(link) {
          if (link.getAttribute("href") === "#" + section.id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      } else {
        section.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveSection);
});
