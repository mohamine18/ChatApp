import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import socketServer from './socket';

dotenv.config();

const socketHandler = new socketServer();

socketHandler.listenServer();
socketHandler.connected();

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log('DB connected successfully'))
  .catch((error) => console.log(error));

mongoose.connection.on('error', (error) => console.log(error));

const appPort = process.env.AAP_PORT || 3000;
app.listen(appPort, () => {
  console.log(`App server running on port ${appPort}`);
});
