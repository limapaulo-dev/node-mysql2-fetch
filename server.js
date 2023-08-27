const mysql = require('mysql2');

const dbOpt = {
  host: 'localhost',
  user: 'root',
  password: 'mysqlpw',
  database: 'node_mysql',
};

const insert = async (cep, conn) => {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();
  console.log(cep);
  console.log(data);

  let sql = 'insert into cep (cep, logradouro, bairro, cidade, uf) values (?, ?, ?, ?, ?)';
  const param = [Number(data.cep.replaceAll('-', '')), data.logradouro, data.bairro, data.localidade, data.uf];

  conn.query(sql, param, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const selectAll = (conn) => {
  let sql = 'select * from cep';

  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const selectById = (conn, id) => {
  let sql = 'select * from cep where id = ?';

  const param = [id];

  conn.query(sql, param, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const updateByID = async (conn, id, cep) => {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();
  console.log(cep);
  console.log(data);

  let sql = `update cep set (
          cep=${cep}, 
          logradouro=${logradouro}, 
          bairro=${bairro}, 
          cidade=${localidade}, 
          uf=${uf}
          ) where id = ?`;

  const param = [data.cep, data.logradouro, data.bairro, data.localidade, data.uf, id];

  conn.query(sql, param, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const deleteByID = (conn, id) => {
  let sql = 'delete from cep where id = ?';

  const param = [id];

  conn.query(sql, param, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const getConn = async (mysql) => {
  const conn = await mysql.createConnection(dbOpt);

  await conn.connect((err) => {
    if (err) throw err;

    const dropCepTable = `drop table if exists cep`;

    const createTBAdress = `create table if not exists cep (
            id integer auto_increment not null primary key,
            cep integer(9) not null unique,
            logradouro varchar(255),
            bairro varchar(255),
            cidade varchar(25),
            uf char(2)
        )`;

    // conn.query(dropCepTable, (err, result) => {
    //   if (err) throw err;
    //   console.log('tabela cep apagada');
    //   console.log(result);
    // });

    conn.query(createTBAdress, (err, result) => {
      if (err) throw err;
      console.log('tabela cep criada');
      console.log(result);
    });

    insert(87010411, conn);
    insert(75701130, conn);
    insert(74080060, conn);

    selectAll(conn);
  });
};

getConn(mysql);
