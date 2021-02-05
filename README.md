# web-crawler-nodejs

### Problem Statement

Build a web crawler that can find product names and product descriptions from barcodes by crawling websites.

The list of barcodes is found here - /res/barcodes.txt (to be sent by the client)

The list of sample websites to crawl from is found here - /res/websites.txt

### Sample output

Any format, e.g logging of the array: [{barcode: 9416114003034, name: 'Weleda Arnica Cream 36ml', description: 'Weleda Eczema Cream is a traditional, herbal product to soothe and relieve the symptoms of eczema. Particularly for dry, red, itchy eczema.'}, ...]

### My Approach

Run a HTTPS server on the local machine that will accept barcodes from the client via POST or GET HTTP requests, send requests to websites for information on the barcodes, and return that information back to the client.

### How to install

1. `npm install https://github.com/parth-io/web-crawler-nodejs.git`

   1. Should install Axios as well

2. Navigate to containing directory

3. For Linux or MacOS only (uses bash); else run it in Windows Subsystem for Linux - open Terminal in the project directory and run the following commands to simulate SSL certificates for a HTTPS server

   ```bash
   $ chmod +x create_server.sh
   $ ./create_server.sh
   ```

   1. If bash is unable to be found, edit the shebang or try `bash create_server.sh` 

4. There will be two files created in the current working directory. Those 2 files 'cert.pem' and 'key.pem' will need to be put in the same directory as the index.js file.

#### Dependencies

1. Axios

### To Do/Implement

1. Windows support
   1. The Windows file path will require a different delimiter - use Node JS' os.eol
2. Refactor service.js to better implement inheritance
3. Change Promise.all to axios.all
4. Account for larger files
   1. For large numbers of barcodes, send the data in batches or generate a stream and pipe it to the requestor.js
5. Use the readline class for websites.txt
6. Better async implementation
7. Use express to parse request (especially POST data)
   1. Express JS' body-parser

### Testing

#### To test the server

 `curl -k https://localhost:port`