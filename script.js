const clearForm = (endereco) => {
  document.querySelector('#endereco').value = "";
  document.querySelector('#bairro').value = "";
  document.querySelector('#cidade').value = "";
  document.querySelector('#estado').value = "";
}

const preencherForm = (endereco) => {
  document.querySelector('#endereco').value = endereco.logradouro;
  document.querySelector('#bairro').value = endereco.bairro;
  document.querySelector('#cidade').value = endereco.localidade;
  document.querySelector('#estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero(cep);



const searchCep = async() => {
  clearForm();

  const cep = document.querySelector('#cep').value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')) {
      document.querySelector('#endereco').value = 'CEP não encontrado!';
    } else {
      preencherForm(endereco);
    }
  } else {
    document.querySelector('#endereco').value = 'CEP incorreto!';
  }
  
  //console.log(endereco);
}

document.querySelector('#cep').addEventListener("focusout", searchCep);