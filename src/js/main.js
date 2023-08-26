

const inputs = document.querySelectorAll('input.form');

const cepFormGroup = document.querySelector('#form-group-cep');

const cep = document.querySelector('#cep');
const logradouro = document.querySelector('#logradouro');
const bairro = document.querySelector('#bairro');
const localidade = document.querySelector('#localidade');
const uf = document.querySelector('#uf');



cepFormGroup.addEventListener('blur', async () => {
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
  }  

  console.log(res);
  console.log(inputs);
  console.log(cepFormGroup);
});
