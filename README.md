# Work & Holiday Platform

A modern, responsive platform that allows users to discover available work and holiday programs based on their nationality.

## ✨ Features

- 🔍 **Smart Search**: Search work and holiday programs by nationality with autocomplete
- 📋 **Detailed Information**: Comprehensive program details including requirements, benefits, and fees
- 🎨 **Modern UI**: Built with the latest Tailwind CSS (v3.4.0) for beautiful, responsive design
- �� **Global Coverage**: Programs from Australia, New Zealand, Canada, UK, Japan, and South Korea
- ⚡ **Fast Performance**: Optimized React components with TypeScript
- 📱 **Mobile-First**: Fully responsive design that works on all devices

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks
- **TypeScript 5.3.3** - Type-safe development
- **Tailwind CSS 3.4.0** - Latest version with modern features:
  - Custom color palette with primary, success, and warning colors
  - Custom animations (fade-in, slide-up, bounce-gentle)
  - Custom shadows (soft, medium, large)
  - Glass morphism effects
  - Responsive design utilities
- **PostCSS 8.4.32** - CSS processing
- **Autoprefixer 10.4.16** - CSS vendor prefixing

### Backend
- **Python 3** - Simple HTTP server
- **JSON-based data** - Easy to maintain and update
- **CORS enabled** - Cross-origin requests supported

## 📁 Project Structure

```
├── backend/          # Python HTTP server
│   └── app.py       # Main server file
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchForm.tsx    # Search interface
│   │   │   └── ProgramCard.tsx   # Program display cards
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript definitions
│   │   ├── App.tsx               # Main application
│   │   └── App.css               # Tailwind styles
│   ├── package.json              # Dependencies
│   ├── tailwind.config.js        # Tailwind configuration
│   └── postcss.config.js         # PostCSS configuration
├── data/            # Program database
│   └── programs.json
└── README.md
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
python3 app.py
```
The backend will run on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

## 🎨 Design Features

### Modern Tailwind CSS Implementation
- **Custom Color System**: Primary, success, and warning color palettes
- **Advanced Animations**: Fade-in, slide-up, and gentle bounce effects
- **Glass Morphism**: Modern backdrop blur effects
- **Custom Shadows**: Soft, medium, and large shadow variants
- **Responsive Grid**: Mobile-first responsive design
- **Interactive Elements**: Hover effects and smooth transitions

### UI Components
- **SearchForm**: Modern search interface with autocomplete
- **ProgramCard**: Beautiful cards with hover effects
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful messages when no results found

## 📊 Available Programs

The platform includes comprehensive information about:

- 🇦🇺 **Australia Working Holiday Visa**
- 🇳🇿 **New Zealand Working Holiday Visa**
- 🇨🇦 **Canada International Experience Canada**
- 🇬🇧 **UK Youth Mobility Scheme**
- 🇯🇵 **Japan Working Holiday Visa**
- 🇰🇷 **South Korea Working Holiday Visa**

Each program includes:
- Duration and age limits
- Application fees and processing times
- Detailed requirements
- Program benefits
- Eligibility criteria

## 🔧 API Endpoints

- `GET /api/nationalities` - Get all eligible nationalities
- `GET /api/programs?nationality=<country>` - Get programs for specific nationality
- `GET /api/programs` - Get all programs

## 🎯 Usage

1. **Open the application** in your browser
2. **Enter your nationality** in the search field
3. **Browse available programs** with detailed information
4. **View requirements and benefits** for each program
5. **Get application details** including fees and processing times

## 🔄 Development

### Adding New Programs
Edit `data/programs.json` to add new work and holiday programs.

### Styling Updates
The project uses the latest Tailwind CSS features:
- Custom components in `src/App.css`
- Responsive design patterns
- Modern animation utilities
- Glass morphism effects

### TypeScript Support
Full TypeScript support with proper type definitions in `src/types/index.ts`.

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface
- Adaptive layouts

## 🎨 Custom Tailwind Features

### Colors
```css
primary: { 50-950 } - Blue color palette
success: { 50-950 } - Green color palette  
warning: { 50-950 } - Yellow/Orange palette
```

### Animations
```css
fade-in: 0.5s ease-in-out
slide-up: 0.3s ease-out
bounce-gentle: 2s infinite
```

### Shadows
```css
soft: Subtle shadow for cards
medium: Medium shadow for hover effects
large: Strong shadow for emphasis
```

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using the latest web technologies**
