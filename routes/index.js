import { Router, urlencoded } from 'express';
import {
    controllerGetAllMessages,
    controllerGetMessage,
    controllerCreateMessage
} from '../controllers/messageController.js';

const indexRouter = Router();

indexRouter.use(urlencoded({ extended: true }));

indexRouter.get('/', (req, res) => controllerGetAllMessages(req, res));

indexRouter.get('/new', (req, res) => res.render('form'));

indexRouter.post('/new', controllerCreateMessage);

indexRouter.get('/messages/:messageId', (req, res) =>
    controllerGetMessage(req, res),
);

export default indexRouter;
