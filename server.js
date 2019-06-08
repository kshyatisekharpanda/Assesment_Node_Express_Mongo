import  express  from 'express';
import db from './db/mongoose';

//Added the routes files
import user from './routes/user';
import blog from './routes/blog';
import comment from './routes/comment';

//Added for Swagger API Documentation
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';


import bodyParser from 'body-parser';
import cors from 'cors';

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

let corsOptions = {
  origin: true
};
app.use(cors(corsOptions));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', user);
app.use('/comment', comment);
app.use('/blog',blog);

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
export  { app };
