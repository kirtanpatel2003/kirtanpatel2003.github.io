// script.js
document.addEventListener("DOMContentLoaded", function(event) {
  AOS.init();

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".sidebar nav ul li a");

  function setActiveLink() {
    const scrollPosition = window.pageYOffset;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          if (link.getAttribute("href") === "#" + section.id) {
            link.classList.add("active-link");
          } else {
            link.classList.remove("active-link");
          }
        });
      }
    });
  }

  // Call the function immediately
  setActiveLink();
  // And also call it when the user scrolls
  window.addEventListener("scroll", setActiveLink);
});
