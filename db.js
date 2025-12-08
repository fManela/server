const mysql = require('mysql2');
const AWS = require('aws-sdk');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, results) => {
      if (err) {
        return reject({ statusCode: 500, body: JSON.stringify({ error: 'Database error' }) });
      }
      resolve({ statusCode: 201, body: JSON.stringify({ message: 'User registered successfully', userId: results.insertId }) });
    });
  });
};
