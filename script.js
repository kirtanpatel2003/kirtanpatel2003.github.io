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


// Add this to your JavaScript
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('main section');

  function checkScroll() {
    const triggerBottom = window.innerHeight / 2;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;

      if (sectionTop < triggerBottom && sectionBottom > triggerBottom) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
});
