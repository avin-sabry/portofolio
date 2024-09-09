// Main JS file for all features
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentYear = document.getElementById('current-year');
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.getElementById('nav-list');

    // Set the current year
    currentYear.textContent = new Date().getFullYear();

    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Menu toggle for mobile
    menuIcon.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
    // Close the menu when a navigation link is clicked
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navList.classList.remove('show');
        }
    });

    // Close the menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuIcon.contains(e.target) && !navList.contains(e.target)) {
            navList.classList.remove('show');
        }
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        bar.style.width = bar.getAttribute('data-progress');
    });

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                const category = project.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Testimonial carousel functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-navigation .prev');
    const nextButton = document.querySelector('.testimonial-navigation .next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });

    // Automatically cycle through slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    }, 5000); // Adjust the interval time as needed

    showSlide(currentSlide);

    // Scroll reveal animations
    const sr = {
        origin: 'bottom',
        distance: '50px',
        duration: 2000,
        delay: 200,
        reset: true,
        reveal: (selector, config) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = `translateY(${config.distance})`;
                setTimeout(() => {
                    element.style.transition = `opacity ${config.duration}ms ease, transform ${config.duration}ms ease`;
                    element.style.opacity = 1;
                    element.style.transform = 'translateY(0)';
                }, config.delay);
            });
        }
    };

    sr.reveal('#about, #portfolio, #testimonials, #blog, #contact', {
        distance: sr.distance,
        duration: sr.duration,
        delay: sr.delay,
    });

    // Smooth scrolling
    const links = document.querySelectorAll('nav ul li a, #back-to-top');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Dark Mode Toggle (remains the same)
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = `<span class="toggle-icon">&#9728;</span>`; // Sun icon for light mode
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = `<span class="toggle-icon">&#9790;</span>`; // Moon icon for dark mode
    }
});

// Set initial icon based on mode (remains the same)
if (body.classList.contains('dark-mode')) {
    darkModeToggle.innerHTML = `<span class="toggle-icon">&#9728;</span>`;
} else {
    darkModeToggle.innerHTML = `<span class="toggle-icon">&#9790;</span>`;
}
