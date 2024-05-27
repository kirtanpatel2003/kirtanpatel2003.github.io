document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const specialKeys = document.querySelectorAll('.special');
    let index = 0;

    // Function to show each key
    function showKey() {
        if (index < keys.length) {
            keys[index].style.opacity = 1;
            index++;
            setTimeout(showKey, 50); // Speed at which keys appear
        } else {
            setTimeout(hideKeyboard, 4000); // Increased delay before hiding the keyboard
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
    setTimeout(showKey, 1000); // Start showing the keyboard
});
