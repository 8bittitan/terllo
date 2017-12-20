#!/bin/bash

cp -r public dist
cp now.json dist
cp package.json dist
cp package-lock.json dist

cd dist

now --public && now alias