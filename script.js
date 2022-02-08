class Calculate {
    firstOperand = '';
    secondOperand = '';
    result = '';
    isOnOperation = false;
    currentOperation = '';
    add() {
        this.result = String(parseFloat(this.firstOperand) + parseFloat(this.secondOperand));

        this.updateResultScreen();
    }
    subtract() {
        this.result = String(parseFloat(this.firstOperand) - parseFloat(this.secondOperand));

        this.updateResultScreen();
    }
    multiply() {
        this.result = String(parseFloat(this.firstOperand) * parseFloat(this.secondOperand));

        this.updateResultScreen();
    }
    divide() {

        if (parseFloat(this.secondOperand) == 0) {
            alert('Invalid mathematical operation!!');
        } else {
            this.result = String(parseFloat(this.firstOperand) / parseFloat(this.secondOperand));

            this.updateResultScreen();
        }

    }
    decide() {
        if (this.currentOperation == 'add') {
            this.add();
        } else if (this.currentOperation == 'subtract') {
            this.subtract();
        } else if (this.currentOperation == 'divide') {
            this.divide();
        } else if (this.currentOperation == 'multiply') {
            this.multiply();
        }
    }

    operationClicked(operation) {
        let operationSign;
        if (operation == 'add') {
            operationSign = '+';
        } else if (operation === 'subtract') {
            operationSign = '-';
        } else if (operation == 'divide') {
            operationSign = '/';
        } else if (operation == 'multiply') {
            operationSign = '*'
        }
        this.currentOperation = operation;
        if (this.isOnOperation == false && this.firstOperand !== '') {

            operationScreen.innerHTML = operationScreen.innerHTML + operationSign;
            this.isOnOperation = true;
        } else if (this.currentOperation !== '' && this.isOnOperation) {

            operationScreen.innerHTML = operationScreen.innerHTML.slice(0, -1);
            operationScreen.innerHTML = operationScreen.innerHTML + operationSign;
        }
    }

    executeOperation() {
        if (this.secondOperand) {
            this.isOnOperation = false;
            this.decide();
            this.secondOperand = '';
            this.firstOperand = this.result;
            this.result = '';
            operationScreen.innerHTML = this.firstOperand;
        }
    }

    updateResultScreen() {
        resultScreen.textContent = this.result;
    }


}

const operationScreen = document.getElementById('operation');
const resultScreen = document.getElementById('result');

const calculate = new Calculate();
const numberBtns = document.querySelectorAll('.btnNum');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const divideBtn = document.getElementById('btn-divide');
const multiplyBtn = document.getElementById('btn-multiply');
const clearBtn = document.getElementById('btn-clear');
const deleteBtn = document.getElementById('btn-delete');
const enterBtn = document.getElementById('btn-enter');
const decimalBtn = document.getElementById('btn-decimal');

function resetCalculator() {
    operationScreen.innerHTML = '';
    resultScreen.innerHTML = '';
    calculate.firstOperand = '';
    calculate.secondOperand = '';
    calculate.result = '';
    calculate.isOnOperation = false;
    calculate.currentOperation = '';
}


numberBtns.forEach(numberBtn => numberBtn.addEventListener('click', () => {
    if (operationScreen.textContent.length > 28) {
        alert('You are working with big numbers!');
        return;
    }
    
    if (calculate.result !== '') {
        resetCalculator();
        operationScreen.innerHTML = operationScreen.innerHTML + numberBtn.innerHTML;

    } else {
        operationScreen.innerHTML = operationScreen.innerHTML + numberBtn.innerHTML;
    }
    if (calculate.isOnOperation == false) {
        calculate.firstOperand = calculate.firstOperand + numberBtn.innerHTML;
    } else if (calculate.isOnOperation == true) {
        calculate.secondOperand = calculate.secondOperand + numberBtn.innerHTML;
    }
}));

addBtn.addEventListener('click', () => {
    
    calculate.executeOperation();
    calculate.operationClicked('add');
});
subtractBtn.addEventListener('click', () => {
    
    calculate.executeOperation();
    calculate.operationClicked('subtract');
    
});
multiplyBtn.addEventListener('click', () => {
    
    calculate.executeOperation();
    calculate.operationClicked('multiply');
    
});
divideBtn.addEventListener('click', () => {

    calculate.executeOperation();
    calculate.operationClicked('divide');
    
});

clearBtn.addEventListener('click', resetCalculator);

decimalBtn.addEventListener('click', () => {
    if (!calculate.isOnOperation && !calculate.firstOperand.includes('.')) {
        calculate.firstOperand = calculate.firstOperand + '.';
        operationScreen.innerHTML = operationScreen.innerHTML + '.';
    } else if (calculate.isOnOperation && !calculate.secondOperand.includes('.')) {
        calculate.secondOperand = calculate.secondOperand + '.';
        operationScreen.innerHTML = operationScreen.innerHTML + '.';
    }
});
deleteBtn.addEventListener('click', () => {
    if (!calculate.secondOperand == '') {
        operationScreen.innerHTML = operationScreen.textContent.slice(0, -1);
        calculate.secondOperand = calculate.secondOperand.slice(0, -1);
    } else if (calculate.secondOperand == '' && calculate.isOnOperation) {
        operationScreen.innerHTML = operationScreen.textContent.slice(0, -1);
        calculate.isOnOperation = false;
        calculate.currentOperation = '';
    } else if (!calculate.firstOperand == '' && !calculate.isOnOperation) {
        operationScreen.innerHTML = operationScreen.textContent.slice(0, -1);
        calculate.firstOperand = calculate.firstOperand.slice(0, -1);
    }
});
enterBtn.addEventListener('click', () => {
    if (calculate.firstOperand !== '' && calculate.secondOperand !== '') {
        calculate.decide();
    }
});
