  //DOM Elements
const hourElement = document.querySelector('.hour')
const minuteElement = document.querySelector('.minute')
const displayElement = document.querySelector('.display')

const acElement = document.querySelector('.ac')
const pmElement = document.querySelector('.pm')
const percentElement = document.querySelector('.percent')

const additionElement = document.querySelector ('.addition')
const subtractionElement = document.querySelector ('.subtraction')
const multiplicationElement = document.querySelector ('.multiplication')
const divisionElement = document.querySelector ('.divsion')
const equalElement = document.querySelector ('.equal')

const decimalElement = document.querySelector ('.decimal')
const number0Element = document.querySelector ('.number-0')
const number1Element = document.querySelector ('.number-1')
const number2Element = document.querySelector ('.number-2')
const number3Element = document.querySelector ('.number-3')
const number4Element = document.querySelector ('.number-4')
const number5Element = document.querySelector ('.number-5')
const number6Element = document.querySelector ('.number-6')
const number7Element = document.querySelector ('.number-7')
const number8Element = document.querySelector ('.number-8')
const number9Element = document.querySelector ('.number-9')

const numberElementArray =[
    number0Element, number1Element, number2Element, number3Element, number4Element,
    number5Element, number6Element, number7Element, number8Element, number9Element
]


//variabkes
let valueStrInMemory = null
let operatorInMemory =null

//functions
const getDisplayValueAsStr =() => {
    const currentDisplayStr = displayElement.textContent
    return currentDisplayStr.split(',').join('')
}

const getDisplayValueAsNum = () => {
    return parseFloat(getDisplayValueAsStr())
}

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1]==='.'){
        displayElement.textContent +='.'
        return
    }

    const [wholeNumberStr, decimalStr] = valueStr.split('.')
    if (decimalStr){
        displayElement.textContent = 
        parseFloat(wholeNumberStr).toLocaleString() + '.' + decimalStr
    }else{
        displayElement.textContent = parseFloat(wholeNumberStr).toLocaleString()
    }
}

const numberClick = (numStr) => {
    const currentDisplayStr = getDisplayValueAsStr()
    if (currentDisplayStr==='0') {
        setStrAsValue(numStr)
    }
    else{
        setStrAsValue(currentDisplayStr + numStr)
    }
}

const getResultOperationStr =() =>{
    const currentDisplayNum =getDisplayValueAsNum()
    const valueNumInMemory = parseFloat(valueStrInMemory)
        let newValueNum
        if(operatorInMemory==='subtraction'){
            newValueNum = valueStrInMemory - currentDisplayNum
    
    }else if(operatorInMemory==='addition'){
        newValueNum = +valueStrInMemory + +currentDisplayNum
    }
    else if(operatorInMemory==='multiplication'){
        newValueNum = valueStrInMemory * currentDisplayNum
    }
    else if(operatorInMemory==='division'){
        newValueNum = valueStrInMemory / currentDisplayNum
    }
    return newValueNum.toString()
}

const operatorClick = (operation) =>{
    const currentDisplayStr =getDisplayValueAsStr()

    if(!valueStrInMemory){
        valueStrInMemory = currentDisplayStr
        operatorInMemory = operation
        setStrAsValue('0')
        return
    }

    valueStrInMemory = getResultOperationStr()
    operatorInMemory = operation
    setStrAsValue('0')
}

//add event listeners to functions
acElement.addEventListener('click', () =>{
    setStrAsValue('0')
    valueStrInMemory = null
    operatorInMemory = null
})
pmElement.addEventListener('click',()=>{
    const currentDisplayNum = getDisplayValueAsNum()
    const currentDisplayStr = getDisplayValueAsStr()
    
    if (currentDisplayStr==='-0'){
        setStrAsValue('0')
        return
    }
    if(currentDisplayNum >= 0){
        setStrAsValue('-' + currentDisplayStr)
    }else{
        setStrAsValue(currentDisplayStr.substring(1))
    }
})
percentElement.addEventListener('click',()=>{
    const currentDisplayNum = getDisplayValueAsNum()
    const newDisplayNum = currentDisplayNum / 100
    setStrAsValue(newDisplayNum.toString())
    valueStrInMemory = null
    operatorInMemory = null
})

//add event listeners to operators
additionElement.addEventListener('click',()=> {
    operatorClick('addition')
})
subtractionElement.addEventListener('click',()=> {
    operatorClick('subtraction')
})
multiplicationElement.addEventListener('click',()=> {
    operatorClick('multiplication')
})
divisionElement.addEventListener('click',()=> {
    operatorClick('division')
})
equalElement.addEventListener('click',()=>{
    if(valueStrInMemory){
        setStrAsValue(getResultOperationStr())
        valueStrInMemory = null
        operatorInMemory = null
    }
})

//add event listeners to numbers and decimal
for (let i=0; i<numberElementArray.length i++){
    const numberElement = numberElementArray[i]
    numberElement.addEventListener('click', ()=> {
        numberClick(i.toString())
    })
}
decimalElement.addEventListener('click', () => {
    const currentDisplayStr=getDisplayValueAsStr()
   if (!currentDisplayStr.includes('.')){
    setStrAsValue(currentDisplayStr + '.')
   }
})

//set up time
const updateTime = () => {
    const currentTime = new Date()

    let currentHour =currentTime.getHours()
    const currentMinute = currentTime.getMinutes()

    if(currentHour > 12) {
        currentHour -=12
    }

    hourElement.textContent =currentHour.toString()
    minuteElement.textContent =currentMinute.toString().padStart(2, '0')
}
setInterval(updateTime, 1000)
updateTime()