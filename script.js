document.addEventListener("DOMContentLoaded", function () {
    // Handle Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents default page reload
        alert("Your message has been sent! (This is a placeholder response)");
    });

    // Handle Resume Download Button
    document.getElementById("downloadResume").addEventListener("click", function () {
        window.open("usukhchuluun batchuluun resume rework.pdf", "_blank");
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("a.nav-link").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });
});
