#! /usr/bin/env node

import 'dotenv/config';
import { Client } from 'pg';
import connectionURL from './connectionURL.js';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR ( 255 ),
text VARCHAR ( 255 ),
added TIMESTAMP
);

INSERT INTO messages (username, text, added) 
VALUES
('John', 'Hi there!', '2025-12-10 15:00:00'),
('James', 'Hello World!', '2025-12-10 15:30:00'),
('Dante', 'This project is now using PostgreSQL!', '2025-12-15 16:00:00');
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: connectionURL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();