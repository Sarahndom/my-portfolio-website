document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navLinks = primaryNav.querySelectorAll('a');

    function toggleNav() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;

        // Toggle the 'open' class for CSS styling
        primaryNav.classList.toggle('open');

        // Accessibility: update aria-expanded
        navToggle.setAttribute('aria-expanded', !isExpanded);

        // Update the button icon for visual feedback (☰/✕)
        navToggle.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
    }

    // 1. Listen for clicks on the toggle button
    navToggle.addEventListener('click', toggleNav);

    // 2. Close the navigation when a link is clicked (improved mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the menu is actually open
            if (primaryNav.classList.contains('open')) {
                toggleNav();
            }
        });
    });

    // --- Fade-in on scroll (Intersection Observer) ---
    const faders = document.querySelectorAll(".fade");

    const appearOptions = {
        threshold: 0.2
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(el => appearOnScroll.observe(el));


    // --- Contact Form Submission (Formspree) ---
    document.getElementById("contact-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const form = e.target;
        const status = document.getElementById("form-status");

        const data = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" }
            });

            if (res.ok) {
                status.textContent = "Message sent successfully!";
                form.reset();
            } else {
                // Try to parse the error message from the response if available
                const errorData = await res.json();
                status.textContent = errorData.error || "Oops! Something went wrong.";
            }
        } catch (error) {
            status.textContent = "Network error. Try again.";
        }
    });

    // --- Footer Year Update ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});