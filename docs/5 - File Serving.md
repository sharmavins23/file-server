# File Serving

Let's get down to brass tacks - This is the final portion of the tutorial. After
this, you're on your own to tinker with this framework as you please.

We'll configure our server to serve files, thus making it a file server.
**Note:** This portion of the code is especially vulnerable in terms of
security, so it's up to you to clean this up.

# Creating our file route

We'll create a new folder called `./data/`. This can be where we store _any_
files that we wish to serve. Toss in some random files for testing, such as
images or HTML files.

Next, let's create a new route: `./routes/file.js`. This will handle serving a
file from our file server. Simple enough!

```js
// In ./routes/file.js...

const fs = require("fs");

function file(app) {
    app.get("/file/:name", (request, response) => {
        let value = request.params.name;

        let pathName = __dirname;
        pathName = pathName.substr(0, pathName.length - 6);
        pathName += "data\\";
        let listOfFiles = fs.readdirSync(pathName);
        if (!listOfFiles.includes(value)) {
            response
                .status(404) // HTTP Status Code 404: Not Found
                .send("ERROR: File not found");
            return;
        }

        response.sendFile(
            value,
            {
                root: pathName,
                headers: {
                    "x-timestamp": Date.now(),
                    "x-sent": true,
                },
            },
            (error) => {
                if (error) {
                    let errorMsg = `Error in sending files: ${error}`;
                    console.error(errorMsg);
                    response.status(400).send(errorMsg);
                    return;
                }

                console.log(`File ${value} sent successfully!`);
                response.status(200);
                return;
            }
        );
    });
}

module.exports = file;
```

Woah. That's a lot of code. Let's break it down piece by piece.

## Request parameters

First thing of note - Our route is `/file/:name`. This colon here isn't actually
typed in the browser - Instead, it's a placeholder for a particular parameter.

In our case, this parameter will be a file, if it's on the server. So, in
`./data/`, if we have a file `./data/image.png`, we expect the user to visit
`http://localhost:8008/file/image.png` and we can serve it back.

As such, we save that value into `value`, and we can access it by
`request.params.name`. The value after the colon is what we have here - If we
wrote our route as `/file/:test`, then we could access the data through
`request.params.test`.

## Path and directory names

From here, we have to format all of the paths and directories in order to _find_
the file. This is a little complicated, so I'll walk through the steps slowly.

We start by getting the current directory name via `__dirname`, which for this
folder, is something along the lines of `... ./routes`. We need to remove the
`routes` part, and add in `data/` to get to our file data, so we do so. The list
of files can be retrieved (as before, in `./routes/DLR.js`).

If the list doesn't include our value, we can send a `404` response and stop
running code (with the `return` statement, which shortcuts our code.)

## Sending the file

At this point, we know that the file exists, and that we can serve it. So, we
serve it.

`response.sendFile()` will take in a few arguments:

-   The file's name is passed in,
-   Some options are passed in, containing:
    -   The `root` specifies where the file is located absolutely on the
        machine, but that doesn't include the file name. We already computed
        this earlier through the whole `substr` function call stuff.
    -   The `headers` are HTTP headers for sending the file - We send the
        timestamp, and we tell the client that it was sent.
    -   The function takes in an error, and is run upon completion.

Let's focus on that function - If there was an error, then we'll send back an
error message and log it to the console. The status will be `500`, indicating
that some error occurred internally on the server.

Otherwise, we can simply respond with the `200` status code, indicating that the
file was sent successfully.

That's it! If we run this, we can see (in the browser) that our file was
successfully sent.
