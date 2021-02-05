const fs = require('fs');
const stream = require('stream');
const axios = require('axios');

const fileStream = fs.createReadStream('../res/websites.txt');
fileStream.setEncoding('utf8');

let arrayOfWebsites = [];
let currentLine = 0;

/* To avoid having to reread the file multiple times, create an array to store the websites. But can hog memory depending on the size of the file.
 * Also, check the format of the  websites.txt file. This assumes that there is no formatting and that the websites are delimited by \n.
 */

// Consider readline instead of relying on data to buffer by lines

fileStream.on('error', (err) => {
    console.error(err.stack);
    
}).on('data', website => {
    arrayOfWebsites.push(website);
    
}).on('end', () => {
    console.log('File read finished');
    arrayOfWebsites.map(website => website.trim()); //remove whitespace
});

// Given all the individual responses, the following function compares the responses and returns a single response
// Returns an array containing all the required information, or if the website does not have it, returns null
function checkResults(arrayOfAllResults) {
    arrayOfAllResults.forEach( (promise) => {
        let finalResult = [];
        
        // Get the result object from the .then handler attached each promise
        let result = promise.then(result => { 
            return result;
        });
        
        // firstly check if response.data is empty, i.e. the specified barcodeID doesn't exist on the website
        if (Object.keys(result.data).length === 0) {        
            for (let dataField of result.data) {
                // Run some specific comparator functions here. For each individual data field in result.data, the corresponding entry in finalResult will be checked. If the corresponding entry is empty, finalResult will take on the value of the data field. Else the comparator functions will compare and choose which one to take
            }
        }
        return finalResult;
    });
};

// Refactor and simplify - axios has its own axios.all method that works just the same as Promise.all

// Use async/await to avoid running each request sequentially, instead run multiple requests parallely  
exports.getInformation = async function(value) {
    let promises = [arrayOfWebsites.length];

    promises = arrayOfWebsites.map(async (website) => {
        return axios.get(website, { 
            barcodeID: value }
        ).catch((err) => {
            err;
        }
    }
    
    let arrayOfAllResults = await Promise.all(promises).catch(err => console.error(err.stack));
    
    // Fix error handling issue - for Promise.all, one even one error will cause all the requests to halt and return error --> current implementation is to use create 2 arrays, need to test impact on performance and asynchronosity <-- otherwise implement AbortController class? 
    // The original Promise.all code
    /*
    await Promise.all(arrayOfWebsites.map(async (website) => {
        let resultOfRequest = await axios.get(website, { barcodeID: value });
        arrayOfAllResults.push(resultOfRequest);
    
    */
    
    return checkResults(arrayOfAllResults);
};
