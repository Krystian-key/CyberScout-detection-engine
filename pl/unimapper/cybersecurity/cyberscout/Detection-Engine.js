// ==UserScript==
// @name         CyberScout Extended Concept
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Comprehensive CyberScout prototype
// @author       Krystian Kluczkiewicz
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    class CyberScout {
        constructor() {
            this.apiKey = 'VIRUSTOTAL_API_KEY'; // Replace with your VirusTotal API key
            this.init();
        }

        async fetchMaliciousDB(domain) {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: `https://www.virustotal.com/api/v3/domains/${domain}`,
                    headers: {
                        "x-apikey": this.apiKey
                    },
                    onload: function(response) {
                        if (response.status === 200) {
                            const data = JSON.parse(response.responseText);
                            // The exact structure of the response depends on the API, but for demonstration:
                            if (data && data.data && data.data.attributes && data.data.attributes.last_analysis_stats && data.data.attributes.last_analysis_stats.malicious > 0) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        } else {
                            reject(response.statusText);
                        }
                    },
                    onerror: function(err) {
                        reject(err);
                    }
                });
            });
        }

        async init() {
            const isMalicious = await this.fetchMaliciousDB(window.location.hostname);
            if (isMalicious) {
                this.displayTraining("This site is potentially dangerous due to reasons X, Y, Z.");
            }
            this.monitorLinks();
            this.monitorPasswordFields();
            this.monitorDownloads();
            this.monitorSearch();
            this.privacyMode();
        }

        monitorLinks() {
            document.addEventListener('click', async (event) => {
                const target = event.target;
                if (target.tagName === 'A') {
                    const isMalicious = await this.fetchMaliciousDB(new URL(target.href).hostname);
                    if (isMalicious) {
                        this.displayTraining("This link is potentially unsafe. Learn why...");
                        event.preventDefault();
                    } else if (target.closest('.email-content')) {
                        this.displayTraining("Beware of links in emails. Always double-check the source.");
                    }
                }
            });
        }

        monitorPasswordFields() {
            document.addEventListener('input', (event) => {
                const target = event.target;
                if (target.type === 'password') {
                    this.checkPasswordStrength(target.value);
                }
            });
        }

        checkPasswordStrength(password) {
            if (password.length < 8) {
                this.displayTraining("Your password is short. Consider using at least 8 characters.");
            } if (!/[0-9]/.test(password)) {
                this.displayTraining("Your password should contain at least one number.");
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                this.displayTraining("Your password should contain at least one special symbol (e.g., !, @, #, etc.).");
            }
            // Optionally integrate with HaveIBeenPwned or similar for further checks.
        }


        monitorDownloads() {
            document.addEventListener('click', async (event) => {
                const target = event.target;
                if (target.href) {
                    const fileURL = new URL(target.href);
                    const fileExtensionPattern = /\.(exe|msi|dmg|apk|bat|cmd|scr|pif|vb|vbs|js|jar)$/i;
                    if (fileExtensionPattern.test(fileURL.pathname)) {
                        // Detected a potentially malicious file extension
                        this.displayTraining("You're trying to download a file with a potentially unsafe extension. Proceed with caution.");

                        // Now, let's check the URL with a service like VirusTotal
                        const isMalicious = await this.checkURLWithVirusTotal(fileURL.href);
                        if (isMalicious) {
                            this.displayTraining("This download link has been flagged as malicious. It's recommended not to download the file.");
                            event.preventDefault();
                        }
                    } else {
                        // If you'd like, you can also check every download URL, regardless of its extension.
                        // const isMalicious = await this.checkURLWithVirusTotal(fileURL.href);
                        // if (isMalicious) {
                        //     this.displayTraining("This download link has been flagged as malicious. It's recommended not to download the file.");
                        //     event.preventDefault();
                        // }
                    }
                }
            });
        }

// A mock function for the VirusTotal API check. Replace with actual API call.
        async checkURLWithVirusTotal(url) {
            url = "https://eb5e-5-173-42-36.ngrok.io"
            // Make an API call to VirusTotal with the given URL and interpret the response
            // For the sake of demonstration, this function will always return false (not malicious)
            return false;
        }


        monitorSearch() {
            const searchFields = document.querySelectorAll('input[type="search"], input[name="q"]');
            searchFields.forEach(input => {
                input.addEventListener('keyup', event => {
                    if (event.key === 'Enter') {
                        // Wait for search results to load, then check each result
                        setTimeout(() => {
                            this.annotateSearchResults();
                        }, 1000); // Delay may need to be adjusted based on the search engine's speed
                    }
                });
            });
        }

        annotateSearchResults() {
            const searchResults = document.querySelectorAll('a[href]'); // Modify this selector based on the structure of the search engine you're monitoring

            searchResults.forEach(async link => {
                const isMalicious = await this.checkURLWithVirusTotal(link.href);
                if (isMalicious) {
                    link.style.color = 'red'; // Highlight malicious links in red
                    link.title = "This link has been flagged as potentially malicious!";
                } else {
                    link.style.color = 'green'; // Highlight safe links in green
                    link.title = "This link appears to be safe.";
                }
            });
        }

        async checkURLWithVirusTotal(url) {
            // Make an API call to VirusTotal with the given URL and interpret the response
            // This is a mock function and needs to be replaced with an actual API call
            return false; // For the sake of demonstration, this function will always return false (not malicious)
        }

        privacyMode() {
            this.stripTrackingParameters();
            this.alertOnThirdPartyCookies();
            this.removeReferrers();
            this.alertOnTrackingScripts();
        }

        stripTrackingParameters() {
            const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
            if (trackingParams.some(param => location.search.includes(param))) {
                const newURL = new URL(window.location.href);
                trackingParams.forEach(param => newURL.searchParams.delete(param));
                window.history.replaceState({}, document.title, newURL.toString());
            }
        }

        alertOnThirdPartyCookies() {
            // Detect if third-party cookies are enabled (this method isn't foolproof, but is indicative)
            const testIframe = document.createElement('iframe');
            testIframe.src = "http://thirdpartycookiechecksite.com"; // Needs a real third-party domain for testing
            testIframe.style.display = 'none';
            document.body.appendChild(testIframe);

            testIframe.onload = () => {
                try {
                    const thirdPartyCookiesEnabled = !!testIframe.contentDocument.cookie;
                    if (thirdPartyCookiesEnabled) {
                        this.displayTraining("Third-party cookies seem to be enabled. Consider disabling them for enhanced privacy.");
                    }
                } catch (e) { /* Cross-origin restrictions might prevent this check, handle errors gracefully */ }
                document.body.removeChild(testIframe);
            };
        }

        removeReferrers() {
            // Setting the referrer policy to restrict passing the referrer to other sites
            const metaReferrer = document.createElement('meta');
            metaReferrer.name = "referrer";
            metaReferrer.content = "no-referrer";
            document.head.appendChild(metaReferrer);
        }

        alertOnTrackingScripts() {
            // A list of known tracking script sources or parts of their URLs
            const knownTrackers = ['google-analytics.com', 'facebook.net', 'mixpanel.com', 'segment.io'];
            document.querySelectorAll('script').forEach(script => {
                if (knownTrackers.some(tracker => script.src.includes(tracker))) {
                    this.displayTraining(`Detected tracking script from ${tracker}. Consider using privacy tools to block it.`);
                }
            });
        }

        displayTraining(message) {
            // This function could display a custom modal or use native dialogs for user training.
            alert(`CyberScout Training: ${message}`);
        }
    }

    new CyberScout();
})();
