document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Hide mobile menu after clicking a link
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
        }
    });

    // Add animation to menu items when they come into view
    const menuItems = document.querySelectorAll('.menu-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    // Get the button and the menu category selector div
    const categoryToggleBtn = document.getElementById('menu-category-toggle');
    const categorySelectorDiv = document.getElementById('menu-category-selector');

    // Add click event listener to the toggle button
    categoryToggleBtn.addEventListener('click', function() {
        // Toggle the display of the category selector div
        if (categorySelectorDiv.style.display === 'flex') {
            categorySelectorDiv.style.display = 'none';
        } else {
            categorySelectorDiv.style.display = 'flex'; // Use flex to maintain column layout
        }
    });

    // Add click event listeners to the category links in the popup
    document.querySelectorAll('#menu-category-selector a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            
            const targetId = this.getAttribute('href');
            // Escape spaces in the targetId for use in querySelector
            const escapedTargetId = targetId.replace(/ /g, '\\ ');
            
            const targetElement = document.querySelector(escapedTargetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Hide the popup after scrolling
                categorySelectorDiv.style.display = 'none';
            }
        });
    });
});
