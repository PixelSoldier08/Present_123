/* =====================================================
   A Journey To Remember
   script.js
===================================================== */

/* ============================================
   LOADER
============================================ */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 2500);

});


/* ============================================
   BACK TO TOP
============================================ */

const topBtn = document.getElementById("backToTop");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.style.display = "flex";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ============================================
   ACTIVE NAVIGATION
============================================ */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ============================================
   SCROLL REVEAL
============================================ */

const revealItems = document.querySelectorAll(

".card, .item, .wish"

);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

revealItems.forEach(item => {

    item.classList.add("hidden");

    observer.observe(item);

});


/* ============================================
   GALLERY SLIDER
============================================ */

(function initGallerySlider(){

    const track = document.getElementById("sliderTrack");
    const dotsWrap = document.getElementById("sliderDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

    const slides = track.querySelectorAll(".slide");
    const total = slides.length;
    let index = 0;
    let autoplayTimer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll(".dot");

    function update(){
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function goTo(i){
        index = (i + total) % total;
        update();
    }

    function next(){ goTo(index + 1); }
    function prev(){ goTo(index - 1); }

    nextBtn.addEventListener("click", () => { next(); restartAutoplay(); });
    prevBtn.addEventListener("click", () => { prev(); restartAutoplay(); });

    function startAutoplay(){
        autoplayTimer = setInterval(next, 4500);
    }

    function restartAutoplay(){
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    const slider = track.closest(".gallery-slider");
    slider.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
    slider.addEventListener("mouseleave", startAutoplay);

    // swipe support
    let startX = 0;
    let dragging = false;

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        dragging = true;
    });

    track.addEventListener("touchend", e => {
        if (!dragging) return;
        dragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) prev();
        else if (diff < -50) next();
        restartAutoplay();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { next(); restartAutoplay(); }
        if (e.key === "ArrowLeft") { prev(); restartAutoplay(); }
    });

    update();
    startAutoplay();

})();


/* ============================================
   GALLERY LIGHTBOX
============================================ */

const galleryImages = document.querySelectorAll(".slide img");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `

            <button class="lightbox-close" aria-label="Close">

                <i class="fa-solid fa-xmark"></i>

            </button>

            <img src="${image.src}">

        `;

        document.body.appendChild(lightbox);

        function closeLightbox(){

            lightbox.classList.add("closing");

            setTimeout(() => lightbox.remove(), 220);

            document.removeEventListener("keydown", onKey);

        }

        function onKey(e){

            if (e.key === "Escape") closeLightbox();

        }

        lightbox.addEventListener("click", e => {

            if (e.target === lightbox || e.target.closest(".lightbox-close")) {

                closeLightbox();

            }

        });

        document.addEventListener("keydown", onKey);

    });

});


/* ============================================
   HERO PARALLAX
============================================ */

const heroSection = document.getElementById("hero");

if (heroSection) {

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        heroSection.style.transform = `translateY(${scroll * 0.25}px)`;

    });

}


/* ============================================
   COUNTER ANIMATION
============================================ */

const counters = document.querySelectorAll(".stat h2");

let counterStarted = false;

function animateCounters() {

    if (counterStarted) return;

    const stats = document.getElementById("stats");

    if (!stats) return;

    const trigger = stats.offsetTop - window.innerHeight + 100;

    if (window.scrollY > trigger) {

        counterStarted = true;

        counters.forEach(counter => {

            const text = counter.innerText;

            const target = parseInt(text);

            if (isNaN(target)) return;

            let count = 0;

            const speed = target / 80;

            const update = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(update);

                }

                else {

                    counter.innerText = target;

                }

            }

            update();

        });

    }

}

window.addEventListener("scroll", animateCounters);


/* ============================================
   CURSOR GLOW
============================================ */

const glow = document.getElementById("cursor");

if (glow) {

    document.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

}


/* ============================================
   FLOATING STARS
============================================ */

const stars = document.getElementById("stars");

for (let i = 0; i < 120; i++) {

    const star = document.createElement("span");

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.animationDuration = (3 + Math.random() * 5) + "s";

    star.style.animationDelay = Math.random() * 5 + "s";

    stars.appendChild(star);

}


/* ============================================
   FAREWELL CONFETTI (Simple)
============================================ */

const farewell = document.getElementById("farewell");

const farewellObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            launchConfetti();

        }

    });

});

farewellObserver.observe(farewell);

function launchConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.background =
            `hsl(${Math.random() * 360},100%,60%)`;

        confetti.style.animationDuration =
            (3 + Math.random() * 2) + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {

            confetti.remove();

        }, 5000);

    }

}


/* ============================================
   CONSOLE MESSAGE
============================================ */

console.log(

"%cThank You Nashmeera ❤️",

"font-size:25px;color:#38BDF8;font-weight:bold"

);