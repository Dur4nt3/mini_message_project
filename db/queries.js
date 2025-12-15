import dbPool from './pool.js';

export async function getAllMessages() {
    const { rows } = await dbPool.query('SELECT * FROM messages');
    return rows;
}

export async function getMessage(id) {
    const { rows } = await dbPool.query(
        'SELECT * FROM messages WHERE id=($1)',
        [id],
    );

    return rows;
}

export async function insertMessage(username, text, timestamp) {
    await dbPool.query(
        'INSERT INTO messages (username, text, added) VALUES (($1), ($2), ($3))',
        [username, text, timestamp],
    );
}
