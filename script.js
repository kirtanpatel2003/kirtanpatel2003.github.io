document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('header nav ul li a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  });
});

// move the sections, checkScroll function, and the scroll event listener outside the DOMContentLoaded event
const sections = document.querySelectorAll("section");

function checkScroll() {
  const triggerBottom = (window.innerHeight / 5) * 4;
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });
}

window.addEventListener("scroll", checkScroll);
checkScroll(); // call the function once when the page loads
