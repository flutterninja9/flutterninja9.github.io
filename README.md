# The Flutter Ninja - Portfolio

A clean and minimal portfolio website built with pure HTML, CSS, and JavaScript. This project was ported from a Flutter application to provide a lightweight, fast-loading web experience.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Firebase Integration**: Real-time data from Firestore (with caching for performance)
- **Modern UI**: Clean, minimal design with smooth animations
- **Performance Optimized**: Lightweight with no external dependencies except Firebase
- **Accessible**: Semantic HTML with proper ARIA labels and keyboard navigation

## Project Structure

```
my-portfolio-sc/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Base styles and CSS variables
│   ├── components.css     # Component-specific styles
│   └── responsive.css     # Responsive design rules
├── js/
│   ├── firebase-config.js # Firebase configuration
│   ├── data-service.js    # Data fetching and caching
│   ├── components.js      # UI component updates
│   └── app.js            # Main application logic
└── README.md             # This file
```

## Components

### 1. App Bar
- Logo with "TFN" branding
- Navigation links (GitHub, Contact)
- Responsive design for mobile/desktop

### 2. User Card
- Profile image display
- Name and bio text
- Responsive layout

### 3. Current Status
- Location, company, project information
- Interactive music link
- Icon-based layout

### 4. Projects Section
- Project cards with images
- Live/GitHub links
- Responsive grid layout

### 5. Tools Section
- Tool cards with custom colors
- Tool name display
- Responsive wrap layout

### 6. Contact Section
- Social media links
- Email contact
- Icon-based layout

## Data Structure

The application fetches data from Firebase Firestore with the following collections:

### User Collection
```javascript
{
  name: "Anirudh Singh",
  bio: "Flutter Developer...",
  city: "City Name",
  workingFor: "Company Name",
  activeProject: "Project Name",
  spotifyPlaylist: "https://...",
  imageUrl: "https://...",
  contact: {
    email: "email@example.com",
    github: "https://github.com/...",
    instagram: "https://instagram.com/...",
    linkedIn: "https://linkedin.com/..."
  }
}
```

### Projects Collection
```javascript
{
  name: "Project Name",
  description: "Project description...",
  screenShotUrl: "https://...",
  backgroundColor: "#ffffff",
  deployedLink: "https://...",
  gitHubLink: "https://github.com/..."
}
```

### Tools Collection
```javascript
{
  name: "Tool Name",
  color: "#ffffff",
  labelColor: "#000000",
  iconUrl: "https://..."
}
```

## Features

### Data Caching
- 5-minute cache for all Firebase data
- Reduces API calls and improves performance
- Manual refresh functionality

### Responsive Design
- Mobile-first approach
- Breakpoints: 576px, 768px, 992px, 1200px
- Optimized for all screen sizes

### Performance
- Lazy loading for images
- Minimal external dependencies
- Optimized CSS and JavaScript

### User Experience
- Loading states with overlay
- Error handling with user feedback
- Smooth animations and transitions
- Keyboard shortcuts (Ctrl+R to refresh)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-portfolio-sc
   ```

2. **Open in browser**
   - Simply open `index.html` in a web browser
   - Or serve using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

3. **Firebase Configuration**
   - The Firebase configuration is already set up
   - Uses the same Firebase project as the original Flutter app
   - No additional setup required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **First Load**: ~2-3 seconds (depending on network)
- **Subsequent Loads**: ~1 second (cached data)
- **Bundle Size**: < 100KB (excluding images)
- **Dependencies**: Only Firebase SDK

## Customization

### Colors
Edit CSS variables in `styles/main.css`:
```css
:root {
  --primary-color: #000000;
  --canvas-color: #ffffff;
  /* ... other variables */
}
```

### Fonts
The app uses Google Fonts. To change fonts, update the font-family variables:
```css
:root {
  --font-family-primary: 'Roboto', sans-serif;
  --font-family-display: 'Bebas Neue', sans-serif;
  /* ... other font variables */
}
```

### Layout
Modify breakpoints in `styles/responsive.css` for different responsive behavior.

## Migration from Flutter

This HTML/CSS/JS version maintains the same functionality as the original Flutter app:

- ✅ Same Firebase data structure
- ✅ Same responsive design patterns
- ✅ Same component layout
- ✅ Same color scheme and typography
- ✅ Same user interactions

## Future Enhancements

- [ ] Dark mode toggle
- [ ] PWA support
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Contact form
- [ ] Blog section

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This is a direct port of the Flutter portfolio to HTML/CSS/JavaScript. The original Flutter code can be safely deleted after confirming this web version works as expected.
