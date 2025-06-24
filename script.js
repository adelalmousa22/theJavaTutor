// Initialize EmailJS with your public key
emailjs.init('zBHukcu__7lKzZjrJ');

// Initialize the website
function initializeWebsite() {
    console.log('Initializing JavaTutor website...');
    
    // Set up smooth scrolling for navigation
    setupNavigation();
    
    // Initialize EmailJS (now enabled)
    initializeEmailJS();
    
    // Set up form submission with email integration
    setupFormSubmission();
    
    // Set up header scroll effect
    setupHeaderEffect();
    
    // Set up CTA buttons
    setupCTAButtons();
    
    console.log('Website initialized successfully!');
}

// Initialize EmailJS
function initializeEmailJS() {
    try {
        // Initialize EmailJS
        // Note: You need to get your own public key from EmailJS
        console.log('EmailJS initialized');
    } catch (error) {
        console.error('Error initializing EmailJS:', error);
    }
}

// Enhanced Navigation setup - works with both data-section and href attributes
function setupNavigation() {
    // Handle nav links with data-section attribute
    const navLinks = document.querySelectorAll('.nav-link, [data-section], a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Try to get section ID from different attributes
            let sectionId = this.getAttribute('data-section') || 
                           this.getAttribute('href')?.replace('#', '') ||
                           this.dataset.section;
            
            // Handle common section names
            if (!sectionId) {
                const linkText = this.textContent.toLowerCase().trim();
                if (linkText.includes('contact') || linkText.includes('form')) {
                    sectionId = 'contact';
                } else if (linkText.includes('learn') || linkText.includes('curriculum')) {
                    sectionId = 'curriculum';
                } else if (linkText.includes('about')) {
                    sectionId = 'about';
                } else if (linkText.includes('home')) {
                    sectionId = 'hero';
                }
            }
            
            console.log('Navigating to section:', sectionId);
            
            if (sectionId) {
                scrollToSection(sectionId);
            }
        });
    });
}

// Enhanced scroll to section function
function scrollToSection(sectionId) {
    // Try different possible section selectors
    let section = document.getElementById(sectionId) ||
                 document.querySelector(`[data-section="${sectionId}"]`) ||
                 document.querySelector(`.${sectionId}`) ||
                 document.querySelector(`section[class*="${sectionId}"]`);
    
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log('Scrolled to section:', sectionId);
    } else {
        console.warn('Section not found:', sectionId);
        // Try common alternatives
        if (sectionId === 'contact') {
            const contactForm = document.querySelector('form') || 
                              document.querySelector('.contact-form') ||
                              document.querySelector('#contactForm');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
}

// CTA buttons setup
function setupCTAButtons() {
    const heroButton = document.getElementById('heroButton');
    const consultButton = document.getElementById('consultButton');
    
    // Also look for common button selectors
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, [data-action="contact"]');
    
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    }
    
    if (consultButton) {
        consultButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    }
    
    // Set up any other CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    });
}

// Enhanced scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact') ||
                          document.querySelector('.contact') ||
                          document.querySelector('form') ||
                          document.querySelector('.contact-form');
    
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log('Scrolled to contact section');
    } else {
        console.warn('Contact section not found');
    }
}

// Enhanced form submission setup
function setupFormSubmission() {
    const form = document.getElementById('contactForm') || 
                document.querySelector('form') ||
                document.querySelector('.contact-form form');
    
    if (!form) {
        console.error('Contact form not found');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]') || 
                     form.querySelector('.submit-btn') ||
                     form.querySelector('#submitBtn');
    
    if (!submitBtn) {
        console.error('Submit button not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Hide any previous error messages
        hideErrorMessage();
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        // Get form data
        const formData = collectFormData(form);
        
        console.log('Form data collected:', formData);
        
        // Send email using EmailJS
        sendEmail(formData, originalText);
    });
}

// Collect form data from any form structure
function collectFormData(form) {
    const formData = {};
    
    // Get common form fields
    const nameField = form.querySelector('input[name="name"], input[name="fullName"], #fullName, #name') ||
                     form.querySelector('input[type="text"]:first-of-type');
    const emailField = form.querySelector('input[name="email"], #email, input[type="email"]');
    const phoneField = form.querySelector('input[name="phone"], #phone, input[type="tel"]');
    const contactMethodField = form.querySelector('select[name="contactMethod"], #contactMethod');
    const messageField = form.querySelector('textarea[name="message"], #message');
    
    if (nameField) formData.name = nameField.value;
    if (emailField) formData.email = emailField.value;
    if (phoneField) formData.phone = phoneField.value;
    if (contactMethodField) formData.contactMethod = contactMethodField.value;
    if (messageField) formData.message = messageField.value;
    
    formData.timestamp = new Date().toLocaleString();
    
    return formData;
}

// Send email using EmailJS (uncomment when you have EmailJS set up)
function sendEmail(formData, originalButtonText) {
    const templateParams = {
        to_email: 'adel.almousa0905@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        contact_method: formData.contactMethod,
        timestamp: formData.timestamp,
        message: `New Java tutoring inquiry from ${formData.name}.
        
Details:
- Name: ${formData.name}  
- Email: ${formData.email}
- Phone: ${formData.phone}
- Preferred Contact Method: ${formData.contactMethod}
- Submitted: ${formData.timestamp}

Please respond to this inquiry as soon as possible.`
    };

    // Replace with your actual EmailJS service ID and template ID
    const serviceID = 'service_6hhmxqn';
    const templateID = 'template_4kt4miw';

    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showSuccessMessage(null, null, originalButtonText);
        })
        .catch(function(error) {
            console.error('Error sending email:', error);
            showErrorMessage(originalButtonText);
        });
}

// Enhanced success message
function showSuccessMessage(form, submitBtn, originalButtonText) {
    // Try to find thank you container or create one
    let thankYou = document.getElementById('thankYou') ||
                  document.querySelector('.thank-you') ||
                  document.querySelector('.success-message');
    
    if (!thankYou) {
        // Create thank you message if it doesn't exist
        thankYou = document.createElement('div');
        thankYou.id = 'thankYou';
        thankYou.style.cssText = `
            display: none;
            background: #d4edda;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #c3e6cb;
            margin: 20px 0;
            text-align: center;
            font-size: 16px;
        `;
        
        if (form) {
            form.parentNode.insertBefore(thankYou, form.nextSibling);
        } else {
            document.body.appendChild(thankYou);
        }
    }
    
    // Set thank you message
    thankYou.innerHTML = `
        <h3 style="color: #155724; margin-bottom: 10px;">Thank You!</h3>
        <p>Your message has been received successfully. I'll get back to you as soon as possible!</p>
        <p style="font-size: 14px; margin-top: 15px; opacity: 0.8;">
            Expected response time: Within 24 hours
        </p>
    `;
    
    // Clear and hide form, show thank you
    if (form) {
        form.reset();
        form.style.display = 'none';
    }
    thankYou.style.display = 'block';
    
    console.log('Thank you message displayed');
    
    // Reset after 8 seconds
    setTimeout(function() {
        thankYou.style.display = 'none';
        if (form) {
            form.style.display = 'block';
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalButtonText || 'Start Learning';
        }
        console.log('Form reset and ready for next submission');
    }, 8000);
}

// Enhanced error message
function showErrorMessage(originalButtonText) {
    let errorMessage = document.getElementById('errorMessage') ||
                      document.querySelector('.error-message');
    
    if (!errorMessage) {
        // Create error message if it doesn't exist
        errorMessage = document.createElement('div');
        errorMessage.id = 'errorMessage';
        errorMessage.style.cssText = `
            display: none;
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #f5c6cb;
            margin: 20px 0;
            text-align: center;
        `;
        
        const form = document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(errorMessage, form);
        }
    }
    
    errorMessage.innerHTML = `
        <strong>Oops!</strong> There was an error sending your message. Please try again or contact me directly.
    `;
    
    const submitBtn = document.querySelector('button[type="submit"]');
    
    // Show error message
    errorMessage.style.display = 'block';
    
    // Reset submit button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalButtonText || 'Start Learning';
    }
    
    // Hide error message after 6 seconds
    setTimeout(function() {
        errorMessage.style.display = 'none';
    }, 6000);
}

// Hide error message
function hideErrorMessage() {
    const errorMessage = document.getElementById('errorMessage') ||
                        document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// Header scroll effect
function setupHeaderEffect() {
    const header = document.getElementById('header') ||
                  document.querySelector('header') ||
                  document.querySelector('.header');
    
    if (!header) {
        console.warn('Header not found for scroll effect');
        return;
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    
    // Additional fallback for navigation
    setTimeout(() => {
        // Set up any missed navigation elements
        const allLinks = document.querySelectorAll('a, button, .clickable');
        allLinks.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes('contact') || text.includes('get started') || text.includes('start learning')) {
                element.addEventListener('click', function(e) {
                    if (!this.hasAttribute('href') || this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        scrollToContact();
                    }
                });
            }
        });
    }, 1000);
});
