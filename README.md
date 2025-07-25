# Lukasz Pietrzyk - Professional Website

A modern, responsive website for Lukasz Pietrzyk's coaching and consulting services.

## Features

- **Modern Design**: Clean, professional layout with dark/light theme support
- **Responsive**: Fully responsive design that works on all devices
- **Location Preview**: Interactive location section with map integration
- **Multilingual Support**: Content in Polish for local market
- **Performance Optimized**: Built with Vite for fast loading and development

## Sections

1. **Hero Section** - Main introduction and call-to-action
2. **About Section** - Personal background and expertise
3. **Services Section** - Coaching and consulting offerings
4. **Process Section** - Step-by-step approach methodology
5. **Success Stories** - Client achievements and case studies
6. **Testimonials** - Client reviews and feedback
7. **Clients Section** - Logos of companies worked with
8. **Location Section** - Physical office location and meeting options
9. **Contact Section** - Contact form and information

## Location Section Features

The new LocationSection component includes:

- **Office Photo**: Professional image of the coaching office
- **Address Information**: Complete address with city and postal code
- **Key Features**: List of location benefits and amenities
- **Interactive Map Button**: Direct link to map application
- **Contact Integration**: Direct links to phone and contact form
- **Responsive Design**: Optimized for all screen sizes

### Location Details

- **Address**: ul. Przykładowa 123, Warszawa, Polska
- **Features**:
  - Central Warsaw location
  - Excellent public transport access
  - Client parking available
  - Comfortable meeting conditions
  - Online sessions also available

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Dark Mode Support** - Toggle between light and dark themes

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Development

The project follows a clean component structure:

```
/
├── components/
│   ├── LocationSection.tsx    # New location preview component
│   ├── Header.tsx             # Navigation header
│   ├── HeroSection.tsx        # Main hero section
│   ├── AboutSection.tsx       # About information
│   ├── ServicesSection.tsx    # Services offered
│   ├── ProcessSection.tsx     # Work process steps
│   ├── SuccessStoriesSection.tsx  # Success stories
│   ├── TestimonialsSection.tsx    # Client testimonials
│   ├── ClientsSection.tsx     # Client logos
│   ├── ContactSection.tsx     # Contact form
│   ├── Footer.tsx             # Site footer
│   ├── ThemeContext.tsx       # Theme management
│   └── ThemeToggle.tsx        # Theme switcher
├── constants.tsx              # Site content and configuration
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main application component
└── index.tsx                  # Application entry point
```

## Customization

To customize the location information:

1. Edit the `LOCATION_INFO` object in `constants.tsx`
2. Update the address, features, and image URL
3. Modify the coordinates for map integration
4. Adjust the styling in `LocationSection.tsx` as needed

## Deployment

The site is optimized for deployment on modern hosting platforms:

- **Netlify**: Connect repository for automatic deployments
- **Vercel**: Zero-config deployment with Git integration
- **GitHub Pages**: Static site hosting with GitHub Actions

## Contact

For questions about the website or services:
- Email: lukasz@example.com
- Phone: +48 123 456 789
- Location: Warsaw, Poland
