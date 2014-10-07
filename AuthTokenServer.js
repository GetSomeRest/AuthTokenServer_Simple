// INSTRUCTIONS - Setting up a simple AuthTokenServer using Node.js
//
//  1)  Install node.js:  http://nodejs.org/download/
//  2)  Download this file and its directory and unzip it (assuming you've already done that step if you are reading this!)
//  3)  Install Express for Node.js.  A good tutorial here:  http://expressjs.com/guide.html  (but skip to next step to do required actions)
//          command:  npm info express version
//      that will give you the current version of Express. 
//  4)  Open the package.json file that you unzipped in step 2 and make sure the version of Express matches what you got in the previous step
//  5)  Install the proper version of Express.  (make sure you are in the directory with the package.json file)
//          command:  npm install   (NOTE: you may be to have super-user privilidges.  On MacOS, use "sudo" command)
//  6)  Edit this file and change the placeholder keys below with the keys you recieved from the Developer Portal:  https://developer.autodesk.com
//  7)  From Terminal window, type the following command:
//          command: node AuthTokenServer.js
//
//  8)  Test by going to the Chrome browser and type in the following URL:  http://127.0.0.1:5000/auth
//          you should get a response like:  {"token_type":"Bearer","expires_in":1799,"access_token":"m2Y1gIgXYZZZZZZNzYgmQYoqK0"}
//
//  9)  Now, from your actual browser app, you need to make an HTTP request to that same URL and then use the "access_token" to pass on to 
//      your API calls for the Viewing Service.  See sample apps for a class called "MyAuthToken" for an example of how to do this.


var https = require("https");
var express = require("express");

var app = express();

// Call the Autodesk authentication API to get a token based on our client_id and client_secret.
// When we get a response, forward that response on to the browser-based app that called us needing
// the token.

function getAuthCode(mainResponse, baseUrl, clientId, clientSecret) {
	var dataString = "client_id=" + clientId + "&client_secret=" + clientSecret + "&grant_type=client_credentials";

    var headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

	var options = {
  		host: baseUrl,
  		port: 443,
  		path: "/authentication/v1/authenticate",
  		method: "POST",
  		headers: headers,

  		// only for dev!
  		rejectUnauthorized: false,
        requestCert: true,
        agent: false
	};

	var req = https.request(options, function(res) {
  		res.setEncoding("utf8");
  		var responseString = "";

  		res.on("data", function (data) {
    		responseString += data;
  		});

  		res.on("end", function() {
            console.log(responseString);
            mainResponse.setHeader('Content-Type', 'application/json');
            mainResponse.setHeader('Access-Control-Allow-Origin', '*');
            mainResponse.send(responseString);  // forward our response onto the original call from the browser app
    	});
    });

    req.write(dataString);
    req.end();
}

// these are the URLs the browser based app will send to us to get the token.  Send one appropriate for the
// given environment.  If you only have keys for the PRODUCTION environment, then just replace those below,
// otherwise you can replace them all and easily switch environments from your browser app.

app.get("/auth", function(req, res) {
    console.log("AuthTokenServer: getting PRODUCTION token...");
        // ***** PUT YOUR PRODUCTION KEYS HERE *****
    getAuthCode(res, "developer.api.autodesk.com", "MyConsumerKey", "MyConsumerSecret");
});

app.get("/auth-stg", function(req, res) {
    console.log("AuthTokenServer: getting STAGING token...");
        // ***** PUT YOUR STAGING KEYS HERE *****
    getAuthCode(res, "developer-stg.api.autodesk.com", "MyConsumerKey", "MyConsumerSecret");
});

app.get("/auth-dev", function(req, res) {
        // need endpoint and keys for DEV
    console.log("AuthTokenServer: getting DEV token...");
        // ***** PUT YOUR DEV KEYS HERE *****
    getAuthCode(res, "developer-dev.api.autodesk.com", "MyConsumerKey", "MyConsumerSecret");
});

// test route to make sure everything is working
app.get("/", function(req, res) {
    res.send("I'm alive!");
});

app.listen(process.env.PORT || 5000);

