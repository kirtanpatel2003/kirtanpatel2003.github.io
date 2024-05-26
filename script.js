window.onload = function() {
    const allKeys = document.querySelectorAll('.key');
    const name = document.querySelector('.name');
    
    allKeys.forEach(key => {
        key.style.opacity = 1;
    });

    name.style.opacity = 0;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            name.style.opacity = 1;
        } else {
            name.style.opacity = 0;
        }
    });
};
