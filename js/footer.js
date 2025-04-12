// Load the footer component
document.addEventListener('DOMContentLoaded', function() {
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            
            // Initialize footer functionality after insertion
            initializeFooter();
        })
        .catch(error => console.error('Error loading footer:', error));
});

function initializeFooter() {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Handle newsletter form submission
    document.getElementById('newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        const statusDiv = document.querySelector('.form-status');
        
        // Simulate form submission
        statusDiv.innerHTML = '<div class="success-message">Thank you for subscribing!</div>';
        this.reset();
        
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 3000);
    });

    // Add hover effect for social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            const tooltip = this.querySelector('.social-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }
        });
    
        link.addEventListener('mouseleave', function () {
            const tooltip = this.querySelector('.social-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
            }
        });
    });
    
} 