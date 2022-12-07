#!/bin/sh
npm i ./backend

cd ./frontend
npm install --force
npm run build
cd ..

npm install