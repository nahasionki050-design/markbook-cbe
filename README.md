# CBC Markbook

A learner assessment & reporting platform for CBC schools — record marks, auto-grade
against the CBC rubric, and generate printable learner progress reports and class
assessment sheets. Single-file static app (`index.html`), no server/backend required
to run it, deploys straight to Netlify from GitHub.

## What's in this repo

- `index.html` — the entire app (UI + logic).
- `firebase-config.js` — the ONE thing you fill in yourself (free, ~5 min) so schools
  and login links work automatically on every device. See below.
- `netlify.toml` — Netlify deployment settings (static site, no build step).

## 1. Deploy it (GitHub + Netlify)

**A. Push this folder to GitHub**
```bash
cd cbc-markbook
git init
git add .
git commit -m "CBC Markbook"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
(Or use GitHub's "Upload files" web UI if you'd rather not use git on the command line —
create a new repository at github.com/new, then drag these three files into it.)

**B. Connect Netlify**
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing
   project → Deploy with GitHub** → authorize Netlify → pick this repository.
2. Build settings: leave **Build command** blank (or `true`) and **Publish directory** as
   `.` — `netlify.toml` already sets this, so Netlify should detect it automatically.
3. Click **Deploy**. You'll get a live `https://<something>.netlify.app` URL in under a
   minute. Every future `git push` to `main` redeploys automatically.
4. Optional: **Site settings → Domain management** to add a custom domain or rename the
   `netlify.app` subdomain.

That's the whole deployment — it's a static site, so there's nothing else to configure
on Netlify's side.

## 2. Make schools resolve automatically (the one manual step)

By default (before you do this step), the app stores everything in the browser it's
opened in. That means:
- The admin creates a school on their laptop → sends the DOS/HOI a login link → the
  DOS/HOI opens it on **their own** phone, which has never seen that school before →
  **"School code not found."**

To fix this for good, open `firebase-config.js` in this repo and follow the instructions
in the comment at the top — in short:
1. Create a free project at [console.firebase.google.com](https://console.firebase.google.com)
   (no credit card needed).
2. Enable **Realtime Database** in test mode.
3. Register a Web app and copy the `firebaseConfig` object it gives you.
4. Paste it into `firebase-config.js`, replacing `null`.
5. Commit and push — Netlify redeploys automatically.

Once that's done:
- Every school the admin creates, and every login link generated for it, works on any
  device the very first time it's opened — no sync codes, no per-school setup.
- Marks entered by different teachers on different devices sync automatically too.
- The Admin panel shows a green "Shared database connected" banner once this is done
  (and an amber warning banner if it's still missing), so you always know the current
  state at a glance.

**Security note:** once `firebase-config.js` is committed to a public GitHub repo, that
config is effectively public (Firebase configs aren't secret credentials the way an API
key normally is). Test-mode database rules mean anyone with the config could read/write
data under a school's code if they had it — treat a school code like a shared spreadsheet
link, not a password. The comment block in `firebase-config.js` includes a ready-to-paste
Realtime Database rule set if you want to tighten this further. This is the same trade-off
the app's own "Multi-Device Sync" feature already documents — this just makes it the
default instead of opt-in per school.

If you'd rather not stand up a shared database right now, the app still works fine
single-device — just skip step 2 and come back to it later.

## 3. First login

Open your deployed URL. On first visit there's no admin password yet — the **Admin/Owner**
tab lets you set one on the spot (this becomes the password for that role going forward).
From there:

- **Admin/Owner** is a separate login from every school — it's its own tab on the login
  screen, checked against its own password (or an optional Cloud Admin Account for syncing
  the admin login itself across devices), and is never reachable from a DOS/HOI or Teacher
  login link. A link generated for a school (anything with `?school=` in the URL) hides the
  Admin/Owner tab entirely, so schools never even see that an admin portal exists.
- From the Admin panel, **Register a New School** creates the school and an 8-digit code.
  The **🪪 Credentials** button (and the **DOS Link** button) on any school row gives you a
  ready-to-share DOS/HOI login link, Teacher login link, School Code, and DOS/HOI
  username/password all in one card — that's what you send to the school. The DOS/HOI can
  then generate and share their own Teacher login link from inside their own portal.

## Updating the app later

Edit `index.html` (or `firebase-config.js`), commit, and push to `main` — Netlify picks up
the change and redeploys within a minute or two. No other build step is involved.
