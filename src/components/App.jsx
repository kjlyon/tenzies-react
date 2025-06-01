import Die from './Die.jsx'
import { useState, useRef, useEffect } from "react"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App () {

  const [dice, setDice] = useState(() => setFirstDice())
  const buttonRef = useRef(null);

  const gameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)
 
  useEffect(() => {
    if (gameWon) {
        buttonRef.current.focus()
    }
  }, [gameWon])

  // Initialize the first array of dice objects
  // object: { value: <random number>, isHeld: false }
  function setFirstDice() {
    let emptyArray = new Array(10).fill({})
    const firstDice = emptyArray.map(val => (
      {
        value: Math.floor(Math.random() *6) +1, 
        isHeld: false,
        id: nanoid()
      }
    ))

    return firstDice
  }


  // call setDice() to reset the array
  // such that the value: isHeld is flipped 
  // for the die with the cooresponding 
  // id that was passed in.
  function hold(id) {
    const setHeld = dice.map(die => (
      die.id == id ? {...die, isHeld: !die.isHeld} : die
    ))
    setDice(setHeld)
  }


  // map through the array of dice objects
  // generate new value for any that 
  // have value isHeld == false
  function rerollDice () {    
    if (!gameWon){

      setDice(dice.map(die => (
        die.isHeld
        ? die : {...die, value: Math.floor(Math.random() *6) +1}
      )))
      
    } else {
      
      setDice(setFirstDice())
    }

  }

  // from the dice array, create a new array of 
  // dice Elements
  const diceElements = 
    dice.map((die) => <Die 
      holdFn={() => hold(die.id)} 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld}
      /> )
  
  return (
    <main>
      {gameWon && <Confetti/>}
      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
       </div>
      <h1>Tenzies</h1>
      <h2>Roll until all dice are the same. Click each die to 
        freeze it at its current value between rolls.</h2>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button ref={buttonRef} onClick={rerollDice} className='reroll'>{gameWon? 'New Game':'Reroll'}</button>
    </main>
  )
}
