// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;
let scrollPosition = 0;

mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (!body.classList.contains('menu-open')) {
        scrollPosition = window.pageYOffset;
        body.classList.add('menu-open');
        body.style.top = `-${scrollPosition}px`;
    } else {
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && body.classList.contains('menu-open')) {
        mobileMenuButton.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuButton.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    });
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    }

    .menu-icon {
        display: block;
        width: 25px;
        height: 2px;
        background-color: var(--text-color);
        position: relative;
        transition: background-color 0.3s;
    }

    .menu-icon::before,
    .menu-icon::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: var(--text-color);
        transition: transform 0.3s;
    }

    .menu-icon::before {
        transform: translateY(-8px);
    }

    .menu-icon::after {
        transform: translateY(8px);
    }

    .mobile-menu-button.active .menu-icon {
        background-color: transparent;
    }

    .mobile-menu-button.active .menu-icon::before {
        transform: translateY(0) rotate(45deg);
    }

    .mobile-menu-button.active .menu-icon::after {
        transform: translateY(0) rotate(-45deg);
    }

    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }

        .nav-menu {
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: var(--white);
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .nav-menu.active {
            transform: translateY(0);
            display: flex;
        }
    }

    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in-section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-down {
        transform: translateY(-100%);
    }

    .scroll-up {
        transform: translateY(0);
    }

    .header {
        transition: transform 0.3s ease-in-out;
    }
`;

document.head.appendChild(style);

// Product image lazy loading
document.querySelectorAll('.product-image').forEach(img => {
    img.loading = 'lazy';
});

// Product Gallery Image Change Function
function changeImage(src, thumbnail) {
    document.getElementById('main-product-image').src = src;
    
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
}

// Color Selection
document.querySelectorAll('.color-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Add active class to clicked button
        button.classList.add('active');
    });
});

// Specification Points Interaction
document.addEventListener('DOMContentLoaded', () => {
    const highlightPoints = document.querySelectorAll('.highlight-point');
    const specsImage = document.querySelector('.specs-image');
    let activePoint = null;

    highlightPoints.forEach(point => {
        point.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // If clicking the same point that's active, deactivate it
            if (point === activePoint) {
                point.classList.remove('zoomed');
                specsImage.classList.remove('dimmed');
                activePoint = null;
                return;
            }

            // Deactivate previous point if exists
            if (activePoint) {
                activePoint.classList.remove('zoomed');
            }

            // Activate clicked point
            point.classList.add('zoomed');
            specsImage.classList.add('dimmed');
            activePoint = point;
        });
    });

    // Close zoom when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.highlight-point') && activePoint) {
            activePoint.classList.remove('zoomed');
            specsImage.classList.remove('dimmed');
            activePoint = null;
        }
    });

    // Specification Tabs
    const specTabs = document.querySelectorAll('.spec-tab');
    const specGroups = document.querySelectorAll('.specs-group');

    specTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetGroup = tab.getAttribute('data-spec');

            // Update active tab
            specTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding group
            specGroups.forEach(group => {
                if (group.getAttribute('data-group') === targetGroup) {
                    group.classList.remove('hidden');
                } else {
                    group.classList.add('hidden');
                }
            });
        });
    });
});

// Specifications Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const dimensionsRadio = document.getElementById('dimensions');
    const technologyRadio = document.getElementById('technology');
    const dimensionsContent = document.querySelector('.dimensions-tab');
    const technologyContent = document.querySelector('.technology-tab');
    
    if (dimensionsRadio && technologyRadio && dimensionsContent && technologyContent) {
        // Set initial state
        if (dimensionsRadio.checked) {
            dimensionsContent.style.display = 'flex';
            technologyContent.style.display = 'none';
        } else if (technologyRadio.checked) {
            dimensionsContent.style.display = 'none';
            technologyContent.style.display = 'flex';
        }
        
        // Add event listeners
        dimensionsRadio.addEventListener('change', () => {
            if (dimensionsRadio.checked) {
                dimensionsContent.style.display = 'flex';
                technologyContent.style.display = 'none';
            }
        });
        
        technologyRadio.addEventListener('change', () => {
            if (technologyRadio.checked) {
                dimensionsContent.style.display = 'none';
                technologyContent.style.display = 'flex';
            }
        });
    }
});

// Mouse movement effect for risk cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.risk-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
            const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}); 