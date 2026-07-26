/* =====================================
   File : utils.js
   Game Hub Utility Library
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Helper
===================================== */

/**
 * Get Single Element
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
const $ = (selector) => {

    return document.querySelector(selector);

};


/**
 * Get Multiple Elements
 * @param {string} selector
 * @returns {NodeList}
 */
const $$ = (selector) => {

    return document.querySelectorAll(selector);

};


/* =====================================
   Create Element
===================================== */

/**
 * Create HTML Element
 * @param {string} tag
 * @returns {HTMLElement}
 */
function create(tag){

    return document.createElement(tag);

}


/* =====================================
   Show Element
===================================== */

function show(element){

    if(!element) return;

    element.style.display = "";

}


/* =====================================
   Hide Element
===================================== */

function hide(element){

    if(!element) return;

    element.style.display = "none";

}


/* =====================================
   Toggle Element
===================================== */

function toggle(element){

    if(!element) return;

    if(element.style.display === "none"){

        show(element);

    }else{

        hide(element);

    }

}

/* =====================================
   Random Number
===================================== */

/**
 * Random Integer
 * Example:
 * random(1,6)
 */
function random(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* =====================================
   Random Array Item
===================================== */

/**
 * Get Random Item
 * Example:
 * randomItem(colors)
 */
function randomItem(array){

    if(!Array.isArray(array)){

        return null;

    }

    if(array.length === 0){

        return null;

    }

    return array[
        random(0, array.length - 1)
    ];

}


/* =====================================
   Shuffle Array
===================================== */

/**
 * Fisher-Yates Shuffle
 */
function shuffle(array){

    if(!Array.isArray(array)){

        return [];

    }

    const newArray = [...array];

    for(

        let i = newArray.length - 1;

        i > 0;

        i--

    ){

        const j = random(0, i);

        [newArray[i], newArray[j]] =
        [newArray[j], newArray[i]];

    }

    return newArray;

}


/* =====================================
   Delay
===================================== */

/**
 * Wait
 * Example:
 * await delay(1000);
 */
function delay(ms){

    return new Promise(resolve=>{

        setTimeout(resolve, ms);

    });

}


/* =====================================
   Clamp Number
===================================== */

/**
 * Keep Number Between Min & Max
 */
function clamp(value,min,max){

    return Math.min(
        Math.max(value,min),
        max
    );

}


/* =====================================
   Format Number
===================================== */

function formatNumber(number){

    return Number(number)
        .toLocaleString();

}


/* =====================================
   Format Time
===================================== */

/**
 * 65
 * ↓
 * 01:05
 */

function formatTime(seconds){

    const minute =
    Math.floor(seconds/60);

    const second =
    seconds%60;

    return String(minute)
    .padStart(2,"0")

    +

    ":"

    +

    String(second)
    .padStart(2,"0");

}
/* =====================================
   Local Storage Helper
===================================== */

/**
 * Save Data
 * Example:
 * saveData("score", 100);
 */
function saveData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error("Save Error:", error);

    }

}


/**
 * Load Data
 * Example:
 * loadData("score", 0);
 */
function loadData(key, defaultValue = null) {

    try {

        const data = localStorage.getItem(key);

        if (data === null) {

            return defaultValue;

        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Load Error:", error);

        return defaultValue;

    }

}


/**
 * Remove Data
 */
function removeData(key) {

    localStorage.removeItem(key);

}


/**
 * Clear All Data
 */
function clearData() {

    localStorage.clear();

}


/* =====================================
   Device Vibration
===================================== */

function vibrate(duration = 100) {

    if ("vibrate" in navigator) {

        navigator.vibrate(duration);

    }

}


/* =====================================
   Copy Text
===================================== */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        return true;

    } catch {

        return false;

    }

}


/* =====================================
   Full Screen
===================================== */

function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}


/* =====================================
   Mobile Detect
===================================== */

function isMobile() {

    return window.innerWidth <= 768;

}


/* =====================================
   Dark Mode Detect
===================================== */

function isDarkMode() {

    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

}


/* =====================================
   UUID Generator
===================================== */

function uuid() {

    return crypto.randomUUID();

}
/* =====================================
   File : utils.js
   Part 4
===================================== */


/* =====================================
   Toast Notification
===================================== */

function toast(message, type = "info") {

    let toastBox = $("#toast");

    if (!toastBox) {

        toastBox = create("div");

        toastBox.id = "toast";

        document.body.appendChild(toastBox);

    }

    toastBox.className = `toast ${type}`;

    toastBox.textContent = message;

    toastBox.classList.add("show");

    setTimeout(() => {

        toastBox.classList.remove("show");

    }, 2500);

}


/* =====================================
   Sound
===================================== */

const sound = {

    click: null,

    success: null,

    fail: null,

    win: null

};


function playSound(name) {

    if (!sound[name]) return;

    sound[name].currentTime = 0;

    sound[name].play();

}


/* =====================================
   Safe Event
===================================== */

function on(element, event, callback) {

    if (!element) return;

    element.addEventListener(event, callback);

}


/* =====================================
   Disable Button
===================================== */

function disable(button) {

    if (!button) return;

    button.disabled = true;

}


/* =====================================
   Enable Button
===================================== */

function enable(button) {

    if (!button) return;

    button.disabled = false;

}


/* =====================================
   Loading
===================================== */

function loading(button, text = "Loading...") {

    if (!button) return;

    button.dataset.oldText = button.innerHTML;

    button.innerHTML = text;

    disable(button);

}


function stopLoading(button) {

    if (!button) return;

    button.innerHTML =

        button.dataset.oldText || "Done";

    enable(button);

}


/* =====================================
   Random Color
===================================== */

function randomColor() {

    const colors = [

        "#2563eb",

        "#16a34a",

        "#dc2626",

        "#ca8a04",

        "#9333ea",

        "#0891b2",

        "#ea580c"

    ];

    return randomItem(colors);

}


/* =====================================
   Version
===================================== */

const GAME_HUB_VERSION = "1.0.0";
