"use strict";
// Получение поля ввода
const display = document.getElementById("display");
const removeLastSymbol = () => {
    display.value =
        display.value.slice(0, -1);
};
const showErrorScreen = () => {
    const overlay = document.getElementById("errorOverlay");
    overlay.style.display = "flex";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 3000);
};
// Чистая функция вычисления
const calculateExpression = (expression) => {
    try {
        if (/\/0(?!\d)/.test(expression.replace(/\s/g, ""))) {
            showErrorScreen();
            return "";
        }
        const parsedExpression = expression.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");
        const result = Function(`"use strict"; return (${parsedExpression})`)();
        return result.toString();
    }
    catch (_a) {
        return "Ошибка";
    }
};
// Иммутабельная функция добавления символа
const appendToDisplay = (value) => {
    display.value =
        display.value + value;
};
// Очистка
const clearDisplay = () => {
    display.value = "";
};
// Кнопки
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent || "";
        switch (value) {
            case "=":
                display.value =
                    calculateExpression(display.value);
                break;
            case "C":
                clearDisplay();
                break;
            case "⌫":
                removeLastSymbol();
                break;
            default:
                appendToDisplay(value);
        }
    });
});
// Enter = вычислить
display.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        display.value =
            calculateExpression(display.value);
    }
});
