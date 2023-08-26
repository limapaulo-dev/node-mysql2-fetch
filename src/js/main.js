const mysql = require('mysql2')

const inputs = document.querySelectorAll('input.form');

const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const localidade = document.querySelector('#localidade');
const uf = document.querySelector('#uf');

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

cep.addEventListener('blur', async () => {
  let search = cep.value.replace('-', '');
  
  const options = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const res = await fetch(`https://viacep.com.br/ws/${search}/json/`, options).catch((err) => console.log(err));

  if (res) {
    const data = await res.json().catch((err) => console.log(err));
    console.log(data);

    logradouro.value = data.logradouro;
    bairro.value = data.bairro;
    localidade.value = data.localidade;
    uf.value = data.uf;

    getConn(mysql)
   
  }  

  console.log(res);
  console.log(inputs);
  console.log(cep);
});
