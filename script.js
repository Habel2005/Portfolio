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

    //handle hovering of menuicon
    menuIcon.addEventListener('mouseenter', () => {
        menuIcon.classList.add('hover');
    });


    menuIcon.addEventListener('mouseleave', () => {
        menuIcon.classList.remove('hover');
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
const service = document.querySelector('#creative-universe-portfolio')
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
//hero "hello" animation

document.addEventListener('DOMContentLoaded', (event) => {
    const helloText = document.querySelector('.hero h3');

    helloText.addEventListener('mouseenter', () => {
        if (!helloText.classList.contains('wiggling')) {
            helloText.classList.add('wiggling');
        }
    });

    helloText.addEventListener('animationend', () => {
        helloText.classList.remove('wiggling');
    });
});
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
contactBtn.onclick = function (e) {
    e.preventDefault();
    contactLightbox.style.display = 'block';
}

// When the user clicks on <span> (x), close the contact lightbox
contactSpan.onclick = function () {
    contactLightbox.style.display = 'none';
}

// When the user clicks anywhere outside of the contact lightbox, close it
window.onclick = function (event) {
    if (event.target == contactLightbox) {
        contactLightbox.style.display = 'none';
    }
}

const contactForm = document.getElementById('contact-form');
const clearFormBtn = document.getElementById('clear-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Function to clear all form fields
function clearForm() {
    contactForm.reset();
}

// Clear button event listener
clearFormBtn.addEventListener('click', clearForm);

// Handle form submission
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Convert form data to an object to check field names
    const dataObject = {};
    formData.forEach((value, key) => {
        dataObject[key] = value;
    });

    // Show loader and disable the submit button
    loader.classList.remove('hidden');
    submitButton.disabled = true;

    // Send form data to the server
    fetch('https://portfolio-r2xj.onrender.com/send-email', {
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
        })
        .finally(() => {
            // Hide loader and enable the submit button
            loader.classList.add('hidden');
            submitButton.disabled = false;
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
        })
        .finally(() => {
            // Hide loader and enable the submit button
            loader.classList.add('hidden');
            submitButton.disabled = false;
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
// Project Data
const projects = [
    {
        title: "LearnQuest",
        description: "A micro-learning platform that curates personalized educational content using APIs like YouTube, Gemini, and GitHub. Users can explore bite-sized lessons, participate in challenges, and track their learning progress through a simple, intuitive interface.",
        techStack: ["Flutter", "Firebase", "Python Backend", "Gemini API", "YouTube API", "Web Scraping"],
        link: "project.html?project=learnquest"
    },
    {
        title: "Chat Connect",
        description: "A real-time chat application built to facilitate seamless communication with features like instant messaging, typing indicators, and message status updates. It focuses on minimal UI and efficient message handling, ensuring low latency and reliability.",
        techStack: ["Flutter", "Firebase", "Cloud Firestore", "Authentication", "Push Notifications"],
        link: "project.html?project=chatApp"
    },
    {
        title: "Student-Teacher Portal",
        description: "An academic management app designed to streamline communication and task handling between students and teachers. It includes features like assignment tracking, attendance management, announcements, and personal feedback systems.",
        techStack: ["Flutter", "Firebase", "Cloud Functions", "Firestore", "Role-based Access Control"],
        link: "project.html?project=acdemics"
    }
];

let currentProjectIndex = 0;
const projectContentDiv = document.getElementById('projectContent'); // The planet visual
const textDetailsContainer = document.getElementById('textDetailsContainer'); // New container for text
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const projectTechStack = document.getElementById('projectTechStack');
const projectLinkBtn = document.getElementById('projectLinkBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const miniMapSVG = document.getElementById('miniMapSVG');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeMessageBoxBtn = document.getElementById('closeMessageBox');
const innerViewscreen = document.querySelector('.inner-viewscreen');
const hudGridWrapper = document.querySelector('.hud-grid-wrapper');
const mainContentArea = document.querySelector('.hud-panel-main-content-area');

// HUD elements for dynamic updates
const hudClock = document.getElementById('hudClock');
const hudTarget = document.getElementById('hudTarget');
const sensorTemp = document.getElementById('sensorTemp');
const sensorHum = document.getElementById('sensorHum');
const sensorPres = document.getElementById('sensorPres');
const cpuProgressBar = document.getElementById('cpuProgressBar');
const commSignal = document.getElementById('commSignal');
const commLatency = document.getElementById('commLatency');
const logEntry1 = document.getElementById('logEntry1');
const logEntry2 = document.getElementById('logEntry2');
const logEntry3 = document.getElementById('logEntry3');
const powerMain = document.getElementById('powerMain');
const powerAux = document.getElementById('powerAux');
const scaleIndicator = document.getElementById('scaleIndicator'); // New scale indicator


// Three.js Variables
let scene, camera, renderer, stars, starGeo, starMaterial;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let animationFrameId;

// Global variables to store planet dimensions for animations
let currentPlanetDiameter;

// Function to initialize Three.js
function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, innerViewscreen.clientWidth / innerViewscreen.clientHeight, 1, 1000);
    camera.position.z = 5;

    const canvas = document.getElementById('spaceCanvas');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(innerViewscreen.clientWidth, innerViewscreen.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    starGeo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 15000; i++) {
        const x = Math.random() * 800 - 400;
        const y = Math.random() * 800 - 400;
        const z = Math.random() * 800 - 400;
        vertices.push(x, y, z);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const starTextureCanvas = document.createElement('canvas');
    starTextureCanvas.width = 16;
    starTextureCanvas.height = 16;
    const context = starTextureCanvas.getContext('2d');
    context.beginPath();
    context.arc(8, 8, 8, 0, Math.PI * 2, false);
    context.fillStyle = 'white';
    context.fill();
    const starTexture = new THREE.CanvasTexture(starTextureCanvas);

    starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.8,
        map: starTexture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = innerViewscreen.clientWidth / innerViewscreen.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerViewscreen.clientWidth, innerViewscreen.clientHeight);

    createMiniMap();
    updateProjectContent(currentProjectIndex); // Recalculate planet and text positions
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);
    stars.rotation.x += 0.0005;
    stars.rotation.y += 0.0005;
    stars.position.z += 0.5;
    if (stars.position.z > 200) stars.position.z = -200;

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// --- Text Typing Animation (no cursor) ---
function typeText(element, text, speed = 5) { /* Speed set to 5ms for faster typing */
    let i = 0;
    element.textContent = ''; // Clear existing text
    return new Promise(resolve => {
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}


// --- Dynamic HUD Data Updates ---
const logMessages = [
    "Analyzing atmospheric composition.",
    "Gravitational field stable.",
    "Energy fluctuations detected. Source unknown.",
    "Mapping surface topography.",
    "Life signs scan initiated.",
    "Receiving faint signal. Decrypting...",
    "System diagnostics complete. All parameters nominal.",
    "Warning: Proximity alert. Unidentified object.",
    "Initiating evasive maneuvers.",
    "Data packet loss: 0.02%. Re-transmitting.",
    "Calculating optimal trajectory."
];
let currentLogIndex = 0;

function updateHudData() {
    // Update linear scale indicator
    const randomDegree = (Math.random() * 360) - 180; // -180 to +180
    const positionPercentage = ((randomDegree + 180) / 360) * 100;
    if (scaleIndicator) {
        scaleIndicator.style.left = `${positionPercentage}%`;
    }

    // Left sidebar - Sensor Readout
    if (sensorTemp) sensorTemp.textContent = `${(Math.random() * 50 - 20).toFixed(1)}°C`; // -20 to 30 C
    if (sensorHum) sensorHum.textContent = `${Math.floor(Math.random() * 100)}%`;
    if (sensorPres) sensorPres.textContent = `${(Math.random() * 100 + 950).toFixed(0)}hPa`; // 950 to 1050 hPa

    const cpuUsage = Math.floor(Math.random() * 100);
    if (cpuProgressBar) {
        cpuProgressBar.style.width = `${cpuUsage}%`;
        cpuProgressBar.style.background = cpuUsage > 80 ? 'linear-gradient(90deg, rgba(255,0,0,0.5), #f00)' : 'linear-gradient(90deg, rgba(0, 255, 255, 0.5), #0ff)';
    }

    const signalStrength = Math.random();
    if (commSignal) {
        commSignal.textContent = signalStrength > 0.9 ? 'STRONG' : (signalStrength > 0.5 ? 'NORMAL' : 'WEAK');
        commSignal.style.color = signalStrength > 0.9 ? '#6ee7b7' : (signalStrength > 0.5 ? '#fbbf24' : '#f87171');
    }
    if (commLatency) commLatency.textContent = `${Math.floor(Math.random() * 100)}ms`;

    // Right sidebar - Mission Log
    currentLogIndex = (currentLogIndex + 1) % logMessages.length;
    if (logEntry1) logEntry1.textContent = logMessages[currentLogIndex];
    if (logEntry2) logEntry2.textContent = logMessages[(currentLogIndex + 1) % logMessages.length];
    if (logEntry3) logEntry3.textContent = logMessages[(currentLogIndex + 2) % logMessages.length];

    // Power Diagnostics
    if (powerMain) powerMain.textContent = `${(Math.random() * 100).toFixed(1)}%`;
    if (powerAux) powerAux.textContent = `${(Math.random() * 100).toFixed(1)}%`;

}


// Function to update project content and position elements
async function updateProjectContent(index) {
    const project = projects[index];

    // Update dynamic HUD elements that relate to the project
    if (hudTarget) hudTarget.textContent = `TARGET: ${project.title.toUpperCase()}`;

    // Get dimensions of the main content area
    const mainContentAreaWidth = mainContentArea.clientWidth;
    const mainContentAreaHeight = mainContentArea.clientHeight;

    // --- Planet Positioning (Bottom Corner, visible) ---
    // Planet size: 80% of the main content area's height
    currentPlanetDiameter = mainContentAreaHeight * 0.8;

    projectContentDiv.style.width = `${currentPlanetDiameter}px`;
    projectContentDiv.style.height = `${currentPlanetDiameter}px`;
    projectContentDiv.style.bottom = `2%`; // Offset from bottom
    projectContentDiv.style.transform = `none`; // Remove any transforms
    projectContentDiv.style.opacity = 0.6; // Increased opacity for more visibility
    projectContentDiv.style.zIndex = 2; // Behind text

    if (index % 2 === 0) { // Even index: planet bottom-right
        projectContentDiv.style.right = `2%`; // Offset from right
        projectContentDiv.style.left = `auto`;
        projectContentDiv.style.background = `radial-gradient(circle at 70% 70%, #4a90e2, #2e62a4, #1a3a60)`; /* Blue planet gradient */
        projectContentDiv.style.boxShadow = `0 0 40px rgba(74, 144, 226, 0.9)`; /* Stronger blue glow */
    } else { // Odd index: planet bottom-left
        projectContentDiv.style.left = `2%`; // Offset from left
        projectContentDiv.style.right = `auto`;
        projectContentDiv.style.background = `radial-gradient(circle at 30% 70%, #4a90e2, #2e62a4, #1a3a60)`; /* Blue planet gradient */
        projectContentDiv.style.boxShadow = `0 0 40px rgba(74, 144, 226, 0.9)`; /* Stronger blue glow */
    }

    // --- Text Container Positioning (Offset from center, opposite to planet) ---
    const textContainerHorizontalMargin = mainContentAreaWidth * 0.05; // 5% from side edges
    const textContainerVerticalMargin = mainContentAreaHeight * 0.05; // 5% from top/bottom edges

    let textCardCalculatedWidth;
    let textCardCalculatedLeft;
    let textCardCalculatedRight;

    // Calculate space for text based on planet's corner presence
    if (index % 2 === 0) { // Planet is on the right (bottom-right), text is on the left/center
        textCardCalculatedLeft = textContainerHorizontalMargin;
        // Text ends before the planet starts, plus a small gap
        // Planet takes 80% of height, so it takes up 0.8 * mainContentAreaHeight.
        // If it's at the bottom, the space it occupies horizontally is its width (0.8 * mainContentAreaHeight).
        // We want to leave a gap from the planet's edge.
        const planetOccupiedWidth = currentPlanetDiameter * 0.6; // Assuming 60% of planet width is visible horizontally
        textCardCalculatedRight = planetOccupiedWidth + (mainContentAreaWidth * 0.03); // Visible planet width + gap
        textCardCalculatedWidth = mainContentAreaWidth - textCardCalculatedLeft - textCardCalculatedRight;
    } else { // Planet is on the left (bottom-left), text is on the right/center
        // Text starts after the planet ends, plus a small gap
        const planetOccupiedWidth = currentPlanetDiameter * 0.6; // Assuming 60% of planet width is visible horizontally
        textCardCalculatedLeft = planetOccupiedWidth + (mainContentAreaWidth * 0.03); // Visible planet width + gap
        textCardCalculatedRight = textContainerHorizontalMargin;
        textCardCalculatedWidth = mainContentAreaWidth - textCardCalculatedLeft - textCardCalculatedRight;
    }

    // Ensure textCardCalculatedWidth is not too small
    if (textCardCalculatedWidth < (mainContentAreaWidth * 0.4)) { // Minimum 40% of main content area width
        textCardCalculatedWidth = mainContentAreaWidth * 0.4;
    }

    // Text container height: Fill most of the vertical space
    let textCardHeight = mainContentAreaHeight - (textContainerVerticalMargin * 2);

    textDetailsContainer.style.width = `${textCardCalculatedWidth}px`;
    textDetailsContainer.style.height = `${textCardHeight}px`;
    textDetailsContainer.style.top = `${textContainerVerticalMargin}px`; // Position from top
    textDetailsContainer.style.bottom = `${textContainerVerticalMargin}px`; // Position from bottom
    textDetailsContainer.style.left = `${textCardCalculatedLeft}px`;
    textDetailsContainer.style.right = `${textCardCalculatedRight}px`;
    textDetailsContainer.style.transform = `none`; // Remove any transforms


    // Reset content and opacity for internal elements before animation
    projectTitle.textContent = '';
    projectDescription.textContent = '';
    projectTechStack.innerHTML = '';
    projectLinkBtn.style.opacity = 0; // Start button invisible
    projectLinkBtn.style.display = 'none'; // Hide it initially

    // Hide the whole container before starting sequential reveal
    gsap.to(textDetailsContainer, { opacity: 0, duration: 0 });

    // Define a GSAP timeline for sequential animations within the text container
    const contentTimeline = gsap.timeline({
        onComplete: () => {
            // After all internal animations are done, fade in the main text container
            gsap.to(textDetailsContainer, { opacity: 1, duration: 0.7, ease: "power2.out" });
        }
    });

    // 1. Type the title
    contentTimeline.call(async () => {
        await typeText(projectTitle, project.title, 300);
    });

    // 2. Instantly set description after title typing is conceptually complete
    contentTimeline.call(() => {
        projectDescription.textContent = project.description;
    }, [], ">+=0.5"); // Small delay after title typing might finish

    // 3. Animate tech stack tags with a staggered effect
    contentTimeline.call(() => {
        const techSpans = [];
        project.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            // Initial styles are already set in CSS for animation (opacity: 0, translateY(10px))
            projectTechStack.appendChild(span);
            techSpans.push(span);
        });
        gsap.to(techSpans, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
            stagger: 0.1, // Staggered appearance
        });
    }, [], ">+=0.2"); // Delay after description appears

    // 4. Animate the button
    if (project.link) {
        projectLinkBtn.href = project.link;
        contentTimeline.call(() => {
            projectLinkBtn.style.display = 'block'; // Make it display before fading in
            gsap.to(projectLinkBtn, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        }, [], ">+=0.2"); // Delay after tech stack animation
    } else {
        projectLinkBtn.style.display = 'none';
        projectLinkBtn.style.opacity = 0;
    }
    updateNavigationButtons();
    updateMiniMap();
}

function updateNavigationButtons() {
    prevBtn.disabled = currentProjectIndex === 0;
    nextBtn.disabled = currentProjectIndex === projects.length - 1;
}

// Show loading indicator and prepare for transition
function showLoading() {
    loadingIndicator.classList.add('active');

    // Animate planet shrinking and fading, moving to center of inner-viewscreen
    gsap.to(projectContentDiv, {
        opacity: 0,
        scale: 0.5, /* Use scale to maintain circular shape */
        left: '50%', // Move to center of inner-viewscreen
        right: 'auto', // Reset right
        x: '-50%', // Center horizontally
        top: '50%', // Move to center of inner-viewscreen
        y: '-50%', // Center vertically
        duration: 0.5,
        ease: "power2.in"
    });

    // Animate text details fading out
    gsap.to(textDetailsContainer, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
    });
}

// Hide loading indicator and finalize transition
function hideLoading() {
    loadingIndicator.classList.remove('active');

    // Animate planet growing and fading in, moving back to its original position
    gsap.fromTo(projectContentDiv,
        {
            opacity: 0,
            scale: 0.5,
            left: '50%', // Start from center
            right: 'auto',
            x: '-50%',
            top: '50%',
            y: '-50%',
        },
        {
            opacity: 0.6, // Fade back to subtle background opacity
            scale: 1, // Animate to full size
            left: currentProjectIndex % 2 === 0 ? `auto` : `2%`, // Back to original left/right
            right: currentProjectIndex % 2 !== 0 ? `auto` : `2%`,
            x: '0', // Reset GSAP x/y transforms
            y: '0',
            bottom: `2%`, // Back to original bottom (relative to main-content-area)
            top: `auto`, // Remove top
            transform: `none`, // Back to original transform
            duration: 1,
            ease: "power2.out"
        }
    );

    // Text details are animated in `updateProjectContent` after typing
}

async function nextProject() {
    if (currentProjectIndex < projects.length - 1) {
        showLoading();
        currentProjectIndex++;
        await warpSpeedEffect();
        updateProjectContent(currentProjectIndex);
        hideLoading();
    }
}

async function prevProject() {
    if (currentProjectIndex > 0) {
        showLoading();
        currentProjectIndex--;
        await warpSpeedEffect();
        updateProjectContent(currentProjectIndex);
        hideLoading();
    }
}

function warpSpeedEffect() {
    return new Promise(resolve => {
        const originalCameraFov = 75;

        gsap.timeline({
            onComplete: () => {
                gsap.to(camera, { fov: originalCameraFov, duration: 1, ease: "power2.out", onUpdate: () => camera.updateProjectionMatrix() });
                resolve();
            }
        })
            .to(stars.position, {
                z: "+=300",
                duration: 1.5,
                ease: "power2.inOut"
            })
            .to(camera, {
                fov: 120,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => camera.updateProjectionMatrix()
            }, "<0.2");
    });
}

function createMiniMap() {
    const svgWidth = miniMapSVG.clientWidth;
    const svgHeight = miniMapSVG.clientHeight;
    miniMapSVG.innerHTML = '';

    const numProjects = projects.length;
    const startX = svgWidth * 0.1;
    const endX = svgWidth * 0.9;
    const nodeY = svgHeight / 2;
    const spacing = (numProjects > 1) ? (endX - startX) / (numProjects - 1) : 0;

    if (numProjects > 1) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", nodeY);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", nodeY);
        line.classList.add('mini-map-line');
        miniMapSVG.appendChild(line);
    }

    for (let i = 0; i < numProjects; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", startX + (i * spacing));
        circle.setAttribute("cy", nodeY);
        circle.setAttribute("r", 5);
        circle.classList.add('mini-map-node');
        miniMapSVG.appendChild(circle);
    }
    updateMiniMap();
}

function updateMiniMap() {
    const nodes = miniMapSVG.querySelectorAll('.mini-map-node');
    nodes.forEach((node, index) => {
        if (index === currentProjectIndex) {
            gsap.to(node, {
                duration: 0.3,
                attr: { r: 8 },
                scale: 1.5,
                ease: "power2.out",
                overwrite: true,
                onComplete: () => {
                    node.classList.add('active');
                }
            });
        } else {
            gsap.to(node, {
                duration: 0.3,
                attr: { r: 5 },
                scale: 1,
                ease: "power2.out",
                overwrite: true,
                onComplete: () => {
                    node.classList.remove('active');
                }
            });
        }
    });
}

window.onload = function () {
    initThreeJS();
    animate();
    createMiniMap();
    updateProjectContent(currentProjectIndex);
    hideLoading();

    // Initial HUD data update and then interval
    updateHudData();
    setInterval(updateHudData, 2500); // Update every 2.5 seconds

    nextBtn.addEventListener('click', nextProject);
    prevBtn.addEventListener('click', prevProject);
};

//bento layout
document.addEventListener('DOMContentLoaded', function () {
    // Animate stats on scroll (retained and adapted)
    const stats = document.querySelectorAll('#creative-universe-portfolio .stat-number');
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = parseInt(stat.textContent);
                let currentValue = 0;
                const increment = finalValue / 50; // Adjust for smoother animation

                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue);
                    }
                }, 20);
                observer.unobserve(stat); // Stop observing once animated
            }
        });
    };

    const statObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    stats.forEach(stat => {
        statObserver.observe(stat);
    });

    // Presentation slide cycling (retained and enhanced)
    const slides = [
        {
            title: 'Mars :The Planet',
            details: 'This presentation details the various sites and innovations in current Mars exploration missions, focusing on rover technology and detailed history for each of those places.',
            imageUrl: 'images/p3.png',
            linkUrl: 'https://www.icloud.com/keynote/0cedHAIuTuAPguvpv6shqiI9w#Presentation'
        },
        {
            title: 'Something about Blueberries',
            details: 'A presentation template as fresh as the fruit it\'s themed around. A blueberry-themed presentation template to keep things sharp and visually sweet.',
            imageUrl: 'images/p2.png',
            linkUrl: 'https://www.icloud.com/keynote/0636CpzxlBxp0dIi_xZhJHk-Q#blueberry'
        },
        {
            title: 'Intro to LearnQuest',
            details: 'An exploration of learning through innovation—presenting our mini project developed for departmental review.',
            imageUrl: 'images/p1.png',
            linkUrl: 'https://docs.google.com/presentation/d/15r8Kzuhge6q3YTlHYDzWDNAKw9_76AUCcJiMjh2VEg4/edit?usp=sharing'
        },
        {
            title: 'Web Project Proposal',
            details: 'A presentation template styled like web browser windows, using classic UI frames to creatively display content with a modern, tech-savvy aesthetic.',
            imageUrl: 'images/p4.png',
            linkUrl: 'https://www.canva.com/design/DAGp1jVzELw/90Uo-jCXkyHuFt85gmeVtQ/edit'
        },
        {
            title: 'An Apple inspired Keynote',
            details: 'A sleek, Apple-inspired keynote template featuring smooth transitions, minimalist layouts, and polished, product-launch-style modules.',
            imageUrl: 'images/p5.png',
            linkUrl: 'https://www.canva.com/design/DAGp16LipaA/9qcyGaJPicP7oqcMUaubvg/edit'
        }
    ];

    let currentSlideIndex = 0;
    const slideElement = document.querySelector('#creative-universe-portfolio .slide-preview');
    const presentationDetailsPopup = document.querySelector('#creative-universe-portfolio .presentation-details-popup');
    const detailsBtn = document.querySelector('#creative-universe-portfolio .details-btn');
    const playPauseBtn = document.querySelector('#creative-universe-portfolio .play-pause-btn');
    const viewPresentationBtn = document.querySelector('#creative-universe-portfolio .view-presentation-btn');
    let isPlaying = true; // Track if auto-cycling is active
    let autoSlideInterval;

    // Function to update slide and its details and link
    function updateSlide(index) {
        slideElement.textContent = slides[index].title;
        slideElement.style.backgroundImage = `url('${slides[index].imageUrl}')`;
        presentationDetailsPopup.textContent = slides[index].details;
        viewPresentationBtn.onclick = () => window.open(slides[index].linkUrl, '_blank');
        presentationDetailsPopup.classList.remove('active');
    }

    // Function to start auto-cycling
    function startAutoCycle() {
        if (!autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                updateSlide(currentSlideIndex);
            }, 4000);
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }

    // Function to stop auto-cycling
    function stopAutoCycle() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Initial slide setup and auto-cycling start
    updateSlide(currentSlideIndex);
    startAutoCycle();

    // Manual Navigation Arrows
    const leftArrow = document.querySelector('#creative-universe-portfolio .nav-arrow.left');
    const rightArrow = document.querySelector('#creative-universe-portfolio .nav-arrow.right');
    const presentationViewer = document.querySelector('#creative-universe-portfolio .presentation-viewer');

    // Pause auto-cycle on hover over viewer, resume on leave
    presentationViewer.addEventListener('mouseenter', () => {
        stopAutoCycle();
    });
    presentationViewer.addEventListener('mouseleave', () => {
        // Only restart if it was originally playing before hover
        if (!autoSlideInterval && !playPauseBtn.querySelector('.fa-play')) {
            startAutoCycle();
        }
    });

    leftArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlide(currentSlideIndex);
        stopAutoCycle();
    });

    rightArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlide(currentSlideIndex);
        stopAutoCycle();
    });

    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopAutoCycle();
        } else {
            startAutoCycle();
        }
    });

    // Details Button functionality
    detailsBtn.addEventListener('click', () => {
        presentationDetailsPopup.classList.toggle('active');
    });


    // Certificates Floating Animation
    const certsContainer = document.querySelector('#creative-universe-portfolio .certificates-large');
    const floatingCerts = document.querySelectorAll('#creative-universe-portfolio .floating-certificate-wrapper');

    // Function to set random initial positions and animations
    function setupCertificateAnimations() {
        const containerWidth = certsContainer.clientWidth;
        const containerHeight = certsContainer.clientHeight;

        floatingCerts.forEach((cert, index) => {
            // Set a max offset to keep certificates visible and not too far off-screen
            const maxOffsetX = containerWidth * 0.4;
            const maxOffsetY = containerHeight * 0.4;

            // Initial random positions within the container
            const randomX = Math.random() * (containerWidth - cert.offsetWidth);
            const randomY = Math.random() * (containerHeight - cert.offsetHeight - 80);

            const randomDuration = 8 + Math.random() * 7;
            const randomDelay = Math.random() * 5;

            // Set initial position (ensure it's not animated on first load from 0,0)
            cert.style.transition = 'none';
            cert.style.left = `${randomX}px`;
            cert.style.top = `${randomY}px`;
            // Force reflow
            void cert.offsetWidth;
            cert.style.transition = 'transform 0.5s ease-out, z-index 0.3s ease';

            // Set up animation properties
            cert.style.animation = `floatCert-${index} ${randomDuration}s ease-in-out infinite`;
            cert.style.animationDelay = `${randomDelay}s`;
            cert.style.animationPlayState = 'running';

            // Create dynamic keyframes for each cert for unique paths
            // Generate translation values to keep animation within reasonable bounds
            const translateX1 = Math.random() * maxOffsetX * (Math.random() < 0.5 ? 1 : -1);
            const translateY1 = Math.random() * maxOffsetY * (Math.random() < 0.5 ? 1 : -1);
            const translateX2 = Math.random() * maxOffsetX * (Math.random() < 0.5 ? 1 : -1);
            const translateY2 = Math.random() * maxOffsetY * (Math.random() < 0.5 ? 1 : -1);
            const translateX3 = Math.random() * maxOffsetX * (Math.random() < 0.5 ? 1 : -1);
            const translateY3 = Math.random() * maxOffsetY * (Math.random() < 0.5 ? 1 : -1);


            const styleSheet = document.styleSheets[0];
            // Check if keyframes already exist to avoid duplication on resize
            if (!document.querySelector(`style[data-keyframes="floatCert-${index}"]`)) {
                const newStyleTag = document.createElement('style');
                newStyleTag.setAttribute('data-keyframes', `floatCert-${index}`);
                newStyleTag.innerHTML = `
                            @keyframes floatCert-${index} {
                                0%, 100% {
                                    transform: translate(0, 0) scale(1);
                                }
                                25% {
                                    transform: translate(${translateX1}px, ${translateY1}px) scale(1.02);
                                }
                                50% {
                                    transform: translate(${translateX2}px, ${translateY2}px) scale(1);
                                }
                                75% {
                                    transform: translate(${translateX3}px, ${translateY3}px) scale(0.98);
                                }
                            }
                        `;
                document.head.appendChild(newStyleTag);
            }

            // Pause/play animation on hover
            cert.addEventListener('mouseenter', () => {
                cert.style.animationPlayState = 'paused';
            });
            cert.addEventListener('mouseleave', () => {
                cert.style.animationPlayState = 'running';
            });
        });
    }

    // Adjust positions on window resize for floating certificates
    window.addEventListener('resize', () => {
        // Remove existing dynamic keyframe styles to regenerate them
        document.querySelectorAll('style[data-keyframes]').forEach(tag => tag.remove());
        setupCertificateAnimations(); // Re-run setup to adjust positions and create new keyframes
    });

    // Initial positioning for certificates on load
    // Use setTimeout to ensure container dimensions are calculated after rendering
    setTimeout(() => {
        setupCertificateAnimations();
    }, 100);

    // Technical Tidbit cycling
    const tidbits = [
        "My code doesn\'t have bugs—it develops unexpected features. 🐛✨",
        "I don\'t always test my code, but when I do, I do it in production.",
        "To understand recursion, you must first understand recursion.",
        "Stack Overflow is my co-pilot.",
        "Code never lies, comments sometimes do.",
        "Why do Java developers wear glasses? Because they don\'t see sharp. 🤓",
        "Programmer (noun): A machine that turns coffee into code.",
        "Behind every successful app is a frustrated developer yelling at their screen.",
        "Semicolons: the punctuation of despair.",
        "Git commit -m 'final-final-FINAL version (really this time)'",
        "Keep calm and npm install.",
        "Keyboard not responding. Press any key to continue.",
        "Delete system32 — they said it would be fun, they said.",
        "Real programmers count from 0.",
        "It's not a bug, it's an undocumented feature.",
        "First rule of programming: if it works, don\'t touch it.",
        "The best debugger is a good night\'s sleep.",
        "I wrote the code myself. It only crashed twice. Progress. 💻💥",
        "In case of fire: git commit, git push, leave building."
    ];

    let currentTidbitIndex = 0;
    const tidbitContent = document.querySelector('#creative-universe-portfolio #tidbit-content p');

    function updateTidbit() {
        tidbitContent.textContent = tidbits[currentTidbitIndex];
        currentTidbitIndex = (currentTidbitIndex + 1) % tidbits.length;
    }

    // Initial tidbit display
    updateTidbit();
    // Start cycling tidbits
    setInterval(updateTidbit, 40000);

});

// --- Three.js Void Animation ---

       // --- Three.js Void Animation ---

        const void_container_elem = document.getElementById('void-container');
        const void_canvas_elem = document.getElementById('void-canvas');

        const void_scene_obj = new THREE.Scene();
        const void_camera_obj = new THREE.PerspectiveCamera(75, void_container_elem.clientWidth / void_container_elem.clientHeight, 0.1, 1000);
        const void_renderer_obj = new THREE.WebGLRenderer({ canvas: void_canvas_elem, antialias: true, alpha: true });
        void_renderer_obj.setSize(void_container_elem.clientWidth, void_container_elem.clientHeight);
        void_renderer_obj.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        void_renderer_obj.setClearColor(0x000000, 1); // Forces the renderer to clear to opaque black

        void_camera_obj.position.z = 50;

        const void_particleCount_val = 5000;
        const void_positions_arr = new Float32Array(void_particleCount_val * 3);
        const void_velocities_arr = new Float32Array(void_particleCount_val * 3);

        for (let i = 0; i < void_particleCount_val; i++) {
            const i3 = i * 3;
            void_positions_arr[i3] = (Math.random() - 0.5) * 250;
            void_positions_arr[i3 + 1] = (Math.random() - 0.5) * 250;
            void_positions_arr[i3 + 2] = (Math.random() - 0.5) * 250;

            void_velocities_arr[i3] = 0;
            void_velocities_arr[i3 + 1] = 0;
            void_velocities_arr[i3 + 2] = 0.2 + Math.random() * 0.2;
        }

        const void_geometry_obj = new THREE.BufferGeometry();
        void_geometry_obj.setAttribute('position', new THREE.BufferAttribute(void_positions_arr, 3));

        const void_material_obj = new THREE.PointsMaterial({
            color: 0xaaaaaa, // Light grey particles
            size: 0.15,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        const void_particles_obj = new THREE.Points(void_geometry_obj, void_material_obj);
        void_scene_obj.add(void_particles_obj);

        const void_mouse_vec = new THREE.Vector2(0, 0);
        let void_isHovering_bool = false;
        let void_hoverFactor_val = 0.0;

        void_container_elem.addEventListener('mousemove', (event) => {
            const rect = void_container_elem.getBoundingClientRect();
            void_mouse_vec.x = ((event.clientX - rect.left) / void_container_elem.clientWidth) * 2 - 1;
            void_mouse_vec.y = -(((event.clientY - rect.top) / void_container_elem.clientHeight) * 2 - 1);
        });

        void_container_elem.addEventListener('mouseenter', () => { void_isHovering_bool = true; });
        void_container_elem.addEventListener('mouseleave', () => { void_isHovering_bool = false; });
        
        const void_clock_obj = new THREE.Clock();

        function void_animate_func() {
            const elapsedTime = void_clock_obj.getElapsedTime();
            
            void_hoverFactor_val += ((void_isHovering_bool ? 1.0 : 0.0) - void_hoverFactor_val) * 0.03;

            const positions = void_particles_obj.geometry.attributes.position.array;
            
            const centralPull = 0.001 + (void_hoverFactor_val * 0.002);

            for (let i = 0; i < void_particleCount_val; i++) {
                const i3 = i * 3;

                positions[i3] -= positions[i3] * centralPull;
                positions[i3 + 1] -= positions[i3 + 1] * centralPull;

                positions[i3 + 2] += void_velocities_arr[i3 + 2] + (void_hoverFactor_val * 0.6);

                const dx = positions[i3] - (void_mouse_vec.x * 30);
                const dy = positions[i3 + 1] - (void_mouse_vec.y * 30);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 30.0) {
                     const force = (1.0 - (distance / 30.0)) * (0.02 + void_hoverFactor_val * 0.08);
                     positions[i3] += dy * force;
                     positions[i3 + 1] -= dx * force;
                }

                if (positions[i3 + 2] > void_camera_obj.position.z) {
                    positions[i3 + 2] = -150 - Math.random() * 50;
                    positions[i3] = (Math.random() - 0.5) * 250;
                    positions[i3 + 1] = (Math.random() - 0.5) * 250;
                }
            }

            void_particles_obj.geometry.attributes.position.needsUpdate = true;
            
            void_particles_obj.rotation.z = elapsedTime * 0.01;
            void_particles_obj.rotation.y = elapsedTime * 0.005;

            void_renderer_obj.render(void_scene_obj, void_camera_obj);

            requestAnimationFrame(void_animate_func);
        }

        window.addEventListener('resize', () => {
            if (void_container_elem.clientWidth > 0 && void_container_elem.clientHeight > 0) {
                void_camera_obj.aspect = void_container_elem.clientWidth / void_container_elem.clientHeight;
                void_camera_obj.updateProjectionMatrix();
                void_renderer_obj.setSize(void_container_elem.clientWidth, void_container_elem.clientHeight);
                void_renderer_obj.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
        });

        void_animate_func();


// Initialize animations
function init() {
    createStars();
    animateRocket();
    animateInsightCards();
    animateQuote();
}

// Run animations when the page is loaded
window.addEventListener('load', init);
