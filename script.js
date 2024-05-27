document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key, .special');
    const specialKeys = document.querySelectorAll('.special');
    const name = document.querySelector('.name');
    const typewriterText = document.getElementById('typewriter-text');
    let index = 0;


    function showKey() {
        if (index < keys.length) {
            keys[index].style.opacity = 1;
            index++;
            setTimeout(showKey, 50);
        } else {
            setTimeout(hideKeyboard, 2000);
        }
    }

    function hideKeyboard() {
        keys.forEach(key => key.style.opacity = 0);
        setTimeout(showSpecialKeys, 500);
    }

    function showSpecialKeys() {
        specialKeys.forEach(key => key.style.opacity = 1);
        setTimeout(startTypewriter, 1000);
    }


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
                setTimeout(type, 2000);
            } else if (isDeleting) {
                currentText = professions[current].substring(0, letterIndex--);
                typewriterText.textContent = currentText;

                if (currentText === '') {
                    isDeleting = false;
                    current++;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, 120);
                }
            } else {
                setTimeout(type, 200);
            }
        }

        type();
    }


    setTimeout(showKey, 1000);
});
