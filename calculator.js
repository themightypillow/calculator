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