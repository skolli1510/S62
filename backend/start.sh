#!/bin/bash
node -v
npm -v
node backend/seed.js && node backend/index.js
