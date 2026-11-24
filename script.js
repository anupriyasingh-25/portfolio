

// ===============================
// 1. MOBILE NAVIGATION
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.textContent = isOpen ? "✕" : "☰";

    });

    // Close menu after clicking a navigation link

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";

        });

    });

}


// ===============================
// 2. TYPING ANIMATION
// ===============================

const typingText = document.querySelector(".typing-text");

const words = [
    "Web Developer",
    "Frontend Developer",
    "Programmer",
    "BCA Student"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function typeEffect() {

    if (!typingText) return;

    if (reducedMotion) {
        typingText.textContent = words[0];
        return;
    }

    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentWord.length) {

        isDeleting = true;
        speed = 1000;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        wordIndex = (wordIndex + 1) % words.length;

        speed = 400;

    }

    setTimeout(typeEffect, speed);

}

typeEffect();


// ===============================
// 3. SMOOTH SCROLLING
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth"
            });

        }

    });

});


// ===============================
// 4. SCROLL REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".about-card, .detail-card, .skill-card, " +
    ".project-card, .education-card, .contact-info, .contact-form"
);

if (reducedMotion) {

    revealElements.forEach(element => {
        element.classList.add("show");
    });

} else if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("show");
    });

}


// ===============================
// 5. BACK TO TOP BUTTON
// ===============================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });

    });

}


// ===============================
// 6. CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {

            formStatus.textContent = "Please fill in all fields.";
            return;

        }

        if (!emailPattern.test(email)) {

            formStatus.textContent = "Please enter a valid email address.";
            return;

        }

        // Prepare email using the visitor's default email application

        const subject = encodeURIComponent(
            "Portfolio Contact Message from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const mailtoLink =
            "mailto:anusingh25@navagurukul.org" +
            "?subject=" + subject +
            "&body=" + body;

        formStatus.textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;

    });

}


// ===============================
// 7. AUTOMATIC FOOTER YEAR
// ===============================

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// ===============================
// 8. ACTIVE NAVIGATION LINK
// ===============================

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navItems.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + currentId
                    );

                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

}


console.log("Anupriya's Portfolio is running successfully!");
