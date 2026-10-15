# News Explorer

News Explorer is a responsive React application that lets users search for recent news by keyword, open articles from their original sources, and save articles for later reading.

## Live project

[View the deployed News Explorer application](https://mykeram.github.io/news-explorer-frontend/)

## Features

- Search for recent English-language articles using the News API
- Validate empty searches and display loading, error, and no-results states
- Display results three at a time with a **Show more** button
- Open original news articles in a new browser tab
- Register and sign in through reusable modal forms
- Protect the `/saved-news` route from unauthenticated access
- Save and remove articles and summarize their search keywords
- Navigate with responsive desktop, tablet, and mobile layouts

Stage 1 uses local storage and asynchronous mock responses for authentication and saved-article behavior. These utilities provide the frontend interface that can later be connected to the project backend.

## Technologies

- React 18
- React Router 6
- JavaScript and JSX
- CSS with BEM naming conventions
- Flexbox and CSS Grid
- Vite
- ESLint
- News API
- GitHub Actions and GitHub Pages

## Routes

- `/` — search for news and view results
- `/saved-news` — view saved articles after signing in

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

## Available scripts

- `npm run dev` — start the Vite development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
- `npm run lint` — check the project with ESLint

## Project structure

```text
src/
├── components/  React components and component styles
├── images/      Images and SVG icons
├── utils/       News API and application API utilities
└── vendor/      Fonts and third-party styles
```

## Design

The interface is based on the [TripleTen final project design in Figma](https://www.figma.com/design/3ottwMEhlBt95Dbn8dw1NH/Your-Final-Project).

## Deployment

The frontend is deployed to GitHub Pages through a GitHub Actions workflow. Pushes to the `stage-1-frontend-api` branch trigger a production build and deployment.

## Author

Michael Ramirez — [GitHub](https://github.com/MykeRam)
