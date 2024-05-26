document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key, .special');
    const name = document.querySelector('.name');
    let index = 0;

    // Function to show each key
    function showKey() {
        if (index < keys.length) {
            keys[index].style.opacity = 1;
            index++;
            setTimeout(showKey, 50); // Speed at which keys appear
        } else {
            setTimeout(revealName, 500); // Delay before revealing the name
        }
    }

    // Function to reveal the name
    function revealName() {
        name.style.opacity = 1;
        setTimeout(hideKeyboard, 2000); // Delay before hiding the keyboard
    }

    // Function to hide the keyboard
    function hideKeyboard() {
        Array.from(keys).forEach(key => key.style.opacity = 0);
        setTimeout(startTypewriter, 500); // Delay before starting the typewriter effect
    }

    // Function to start the typewriter effect
    function startTypewriter() {
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

        type(); // Start the typewriter effect
    }

    // Start the sequence
    setTimeout(showKey, 1000); // Initial delay before the sequence starts
});
