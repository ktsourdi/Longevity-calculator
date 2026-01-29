# Longevity Calculator 💀

A Gen Z-style web application that predicts life expectancy based on lifestyle factors. Built with Next.js 14, TypeScript, and modern web technologies, featuring a glassmorphic UI design with animated gradients.

## ✨ Features

- **Interactive Questionnaire**: 8 questions covering key lifestyle factors (sleep, exercise, diet, stress, etc.)
- **Smart Algorithm**: Calculates life expectancy based on health modifiers with weighted factors
- **Gen Z Aesthetic**: Modern glassmorphic design with cyberpunk-inspired gradient animations
- **Humorous Results**: Playful roasts based on your predicted age
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Accessible**: ARIA labels and semantic HTML for better accessibility
- **Type-Safe**: Written in TypeScript with strict type checking
- **Performance Optimized**: Static generation and optimized React rendering

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or higher (required for Next.js 14)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ktsourdi/Longevity-calculator.git
cd Longevity-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🏗️ Build for Production

Build the optimized production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📝 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production server
- `npm run lint` - Runs ESLint to check code quality

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments on every push.

### Other Platforms

This Next.js app can also be deployed to:
- Netlify
- AWS Amplify
- Azure Static Web Apps
- Google Cloud Platform

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: CSS Modules with custom properties
- **Linting**: ESLint with Next.js config
- **Development**: Hot Module Replacement (HMR)

## 📊 Algorithm Overview

The longevity calculator uses a weighted modifier system that calculates deviation from optimal health values. The formula is:

```
Final Age = Base Life Expectancy + Σ((User Value - Optimal Value) × Weight)
```

**How it works:**
- Start with a base life expectancy of 78 years
- For each health factor, calculate how far the user's answer is from the optimal value
- Multiply this deviation by the factor's weight
- Positive weights reward good choices above optimal (e.g., more exercise)
- Negative weights penalize any deviation from optimal (e.g., too much or too little sleep)

| Factor | Optimal Value | Weight | Effect |
|--------|--------------|--------|---------|
| Coffee/Caffeine | 2 cups/day | -0.5 | Penalized when deviating in either direction |
| Sleep | 7 hours/night | -1.5 | Strong penalty for too much or too little sleep |
| Exercise | 3 days/week | +0.8 | Reward for exercising more, penalty for less |
| Stress Level | 5/10 | -1.2 | Penalized when too stressed or too relaxed |
| Diet Quality | 5/10 | +1.5 | Strong reward for healthier eating |
| Social Activity | 5/10 | +0.3 | Mild reward for being more social |
| Screen Time | 4 hours/day | -0.4 | Penalized for excessive screen time |

**Example:** If you exercise 5 days/week (optimal is 3), the modifier is (5 - 3) × 0.8 = +1.6 years added to your life expectancy.

**Constraints:** The final result is bounded between (your current age + 1) and 120 years to ensure realistic results.

## 🎨 Design Philosophy

The app features a modern, Gen Z-inspired aesthetic with:
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Cyberpunk Gradients**: Vibrant pink and cyan color scheme
- **Smooth Animations**: Subtle motion design for enhanced UX
- **Dark Mode**: Eye-friendly dark theme
- **Casual Tone**: Humorous, informal language throughout

## 📁 Project Structure

```
Longevity-calculator/
├── app/
│   ├── page.tsx           # Main calculator component
│   ├── layout.tsx         # Root layout with metadata
│   ├── globals.css        # Global styles and CSS reset
│   └── page.module.css    # Component-specific styles
├── public/                # Static assets
├── .eslintrc.json        # ESLint configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## ⚠️ Disclaimer

This calculator is for entertainment purposes only. The results are based on a simplified algorithm and should not be considered medical advice. For accurate health assessments, please consult healthcare professionals.

## 👤 Author

**ktsourdi**

- GitHub: [@ktsourdi](https://github.com/ktsourdi)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Inspired by Gen Z humor and aesthetics
- Health factor weights based on general wellness research
