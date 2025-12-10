import { Router, urlencoded } from 'express';

const messages = [
    {
        text: 'Hi there!',
        user: 'John',
        added: new Date(),
    },
    {
        text: 'Hello World!',
        user: 'James',
        added: new Date(),
    },
];

const indexRouter = Router();

indexRouter.use(urlencoded({ extended: true }));

indexRouter.get('/', (req, res) => res.render('index', { messages }));

indexRouter.get('/new', (req, res) => res.render('form'));

indexRouter.post('/new', (req, res) => {
    messages.push({
        text: req.body.content,
        user: req.body.from,
        added: new Date(),
    });
    res.redirect('/');
});

indexRouter.get('/messages/:messageId', (req, res) => {
    const messageId = req.params.messageId;
    if (messageId < 0 || messageId >= messages.length) {
        res.send('Invalid message id!');
        return;
    }

    res.render('message', { message: messages[messageId] })
})

export default indexRouter;
