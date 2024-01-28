const add = function(a, b) {
    if (a && b) {
        return (parseFloat(a) + parseFloat(b)).toString();
    } else {
        return { error: "SYNTAX ERROR" };
    }
};

const subtract = function(a, b) {
    if (a && b) {
        return (parseFloat(a) - parseFloat(b)).toString();
    } else {
        return { error: "SYNTAX ERROR" };
    }
};

const multiply = function(a, b) {
    if (a && b) {
        return (parseFloat(a) * parseFloat(b)).toString();
    } else {
        return { error: "SYNTAX ERROR" };
    }
};

const divide = function(a, b) {
    if (a && b) {
        if (parseFloat(b) === 0) {
            return { error: "DIVISION BY ZERO" };
        } else {
            return (parseFloat(a) / parseFloat(b)).toString();
        }
    } else {
        return { error: "SYNTAX ERROR" };
    }
};

let firstNumber = "0";
let operator = "";
let secondNumber = "";

const clearCalculator = function() {
    firstNumber = "0";
    operator = "";
    secondNumber = "";
}

const display = document.querySelector("#display");

const updateDisplay = function(error) {
    if (error) {
        display.textContent = error;
    } else {
        display.textContent = firstNumber + " " + operator + " " + secondNumber;
    }
}

const operate = function(first, op, second) {
    switch (op) {
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "*":
            return multiply(first, second);
        case "/":
            if (second.toString() === "0") {
                return { error: "DIVISION BY ZERO" };
            } else {
                return divide(first, second);
            }
    }
};

const evalContent = function(op) {
    let outcome = operate(firstNumber, operator, secondNumber);
    clearCalculator();
    if (outcome.error) {
        updateDisplay(outcome.error);
        firstNumber = "0";
    } else {
        firstNumber = outcome;
        if (op) {
            operator = op;
        }
        updateDisplay();
    }
}

document.addEventListener("click", function(event) {
    switch (event.target.id) {
        case "clear":
            clearCalculator();
            updateDisplay();
            return;
        case "equals":
            if (operator) {
                evalContent();
            }
            return;
        case "plus":
            if (operator) {
                evalContent("+");
            } else {
                operator = "+";
                updateDisplay();
            }
            return;
        case "minus":
            if (operator) {
                evalContent("-");
            } else {
                operator = "-";
                updateDisplay();
            }
            return;
        case "times":
            if (operator) {
                evalContent("*");
            } else {
                operator = "*";
                updateDisplay();
            }
            return;
        case "divide":
            if (operator) {
                evalContent("/");
            } else {
                operator = "/";
                updateDisplay();
            }
            return;
        case "0":
            if (operator) {
                if (secondNumber !== "0") {
                    secondNumber += "0";
                }
            } else if (firstNumber !== "0") {
                firstNumber += "0";
            }
            updateDisplay();
            return;
        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": 
            if (operator) {
                if (secondNumber === "0") {
                    secondNumber = event.target.id;
                } else {
                    secondNumber += event.target.id;
                }
            } else {
                if (firstNumber === "0") {
                    firstNumber = event.target.id;
                } else {
                    firstNumber += event.target.id;
                }
            }
            updateDisplay();
            return;
        case "point":
            if (operator) {
                if (secondNumber === "") {
                    secondNumber = "0."
                } else if (secondNumber.indexOf(".") === -1) {
                    secondNumber += ".";
                }
            } else if (firstNumber.indexOf(".") === -1) {
                firstNumber += ".";
            }
            updateDisplay();
            return;
        case "backspace":
            if (secondNumber) {
                secondNumber = secondNumber.slice(0, -1);
            } else if (operator) {
                operator = "";
            } else if (firstNumber !== "0") {
                if (firstNumber.length === 1) {
                    firstNumber = "0";
                } else {
                    firstNumber = firstNumber.slice(0, -1);
                }
            }
            updateDisplay();
            return;
    }
});

updateDisplay();
