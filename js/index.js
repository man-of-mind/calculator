class Calculator {
    constructor(previousOperand, currrentOperand) {
        this.previousOperand = previousOperand;
        this.currrentOperand = currrentOperand;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currrentOperand = 0;
        this.operation = undefined;
    }

    delete() {
        this.currrentOperand = this.currrentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currrentOperand.includes('.')) return;
        if (this.currrentOperand === 0) this.currrentOperand = '';
        if (number === 0 && this.currrentOperand === 0) return;
        this.currrentOperand = this.currrentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
        this.operation = operation;
        if (this.currrentOperand.toString() === '' || this.currrentOperand === 0) return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.previousOperand = this.currrentOperand.toString() + operation.toString();
        this.currrentOperand = "";
    }

    compute() {
        var result;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currrentOperand);
        if (isNaN(prev) || isNaN(prev)) return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '/':
                if (curr === 0) {
                    this.clear();
                    return;
                }
                result = prev / curr;
                break;
            case '*':
                result = prev * curr;
                break;
            default:
                return;
        }
        this.currrentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateOutputScreen() {
        currrentOperandText.innerText = this.currrentOperand;
        previousOperandText.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currrentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currrentOperandText);
numberButtons.forEach(buttons =>
    buttons.addEventListener('click', () => {
        calculator.appendNumber(buttons.innerText);
        calculator.updateOutputScreen();
    }))

operations.forEach(buttons =>
    buttons.addEventListener('click', () => {
        calculator.chooseOperation(buttons.innerText);
        calculator.updateOutputScreen();
    }))

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateOutputScreen();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateOutputScreen();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateOutputScreen();
})