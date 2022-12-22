// When the server starts up, it can read in all of the JavaScript files in this
//  folder, and import all of them

// We'll use fs, or JavaScript's file system structure, to read through all of
//  the code files in this folder. JavaScript can then import each and every
//  one of the files so we don't have to do so manually!
const fs = require("fs");

// This is the function that will go through all of the JavaScript files in the
//  folder, and import them individually. This saves us headache (as if we want
//  to add in more routes later, we don't have to manually import them in the 
//  index.js file.)
function dynamicallyLoadRoutes(app) {
    // Read through all of the files in this directory
    // This returns an array of file NAMES (strings)
    // readdirSync tells JavaScript that we want to read through them each
    //  individually, and not all in parallel, because JavaScript likes doing
    //  things in parallel and we don't want that.
    // __dirname is a reserved keyword for the current directory name, so it'll
    //  tell JavaScript that we want to read within /routes/...
    let filenames = fs.readdirSync(__dirname);

    // Now let's apply a function to each file. Remember the () => {} arrow
    //  notation? This line says "hey, for each file, let's do this function"
    // The file is passed in as a parameter for the function
    filenames.forEach((filename) => {
        // Since this returns a list of files, that list of files will also have
        //  DLR.js. We don't want to double import this file so we have to skip
        //  it. While we're skipping, let's also skip anything that's not a 
        //  JavaScript file
        if (
            // Triple equals makes JavaScript compare the strings more strictly
            filename === "DLR.js" ||
            // This is a complicated string. Basically, we want to see what file
            //  extension the file has (so "test.js" should return "js")
            // We find the last index of ".", and move past the "." character.
            //  Hence the + 1.
            // We then find the substring, which takes in a start and optionally
            //  a stop. Since we only pass one thing in, that's the start
            //  So, the substring starts after the "." and ends at the end
            filename.substr(filename.lastIndexOf(".") + 1) !== "js"
        ) {
            // If any of those conditions are met, we don't want to do anything
            //  to this file. So, return from this small function
            return;
        }

        // Let's instead use the substring to get the filename. Note that a file
        //  is named "filename.js"; We've already skipped any non ".js" files.
        // So, instead of skipping past the "." and getting the substring there,
        //  let's instead get the start of it up to the "."
        let jsModule = filename.substr(0, filename.indexOf("."));
        // Now we're going to import the filename, similarly to how we did in 
        //  the index.js file
        // The "./" is because we're loading that in as a route. So if we visit
        //  https://localhost:8008/test and we had a test.js file, it would work
        // The (app) thing passes in the expressJS app into the file as a
        //  parameter to a function
        require("./" + jsModule)(app);
    });
}

// This file is a "module", and we'll have the "module" "export" a function.
// This function simply goes through all of the files in the /routes/ folder,
//  reads their name, and imports them.
module.exports = dynamicallyLoadRoutes;