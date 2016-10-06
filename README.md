# Deprecated sample - not maintained anymore (Summer 2016)

## INSTRUCTIONS - Setting up a simple AuthTokenServer using Node.js

  1)  Install node.js:  http://nodejs.org/download/
  
  2)  Download or clone this project to your local machine
  
  3)  Install Express for Node.js.  A good tutorial here:  http://expressjs.com/guide.html  (but skip to next step to do required actions)
          command:  npm info express version
      that will give you the current version of Express.
      
  4)  Open the package.json file that you unzipped in step 2 and make sure the version of Express matches what you got in the previous step
  
  5)  Install the proper version of Express.  (make sure you are in the directory with the package.json file)
          command:  npm install   (NOTE: you may to have super-user privilidges.  On MacOS, use "sudo" command)
          
  6)  Edit the file AuthTokenServer.js and change the placeholder keys at the bottom with the keys you received from the Developer Portal:  https://developer.autodesk.com
  
  7)  From a Terminal window, type the following command:
          command: node AuthTokenServer.js
          
  8)  Test by going to the Chrome browser and type in the following URL:  http://127.0.0.1:5000
          you should get a response that says "I'm alive!"
          
  9)  Test that you can return an auth token by typing in the following URL: http://127.0.0.1:5000/auth
          you should get a response like:  {"token_type":"Bearer","expires_in":1799,"access_token":"m2Y1gIgXYZZZZZZNzYgmQYoqK0"}

 10)  Now, from your actual browser app, you need to make an HTTP request to that same URL and then use the "access_token" to pass on to 
      your API calls for the Viewing Service.  See sample apps for a class called "MyAuthToken" for an example of how to do this.
      
 11)  So far, you are running locally.  When you deploy your app on a service such as Heroku, deploy this token service on one machine (a Node server)
      and deploy your app on another.


