/* GAME HUB OF SIR — shared utility library */
"use strict";
const $=selector=>document.querySelector(selector);
const $$=selector=>document.querySelectorAll(selector);
function create(tag){return document.createElement(tag)}
function show(element){if(element)element.style.display=""}
function hide(element){if(element)element.style.display="none"}
function toggle(element){if(!element)return;element.style.display=element.style.display==="none"?"":"none"}
function random(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function randomItem(array){return Array.isArray(array)&&array.length?array[random(0,array.length-1)]:null}
function shuffle(array){if(!Array.isArray(array))return[];const a=[...array];for(let i=a.length-1;i>0;i--){const j=random(0,i);[a[i],a[j]]=[a[j],a[i]]}return a}
function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
function clamp(value,min,max){return Math.min(Math.max(value,min),max)}
function formatNumber(number){return Number(number).toLocaleString()}
function formatTime(seconds){const m=Math.floor(seconds/60),s=seconds%60;return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")}
function saveData(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch(e){console.error("Save Error:",e);return false}}
function loadData(key,defaultValue=null){try{const data=localStorage.getItem(key);return data===null?defaultValue:JSON.parse(data)}catch(e){console.error("Load Error:",e);return defaultValue}}
function removeData(key){localStorage.removeItem(key)}
function clearData(){localStorage.clear()}
function vibrate(duration=100){try{if("vibrate"in navigator)navigator.vibrate(duration)}catch{}}
async function copyText(text){try{await navigator.clipboard.writeText(text);return true}catch{return false}}
function toggleFullscreen(){if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()}
function isMobile(){return window.innerWidth<=768}
function isDarkMode(){return document.documentElement.dataset.theme==="dark"||window.matchMedia("(prefers-color-scheme: dark)").matches}
function uuid(){return crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2)}
function toast(message,type="info"){let box=$("#toast");if(!box){box=create("div");box.id="toast";document.body.appendChild(box)}box.className=`toast ${type}`;box.textContent=message;box.classList.add("show");clearTimeout(box._timer);box._timer=setTimeout(()=>box.classList.remove("show"),2500)}
const sound={click:null,success:null,fail:null,win:null};function playSound(name){if(!sound[name])return;sound[name].currentTime=0;sound[name].play().catch(()=>{})}
function on(element,event,callback){if(element)element.addEventListener(event,callback)}
function disable(button){if(button)button.disabled=true}
function enable(button){if(button)button.disabled=false}
function loading(button,text="Loading..."){if(!button)return;button.dataset.oldText=button.innerHTML;button.innerHTML=text;disable(button)}
function stopLoading(button){if(!button)return;button.innerHTML=button.dataset.oldText||"Done";enable(button)}
function randomColor(){return randomItem(["#2563eb","#16a34a","#dc2626","#ca8a04","#9333ea","#0891b2","#ea580c"])}
const GAME_HUB_VERSION="2.0.0";

/* Automatically provide the shared game header/footer to every game page. */
(function(){
  const page=document.getElementById("header")||document.getElementById("footer");
  if(!page)return;
  const script=document.createElement("script");script.src="game-shell.js";script.async=false;document.head.appendChild(script);
})();
