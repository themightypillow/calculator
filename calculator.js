const numberBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".op");
const equalsBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#clear");
const decimalBtn = document.querySelector("#decimal");
const backspaceBtn = document.querySelector("#backspace");
const negateBtn = document.querySelector("#negate");
const displayDiv = document.querySelector("#display");

const calculator = {
  display: ""
  // first
  // second
  // operation
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
  if(y === 0) throw new Error("Divide by Zero");
  return x / y;
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

function evaluateExpression() {
  calculator.second = Number(calculator.display);
  // console.log(calculator, 1);
  try {
    let result = operate(calculator.operation, calculator.first, calculator.second);
    const decimalPlaces = result.toString().split(".").pop().length;
    if(decimalPlaces > 9) result = Number(result.toFixed(9));
    displayDiv.textContent = result;
    calculator.first = result;
  }
  catch(e) {
    displayDiv.textContent = e.message;
    delete calculator.first;
  }
  delete calculator.second;
  delete calculator.operation;
  calculator.display = "";
}

numberBtns.forEach(number => number.addEventListener("click", event => {
  if(!("operation" in calculator)) delete calculator.first;
  const num = event.target.textContent;
  if(num !== "0" || (num === "0" && calculator.display !== "0")) {
    if(num !== "0" && calculator.display === "0") calculator.display = num;
    else calculator.display += num;
    displayDiv.textContent = calculator.display;
  } 
  // console.log(calculator, 2);
}));

opBtns.forEach(opBtn => opBtn.addEventListener("click", event => {
  if("first" in calculator ) {
    if(calculator.display) {
      evaluateExpression();
    }
    calculator.operation = event.target.dataset.key;
    // console.log(calculator, 3);
  }
  else if(calculator.display) {
    calculator.operation = event.target.dataset.key;
    calculator.first = Number(calculator.display);
    calculator.display = "";
    // console.log(calculator, 4);
  }
}));

equalsBtn.addEventListener("click", event => {
  if("first" in calculator && "operation" in calculator && calculator.display) {
    evaluateExpression();
    // console.log(calculator, 5);
  }
});

clearBtn.addEventListener("click", event => {
  delete calculator.first;
  delete calculator.second;
  delete calculator.operation;
  calculator.display = "";
  displayDiv.textContent = calculator.display;
  // console.log(calculator, 6);
});

decimalBtn.addEventListener("click", event => {
  if(!(calculator.display)) {
    if(!("operation" in calculator)) delete calculator.first;
    calculator.display = "0.";
    displayDiv.textContent = calculator.display;
    // console.log(calculator, 7);
  }
  else if(!calculator.display.includes(".")) {
    calculator.display += ".";
    displayDiv.textContent = calculator.display;
    // console.log(calculator, 8);
  }
});

backspaceBtn.addEventListener("click", event => {
  if(calculator.display) {
    const length = calculator.display.length;
    calculator.display = calculator.display.slice(0, length - 1);
    displayDiv.textContent = calculator.display;
    // console.log(calculator, 9);
  }
});

negateBtn.addEventListener("click", event => {
  if(calculator.display) {
    calculator.display *= -1;
    calculator.display = calculator.display.toString();
    displayDiv.textContent = calculator.display;
    // console.log(calculator, 10);
  }
  else if(!calculator.display && "first" in calculator && !("operation" in calculator)) {
    calculator.display = (calculator.first * -1).toString();
    displayDiv.textContent = calculator.display;
    delete calculator.first;
    // console.log(calculator, 11);
  }
});

window.addEventListener("keypress", event => {
  if(event.key === "Enter") {
    equalsBtn.click();
    return;
  }
  const btnPressed = document.querySelector(`button[data-key='${event.key}']`);
  if(btnPressed) btnPressed.click();
});