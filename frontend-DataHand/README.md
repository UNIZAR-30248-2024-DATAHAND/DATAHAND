This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Pre-Scripts in `package.json`

We use `predev` script in our `package.json` file, which will automatically run before `npm run dev` starts. Here’s an example:

```json
"scripts": {
  "predev": "npm install",  // This will run 'npm install' before 'next dev'
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

### With this setup:

- When someone runs `npm run dev`, it will first execute `npm install` (if necessary) to ensure that all dependencies are installed.
- After that, the `next dev` command will be executed to start the development server.

### Considerations

- **Efficiency**: `npm install` only installs dependencies if something is missing or if there are changes in `package.json` or `package-lock.json`, so this step won’t affect performance if the dependencies are already installed.
- **Flexibility**: Users won’t have to remember to manually install dependencies before running the project for the first time.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Setting Up Jest for Testing

1. Install necessary dependencies: Run the following command to install Jest and related testing libraries in 'frontend-Datahand' directory:

    ```bash
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest
    
    npm install --save-dev jest-environment-jsdom
   
    npm install --save-dev babel-jest @babel/preset-env @babel/preset-react

    npm install --save-dev @testing-library/react @testing-library/jest-dom
    
    npm install util

    npm install --save-dev identity-obj-proxy
   
2. Create a file called 'babel.config.js' with the following content:
   ```js
   module.exports = {
    presets: [
        'next/babel',
        '@babel/preset-react',
    ],
   };
   ```
   This file can only exist for testing. It cannot exist when running 'npm run dev'.

3. Create a test in directory 'test'.
4. To run tests, use the following command:
   ```bash
   npm test
