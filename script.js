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
const loader=document.querySelector('.loader')
const home=document.querySelector('#home')
const about=document.querySelector('#about')
const service=document.querySelector('#services')
const insight=document.querySelector('#insights')

window.addEventListener('load', ()=>{
    loader.classList.add('hidden')
    home.classList.add('shown')
    about.classList.add('shown')
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

// lenis
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

//service card
document.querySelectorAll('.lightbox-trigger').forEach(item => {
    item.addEventListener('click', event => {
        const lightbox = document.getElementById('lightbox');
        const lightboxDesc = document.getElementById('lightbox-desc');
        const lightboxAdditionalContent = document.getElementById('lightbox-additional-content');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxGallery = document.getElementById('lightbox-gallery');

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
});

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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
        if (Math.random() < 0.3) {  // Adjust the probability as needed
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

    gsap.to(rocket, {
        motionPath: {
            path: [
                {x: 0, y: 0},
                {x: window.innerWidth, y: -100},
                {x: 0, y: window.innerHeight}
            ],
            curviness: 1.5
        },
        duration: 15,
        repeat: -1,
        ease: "power1.inOut"
    });
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

// Animate timeline
gsap.from(".timeline-item", {
    opacity: 0,
    x: (index) => index % 2 === 0 ? 50 : -50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".journey-timeline",
        start: "top 80%",
    }
});



//  animated quote
gsap.utils.toArray(".quote-container").forEach(container => {
    const text = container.querySelector(".quote-text");

    container.addEventListener("mouseenter", () => {
        gsap.to(text, {
            scale: 1.2,
            duration: 0.4,
            ease: "circ.out"
        });
    });

    container.addEventListener("mouseleave", () => {
        gsap.to(text, {
            scale: 1,
            duration: 0.4,
            ease: "circ.out"
        });
    });
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
        starsContainer.appendChild(star);
    }
    document.querySelector('.personal-insights').prepend(starsContainer);
}
// Animate rocket
function animateRocket() {
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    document.querySelector('.personal-insights').appendChild(rocket);

    gsap.to(rocket, {
        motionPath: {
            path: [
                {x: 0, y: 0},
                {x: window.innerWidth, y: -100},
                {x: 0, y: window.innerHeight}
            ],
            curviness: 1.5
        },
        duration: 15,
        repeat: -1,
        ease: "power1.inOut"
    });
}

//fadeup and sideways of titles

// Animate elements with fade-up effect
gsap.from(".animate-fade-up", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.3,
    scrollTrigger: {
        trigger: ".animate-fade-up",
        start: "top 80%",
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