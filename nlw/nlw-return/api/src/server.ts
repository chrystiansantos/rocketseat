import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { routes } from './routes';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://nlw-return-two-indol.vercel.app/");
  res.header("Access-Control-Allow-Methods", 'POST');
  app.use(cors());
  next();
});
app.use(express.json());
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
  console.log('Http server running 🔥')
})
