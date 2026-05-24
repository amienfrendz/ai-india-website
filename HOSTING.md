# 🚀 How to Host on Google Firebase

Follow these steps to put your website online using Firebase Hosting (free!).

---

## Step 1: Prerequisites

1. **Install Node.js** — Download from https://nodejs.org (LTS version)
2. **Have a Google account** — You'll need this for Firebase

---

## Step 2: Install Firebase CLI

Open a terminal/command prompt and run:

```bash
npm install -g firebase-tools
```

---

## Step 3: Login to Firebase

```bash
firebase login
```

This will open a browser window — sign in with your Google account.

---

## Step 4: Initialize Firebase in Your Project

Navigate to your project folder:

```bash
cd C:\Users\amritar\Desktop\ai-india-website
```

Then run:

```bash
firebase init hosting
```

When prompted:
1. **Select "Create a new project"** or choose an existing one
2. **Public directory:** Type `.` (just a dot — since your files are in the root)
3. **Single-page app?** Select **No**
4. **Set up GitHub deploys?** Select **No**
5. **Overwrite index.html?** Select **No** (important — keep your file!)

---

## Step 5: Deploy Your Website! 🎉

```bash
firebase deploy
```

Firebase will give you a URL like:
```
https://your-project-name.web.app
```

**That's it! Your website is now live on the internet!** 🌐

---

## Step 6: Update Your Website Later

Whenever you make changes to your files, just run:

```bash
firebase deploy
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| `firebase` command not found | Restart your terminal after installing |
| Permission denied | Run terminal as Administrator |
| Deploy fails | Make sure you're in the project folder |

---

## 📁 Your Project Structure

```
ai-india-website/
├── index.html      ← Main webpage
├── style.css       ← Styling and colors
├── script.js       ← Interactive features
└── HOSTING.md      ← This file (hosting instructions)
```

---

## 💡 Alternative: Quick Deploy with Firebase Console

If the command line feels tricky:

1. Go to https://console.firebase.google.com
2. Click "Add Project" → name it (e.g., "ai-india-website")
3. Go to **Hosting** → "Get Started"
4. Follow the on-screen steps

---

## 🆓 Firebase Free Tier Includes:
- 10 GB hosting storage
- 360 MB/day data transfer
- Custom domain support
- SSL certificate (https://) automatic
- Perfect for school projects!

---

Happy hosting! 🎉🇮🇳
