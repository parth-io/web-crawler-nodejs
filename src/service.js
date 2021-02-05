const url = require('url');
const requestor = require('./requestor.js');

// Parse the GET and POST value-key pairs individually, returns an object
var parseParams = function(params) {
    let arrayOfBarcodes = [params.keys().length];
    
    params.forEach((value, key) => {
        let barcodeInformation = requestor.getInformation(value);
        
        //Add barcode ID to the front as requested
        barcodeInformation.unshift(value);
        
        arrayOfBarcodes.push(barcodeInformation);
    });
    return arrayOfBarcodes;
};

// Also reduce duplication of code, refactor more of the code again
// Test if the res.on('error') listener can be inherited across child functions, use getRes.prototype?

function getRes(req, res) {
    this.req = req;
    this.res = res;
    
    res.statusCode = 200;
}

function getResGET(req, res, urlGET) {
    getRes.call(req, res);
    res.on('error', (err) => {
        console.error(err.stack);
    });
    this.urlGET = urlGET;
    
    let params = (new URL(urlGET)).searchParams;
    
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(parseParams(params)));
};

// The following code assumes that the POST request sends data in the form key=value&key1=value1. Of course, the POST request can also send data via the req.write() method which can send a JSON object.
function getResPOST(req, res) {
    getRes.call(req, res);  
    res.on('error', (err) => {
        console.error(err.stack);
    });
    let body = '';
    
    // To ensure that the stream only returns UTF-8 and not binary data
    res.setEncoding('utf8');
    
    req.on('error', (err) => {
        console.error(err.stack);
    }).on('data', (data) => {
        body += data;
        
        // Request is too long, 1e6 === Math.pow(10, 6) === 1000000 or 1 MB
        if (body.length > 1e6) {
            res.statusCode = 413;
            
            req.connection.destroy();
        }
    }).on('end', () => {        
        let params = new URLSearchParams(body);

        res.setHeader('content-type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(parseParams(params)));
    });
};

function getResInvalid(req, res) {
    getRes.call(req, res);
    res.on('error', (err) => {
        console.error(err.stack);
    });
    
    res.statusCode = 400;
    res.end('Please input the data in the proper format - either using POST or GET.');
};

exports.getResGET = getResGET;
exports.getResPOST = getResPOST;
exports.getResInvalid = getResInvalid;
