# Firebase Setup & Firestore Rules

## 1. Firestore Rules

Firebase Console → Firestore Database → **Rules** tab → paste this and click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Shipments: readable by everyone so any visitor can track;
    // writable for the demo (admin console syncs shipments here).
    // Tighten write access before production use.
    match /shipments/{id} {
      allow read: if true;
      allow write: if true;
    }

    // Activity log (admin console audit trail)
    match /activity/{id} {
      allow read, write: if true;
    }

    // Admin whitelist: a document ID equal to a user's email grants admin
    // access to that Firebase Auth user. e.g. admins/admin@fedex.com
    match /admins/{email} {
      allow read: if true;
    }
  }
}
```

## 2. Firestore Collections

| Collection | Purpose | Document ID |
|---|---|---|
| `shipments` | Trackable shipments (synced from the admin console) | tracking number |
| `activity` | Admin action audit log | auto-generated |
| `admins` | Admin email whitelist | the email address (lowercase) |

## 3. Adding an Admin

1. Firebase Console → **Authentication** → **Users** → **Add user**
   - Email: your email, Password: any (min 6 characters)
2. Firebase Console → **Firestore Database** → **Start collection** → ID `admins`
3. Add a document with the **email address as the Document ID**
   (any field value works, e.g. `role: "admin"`)
4. Log in at `/admin` on the site with that email + password

Built-in always-allowed admin emails: `admin@fedex.com`, `adminmain@gmail.com`
(still need a matching Firebase Auth user to sign in).

## 4. Environment Variables (.env / hosting provider)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Copy from Firebase Console → Project Settings → Your apps → Web app → Config.
