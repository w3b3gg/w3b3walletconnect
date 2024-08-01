#!/bin/bash

rm -r dist

version=$(cat src/module.json | grep -o '"version": "[^"]*' | awk -F'"' '{print $4}')

node esbuild.config.js dist

cp README.md dist
cp CONTRIBUTING.md dist
cp LICENSE.md dist
cp src/index.js dist
cp src/module.json dist
cp src/types.d.ts dist

cd dist
zip -x *.zip -r "w3b3walletconnect$version.zip" .
echo "Create the file dist/w3b3walletconnect$version.zip"