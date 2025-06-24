// Initialize EmailJS with your public key
// You'll need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
emailjs.init('YOUR_PUBLIC_KEY');

// Initialize the website
function initializeWebsite() {
    console.log('Initializing JavaTutor website...');
    
    // Set up smooth scrolling for navigation
    setupNavigation();
    
    // Initialize EmailJS
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

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                const offsetTop = section.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// CTA buttons setup
function setupCTAButtons() {
    const heroButton = document.getElementById('heroButton');
    const consultButton = document.getElementById('consultButton');
    
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            scrollToContact();
        });
    }
    
    if (consultButton) {
        consultButton.addEventListener('click', function() {
            scrollToContact();
        });
    }
}

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Form submission setup with email integration
function setupFormSubmission() {
    const form = document.getElementById('contactForm');
    const formContainer = document.getElementById('formContainer');
    const thankYou = document.getElementById('thankYou');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!form || !formContainer || !thankYou || !submitBtn) {
        console.error('Form elements not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Hide any previous error messages
        errorMessage.style.display = 'none';
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            contactMethod: document.getElementById('contactMethod').value,
            timestamp: new Date().toLocaleString()
        };
        
        console.log('Form data collected:', formData);
        
        // Send email using EmailJS
        sendEmail(formData);
    });
}

// Send email using EmailJS
function sendEmail(formData) {
    // EmailJS service parameters
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

    // Note: You need to replace these with your actual EmailJS service ID and template ID
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';

    // Send the email
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showSuccessMessage();
        })
        .catch(function(error) {
            console.error('Error sending email:', error);
            showErrorMessage();
        });
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    const formContainer = document.getElementById('formContainer');
    const thankYou = document.getElementById('thankYou');
    const submitBtn = document.getElementById('submitBtn');
    
    // Clear form
    form.reset();
    
    // Hide form and show thank you message
    formContainer.style.display = 'none';
    thankYou.style.display = 'block';
    
    console.log('Thank you message displayed');
    
    // Reset after 10 seconds
    setTimeout(function() {
        thankYou.style.display = 'none';
        formContainer.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Start Learning';
        console.log('Form reset and ready for next submission');
    }, 10000);
}

// Show error message
function showErrorMessage() {
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // Show error message
    errorMessage.style.display = 'block';
    
    // Reset submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Start Learning';
    
    // Hide error message after 8 seconds
    setTimeout(function() {
        errorMessage.style.display = 'none';
    }, 8000);
}

// Header scroll effect
function setupHeaderEffect() {
    const header = document.getElementById('header');
    
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
});
