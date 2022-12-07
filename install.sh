#!/bin/sh
npm i ./frontend
npm i ./backend
cd ./frontend
npm run build
cd ..