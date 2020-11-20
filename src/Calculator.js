import React, { useState } from 'react'

const Calculator = props => {
    let [num1, setNum1] = useState()  
    let [num2, setNum2] = useState()
    let [operator, setOperator] = useState()
    
    const handleNums = (event) => {
        (operator) ? (num2) ? setNum2(num2 + event.target.value) : setNum2(event.target.value) 
        : (num1) ? setNum1(num1 + event.target.value) : setNum1(event.target.value)
    }
    
    const handleOperator = (event) => {
        if (num1) setOperator(event.target.value)
        else if(num2) setOperator(event.target.value)
    }

    const clear = () => {
        setNum1()
        setNum2()
        setOperator()
    }

    const handleZero = (event) => {
        if (!num1) setNum1(event.target.value + '.')
        else if (num1 && !operator) setNum1(num1 + event.target.value)
        if (num1 && operator && num2) setNum2(num2 + event.target.value)
        else if (num1 && operator && !num2) setNum2(event.target.value + '.')
    }

    const handleDecimal = (event) => {
        if (!num1) setNum1(0 + event.target.value)
        else if (num1 && !num2 && !operator && !num1.includes(event.target.value)) setNum1(num1 + event.target.value)
        else if (num1 && operator && !num2) setNum2(0 + event.target.value)
        else if (num2 && !num2.includes(event.target.value)) setNum2(num2 + event.target.value)
    }


    const posNeg = (event) => {
        if (num1) setNum1(-(num1))
    }

    const handleParenth = () => {
        if (num1 && operator && num2) {
            setNum1(`(${num1 + operator + num2})`)
            setOperator()
            setNum2()
        }
    }

    const handleSquare = () => {
        if (num1 && !operator && !num2) setNum1(Math.pow(num1, 2).toFixed(2)) 
    }

    const handleSqrt = () => {
        if (num1 && !operator && !num2) setNum1(Math.pow(num1, 0.5).toFixed(2)) 
    }

    const handleFact = () => {
        if (num1 && !operator && !num2) {
            let fact = 1;
            for (let i = 1; i <= num1; i++) fact = fact*i  
            setNum1(fact)
        } 
    }
   
    const handleSolution = () => {
            if (!num2) return
            if (parseFloat(num2).toFixed(2) === 0.00 && operator === ' / ') return
            if (operator && num2) {
                let expression = `${num1+operator+num2}`.replaceAll('(','').split(')') 
                let negative = false
                const calculate = (arr) => {
                    if (typeof arr[0] === 'string') {
                        if (arr[0].charAt(0)==='-') {arr[0] = arr[0].slice(1); negative = true}
                        console.log(expression)
                        switch(true) {
                            case(arr[0].includes('+')): arr[0] = arr[0].split('+').reduce((a, v) => parseFloat(a) + parseFloat(v)); break
                            case(arr[0].includes('-')): arr[0] = arr[0].split('-').reduce((a, v) => parseFloat(a) - parseFloat(v)); break
                            case(arr[0].includes('*')): arr[0] = arr[0].split('*').reduce((a, v) => parseFloat(a) * parseFloat(v)); break
                            case(arr[0].includes('/')): arr[0] = arr[0].split('/').reduce((a, v) => parseFloat(a) / parseFloat(v)); break
                            case(arr[0].includes('%')): arr[0] = arr[0].split('%').reduce((a, v) => parseFloat(a) % parseFloat(v)); break
                            default: break
                        }
                        if (arr.length > 1) {arr[0] += arr[1]; arr.splice(1,1)}
                        console.log("calculate: ", arr)
                        calculate(arr)
                    } 
                    return (negative) ? -1 * arr[0].toFixed(2) : arr[0].toFixed(2)
                }
                setNum1(calculate(expression)); setOperator(); setNum2()
            } 
        
    }
    console.log('expression: ', num1, operator, num2)
    return (
        <div className="container">
            <div className="calc-container">
            <h2>React Calculator  v2.0</h2>
                <div className="answer-box">
                    <p>
                        {num1}{operator}{num2}
                    </p>
                </div>
                <div className="calc-row">
                    <button className="calc-button calc-button-top" onClick={clear}>AC</button>
                    <button className="calc-button calc-button-top" onClick={posNeg}>+/-</button>
                    <button className="calc-button calc-button-top" value=" % " onClick={handleOperator}>%</button>
                    <button className="calc-button calc-button-top" onClick={handleParenth}>( )</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button calc-button-top" onClick={handleSquare}>x<sup>2</sup></button>
                    <button className="calc-button calc-button-top" onClick={handleSqrt}>√x</button>
                    <button className="calc-button calc-button-top" onClick={handleFact}>n!</button>
                    <button className="calc-button calc-button-op" value=" / " onClick={handleOperator}>/</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button" type="number" onClick={handleNums} value="7">7</button>
                    <button className="calc-button" type="number" onClick={handleNums} value="8">8</button>
                    <button className="calc-button" type="number" onClick={handleNums} value="9">9</button>
                    <button className="calc-button calc-button-op" value=" * " onClick={handleOperator}>x</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button" type="number" onClick={handleNums} value="4">4</button>
                    <button className="calc-button" type="number" onClick={handleNums} value="5">5</button>
                    <button className="calc-button" type="number" onClick={handleNums} value="6">6</button>
                    <button className="calc-button calc-button-op" value=" - " onClick={handleOperator}>-</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button" type="number" onClick={handleNums} value="1">1</button>
                    <button className="calc-button" type="number" onClick={handleNums} value="2">2</button>
                    <button className="calc-button" type="number" onClick={handleNums} value="3">3</button>
                    <button className="calc-button calc-button-op"  value=" + " onClick={handleOperator}>+</button>
                </div>
                <div className="calc-row">
                    <button className="calc-button width-2" type="number" value="0" onClick={handleZero}>0</button>
                    <button className="calc-button" value="." onClick={handleDecimal}>.</button>
                    <button className="calc-button calc-button-op" onClick={handleSolution}>=</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator
