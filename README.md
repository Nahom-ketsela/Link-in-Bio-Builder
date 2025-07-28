
# 🌐 ShareIt.bio

All your social links. One sleek page. Share it everywhere.

## ✨ Overview

**ShareIt.bio** is a modern, responsive link-in-bio builder built using React, Tailwind CSS, and Firebase. It allows users to create a single customizable profile page with links to their social media accounts — perfect for creators, professionals, and businesses.


---

## 🚀 Features

- 🔐 Authentication (Register / Login)
- 🧑‍💼 Dashboard to customize username, theme, font, and social links
- 🎨 Live preview of your bio page
- 📱 Supports Instagram, TikTok, Facebook, Twitter, Telegram, WhatsApp
- 🔗 Public shareable profile
- ☁️ Firebase Authentication + Firestore Database
- 📱 Fully responsive + mobile-first UI
- ⚙️ Protected routes with dynamic user sessions

---

## 🛠 Tech Stack

- **React** – Frontend Framework
- **Tailwind CSS** – Utility-first CSS for design
- **Firebase** – Auth & Firestore for backend
- **React Router** – Routing
- **React Icons** – Platform icons

---

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nahom-ketsela/Link-in-Bio-Builder.git
   cd Link-in-Bio-Builder


2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Configuration**

   * Create a Firebase project
   * Enable **Authentication** (Email/Password)
   * Create a **Firestore Database**
   * Inside the root, create a `.env.local` file:

     ```
     VITE_API_KEY=your_firebase_api_key
     VITE_AUTH_DOMAIN=your_auth_domain
     VITE_PROJECT_ID=your_project_id
     VITE_STORAGE_BUCKET=your_storage_bucket
     VITE_MESSAGING_SENDER_ID=your_sender_id
     VITE_APP_ID=your_app_id
     ```

4. **Run the app**

   ```bash
   npm run dev
   ```

---

## 📁 Folder Structure

```
src/
├── components/       # Navbar, Footer, etc.
├── context/          # Auth context
├── pages/            # Auth, Dashboard, PublicProfile, Home
├── firebase.js       # Firebase config
├── App.jsx           # Main app routes
└── index.css         # Tailwind base styles
```

---


## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📃 License

[MIT](LICENSE)

---

## 🧠 Inspiration

Inspired by platforms like [Linktree](https://linktr.ee/) but built with simplicity, performance, and customization in mind.



