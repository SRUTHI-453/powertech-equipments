# Powertech Equipments 🔋

> UPS, Inverter & Stabilizer Specialists — Chennai. Founded 1999 by Mr. B. Ravichandran.

A full-stack web application with a **React** frontend and an **Express** backend that handles enquiry form validation server-side.

---

## 📁 Project Structure

```
powertech/
├── client/                     # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Fixed navigation with mobile menu
│   │   │   ├── Navbar.module.css
│   │   │   ├── ContactForm.jsx   # Enquiry form with dual validation
│   │   │   ├── ContactForm.module.css
│   │   │   ├── Logo.jsx          # SVG logo component
│   │   │   └── WAIcon.jsx        # WhatsApp SVG icon
│   │   ├── services/
│   │   │   └── api.js            # All fetch calls to backend
│   │   ├── utils/
│   │   │   └── validation.js     # Client-side validation (mirrors backend)
│   │   ├── App.jsx               # Main page layout
│   │   ├── App.module.css
│   │   ├── index.css             # Global reset & CSS variables
│   │   └── main.jsx              # React entry point
│   ├── index.html
│   └── vite.config.js            # Vite + proxy config
│
├── server/                     # Express backend
│   └── src/
│       ├── validators/
│       │   └── enquiry.validator.js   # Joi validation schema
│       ├── routes/
│       │   └── enquiry.route.js       # POST /api/enquiry
│       └── index.js                   # Server entry point
│
├── package.json                # Root workspace config
└── .gitignore
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/powertech-equipments.git
cd powertech-equipments

# Install all dependencies (root + client + server)
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
# Edit server/.env if needed (default port is 5000)
```

### 3. Run in development

```bash
# From the root — starts both server (port 5000) and client (port 3000) concurrently
npm run dev
```

Or run separately:

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Reference

### `POST /api/enquiry`

Validates and processes an enquiry form submission.

**Request body:**
```json
{
  "name": "Ravichandran",
  "phone": "+91 93810 05788",
  "service": "UPS Supply & Installation",
  "message": "Need a 2KVA UPS for my office."
}
```

**Success (200):**
```json
{
  "success": true,
  "message": "Enquiry received. Redirecting to WhatsApp.",
  "whatsappLink": "https://wa.me/919381005788?text=...",
  "data": { "name": "...", "phone": "...", "service": "...", "message": "..." }
}
```

**Validation error (422):**
```json
{
  "success": false,
  "message": "Validation failed. Please correct the errors below.",
  "errors": {
    "name": "Name is required.",
    "phone": "Enter a valid 10-digit Indian mobile number (starting with 6–9)."
  }
}
```

**Rate limit (429):** Max 10 submissions per IP per 15 minutes.

### `GET /api/health`
```json
{ "status": "ok", "timestamp": "2025-01-01T00:00:00.000Z" }
```

---

## ✅ Validation Rules

| Field   | Rules |
|---------|-------|
| `name`  | Required · 2–80 chars · Letters & basic punctuation only |
| `phone` | Required · Valid 10-digit Indian mobile (6–9 prefix, optional +91) |
| `service` | Required · Must be one of the 5 listed services |
| `message` | Optional · Max 1000 characters |

Validation runs **twice**:
1. **Client-side** (`src/utils/validation.js`) — instant feedback, no network call
2. **Server-side** (`server/src/validators/enquiry.validator.js` via Joi) — authoritative, cannot be bypassed

---

## 🛡️ Security Features

- **Helmet** — sets secure HTTP headers
- **CORS** — restricted to allowed origins via `ALLOWED_ORIGINS` env var
- **Rate limiting** — 10 submissions / IP / 15 min on `/api/enquiry`
- **Body size limit** — max 10KB per request
- **Input sanitisation** — Joi strips unknown fields and trims strings

---

## 🏗️ Production Build

```bash
# Build the React client
npm run build

# Serve the built client via Express (add static serving to server/src/index.js)
npm run start
```

---

## 📞 Contact

**Powertech Equipments**  
No.1, 3rd Pillaiyar Koil Street, Ekkattuthangal, Chennai – 600032  
📞 +91 93810 05788  
📲 [WhatsApp](https://wa.me/919381005788)
