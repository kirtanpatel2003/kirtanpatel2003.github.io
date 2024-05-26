window.onload = function() {
    const keys = document.querySelectorAll('.key');
    let index = 0;
    function showKey() {
        if (index < keys.length) {
            keys[index].style.opacity = 1;
            index++;
            setTimeout(showKey, 300);
        } else {
            window.addEventListener('scroll', function() {
                const name = document.querySelector('.name');
                if (window.scrollY > 100) {
                    name.style.opacity = 1;
                }
            });
        }
    }
    setTimeout(showKey, 1000);
};
