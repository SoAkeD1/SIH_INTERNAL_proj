(function(){
  "use strict";

  /* ---- Theme ---- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");
  function applyTheme(t){
    root.setAttribute("data-theme", t);
    themeBtn.textContent = t === "light" ? "\u263E" : "\u2600";
    themeBtn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
    localStorage.setItem("rudhira-theme", t);
  }
  var savedTheme = localStorage.getItem("rudhira-theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(savedTheme);
  themeBtn.addEventListener("click", function(){
    applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
    themeBtn.classList.add("spin");
    setTimeout(function(){ themeBtn.classList.remove("spin"); }, 350);
  });

  /* ---- Language ---- */
  var langBtn = document.getElementById("langToggle");
  var dict = window.RUDHIRA_I18N || {};
  function applyLang(lang){
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      var entry = dict[key];
      if(!entry) return;
      el.innerHTML = entry[lang] || entry.en;
    });
    document.documentElement.setAttribute("lang", lang === "hi" ? "hi" : "en");
    langBtn.textContent = lang === "hi" ? "\u0939\u093f\u0902" : "EN";
    localStorage.setItem("rudhira-lang", lang);
  }
  var savedLang = localStorage.getItem("rudhira-lang") || "en";
  applyLang(savedLang);
  langBtn.addEventListener("click", function(){
    applyLang(localStorage.getItem("rudhira-lang") === "hi" ? "en" : "hi");
  });

  /* ---- Live wastage counter ---- */
  var ANNUAL_UNITS = 300000;
  var counterEl = document.getElementById("wastageCounter");
  if(counterEl){
    var now = new Date();
    var yearStart = new Date(now.getFullYear(), 0, 1);
    var yearEnd = new Date(now.getFullYear() + 1, 0, 1);
    var perMs = ANNUAL_UNITS / (yearEnd - yearStart);
    function render(){
      var elapsed = Date.now() - yearStart.getTime();
      var units = Math.floor(elapsed * perMs);
      counterEl.textContent = units.toLocaleString("en-IN");
    }
    render();
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(!reduce) setInterval(render, 1000);
  }

  /* ---- Copy stat cards ---- */
  document.querySelectorAll(".stat-card[data-copy]").forEach(function(card){
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    function doCopy(){
      var text = card.getAttribute("data-copy");
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).catch(function(){});
      }
      card.classList.add("copied");
      setTimeout(function(){ card.classList.remove("copied"); }, 1200);
    }
    card.addEventListener("click", doCopy);
    card.addEventListener("keydown", function(e){
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); doCopy(); }
    });
  });

  /* ---- Unit economics calculator ---- */
  var BASE_COST_DEFAULT = 1829;
  var centre = "private";
  var els = {
    redFee: document.getElementById("calcRedFee"),
    plasmaPrice: document.getElementById("calcPlasmaPrice"),
    plasmaVol: document.getElementById("calcPlasmaVol"),
    baseCost: document.getElementById("calcBaseCost"),
    costCut: document.getElementById("calcCostCut")
  };
  var valEls = {
    redFee: document.getElementById("valRedFee"),
    plasmaPrice: document.getElementById("valPlasmaPrice"),
    plasmaVol: document.getElementById("valPlasmaVol"),
    baseCost: document.getElementById("valBaseCost"),
    costCut: document.getElementById("valCostCut")
  };
  var outEls = {
    redCells: document.getElementById("outRedCells"),
    plasmaRev: document.getElementById("outPlasmaRev"),
    effCost: document.getElementById("outEffCost"),
    margin: document.getElementById("outMargin")
  };
  var fmt = function(n){ return "Rs " + Math.round(n).toLocaleString("en-IN"); };

  function recalc(){
    if(!els.redFee) return;
    var redFee = Number(els.redFee.value);
    var plasmaPrice = Number(els.plasmaPrice.value);
    var plasmaVol = Number(els.plasmaVol.value);
    var baseCost = Number(els.baseCost.value);
    var costCut = Number(els.costCut.value);

    valEls.redFee.textContent = fmt(redFee);
    valEls.plasmaPrice.textContent = fmt(plasmaPrice);
    valEls.plasmaVol.textContent = plasmaVol.toFixed(2) + " L";
    valEls.baseCost.textContent = fmt(baseCost);
    valEls.costCut.textContent = costCut + "%";

    var effCost = baseCost * (1 - costCut / 100);
    var plasmaRev = plasmaPrice * plasmaVol;
    var margin = redFee + plasmaRev - effCost;

    outEls.redCells.textContent = fmt(redFee);
    outEls.plasmaRev.textContent = fmt(plasmaRev);
    outEls.effCost.textContent = fmt(effCost);
    outEls.margin.textContent = (margin >= 0 ? "+" : "\u2212") + fmt(Math.abs(margin));
    outEls.margin.style.color = margin >= 0 ? "var(--up)" : "var(--down)";
  }
  Object.keys(els).forEach(function(k){
    if(els[k]) els[k].addEventListener("input", recalc);
  });
  var segBtns = document.querySelectorAll("#centreToggle button");
  segBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      segBtns.forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      centre = btn.getAttribute("data-centre");
      if(els.redFee){
        els.redFee.value = centre === "private" ? 1550 : 1100;
        recalc();
      }
    });
  });
  if(els.baseCost) els.baseCost.value = BASE_COST_DEFAULT;
  recalc();

  /* ---- Reveal on scroll ---- */
  if("IntersectionObserver" in window && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal, .stage, .hero-notes").forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll(".reveal, .stage, .hero-notes").forEach(function(el){ el.classList.add("in"); });
  }
})();
