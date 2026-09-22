/* ============================================================================
   CBC MARKBOOK — SHARED DATABASE CONFIG (do this once, ~5 minutes, free)
   ============================================================================
   Without this file filled in, CBC Markbook still works perfectly — but ONLY
   on the single device/browser that created or last opened each school. Open
   a DOS/HOI or Teacher login link on a different phone/computer and you'll
   see "School code not found", because there's nowhere shared to look it up.

   Filling in the config below fixes that for the WHOLE deployment, for every
   school, automatically:
     - The admin adds a school on their device → it's pushed to this shared
       project.
     - A DOS/HOI or Teacher opens their login link on ANY device, for the
       FIRST time → the app looks the school code up here automatically and
       just logs them in. No "Sync Code", no manual setup, nothing to send
       the school beforehand — it only takes the login link + credentials
       the admin already generates from Admin → Credentials.
     - Marks entered by different teachers on different devices also stay in
       sync automatically, the same way (this reuses the app's existing
       "Multi-Device Sync" feature, just pointed at one shared project
       instead of each school pasting in their own).

   HOW TO GET A CONFIG (free, no credit card):
     1. Go to https://console.firebase.google.com and sign in with any
        Google account.
     2. Click "Add project" → give it any name (e.g. "cbc-markbook") → you
        can skip Google Analytics.
     3. In the left menu: Build → Realtime Database → Create Database.
        Pick any location, then start in TEST MODE (you can tighten this
        later — see the security note below).
     4. Click the ⚙️ gear (top left) → Project settings → scroll to
        "Your apps" → click the </> (Web) icon → register an app
        (no Firebase Hosting needed, you're using Netlify).
     5. Firebase shows a `firebaseConfig = { ... }` object. Copy it and
        paste it below, replacing the `null`.
     6. Commit this file and redeploy (Netlify redeploys automatically on
        every push to GitHub).

   SECURITY NOTE (same trade-off the app's own Multi-Device Sync panel warns
   about, now just the default): Firebase's TEST MODE rules make this whole
   database readable/writable by anyone who has this config — and once this
   file is committed to a public GitHub repo, that config IS public. This app
   only ever reads/writes paths under `schools/{code}/...`, so treat a school
   code the way you'd treat a shared spreadsheet link, not a secret. For
   anything you'd consider sensitive, open Realtime Database → Rules in the
   Firebase console and restrict writes, e.g.:

     {
       "rules": {
         "schools": {
           "$code": { ".read": true, ".write": true }
         },
         "admins": {
           "$uid": {
             ".read": "auth != null && auth.uid === $uid",
             ".write": "auth != null && auth.uid === $uid"
           }
         }
       }
     }

   (That's the default-open version matching test mode. Tightening `.write`
   further — e.g. to Firebase App Check, or your own token scheme — is up to
   you; this app doesn't require any particular rule set to function, it
   just needs the `schools` path to exist.)
   ============================================================================ */

window.PLATFORM_FIREBASE_CONFIG = null;

/* Example — uncomment and fill in with YOUR project's values:

window.PLATFORM_FIREBASE_CONFIG = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "cbc-markbook-xxxxx.firebaseapp.com",
  databaseURL: "https://cbc-markbook-xxxxx-default-rtdb.firebaseio.com",
  projectId: "cbc-markbook-xxxxx",
  storageBucket: "cbc-markbook-xxxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890abcdef"
};

*/
