let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let dotFlag = 0;
const buttons = document.querySelectorAll('button');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
  
updateDisplay();

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {   
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear')){
                clearDisplay();
                updateDisplay();
            } else if(buttons[i].classList.contains('backspace')){
                inputBackspace();
                updateDisplay();
                if(!displayValue.includes('.')){
                    dotFlag = 0;
                }
            }
        }
    )}
}

clickButton();

function inputOperand(operand){
    if(firstOperator == null){
        if(displayValue == '0' || displayValue == 0){
            displayValue = operand;
        }else if(displayValue == firstOperand){
            displayValue = operand;
        } else{
            displayValue += operand;
        }
    } else{
        if(displayValue == firstOperand){
            displayValue = operand;
        } else{
            displayValue += operand;
        }
    }
}

function inputOperator(operator) {
    if(firstOperator != null && secondOperator == null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function inputEquals() {
    if(firstOperator == null){
        displayValue = displayValue;
    }else if(secondOperator != null){
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result == 'inf') {
            displayValue = 'inf';
        }else{
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }else{
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result == 'inf') {
            alert("NUCLEAR MISSILES HAVE LAUNCHED");
            alert("Just kidding, you can't divide a numbet to 0 u genious.");
            displayValue = 'inf';
        }else{
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function inputDecimal(dot) {
    if(dotFlag != 1){
        displayValue += dot;
        dotFlag = 1;
    }   
}

function inputPercent(num) {
    displayValue = (num/100).toString();
}

function inputSign(num) {
    displayValue = (num * -1).toString();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
    dotFlag = 0;
}

function inputBackspace() {
    if(displayValue.length == 1){
        displayValue = 0;
    }else{
        displayValue = displayValue.slice(0, -1);
    }
}

function operate(x, y, operator) {
    switch(operator){
        case '+':
            return x+y;      
        case '-':
            return x-y;  
        case '*':
            return x*y;
        case '/': 
            if(y==0){
                window.alert("NUCLEAR MISSILES HAVE LAUNCHED");
                window.alert("Just kidding, you can't divide something to 0 Einstein.");
                window.alert("Seriously, never try this again ok?");
                window.alert("NEVER!");
                return 'inf ';
            }
            return x/y;
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}