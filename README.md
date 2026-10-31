# CoverCraft – Assignment Cover Page Generator

> **Create. Customize. Download.**  
> A clean, modern, and professional browser-based academic cover page generator designed for university and college students.

---

## Overview

**CoverCraft** allows students to enter their academic information through an intuitive, modern form, upload their university logo/seal, live-preview a standardized A4 portrait academic cover page, and download a print-ready PDF directly inside the browser.

### Key Features
- **Modern SaaS UI**: Minimalist aesthetic with subtle borders, refined typography, and responsive two-column layout.
- **Live A4 Preview**: Real-time canvas representing the exact 210mm × 297mm A4 portrait dimensions.
- **University Logo Upload**: Support for PNG, JPG, JPEG, WEBP, and SVG formats with aspect-ratio preservation, replace, and remove capabilities.
- **Multiple Academic Templates**:
  - *Classic Academic*: Traditional formal alignment with double academic borders.
  - *Modern Minimalist*: Clean left-aligned accent structure with contemporary typography.
  - *Departmental Boxed*: Structured two-column cards for "Submitted By" and "Submitted To".
  - *Executive Bar*: Institutional colored header bar for prestigious presentation.
- **Color & Border Customization**: Choose institutional accent colors (Navy, Royal, Emerald, Crimson, Charcoal) and page framing styles.
- **Browser-Native PDF Generation**: Generates 1-page high-resolution A4 PDFs without requiring any server, backend, or cloud database.
- **Local Persistence**: Automatically saves your inputs in `localStorage` so you never lose your progress upon page refresh or return.
- **Sample Data Loader & Reset Controls**: Quickly test with authentic sample data or start fresh with one click.
- **Direct Print Support**: Includes optimized `@media print` rules for instant `Ctrl+P` / `Cmd+P` printing.

---

## Project Structure

```
covercraft/
├── index.html        # Main HTML5 application structure & semantic layout
├── css/
│   └── style.css     # Clean CSS3 design system, responsive styles, & print rules
├── js/
│   └── script.js     # Vanilla JavaScript for real-time preview, logo upload, & PDF generation
├── assets/
│   ├── favicon.svg   # Scalable vector application favicon
│   └── sample-seal.svg # Realistic academic seal for sample data demonstration
└── README.md         # Documentation & GitHub Pages deployment guide
```

---

## Step-by-Step GitHub Pages Deployment Guide

CoverCraft is built with pure HTML5, CSS3, and Vanilla JavaScript. It has zero backend dependencies and works immediately as a static website on GitHub Pages.

### 1. Opening the Project in VS Code
1. Download or clone this repository to your computer.
2. Open **Visual Studio Code**.
3. Go to **File** > **Open Folder...** (or press `Ctrl+K Ctrl+O` on Windows / `Cmd+O` on Mac).
4. Select the `covercraft` folder.

### 2. Running the Website Locally
You can run CoverCraft locally using any of the following simple methods:

- **Method A: Direct Browser Opening (No tools required)**
  - Double-click `index.html` in your file explorer, or right-click `index.html` in VS Code and select **Open with Default Browser**.
- **Method B: VS Code Live Server Extension (Recommended)**
  1. Open the Extensions tab in VS Code (`Ctrl+Shift+X` or `Cmd+Shift+X`).
  2. Search for **Live Server** (by Ritwick Dey) and click **Install**.
  3. Right-click `index.html` in the file explorer and select **Open with Live Server**.
  4. The site will open at `http://127.0.0.1:5500/index.html`.
- **Method C: Using Node.js or Python (Optional)**
  - Python 3: `python -m http.server 3000`
  - Node.js (via npx): `npx serve .`

### 3. Creating a GitHub Repository
1. Log in to your account at [GitHub.com](https://github.com).
2. Click the **+** (plus icon) in the upper-right corner and select **New repository**.
3. Name your repository (e.g., `covercraft` or `assignment-cover-generator`).
4. Set visibility to **Public**.
5. Leave "Initialize this repository with a README" unchecked (since we already have one).
6. Click **Create repository**.

### 4. Uploading the Project to GitHub

#### Option A: Using Git CLI in VS Code Terminal
Open the integrated terminal in VS Code (`Ctrl+\`` or ``Cmd+` ``) and run:
```bash
git init
git add .
git commit -m "Initial commit: Complete CoverCraft academic cover generator"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

#### Option B: Uploading via GitHub Web Interface
1. In your newly created GitHub repository, click on the link that says **uploading an existing file**.
2. Drag and drop all the files (`index.html`, `README.md`, `css/`, `js/`, and `assets/`) into the GitHub upload area.
3. Add a commit message like `Add CoverCraft website files`.
4. Click **Commit changes**.

### 5. Enabling GitHub Pages
1. In your repository on GitHub, navigate to the **Settings** tab.
2. On the left sidebar menu, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.

### 6. Accessing the Published Website
1. After clicking Save, GitHub will deploy your static site. This typically takes 30 to 60 seconds.
2. Refresh the **Settings > Pages** screen until you see the banner:
   > **Your site is live at `https://<your-username>.github.io/<your-repo-name>/`**
3. Click the link to open your live, production-ready CoverCraft generator in any browser.

---

## Technical Specifications & Browser Support

- **PDF Engine**: Powered by `html2pdf.js` (bundled with `jsPDF` & `html2canvas`) delivering client-rendered 300 DPI equivalent vector-quality A4 documents.
- **Print Optimization**: Embedded `@media print` CSS rule formats pure A4 pages directly to system print dialogs (`Ctrl+P` / `Cmd+P`).
- **Compatibility**: Tested across Chrome, Edge, Firefox, Safari (macOS & iOS), and mobile Android browsers.
- **Zero Tracking**: 100% private. All entered student names, ID numbers, and uploaded logos remain strictly inside your device's browser memory.

---

## License

This project is licensed under the MIT License — feel free to use and adapt it for academic and institutional projects.
