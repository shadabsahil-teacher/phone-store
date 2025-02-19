// Initialize scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Smooth scroll to target
            if (targetElement) {
                if (targetId === '#hero') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Add or remove sticky class to header
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Update active nav link based on scroll position
        if (scrollPosition < 300) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        } else {
            const sections = ['products', 'footer'];
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    if (scrollPosition >= sectionTop - 100 && 
                        scrollPosition < sectionTop + sectionHeight - 100) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                }
            });
        }
    });
});
