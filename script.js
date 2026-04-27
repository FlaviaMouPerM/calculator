let num = "";
let operador = null;
let result = "";

const buttons = document.querySelectorAll("#buttons"); // #div buttons retorna o botao clicado
const mostrar = document.getElementById("mostrar");

mostrar.textContent = 0; // altera o valor do HTML/Dom

buttons.forEach(function (btn) {
  btn.addEventListener("click", function (x) {
    if (x.currentTarget === x.target) return;
    const clickButton = x.target.closest("num");
    const aux = x.target.getAttribute("name");

    //num = 1 op = + num = 1 resultado = 2
    // console.log(typeof parseInt(aux));
    if (!isNaN(aux)) {
      if (operador == null && !num) {
        result += aux;
        mostrar.textContent = result;
      } else {
        num += aux;
        mostrar.textContent = num;
      }
      console.log("aux", aux, "res", result, num);
      return;
    }

    aux !== "=" && (operador = aux);
    console.log("aqui", operador);
    switch (operador) {
      case "+":
        console.log(operador);
        if (!num) return;
        console.log("nao aqui");
        result = +result + +num;
        num = "";
        mostrar.textContent = result;
        break;
      case "-":
        if (!num) return;
        console.log("valores", num, result, num - result);
        result = Number(result) - Number(num);
        num = "";
        mostrar.textContent = result;

        break;
      case "x":
        if (!num) return;
        result = Number(result) * Number(num);
        num = "";
        mostrar.textContent = result;

        break;
      case "/":
        if (!num) return;
        if (num === "0") {
          mostrar.textContent = "X";
        } else {
          result = +result / +num;
          num = "";
          mostrar.textContent = result;
        }

        break;
      case "C":
        num = "";
        result = "";
        mostrar.textContent = "0";
        break;
      case "CE":
        if (operador === null) {
          result = result.slice(0, -1);
          mostrar.textContent = result || "0";
        } else {
          num = num.slice(0, -1);
          mostrar.textContent = num || "0";
        }
        break;
      case ".":
        if (!num && result.includes(".")) {
          result += ".";
          mostrar.textContent = result;
        } else if (!num.includes(".")) {
          num += ".";
          mostrar.textContent = num;
        }
        break;
    }

    console.log(num, result, operador);
  });
});
