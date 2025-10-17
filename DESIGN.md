# 🎨 FluxTrade UI Design System

## Color Palette

### Primary Colors
- **Primary Blue**: `#6366f1` - Main brand color
- **Primary Dark**: `#4f46e5` - Hover states
- **Primary Light**: `#818cf8` - Highlights

### Accent Colors
- **Accent Purple**: `#a855f7` - Secondary actions
- **Accent Dark**: `#9333ea` - Accent hover
- **Accent Light**: `#c084fc` - Accent highlights

### Neon Colors
- **Neon Blue**: `#00f0ff` - Glows and borders
- **Neon Purple**: `#bf00ff` - Gradients
- **Neon Pink**: `#ff00ff` - Effects

### Neutral Colors
- **Background**: Gradient from gray-900 via purple-900 to gray-900
- **Glass**: white/10 with backdrop blur
- **Text Primary**: white
- **Text Secondary**: gray-400

## Typography

- **Font Family**: System fonts (default)
- **Headings**: Bold, gradient text effect
- **Body**: Regular weight, white/gray-400
- **Code**: Monospace

## Components

### Glass Card
```css
- Background: white/10 (10% opacity)
- Backdrop blur: medium
- Border: white/20 (20% opacity)
- Border radius: 12px
- Smooth transitions
```

### Neon Button
```css
- Background: Gradient (primary to accent)
- Padding: 24px horizontal, 12px vertical
- Border radius: 8px
- Hover: Shadow glow + scale(1.05)
- Active: scale(0.95)
```

### Glass Input
```css
- Background: white/5 (5% opacity)
- Border: white/20
- Focus: Border color to primary
- Smooth transitions
```

## Effects

### Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur filter
- Subtle borders
- Layered depth

### Neon Glow
- Box shadows with color
- Pulse animations
- Hover intensification
- Smooth transitions

### Gradients
- Linear gradients (135deg)
- Multiple color stops
- Animated gradient borders
- Text gradients

## Animations

### Pulse Glow
```
0%, 100%: box-shadow 20px blur
50%: box-shadow 40px blur
Duration: 2s
```

### Rotate (Border)
```
0deg → 360deg
Duration: 3s
Linear infinite
```

### Transitions
- All properties: 300ms
- Smooth easing
- Transform properties
- Opacity changes

## Layout

### Grid System
- Responsive breakpoints
- Mobile-first approach
- Flexbox for alignment
- Grid for complex layouts

### Spacing
- Consistent padding/margin
- 4px base unit
- Generous white space
- Component separation

## Accessibility

- High contrast text
- Focus states visible
- Keyboard navigation
- ARIA labels (to be added)

## Responsive Design

### Mobile (<768px)
- Single column layout
- Full-width components
- Stacked navigation
- Touch-friendly buttons

### Tablet (768px-1024px)
- Two column layout
- Responsive navigation
- Optimized spacing

### Desktop (>1024px)
- Three column grid
- Side-by-side components
- Full navigation bar
- Hover effects

## Dark Mode

FluxTrade uses dark mode by default with:
- Dark backgrounds
- High contrast text
- Neon accents
- Glassmorphism effects

## Component Hierarchy

```
App
├── Navbar (sticky, glassmorphic)
├── Main Content
│   ├── Hero Section
│   ├── TokenSwap (glass card)
│   └── TradeDashboard
│       ├── Stats Cards
│       ├── Popular Tokens
│       └── Recent Transactions
└── Footer (glassmorphic)
```

## Design Principles

1. **Futuristic**: Neon colors, gradients, glass effects
2. **Clean**: Minimalist layout, generous spacing
3. **Professional**: Consistent styling, attention to detail
4. **Functional**: User-friendly, intuitive navigation
5. **Responsive**: Works on all devices
6. **Accessible**: High contrast, clear text

## Usage Examples

### Creating a Glass Card
```jsx
<div className="glass-card p-6">
  Your content here
</div>
```

### Neon Button
```jsx
<button className="neon-button">
  Click Me
</button>
```

### Gradient Text
```jsx
<h1 className="gradient-text">
  FluxTrade
</h1>
```

### Input Field
```jsx
<input className="glass-input" placeholder="Enter amount" />
```

## Future Enhancements

- [ ] Animated background particles
- [ ] Smooth page transitions
- [ ] Loading skeletons
- [ ] Toast notifications
- [ ] Modal animations
- [ ] Chart integrations
- [ ] Advanced hover effects
- [ ] Parallax scrolling
