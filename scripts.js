window.addEventListener('keydown', handleKeyPress);

const currentDisplayNumber = document.querySelector('.currentNumber');
const previousDisplayNumber = document.querySelector('.previousNumber');

const numbers = document.querySelectorAll('.number');

const operators = document.querySelectorAll('.operator');

const buttons = document.querySelectorAll('button');

const equal = document.querySelector('.equal');
equal.addEventListener('click', calculate);

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', decimalButton);

const allClear = document.querySelector('.allClear');
allClear.addEventListener('click', allClearDisplay)

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCurrent);

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', backspaceButton);


let currentNum = '';
let previousNum = '';
let operator = '';


numbers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
    })
})

function handleNumber(number) {
    if (currentNum.length < 6) {
    currentNum += number
    currentDisplayNumber.textContent = currentNum;
    }
}


operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    })
})

function handleOperator(op) {
    // To see the equal pressing only operators
    if ( previousDisplayNumber.textContent.includes('+') ||
         previousDisplayNumber.textContent.includes('-') ||
         previousDisplayNumber.textContent.includes('/') ||
         previousDisplayNumber.textContent.includes('*')  
        ) {
        calculate();
        } 
        operator = op;
        previousNum = roundNumber(currentNum);
        previousDisplayNumber.textContent = previousNum + ' ' + operator;
        currentNum = '';
        currentDisplayNumber.textContent = '-';
    }

function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === '+') {
        previousNum += currentNum;
    } else if (operator === '/') {
        previousNum /= currentNum;
        if (currentNum === 0) {
            previousNum = '-';
            currentNum = 'ERROR';
            previousDisplayNumber.textContent = previousNum;
            currentDisplayNumber.textContent = currentNum;
            operator = '';
            return;
        }
    } else if ( operator === '*') {
        previousNum *= currentNum;
    } else if ( operator === '-') {
        previousNum -= currentNum;
    }

    // If second number is not entered before equal
    if (previousDisplayNumber.textContent == '-') {
        currentDisplayNumber.textContent = 'ERROR';
        currentNum = '';
        previousNum = '';
        operator ='';
        previousDisplayNumber.textContent = '';
    }

    let roundedNum = roundNumber(previousNum);
    currentNum = roundedNum;
    previousNum = currentNum;
    previousDisplayNumber.textContent = '-';
    currentDisplayNumber.textContent = roundedNum;
}

function roundNumber(num) {
    return Math.round(num * 1000000) / 1000000;
}

function allClearDisplay() {
    currentNum = '';
    previousNum = '';
    operator ='';
    currentDisplayNumber.textContent = '0';
    previousDisplayNumber.textContent = '0';
}

function clearCurrent() {
    currentNum = '';
    currentDisplayNumber.textContent = '0';
}

function decimalButton() {
    if (!currentNum.includes('.')) {
        currentNum += '.';
        currentDisplayNumber.textContent = currentNum;
    }
}

function backspaceButton() {
    currentNum = currentNum.slice(0, -1)
    currentDisplayNumber.textContent = currentNum;
    if ( currentNum === '') {
        currentDisplayNumber.textContent = '0';
    }
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (e.key === 'Enter' || e.key === '=' ) {
        if (currentNum == '' || previousNum == '') {
            return;
        }
    calculate();
    }
    if (e.key === '+' || e.key === '-' || 
        e.key === '*' || e.key === '/') {
            handleOperator(e.key);
    }
    if (e.key === '.') {
        decimalButton();
    }
    if (e.key === 'Backspace') {
        backspaceButton();
    }
} 