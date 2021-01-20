const numberBtns = document.querySelectorAll(".number");
const displayDiv = document.querySelector("#display");

const calculator = {
  display: ""
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  try {
    if(y === 0) throw new Error("Divide by Zero");
    return x / y;
  }
  catch(e) {
    console.error(e.message);
  }
}

function operate(op, x, y) {
  switch(op) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
  }
}

function addToDisplay(x) {
  calculator.display += x;
  displayDiv.textContent = calculator.display;
}

function addNumberEventListeners() {
  numberBtns.forEach(number => number.addEventListener("click", 
    event => addToDisplay(event.target.textContent)));
}

addNumberEventListeners();