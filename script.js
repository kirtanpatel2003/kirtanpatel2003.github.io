const careers = ["Lifetime Student", "Aspiring Software Engineer", "Future Fullstack Developer", "Cybersecurity Enthusiast", "Coding Aficionado"];
let index = 0;
const careerElement = document.querySelector('.career');

function typeWriter(text, i, callback) {
    if (i < text.length) {
        careerElement.innerHTML = text.substring(0, i + 1);
        setTimeout(() => typeWriter(text, i + 1, callback), 100);
    } else if (typeof callback === 'function') {
        setTimeout(callback, 700); // Pause before starting the next career
    }
}
function startTyping() {
    typeWriter(careers[index], 0, () => {
        index = (index + 1) % careers.length;
        startTyping();
    });
}

startTyping();

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const navbar = document.querySelector('#navbar');

    if (window.scrollY > 100) {
        document.body.classList.add('shrink');
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
    } else {
        document.body.classList.remove('shrink');
        navbar.classList.remove('visible');
        navbar.classList.add('hidden');
    }
});
