This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

### `npm run build`

### `npm run eject`

## Docker setup

Configure `.env.example` to `.env` first.

Build as image

- `docker build -t puplqvoting-admin:serve-app-build --target serve-app-build .`

Run created image as container

- `docker run -p 3000:80 -d puplqvoting-admin:serve-app-build `
- Open app in [http://localhost:3000](http://localhost:3000) detached.
