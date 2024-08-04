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


AOS.init({
    once: true
});
// loader
const loader=document.querySelector('.loader')
const home=document.querySelector('#home')
const about=document.querySelector('#about')
const service=document.querySelector('#services')
const contact=document.querySelector('#contact')

window.addEventListener('load', ()=>{
    loader.classList.add('hidden')
    home.classList.add('shown')
    about.classList.add('shown')
    service.classList.add('shown')
    contact.classList.add('shown')
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
