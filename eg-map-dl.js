// ==UserScript==
// @name         Evergore Map Downloader
// @version      0.1
// @description  Passt die canvas Größe an und versteckt störende Layer, passt CSS an und fügt Buttons hinzu.
// @author       mofte
// @match        https://evergore.de/lenoran?page=map
// ==/UserScript==

(function() {
    'use strict';

    // Function to activate specific checkboxes immediately and trigger the change event
    function activateCheckboxes() {
        const checkbox1 = document.querySelector('input[type="checkbox"][data-bit="1"]');
        const checkbox6 = document.querySelector('input[type="checkbox"][data-bit="6"]');

        if (checkbox1) {
            checkbox1.checked = true;
            checkbox1.dispatchEvent(new Event('change'));
        }

        if (checkbox6) {
            checkbox6.checked = true;
            checkbox6.dispatchEvent(new Event('change'));
        }
    }

    // Function to adjust canvas size and hide elements
    function adjustCanvas() {
        const mapCanvas = document.getElementById('mapCanvas');
        const veilCanvas = document.getElementById('veilCanvas');
        const canvas = document.getElementById('canvas');

        if (mapCanvas) {
            mapCanvas.width = 2064;
            mapCanvas.height = 2640;
        }

        if (veilCanvas) {
            veilCanvas.width = 2064;
            veilCanvas.height = 2640;
            veilCanvas.style.display = 'none';
        }

        if (canvas) {
            canvas.width = 2064;
            canvas.height = 2640;
            canvas.style.display = 'none';
        }
    }

    // Function to deactivate specific CSS properties
    function deactivateCSS() {
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            const sheet = styleSheets[i];
            if (sheet.href && sheet.href.includes("https://evergore.de/skins/komo/scoped.css")) {
                try {
                    const rules = sheet.rules || sheet.cssRules;
                    for (let j = 0; j < rules.length; j++) {
                        const rule = rules[j];
                        if (rule.style && rule.style.maxWidth === 'calc(100% - 170px)') {
                            rule.style.maxWidth = '';
                        }
                        if (rule.style && rule.style.maxHeight === '550px') {
                            rule.style.maxHeight = '';
                        }
                    }
                } catch (e) {
                    console.error("Error modifying scoped CSS:", e);
                }
            }
        }
    }

    // Function to simulate a mouse wheel zoom
    function simulateZoom() {
        const mapDisplay = document.getElementById('mapDisplay');
        if (mapDisplay) {
            const wheelEvent = new WheelEvent('wheel', {
                deltaY: -100,
                bubbles: true,
                cancelable: true
            });

            mapDisplay.dispatchEvent(wheelEvent);
        }
    }

    // Function to create and add the open map in new tab, download, and end script buttons
    function addButtons() {
        const mapDisplayContainer = document.querySelector('#mapDisplay');
        const heading = document.querySelector('h1');

        if (heading && mapDisplayContainer) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.marginTop = '10px';
            buttonContainer.style.gap = '10px';
            buttonContainer.style.justifyContent = 'center'; // Center the buttons

            // Create the "Skript zum Herunterladen starten" button
            const startButton = document.createElement('button');
            startButton.innerHTML = 'Skript zum Herunterladen starten';
            startButton.style.padding = '10px 20px';
            startButton.style.cursor = 'pointer';
            startButton.style.border = '1px solid #ccc';
            startButton.style.borderRadius = '5px';
            startButton.style.backgroundImage = 'url("https://evergore.de/skins/komo/gfx/th.png")';
            startButton.style.backgroundSize = 'cover';
            startButton.style.color = 'white'; // Text color on the background

            // Create the "Skript beenden" button (initially hidden)
            const endButton = document.createElement('button');
            endButton.innerHTML = 'Skript beenden';
            endButton.style.padding = '10px 20px';
            endButton.style.cursor = 'pointer';
            endButton.style.border = '1px solid #ccc';
            endButton.style.borderRadius = '5px';
            endButton.style.backgroundImage = 'url("https://evergore.de/skins/komo/gfx/th.png")';
            endButton.style.backgroundSize = 'cover';
            endButton.style.color = 'white';
            endButton.style.display = 'none'; // Hide initially

            // Create the "Karte in neuem Tab öffnen" button (initially hidden)
            const openButton = document.createElement('button');
            openButton.innerHTML = 'Karte in neuem Tab öffnen';
            openButton.style.padding = '10px 20px';
            openButton.style.cursor = 'pointer';
            openButton.style.border = '1px solid #ccc';
            openButton.style.borderRadius = '5px';
            openButton.style.backgroundImage = 'url("https://evergore.de/skins/komo/gfx/th.png")';
            openButton.style.backgroundSize = 'cover';
            openButton.style.color = 'white'; // Text color on the background
            openButton.style.display = 'none'; // Hide initially

            // Create the "Karte herunterladen" button (initially hidden)
            const downloadButton = document.createElement('button');
            downloadButton.innerHTML = 'Karte herunterladen';
            downloadButton.style.padding = '10px 20px';
            downloadButton.style.cursor = 'pointer';
            downloadButton.style.border = '1px solid #ccc';
            downloadButton.style.borderRadius = '5px';
            downloadButton.style.backgroundImage = 'url("https://evergore.de/skins/komo/gfx/th.png")';
            downloadButton.style.backgroundSize = 'cover';
            downloadButton.style.color = 'white'; // Text color on the background
            downloadButton.style.display = 'none'; // Hide initially

            // Append all buttons to the container
            buttonContainer.appendChild(startButton);
            buttonContainer.appendChild(openButton);
            buttonContainer.appendChild(downloadButton);
            buttonContainer.appendChild(endButton); // Add the "Skript beenden" button here

            // Append the button container below the heading
            heading.parentNode.insertBefore(buttonContainer, heading.nextSibling);

            // Add event listener for the "Skript zum Herunterladen starten" button
            startButton.addEventListener('click', function() {
                // Remove the start button after it is clicked
                startButton.style.display = 'none';

                // Now run the rest of the script
                activateCheckboxes();

                setTimeout(function() {
                    adjustCanvas();
                    deactivateCSS();
                    simulateZoom();
                    openButton.style.display = 'inline-block'; // Show the "Karte in neuem Tab öffnen" button
                    downloadButton.style.display = 'inline-block'; // Show the "Karte herunterladen" button
                    endButton.style.display = 'inline-block'; // Show the "Skript beenden" button
                }, 1000); // Wait a second before executing the rest of the script
            });

            // Add event listener for the "Skript beenden" button
            endButton.addEventListener('click', function() {
                // Reload the page to reset everything back to normal
                window.location.reload();
            });

            // Add event listener for the "Open Map in New Tab" button
            openButton.addEventListener('click', function() {
                const mapCanvas = document.getElementById('mapCanvas');
                if (mapCanvas) {
                    const imageUrl = mapCanvas.toDataURL('image/png');
                    const newTab = window.open();
                    newTab.document.body.innerHTML = `<img src="${imageUrl}" />`;
                }
            });

            // Add event listener for the "Download Map" button
            downloadButton.addEventListener('click', function() {
                const mapCanvas = document.getElementById('mapCanvas');
                if (mapCanvas) {
                    const imageUrl = mapCanvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    const today = new Date();
                    const dateString = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                    link.href = imageUrl;
                    link.download = `lenoran-karte-${dateString}.png`; // Set the download filename
                    link.click();
                }
            });
        }
    }

    // Execute all functions as soon as possible after page load
    window.addEventListener('load', function() {
        addButtons(); // Initially add the "Skript zum Herunterladen starten" button
    });

})();
