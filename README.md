INSTRUCTIONS - Setting up a simple AuthTokenServer using Node.js

  1)  Install node.js:  http://nodejs.org/download/
  
  2)  Download this file and its directory and unzip it (assuming you've already done that step if you are reading this!)
  
  3)  Install Express for Node.js.  A good tutorial here:  http://expressjs.com/guide.html  (but skip to next step to do required actions)
          command:  npm info express version
      that will give you the current version of Express.
      
  4)  Open the package.json file that you unzipped in step 2 and make sure the version of Express matches what you got in the previous step
  
  5)  Install the proper version of Express.  (make sure you are in the directory with the package.json file)
          command:  npm install   (NOTE: you may be to have super-user privilidges.  On MacOS, use "sudo" command)
          
  6)  Edit this file and change the placeholder keys below with the keys you recieved from the Developer Portal:  https://developer.autodesk.com
  
  7)  From Terminal window, type the following command:
          command: node AuthTokenServer.js
          
  8)  Test by going to the Chrome browser and type in the following URL:  http://127.0.0.1:5000/auth
          you should get a response like:  {"token_type":"Bearer","expires_in":1799,"access_token":"m2Y1gIgXYZZZZZZNzYgmQYoqK0"}

  9)  Now, from your actual browser app, you need to make an HTTP request to that same URL and then use the "access_token" to pass on to 
      your API calls for the Viewing Service.  See sample apps for a class called "MyAuthToken" for an example of how to do this.


