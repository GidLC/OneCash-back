import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import { host, user, password, database } from './dbConfig.mjs';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 50,
  maxIdle: 50, // Conexões ociosas máximas
  idleTimeout: 60000, // Timeout de conexões ociosas em milissegundos
  queueLimit: 0, // Sem limite de fila
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

//Testando pool de conexões
pool.getConnection((err, conn) => {
  if(err) {
    console.log(`Não foi possível abri o pool de conexões`);
  }
  console.log(`Conexão estabelecida via Pool`);

  setTimeout(() => {
    pool.releaseConnection(conn)
    console.log(`Pool liberado`);
  }, 5000)
})



export { app, pool};
