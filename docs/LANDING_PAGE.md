# VoIP Landing Page Documentation

This document describes the landing page created for the Auradial VoIP service.

## Overview

A modern, production-ready landing page built with Material-UI (MUI) components, inspired by Yadaphone's design. The page showcases affordable international calling services with a clean, professional interface.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Material-UI v7** - Component library
- **Emotion** - CSS-in-JS styling
- **TypeScript** - Type safety

## Page Structure

The landing page consists of 8 main sections:

### 1. Hero Section (`src/components/landing/Hero.tsx`)

**Purpose:** First impression and primary call-to-action

**Features:**

- Gradient background (violet theme)
- Main headline with pricing highlight
- Country selector dropdown
- "Start Calling" CTA button
- Video demo link
- "First call FREE" badge

**Key Elements:**

- Typography with responsive font sizes
- Decorative gradient circles for visual interest
- Mobile-responsive layout

### 2. How It Works (`src/components/landing/HowItWorks.tsx`)

**Purpose:** Explain the 3-step process

**Steps:**

1. Sign Up - Email only, no verification
2. Add Credits - Pay-as-you-go from $5
3. Call Anywhere - Browser-based calling

**Features:**

- Step numbers displayed prominently
- Icon-based visual representation
- Hover animations on cards
- Responsive grid layout

### 3. Features (`src/components/landing/Features.tsx`)

**Purpose:** Highlight key platform capabilities

**8 Feature Cards:**

- Call Anywhere, From Anywhere
- No Apps Required
- Pay As You Go
- Virtual Phone Numbers
- Custom Caller ID
- Secure & Private
- Crystal Clear Quality
- Instant Connection

**Design:**

- 4-column grid (responsive: 1/2/4 columns)
- Icon-based visual hierarchy
- Hover effects with border color change
- Consistent spacing and padding

### 4. Pricing (`src/components/landing/Pricing.tsx`)

**Purpose:** Display pricing tiers

**3 Pricing Plans:**

1. **Pay As You Go - $5**
   - From $0.02/min
   - No expiry on credits
   - Call 200+ countries
   - Browser-based calling
   - Email support

2. **Regular User - $20** (Most Popular)
   - Everything in Pay As You Go
   - 10% bonus credits
   - Custom caller ID
   - Virtual phone number
   - Priority support

3. **Enterprise - Custom**
   - Everything in Regular User
   - Unlimited team members
   - Shared wallet
   - Call recordings with AI transcripts
   - 24/7 priority support
   - Dedicated account manager

**Design:**

- Center card scaled larger (Most Popular)
- Checkmark list of features
- Clear CTA buttons
- "MOST POPULAR" chip badge

### 5. Testimonials (`src/components/landing/Testimonials.tsx`)

**Purpose:** Social proof from users worldwide

**4 User Reviews:**

- Name and location
- 5-star ratings
- Testimonial text
- Avatar with initials

**Features:**

- 2-column responsive grid
- Rating component
- Avatar styling
- Consistent card design

### 6. FAQ (`src/components/landing/FAQ.tsx`)

**Purpose:** Answer common questions

**8 FAQ Items:**

- How does browser-based calling work?
- Do I need to install apps?
- What countries can I call?
- Are there hidden fees?
- Can I receive calls?
- Is payment secure?
- Satisfaction guarantee?
- Do credits expire?

**Features:**

- MUI Accordion component
- Expandable sections
- Clean typography
- Bordered design

### 7. CTA (Call-to-Action) (`src/components/landing/CTA.tsx`)

**Purpose:** Final conversion point

**Elements:**

- Bold headline on gradient background
- Two CTA buttons:
  - "Get Started Free" (primary)
  - "View Pricing" (secondary)
- Trust indicators
- Decorative circles

**Colors:**

- Violet gradient background
- White text for contrast
- Glassmorphism effects

### 8. Footer (`src/components/landing/Footer.tsx`)

**Purpose:** Navigation, links, and legal info

**Sections:**

- Brand identity with logo
- Social media links
- 4 link columns:
  - Product
  - Company
  - Support
  - Legal
- Bottom bar with copyright and contact

**Features:**

- Dark theme (grey.900)
- Hover effects on links
- Responsive grid layout
- Social icon buttons

## Theme Configuration

**File:** `src/lib/theme.ts`

**Color Palette:**

- Primary: Violet (#8b5cf6)
- Secondary: Indigo (#6366f1)
- Background: White/Gray-50

**Typography:**

- System font stack
- Responsive heading sizes
- Weight hierarchy (400-800)

**Components:**

- Button: No text transform, rounded corners
- Card: 16px border radius, subtle shadow

## Responsive Design

**Breakpoints:**

- xs: Mobile (< 600px)
- sm: Tablet (600px - 960px)
- md: Desktop (960px+)

**Responsive Features:**

- Flexible grid layouts
- Font size scaling
- Stack direction changes
- Column count adjustments

## Performance Optimizations

- Static page generation (SSG)
- Emotion CSS-in-JS for optimal styling
- Tree-shaking with MUI components
- Image optimization ready
- Lazy loading components

## Customization

### Colors

Edit `src/lib/theme.ts`:

```typescript
primary: {
  main: "#8b5cf6", // Change to your brand color
}
```

### Content

Each component has hardcoded content that can be easily modified:

- Pricing plans in `Pricing.tsx`
- Features list in `Features.tsx`
- FAQ items in `FAQ.tsx`
- Testimonials in `Testimonials.tsx`

### Icons

Using Material-UI icons:

```typescript
import { YourIcon } from "@mui/icons-material";
```

## Deployment Considerations

### Environment Variables

No environment variables required for the landing page. The page is fully static.

### SEO

Metadata configured in `src/app/layout.tsx`:

```typescript
title: "Auradial - Affordable International VoIP Calls";
description: "Make cheap international calls...";
```

### Analytics

Ready for integration:

- Google Analytics
- Meta Pixel
- Plausible
- Mixpanel

Add tracking scripts to `layout.tsx` or create a separate analytics component.

## Component Dependencies

```
Hero
  ├── TextField (MUI)
  ├── Button (MUI)
  └── Icons (MUI)

HowItWorks
  ├── Card (MUI)
  └── Icons (MUI)

Features
  ├── Paper (MUI)
  └── Icons (MUI)

Pricing
  ├── Card (MUI)
  ├── List (MUI)
  └── Chip (MUI)

Testimonials
  ├── Card (MUI)
  ├── Avatar (MUI)
  └── Rating (MUI)

FAQ
  └── Accordion (MUI)

CTA
  └── Button (MUI)

Footer
  ├── Link (MUI)
  ├── IconButton (MUI)
  └── Divider (MUI)
```

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus indicators on buttons/links

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential additions:

- [ ] Live chat widget
- [ ] Interactive call rate calculator
- [ ] Demo video player
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Loading animations
- [ ] Country flag icons
- [ ] Blog/Resource section
- [ ] Customer logo showcase
- [ ] Live call statistics counter

## Testing

Run these commands to verify:

```bash
# Type checking
npm run type-check

# Build verification
npm run build

# Development server
npm run dev
```

## File Structure

```
src/
├── components/
│   ├── ThemeRegistry.tsx        # MUI theme provider
│   └── landing/
│       ├── Hero.tsx             # Hero section
│       ├── HowItWorks.tsx       # 3-step process
│       ├── Features.tsx         # Feature cards
│       ├── Pricing.tsx          # Pricing plans
│       ├── Testimonials.tsx     # User reviews
│       ├── FAQ.tsx              # FAQ accordion
│       ├── CTA.tsx              # Call-to-action
│       └── Footer.tsx           # Footer section
├── lib/
│   └── theme.ts                 # MUI theme config
└── app/
    ├── layout.tsx               # Root layout with MUI
    └── page.tsx                 # Home page (imports all sections)
```

## Credits

Design inspiration: [Yadaphone](https://www.yadaphone.com/en-US)
