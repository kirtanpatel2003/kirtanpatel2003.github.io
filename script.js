document.addEventListener("DOMContentLoaded", function(event) { 
  AOS.init();

  const navLinks = document.querySelectorAll('nav ul li a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const headerOffset = document.querySelector('.header-content').offsetHeight;
      const elementPosition = targetElement.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  });
});
