# Sonic Chat ⚡️

A real-time chat application built with Next.js, TypeScript, and Redis. Enjoy instant messaging and a smooth, responsive chatting experience.

[![Stars](https://img.shields.io/github/stars/Its-me-ak/sonic-chat?style=social)](https://github.com/Its-me-ak/sonic-chat)
[![Forks](https://img.shields.io/github/forks/Its-me-ak/sonic-chat?style=social)](https://github.com/Its-me-ak/sonic-chat)
[![Open Issues](https://img.shields.io/github/issues/Its-me-ak/sonic-chat)](https://github.com/Its-me-ak/sonic-chat/issues)
[![Last Updated](https://img.shields.io/github/last-commit/Its-me-ak/sonic-chat)](https://github.com/Its-me-ak/sonic-chat/commits/master)

**Visit the live demo!** [https://sonic-chat.vercel.app](https://sonic-chat.vercel.app) 🚀

## Description

Sonic Chat is designed to provide a seamless and engaging real-time chat experience. Leveraging the power of Next.js for the frontend, TypeScript for type safety, and Redis for efficient data management, this application allows users to:

- Sign in securely.
- Send and receive messages instantly.
- Enjoy a responsive and intuitive user interface.

## Tech Stack 🛠️

*   [Next.js](https://nextjs.org/) - React framework for building performant web applications.
*   [TypeScript](https://www.typescriptlang.org/) - Adds static typing to JavaScript.
*   [Redis](https://redis.io/) - In-memory data structure store, used as a database, cache, and message broker.
*   [Kinde Auth](https://kinde.com/) - Authentication solution.
*   [PusherJS](https://pusher.com/docs/channels/) - Realtime communication platform.
*   [ReactJS](https://reactjs.org/) - JavaScript library for building user interfaces.
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
*   [Upstash Redis](https://upstash.com/) - Serverless Redis.
*   [Zustand](https://github.com/pmndrs/zustand) - Small, fast and scalable bearbones state-management solution.

## Prerequisites ⚙️

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
*   [Redis](https://redis.io/docs/getting-started/) (local or cloud instance)

## Installation 🚀

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Its-me-ak/sonic-chat.git
    cd sonic-chat
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install or bun install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to the `.env.example` (if available) for the required variables. At a minimum, you'll likely need:

    ```
    NEXT_PUBLIC_KINDE_SITE_URL=YOUR_KINDE_SITE_URL
    KINDE_CLIENT_ID=YOUR_KINDE_CLIENT_ID
    KINDE_CLIENT_SECRET=YOUR_KINDE_CLIENT_SECRET
    NEXT_PUBLIC_PUSHER_APP_KEY=YOUR_PUSHER_APP_KEY
    PUSHER_APP_ID=YOUR_PUSHER_APP_ID
    PUSHER_APP_SECRET=YOUR_PUSHER_APP_SECRET
    NEXT_PUBLIC_PUSHER_APP_CLUSTER=YOUR_PUSHER_APP_CLUSTER
    UPSTASH_REDIS_REST_URL=YOUR_UPSTASH_REDIS_REST_URL
    UPSTASH_REDIS_REST_TOKEN=YOUR_UPSTASH_REDIS_REST_TOKEN
    ```

4.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev or bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features ✨

*   **Real-time Messaging:** Utilizes PusherJS for instant message delivery.
*   **User Authentication:** Implements secure authentication using Kinde Auth.
*   **Scalable Backend:** Leverages Redis for efficient data storage and retrieval.
*   **Modern UI:** Built with Tailwind CSS for a clean and responsive design.
*   **Type Safety:** Written in TypeScript for enhanced code quality and maintainability.
*   **Emoji Support:** Full emoji support using `@emoji-mart/react`.
*   **Cloudinary Integration:** Image uploads and management via Cloudinary.

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main branch of the original repository.

## Contributors 🧑‍💻

*   [Its-me-ak](https://github.com/Its-me-ak)
```
