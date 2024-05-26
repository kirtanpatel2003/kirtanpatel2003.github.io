window.onload = function() {
    const allKeys = document.querySelectorAll('.key');
    const specialKeys = document.querySelectorAll('.special');
    const name = document.querySelector('.name');
    let showSpecial = false;

    allKeys.forEach(key => {
        key.style.opacity = 1;
    });
    window.addEventListener('scroll', function() {
        const name = document.querySelector('.name');
        if (window.scrollY > 100) { // Adjust as needed
            name.style.opacity = 1;
        }
    });
};
