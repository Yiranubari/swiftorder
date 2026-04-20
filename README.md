# ⚡ SwiftOrder

**Turn messy DMs into clean orders.**

SwiftOrder is a lightweight, stateless React web app that bridges social commerce vendors and their customers. Vendors generate a custom checkout link, share it anywhere (Instagram bio, WhatsApp status, etc.), and receive perfectly formatted orders directly in their WhatsApp chat.

## 🚀 Features

- **Vendor Link Generator** — Input your WhatsApp number, store name, and greeting to generate a unique order link.
- **Customer Order Form** — Mobile-first, touch-friendly form that collects name, phone, address, and order details.
- **WhatsApp Payload Compiler** — Automatically formats all order data using WhatsApp markdown and opens the chat via the `wa.me` API.
- **Zero Backend** — Pure frontend. No servers, no databases, no cost.

## 🛠 Tech Stack

- **React 18** (Functional Components + Hooks)
- **Vite** (Build tool)
- **Tailwind CSS v4**
- **React Router DOM** (URL parameter parsing)
- **Google Fonts** — Poppins (headings) + Rubik (body)
- **unDraw** SVG illustrations

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/Yiranubari/swiftorder.git
cd swiftorder

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📂 Project Structure

```
src/
├── assets/svg/        # unDraw SVG illustrations
├── components/        # Navbar, Footer
├── pages/
│   ├── HomePage.jsx   # Vendor link generator (landing page)
│   └── OrderPage.jsx  # Customer checkout form
├── App.jsx            # Router setup
├── index.css          # Tailwind + custom theme
└── main.jsx           # Entry point
```

## 🔗 How It Works

1. Vendor enters their WhatsApp number and store details on the home page.
2. A unique URL is generated (e.g., `yoursite.com/order?phone=234...&name=Boss+Bakery`).
3. Customer clicks the link, fills out the order form.
4. On submit, the app compiles a formatted message and redirects to `wa.me` with the payload pre-filled.

## 📄 License

MIT
