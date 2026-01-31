// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage.includes(href.replace('.html', '')))) {
            link.classList.add('active');
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate required fields
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !message) {
                showFormMessage('Будь ласка, заповніть усі обов\'язкові поля', 'error');
                return;
            }

            // Prepare form data
            const formData = new FormData(contactForm);
            
            // Send to API
            fetch('/api/contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showFormMessage('Дякуємо! Ваше повідомлення отримано. Ми зв\'яжемось з вами найближчим часом.', 'success');
                    contactForm.reset();
                } else {
                    showFormMessage(data.message || 'Помилка при відправці форми. Спробуйте ще раз.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormMessage('Помилка при відправці. Спробуйте зв\'язатися з нами по телефону.', 'error');
            });
        });

        function showFormMessage(message, type) {
            if (formMessage) {
                formMessage.textContent = message;
                formMessage.className = 'form-message ' + type;
                formMessage.style.display = 'block';

                // Auto-hide error message after 5 seconds
                if (type === 'error') {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }
        }
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    if (q.nextElementSibling) {
                        q.nextElementSibling.classList.remove('active');
                    }
                }
            });

            // Toggle current item
            this.classList.toggle('active');
            if (answer) {
                answer.classList.toggle('active');
            }
        });
    });

    // Phone button functionality
    const phoneButtons = document.querySelectorAll('.btn-phone');
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('tel:')) {
                // Allow default behavior
                return true;
            }
        });
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    // Close mobile menu if open
                    if (menuToggle && mobileNav) {
                        menuToggle.classList.remove('active');
                        mobileNav.classList.remove('active');
                    }
                    // Smooth scroll
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add visual feedback for phone buttons on mobile
    const mobilePhoneButtons = document.querySelectorAll('.mobile-buttons .btn-icon');
    mobilePhoneButtons.forEach(button => {
        if (button.textContent.trim() === '☎️') {
            button.onclick = function(e) {
                e.preventDefault();
                window.location.href = 'tel:+380937596690';
            };
        } else if (button.textContent.trim() === '✈️') {
            button.onclick = function(e) {
                e.preventDefault();
                window.open('https://t.me/skupkaodessabot', '_blank');
            };
        }
    });
});
