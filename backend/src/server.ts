import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log('DB connected successfully'))
  .catch((error) => console.log(error));

mongoose.connection.on('error', (error) => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
