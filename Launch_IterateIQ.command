#!/bin/bash
# IterateIQ Launcher — double-click this file to open the app

cd "$(dirname "$0")"

# Kill any previous server on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Open browser after 1 second (gives server time to start)
(sleep 1 && open "http://localhost:3000/IterateIQ_MVP.html") &

echo "Starting IterateIQ..."
echo "Opening http://localhost:3000/IterateIQ_MVP.html"
echo ""
echo "Keep this window open while using the app."
echo "Press Ctrl+C to stop the server when done."
echo ""
python3 -m http.server 3000
