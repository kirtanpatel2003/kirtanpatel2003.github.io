const text = "Hello! I'm Kirtan. Welcome to my portfolio site.";
const typingText = document.getElementById('typewriter-text');
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 150);
    }
}

typeWriter();
