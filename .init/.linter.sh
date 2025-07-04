#!/bin/bash
cd /home/kavia/workspace/code-generation/food-truck-frenzy-105743-9dc566c6/react_js_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

