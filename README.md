readme.md
# 🌟 Daily Inspiration

A motivational web application that provides daily wisdom from Stoic philosophers, historical visionaries, and poetic songwriters.

## 🚀 "No-Desktop" Deployment Guide

This project is designed to be managed entirely through the browser. No local installation is required.

### 1. Save to GitHub
1. Create a new repository on GitHub.
2. Use the GitHub web interface to create the files and paste the code from this project.
   - *Tip: You can press the `.` key on any GitHub repo to open a web-based editor (VS Code for Web).*

### 2. Secure Your API Key (GCP Console)
1. Go to your [Google AI Studio](https://aistudio.google.com/) or GCP Console.
2. Find your API Key and edit the **API Restrictions**.
3. Set an **HTTP Referrer Restriction**.
4. Add your deployment URL (e.g., `https://your-app-name.vercel.app/*`).
   - *This ensures your key only works on your specific website.*

### 3. Deploy to the Cloud
1. Sign up for a free account at [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Connect your GitHub account and select this repository.
3. In the **Environment Variables** section, add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `your_actual_api_key_here`
4. Click **Deploy**.

### 4. Updates
Whenever you want to change the design or logic, simply edit the files directly on GitHub. The website will automatically detect the change and redeploy itself within seconds.

---
*Built with React, Tailwind CSS, and Gemini AI.*


-----
