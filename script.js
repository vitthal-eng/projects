const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear
    if (value === "AC") {
      currentInput = "";
      previousInput = "";
      operator = "";
      display.textContent = "0";
      return;
    }

    // Equals
    if (value === "=") {
      if (!operator || !currentInput) return;

      const result = calculate(
        parseFloat(previousInput),
        parseFloat(currentInput),
        operator
      );

      display.textContent = result;
      currentInput = result.toString();
      previousInput = "";
      operator = "";
      return;
    }

    // Operators
    if (["+", "−", "×", "÷"].includes(value)) {
      if (!currentInput) return;

      // Prevent multiple operators
      if (operator) return;

      operator = value;
      previousInput = currentInput;
      display.textContent = previousInput + operator;
      currentInput = "";
      return;
    }

    // Numbers & dot
    currentInput += value;
    display.textContent = operator
      ? previousInput + operator + currentInput
      : currentInput;
  });
});

function calculate(a, b, operator) {
  switch (operator) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷": return b !== 0 ? a / b : "Error";
    default: return b;
  }
}
