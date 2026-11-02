/* THE CREATIVE LAB — script.js */


/* 1. ELEMENTEN */

   const header = document.querySelector("header");
   const navigation = header.querySelector("nav");
   const main = document.querySelector("main");
   
   // De homepage herken je aan de video in de eerste sectie
   const isHome = main.querySelector(":scope > section:first-child > video") !== null;
   
   /* BRONNEN / HULP:
   ChatGPT (OpenAI) — ondersteuning bij het schrijven, verbeteren
   en begrijpen van JavaScript, CSS en het oplossen van fouten.
   MDN Web Docs — addEventListener:
   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   MDN Web Docs — Intersection Observer API:
   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
*/
   /* 2. HEADER: logo, zoeken, winkelmandje, hamburger */
   
   // Logo
   const logo = document.createElement("a");
   // Op de productpagina brengt het logo je terug naar home
   logo.href = isHome ? "#" : "home.html";
   logo.textContent = "THE CREATIVE LAB";
   logo.setAttribute("aria-label", "The Creative Lab home");
   header.appendChild(logo);
   
   // Iconen staan in een <menu> met <li>'s
   // Links naast de hamburger: zoeken. Rechts: account en winkelmandje.
   function makeIconItem(label, shapes) {
       const item = document.createElement("li");
       const button = document.createElement("button");
   
       button.type = "button";
       button.setAttribute("aria-label", label);
       button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${shapes}</svg>`;
   
       item.appendChild(button);
       return item;
   }
   
   const searchShapes = `
       <circle cx="10.5" cy="10.5" r="6.5"></circle>
       <line x1="15.5" y1="15.5" x2="21" y2="21"></line>`;
   
   const accountShapes = `
       <circle cx="12" cy="8" r="4"></circle>
       <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"></path>`;
   
   const cartShapes = `
       <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6"></path>
       <circle cx="10" cy="20" r="1"></circle>
       <circle cx="18" cy="20" r="1"></circle>`;
   
   const leftActions = document.createElement("menu");
   leftActions.appendChild(makeIconItem("Search", searchShapes));
   
   const rightActions = document.createElement("menu");
   rightActions.appendChild(makeIconItem("Account", accountShapes));
   rightActions.appendChild(makeIconItem("Shopping cart", cartShapes));
   
   header.appendChild(leftActions);
   header.appendChild(rightActions);
   
   // Hamburger
   // BRON: MDN Web Docs — addEventListener
   // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   // Gebruikt om klik- en toetsenbordinteracties aan de navigatie toe te voegen.
   const menuButton = document.createElement("button");
   menuButton.type = "button";
   menuButton.setAttribute("aria-label", "Open menu");
   menuButton.setAttribute("aria-expanded", "false");
   
   for (let i = 0; i < 3; i++) {
       menuButton.appendChild(document.createElement("span"));
   }
   
   header.appendChild(menuButton);
   
   
   /* 3. MENU OPEN / DICHT  (animatie 5) */
   
   function openMenu() {
       header.dataset.menu = "open";
       menuButton.setAttribute("aria-expanded", "true");
       menuButton.setAttribute("aria-label", "Close menu");
   }
   
   function closeMenu() {
       header.dataset.menu = "closed";
       menuButton.setAttribute("aria-expanded", "false");
       menuButton.setAttribute("aria-label", "Open menu");
   }
   
   menuButton.addEventListener("click", () => {
       if (header.dataset.menu === "open") {
           closeMenu();
       } else {
           openMenu();
       }
   });
   
   // Menu sluit bij klik op een link
   navigation.querySelectorAll("a").forEach((link) => {
       link.addEventListener("click", closeMenu);
   });
   
   // Menu sluit met Escape
   document.addEventListener("keydown", (event) => {
       if (event.key === "Escape") {
           closeMenu();
       }
   });
   
   /* BRONNEN / HULP:
   ChatGPT (OpenAI) — ondersteuning bij het schrijven, verbeteren
   en begrijpen van JavaScript, CSS en het oplossen van fouten.
   MDN Web Docs — addEventListener:
   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   MDN Web Docs — Intersection Observer API:
   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
*/
   /* 4. SCROLL-ANIMATIE */
   
   const revealElements = main.querySelectorAll(
       ":scope > section:not(:first-child) > :is(h2, p, figure, article, a)"
   );
   // BRON: MDN Web Docs — Intersection Observer API
   // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   // Gebruikt om elementen zichtbaar te maken wanneer ze tijdens het scrollen in beeld komen.
   const revealObserver = new IntersectionObserver(
       (entries) => {
           entries.forEach((entry) => {
               if (entry.isIntersecting) {
                   entry.target.dataset.reveal = "visible";
                   revealObserver.unobserve(entry.target);
               }
           });
       },
       {
           threshold: 0.1,
           rootMargin: "0px 0px -5% 0px"
       }
   );
   
   revealElements.forEach((element, index) => {
       element.dataset.reveal = "hidden";
       element.style.setProperty("--delay", `${(index % 4) * 0.06}s`);
       revealObserver.observe(element);
   });
   
   /* BRONNEN / HULP:
   ChatGPT (OpenAI) — ondersteuning bij het schrijven, verbeteren
   en begrijpen van JavaScript, CSS en het oplossen van fouten.
   MDN Web Docs — addEventListener:
   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   MDN Web Docs — Intersection Observer API:
   https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
*/
   /* 5. ALLEEN HOMEPAGE: carousels en partners */
   
   if (isHome) {
   
       /* Carousels */
   
       const carousels = main.querySelectorAll(
           ":scope > section:nth-child(4) > ul, " +
           ":scope > section:nth-child(6) > ul, " +
           ":scope > section:nth-child(7) > ul:last-of-type"
       );
   
       carousels.forEach((carousel) => {
   
           // Bereikbaar met het toetsenbord
           carousel.setAttribute("tabindex", "0");
   
           // Slepen met de muis (op touch scrolt de browser zelf).
           // Pas na 5px bewegen begint het slepen, zodat een gewone
           // klik op een product nog gewoon naar de link gaat.
           let isPressed = false;
           let isDragging = false;
           let startX = 0;
           let startScrollLeft = 0;
   
           carousel.addEventListener("pointerdown", (event) => {
               if (event.pointerType === "touch") {
                   return;
               }
   
               isPressed = true;
               isDragging = false;
               startX = event.clientX;
               startScrollLeft = carousel.scrollLeft;
           });
   
           carousel.addEventListener("pointermove", (event) => {
               if (!isPressed) {
                   return;
               }
   
               const distance = event.clientX - startX;
   
               if (!isDragging && Math.abs(distance) > 5) {
                   isDragging = true;
                   carousel.dataset.dragging = "true";
                   carousel.setPointerCapture(event.pointerId);
               }
   
               if (isDragging) {
                   carousel.scrollLeft = startScrollLeft - distance * 1.3;
               }
           });
   
           const stopDragging = (event) => {
               isPressed = false;
               isDragging = false;
               delete carousel.dataset.dragging;
   
               if (carousel.hasPointerCapture(event.pointerId)) {
                   carousel.releasePointerCapture(event.pointerId);
               }
           };
   
           carousel.addEventListener("pointerup", stopDragging);
           carousel.addEventListener("pointercancel", stopDragging);
   
           // Pijltjestoetsen
           carousel.addEventListener("keydown", (event) => {
               if (event.key === "ArrowRight") {
                   event.preventDefault();
                   carousel.scrollBy({ left: 220, behavior: "smooth" });
               }
   
               if (event.key === "ArrowLeft") {
                   event.preventDefault();
                   carousel.scrollBy({ left: -220, behavior: "smooth" });
               }
           });
       });
   
   
       /* Partners (animatie 4) */
   
       const partnerList = main.querySelector(":scope > section:nth-child(9) > ul");
   
       if (partnerList) {
           Array.from(partnerList.children).forEach((partner) => {
               const copy = partner.cloneNode(true);
               copy.setAttribute("aria-hidden", "true");
               partnerList.appendChild(copy);
           });
       }
   }