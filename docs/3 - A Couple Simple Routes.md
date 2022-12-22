# A Couple Simple Routes

Let's step up our JavaScript project by creating an actual _server_. We'll use
Express.js to simplify this procedure significantly.

# Installation and imports

## Installing and importing Express

In the command line, type `npm i express` to install Express.js. This will
install the files into your `./node_modules` folder, which is an extremely large
folder that contains reused code from other people.

In `./index.js`, we can import it:

```js
const express = require("express");
```

The "require" statement looks up and caches a module. Basically, it "imports"
Express.js.

Why would we not use `import`? `import` only works in a JavaScript "module",
which this is not. JavaScript modules are overcomplicated to set up and we don't
need them.

We set this as a `const` because we don't want to be modifying any of the
Express.js code that was provided for us.

## A helper for logging

When we get requests to our server, it'd be nice if we can easily see who's
accessing what. So, we'll log them using `morgan`.

In the command line, `npm i morgan`. Then, we can import it the same way in our
`./index.js` file:

```js
const express = require("express");
const morgan = require("morgan");
```

We should be done with all of our imports now.

# Setting up our server to run

## Port number

Let's start by picking a port to run. For a detailed list, see the
[Wikipedia List of TCP and UDP port numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers).

We can arbitrarily choose to use any port number, but if it collides with a port
of a server that's already running then it might get some of the data from that
server (and vice versa!) As such, we'll arbitrarily choose port `8008`:

```js
const port = 8008;
```

## Creating our server

Now, let's have Express.js handle creating our server:

```js
const app = express();
app.use(express.json());
app.use(morgan("dev"));
```

We can tell this app to use JSON requests, or that we want to be able to send
and receive JSON data to and from the server. We can change this later, but it's
valuable to have.

We also tell the app to use Morgan to enable logging. This will (on a basic
level) pretty-print any requests coming in or going out. The `"dev"` string
passed in is an option, which tells Morgan to run in verbose mode. There are
other options on Express.js's
[Morgan](https://expressjs.com/en/resources/middleware/morgan.html)
documentation.

## Creating a Hello, World! route

Next, let's create a simple route for our server to test that it works.

```js
app.get("/", (request, response) => {
    let responseMessage = "Hello, World!";

    response
        .status(200) // HTTP Status Code 200: OK
        .send(responseMessage);
});
```

This will be a simple route for us. When we start up our server, and visit it,
we should get back "Hello, World!"

The `app.get` can be changed up to `app.post`, `app.put`, `app.patch`, etc. This
is any **predefined** HTTP verb, which indicates what the server and client are
doing together on a basic level. More HTTP methods can be found
[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

The string passed in `"/"` is the route. For instance, if we were running this
server on `http://example.com`, the route there would be `http://example.com/`,
so when we visit that site, THIS function would be called. If we instead passed
in `"/hello"`, we could visit `http://example.com/hello` in order to call this
function.

Finally, we pass in a function. The function has two parameters - A request, and
a response. The request is what the client sends to our server, and the response
is what we send back.

Note that we define a `.status()` code. These status codes are also predefined,
and we can choose them. Generally, they're grouped in five classes:

1. Informational responses (`100` - `199`): The server is returning some
   information, but still processing.
2. Successful responses (`200` - 299`): The server has successfully completed a
   request.
3. Redirection responses (`300` - `399`): The server is redirecting the client
   to another server.
4. Client error responses (`400` - `499`): Somewhere, somehow, the client messed
   up, but the server is not at fault.
5. Server error responses (`500` - `599`): Somewhere, somehow, the server messed
   up, and the client is (probably) not at fault.

All of the responses are listed
[here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). We'll
implement another one later.

## Making our server run

At the **bottom** of our `./index.js` file, we can have the server run. This
**must** be at the bottom of the file, as it will spin constantly (since it's
running the server!)

```js
app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
});
```

The port is passed in, so the server is listening on that port.

The second passed-in thing is the function that is run ONCE when the server
starts listening, after configuration.

If we again run `npm start` in the command line, and go to the website
`http://localhost:8008/` on any browser, we should see "Hello, World!".
Congrats! You now have a server running.

# Adding another route

We can add more routes to this structure. **Above** the `app.listen()` call, but
after the `app.get` call, let's add another `app.get`:

```js
app.get("/brew", (request, response) => {
    let responseMessage = "<h1>I'm a teapot, so I cannot brew coffee!</h1>";

    response
        .status(418) // HTTP Status Code 418: I'm a teapot
        .send(responseMessage);
});
```

Now if we rerun our server, and visit `http://localhost:8008/brew`, we should
see in big letters, "I'm a teapot, so I cannot brew coffee!"

What's going on here? Well, we note that we can send HTML as plaintext to the
user. The client/user can receive this (through a browser) and view it as a
webpage. This is the fundamental concept behind webpages - At the end of the
day, they're simply just large file servers, where the server sends the file to
us for simple use.

We can extend this structure in order to make a **fully** functional website at
this point. Each individual page is simply a different route, and we can use
this routing structure to make as many pages as we want (extremely easily!)
