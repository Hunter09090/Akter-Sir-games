/* Shared chrome for every individual game page. */
(function(){
  "use strict";
  const themeKey="gh_theme_v2";
  const applyTheme=()=>{const t=localStorage.getItem(themeKey)||"light";document.documentElement.dataset.theme=t};
  const load=async(id,file)=>{const el=document.getElementById(id);if(!el)return;try{const r=await fetch(file,{cache:"no-cache"});if(!r.ok)throw new Error(r.status);el.innerHTML=await r.text()}catch(e){el.innerHTML=""}};
  async function init(){
    applyTheme();
    await Promise.all([load("header","header.html"),load("footer","footer.html")]);
    const theme=document.getElementById("themeToggle");
    if(theme){theme.textContent=document.documentElement.dataset.theme==="dark"?"☀️":"🌙";theme.addEventListener("click",()=>{const t=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=t;localStorage.setItem(themeKey,t);theme.textContent=t==="dark"?"☀️":"🌙"})}
    const menu=document.getElementById("mobileMenu"),overlay=document.getElementById("menuOverlay"),btn=document.getElementById("menuBtn");
    const close=()=>{menu?.classList.remove("show");overlay?.classList.remove("show");document.body.style.overflow=""};
    btn?.addEventListener("click",()=>{const open=menu?.classList.toggle("show");overlay?.classList.toggle("show",open);document.body.style.overflow=open?"hidden":""});overlay?.addEventListener("click",close);document.querySelectorAll(".mobile-link").forEach(a=>a.addEventListener("click",close));document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
    const top=document.getElementById("backToTop");top?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
