# European Meal Finder

A React application that helps users explore meals from different European cuisines. It retrieves meal data from **TheMealDB API** and lets users search for meals and save their favorites.

## Features

- Browse meals from 10 cuisine areas: Italian, French, Greek, Spanish, British, Polish, Portuguese, Dutch, Irish, and Croatian.
- Select a cuisine to load its meals from the API.
- Search meals by name.
- Add meals to Favorites or remove them from Favorites.
- View the saved Favorites list.
- Keep Favorites in the browser using `localStorage`, so they remain after a page refresh.
- Display loading, empty-result, and API error messages.

## Built With

- React 19
- Vite 8
- JavaScript (ES modules)
- CSS
- TheMealDB API
- Browser Local Storage

## API Used

This project uses TheMealDB's filter-by-area endpoint:

```text
https://www.themealdb.com/api/json/v1/1/filter.php?a={area}
```

For example, the Italian meals endpoint is:

```text
https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian
```

The API returns meal data in JSON format. The application uses the meal name, meal image, and meal ID to display cards and identify saved favorites. No API key is required for the endpoint used in this project.

API website: [TheMealDB](https://www.themealdb.com/api.php)

## Getting Started

### Requirements

- Node.js (LTS version recommended)
- npm
- A modern web browser

### Installation

1. Clone this repository:

   ```bash
   git clone YOUR_REPOSITORY_URL
   ```

2. Move into the project folder (the folder containing `package.json`):

   ```bash
   cd Cuisine
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal. Vite usually uses:

   ```text
   http://localhost:5173/
   ```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run lint` | Checks the project with ESLint. |
| `npm run build` | Creates the production build in the `dist` folder. |
| `npm run preview` | Previews the production build locally. |

## How It Works

1. The selected cuisine is stored in React state using `useState`.
2. When the cuisine changes, `useEffect` runs an asynchronous `fetch()` request to TheMealDB API.
3. The response is converted to JSON and the meal list is saved in state.
4. React's `map()` method renders the meal cards.
5. The search input filters the currently displayed meals by meal name.
6. The Favorites feature adds or removes meals using their unique `idMeal` value.
7. Another `useEffect` saves changes to Favorites in `localStorage`. On startup, the application reads the saved list from `localStorage`.

## Project Structure

```text
APP/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Notes

- Meal data is loaded from TheMealDB, so an internet connection is required to fetch meals.
- Favorites are stored in the current browser's local storage. They are not synced between different browsers or devices.
- This project is a frontend application and does not use a separate backend server.

## Acknowledgements

Meal data and images are provided by [TheMealDB](https://www.themealdb.com/).
