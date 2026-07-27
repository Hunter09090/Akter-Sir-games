/* =====================================
   File : header.js
===================================== */

"use strict";

/* =====================================
   Header Initialize
===================================== */

function initHeader() {

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const themeToggle =
        document.getElementById("themeToggle");

    const header =
        document.querySelector(".main-header");

    if (!header) {

        console.warn("Header Not Loaded");

        return;

    }

    /* ==========================
       Open Menu
    ========================== */

    function openMenu() {

        mobileMenu.classList.add("show");

        menuOverlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }

    /* ==========================
       Close Menu
    ========================== */

    function closeMenu() {

        mobileMenu.classList.remove("show");

        menuOverlay.classList.remove("show");

        document.body.style.overflow = "";

    }

    /* ==========================
       Toggle Menu
    ========================== */

    function toggleMenu() {

        mobileMenu.classList.contains("show")

            ? closeMenu()

            : openMenu();

    }
       /* ==========================
       Menu Events
    ========================== */

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

    /* ==========================
       Close After Click Link
    ========================== */

    document

        .querySelectorAll(".mobile-link")

        .forEach((link) => {

            link.addEventListener(

                "click",

                closeMenu

            );

        });

    /* ==========================
       ESC Close
    ========================== */

    document.addEventListener(

        "keydown",

        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }

    );

    /* ==========================
       Resize Fix
    ========================== */

    window.addEventListener(

        "resize",

        () => {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        }

    );

    /* ==========================
       Theme System
    ========================== */

    const THEME_KEY = "website_theme";

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

    function loadTheme() {

        const savedTheme =

            localStorage.getItem(THEME_KEY)

            || "light";

        applyTheme(savedTheme);

    }

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

    if (themeToggle) {

        themeToggle.addEventListener(

            "click",

            toggleTheme

        );

    }

    loadTheme();
       /* ==========================
       Active Navigation
    ========================== */

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

            }

        });

    /* ==========================
       Header Scroll Effect
    ========================== */

    function updateHeader() {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(

        "scroll",

        updateHeader

    );

    updateHeader();

    console.log(

        "Header Ready"

    );

}

/* =====================================
   Wait Until Header Loaded
===================================== */


/* =====================================
   Active Page
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

        .forEach(link => {

            const href =

                link.getAttribute("href");

            if (href === currentPage) {

                link.classList.add("active");

            }

        });

}

/* =====================================
   Header Scroll Effect
===================================== */

function headerScrollEffect() {

    const header =

        document.querySelector(".main-header");

    if (!header) return;

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

/* =====================================
   Initialize
===================================== */

setActiveMenu();

headerScrollEffect();

window.addEventListener(

    "scroll",

    headerScrollEffect

);

console.log("Header Loaded Successfully");

}
