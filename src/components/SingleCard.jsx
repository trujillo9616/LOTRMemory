import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) handleChoice(card)
  }

  return (
    <div className='card relative'>
      <div className={flipped ? 'flipped' : ''}>
        <img className='front w-full border-2 border-solid border-neutral-50 rounded' src={card.src} alt='card front' />
        <img
          className='back w-full border-2 border-solid border-neutral-50 rounded cursor-pointer'
          src='/img/back.png'
          onClick={handleClick}
          alt='memory card back'
        />
      </div>
    </div>
  )
}

export default SingleCard
