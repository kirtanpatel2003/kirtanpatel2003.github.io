document.addEventListener("DOMContentLoaded", function () {
  const sections = document.getElementsByTagName("section");
  const sectionHeaders = document.getElementsByTagName("h2");

  for (let i = 0; i < sectionHeaders.length; i++) {
    sectionHeaders[i].addEventListener("click", function () {
      sections[i].classList.toggle("hidden");
    });
  }
});
