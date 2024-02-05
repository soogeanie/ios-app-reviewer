# iOS App Reviewer

An app that displays iOS app reviews via an iTunes RSS feed.

## Technology Considerations

This project uses SQLite, Prisma, and Express on the backend. Instead of using an external file and managing that, SQLite comes pre-installed on most machines and acts like a real database. I chose Prisma to avoid writing lots of SQL queries for simple operations i.e., saving reviews to the database.

For the front-end, I chose to use Vite to bootstrap a simple React environment like create-react-app and Tailwind for styling. I chose Tailwind because it's easy to setup, it's really fast, and integrates well with Vite.

#### Technology Used
- JavaScript/TypeScript
- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com)
- [Prisma](https://www.prisma.io)
- [SQLite](https://www.sqlite.org/index.html)
- [Jest](https://jestjs.io)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind](https://tailwindcss.com)

## Running the project

Clone this repo. You will need `node` and `npm` installed.

This project was built using Node version 20.11.0. If you have a node version manager installed, you can potentially use the included `.nvmrc` files which are native to nvm.

The server and client will need to be run separately.
Below there are instructions for setting up and running both.


### Server

As mentioned above, the server assumes you have SQLite installed.

Run the following commands from the server folder:

1. `npm install`
2. `npm run db:create`
3. `npm run dev`

Once the server is running, it will fetch app store reviews for defined app id that lives in [index.ts](./server/index.ts). Polling happens every 15 minutes, this is defined in [constants.ts](./server/constants.ts).

### Client

Run the following commands from the ui folder:

1. `npm install`
2. `npm run dev`
3. Visit the app at `localhost:8080`

These instructions assume familiarity with NodeJS applications. If you have any trouble setting this up, please reach out.