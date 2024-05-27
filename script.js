document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const specialKeys = document.querySelectorAll('.special');
    const typewriterText = document.getElementById('typewriter-text');
    let index = 0;

    // Function to hide the full keyboard
    function hideKeyboard() {
        keys.forEach(key => {
            if (!key.classList.contains('special')) {
                key.style.opacity = 0; // Hide all keys except 'special' keys
            }
        });
        setTimeout(showSpecialKeys, 500); // Delay before showing 'KIRTAN'
    }

    // Function to show 'KIRTAN' keys horizontally
    function showSpecialKeys() {
        specialKeys.forEach(key => key.style.opacity = 1);
        setTimeout(startTypewriter, 1000); // Start the typewriter effect after displaying the name
    }

    // Function to start the typewriter effect
    function startTypewriter() {
        const professions = ["Software Engineer", "Data Scientist", "Product Manager", "Web Developer"];
        let current = 0;
        let letterIndex = 0;
        let currentText = '';
        let isDeleting = false;

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

        type(); // Start the typewriter effect
    }

    // Start the entire sequence
    setTimeout(hideKeyboard, 2000); // Start by hiding the full keyboard, delay as needed
});
