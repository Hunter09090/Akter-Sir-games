/* =====================================
   File : header.js
===================================== */

"use strict";

/* =====================================
   Elements
===================================== */

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

const menuOverlay = document.getElementById("menuOverlay");

const themeToggle = document.getElementById("themeToggle");


/* =====================================
   Mobile Menu
===================================== */

function openMenu() {

    mobileMenu.classList.add("show");

    menuOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}

function closeMenu() {

    mobileMenu.classList.remove("show");

    menuOverlay.classList.remove("show");

    document.body.style.overflow = "";

}

function toggleMenu() {

    mobileMenu.classList.contains("show")

        ? closeMenu()

        : openMenu();

}


/* =====================================
   Events
===================================== */

if (menuBtn) {

    menuBtn.addEventListener(

        "click",

        toggleMenu

    );

}

if (menuOverlay) {

    menuOverlay.addEventListener(

        "click",

        closeMenu

    );

}


/* =====================================
   Close Menu
   After Click Link
===================================== */

document

    .querySelectorAll(".mobile-link")

    .forEach((link) => {

        link.addEventListener(

            "click",

            closeMenu

        );

    });
/* =====================================
   Theme System
===================================== */

const THEME_KEY = "website_theme";


/* =====================================
   Apply Theme
===================================== */

function applyTheme(theme) {

    document.documentElement.setAttribute(

        "data-theme",

        theme

    );

    if (themeToggle) {

        themeToggle.textContent =

            theme === "dark"

            ? "☀️"

            : "🌙";

    }

}


/* =====================================
   Load Theme
===================================== */

function loadTheme() {

    const savedTheme =

        localStorage.getItem(THEME_KEY)

        || "light";

    applyTheme(savedTheme);

}


/* =====================================
   Toggle Theme
===================================== */

function toggleTheme() {

    const currentTheme =

        document.documentElement.getAttribute(

            "data-theme"

        ) || "light";

    const newTheme =

        currentTheme === "light"

        ? "dark"

        : "light";

    localStorage.setItem(

        THEME_KEY,

        newTheme

    );

    applyTheme(newTheme);

}


/* =====================================
   Theme Event
===================================== */

if (themeToggle) {

    themeToggle.addEventListener(

        "click",

        toggleTheme

    );

}


/* =====================================
   Initialize Theme
===================================== */

loadTheme();
/* =====================================
   Active Navigation
===================================== */

function setActiveMenu() {

    const currentPage =

        window.location.pathname

        .split("/")

        .pop() ||

        "index.html";

    document

        .querySelectorAll(

            ".nav-link, .mobile-link"

        )

        .forEach((link) => {

            const href =

                link.getAttribute("href");

            if (href === currentPage) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

}


/* =====================================
   Header Scroll Effect
===================================== */

const header =

    document.querySelector(".main-header");

function updateHeaderOnScroll() {

    if (!header) return;

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(

    "scroll",

    updateHeaderOnScroll

);


/* =====================================
   ESC Key Close Menu
===================================== */

document.addEventListener(

    "keydown",

    (event) => {

        if (

            event.key === "Escape"

        ) {

            closeMenu();

        }

    }

);


/* =====================================
   Resize Fix
===================================== */

window.addEventListener(

    "resize",

    () => {

        if (

            window.innerWidth > 768

        ) {

            closeMenu();

        }

    }

);


/* =====================================
   Initialize
===================================== */

setActiveMenu();

updateHeaderOnScroll();

console.log(

    "Professional Header Ready"

);
