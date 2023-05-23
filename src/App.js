import './index';
import React, { useState, useEffect} from 'react';


function App() {
  const [firstNumber, setFirstNumber] = useState([]);
  const [secondNumber, setSecondNumber] = useState([]);
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');
  const [previousResult, setpreviousResult] = useState();
  const operators = ['/', '*', '+', '-'];

  useEffect(() => {
    if (operator !== '' && result !== '') {
      setFirstNumber(() => [...result]);
      setSecondNumber([]);
    }
  }, [result, operator]);

  useEffect(() => {
    if (result === 'NaN') {
      alert("Invalid Mathematical Expression! Clearing...");
      clearExpression();
    }
  }, [result]);

  function setExpression(char) {

    setResult('');

    if (operators.includes(char)) {
      if (operator !== '' && secondNumber !== []) {
        evaluateExpression();
      }
      setOperator(char);
    } else if (operator !== '') {
      setSecondNumber([...secondNumber, char]);
    } else {
      setFirstNumber([...firstNumber, char]);
    }
  }
  

  function checkValidExpression() {
    if (result !== '') {
      return <div>{result}</div>
    } else if (operator === '') {
      return <div>{firstNumber}</div>
    } else {
      return <div>{secondNumber}</div>
    }
  }

  function evaluateExpression(char) {
    const first = parseFloat(firstNumber.join(''));
    const second = parseFloat(secondNumber.join(''));
    let newResult = '';
    switch (operator) {
      case '+':
        newResult = (first + second).toString();
        break;
      case '-':
        newResult = (first - second).toString();
        break;
      case '*':
        newResult = (first * second).toString();
        break;
      case '/':
        newResult = (first / second).toString();
        break;
      default:
    }

    setResult(newResult);
    if (char === '=') {
      setFirstNumber([]);
      setSecondNumber([]);
      setOperator('');
      setpreviousResult(newResult);
    }
  }

  function trimExpression() {
    if (operator === '') {
      setFirstNumber(firstNumber.slice(0,-1));
      return <div>{firstNumber}</div>
    } else {
      setSecondNumber(secondNumber.slice(0,-1));
      return <div>{secondNumber}</div>
    }
  }

  function clearExpression() {
    setFirstNumber([]);
    setSecondNumber([]);
    setOperator('');
    setResult('');
    setpreviousResult();
  }

  function setNegative() {
    if (operator === '') {
      var updatedFirstNumber;
      if (firstNumber[0] !== '-') {
        updatedFirstNumber = ['-'].concat(firstNumber);
        setFirstNumber(updatedFirstNumber);
      } else {
        updatedFirstNumber = [...firstNumber];
        updatedFirstNumber.shift()
        setFirstNumber(updatedFirstNumber);
      }
    } else {
      var updatedSecondNumber;
      if (secondNumber[0] !== '-') {
        updatedSecondNumber = ['-'].concat(secondNumber);
        setSecondNumber(updatedSecondNumber);
      } else {
        updatedSecondNumber = [...secondNumber];
        updatedSecondNumber.shift()
        setSecondNumber(updatedSecondNumber);
      }
    }
  }

  const buttonLayout = [
    ['AC', 'C', '+/-', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="App">
      <div className='display'>
        <div className='result'>{checkValidExpression()}</div>
      </div>
      <div className='prev'>[{previousResult}]</div>
      <div className='buttons'>
      {buttonLayout.map((row, rowIndex) => (
        <div key={rowIndex} className={`row${rowIndex + 1}`}>
          {row.map((value, columnIndex) => {
            if (value === 'AC') {
               return <button key={columnIndex} onClick={() => clearExpression()} value={value} >{value}</button>;
            } else if (value === 'C') {
              return <button key={columnIndex} onClick={() => trimExpression()} value={value}>{value}</button>;
            } else if (value === '+/-') {
              return <button key={columnIndex} onClick={() => setNegative()} value={value}>{value}</button>
            } else if (value === '=') {
              return <button key={columnIndex} onClick={() => evaluateExpression('=')} value={value}>{value}</button>
            } else {
              return <button key={columnIndex} onClick={() => setExpression(value)} value={value}>{value}</button>
            }
        })}
        </div>
      ))}
      </div>
    </div>
  );

}

export default App;
