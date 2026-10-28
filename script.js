
"use strict";

// MOBILE NAVIGATION MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}

// REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries, observerInstance) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });
}

// AUTOMATIC FOOTER YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const yourGmail = "rubenhangkatagaro@gmail.com";

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        if (!nameInput || !emailInput || !messageInput) {
            if (formNote) {
                formNote.textContent =
                    "Error: Please check the contact form field IDs in your HTML.";
            }
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            if (formNote) {
                formNote.textContent = "Please complete all fields.";
            }
            return;
        }

        const subject = `Portfolio Message from ${name}`;

        const body =
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`;

        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=" + encodeURIComponent(yourGmail.trim()) +
            "&su=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        if (formNote) {
            formNote.textContent =
                "Opening Gmail. Please press Send to deliver your message.";
        }

        const gmailWindow = window.open(gmailURL, "_blank");

        if (!gmailWindow && formNote) {
            formNote.textContent =
                "Gmail was blocked. Please allow pop-ups for this website and try again.";
        }
    });
}
    
/* ANIMATED EYE INTRO LOADING */
document.addEventListener("DOMContentLoaded", function () {
    const intro = document.getElementById("welcomeIntro");

    if (!intro) return;

    setTimeout(function () {
        intro.classList.add("intro-exit");

        setTimeout(function () {
            intro.remove();
        }, 1000);
    }, 3600);
});
