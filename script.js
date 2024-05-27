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
        // First, fade out all keys
        keys.forEach(key => {
            key.style.opacity = 0;
        });
    
        // Wait for the opacity transition to finish before collapsing
        setTimeout(() => {
            keys.forEach(key => {
                key.style.height = '0';
                key.style.margin = '0';
                key.style.padding = '0';
                // Wait for height, margin, and padding transitions
                setTimeout(() => {
                    key.style.display = 'none';  // Finally, set display to none
                }, 500); // Ensure this matches the duration of height/margin/padding transitions
            });
        }, 1000); // Matches the duration of the opacity transition
    
        // Delay the appearance of special keys to ensure all transitions are complete
        setTimeout(showSpecialKeys, 2000);
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
