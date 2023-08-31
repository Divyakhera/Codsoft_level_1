document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let currentOperator = "";
    let prevInput = "";
    let resultDisplayed = false;

    function clearDisplay() {
        display.textContent = "0";
        currentInput = "";
        currentOperator = "";
        prevInput = "";
        resultDisplayed = false;
    }

    function calculate() {
        const num1 = parseFloat(prevInput);
        const num2 = parseFloat(currentInput);

        switch (currentOperator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num1 / num2;
            default:
                return num2;
        }
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const value = button.textContent;

            if (resultDisplayed && /[0-9.]/.test(value)) {
                clearDisplay();
            }

            if (/[0-9.]/.test(value)) {
                if (currentInput === "0" && value === "0") {
                    return;
                }

                if (currentInput === "0" || resultDisplayed) {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                resultDisplayed = false;
            } else if (value === "C") {
                clearDisplay();
            } else if (value === "=") {
                if (currentInput !== "") {
                    if (currentOperator !== "" && prevInput !== "") {
                        currentInput = calculate().toString();
                        prevInput = "";
                        currentOperator = "";
                    }
                    resultDisplayed = true;
                }
            } else if (["+", "-", "*", "/"].includes(value)) {
                if (prevInput === "" && currentInput !== "") {
                    prevInput = currentInput;
                    currentInput = "";
                    currentOperator = value;
                }
            }

            updateDisplay();
        });
    });
});
