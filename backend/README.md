## The backend server of the chat app

- Typescript is used with Express JS (i found it very fun and elegant combination)
- I followed the MVC architecture.
- Global error handler is implemented

## Using the backend API

- Install mangoDB if you don't have it or use a docker image
- Create a .env file in backend folder and add those following entries

  - NODE_ENV='development'
  - APP_PORT=3000 // it's up to you
  - SOCKET_PORT=3001 // app to you
  - DATABASE_URL="mongodb://127.0.0.1:27017/chatapp" // add your mangoDB url
  - JWT_SECRET="3ZJvFlZV4iIRlxT7xuj6E7923RtXfjqJ68StSWy3icyNGwYeONQYfOqMYa2Tkq5a" // add a secret of your choice
  - dJWT_EXPIRES_IN="7 days"

- cd backend
- npm install
- npm run dev
