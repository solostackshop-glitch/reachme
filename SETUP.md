# ReachMe — Setup Guide

Your secret update key: `c2fd481db4fe4411e04919209a86c198c5c66f50`

---

## Step 1 — Push to GitHub

1. Go to github.com → New repository → name it `reachme` → Create (private or public, your call)
2. Open Terminal and run:

```bash
cd ~/.openclaw/workspace/reachme
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/reachme.git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

1. Go to vercel.com → Add New Project → Import your `reachme` repo
2. Leave all settings default → click **Deploy**
3. Once deployed, grab your URL (e.g. `reachme.vercel.app`) — that's your shareable link

---

## Step 3 — Add Storage (Vercel KV)

1. In Vercel dashboard → go to your `reachme` project
2. Click **Storage** tab → **Create Database** → choose **KV (Redis)**
3. Name it anything (e.g. `reachme-kv`) → Create
4. Click **Connect to Project** → select `reachme` → Connect
5. Vercel auto-injects the KV environment variables — nothing else to do here

---

## Step 4 — Add Your Secret Key

1. In Vercel → your project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `UPDATE_KEY`
   - **Value:** `c2fd481db4fe4411e04919209a86c198c5c66f50`
   - Environments: check all three (Production, Preview, Development)
3. Save → go to **Deployments** → click the three dots on your latest deploy → **Redeploy**

---

## Step 5 — Set Up iOS Shortcuts

Open the **Shortcuts** app on your iPhone.

### Shortcut A — When you connect to WiFi

1. Tap **Automation** (bottom bar) → **+** → **Personal Automation**
2. Scroll to find **Wi-Fi** → tap it
3. Set: **Any Network** → choose "connects" → Next
4. Tap **Add Action** → search "URL" → add a **URL** action
5. Paste this URL:
   ```
   https://YOUR-VERCEL-URL.vercel.app/api/update?status=wifi&key=c2fd481db4fe4411e04919209a86c198c5c66f50
   ```
6. Add another action → search "Get Contents of URL" → add it (it should auto-link to the URL above)
7. Turn **OFF** "Ask Before Running" → Done

### Shortcut B — When you leave WiFi

1. Repeat the steps above but:
   - Step 3: choose "disconnects" instead
   - Step 5: use this URL instead:
   ```
   https://YOUR-VERCEL-URL.vercel.app/api/update?status=data&key=c2fd481db4fe4411e04919209a86c198c5c66f50
   ```

---

## Your Shareable Link

```
https://YOUR-VERCEL-URL.vercel.app
```

Send this to anyone. They'll see whether to iMessage you or WhatsApp you, updated in real time.

---

## Test It

You can manually test the update endpoint in your browser:
- Set to WiFi: `https://YOUR-VERCEL-URL.vercel.app/api/update?status=wifi&key=c2fd481db4fe4411e04919209a86c198c5c66f50`
- Set to Data: `https://YOUR-VERCEL-URL.vercel.app/api/update?status=data&key=c2fd481db4fe4411e04919209a86c198c5c66f50`
