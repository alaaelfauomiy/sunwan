// ================= HEADER =================
const header = document.getElementById("siteHeader");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
    });
}

// ================= MOBILE MENU =================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("nav ul");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        navToggle.classList.toggle("active");
    });

    // يقفل المنيو عند الضغط على أي لينك
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
        });
    });
}
// ================= HERO DUST =================
const dustBox = document.getElementById("dustFloaters");

if (dustBox) {

    for (let i = 0; i < 14; i++) {

        const d = document.createElement("div");

        d.className = "dust";

        d.style.left = (10 + Math.random() * 80) + "%";
        d.style.bottom = (10 + Math.random() * 20) + "%";
        d.style.animationDelay = (Math.random() * 6) + "s";
        d.style.animationDuration = (5 + Math.random() * 4) + "s";

        dustBox.appendChild(d);

    }

}

// ================= COUNTER =================
function animateCounter(el, target, suffix = "") {

    if (!el) return;

    let current = 0;

    const duration = 1600;

    const start = performance.now();

    function step(time) {

        const progress = Math.min((time - start) / duration, 1);

        current = Math.floor(progress * target);

        el.textContent = current.toLocaleString("en-US") + suffix;

        if (progress < 1) {
            requestAnimationFrame(step);
        }

    }

    requestAnimationFrame(step);

}

let heroStatsDone = false;

function triggerHeroStats() {

    if (heroStatsDone) return;

    heroStatsDone = true;

    animateCounter(document.getElementById("statHomes"), 3, "+");
    animateCounter(document.getElementById("statClients"), 11, "+");

}

setTimeout(triggerHeroStats, 400);

// ================= REVEAL =================
const revealEls = document.querySelectorAll(".reveal");
const statEls = document.querySelectorAll(".stat-item strong");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("in");

            if (entry.target.classList.contains("stats")) {

                statEls.forEach(stat => {

                    animateCounter(
                        stat,
                        parseInt(stat.dataset.count, 10),
                        stat.dataset.suffix || ""
                    );

                });

            }

        }

    });

}, {
    threshold: 0.2
});

revealEls.forEach(el => revealObserver.observe(el));

// ================= CLEANING TYPES =================
const tabSteam = document.getElementById("tabSteam");
const tabNormal = document.getElementById("tabNormal");

const demo = document.getElementById("cleanDemo");

const modeTitle = document.getElementById("modeTitle");
const modeFeats = document.getElementById("modeFeats");

function setMode(mode) {

    if (!demo) return;

    if (mode === "steam") {

        demo.classList.remove("mode-normal");
        demo.classList.add("mode-steam");

        if (tabSteam) tabSteam.classList.add("active");
        if (tabNormal) tabNormal.classList.remove("active");

        if (modeTitle)
            modeTitle.textContent = "تنظيف بالبخار";

        if (modeFeats)
            modeFeats.innerHTML =
                "<span>أجهزة إيطالية</span><span>تعقيم كامل</span><span>مناسب للمفروشات</span>";

    } else {

        demo.classList.remove("mode-steam");
        demo.classList.add("mode-normal");

        if (tabNormal) tabNormal.classList.add("active");
        if (tabSteam) tabSteam.classList.remove("active");

        if (modeTitle)
            modeTitle.textContent = "تنظيف عادي";

        if (modeFeats)
            modeFeats.innerHTML =
                "<span>تنظيف يومي</span><span>تنظيف دوري</span><span>حسب رغبة العميل</span>";

    }

}

if (tabSteam && tabNormal) {

    tabSteam.addEventListener("click", () => setMode("steam"));
    tabNormal.addEventListener("click", () => setMode("normal"));

}

// ================= TIMELINE ANIMATION =================
const steps = document.querySelectorAll(".tl-step");

if (steps.length > 0) {

    const stepObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const index = [...steps].indexOf(entry.target);

                setTimeout(() => {

                    entry.target.classList.add("show");

                }, index * 250);

            }

        });

    }, {
        threshold: 0.2
    });

    steps.forEach(step => stepObserver.observe(step));

}
