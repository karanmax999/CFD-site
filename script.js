document.addEventListener("DOMContentLoaded", () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const nav = document.querySelector(".navbar");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active"); // Animating hamburger on click
    });

    // Close navbar when clicking outside of it
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active"); // Close the hamburger as well
        }
    });

    // FAQ Slider Navigation
    let index = 0;
    const totalSlides = 4; // Total number of slides

    function moveSlide(direction) {
        const container = document.querySelector('.faq-container');
        index += direction;

        if (index < 0) index = totalSlides - 1; // Wrap to last slide
        if (index >= totalSlides) index = 0; // Wrap to first slide

        container.style.transform = `translateX(-${index * 100}%)`;
        animateSlideChange(direction); // Add slide change animation
    }

    // Attach the function to the prev and next buttons
    document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
    document.querySelector(".next").addEventListener("click", () => moveSlide(1));

    // Animate the slide transition
    function animateSlideChange(direction) {
        const slide = document.querySelector(".faq-slide");
        slide.style.transition = "transform 0.5s ease-in-out";
        slide.classList.add(direction === 1 ? "slide-in-right" : "slide-in-left");
        
        setTimeout(() => {
            slide.classList.remove(direction === 1 ? "slide-in-right" : "slide-in-left");
        }, 500);
    }

    // Form Validation & Submission
    const contactForm = document.querySelector(".contact-form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission for validation
        
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        // Validate form inputs
        if (name === "") {
            showFeedback("Please enter your name.");
            return;
        }

        if (!validateEmail(email)) {
            showFeedback("Please enter a valid email address.");
            return;
        }

        if (message.length < 10) {
            showFeedback("Message should be at least 10 characters long.");
            return;
        }

        // Show success feedback
        showFeedback("Your message has been sent successfully!", true);
        this.reset(); // Clear the form after successful submission
    });

    // Email validation function
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Show feedback messages to the user
    function showFeedback(message, isSuccess = false) {
        const feedback = document.createElement("div");
        feedback.classList.add("feedback-message");
        feedback.style.backgroundColor = isSuccess ? "#28a745" : "#dc3545"; // Green for success, red for error
        feedback.textContent = message;
        document.body.appendChild(feedback);

        // Animate feedback
        setTimeout(() => {
            feedback.style.opacity = "0";
            feedback.style.transform = "translateY(-20px)";
        }, 3000);

        // Remove feedback after animation
        setTimeout(() => {
            feedback.remove();
        }, 3500);
    }
    
    // Smooth Scroll effect for anchor links (optional but sleek)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 100, // Adjust the offset for top padding
                behavior: "smooth"
            });
        });
    });

    // Advanced Hover Effect for Hamburger Icon
    document.querySelector(".hamburger").addEventListener("mouseenter", () => {
        hamburger.style.transform = "rotate(90deg)"; // Rotate when hovered
    });

    document.querySelector(".hamburger").addEventListener("mouseleave", () => {
        hamburger.style.transform = "rotate(0deg)"; // Reset rotation
    });
});

