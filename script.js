// window.onload = function() {
//     const allKeys = document.querySelectorAll('.key');
//     const name = document.querySelector('.name');
    
//     allKeys.forEach(key => {
//         key.style.opacity = 1;
//     });

//     name.style.opacity = 0;

//     window.addEventListener('scroll', function() {
//         if (window.scrollY > 300) {
//             name.style.opacity = 1;
//         } else {
//             name.style.opacity = 0;
//         }
//     });
// };
document.addEventListener('DOMContentLoaded', function() {
    const professions = ["Software Engineer", "Data Scientist", "Product Manager", "Web Developer"];
    let current = 0;
    let letterIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typewriterText = document.getElementById('typewriter-text');

    function type() {
        if (current >= professions.length) {
            current = 0;
        }

        if (!isDeleting) {
            currentText = professions[current].substring(0, letterIndex++);
        }

        typewriterText.textContent = currentText;

        if (letterIndex > professions[current].length) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at the end before deleting
        } else if (isDeleting) {
            currentText = professions[current].substring(0, letterIndex--);
            typewriterText.textContent = currentText;

            if (currentText === '') {
                isDeleting = false;
                current++;
                setTimeout(type, 500); // Pause before starting next text
            } else {
                setTimeout(type, 120); // Speed of deleting
            }
        } else {
            setTimeout(type, 200); // Speed of typing
        }
    }

    setTimeout(type, 1000); // Initial delay before typing starts
});
