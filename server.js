const mysql = require('mysql2');

const dbOpt = {
    url : 'localholst',
    user: 'root',
    pw : 'mysqlpw',
    db: 'node_mysql'
}

const getConn = (mysql) => {
    const conn = mysql.createConnection(dbOpt);

    conn.connect((err)=>{
        if (err) throw console.log(err);

        const createTBAdress = `create table if not exists cep (
            id integer auto_increment not null primary key,
            cep integer(9) not null unique,
            logradouro varchar(255),
            bairro varchar(255),
            cidade varchar(25),
            uf char(2)
        )`

        conn.query(createTBAdress, (err, result)=>{
            console.log(err)
            console.log(result)
        });

    });
}

