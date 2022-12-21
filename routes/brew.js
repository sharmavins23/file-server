// The server attempts to brew coffee, but fails.
// This is a good sample of how to make routes!

// This is the function that our route will handle. It takes in the app, and
//  defines how the route should be handled
function brew(app) {
    // This can be any HTTP verb - post, patch, put, etc.
    // We'll use get for now, because it's simple
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
    app.get(
        // This configures where a client should look to try and brew coffee
        // In a more simple way, this is the "website" "url" that people use
        // i.e. http://localhost:8008/brew
        "/brew",
        // This is the arrow notation function that the route calls when a
        //  client calls /brew/
        // The "request" is what the client sends to US. So, it can be options
        //  or whatnot, or any data
        // The "response" is what we send back.
        (request, response) => {
            let responseMessage = "<h1>I'm a teapot, so I cannot brew coffee!</h1>";

            // Send the response for brewing coffee
            response
                .status(418) // This is the HTTP status code 418: I'm a teapot
                .send(responseMessage); // We'll send back plaintext for now
        }
    );
}

// We have to export said function!
module.exports = brew;