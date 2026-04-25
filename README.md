# Romi's Saree Atelier ✦ সাজিয়েছি এক নতুন পসরা

Romi's Saree Atelier is a premium, high-end e-commerce experience dedicated to the timeless heritage of Bengali weaving. This application serves as a digital boutique, showcasing a curated collection of authentic Jamdani, Baluchari, and Silk sarees.

![Hero Preview](https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?w=1200&auto=format&fit=crop&q=80)

## ✦ Key Features

### 🛍️ Artisanal Boutique Experience
- **Luxury Aesthetic:** A meticulously designed interface using premium typography (Cormorant Garamond & Outfit) and harmonious jewel-tone color palettes.
- **Dynamic Hero Section:** Immersive full-screen hero with optimized high-resolution imagery and elegant Bengali typography.
- **Collection Grid:** Category-based filtering for effortless exploration of different weaving traditions.
- **WhatsApp Integration:** Direct "Enquire on WhatsApp" feature that automatically includes the saree name, price, and a direct link to the photo for seamless ordering.

### 🔐 Admin Atelier Portal
- **Inventory Management:** A secure, polished dashboard for Romi to manage the collection in real-time.
- **Intelligent Uploads:** Built-in image compression to ensure fast page loads without sacrificing photo quality.
- **Supabase Integration:** Powered by Supabase for secure data storage and high-performance image hosting.

### 📱 Performance & Design
- **Fully Responsive:** Optimized for a premium experience across mobile, tablet, and desktop.
- **Motion Design:** Smooth, scroll-triggered reveal animations for a sophisticated boutique feel.
- **SEO Optimized:** Semantic HTML, structured data (JSON-LD), and proper meta-tagging for maximum visibility.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Database & Storage:** [Supabase](https://supabase.com/)
- **Styling:** Vanilla CSS + Tailwind CSS
- **Animations:** Custom CSS Transitions + ScrollReveal logic
- **Fonts:** Google Fonts (Cormorant Garamond, Outfit)
- **Icons:** Material Symbols Outlined

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (Latest LTS recommended)
- A Supabase account

### 2. Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Create a `sarees` table in Supabase with the following columns:
- `id` (uuid, primary key)
- `created_at` (timestamp)
- `name` (text)
- `price` (numeric)
- `category` (text)
- `description` (text)
- `image_url` (text)
- `stock_status` (text)
- `stock_count` (int8)

### 5. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the boutique.

---

## ✦ Design Philosophy
"সাজিয়েছি এক নতুন পসরা" — *We have adorned a new offering.*
The design aims to bridge the gap between ancient heritage and modern elegance, providing a digital home for the master weavers of Bengal.
