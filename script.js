document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

AOS.init();

document.querySelector('.menu-toggle').addEventListener('click', function () {
  document.querySelector('.sidebar').classList.toggle('active');
});
