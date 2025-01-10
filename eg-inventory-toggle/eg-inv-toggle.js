// ==UserScript==
// @name         Evergore Inventarbeschreibungen ausklappen
// @version      0.1
// @description  Adds a button to toggle all accordion sections in Evergore's inventory page
// @author       mofte
// @match        https://evergore.de/lenoran?page=inventory
// ==/UserScript==

(function() {
    'use strict';

    // Helper function to style buttons uniformly (aus dem anderen Skript übernommen)
    function styleButton(button) {
        button.style.padding = '10px 20px';
        button.style.cursor = 'pointer';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '5px';
        button.style.backgroundImage = 'url("https://evergore.de/skins/komo/gfx/th.png")';
        button.style.backgroundSize = 'cover';
        button.style.color = 'black'; // Text color on the background
        button.style.fontWeight = 'bold';
        button.style.marginBottom = '10px'; // Abstand unter dem Button
    }

    // Funktion zum Erstellen des Buttons
    const createToggleButton = () => {
        const header = document.querySelector('h1');  // Die Überschrift "Inventar" finden
        if (header) {
            const button = document.createElement('button');
            button.textContent = 'Aus-/einklappen';
            styleButton(button); // Button im gleichen Stil wie im anderen Skript

            // Flag zur Überwachung des Zustands (ausgeklappt oder eingeklappt)
            let isExpanded = false;

            button.addEventListener('click', () => {
                // Alle <section class="accordion">-Elemente finden
                const accordions = document.querySelectorAll('section.accordion');
                if (isExpanded) {
                    // Bei erneutem Klick: height auf 0 setzen (Einklappen)
                    accordions.forEach(accordion => {
                        const content = accordion.querySelector('.content');
                        if (content) {
                            content.style.height = '0';
                        }
                    });
                    isExpanded = false;
                } else {
                    // Beim ersten Klick: height auf 'auto' setzen (Ausklappen)
                    accordions.forEach(accordion => {
                        const content = accordion.querySelector('.content');
                        if (content) {
                            content.style.height = 'auto';
                        }
                    });
                    isExpanded = true;
                }
            });

            // Button unter der Überschrift einfügen
            header.parentElement.insertBefore(button, header.nextSibling);
        }
    };

    // Funktion, um den Button zu erstellen
    window.addEventListener('load', () => {
        createToggleButton();  // Button erstellen
    });
})();
