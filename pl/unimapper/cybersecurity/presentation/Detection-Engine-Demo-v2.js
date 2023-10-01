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

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <title>CyberScout Detection Engine</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
        *{
            margin: 0;
            padding: 0;
            text-decoration: none;
            font-family: 'Orbitron', sans-serif;
            box-sizing: border-box;
            outline: 0 !important;
            text-decoration: none !important;
        }
        main {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.4);
            justify-content: space-around;
            width: 100%;
        }
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #000;
        }
        video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }
        .headerContainer {
            text-align: center;
            color: white;
            font-size: 25px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            margin-bottom: 400px;
            flex-direction: column;
        }
        h2 {
            color: orange;
            font-size: 35px;
        }
        p {
            color: white;
            font-size: 19px;
            padding: 2%;
            color: orange;
        }
        img {
            height: 100px;
        }
        .bottomContainer {
            height: 90vh;
            width: 60%;
            position: absolute;
            padding: 2%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            flex-direction: column;
            background-color: rgb(0, 0, 0);
            border-radius: 50px;
            border: 1px solid orange;
            transition: .3s ease-in-out;

            opacity: 0;
            z-index: -999;
        }
        li {
            color: white;
            text-align: left;
            font-size: 16px;
            line-height: 30px;
        }
        ul {
            padding: 2%;
        }
        @media screen and (max-width: 1000px) {
            .bottomContainer {
                width: 94%;
            }
        }
        button {
            outline: 0;
            text-decoration: none;
            background-color: transparent;
            color: yellow;
            border: 0;
            cursor: pointer;
            font-size: 20px;
        }
        .bottomContainerHeader {
            width: 100%;
            display: flex;
            justify-content: space-around
        }
        .bottomContainerHeader button {
            position: absolute;
            right: 5%;
        }
    </style>
</head>
<body>
    <video autoplay muted playsinline loop>
        <source src="https://cdn.discordapp.com/attachments/1149779730363600919/1157854587068358656/AdobeStock_497798694.webm" type="video/webm">
    </video>
    <main>
        <div class="headerContainer">
            <img src="https://cdn.discordapp.com/attachments/1149779730363600919/1157844506356498532/cyberscoutlogo.png">
            <h2>CyberScout <span style="color: white;">detection engine</span></h2>
            <button id="more">learn more</button>
        </div>
        <div class="bottomContainer">
            <div class="bottomContainerHeader">
                <h2>CyberScout</h2>
                <button id="close"><i class="fa-regular fa-circle-xmark"></i></button>
            </div>
            <img id="popimg">
            <p>This blockage likely occurred due to a phishing email or a malicious link redirect.
                It's crucial to stay vigilant against such threats and avoid clicking on suspicious links.</p>
            <ul>
                <li>Never provide personal or sensitive information unless you're certain of a site's legitimacy.</li>
                <li>Always double-check the URL in the address bar before entering any information.</li>
                <li>If you arrived at this site through an email link, report the email as phishing immediately.</li>
                <li>If you believe you've encountered this message in error, contact your IT department or CyberScout support.</li>
            </ul>
        </div>
    </main>
    <script src="https://cdn.discordapp.com/attachments/1149779730363600919/1157857714811191396/popup.js" defer></script>
</body>
</html>
    `;

    const button = document.querySelector("#more");
    button.addEventListener("click", function() {
        let bottomContainer = document.querySelector(".bottomContainer");
        bottomContainer.style.opacity = "1";
        bottomContainer.style.zIndex = "999";
    });

    const close = document.querySelector("#close");
    close.addEventListener("click", function() {
        let bottomContainer = document.querySelector(".bottomContainer");
        bottomContainer.style.opacity = "0";
        bottomContainer.style.zIndex = "-5";
    });

    const popimg = document.querySelector("#popimg");
    popimg.src = "https://cdn.discordapp.com/attachments/1149779730363600919/1157844506356498532/cyberscoutlogo.png";
})();
