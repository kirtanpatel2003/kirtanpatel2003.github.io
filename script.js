// window.onload = function() {
//     const allKeys = document.querySelectorAll('.key');
//     const specialKeys = document.querySelectorAll('.special');
//     const name = document.querySelector('.name');
//     let showSpecial = false;

//     allKeys.forEach(key => {
//         key.style.opacity = 1;
//     });
//     window.addEventListener('load', function() {
//         const name = document.querySelector('.name');
//         name.style.opacity = 0; // Ensure name is hidden on load
    
//         window.addEventListener('scroll', function() {
//             if (window.scrollY > 300) {  // Adjust this value based on where you want the effect to trigger
//                 name.style.opacity = 1;
//             } else {
//                 name.style.opacity = 0; // Hide the name when not at the scroll position
//             }
//         });
//     });
// };
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
