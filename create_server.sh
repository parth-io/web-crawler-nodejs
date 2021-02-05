#!/usr/bin/env bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
echo ""
echo "Generated SSL keys for testing purposes."
echo "Please put the 2 files 'cert.pem' and 'key.pem' currently in $(pwd) in the same directory as the index.js file."
exit(0)
