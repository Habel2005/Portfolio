document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const sections = document.querySelectorAll('section');
    const interactiveElements = document.querySelectorAll('a, button, .hover-area');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('navMenu');

    // Function to update cursor style
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function updateCursorStyle() {
        let cursorUpdated = false;

        if (isInViewport(header)) {
            cursor.className = 'custom-cursor header-cursor';
            cursorUpdated = true;
        }

        sections.forEach((section) => {
            if (isInViewport(section) && !cursorUpdated) {
                cursor.className = `custom-cursor ${section.className}-cursor`;
                cursorUpdated = true;
            }
        });

        if (isInViewport(footer) && !cursorUpdated) {
            cursor.className = 'custom-cursor footer-cursor';
            cursorUpdated = true;
        }

        if (!cursorUpdated) {
            cursor.className = 'custom-cursor';
        }
    }

    // Function to handle menu icon click
    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuIcon.classList.toggle('hidden');
    });

    // Handle clicks outside of the menu
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('hidden');
        }
    });

    // Handle custom cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Handle interactive elements
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hidden'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hidden'));
    });

    // Update cursor style on scroll and resize
    window.addEventListener('scroll', updateCursorStyle);
    window.addEventListener('resize', updateCursorStyle);

    updateCursorStyle(); // Initial cursor style update
});

// loader
document.body.classList.add("loading");
const loader = document.querySelector('.loader')
const home = document.querySelector('#home')
const about = document.querySelector('#about')
const showcase = document.querySelector('#showcase')
const service = document.querySelector('#services')
const insight = document.querySelector('#insights')

window.addEventListener('load', () => {
    loader.classList.add('hidden')
    home.classList.add('shown')
    about.classList.add('shown')
    showcase.classList.add('shown')
    service.classList.add('shown')
    insight.classList.add('shown')
    document.body.classList.remove("loading");
})

//button effect
const view_button = document.querySelector('.view-services-btn');
const button_text = document.querySelector('.view-services-btn .text');

// Mouse move
const activate_button = (event) => {
    let boundBox = view_button.getBoundingClientRect();
    const button_strength = 40;
    const text_strength = 80;

    const newX = ((event.clientX - boundBox.left) / view_button.offsetWidth) - 0.5;
    const newY = ((event.clientY - boundBox.top) / view_button.offsetHeight) - 0.5;


    // Applying new positions to button
    gsap.to(view_button, {
        duration: 1,
        x: newX * button_strength,
        y: newY * button_strength,
        ease: Power4.easeOut
    });

    // Applying new positions to text 
    gsap.to(button_text, {
        duration: 1,
        x: newX * text_strength,
        y: newY * text_strength,
        ease: Power4.easeOut
    });
}

// Mouse leave
const reset_button = (event) => {
    gsap.to(view_button, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    });
    gsap.to(button_text, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    });
}

view_button.addEventListener('mousemove', activate_button);
view_button.addEventListener('mouseleave', reset_button);


// const viewButton = document.querySelector('.view-services-btn');
// const hoverEffect = viewButton.querySelector('.hover-effect');

// viewButton.addEventListener('mouseenter', (e) => {
//     const rect = viewButton.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     hoverEffect.style.left = `${x}px`;
//     hoverEffect.style.top = `${y}px`;

//     const size = Math.max(viewButton.offsetWidth, viewButton.offsetHeight) * 2;
//     hoverEffect.style.width = `${size}px`;
//     hoverEffect.style.height = `${size}px`;
// });

// viewButton.addEventListener('mouseleave', () => {
//     hoverEffect.style.width = '0';
//     hoverEffect.style.height = '0';
// });

//contact form -->

// Get the contact lightbox
const contactLightbox = document.getElementById('contact-lightbox');

// Get the button that opens the contact lightbox
const contactBtn = document.querySelector('nav a[href="#contact-lightbox"]');

// Get the <span> element that closes the contact lightbox
const contactSpan = document.querySelector('.contact-close');

// When the user clicks on the button, open the contact lightbox
contactBtn.onclick = function(e) {
    e.preventDefault();
    contactLightbox.style.display = 'block';
}

// When the user clicks on <span> (x), close the contact lightbox
contactSpan.onclick = function() {
    contactLightbox.style.display = 'none';
}

// When the user clicks anywhere outside of the contact lightbox, close it
window.onclick = function(event) {
    if (event.target == contactLightbox) {
        contactLightbox.style.display = 'none';
    }
}

const contactForm = document.getElementById('contact-form');
const clearFormBtn = document.getElementById('clear-form');

// Function to clear all form fields
function clearForm() {
    contactForm.reset();
}

// Clear button event listener
clearFormBtn.addEventListener('click', clearForm);

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Convert form data to an object to check field names
    const dataObject = {};
    formData.forEach((value, key) => {
        dataObject[key] = value;
    });
    console.log('Form data object:', dataObject);

    // Send form data to the server
    fetch('https://habel.freewebhostmost.com/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObject)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Thank you for your message! We will get back to you soon.');
            clearForm();
            contactLightbox.style.display = 'none';
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});

// lenis
const lenis = new Lenis()

lenis.on('scroll', (e) => {
    console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

//Showcase image parallax
gsap.fromTo(
    ".showcase-image img",
    { xPercent: 30 },  
    {
      xPercent: 0,  
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".showcase",
        start: "top bottom",  
        end: "bottom 95%",  
        scrub: true,  
        once: true,  
      }
    }
  );
  
//service card
document.querySelectorAll('.lightbox-trigger').forEach(item => {
    item.addEventListener('click', event => {
        const lightbox = document.getElementById('lightbox');
        const lightboxDesc = document.getElementById('lightbox-desc');
        const lightboxAdditionalContent = document.getElementById('lightbox-additional-content');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxGallery = document.getElementById('lightbox-gallery');
        document.body.classList.add("loading");

        // Clear previous gallery images
        lightboxGallery.innerHTML = '';

        // Get data attributes
        const desc = item.getAttribute('data-desc');
        const additional = item.getAttribute('data-additional');
        const imgSrc = item.getAttribute('data-img');
        const gallery = JSON.parse(item.getAttribute('data-gallery'));

        // Set main image and content
        lightboxImage.src = imgSrc;
        lightboxDesc.innerHTML = desc;
        lightboxAdditionalContent.innerHTML = additional;

        // Add gallery images
        gallery.forEach((img, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.alt = `Gallery image ${index + 1}`;
            imgElement.addEventListener('click', () => {
                lightboxImage.src = img;
            });
            lightboxGallery.appendChild(imgElement);
        });

        // Display the lightbox
        lightbox.style.display = 'flex';
    });
});

// Close lightbox
document.querySelector('.lightbox .close').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
    document.body.classList.remove("loading");
});

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable);

// Animate section title and subtitle
gsap.from(".section-title, .section-subtitle", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#insights",
        start: "top 80%",
    }
});

// Create stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // Add blink class to some stars
        if (Math.random() < 0.5) {
            star.classList.add('blink');
        }

        starsContainer.appendChild(star);
    }
    document.querySelector('.personal-insights').prepend(starsContainer);
}

// Animate rocket
function animateRocket() {
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    document.querySelector('.personal-insights').appendChild(rocket);

    const randomizePath = (reverse = false) => {
        // Path that covers the entire viewport with alternating directions
        const path = reverse
            ? [
                  { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
                  { x: window.innerWidth, y: 0 },
                  { x: 0, y: Math.random() * window.innerHeight }
              ]
            : [
                  { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
                  { x: 0, y: 0 },
                  { x: window.innerWidth, y: Math.random() * window.innerHeight }
              ];
        return path;
    };

    const animate = (reverse = false) => {
        gsap.to(rocket, {
            motionPath: {
                path: randomizePath(reverse),
                curviness: 1.5
            },
            duration: 20,
            ease: "power1.inOut",
            onComplete: () => animate(!reverse) // Switch direction after each path completes
        });
    };
    animate();
}

// Animate insight cards
function animateInsightCards() {
    gsap.from(".insight-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".insights-grid",
            start: "top 80%"
        }
    });

    // Floating animation
    gsap.to(".insight-card", {
        y: "10px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.1
    });
}

// Animate quote
function animateQuote() {
    const quoteText = document.querySelector(".quote-text").textContent;
    const quoteElement = document.querySelector(".quote-text");
    quoteElement.textContent = "";

    gsap.to(quoteElement, {
        duration: 4,
        text: {
            value: quoteText,
            delimiter: ""
        },
        ease: "none",
        scrollTrigger: {
            trigger: ".quote-container",
            start: "top 80%"
        }
    });

    // Pulsing animation
    gsap.to(".quote-container", {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
}

// Add hover animations to insight cards
gsap.utils.toArray(".insight-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.4,
            ease: "power1.inOut"
        });
        gsap.to(card.querySelector('i'), {
            scale: 1.2,
            color: "#f39c12",
            duration: 0.4,
            ease: "power1.inOut"
        });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.4,
            ease: "power1.inOut"
        });
        gsap.to(card.querySelector('i'), {
            scale: 1,
            color: "#3498db",
            duration: 0.4,
            ease: "power1.inOut"
        });
    });
});

function animateTimeline() {

    // Animate the title
    gsap.from(".journey-timeline h3", {
        opacity: 0,
        y: -50,
        duration: 1,
        scrollTrigger: {
            trigger: ".journey-timeline",
            start: "top 80%",
        }
    });

    // Animate the central line
    gsap.to(".timeline-line", {
        scaleY: 1, 
        duration: 10,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".journey-timeline",
            start: "top 100%",
        }
    });

    // Animate and make timeline items draggable
    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: index % 2 === 0 ? 50 : -50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
            }
        });

        let momentum = { x: 0, y: 0 };
        let lastX, lastY;

        Draggable.create(item, {
            type: "x,y",
            bounds: ".timeline-container",
            inertia: true,
            onDragStart: function() {
                gsap.to(this.target, {duration: 0.2, scale: 1.1, boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"});
                lastX = this.x;
                lastY = this.y;
            },
            onDrag: function() {
                momentum.x = this.x - lastX;
                momentum.y = this.y - lastY;
                lastX = this.x;
                lastY = this.y;
            },
            onDragEnd: function() {
                gsap.to(this.target, {duration: 0.2, scale: 1, boxShadow: "none"});
                
                // Apply momentum with bounce
                gsap.to(this.target, {
                    duration: 5,
                    x: `+=${momentum.x * 50}`,
                    y: `+=${momentum.y * 50}`,
                    ease: "power1.out",
                    onUpdate: () => {
                        const bounds = this.target.getBoundingClientRect();
                        const containerBounds = document.querySelector(".timeline-container").getBoundingClientRect();
                        
                        if (bounds.left < containerBounds.left || bounds.right > containerBounds.right) {
                            momentum.x *= -0.8; // Reverse direction and reduce momentum
                        }
                        if (bounds.top < containerBounds.top || bounds.bottom > containerBounds.bottom) {
                            momentum.y *= -0.8; // Reverse direction and reduce momentum
                        }
                    }
                });
            }
        });
    });
}

//  animated quote
gsap.utils.toArray(".quote-container").forEach(container => {
    const text = container.querySelector(".quote-text");

    container.addEventListener("mouseenter", () => {
        gsap.to(text, {
            scale: 1.2,
            duration: 0.8,
            ease: "slow"
        });
    });

    container.addEventListener("mouseleave", () => {
        gsap.to(text, {
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

//fadeup and sideways of titles

// Animate elements with fade-up effect
gsap.from(".animate-fade-up", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".animate-fade-up",
        start: "top 90%",
    }
});

// Animate elements with zoom-in effect
gsap.from(".animate-zoom-in", {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    scrollTrigger: {
        trigger: ".animate-zoom-in",
        start: "top 80%",
    }
});

// Initialize animations
function init() {
    createStars();
    animateRocket();
    animateInsightCards();
    animateQuote();
    animateTimeline();
}

// Run animations when the page is loaded
window.addEventListener('load', init);
