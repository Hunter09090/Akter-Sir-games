/* =====================================
   File : layout.js
===================================== */

"use strict";

/* =====================================
   Load HTML File
===================================== */

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        const html = await response.text();

        element.innerHTML = html;

    }

    catch (error) {

        console.error(error);

    }

}


/* =====================================
   Start
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadComponent("header", "header.html");

    loadComponent("footer", "footer.html");

});
