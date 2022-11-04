import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/frodo.png', matched: false },
  { src: '/img/balrog.png', matched: false },
  { src: '/img/aragorn.png', matched: false },
  { src: '/img/gandalf.png', matched: false },
  { src: '/img/legolas.png', matched: false },
  { src: '/img/gollum.png', matched: false }
]

function App() {
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
    <div className="bg-hobbithole bg-no-repeat bg-cover bg-center bg-fixed w-screen h-screen text-neutral-50">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <img src="/img/logo.png" alt="logo" className="w-80 justify-center h-auto" />
        <button className="bg-fire bg-no-repeat bg-cover bg-opacity-0 hover:text-yellow-400 transition-all transition-{bg-fire} duration-500  border-2 border-solid border-neutral-50 rounded pointer items-center justify-center p-4 text-xl subpixel-antialiased font-bold w-auto h-auto" onClick={shuffleCards}>New Quest</button>
        <div className="grid grid-cols-4 overflow-scroll max-w-3xl px-2 lg:gap-4 lg:w-3/4  lg:h-4/6 ">
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
        <p className="text-xl w-auto h-auto pb-4">Turns: {turns}</p>
      </div>
    </div>
  )
}

export default App
