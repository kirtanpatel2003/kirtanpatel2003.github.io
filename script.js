document.addEventListener("DOMContentLoaded", function(event) { 
  AOS.init();
});

//   const navLinks = document.querySelectorAll('header nav ul li a');

//   navLinks.forEach((link) => {
//     link.addEventListener('click', (event) => {
//       event.preventDefault();
//       const targetId = event.target.getAttribute('href');
//       const targetElement = document.querySelector(targetId);
//       const headerOffset = document.querySelector('header').offsetHeight;
//       const elementPosition = targetElement.getBoundingClientRect().top;
//       const offsetPosition = elementPosition - headerOffset;

//       window.scrollBy({
//         top: offsetPosition,
//         behavior: 'smooth',
//       });
//     });
//   });
// });
