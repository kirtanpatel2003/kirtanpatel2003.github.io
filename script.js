document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key:not(.special)'); // Only select non-special keys
    const specialKeys = document.querySelectorAll('.special');
    const typewriterText = document.getElementById('typewriter-text');
    let index = 0;

    function showKeyboard() {
        if (index < keys.length) {
            keys[index].style.opacity = 1;
            index++;
            setTimeout(showKeyboard, 50); // Speed at which keys appear
        }
    }


    function hideKeyboard() {
        // First, make all keys transparent
        keys.forEach(key => key.style.opacity = 0);
    
        // After a delay, collapse the keys to remove their space
        setTimeout(() => {
            keys.forEach(key => {
                key.style.height = '0px'; // Ensure you're setting a measurable unit
                key.style.margin = '0px';
                key.style.padding = '0px';
            });
        }, 1000); // Ensure this delay allows for the opacity transition to be visible
    
        // Further delay before showing 'KIRTAN'
        setTimeout(showSpecialKeys, 6000);
    }



    function showSpecialKeys() {
        specialKeys.forEach(key => {
            key.style.display = 'inline-flex'; // Change display to make special keys visible
            key.style.opacity = 1;
        });
        setTimeout(startTypewriter, 1000); // Start the typewriter effect after displaying the name
    }

    function startTypewriter() {
        const professions = ["Software Engineer", "Data Scientist", "Product Manager", "Web Developer"];
        let current = 0;
        let letterIndex = 0;
        let currentText = '';
        let isDeleting = false;

        function type() {
            if (isDeleting) {
                if (letterIndex <= 0) {
                    isDeleting = false;
                    current = (current + 1) % professions.length;
                    setTimeout(type, 500);
                } else {
                    currentText = professions[current].substring(0, letterIndex--);
                    typewriterText.textContent = currentText;
                    setTimeout(type, 120);
                }
            } else {
                if (letterIndex === professions[current].length) {
                    isDeleting = true;
                    setTimeout(type, 2000);
                } else {
                    currentText = professions[current].substring(0, ++letterIndex);
                    typewriterText.textContent = currentText;
                    setTimeout(type, 200);
                }
            }
        }

        setTimeout(type, 2000);
    }

    showKeyboard();
    setTimeout(hideKeyboard, 10000); // Ensure there's a long enough delay to show the keyboard first
});
