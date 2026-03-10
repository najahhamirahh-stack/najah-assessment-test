# Angular & Electron Interview Test

This project is a Dashboard Application built with the Angular 7 framework, integrated with Electron for desktop support, and utilizes PouchDB as a local NoSQL database system.

# Project Description

The application is designed to display interactive data visualizations and manage user information using a modern offline-first approach.      

   - Angular (Front-end): Built with Angular 7 and Bootstrap 4 for a responsive user interface.
   - Desktop Application: Powered by Electron to allow the application to run as a native desktop software on Windows, Mac, or Linux.
   - Database: Integrated with PouchDB for local data storage, meaning the application works without needing an external backend server.
   - Visualizations: Features high-quality amCharts4 for dynamic Donut and Bar chart displays.

# Requirements

   - Node.js: v22.x (Compatible with v17+)
   - Angular CLI: v7.3.3
   - Terminal: Command Prompt(CMD) or PowerShell

# Note: OpenSSL Compatibility for Node v17+

Since this project uses Angular 7, so the --openssl-legacy-provider flag is required for Node.js v17+. But, I have integrated this into the NPM Scripts to automate the process and prevent ERR_OSSL_EVP_UNSUPPORTED errors.

# How to Run the Application

1. Install Dependencies
      - npm install

2. Run Web Version (Browser)
      - npm start
   - Access the apps at: http://localhost:4200

3. Run Desktop Version (Electron)

   To launch as a desktop application.
      Build the project
         - npm run build

      Launch Electron
         - npm run electron

# Technical Implementation
   
   - Database & Auth
         - PouchDB: Implemented within AuthService to handle user       authentication and local data persistence directly on the user's machine.

   - amCharts4 Customizations
      - I have performed specific Best Practice adjustments to the charts:
      
         - Bar Chart Scaling: The Y-axis scale is fixed at clear intervals of 10 (0-80) for better readability.
         - Custom Labels: Forced all Bar category labels to display and added LabelBullet to show exact values directly on top of each bar.
         - Clean UI: The amCharts watermark/logo has been programmatically disabled for a more professional look.

# Key File Structure
   - src/app/login/ — Logic and UI for the user authentication page.
   - src/app/dashboard/ - Chart component logic and templates.
   - src/app/_services/ - Authentication services and PouchDB integration.
   - src/app/_helpers/ - Interceptors and utility functions for API/Data handling.
   - src/app/_guards/ - Route guards to protect the Dashboard from unauthorized access.
   - app.module.ts — The root module where all components and services are registered.
   - tsconfig.json — TypeScript configuration for the project.
   - main.js - Main Electron window configuration and lifecycle.

# Troubleshooting
   If you encounter the error "Port 4200 is already in use", please clear the old Node processes:
      1. Run netstat -ano | findstr :4200 to find the PID.
      
      2. Run taskkill /F /PID [PID_Number] or simply taskkill /F /IM node.exe.