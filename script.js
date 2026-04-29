let num = '';
let result = '';
let operador = null;
const SIMBOLOS = ['C', 'CE', '.'];

const buttons = document.querySelectorAll('#buttons'); // #div buttons retorna o botao clicado
const mostrar = document.getElementById('mostrar');

mostrar.textContent = 0; // altera o valor do HTML/Dom

buttons.forEach(function (btn) {
  btn.addEventListener('click', function (x) {
    if (x.currentTarget === x.target) return;

    // guarda o valor do botão clicado, seja ele número, operador ou símbolo
    const aux = x.target.getAttribute('name');

    // se for um número, guarda o número
    if (!isNaN(aux)) {
      console.log('é numero', aux);
      // se o numero está vazio e não há operador, o utilizador ainda não fez nenhum cálculo
      if (!num && !operador) {
        result += aux;
        mostrar.textContent = result;
      } else {
        num += aux;
        mostrar.textContent = num;
      }
    } else if (SIMBOLOS.includes(aux)) {
      console.log('é símbolo', aux);
      // se for um símbolo, verifica qual é o símbolo e executa a ação correspondente
      switch (aux) {
        case 'C':
          num = '';
          result = '';
          operador = null;
          mostrar.textContent = '0';
          break;
        case 'CE':
          if (!num && !operador) {
            result = result.slice(0, -1);
            mostrar.textContent = result || '0';
          } else {
            num = num.slice(0, -1);
            mostrar.textContent = num || result;
          }
          break;
        case '.':
          if (!num && !result.includes('.')) {
            result += '.';
            mostrar.textContent = result;
          } else if (!num.includes('.')) {
            num += '.';
            mostrar.textContent = num;
          }
          break;
      }
    } else {
      console.log('é operador', aux);
      // se for o sinal de igual, mantém o mesmo operador para fazer o cálculo
      if (aux === '=') {
        mostrar.textContent = result;
      } else {
        operador = aux;
      }

      if (!num) return;

      // senão não é numero nem símbolo, então é um operador, por isso faz a operação correspondente
      switch (operador) {
        case '+':
          // sempre converte para string após somar, subtrair, multiplicar ou dividir para evitar erros de concatenação
          result = (+result + +num).toString();
          num = '';
          mostrar.textContent = result;
          break;
        case '-':
          result = (+result - +num).toString();
          num = '';
          mostrar.textContent = result;

          break;
        case 'x':
          result = (+result * +num).toString();
          num = '';
          mostrar.textContent = result;

          break;
        case '/':
          if (num === '0') {
            mostrar.textContent = 'X';
          } else {
            result = (+result / +num).toString();
            num = '';
            mostrar.textContent = result;
          }

          break;
      }
    }
  });
});
