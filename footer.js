/* =====================================
   File : footer.js
===================================== */

"use strict";

/* =====================================
   Elements
===================================== */

const backToTop = document.getElementById("backToTop");


/* =====================================
   Show / Hide Button
===================================== */

function toggleBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 300) {

        backToTop.style.opacity = "1";

        backToTop.style.visibility = "visible";

    } else {

        backToTop.style.opacity = "0";

        backToTop.style.visibility = "hidden";

    }

}


/* =====================================
   Scroll To Top
===================================== */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================
   Events
===================================== */

window.addEventListener(

    "scroll",

    toggleBackToTop

);

if (backToTop) {

    backToTop.addEventListener(

        "click",

        scrollToTop

    );

}


/* =====================================
   Initialize
===================================== */

toggleBackToTop();

console.log("Footer Ready");
