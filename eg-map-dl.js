// ==UserScript==
// @name         Evergore Map Downloader
// @version      0.1.3b
// @description  Passt die canvas Größe und CSS an, damit die ganze Karte dargestellt wird und versteckt störende Layer, damit ein Download möglich ist.
// @author       mofte
// @match        https://evergore.de/lenoran?page=map
// ==/UserScript==

(function() {
    'use strict';

    // Helper function to style buttons uniformly
    function styleButton(button) {
        button.style.padding = '10px 20px';
        button.style.cursor = 'pointer';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '5px';
        button.style.backgroundImage = 'url("https://evergore.de/skins/komo/gfx/th.png")';
        button.style.backgroundSize = 'cover';
        button.style.color = 'black'; // Text color on the background
        button.style.fontWeight  = 'bold'; 
    }

    // Function to activate specific checkboxes immediately
    function activateCheckboxes() {
        const checkboxes = [
            document.querySelector('input[type="checkbox"][data-bit="1"]'),
            document.querySelector('input[type="checkbox"][data-bit="6"]')
        ];

        checkboxes.forEach(checkbox => {
            if (checkbox) {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    }

    // Function to adjust canvas size and hide elements
    function adjustCanvas() {
        const mapDisplay = document.getElementById('mapDisplay');
        if (mapDisplay) {
            const divWidth = parseInt(mapDisplay.style.width); // Extract numeric value from mapDisplay width
            const divHeight = parseInt(mapDisplay.style.height); // Extract numeric value from mapDisplay height
        
            const canvasElements = ['mapCanvas', 'veilCanvas', 'canvas'];
            canvasElements.forEach(id => {
                const canvas = document.getElementById(id);
                if (canvas) {
                    canvas.width = divWidth; // Set width based on mapDisplay
                    canvas.height = divHeight; // Set height based on mapDisplay;
                    canvas.style.display = (id === 'mapCanvas') ? 'block' : 'none'; // Only show mapCanvas
                }
            });
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
                        if (rule.style) {
                            if (rule.style.maxWidth === 'calc(100% - 170px)') rule.style.maxWidth = '';
                            if (rule.style.maxHeight === '550px') rule.style.maxHeight = '';
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
            mapDisplay.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
        }
    }

    // Function to create and add the buttons
    function addButtons() {
        const heading = document.querySelector('h1'); 
        const mapDisplayContainer = document.querySelector('#mapDisplay');
        if (!heading || !mapDisplayContainer) return; // Exit if elements are not found

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.marginTop = '10px';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.justifyContent = 'center'; // Center buttons

        // Buttons creation
        const buttons = {
            startButton: createButton('Skript zum Herunterladen starten', 'start'),
            openButton: createButton('Karte in neuem Tab öffnen', 'open'),
            downloadButton: createButton('Karte herunterladen', 'download'),
            endButton: createButton('Skript beenden', 'end')
        };

        // Initially hide buttons except "startButton"
        buttons.endButton.style.display = buttons.openButton.style.display = buttons.downloadButton.style.display = 'none';

        // Append buttons to the container
        Object.values(buttons).forEach(button => buttonContainer.appendChild(button));

        heading.parentNode.insertBefore(buttonContainer, heading.nextSibling);

        // Event Listeners
        buttons.startButton.addEventListener('click', onStartClick);
        buttons.endButton.addEventListener('click', onEndClick);
        buttons.openButton.addEventListener('click', onOpenClick);
        buttons.downloadButton.addEventListener('click', onDownloadClick);

        // Create button function
        function createButton(text, type) {
            const button = document.createElement('button');
            button.innerHTML = text;
            styleButton(button);
            button.dataset.type = type;
            return button;
        }

        // "Skript zum Herunterladen starten" click handler
        function onStartClick() {
            buttons.startButton.style.display = 'none';
            activateCheckboxes();

            setTimeout(() => {
                adjustCanvas();
                deactivateCSS();
                simulateZoom();
                buttons.openButton.style.display = 'inline-block';
                buttons.downloadButton.style.display = 'inline-block';
                buttons.endButton.style.display = 'inline-block';
            }, 1000);
        }

        // "Skript beenden" click handler (reload the page)
        function onEndClick() {
            window.location.reload();
        }

        // "Karte in neuem Tab öffnen" click handler
        function onOpenClick() {
            const mapCanvas = document.getElementById('mapCanvas');
            if (mapCanvas) {
                const imageUrl = mapCanvas.toDataURL('image/png');
                const newTab = window.open();
                newTab.document.body.innerHTML = `<img src="${imageUrl}" />`;
            }
        }

        // "Karte herunterladen" click handler
        function onDownloadClick() {
            const mapCanvas = document.getElementById('mapCanvas');
            if (mapCanvas) {
                const imageUrl = mapCanvas.toDataURL('image/png');
                const link = document.createElement('a');
                const today = new Date();
                const dateString = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                link.href = imageUrl;
                link.download = `lenoran-karte-${dateString}.png`;
                link.click();
            }
        }
    }

    // Execute on page load
    window.addEventListener('load', addButtons);

})();
