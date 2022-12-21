// The "require" statement looks up and caches a module. Basically, it "imports"
// Why not "import"? "import" only works in a JavaScript "module", which this is
//  not. JavaScript modules are overcomplicated to set up and we don't need it
// This is a `const` because we don't want to be modifying any of the express
//  code that was provided so kindly to us

// Express is utilized to handle server networking and stuff for us.
const express = require("express");
// Morgan is utilized for logging the requests coming into our server in the
//  console. It also pretty prints them with nice colors
const morgan = require("morgan");

// Our TCP/UDP port number. 
// See: https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
// We can *arbitrarily* use any port number, but make sure it doesn't collide
//  with another port number in use.
const port = 8008;

// Let's create our application. Express handles the server structure, so we can
//  tell express that we want an app:
const app = express();
// Now we can tell this app that we want to use JSON requests, I.E. we want to
//  send and receive JSON data from the server. We can change this later
app.use(express.json());
// Let's also tell the app to print out any requests coming in to the console
//  via pretty print from Morgan
// The "dev" is an option, which basically tells it to run in verbose mode
// Other options: https://expressjs.com/en/resources/middleware/morgan.html
app.use(morgan("dev"));

// Let's dynamically load in all of our routes. This takes the DLR.js file and
//  handles everything for us
require("./routes/DLR")(app);

// Let's now start our server.
// Once our server is running, NONE of the code beyond this line will run, since
//  the server will spin constantly, waiting for requests.
app.listen(port, () => {
    console.log(`Server is up and running at http://localhost:${port}`);
});

// The () => {} is JavaScript arrow notation. This creates a function and passes
//  it into the app.listen() parameters. We don't name this function, so it's
//  called a "lambda" function (or an "anonymous") function. We don't name it
//  because we simply don't want to (or care to)
// The console.log() uses backticks ` in order to use the string. This allows
//  us to put in JavaScript variables and code in the string, without adding the
//  string together. It's equivalent to the following:
// console.log("Server is up and running at http://localhost:" + port);
//  It's just a little more concise.
