#!/bin/bash

cp -r public dist
cp now.json dist
cp package.json dist
cp yarn.lock dist

cd dist

now --public && now alias