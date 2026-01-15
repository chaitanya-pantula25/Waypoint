# Waypoint - Trekking Information Portal

A web-based trekking information and resource management portal where users can discover, add, and plan treks in India.

## Features

### 🏠 Landing Page
- Clean, modern design with Komoot-inspired styling
- Responsive navbar with all navigation options
- Search functionality
- Dark/light theme switcher
- Hero section with call-to-action buttons

### 🔐 Authentication System
- User registration and login
- Profile photo upload
- Persistent login sessions (localStorage)
- Profile photo in navbar when logged in

### 📊 User Statistics
- Total distance covered
- Total elevation gain
- Total treks completed
- Total time spent trekking
- List of completed treks

### 🔍 Discover Section
- Split layout: Trek list on left, interactive map on right
- 22+ pre-populated treks across India
- Each trek card shows:
  - Location, distance, elevation, difficulty
  - "View on map" button (zooms and centers map)
  - "Download GPX" button
- Clickable cards navigate to detail pages
- Interactive map with accurate pin locations
- Click pins to see trek information

### 📍 Trek Detail Page
- Interactive map showing exact trek location
- Detailed trek information
- "Mark as completed" button (requires login)
- Trail route visualization on map
- GPX download functionality

### ➕ Add Your Treks
- Form to add custom treks:
  - Date and time (start/end)
  - Difficulty level (1-10 scale)
  - GPX file upload
  - Image upload
  - Distance and elevation
- User-uploaded treks appear in search results

### 📋 Plan Your Trek
- Form with autocomplete suggestions for trek names
- Date, start time, location, number of people
- Generates comprehensive trek plan with:
  - Estimated duration
  - Recommendations
  - Checklist items

### 🔎 Search Functionality
- Search bar in navbar
- Searches through all treks (pre-populated + user-uploaded)
- Real-time filtering in Discover page

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS variables for theming
- **Vanilla JavaScript** - Application logic
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Map tiles
- **LocalStorage** - Data persistence

## Getting Started

1. Open `index.html` in a web browser
2. No build process or dependencies required - works directly in the browser
3. All data is stored in browser localStorage

## Usage

### First Time Setup
1. Click "Log in/Sign Up" to create an account
2. Upload a profile photo (optional)
3. Start exploring treks!

### Adding a Trek
1. Log in to your account
2. Click "Add your treks" in the navbar
3. Fill out the form with trek details
4. Upload GPX file and image (optional)
5. Submit to add your trek

### Planning a Trek
1. Click "Plan a trek" in the navbar
2. Start typing a trek name (autocomplete will suggest matches)
3. Fill in date, time, location, and number of people
4. Click "Generate Plan" to see your personalized trek plan

### Marking Treks as Completed
1. Navigate to any trek detail page
2. Click "Mark as Completed" button
3. Your statistics will update automatically

## Data Storage

All data is stored in browser localStorage:
- User accounts and authentication
- Pre-populated treks (22 treks across India)
- User-uploaded treks
- Completed treks
- User preferences (theme)

## Pre-populated Treks

The application comes with 22 pre-populated treks including:
- Valley of Flowers (Uttarakhand)
- Hampta Pass (Himachal Pradesh)
- Kedarkantha (Uttarakhand)
- Roopkund (Uttarakhand)
- Sandakphu (West Bengal)
- Chadar Trek (Ladakh)
- Goechala (Sikkim)
- And many more...

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- LocalStorage API
- CSS Grid and Flexbox

## Design

Inspired by Komoot's clean, modern design:
- Inter font family
- Smooth transitions and hover effects
- Responsive layout
- Dark/light theme support
- Accessible color contrasts

## Notes

- GPX files are parsed and stored as coordinate arrays
- Images are stored as base64 data URLs
- Map coordinates are approximate for user-uploaded treks (in production, use a geocoding API)
- All treks are focused on India locations

## Future Enhancements

Potential improvements:
- Geocoding API for accurate location coordinates
- Backend integration for data persistence
- Social features (sharing, reviews)
- Weather integration
- Route optimization
- Mobile app version
