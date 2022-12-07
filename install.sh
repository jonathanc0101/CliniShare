#!/bin/sh
npm i ./backend
cd ./frontend
npm install --save --legacy-peer-deps 
npm i
npm run build
cd ..