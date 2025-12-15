import { validationResult, body, matchedData } from 'express-validator';
import { getAllMessages, getMessage, insertMessage } from '../db/queries.js';

export async function controllerGetAllMessages(req, res) {
    const messages = await getAllMessages();
    res.render('index', { messages });
}

export async function controllerGetMessage(req, res) {
    const message = await getMessage(req.params.messageId);
    if (message === undefined) {
        res.send('Message not found!');
        return;
    }
    res.render('message', { message: message[0] });
}

const emptyErr = 'must not be empty.';
const alphaErr = 'must only contain letters.';

const validateMessage = [
    body('from')
        .notEmpty()
        .withMessage(`Name ${emptyErr}`)
        .isAlpha()
        .withMessage(`Name ${alphaErr}`),
    body('content').notEmpty().withMessage(`Message ${emptyErr}`),
];

const controllerCreateMessage = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('form', {
                errors: errors.array(),
            });
        }
        const { from, content } = matchedData(req);
        await insertMessage(
            from,
            content,
            new Date().toISOString().substring(0, 19).replace('T', ' '),
        );

        res.redirect('/');
    },
];

export { controllerCreateMessage };
