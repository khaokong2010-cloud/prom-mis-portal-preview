# School MIS Portal — design preview

This repository publishes a **static design preview** of the school MIS portal with GitHub Pages.

## What works

- Responsive blue/pink layout
- School crest, self-hosted fonts, and the animated background
- Login dialog appearance and service menu design

## What does not work here

- Login and password checking
- Sessions and the 5-attempt / 5-minute lockout
- Opening the real school service links

GitHub Pages only serves static files. It cannot run the Node.js server that provides the secure login, sessions, lockout, and protected service redirects.

The full secure portal runs locally on the school computer:

```
http://127.0.0.1:5173
```

## Security

This preview contains no admin password, no password hash, no session secret, and no Apps Script URLs. The secure server code and its environment file stay in the private repository.
