/* =====================================
   File : footer.js
===================================== */

"use strict";

/* =====================================
   Footer Initialize
===================================== */

function initFooter() {

    const backToTop =

        document.getElementById("backToTop");

    if (!backToTop) {

        return;

    }

    /* ==========================
       Show / Hide Button
    ========================== */

    function toggleButton() {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    /* ==========================
       Scroll To Top
    ========================== */

    function scrollTopPage() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    /* ==========================
       Events
    ========================== */

    window.addEventListener(

        "scroll",

        toggleButton

    );

    backToTop.addEventListener(

        "click",

        scrollTopPage

    );

    toggleButton();

    console.log(

        "Footer Loaded Successfully"

    );

}
