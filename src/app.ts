import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { NotFoundError } from './errors/not-found.error';
import { errorHandler } from './middlewares/error-handler.middleware';

const app = express();

app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(routes);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);
export default app;
