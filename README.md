# News Explorer

News Explorer is a responsive React application that lets users search for recent news by keyword, open articles from their original sources, and save articles for later reading.

## Live project

[View the deployed News Explorer application](https://news-explorer-mykeram.mooo.com/)

[Backend API](https://api.news-explorer-mykeram.mooo.com/)

## Features

- Search for recent English-language articles using the News API
- Validate empty searches and display loading, error, and no-results states
- Display results three at a time with a **Show more** button
- Open original news articles in a new browser tab
- Register and sign in through reusable modal forms
- Protect the `/saved-news` route from unauthenticated access
- Save and remove articles and summarize their search keywords
- Navigate with responsive desktop, tablet, and mobile layouts

Stage 3 has been submitted to TripleTen and is awaiting instructor review. [Pull request #2](https://github.com/MykeRam/news-explorer-frontend/pull/2) compares `stage-3-frontend-auth` with `main` and remains unmerged until approval.

## Backend integration

- `MainApi.js` uses Fetch and `response.json()` for registration, login, profile, and saved-article requests.
- App owns `currentUser` and shares it through `CurrentUserContext.Provider`. Stored JWTs are verified with the server before private data is shown. Invalid tokens are cleared; temporary failures offer session retry or sign out.
- Registration and login validate fields immediately, display server feedback, and prevent duplicate submissions. Dialogs support keyboard focus, Escape/backdrop dismissal, and focus return.
- Saved articles synchronize with search bookmarks through API requests. Pending operations prevent duplicate requests, and failed saves/deletions preserve existing data.
- Saved counts and keyword rankings update after successful changes. URL-less search results use stable content-based IDs; identical entries are deduplicated.
- Shared application settings and constants are stored in `src/utils/config.js`.

The frontend uses React Router 5 and builds for the root path on Google Cloud. Production HTTPS deployment and final checks are complete; instructor review remains pending.

## Technologies

- React 18
- React Router 5
- JavaScript and JSX
- CSS with BEM naming conventions
- Flexbox and CSS Grid
- Vite
- ESLint
- News API
- Nginx, Google Cloud, and Let's Encrypt HTTPS

## Routes

- `/`: search for news and view results
- `/saved-news`: view saved articles after signing in

The protected route reads authentication from CurrentUserContext, waits for stored-token verification, and redirects signed-out visitors home with the login dialog open. Logout clears private data and blocks saved-page access through browser history.

## Run the project locally

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/MykeRam/news-explorer-frontend.git
   cd news-explorer-frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` from the provided example:

   ```bash
   cp .env.example .env.local
   ```

4. Add your News API key to `.env.local`:

   ```env
   VITE_NEWS_API_KEY=your_news_api_key
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The backend base URL is configured in `src/utils/config.js` and can be overridden with `VITE_MAIN_API_URL`. This public URL is safe to include in the browser bundle. Keep JWT secrets, database credentials, and other private server settings out of frontend environment variables.

## Available scripts

- `npm run dev`: start the Vite development server
- `npm run build`: create a production build
- `npm run preview`: preview the production build locally
- `npm run lint`: check the project with ESLint

## Project structure

```text
src/
├── components/  React components and component styles
├── contexts/    Shared current-user context
├── hooks/       Reusable modal behavior
├── images/      Images and SVG icons
├── utils/       News API and application API utilities
└── vendor/      Fonts and third-party styles
```

## Design

The interface is based on the [TripleTen final project design in Figma](https://www.figma.com/design/3ottwMEhlBt95Dbn8dw1NH/Your-Final-Project).

## Deployment

The full-stack application is deployed on the existing Google Cloud VM at `https://news-explorer-mykeram.mooo.com`. Nginx serves the Vite build with direct-route fallback and redirects HTTP to HTTPS. The API allows the frontend origin through CORS. Certificate renewal dry runs passed for both frontend and API. The earlier GitHub Pages workflow remains scoped to the Stage 1 branch. See [the Google Cloud deployment guide](deploy/README.md) and [initial Nginx configuration](deploy/nginx.conf).
