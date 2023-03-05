# Real-Time Chat Application

This is a simple real-time chat application that was built using Node JS, Express JS, MongoDB, Socket.io, React JS, and TypeScript. It was developed as a personal project to enhance my understanding and proficiency in TypeScript.

Please note that this app was created for learning purposes only and should not be used in production environments. I did not follow any specific architecture or schema when building this app, so it may not be secure, robust, or scalable enough for production use.

## Technical points of this app

1. This is a real-time chat application that uses a RESTful API to enable communication between the frontend and backend.
2. Authentication is implemented using JWT tokens to ensure secure message exchanges.
3. To track real-time messages, the app uses Socket.io. However, instead of continuously polling the server, the app sends invalidating queries to retrieve data.

## If time permits, the following features will be added to the app:

1. Group chat messaging
2. Ability to like and respond to specific messages
3. Tracking of user online and offline statuses
4. Push notifications
5. Ability to exchange documents and images
6. Voice and video call functionality

## Get started

Are you ready to chat in real-time with your friends and colleagues? Look no further! This is a simple and easy-to-use real-time chat application. To get started, all you have to do is clone the repo and follow these simple steps:

- Install mangoDB if you don't have it or use a docker image
- Create a .env file in backend folder and add those following entries

  - NODE_ENV='development'
  - APP_PORT=3000 // it's up to you
  - SOCKET_PORT=3001 // app to you
  - DATABASE_URL="mongodb://127.0.0.1:27017/chatapp" // add your mangoDB url
  - JWT_SECRET="3ZJvFlZV4iIRlxT7xuj6E7923RtXfjqJ68StSWy3icyNGwYeONQYfOqMYa2Tkq5a" // add a secret of your choice
  - dJWT_EXPIRES_IN="7 days"

- In the first terminal:

  - cd backend
  - npm install
  - npm run dev

- In the second terminal:
  - cd frontend
  - npm install
  - npm run dev
