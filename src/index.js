const https = require('https');

/* The following line allows us to use the web hosting service's (Amazon AWS) port, or if that is not provided, port 3000.
Instead of 3000, you can use any other port. While 443 is the default for HTTPS, on Linux ports less than 1024 require the program to be run as root.
*/
const port = process.env.PORT || 3000
// We run the server on the local machine, the localhost.
const hostname = '127.0.0.1';
const server = require('./controller.js');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Driver function to create server
const server = https.createServer(options, (req, res) => { 
    // Handle any other uncaught error
    process.on('uncaughtException', (err) {
        console.error(err.stack);
    });
    
    req.on('error', (err) => {
        console.error(err.stack);
    });
    
    var service = require('./service.js');
    
    // Get the method and url fields' values from the req
    const { method, url } = req;
    
    if (method === 'GET') {
        service.getResGET(req, res, url);
    }
    
    else if (method === 'POST') {
        service.getResPOST(req, res);
    }
    
    else {
        service.getResInvalid(req, res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
