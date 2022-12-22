// Get a file from the server's /data/ folder!!!

// Yet again, we're using JavaScript's FileSystem API.
const fs = require("fs");

function file(app) {
    // We could have a different route for each file, but that's a lot of work
    // Instead, we'll have the user ask for a file, and if we don't have the
    //  file handy, we'll tell the user to leave
    app.get(
        // Notice the colons here before name - This is an HTTP parameter. So,
        //  the user could pass in "image0.png" or "test.xml" or something
        //  entirely arbitrary!
        "/file/:name",
        // Again, we'll have our function for doing things.
        (request, response) => {
            // Let's start by getting the value that our client passes in
            // The name of this is specified by the SERVER, not the client, so
            //  we don't need to validate that it EXISTS
            let value = request.params.name;

            // However, we do need to validate that we actually have the file...
            // Let's use FS like we did earlier to check that the file exists
            //  in our folder
            let pathName = __dirname;
            // Remove the "routes" part at the end of the path
            pathName = pathName.substr(0, pathName.length - 6);
            // Add in the "data" part of the path
            pathName += "data\\";
            // Get a list of all of the files in our data folder
            let listOfFiles = fs.readdirSync(pathName);

            // We can check if the file is in the directory
            if (!listOfFiles.includes(value)) {
                response
                    .status(404)
                    .send("ERROR: File not found");
                return;
            }

            // At this point, our file exists and definitely is there. So let's
            //  serve it
            response.sendFile(
                // We send the file based on the image name
                value,
                // The options here tell Express where the file is located, as
                //  well as some other small bits and bobs like metadata
                {
                    root: pathName,
                    // HTTP headers!!!
                    headers: {
                        // The file was sent NOW
                        "x-timestamp": Date.now(),
                        // The file was actually sent
                        "x-sent": true
                    }
                },
                // This function gets called after the file is sent
                (error) => {
                    // If the error actually exists at all...
                    if (error) {
                        let errorMsg = `Error in sending files: ${error}`;
                        console.error(errorMsg);
                        response
                            .status(500) // HTTP Status Code 500: Internal Server Error
                            .send(errorMsg);
                        return;
                    }

                    // At this point, we definitely don't have an error
                    console.log(`File ${value} sent successfully!`);
                    response.status(200);
                    return;
                }
            );
        }
    )
}

module.exports = file;