document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initBackToTop();
    initTestimonialSlider();
    initFaqAccordion();
    initGalleryFilter();
    initGalleryModal();
    initSmoothScrolling();
    initContactForm();
  });
  
  // Mobile Menu
  function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.header');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        header.classList.toggle('mobile-nav-active');
        
        // Toggle menu icon (hamburgerto X)
        const spans = this.querySelectorAll('span');
        if (header.classList.contains('mobile-nav-active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
        }
      });
      
      // Close mobile menu when clicking on a menu item
      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (header.classList.contains('mobile-nav-active')) {
            header.classList.remove('mobile-nav-active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
              span.style.transform = 'none';
              span.style.opacity = '1';
            });
          }
        });
      });
    }
  }
  
  // Back to Top Button
  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('active');
        } else {
          backToTopBtn.classList.remove('active');
        }
      });
      
      backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  // Testimonial Slider
  function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialCards.length > 0 && dots.length > 0) {
      let currentIndex = 0;
      
      // Hide all testimonials except the first one
      testimonialCards.forEach((card, index) => {
        if (index !== 0) {
          card.style.display = 'none';
        }
      });
      
      // Update active dot
      function updateDots() {
        dots.forEach((dot, index) => {
          if (index === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      // Show testimonial by index
      function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
          if (i === index) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
        
        currentIndex = index;
        updateDots();
      }
      
      // Next testimonial
      function nextTestimonial() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonialCards.length) {
          nextIndex = 0;
        }
        showTestimonial(nextIndex);
      }
      
      // Previous testimonial
      function prevTestimonial() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
          prevIndex = testimonialCards.length - 1;
        }
        showTestimonial(prevIndex);
      }
      
      // Add event listeners to dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showTestimonial(index);
        });
      });
      
      // Add event listeners to prev/next buttons
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
      }
      
      // Auto-rotate testimonials
      let interval = setInterval(nextTestimonial, 6000);
      
      // Pause auto-rotation on hover
      const testimonialSlider = document.querySelector('.testimonials-slider');
      if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
          clearInterval(interval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
          interval = setInterval(nextTestimonial, 6000);
        });
      }
    }
  }
  
  // FAQ Accordion
  function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
      faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
          const answer = this.nextElementSibling;
          const isActive = this.classList.contains('active');
          
          // Close all FAQ items
          faqQuestions.forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
          });
          
          // Open clicked FAQ item if it was not active
          if (!isActive) {
            this.classList.add('active');
            answer.classList.add('active');
          }
        });
      });
    }
  }
  
  // Gallery Filter
  function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          // Filter gallery items
          galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }
  }
  
  // Gallery Modal
  function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const zoomBtns = document.querySelectorAll('.gallery-zoom-btn');
    
    if (modal && modalImage && zoomBtns.length > 0) {
      zoomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const imageSrc = this.getAttribute('data-image');
          const caption = this.parentElement.querySelector('h3').textContent;
          
          modalImage.src = imageSrc;
          modalCaption.textContent = caption;
          modal.style.display = 'block';
          
          // Prevent page scrolling when modal is open
          document.body.style.overflow = 'hidden';
        });
      });
      
      // Close modal when clicking on X
      if (modalClose) {
        modalClose.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
      }
      
      // Close modal when clicking outside the image
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
      
      // Close modal on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }
  }
  
  // Smooth Scrolling for Anchor Links
  function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Contact Form Validation and Submission
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        if (!name.value.trim()) {
          isValid = false;
          showError(name, 'Please enter your name');
        } else {
          removeError(name);
        }
        
        if (!email.value.trim()) {
          isValid = false;
          showError(email, 'Please enter your email');
        } else if (!isValidEmail(email.value)) {
          isValid = false;
          showError(email, 'Please enter a valid email address');
        } else {
          removeError(email);
        }
        
        if (!subject.value.trim()) {
          isValid = false;
          showError(subject, 'Please enter a subject');
        } else {
          removeError(subject);
        }
        
        if (!message.value.trim()) {
          isValid = false;
          showError(message, 'Please enter your message');
        } else {
          removeError(message);
        }
        
        if (isValid) {
          // In a real implementation, you would send the form data to a server
          // For this demo, we'll simulate a successful form submission
          contactForm.innerHTML = `
            <div class="form-success">
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
            </div>
          `;
          
          // Style the success message
          const formSuccess = document.querySelector('.form-success');
          formSuccess.style.textAlign = 'center';
          formSuccess.style.padding = '2rem';
          
          const formSuccessHeading = formSuccess.querySelector('h3');
          formSuccessHeading.style.color = 'var(--success)';
          formSuccessHeading.style.marginBottom = '1rem';
          
          // In a real implementation, you would submit the form data to a server
          // contactForm.submit();
        }
      });
      
      // Validate email format
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      
      // Show error message
      function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
          errorElement = document.createElement('span');
          errorElement.className = 'error-message';
          formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error)';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.display = 'block';
        
        input.style.borderColor = 'var(--error)';
      }
      
      // Remove error message
      function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
          errorElement.remove();
        }
        
        input.style.borderColor = '';
      }
    }
  }
