#!/usr/bin/env python3
"""
IterateIQ — Build Standalone HTML
Double-click this file to create a fully self-contained IterateIQ_MVP.html
that works by opening directly in Chrome (no server needed).
"""

import urllib.request
import re
import os
import subprocess
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
html_in  = os.path.join(script_dir, 'IterateIQ_MVP.html')
html_out = os.path.join(script_dir, 'IterateIQ_MVP.html')

CDN_URLS = {
    'react':     'https://unpkg.com/react@18.3.1/umd/react.production.min.js',
    'react-dom': 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js',
    'recharts':  'https://unpkg.com/recharts@2.10.1/umd/Recharts.js',
}

def fetch(label, url):
    print(f'  Downloading {label}...', end=' ', flush=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read().decode('utf-8')
    print(f'{len(data)//1024} KB')
    return data

print('=' * 50)
print('  IterateIQ — Building Standalone HTML')
print('=' * 50)
print()

# --- Download libraries ---
try:
    libs = {k: fetch(k, v) for k, v in CDN_URLS.items()}
except Exception as e:
    print(f'\nERROR downloading libraries: {e}')
    print('Make sure you are connected to the internet and try again.')
    input('\nPress Enter to close...')
    sys.exit(1)

# --- Read the existing HTML ---
print(f'\n  Reading {os.path.basename(html_in)}...', end=' ', flush=True)
with open(html_in, 'r', encoding='utf-8') as f:
    html = f.read()
print('OK')

# --- Replace CDN <script src="..."> tags with inline <script>...</script> ---
def inline_script(src_content):
    return f'<script>\n{src_content}\n</script>'

# Remove all three CDN script tags (order-insensitive)
html = re.sub(
    r'<script\s+src="https://unpkg\.com/react@[^"]*"[^>]*></script>',
    inline_script(libs['react']), html
)
html = re.sub(
    r'<script\s+src="https://unpkg\.com/react-dom@[^"]*"[^>]*></script>',
    inline_script(libs['react-dom']), html
)
html = re.sub(
    r'<script\s+src="https://unpkg\.com/recharts@[^"]*"[^>]*></script>',
    inline_script(libs['recharts']), html
)

# --- Write output ---
print(f'  Writing standalone HTML...', end=' ', flush=True)
with open(html_out, 'w', encoding='utf-8') as f:
    f.write(html)
size_kb = os.path.getsize(html_out) // 1024
print(f'{size_kb} KB')

print()
print(f'  Done!  IterateIQ_MVP.html is now fully self-contained.')
print()
print('  Opening in Chrome...')

# Open in Chrome
subprocess.Popen(['open', '-a', 'Google Chrome', html_out])

input('\nPress Enter to close this window...')
