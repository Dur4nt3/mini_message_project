import express from 'express';
import 'dotenv/config';
import path from 'path';

import indexRouter from './routes/index.js';

const __dirname = import.meta.dirname;

const app = express();

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use((req, res) => res.send('Error: page not found!'));

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Express app started at: http://localhost:${[PORT]}`);
});
