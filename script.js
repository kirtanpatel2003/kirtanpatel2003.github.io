window.onload = function() {
    const allKeys = document.querySelectorAll('.key');
    const specialKeys = document.querySelectorAll('.special');
    const name = document.querySelector('.name');
    let showSpecial = false;

    allKeys.forEach(key => {
        key.style.opacity = 1;
    });

    window.addEventListener('scroll', function() {
        if (!showSpecial && window.scrollY > 50) {
            specialKeys.forEach(key => {
                key.style.opacity = 1;
            });
            showSpecial = true;
        } else if (showSpecial && window.scrollY > 300) {
            name.style.opacity = 1;
        }
    });
};
