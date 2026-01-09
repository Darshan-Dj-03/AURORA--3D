# Running the Jewellery Box Application

## Important: Local Server Required

Due to browser security (CORS policy), you **MUST** run this application through a local web server. Opening `index.html` directly with `file://` protocol will NOT work.

## Quick Start Options:

### Option 1: Python (Recommended - Easiest)
If you have Python installed:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js (http-server)
If you have Node.js installed:

```bash
npx http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: PHP
If you have PHP installed:

```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Option 4: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## After Starting Server:
1. Navigate to `http://localhost:8000` in your browser
2. The application should load properly with all models and textures

