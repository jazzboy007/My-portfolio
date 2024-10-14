// This will take it to contact me form

document.getElementById("contact").addEventListener("click", function (e) {
  e.preventDefault();

  const contactForm = document.getElementById("contact-f");

  contactForm.scrollIntoView({ behavior: "smooth" });
});

// Thi will take it to the Projects

document.getElementById("Projects").addEventListener("click", function (e) {
  e.preventDefault();

  const proj = document.getElementById("Project-f");

  proj.scrollIntoView({ behavior: "smooth" });
});

const upButton = document.getElementById("up");

upButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function showAbout() {
  document.getElementById("aboutCloud").style.display = "block";
}

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("aboutCloud").style.display = "none";
});

// Script for openning links

function downloadResume() {
  window.location.href = "Resume/My_resume.doc";
}
