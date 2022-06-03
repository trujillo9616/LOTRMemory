import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/frodo.png', matched: false },
  { src: '/img/balrog.png', matched: false },
  { src: '/img/aragorn.png', matched: false },
  { src: '/img/gandalf.png', matched: false },
  { src: '/img/legolas.png', matched: false },
  { src: '/img/gollum.png', matched: false }
]

function App () {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuidv4() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // Handle the choice of a card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare the choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else return card
          })
        })
      } else {
        console.log('Those cards do not match!')
      }
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo])

  // Reset choices && increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(previousTurns => previousTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <h1>Lord of the Memory</h1>
      <button className='button' onClick={shuffleCards}>New Quest</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
