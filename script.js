function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculateResult() {
    const expression = document.getElementById("display").value;
    
    try {
        const result = compute(expression);
        document.getElementById("display").value = result;
    } catch (error) {
        alert("Invalid input");
    }
}

function compute(expression) {
    const operators = expression.match(/[\+\-\*\/]/g);
    const numbers = expression.split(/[\+\-\*\/]/).map(Number);

    if (!operators || !numbers || numbers.includes(NaN)) {
        throw new Error("Invalid Expression");
    }

    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const num = numbers[i + 1];
        switch (operators[i]) {
            case '+': result += num; break;
            case '-': result -= num; break;
            case '*': result *= num; break;
            case '/': 
                if (num === 0) throw new Error("Division by zero");
                result /= num; 
                break;
        }
    }
    return result;
}

function compute(expression) {
    // Handle square root
    expression = expression.replace(/√(\d+)/g, (_, num) => Math.sqrt(num));

    // Handle exponentiation
    expression = expression.replace(/(\d+)\^(\d+)/g, (_, base, exp) => Math.pow(base, exp));

    // Handle percentage
    expression = expression.replace(/(\d+)%/g, (_, num) => num / 100);

    // Solve the final expression safely
    return Function(`"use strict"; return (${expression})`)();
}