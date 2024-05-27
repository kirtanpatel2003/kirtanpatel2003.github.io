// document.addEventListener('DOMContentLoaded', function() {
//     const keys = document.querySelectorAll('.key');
//     const specialKeys = document.querySelectorAll('.special');
//     const typewriterText = document.getElementById('typewriter-text');
//     let index = 0;

//     // Function to hide the full keyboard
//     function hideKeyboard() {
//         keys.forEach(key => {
//             if (!key.classList.contains('special')) {
//                 key.style.opacity = 0; // Hide all keys except 'special' keys
//             }
//         });
//         setTimeout(showSpecialKeys, 500); // Delay before showing 'KIRTAN'
//     }

//     // Function to show 'KIRTAN' keys horizontally
//     function showSpecialKeys() {
//         specialKeys.forEach(key => key.style.opacity = 1);
//         setTimeout(startTypewriter, 1000); // Start the typewriter effect after displaying the name
//     }

//     // Function to start the typewriter effect
//     function startTypewriter() {
//         const professions = ["Software Engineer", "Data Scientist", "Product Manager", "Web Developer"];
//         let current = 0;
//         let letterIndex = 0;
//         let currentText = '';
//         let isDeleting = false;

//         function type() {
//             if (isDeleting) {
//                 if (letterIndex <= 0) {
//                     isDeleting = false;
//                     current = (current + 1) % professions.length; // Loop around the array
//                     setTimeout(type, 500); // Pause before typing next profession
//                 } else {
//                     currentText = professions[current].substring(0, letterIndex--);
//                     typewriterText.textContent = currentText;
//                     setTimeout(type, 120); // Speed of deleting
//                 }
//             } else {
//                 if (letterIndex === professions[current].length) {
//                     isDeleting = true;
//                     setTimeout(type, 2000); // Pause at the end before deleting
//                 } else {
//                     currentText = professions[current].substring(0, ++letterIndex);
//                     typewriterText.textContent = currentText;
//                     setTimeout(type, 200); // Speed of typing
//                 }
//             }
//         }

//         setTimeout(type, 2000); // Initial delay before starting the effect
//     }

//     // Start the entire sequence
//     setTimeout(hideKeyboard, 2000); // Start by hiding the full keyboard, delay as needed
// });

document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const specialKeys = document.querySelectorAll('.special');
    const typewriterText = document.getElementById('typewriter-text');
    let index = 0;

    // Function to show the keyboard and then hide it
    function showAndHideKeyboard() {
        if (index < keys.length) {
            keys[index].style.opacity = 1;
            index++;
            setTimeout(showAndHideKeyboard, 50); // Speed at which keys appear
        } else {
            setTimeout(hideKeyboard, 1000); // Delay before hiding the keyboard
        }
    }

    // Function to hide the keyboard
    function hideKeyboard() {
        keys.forEach(key => key.style.opacity = 0);
        setTimeout(showSpecialKeys, 500); // Delay before showing 'KIRTAN'
    }

    // Function to show 'KIRTAN' keys horizontally
    function showSpecialKeys() {
        specialKeys.forEach(key => key.style.opacity = 1);
        setTimeout(startTypewriter, 1000); // Start the typewriter effect after displaying the name
    }

    // Start the entire sequence
    setTimeout(showAndHideKeyboard, 1000); // Start showing the keyboard
});
