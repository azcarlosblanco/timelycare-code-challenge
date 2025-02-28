# Movie Search & Favorites App 🎬

A React Native application that allows users to search for movies and manage their favorites list using the OMDb API.

## Features

- Search for movies using the OMDb API
- View movie details including title, year, and poster
- Add/remove movies to favorites
- Persistent favorites storage
- Responsive grid layout
- Accessibility features
- Smooth animations and transitions

## Tech Stack

- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation
- Async Storage for persistence
- Axios for API requests
- React Native Vector Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <folder-name>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OMDb API key:

```bash
OMDB_API_KEY=<your-api-key>
```

4. Run the app on iOS or Android:

```bash
npm run ios
```

```bash
npm run android
```

## Running Tests

```bash
npm test
```

## Project Structure

- `/src`
  - `/components` - Reusable UI components
  - `/screens` - Main application screens
  - `/store` - Redux store and slices
  - `/hooks` - Custom React hooks
  - `/types` - TypeScript type definitions
  - `/utils` - Helper functions and constants
  - `/services` - API service layer

## Features in Detail

### Search
- Real-time search with debouncing
- Grid layout for search results
- Error handling for API failures
- Loading states with spinner

### Favorites
- Add/remove movies from favorites
- Persistent storage using AsyncStorage
- Animated transitions
- Empty state handling

### UI/UX
- Responsive design
- Loading states
- Error messages with retry option
- Smooth animations
- Network status handling

### Accessibility
- Screen reader support
- Accessible navigation
- Clear focus indicators

