const numberBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".op");
const equalsBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#clear");
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
  // console.log(calculator);
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
}

function addNumberEventListeners() {
  numberBtns.forEach(number => number.addEventListener("click", event => {
    if(!("operation" in calculator)) delete calculator.first;
    calculator.display += event.target.textContent;
    displayDiv.textContent = calculator.display;
    // console.log(calculator);
  }));
}

function addOpEventListeners() {
  opBtns.forEach(opBtn => opBtn.addEventListener("click", event => {
    if("first" in calculator ) {
      calculator.operation = event.target.dataset.op;
      if(calculator.display) {
        evaluateExpression();
      }
      // console.log(calculator);
    }
    else if(calculator.display) {
      calculator.operation = event.target.dataset.op;
      calculator.first = Number(calculator.display);
      calculator.display = "";
      // console.log(calculator);
    }
  }));
}

function addEqualsEventListener() {
  equalsBtn.addEventListener("click", event => {
    if("first" in calculator && "operation" in calculator) {
      evaluateExpression();
      calculator.display = "";
      // console.log(calculator);
    }
  });
}

function addClearEventListener() {
  clearBtn.addEventListener("click", event => {
    delete calculator.first;
    delete calculator.second;
    delete calculator.operation;
    calculator.display = "";
    displayDiv.textContent = calculator.display;
    // console.log(calculator);
  });
}

addNumberEventListeners();
addOpEventListeners();
addEqualsEventListener();
addClearEventListener();