# Navigation Bar Documentation

This document describes the navigation bar component added to the Auradial VoIP landing page.

## Overview

A responsive, sticky navigation bar built with Material-UI that provides easy access to all landing page sections.

## Component Location

**File:** `src/components/Navbar.tsx`

## Features

### Desktop View

- **Logo**: Phone icon with "Auradial" text
- **Navigation Links**: Features, Pricing, How It Works, FAQ
- **Auth Buttons**: "Sign In" (text button) and "Get Started" (primary button)
- **Sticky positioning**: Stays at top while scrolling
- **Smooth scroll**: Anchor links scroll smoothly to sections

### Mobile View

- **Hamburger menu**: Right-aligned menu icon
- **Slide-out drawer**: Opens from right side
- **Full menu**: All nav items and CTA buttons
- **Touch-friendly**: Large tap targets

## Design Specifications

### Colors

- Background: White (`background.default`)
- Border: Divider color at bottom
- Logo icon background: Primary violet
- Text: Primary text color, changes to primary color on hover

### Typography

- Logo: `h6` variant, 700 weight
- Nav links: Button component default styling

### Spacing

- Container: `maxWidth="lg"`
- Logo icon: 36x36px with 8px border radius
- Toolbar height: Default MUI toolbar height
- Navigation gap: 8px between items

## Navigation Links

The navbar includes anchor links to these sections:

| Link         | Target          | Description                |
| ------------ | --------------- | -------------------------- |
| Features     | `#features`     | Features section           |
| Pricing      | `#pricing`      | Pricing plans              |
| How It Works | `#how-it-works` | 3-step process             |
| FAQ          | `#faq`          | Frequently asked questions |

## Section IDs

The following sections have been updated with IDs for anchor navigation:

- `HowItWorks.tsx`: `id="how-it-works"`
- `Features.tsx`: `id="features"`
- `Pricing.tsx`: `id="pricing"`
- `FAQ.tsx`: `id="faq"`

## Smooth Scrolling

Smooth scroll behavior is enabled globally in `globals.css`:

```css
html {
  scroll-behavior: smooth;
}
```

## Component Structure

```tsx
<AppBar position="sticky">
  <Container maxWidth="lg">
    <Toolbar>
      {/* Logo */}
      <Stack direction="row">
        <Box>Icon</Box>
        <Typography>Auradial</Typography>
      </Stack>

      {/* Desktop Navigation */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Button>Features</Button>
        <Button>Pricing</Button>
        <Button>How It Works</Button>
        <Button>FAQ</Button>
      </Box>

      {/* Desktop CTAs */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Button>Sign In</Button>
        <Button variant="contained">Get Started</Button>
      </Box>

      {/* Mobile Menu Icon */}
      <IconButton sx={{ display: { xs: "block", md: "none" } }}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </Container>
</AppBar>;

{
  /* Mobile Drawer */
}
<Drawer>
  <List>
    <ListItem>Features</ListItem>
    <ListItem>Pricing</ListItem>
    <ListItem>How It Works</ListItem>
    <ListItem>FAQ</ListItem>
    <ListItem>Sign In</ListItem>
    <Button>Get Started</Button>
  </List>
</Drawer>;
```

## Responsive Breakpoints

- **Mobile**: < 900px (md breakpoint)
  - Shows hamburger menu
  - Hides navigation links and CTA buttons

- **Desktop**: ≥ 900px
  - Shows full navigation
  - Hides hamburger menu
  - Displays CTAs inline

## State Management

Uses React `useState` for mobile drawer:

```typescript
const [mobileOpen, setMobileOpen] = useState(false);
```

Drawer opens/closes on:

- Menu icon click
- Any drawer item click (auto-closes)

## Integration

The Navbar is integrated in the root layout:

**File:** `src/app/layout.tsx`

```tsx
<ThemeRegistry>
  <Navbar />
  {children}
</ThemeRegistry>
```

This ensures the navbar appears on all pages and persists during navigation.

## Accessibility

- **Keyboard navigation**: Tab through all interactive elements
- **Focus indicators**: Visible focus states on buttons
- **ARIA labels**: Menu button has `aria-label="open drawer"`
- **Semantic HTML**: Uses `<nav>` implicitly via AppBar
- **Touch targets**: Minimum 44x44px for mobile

## Customization

### Update Navigation Items

Edit the `navItems` array in `Navbar.tsx`:

```typescript
const navItems = [
  { label: "Your Label", href: "#your-section" },
  // Add more items...
];
```

Don't forget to add the corresponding `id` to the target section component.

### Change Logo

Replace the phone icon or update the text:

```tsx
<PhoneIcon /> // Replace with your icon
<Typography>Your Brand</Typography> // Change text
```

### Modify Colors

The navbar uses theme colors. Update `src/lib/theme.ts`:

```typescript
primary: {
  main: "#your-color", // Changes logo and hover colors
}
```

### Add Dropdown Menus

To add dropdown menus to nav items:

```tsx
import { Menu, MenuItem } from "@mui/material";

// Add state for each dropdown
const [anchorEl, setAnchorEl] = useState(null);

// Add Menu component
<Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
  <MenuItem>Submenu Item</MenuItem>
</Menu>;
```

## Performance Considerations

- **Sticky positioning**: Uses CSS `position: sticky` (GPU-accelerated)
- **No scroll listeners**: Relies on native CSS for performance
- **Lazy drawer**: Mobile drawer only rendered when opened
- **Minimal state**: Only tracks drawer open/closed

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (including iOS)
- Mobile browsers: Touch-optimized

## Future Enhancements

Potential additions:

- [ ] Search functionality
- [ ] User account dropdown
- [ ] Notification bell
- [ ] Language selector
- [ ] Dark mode toggle
- [ ] Mega menu for products
- [ ] Progress indicator while scrolling
- [ ] Transparent navbar on hero (solid on scroll)

## Testing

Test the navbar functionality:

```bash
# Run dev server
npm run dev

# Test on mobile viewport
# Use browser dev tools responsive mode

# Test keyboard navigation
# Tab through all interactive elements

# Test smooth scrolling
# Click each navigation link
```

## Known Issues

None currently.

## Credits

Built with Material-UI components:

- AppBar
- Toolbar
- Drawer
- Button
- IconButton
- List components
