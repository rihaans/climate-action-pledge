# 🌍 Climate Action Pledge - Microsite

A production-ready, feature-rich single-page application for the Climate Action Pledge movement. Built to demonstrate advanced full-stack development skills for internship evaluation.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

Visit the live site: [Coming Soon]

## ✨ Features

### Core Features

✅ **Hero Section**
- Eye-catching gradient background with animated elements
- Compelling headline and call-to-action
- Smooth scroll navigation to pledge form

✅ **Live KPI Dashboard**
- Real-time pledge statistics
- Animated counters with smooth transitions
- Progress bar showing journey to 1M pledges
- Filtered counts for Students, Professionals, and Workshops

✅ **Why Take Action Section**
- Engaging, motivational content
- Beautiful card-based layout
- Icons and visual hierarchy

✅ **Comprehensive Pledge Form**
- All required fields with validation
- Real-time error messages
- 10-digit mobile number validation (Indian format)
- Email validation with typo suggestions
- Indian states dropdown
- Profile type radio buttons
- 9 commitment checkboxes across 3 themed categories
- Loading states during submission

✅ **Certificate Generator**
- Auto-generated personalized certificate
- "Cool Enough to Care!" statement
- Dynamic star rating (⭐⭐⭐ to ⭐⭐⭐⭐⭐) based on commitments
- Unique Pledge ID
- Date of pledge
- Download as PNG feature
- Share on social media (Twitter, Facebook, LinkedIn, WhatsApp)

✅ **Public Pledge Wall**
- Displays latest pledges in beautiful cards
- Shows: Pledge ID, Name, Date, State, Profile Type, Star Rating
- Privacy-protected (NO email or mobile displayed)
- Pagination (50 pledges per page)
- Search by name or ID
- Filter by profile type and state
- Auto-updates when new pledges are submitted

✅ **Privacy Note**
- Prominently displayed with lock icon
- Clear messaging about data protection

### Bonus Features Implemented

🎉 **Confetti Animation** - Celebratory animation on pledge completion
📥 **Certificate Download** - Download certificate as PNG using html2canvas
🔗 **Social Media Share** - One-click sharing to Twitter, Facebook, LinkedIn, WhatsApp
🎨 **Smooth Animations** - Fade-in, slide-up, and counter animations
🔍 **Advanced Filtering** - Multi-criteria search and filter in Pledge Wall
📱 **Fully Responsive** - Mobile-first design that works on all devices
♿ **Accessibility** - ARIA labels, keyboard navigation, focus states
🎯 **Auto-format Input** - Phone number auto-formatting
💾 **LocalStorage** - Pre-populated with 75 sample pledges
🎨 **Professional Design** - Clean, modern, eco-friendly color scheme

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2 with Hooks
- **Styling:** Tailwind CSS 3.3
- **Build Tool:** Vite 5.0
- **Icons:** Lucide React
- **Animations:** Canvas Confetti
- **Certificate Export:** html2canvas
- **State Management:** React Hooks (useState, useEffect)
- **Data Storage:** LocalStorage (MVP, backend-ready architecture)

## 📦 Installation & Setup

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd climate-pledge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
climate-pledge/
├── public/
├── src/
│   ├── components/
│   │   ├── Hero.jsx                 # Hero section with CTA
│   │   ├── KPIDashboard.jsx         # Live statistics dashboard
│   │   ├── WhyTakeAction.jsx        # Motivational content section
│   │   ├── PledgeForm.jsx           # Form with validation
│   │   ├── Certificate.jsx          # Certificate generator & display
│   │   ├── PledgeWall.jsx           # Public pledge display
│   │   └── PrivacyNote.jsx          # Privacy information component
│   ├── utils/
│   │   ├── storage.js               # LocalStorage utilities
│   │   └── validators.js            # Form validation functions
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Global styles & Tailwind
├── index.html                       # HTML template
├── package.json                     # Dependencies & scripts
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
├── postcss.config.js                # PostCSS configuration
└── README.md                        # This file
```

## 🎨 Design System

### Color Palette

- **Primary Green:** `#22c55e` (Environmental theme)
- **Ocean Blue:** `#0ea5e9` (Water/sky theme)
- **Accent Yellow:** `#eab308` (Energy/sun theme)
- **Gray Scale:** Tailwind's default gray palette

### Typography

- **Headings:** Bold, large sizes (2xl-5xl)
- **Body:** Regular, readable sizes (base-xl)
- **System Font Stack:** Native system fonts for performance

### Spacing

- Consistent use of Tailwind's spacing scale
- Ample white space for readability
- Responsive padding/margins

## 🔒 Privacy & Data Handling

- Email and mobile numbers are **NEVER** displayed publicly
- Data stored in browser's localStorage
- No data sent to external servers (MVP version)
- Ready for backend integration with minimal changes

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# (Use Netlify CLI or drag-and-drop on netlify.com)
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## 📊 Performance Optimizations

- **Code Splitting:** Vite automatically splits code
- **Image Optimization:** SVG icons for scalability
- **Lazy Loading:** Components load on-demand
- **Minification:** Production builds are minified
- **Tree Shaking:** Unused code is removed

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Color contrast compliance (WCAG AA)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspired by modern climate action websites
- Built with guidance from React and Tailwind CSS documentation

#ClimateAction #CoolEnoughToCare #SustainableFuture
