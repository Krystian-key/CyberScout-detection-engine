// ==UserScript==
// @name         CyberScout Anty-Phishing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blocks access to known malicious sites and informs users
// @author       Krystian Kluczkiewicz
// @match        *://eb5e-5-173-42-36.ngrok.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=yahoo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Replace the entire content of the page with a styled warning about the malicious site.
    document.documentElement.innerHTML = `
<style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
            }
            .warning-container {
                font-size: 18px;
                text-align: center;
                padding: 40px;
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
            h1 {
                color: #d32f2f;
            }
            h2 {
                margin-top: 30px;
            }
            ul {
                text-align: left;
                display: inline-block;
            }
            li {
                margin-bottom: 10px;
            }
            .test{
            display:flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            }

        </style>
<div class=test>
    <div class="warning-container">
        <h1>Warning! Malicious Site Detected!</h1>
        <p>The malicious site you tried to access has been blocked by the CyberScout detection engine.</p>
        <p>This blockage likely occurred due to a phishing email or a malicious link redirect. It's crucial to stay vigilant against such threats and avoid clicking on suspicious links.</p>
        <h2>Recommendations:</h2>
            <ul>
                <li>Never provide personal or sensitive information unless you're certain of a site's legitimacy.</li>
                <li>Always double-check the URL in the address bar before entering any information.</li>
                <li>Regularly update your browser and security software.</li>
                <li>If you believe you've encountered this message in error, contact your IT department or CyberScout support.</li>
        </ul>
    </div>
</div>
    `;

})();
