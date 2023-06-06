# CORS Guide

## Overview
Express add-ons are run in a sandboxed iframe environment with a `null` origin, and this can cause issues when dealing with fetching from services that don't have CORS enabled or support a null origin. 

When you suspect a CORS issue, check your browser console and you will likely see a message like the following in the browser console:

```Access to fetch at '<some-url>' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

<InlineAlert slots="text" variant="success"/>

Be sure to have your browser devtools option set to "**Show CORS errors in console**". For example, in Chrome it looks like the screenshot shown below.

![Show CORS errors in Chrome screenshot](img/show-cors.png)

## Options
Some options for handling this error are described in the sections below.

### Server-side Handling
First, if you happen to have access to the endpoint server you are fetching from, you can add an `Access-Control-Allow-Origin` header with the value set to `*` in the server's response object. This wildcard setting in the header will allow access to the resources being requested by any site. However, note that this wildcard setting cannot be used with credentials. In the event that you need to use credentials, you can specify the origins that need support specifically, instead of the wildcard. Handling the headers on the server side is the ideal solution, but often times the issue occurs with services outside your control. In that case, your best bet is to use a CORS Proxy Server.

### CORS Proxy Server
Typically, the origin responsible for serving resources is also responsible for setting the access headers for those resources. However, in instances where you don't have access to the server, a proxy server can be set up to bypass the issue by acting as the intermediate server that makes the request for you, and returns the `Access-Control-Allow-Origin` header in the response with the required value needed to let the browser permit the access.

### Hosted CORS Proxy Server
One of the quickest ways to unblock your requests for testing, is to use a hosted proxy server which adds the CORS headers to the proxied request for you. For instance, `cors-anywhere` is a [NodeJS pakage](https://www.npmjs.com/package/cors-anywhere) which also has a free hosted demo server with it set up that you can use for quick testing. Open your browser to [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/) and request temporary access to the demo server with the button shown in the screenshot:

![CORS diagram](img/cors-demo.png)

Then, simply prefix the URLs you're fetching with the `cors-anywhere` demo server URL of [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/). For instance: 

```js
let cors_anywhere = "https://cors-anywhere.herokuapp.com/";
let myUrl = "https://example.com/"; 
let url = cors_anywhere+myUrl;  

fetch(url).then(function (response) {        
    console.log(response);
})
```

  You should then receive a successful response with that prefixed URL call:


`Response {type: 'cors', url: 'https://cors-anywhere.herokuapp.com/https://example.com/', redirected: false, status: 200, ok: true, …}`


<InlineAlert slots="text" variant="success"/>

Hosting your proxy server code in an online service like Cloudinary or Heroku is also a good option for handling CORS issues in your add-on development. These services provide a platform for deploying your code and can handle cross-origin requests for you. Additionally, using Cloudinary's [URL prefix feature](https://cloudinary.com/documentation/fetch_remote_images) can be a quick solution for handling CORS issues with remote images in your add-on development.


### Locally Hosted CORS Proxy Server
You can also use the `cors-anywhere` node package to create and run your own proxy server locally for testing for instance, with a few easy steps. This can be useful if you want to modify the default settings or use different functions provided by the library. Follow the steps below to install and use it. Also be sure to run it on it's own port separate from where your add-on is running. Once you have it working as desired, you can modify the settings to host it externally to suit your needs.

1. Install the `cors-anywhere` node package:

    `npm install -g cors-anywhere` (or `npm i cors-anywhere` to install it in your current directory)

2. Create a file called `server.js` in your favorite editor and add the following to it:
    
    ```js        
    // Listen on a specific host via the HOST environment variable
    var host = process.env.HOST || '0.0.0.0';
    // Listen on a specific port via the PORT environment variable
    var port = process.env.PORT || 8080;

    var cors_proxy = require('cors-anywhere');
    cors_proxy.createServer({
        originWhitelist: [], // Allow all origins
        requireHeader: ['origin', 'x-requested-with'],
        removeHeaders: ['cookie', 'cookie2']
    }).listen(port, host, function() {
        console.log('Running CORS Anywhere on ' + host + ':' + port);
    });
    ```

3. Run the server:
    `node server.js`

    or optionally pass in a host and port when you run it:
    `HOST=0.0.0.0 PORT=8080 node proxy-server.js`

<!-- <InlineAlert slots="text" variant="info"/> -->

#### HTTPS URL Support
By default, only `http` URLs are allowed with the sample code above (though the demo server supports either). To access `https` resources with your locally running script, you need to create and pass in a key and certificate in an `httpsOptions` object and include it as another object passed into the `createServer` call, such as:


```js
cors_anywhere = createServer({ 
    httpsOptions: { 
        key: fs.readFileSync(path.join(__dirname, 'key.pem')), 
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem')), 
    }, 
}); 
```
